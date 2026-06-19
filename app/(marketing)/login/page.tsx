'use client'

/**
 * /login — there is no separate login form on the marketing site.
 * The one canonical login UI is Hanzo IAM. We immediately start the
 * OAuth/OIDC redirect; IAM renders the branded sign-in page and sends
 * the user back to /auth/callback.
 */

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <Loader2 className="w-12 h-12 animate-spin text-foreground mx-auto" />
        <h1 className="text-xl font-medium text-foreground">Redirecting to sign in…</h1>
      </div>
    </div>
  );
};

export default LoginPage;
