/**
 * Signup vs login, decided in ONE place.
 *
 * IAM hosts the form, so /auth/callback sees the same redirect for a brand-new
 * account and a returning sign-in — and counting a returning login as a signup
 * would silently inflate the top-line conversion. /signup marks the intent
 * before handing off; the callback takes it (read-once) and picks the event.
 *
 * sessionStorage, not localStorage: the intent must not survive the tab.
 */
const KEY = 'hz_signup_intent'

export function markSignupIntent(): void {
  try {
    window.sessionStorage.setItem(KEY, '1')
  } catch {
    /* private mode — the callback then reports login_completed; never throw */
  }
}

/** Read-once: returns true when this callback completes a signup, and clears. */
export function takeSignupIntent(): boolean {
  try {
    const had = window.sessionStorage.getItem(KEY) === '1'
    window.sessionStorage.removeItem(KEY)
    return had
  } catch {
    return false
  }
}
