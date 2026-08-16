'use client'

import { useEffect } from 'react'
import { useIam } from '@hanzo/iam/react'
import { useAnalytics } from '@hanzo/event/react'
import { EVENTS } from '@hanzo/event'
import { markSignupIntent } from '@/lib/analytics/signup-intent'
import { Waiting } from '@/components/auth/waiting'

/**
 * /signup — no registration form here either. HIP-0111: IAM owns onboarding, so
 * this starts the OAuth2 PKCE redirect with a signup hint and IAM hosts the form.
 */
export default function SignUpPage() {
  const { login } = useIam()
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.capture(EVENTS.SIGNUP_VIEWED)
    const refCode = new URLSearchParams(window.location.search).get('ref')
    if (refCode) analytics.capture(EVENTS.REFERRAL_USED, { refCode })
    // signup_submitted = the redirect INTO IAM (IAM owns the form). The intent
    // mark is what lets /auth/callback tell a new account from a returning login.
    analytics.capture(EVENTS.SIGNUP_SUBMITTED)
    markSignupIntent()
    login({ additionalParams: { signup: 'true' } })
  }, [login, analytics])

  return <Waiting title="Redirecting to sign up…" lede="Taking you to Hanzo ID." />
}
