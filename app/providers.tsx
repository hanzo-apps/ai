'use client'

import { IamProvider, useIam } from '@hanzo/iam/react'
import { AnalyticsProvider, ErrorBoundary, useAnalytics, usePageview } from '@hanzo/event/react'
import { ObserveProvider } from '@hanzo/observe/react'
import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

// Event-stream door for the @hanzo/event client. This is api.hanzo.ai, NOT
// analytics.hanzo.ai. Both hosts expose a path spelled `/v1/event`, but they are
// DIFFERENT protocols:
//
//   • api.hanzo.ai/v1/event      — the cloud front door; body { batch: [Event…] }.
//   • analytics.hanzo.ai/v1/event — the Umami tracker door; body is a BARE ARRAY
//     of hz.js envelopes ({site, ts, type, path, …}) and rejects anything else
//     with 400 "expected array, received object".
//
// This app previously pointed the SDK at the second one, so every pageview and
// error it emitted was rejected 400 at the edge. There is no longer a second
// tag: the hz.js script was removed from app/layout.tsx because it could only
// double-count the pageviews this client already posts. ONE client, ONE door.
const EVENT_HOST = process.env.NEXT_PUBLIC_HANZO_API_URL || 'https://api.hanzo.ai'

// NO SENTRY DSN, deliberately. @hanzo/event accepts one, and it authenticates a
// SECOND send — a Sentry envelope to /v1/sentry/<projectId>, independent of the
// event stream. That store is not the one sentry.hanzo.ai reads: its shell reads
// GET /v1/errors, the type:'error' events in hanzo.events, which this client
// already writes through /v1/event under the ingest key below (universe
// infra/k8s/ingress/routes.yaml, the sentry.hanzo.ai routers). Adding a DSN would
// mean a second publishable credential to mint, rotate and leak, filling a store
// the dashboard never opens — and double-reporting every error that does matter.
// ONE client, ONE door, ONE credential.

/** Publishable ingest key (`pk-…`) — write-only, safe to ship in the bundle, and on
 *  a logged-out marketing site the difference between having interaction analytics
 *  and having none.
 *
 *  Anonymous ingest is NOT rejected: cloud admits a credential-less request and
 *  files it under the reserved `$public` tenant (apps/analytics/event.go →
 *  publicIngest). But that lane is deliberately narrow, and the narrowness is the
 *  whole point of this key:
 *
 *    • `publicKinds` allows ONLY `pageview` and `error`. Every interaction
 *      @hanzo/observe emits ($click/$input/$change/$submit/$view) is a
 *      `type:'event'` and is DROPPED — silently, counted in the {accepted,dropped}
 *      receipt nobody reads. Mounting ObserveProvider without this key on an
 *      all-anonymous surface captures exactly nothing.
 *    • `$public` is a partition Hanzo's own org CANNOT READ, so even the pageviews
 *      that do land are stranded outside our funnels.
 *
 *  With the key, the same traffic resolves to the real org at full capability.
 *  Provision per org via POST /v1/ingest/keys.
 *
 *  MIND THE PREFIX: cloud matches `pk-` (cloud.PublishablePrefix, hyphen). A value
 *  shaped `pk_…` is not recognized as a publishable key, so it is not "presented"
 *  either — it falls through to the anonymous lane and misfiles to `$public`
 *  instead of returning 403. Wrong prefix fails SILENTLY; get it right. */
const INGEST_KEY = process.env.NEXT_PUBLIC_HANZO_INGEST_KEY

/** Anonymous marketing traffic; forward a stored bearer when one exists. */
function getToken(): string | undefined {
  if (typeof window === 'undefined') return undefined
  return window.localStorage.getItem('hanzo_access_token') ?? undefined
}

/** Consent gate — honor Do Not Track and Global Privacy Control as opt-out. The
 *  client sends no PII (never an org or email), so respecting the browser's
 *  standard privacy signals is the whole consent surface a marketing site needs. */
function telemetryEnabled(): boolean {
  // Guard on `window`, not `navigator`: Node 20+ defines a global `navigator`, so
  // a navigator check would pass during the static-export prerender and then
  // touch `window` (undefined on the server). `window` is the reliable SSR gate.
  if (typeof window === 'undefined') return true
  const w = window as unknown as { doNotTrack?: string }
  const n = navigator as unknown as {
    doNotTrack?: string
    msDoNotTrack?: string
    globalPrivacyControl?: boolean
  }
  const dnt = n.doNotTrack ?? w.doNotTrack ?? n.msDoNotTrack
  if (dnt === '1' || dnt === 'yes') return false
  if (n.globalPrivacyControl) return false
  return true
}

/** Route-change pageviews. Browser-only; safe under `output: export`. */
function Pageview() {
  usePageview(usePathname())
  return null
}

/**
 * The ONE place this site binds telemetry identity — mounted inside IamProvider
 * so it sees the resolved session on every route, not just /auth/callback.
 *
 * identify(user.id) — the stable IAM subject, and the ONLY identity this client
 * sends. NEVER email/name: the client is PII-free by construction, and the id is
 * what joins a person's events across hanzo.ai and Hanzo Cloud (which stamps the
 * same subject server-side).
 *
 * THE CLIENT DOES NOT SEND THE ORG. There is deliberately no group() call here.
 * The tenant is stamped SERVER-SIDE from the validated bearer, so org-level
 * funnels and cohorts are already queryable without the browser naming a tenant
 * — and a tenant a client can name is a tenant a client can get wrong. An
 * earlier revision called group(user.owner) to "make ORG-level funnels
 * queryable"; it bought nothing (the server had already stamped that very org
 * from the same session) and it put an org name in a caller-controlled field.
 * Cloud agrees on both counts: it strips groupId from every reduced principal
 * and drops `group` outright on the anonymous lane, so the call was discarded
 * in exactly the cases where trusting it would have mattered.
 */
function Identity() {
  const { user, isAuthenticated } = useIam()
  const analytics = useAnalytics()
  const id = isAuthenticated ? user?.id : undefined
  useEffect(() => {
    if (id) analytics.identify(id)
  }, [analytics, id])
  return null
}

/** Minimal on-brand fallback when a render error is caught. The boundary already
 *  reported it on both planes — a Sentry envelope to sentry.hanzo.ai (the error
 *  dashboard) and a type:'error' row on the event stream (product signal) — so
 *  this just keeps the page usable. */
function Crashed(_error: Error, reset: () => void) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-6 text-center text-white">
      <p className="text-lg font-medium">Something went wrong.</p>
      <button
        onClick={reset}
        className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  )
}

/**
 * SSR/static-export-safe storage. The SDK constructor falls back to bare
 * `sessionStorage`, which is a ReferenceError during the prerender (no DOM)
 * and breaks `next build` / `output: export`. Pass an explicit shim so the
 * SDK never touches a global that doesn't exist on the server; the browser
 * gets real sessionStorage.
 */
function memoryStorage(): Storage {
  const m = new Map<string, string>()
  return {
    get length() {
      return m.size
    },
    clear: () => m.clear(),
    getItem: (k: string) => (m.has(k) ? (m.get(k) as string) : null),
    key: (i: number) => Array.from(m.keys())[i] ?? null,
    removeItem: (k: string) => {
      m.delete(k)
    },
    setItem: (k: string, v: string) => {
      m.set(k, String(v))
    },
  }
}

/**
 * Client providers. Telemetry is ONE client, `@hanzo/event`, over TWO planes:
 * the event stream (POST api.hanzo.ai/v1/event) and the error plane (a Sentry
 * envelope to the DSN host, sentry.hanzo.ai). Web analytics is a LENS on the
 * event stream, resolved server-side — not a separate client and not a tag.
 * `AnalyticsProvider` auto-fires the first pageview and wires auto error capture;
 * `<Pageview/>` counts route changes; the `ErrorBoundary` catches React render
 * errors (which never reach window.onerror).
 * `<ObserveProvider>` rides the SAME client (via context) and adds default-on
 * interaction autocapture ($click/$input/$change/$submit) with a semantic DOM
 * hierarchy — input values redacted by default (PII-free). `nav={false}`: the
 * event layer already counts pageviews exactly once, so observe does not also
 * patch history (no double-count); `enabled` mirrors the same DNT/GPC consent gate.
 * We mount the canonical @hanzo/iam provider directly — components call `useIam()`.
 */
export function Providers({ children }: { children: ReactNode }) {
  const enabled = telemetryEnabled()
  return (
    <AnalyticsProvider
      config={{
        product: 'site',
        host: EVENT_HOST,
        ingestKey: INGEST_KEY,
        getToken,
        enabled,
        // `environment` is deliberately absent: the SDK defaults it to NODE_ENV
        // (core.ts `this.cfg.environment ?? readEnv('NODE_ENV')`), which is exactly
        // right for both lanes — `next build` stamps production, `next dev` stamps
        // development. Hardcoding 'production' here labelled every local crash a
        // production incident in the Sentry dashboard.
      }}
    >
      <ObserveProvider nav={false} enabled={enabled}>
        <Pageview />
        <ErrorBoundary fallback={Crashed}>
          <IamProvider
            config={{
              serverUrl: process.env.NEXT_PUBLIC_HANZO_IAM_URL || 'https://hanzo.id',
              clientId: process.env.NEXT_PUBLIC_HANZO_CLIENT_ID || 'hanzo-app',
              redirectUri:
                (typeof window !== 'undefined' ? window.location.origin : 'https://hanzo.ai') +
                '/auth/callback',
              storage: typeof window !== 'undefined' ? window.sessionStorage : memoryStorage(),
            }}
          >
            <Identity />
            {children}
          </IamProvider>
        </ErrorBoundary>
      </ObserveProvider>
    </AnalyticsProvider>
  )
}
