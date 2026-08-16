'use client'

/**
 * /login — there is no separate login form on the marketing site.
 * The one canonical login UI is Hanzo IAM. We immediately start the
 * OAuth/OIDC redirect; IAM renders the branded sign-in page and sends
 * the user back to /auth/callback.
 */

import { useEffect } from 'react';
import { useIam } from '@hanzo/iam/react';
import { Spinner } from '@hanzo/gui';
import { useRouter } from 'next/navigation';
import { Box } from '@hanzo/ui'

const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useIam();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.replace('/account');
      return;
    }
    void login();
  }, [login, isAuthenticated, isLoading, router]);

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <Spinner size="large" color="$foreground" alignItems="center" />
        <h1 className="text-xl font-medium text-foreground">Redirecting to sign in…</h1>
      </div>
    </Box>
  );
};

export default LoginPage;
