'use client'

// Who answers a chat turn on this site, and on whose account.
//
// Signed in — the visitor's own IAM token. Enso routes the turn and it meters to
// their account like every other turn they run.
//
// Signed out — a widget key the gateway knows, asking the free pool. The key is
// public on purpose: the gateway holds it in an allowlist, caps the tokens it may
// spend per request, and bills the org that minted it at zero, which is what lets
// a page carry one. That is the same bargain hanzo.chat gives a guest, made with
// the credential a static site can hold — this export has no server to keep a
// secret in.
//
// Without a key there is no client and the signed-out branch stays marketing. The
// site never sends a completion it cannot attribute.

import { useEffect, useMemo, useState } from 'react'
import { useIam } from '@hanzo/iam/react'
import { createAiClient, type AiClient } from '@hanzo/ai'

// Declared, not fetched — the same reason the ingest key beside it is (see
// app/providers.tsx): it ships in the client bundle by construction, so a value
// every visitor already holds gains nothing from a lookup, and declaring it
// reaches every build lane rather than the ones that remember a build arg. An
// env var still wins, so a lane can point at another gateway without a code
// change.
const WIDGET = process.env.NEXT_PUBLIC_HANZO_WIDGET_KEY || 'hz_ycMEWl9u1Z4S6OkZw3NiVcunDexT4Y9yqHQXJTm9KI8ig4k0'

/** The gateway's own free pool: one id that always answers free, whichever route
 *  happens to be carrying it. Never a vendor `:free` id — those come and go
 *  under this name. */
export const FREE = 'free'

/** Enso routes a signed-in turn, matching hanzo.chat's default. */
export const ENSO = 'enso'

export interface Ai {
  client: AiClient | null
  model: string
  /** Answering free, so the turn is data-shared and owes the notice. */
  free: boolean
  /** Mounted client-side. The static export always prerenders the signed-out
   *  page, so nothing interactive may render until this is true. */
  ready: boolean
}

export function useAi(): Ai {
  const { sdk, isAuthenticated } = useIam()
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  const account = Boolean(isAuthenticated && sdk)

  const client = useMemo(() => {
    if (account && sdk) return createAiClient({ auth: sdk })
    return WIDGET ? createAiClient({ token: WIDGET }) : null
  }, [account, sdk])

  return { client, model: account ? ENSO : FREE, free: !account, ready }
}
