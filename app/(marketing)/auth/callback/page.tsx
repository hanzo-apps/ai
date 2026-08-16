'use client'

/**
 * AuthCallback - OAuth2/OIDC Callback Handler
 *
 * Handles the redirect back from Hanzo IAM. The @hanzo/iam SDK reads the
 * authorization code + state from the URL and the PKCE verifier from
 * storage, exchanges the code at /v1/iam/oauth/token, and stores tokens.
 */

import { useEffect, useState, Suspense } from 'react';

import { useIam } from '@hanzo/iam/react';
import { useAnalytics } from '@hanzo/event/react';
import { EVENTS, isoWeek } from '@hanzo/event';
import { takeSignupIntent } from '@/lib/analytics/signup-intent';
import { Spinner } from '@hanzo/gui';
import { useRouter } from 'next/navigation';
import { Box } from '@hanzo/ui'

const AuthCallbackInner = () => {
  const router = useRouter();
  const { handleCallback } = useIam();
  const analytics = useAnalytics();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    handleCallback()
      .then(() => {
        if (cancelled) return;
        // The ONE place an account is known to exist. Everything upstream
        // (signup_viewed/submitted) is intent; this is the conversion the Signup
        // goal counts — and a returning sign-in must NOT be counted as one.
        if (takeSignupIntent()) {
          // Stamp the acquisition cohort once, at birth, so every later event
          // (and every retention curve) carries the week the person joined.
          analytics.setCohort({ signupWeek: isoWeek(new Date()) });
          analytics.capture(EVENTS.SIGNUP_COMPLETED);
        } else {
          analytics.capture(EVENTS.LOGIN_COMPLETED);
        }
        router.replace('/account');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        // A failed exchange is the single most expensive drop in the funnel —
        // report it as an error so it lands in the sentry lens next to the drop.
        analytics.captureError(err, { properties: { where: 'auth_callback' } });
        setError(err instanceof Error ? err.message : 'Sign-in failed');
        setTimeout(() => router.replace('/login'), 3000);
      });

    return () => {
      cancelled = true;
    };
  }, [handleCallback, router, analytics]);

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        {error ? (
          <>
            <Box className="text-foreground/70 text-xl font-medium">{error}</Box>
            <p className="text-muted-foreground">Redirecting to login...</p>
          </>
        ) : (
          <>
            <Spinner size="large" color="$foreground" alignItems="center" />
            <h1 className="text-xl font-medium text-foreground">
              Completing authentication...
            </h1>
            <p className="text-muted-foreground">Please wait while we sign you in.</p>
          </>
        )}
      </div>
    </Box>
  );
};

const AuthCallback = () => (
  <Suspense fallback={<Box className="min-h-screen bg-background" />}>
    <AuthCallbackInner />
  </Suspense>
);

export default AuthCallback;
