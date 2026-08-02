// Sign-in on hanzo.ai is a HAND-OFF, not a form.
//
// This file used to drive a local login form — "Welcome Back", an email and a
// password field, a signup flow with a terms checkbox. That UI was deliberately
// removed: HIP-0111 makes Hanzo IAM the one canonical login surface, and
// app/(marketing)/login/page.tsx now does nothing but call `login()` from
// @hanzo/iam/react and render "Redirecting to sign in…". Every assertion in the
// old file failed against production for that reason alone — the test outlived
// the UI it described.
//
// What is worth testing is the contract that replaced it, and the most valuable
// assertion is the NEGATIVE one: the marketing site must never grow its own
// password field again. A local form would not fail loudly — it would look like
// a feature, and quietly become a second place where credentials are typed.
//
// Verified against production while writing this: /login and /signup both land
// on hanzo.id with response_type=code, scope=openid profile email,
// code_challenge_method=S256 and redirect_uri=https://hanzo.ai/auth/callback.
// The canonical `/v1/iam/oauth/authorize` that discovery advertises REDIRECTS to
// `/login/oauth/authorize`, so arriving at the latter is the correct end state
// of the former and not the legacy path it resembles.

import { test, expect } from '@playwright/test'

for (const entry of ['/login', '/signup']) {
  test(`${entry} hands off to IAM instead of rendering a form`, async ({ page }) => {
    test.setTimeout(45000)
    await page.goto(entry)

    // Before the hand-off completes, the stub must not be collecting credentials.
    expect(
      await page.locator('input[type="password"]').count(),
      `${entry} renders a password field on hanzo.ai — HIP-0111 makes IAM the ONE login UI`,
    ).toBe(0)

    // The redirect is client-side (useEffect -> login()), so wait for the URL to
    // leave rather than for text on a page that is in the middle of leaving.
    await page
      .waitForURL((url) => url.host.includes('hanzo.id'), { timeout: 20000 })
      .catch(() => {})

    const landed = new URL(page.url())
    expect(landed.host, `${entry} should hand off to IAM, landed on ${page.url()}`).toContain(
      'hanzo.id',
    )

    // The parts of the request that carry the security properties. PKCE in
    // particular: without code_challenge_method=S256 this is a bare code flow.
    const q = landed.searchParams
    expect(q.get('response_type'), 'response_type').toBe('code')
    expect(q.get('code_challenge_method'), 'PKCE method must be S256').toBe('S256')
    expect(q.get('code_challenge'), 'PKCE challenge present').toBeTruthy()
    expect(q.get('state'), 'state present (CSRF)').toBeTruthy()
    expect(q.get('scope') ?? '', 'scope').toContain('openid')
    expect(q.get('redirect_uri') ?? '', 'callback must return to this site').toContain(
      '/auth/callback',
    )
  })
}

test('no route on the marketing site collects a password', async ({ page }) => {
  // The regression guard for the rule above, across the auth-adjacent routes
  // that would be the tempting place to add a form back.
  for (const route of ['/', '/account', '/pricing', '/contact']) {
    await page.goto(route)
    expect(
      await page.locator('input[type="password"]').count(),
      `${route} renders a password field — credentials belong to IAM only`,
    ).toBe(0)
  }
})
