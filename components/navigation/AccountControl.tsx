'use client'

import { useIam } from '@hanzo/iam/react'

/**
 * AccountControl — the signed-in/out identity control for the shared
 * `HanzoHeader` `identitySlot`. The ONLY bespoke piece the shell needs from
 * hanzo.ai is the IAM session; brand, nav, CTAs, and the Meet-Hanzo + Products
 * menus all come from the shell.
 *
 * Signed out → "Log in". Signed in → avatar + name → console (SSO via IAM),
 * plus "Sign out". The console federates the IAM session, so both states link
 * to console.hanzo.ai.
 */
export default function AccountControl() {
  const { user, isAuthenticated, logout } = useIam()

  if (!isAuthenticated || !user) {
    return (
      <a
        href="https://console.hanzo.ai"
        className="inline-flex items-center justify-center rounded-full h-9 px-4 text-sm font-medium text-white/80 hover:text-white transition-colors"
      >
        Log in
      </a>
    )
  }

  const label = user.displayName || user.name || user.email || 'Account'

  return (
    <div className="flex items-center gap-1.5">
      <a
        href="https://console.hanzo.ai"
        className="inline-flex items-center gap-2 rounded-full h-9 px-3 text-sm font-medium text-white border border-white/15 hover:bg-white/10 transition-colors"
      >
        <span className="w-5 h-5 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center flex-shrink-0">
          {label.charAt(0).toUpperCase()}
        </span>
        <span className="max-w-[100px] truncate">{label}</span>
      </a>
      <button
        onClick={logout}
        className="inline-flex items-center justify-center rounded-full h-9 px-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
        aria-label="Sign out"
      >
        Sign out
      </button>
    </div>
  )
}
