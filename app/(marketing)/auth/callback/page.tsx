'use client'

/**
 * AuthCallback - OAuth2/OIDC Callback Handler
 *
 * Handles the redirect back from Hanzo IAM. The @hanzo/iam SDK reads the
 * authorization code + state from the URL and the PKCE verifier from
 * storage, exchanges the code at /v1/iam/oauth/token, and stores tokens.
 */

import { useEffect, useState, Suspense } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AuthCallbackInner = () => {
  const router = useRouter();
  const { handleCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    handleCallback()
      .then(() => {
        if (!cancelled) router.replace('/account');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Sign-in failed');
        setTimeout(() => router.replace('/login'), 3000);
      });

    return () => {
      cancelled = true;
    };
  }, [handleCallback, router]);

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
            <h1 className="text-xl font-medium text-foreground">
              Completing authentication...
            </h1>
            <p className="text-muted-foreground">Please wait while we sign you in.</p>
          </>
        )}
      </div>
    </div>
  );
};

const AuthCallback = () => (
  <Suspense fallback={<div className="min-h-screen bg-background" />}>
    <AuthCallbackInner />
  </Suspense>
);

export default AuthCallback;
