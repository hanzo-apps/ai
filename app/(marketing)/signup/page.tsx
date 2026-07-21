'use client'

import { useEffect } from 'react'
import { useIam } from '@hanzo/iam/react'
import { useAnalytics } from '@hanzo/event/react'
import { EVENTS } from '@hanzo/event'
import { Loader2 } from 'lucide-react'

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
    analytics.capture(EVENTS.SIGNUP_SUBMITTED)
    login({ additionalParams: { signup: 'true' } })
  }, [login, analytics])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <Loader2 className="w-12 h-12 animate-spin text-foreground mx-auto" />
        <h1 className="text-xl font-medium text-foreground">Redirecting to sign up…</h1>
        <p className="text-muted-foreground">Taking you to Hanzo ID.</p>
      </div>
    </div>
  )
}

export default SignUpPage
