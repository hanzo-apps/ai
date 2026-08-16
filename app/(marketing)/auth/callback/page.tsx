'use client'

/**
 * The return from Hanzo IAM. The @hanzo/iam SDK reads the authorization code +
 * state from the URL and the PKCE verifier from storage, exchanges the code at
 * /v1/iam/oauth/token, and stores the tokens.
 */

import { useEffect, useState, Suspense } from 'react'
import { useIam } from '@hanzo/iam/react'
import { useAnalytics } from '@hanzo/event/react'
import { EVENTS, isoWeek } from '@hanzo/event'
import { useRouter } from 'next/navigation'
import { takeSignupIntent } from '@/lib/analytics/signup-intent'
import { Waiting } from '@/components/auth/waiting'

const AuthCallbackInner = () => {
  const router = useRouter()
  const { handleCallback } = useIam()
  const analytics = useAnalytics()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    handleCallback()
      .then(() => {
        if (cancelled) return
        // The ONE place an account is known to exist. Everything upstream
        // (signup_viewed/submitted) is intent; this is the conversion the Signup
        // goal counts — and a returning sign-in must NOT be counted as one.
        if (takeSignupIntent()) {
          // Stamp the acquisition cohort once, at birth, so every later event
          // (and every retention curve) carries the week the person joined.
          analytics.setCohort({ signupWeek: isoWeek(new Date()) })
          analytics.capture(EVENTS.SIGNUP_COMPLETED)
        } else {
          analytics.capture(EVENTS.LOGIN_COMPLETED)
        }
        router.replace('/account')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        // A failed exchange is the single most expensive drop in the funnel —
        // report it as an error so it lands in the sentry lens next to the drop.
        analytics.captureError(err, { properties: { where: 'auth_callback' } })
        setError(err instanceof Error ? err.message : 'Sign-in failed')
        setTimeout(() => router.replace('/login'), 3000)
      })

    return () => {
      cancelled = true
    }
  }, [handleCallback, router, analytics])

  return error ? (
    <Waiting title={error} lede="Taking you back to sign in." />
  ) : (
    <Waiting title="Completing sign-in…" lede="One moment." />
  )
}

const AuthCallback = () => (
  <Suspense fallback={<Waiting title="Completing sign-in…" />}>
    <AuthCallbackInner />
  </Suspense>
)

export default AuthCallback
