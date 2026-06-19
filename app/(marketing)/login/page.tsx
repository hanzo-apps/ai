'use client'

import { useEffect } from 'react'
import { useIam } from '@hanzo/iam/react'
import { Loader2 } from 'lucide-react'

/**
 * /login — no local credential form. HIP-0111: IAM owns every credential
 * interaction, so we start the OAuth2 PKCE redirect to Hanzo IAM on mount.
 */
const LoginPage = () => {
  const { login } = useIam()

  useEffect(() => {
    login()
  }, [login])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <Loader2 className="w-12 h-12 animate-spin text-foreground mx-auto" />
        <h1 className="text-xl font-medium text-foreground">Redirecting to sign in…</h1>
        <p className="text-muted-foreground">Taking you to Hanzo ID.</p>
      </div>
    </div>
  )
}

export default LoginPage
