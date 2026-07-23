'use client'

import { IamProvider } from '@hanzo/iam/react'
import { AnalyticsProvider, ErrorBoundary, usePageview } from '@hanzo/event/react'
import { ObserveProvider } from '@hanzo/observe/react'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// First-party web-analytics ingest host: the analytics.hanzo.ai property (Umami
// fork) the live dashboard reads — the SAME door hanzo.app / hanzo.chat feed via
// analytics.hanzo.ai/hz.js. Its OWN host (decoupled from the API base); the
// @hanzo/event client POSTs pageviews/errors to `${ANALYTICS_HOST}/v1/event`.
const ANALYTICS_HOST = process.env.NEXT_PUBLIC_ANALYTICS_URL || 'https://analytics.hanzo.ai'

/** Publishable ingest key (pk_…) — write-only, safe to ship in the bundle. It lets
 *  logged-out marketing traffic reach the ONE front door (POST /v1/event) so
 *  pageviews + errors land server-side (Cloud stamps the org from the key). When
 *  unset, signed-in visitors still report via their bearer; anonymous events
 *  fail closed. Provision one per org via POST /v1/ingest/keys. */
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

/** Minimal on-brand fallback when a render error is caught. The boundary already
 *  reported it to /v1/event (the sentry lens); this just keeps the page usable. */
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
 * Client providers. Telemetry is ONE client: `@hanzo/event` → analytics.hanzo.ai
 * (POST /v1/event) — the first-party analytics dashboard, the SAME door the static
 * sites feed via analytics.hanzo.ai/hz.js. `AnalyticsProvider` auto-fires the first
 * pageview and wires auto error capture; `<Pageview/>` counts route changes; the
 * `ErrorBoundary` catches React render errors (which never reach window.onerror).
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
        host: ANALYTICS_HOST,
        ingestKey: INGEST_KEY,
        getToken,
        enabled,
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
            {children}
          </IamProvider>
        </ErrorBoundary>
      </ObserveProvider>
    </AnalyticsProvider>
  )
}
