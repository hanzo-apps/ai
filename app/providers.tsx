'use client'

import { IamProvider } from '@hanzo/iam/react'
import type { ReactNode } from 'react'

/**
 * Client providers. We mount the canonical @hanzo/iam provider directly —
 * no wrapper, no custom context. Components call `useIam()` from
 * '@hanzo/iam/react'. The SDK auto-discovers /v1/iam/oauth/* from
 * ${serverUrl}/.well-known/openid-configuration and uses PKCE.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <IamProvider
      config={{
        serverUrl: process.env.NEXT_PUBLIC_HANZO_IAM_URL || 'https://iam.hanzo.ai',
        clientId: process.env.NEXT_PUBLIC_HANZO_CLIENT_ID || 'hanzo-console',
        redirectUri:
          (typeof window !== 'undefined' ? window.location.origin : 'https://hanzo.ai') +
          '/auth/callback',
      }}
    >
      {children}
    </IamProvider>
  )
}
