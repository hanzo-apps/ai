'use client'

import { IamProvider, useIam } from '@hanzo/iam/react'
import { AnalyticsProvider, ErrorBoundary, useAnalytics, usePageview } from '@hanzo/event/react'
import { ObserveProvider } from '@hanzo/observe/react'
import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

/** Cloud front door: POST /v1/event, body { batch: [Event…] }. */
const EVENT_HOST = process.env.NEXT_PUBLIC_HANZO_API_URL || 'https://api.hanzo.ai'

/** Publishable ingest key, write-only and safe in the bundle. It resolves the
 *  request to this org; without it cloud files the traffic under the reserved
 *  `$public` tenant, which stores only pageview and error and which our org
 *  cannot read. Prefix is `pk-` (cloud.PublishablePrefix); other prefixes are
 *  not recognized as a key and fall through to `$public`.
 *  Mint: POST /v1/keys {"type":"publishable"} */
const INGEST_KEY = process.env.NEXT_PUBLIC_EVENT_INGEST_KEY

/** Anonymous marketing traffic; forward a stored bearer when one exists. */
function getToken(): string | undefined {
  if (typeof window === 'undefined') return undefined
  return window.localStorage.getItem('hanzo_access_token') ?? undefined
}

/** Consent gate: Do Not Track and Global Privacy Control are opt-out. The SDK
 *  reads neither, so every surface passes `enabled` itself. */
function telemetryEnabled(): boolean {
  // `window`, not `navigator`: Node defines a global navigator, so a navigator
  // check passes during the static-export prerender and then touches window.
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
 *  posted it as a type:'error' event, which is what sentry.hanzo.ai reads, so
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
 * Client providers. All telemetry is `@hanzo/event` posting to /v1/event; the
 * analytics, insights and error dashboards are lenses cloud resolves over that
 * one stream. `AnalyticsProvider` fires the first pageview and captures errors,
 * `<Pageview/>` counts route changes, `ErrorBoundary` catches React render
 * errors, which never reach window.onerror.
 *
 * `<ObserveProvider>` rides the same client through context and adds interaction
 * capture ($click/$input/$change/$submit) with input values redacted.
 * `nav={false}` leaves history alone, since `<Pageview/>` already counts routes.
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
        // `environment` is omitted so the SDK takes it from NODE_ENV: `next build`
        // stamps production, `next dev` stamps development.
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
