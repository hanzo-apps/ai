'use client'

import { IamProvider } from '@hanzo/iam/react'
import { AnalyticsProvider, usePageview } from '@hanzo/event/react'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_HANZO_API_URL || 'https://api.hanzo.ai'

/** Anonymous marketing traffic; forward a stored bearer when one exists. */
function getToken(): string | undefined {
  if (typeof window === 'undefined') return undefined
  return window.localStorage.getItem('hanzo_access_token') ?? undefined
}

/** Route-change pageviews. Browser-only; safe under `output: export`. */
function Pageview() {
  usePageview(usePathname())
  return null
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
 * Client providers. We mount the canonical @hanzo/iam provider directly —
 * no wrapper, no custom context. Components call `useIam()` from
 * '@hanzo/iam/react'. The SDK auto-discovers /v1/iam/oauth/* from
 * ${serverUrl}/.well-known/openid-configuration and uses PKCE.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AnalyticsProvider config={{ product: 'site', host: API_BASE, getToken }}>
      <Pageview />
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
    </AnalyticsProvider>
  )
}
