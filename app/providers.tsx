'use client'

import { IamProvider, useIam } from '@hanzo/iam/react'
import { TelemetryProvider, useTelemetry } from '@hanzogui/telemetry'
import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

/** Anonymous marketing traffic; forward a stored bearer when one exists. */
function getToken(): string | undefined {
  if (typeof window === 'undefined') return undefined
  return window.localStorage.getItem('hanzo_access_token') ?? undefined
}

/**
 * The ONE place this site binds telemetry identity — mounted inside IamProvider
 * so it sees the resolved session on every route, not just /auth/callback.
 * Identity is the only part of the telemetry story an app still owns, because
 * only the app knows who is signed in.
 *
 *  • identify(user.id) — the stable IAM subject. NEVER email/name: the client is
 *    PII-free by construction, and the id is what joins a person's events across
 *    hanzo.ai and Hanzo Cloud (which stamps the same subject server-side).
 *  • group(user.owner) — the org. Cloud already resolves the tenant for billing;
 *    group() is what makes ORG-level funnels/cohorts queryable in insights, so a
 *    B2B question ("which orgs stalled before their first API call?") is
 *    answerable at all.
 */
function Identity() {
  const { user, isAuthenticated } = useIam()
  const telemetry = useTelemetry()
  const id = isAuthenticated ? user?.id : undefined
  const org = isAuthenticated ? user?.owner : undefined
  useEffect(() => {
    if (id) telemetry.identify(id)
  }, [telemetry, id])
  useEffect(() => {
    if (org) telemetry.group(org)
  }, [telemetry, org])
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
 * Client providers. Telemetry is ONE surface, `@hanzogui/telemetry` — the shared
 * policy layer every Hanzo app mounts, never a per-repo copy. It composes the
 * mechanism packages (`@hanzo/event` = the client and the wire, `@hanzo/observe`
 * = the capture engine, imported lazily in an idle callback so it cannot cost
 * LCP) and it is the ONLY thing this app configures.
 *
 * Everything below is resolved, not passed:
 *
 *  • The door. POST https://api.hanzo.ai/v1/event, from `NEXT_PUBLIC_HANZO_API_URL`
 *    or that default. Cloud lenses the one stream into sentry.hanzo.ai (errors +
 *    session capture), analytics.hanzo.ai (pageviews) and insights.hanzo.ai
 *    (product events). Three dashboards, one stream, one thing to configure.
 *  • The error plane. `product="site"` IS the configuration: @hanzo/event maps it
 *    to the `hanzo-ai` Sentry project's publishable DSN. There is no DSN prop and
 *    no DSN env var to forget — forgetting one is exactly why this site reported
 *    zero errors for months.
 *  • The ingest key. Read from `NEXT_PUBLIC_HANZO_INGEST_KEY`. Optional: the door
 *    admits anonymous pageviews and errors under the reserved `$public` tenant.
 *  • Consent. Do Not Track and Global Privacy Control are honored by default, and
 *    an explicit stored choice outranks the browser in both directions.
 *
 * We pass only what the package cannot know: the route (`usePathname()` — Next's
 * router is the clock for pageviews), the bearer, and the crash UI. `fallback`
 * makes the provider's own boundary render `Crashed`; React render errors are the
 * one class `window.onerror` never sees, so the boundary is how they get reported.
 *
 * IamProvider stays mounted here so <Identity/> can read the resolved session.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <TelemetryProvider product="site" path={usePathname()} getToken={getToken} fallback={Crashed}>
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
    </TelemetryProvider>
  )
}
