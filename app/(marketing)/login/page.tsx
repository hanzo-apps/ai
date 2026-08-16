'use client'

/**
 * /login — there is no login form on the marketing site. Hanzo IAM is the one
 * sign-in surface, so this starts the OAuth/OIDC redirect; IAM renders the
 * branded page and sends the reader back to /auth/callback.
 */

import { useEffect } from 'react'
import { useIam } from '@hanzo/iam/react'
import { useRouter } from 'next/navigation'
import { Waiting } from '@/components/auth/waiting'

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useIam()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (isAuthenticated) {
      router.replace('/account')
      return
    }
    void login()
  }, [login, isAuthenticated, isLoading, router])

  return <Waiting title="Redirecting to sign in…" lede="Taking you to Hanzo ID." />
}
