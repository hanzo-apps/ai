'use client'

import { useEffect } from 'react'
import { useIam } from '@hanzo/iam/react'
import { useAnalytics } from '@hanzo/event/react'
import { EVENTS } from '@hanzo/event'
import { markSignupIntent } from '@/lib/analytics/signup-intent'
import { Spinner } from '@hanzo/gui'
import { Box } from '@hanzo/ui'

/**
 * /signup — no local registration form. HIP-0111: IAM owns onboarding. We
 * start the OAuth2 PKCE redirect with a signup hint; IAM hosts the form.
 */
const SignUpPage = () => {
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

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <Spinner size="large" color="$foreground" alignItems="center" />
        <h1 className="text-xl font-medium text-foreground">Redirecting to sign up…</h1>
        <p className="text-muted-foreground">Taking you to Hanzo ID.</p>
      </div>
    </Box>
  )
}

export default SignUpPage
