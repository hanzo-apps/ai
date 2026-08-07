'use client'

import { IamProvider, useIam } from '@hanzo/iam/react'
import { AnalyticsProvider, ErrorBoundary, useAnalytics, usePageview } from '@hanzo/event/react'
import { ObserveProvider } from '@hanzo/observe/react'
import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

/** Cloud front door: POST /v1/event, body { batch: [Event…] }. */
const EVENT_HOST = process.env.NEXT_PUBLIC_HANZO_API_URL || 'https://api.hanzo.ai'

/** Publishable ingest key, write-only and safe in the bundle — and REQUIRED for
 *  anonymous traffic. The reserved `$public` tenant that once caught keyless
 *  beacons is retired server-side (cloud apps/analytics/public.go): an event
 *  lands in the org a credential names, or is refused. Without this key every
 *  logged-out pageview and error is answered 401 ingest_key_required, and that
 *  refusal is a console error on every visit — which is why both build lanes
 *  (deploy.yml and the Dockerfile) refuse to ship a bundle it did not reach.
 *  Prefix is `pk-` (cloud.PublishablePrefix); no other prefix is read as a key.
 *  Mint: POST /v1/keys {"type":"publishable"} */
const INGEST_KEY = process.env.NEXT_PUBLIC_PUBLISHABLE_KEY

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
 * identify(sub, traits) — the stable IAM subject, which is what joins a person's
 * events across hanzo.ai and Hanzo Cloud (which stamps the same subject
 * server-side), plus the attributes that make that subject legible.
 *
 * THE TRAITS ARE NEW, AND THEY REVERSE A STATED RULE. This said "NEVER
 * email/name: the client is PII-free by construction". PII-free was the wrong
 * goal for first-party data about our own users: it produced a warehouse of
 * opaque subjects where every funnel could count people and none could say which
 * person, so no user attribute was visible on any Hanzo property. Email and name
 * arrive in the same hanzo.id userinfo response this file already reads to get
 * `sub`, and were discarded on the way past. They are exactly as sensitive as
 * they were in that response, and only ever describe the signed-in user to
 * ourselves — traits ride an authenticated session, never the anonymous lane.
 *
 * Consent still governs the whole client: telemetryEnabled() suppresses every
 * signal under DNT / GPC, so a visitor who opted out sends no traits either.
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
  const subject = isAuthenticated ? iamSubject(user) : undefined
  const traits = isAuthenticated ? iamTraits(user) : undefined
  useEffect(() => {
    if (subject) analytics.identify(subject, traits)
    // `traits` is read off the same userinfo response as `subject`, so the
    // subject changing is what marks a new person. Adding the freshly-built
    // object to the deps would re-identify on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analytics, subject])
  return null
}

/**
 * The IAM subject (`sub`) off the SDK's user object.
 *
 * This reads `sub` and not `id` because `id` DOES NOT EXIST at runtime, which made
 * the identify above a silent no-op for as long as it has been here — hanzo.ai
 * recorded thousands of pageviews and not one identified person. `IamProvider` sets
 * `user` to the raw OIDC userinfo response (`sdk.getUserInfo()` returns
 * `res.json()` verbatim), and hanzo.id's userinfo returns
 * `{owner, organization, email, iss, aud, preferred_username, name, displayName,
 * picture, sub}` — no `id` anywhere. The SDK's `User` type merely declares `id?`
 * as optional, so reading it type-checks and yields undefined forever; nothing
 * fails, the call just never happens. (`IAM#getUser()` — a DIFFERENT method this
 * provider does not use — is the one that maps userinfo onto a `sub`-bearing
 * shape.)
 *
 * `sub` is the stable IAM user UUID, the same value hanzo.app, hanzo.chat and
 * cloud.hanzo.ai identify this human by. Read defensively: the provider's declared
 * type does not include `sub`, and the value is a network response.
 */
function iamSubject(user: unknown): string | undefined {
  if (!user || typeof user !== 'object') return undefined
  const sub = (user as { sub?: unknown }).sub
  return typeof sub === 'string' && sub ? sub : undefined
}

/**
 * The user attributes that ride the subject, off the same userinfo response.
 *
 * hanzo.id returns `{owner, organization, email, iss, aud, preferred_username,
 * name, displayName, picture, sub}`, so the name is read in descending order of
 * how human it is: `displayName`, then `name`, then `preferred_username`. Read
 * as defensively as `iamSubject` — the provider's declared type does not include
 * these and the value is a network response.
 *
 * A key is OMITTED rather than sent undefined: a trait sent as undefined is a
 * trait written, and it would blank a value an earlier identify established.
 * Returns undefined when nothing resolved, so identify falls back to sending the
 * subject alone rather than an empty object.
 */
export function iamTraits(user: unknown): Record<string, unknown> | undefined {
  if (!user || typeof user !== 'object') return undefined
  const claim = (k: string): string | undefined => {
    const v = (user as Record<string, unknown>)[k]
    return typeof v === 'string' && v ? v : undefined
  }
  const traits: Record<string, unknown> = {}
  const email = claim('email')
  if (email) traits.email = email
  const name = claim('displayName') ?? claim('name') ?? claim('preferred_username')
  if (name) traits.name = name
  return Object.keys(traits).length ? traits : undefined
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
 * The OAuth client a visitor authenticates as is decided by the HOST they landed
 * on — this ONE static export serves several (hanzo.ai and cloud.hanzo.ai from the
 * same `out/`, split by the CloudLanding `cp` in the Dockerfile). It mirrors
 * provision.yaml's app->host graph: cloud.hanzo.ai and console.hanzo.ai are the
 * Cloud surfaces and authenticate as `hanzo-cloud` — the ONLY client whose IAM
 * allowlist carries their `/auth/callback`; every other host is `hanzo-app`.
 *
 * This is why cloud.hanzo.ai login 400'd: the shared build sent `hanzo-app`, whose
 * allowlist has `cloud.hanzo.ai/callback` but not `/auth/callback` (the path the
 * SDK actually sends, since redirectUri is origin + /auth/callback), so authorize
 * was rejected and login was impossible. Deriving the client from the SAME host
 * redirectUri already uses is what keeps the two from drifting.
 * NEXT_PUBLIC_HANZO_CLIENT_ID still overrides for a single-host build.
 */
const cloudHosts = new Set(['cloud.hanzo.ai', 'console.hanzo.ai'])

function clientForHost(): string {
  if (process.env.NEXT_PUBLIC_HANZO_CLIENT_ID) return process.env.NEXT_PUBLIC_HANZO_CLIENT_ID
  if (typeof window !== 'undefined' && cloudHosts.has(window.location.hostname)) return 'hanzo-cloud'
  return 'hanzo-app'
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
        // Signed in -> the visitor's OWN IAM token, so cloud attributes the event
        // to their org and user. Signed out -> the publishable key, which is
        // admission for anonymous traffic and nothing more.
        //
        // Never as `ingestKey`: the SDK resolves the credential as
        // `ingestKey ?? token`, so passing it there makes the key win even for a
        // signed-in visitor and leaves getToken unreachable. Folding the key into
        // the resolver inverts it to `token ?? key`.
        getToken: () => getToken() ?? INGEST_KEY,
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
              clientId: clientForHost(),
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
