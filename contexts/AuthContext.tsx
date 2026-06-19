'use client'

/**
 * Auth wiring for hanzo.ai.
 *
 * There is ONE way to authenticate across the Hanzo ecosystem: the
 * canonical `@hanzo/iam` SDK talking to Hanzo IAM. This module is a thin
 * configuration shim around `@hanzo/iam/react` — it does NOT reimplement
 * OAuth/OIDC. The SDK auto-discovers the IAM endpoints from
 * `${serverUrl}/.well-known/openid-configuration` (→ /v1/iam/oauth/*) and
 * uses PKCE, so no client secret lives in the browser.
 *
 * `useAuth` is an alias of `useIam` so existing call sites keep working.
 */

import { IamProvider, useIam } from '@hanzo/iam/react'
import type { ReactNode } from 'react'

// Canonical IAM front door. Override per-env with NEXT_PUBLIC_* at build time.
const SERVER_URL = process.env.NEXT_PUBLIC_HANZO_IAM_URL || 'https://iam.hanzo.ai'
const CLIENT_ID = process.env.NEXT_PUBLIC_HANZO_CLIENT_ID || 'hanzo-console'

// Same-origin callback: resolves to https://hanzo.ai/auth/callback in prod and
// http://localhost:3000/auth/callback in local dev — no per-env config needed.
function redirectUri(): string {
  if (typeof window !== 'undefined') return `${window.location.origin}/auth/callback`
  return process.env.NEXT_PUBLIC_HANZO_REDIRECT_URI || 'https://hanzo.ai/auth/callback'
}

export const AuthProvider = ({ children }: { children: ReactNode }) => (
  <IamProvider
    config={{
      serverUrl: SERVER_URL,
      clientId: CLIENT_ID,
      redirectUri: redirectUri(),
    }}
  >
    {children}
  </IamProvider>
)

// One hook for the whole site. Returns { user, isAuthenticated, isLoading,
// login, logout, handleCallback, ... } from @hanzo/iam/react.
export const useAuth = useIam

export default AuthProvider
