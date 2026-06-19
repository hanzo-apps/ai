'use client'

/**
 * /auth/callback — OAuth2 PKCE callback handler.
 *
 * Hanzo IAM redirects here after authorization. The @hanzo/iam SDK reads the
 * code + state from the URL, exchanges them at the token endpoint with PKCE,
 * and stores the tokens. HIP-0111 canonical flow — no hand-rolled OAuth.
 */

import { useEffect, useState, Suspense } from 'react'
import { useIam } from '@hanzo/iam/react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AuthCallbackInner = () => {
  const router = useRouter()
  const { handleCallback } = useIam()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    handleCallback()
      .then(() => router.push('/account'))
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Authentication failed')
        setTimeout(() => router.push('/login'), 3000)
      })
  }, [handleCallback, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        {error ? (
          <>
            <div className="text-foreground/70 text-xl font-medium">{error}</div>
            <p className="text-muted-foreground">Redirecting to login...</p>
          </>
        ) : (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-foreground mx-auto" />
            <h1 className="text-xl font-medium text-foreground">Completing authentication...</h1>
            <p className="text-muted-foreground">Please wait while we sign you in.</p>
          </>
        )}
      </div>
    </div>
  )
}

const AuthCallback = () => (
  <Suspense fallback={<div className="min-h-screen bg-background" />}>
    <AuthCallbackInner />
  </Suspense>
)

export default AuthCallback
