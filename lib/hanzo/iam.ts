import type { IAMConfig } from '@hanzo/iam/browser';

/**
 * Canonical Hanzo IAM config (HIP-0111).
 *
 * One way: the `@hanzo/iam` SDK against the canonical OIDC endpoints.
 * hanzo brand → serverUrl `iam.hanzo.ai`; client_id `<org>-<app>` = `hanzo-ai`.
 * No legacy `/oauth/*`, no `/api/login`, no hand-rolled OAuth.
 */
const SERVER_URL = process.env.NEXT_PUBLIC_HANZO_IAM_URL || 'https://iam.hanzo.ai';
const CLIENT_ID = process.env.NEXT_PUBLIC_HANZO_CLIENT_ID || 'hanzo-ai';
const REDIRECT_URI =
  process.env.NEXT_PUBLIC_HANZO_REDIRECT_URI ||
  (typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : 'https://hanzo.ai/auth/callback');

/**
 * In-memory Storage shim. The SDK constructor falls back to bare
 * `sessionStorage` when none is provided — a ReferenceError during the
 * static-export prerender (no DOM). Passing an explicit storage keeps the
 * SDK from ever touching a global that doesn't exist on the server.
 */
function memoryStorage(): Storage {
  const m = new Map<string, string>();
  return {
    get length() {
      return m.size;
    },
    clear: () => m.clear(),
    getItem: (k: string) => (m.has(k) ? (m.get(k) as string) : null),
    key: (i: number) => Array.from(m.keys())[i] ?? null,
    removeItem: (k: string) => {
      m.delete(k);
    },
    setItem: (k: string, v: string) => {
      m.set(k, String(v));
    },
  };
}

export const iamConfig: IAMConfig = {
  serverUrl: SERVER_URL,
  clientId: CLIENT_ID,
  appName: 'hanzo-ai',
  redirectUri: REDIRECT_URI,
  scope: 'openid profile email',
  storage: typeof window !== 'undefined' ? window.sessionStorage : memoryStorage(),
};
