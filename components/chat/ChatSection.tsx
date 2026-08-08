'use client'

// The /chat surface, split by session — so hanzo.ai SHARES the one chat
// experience (`@hanzo/chat` on `@hanzo/ai`) that hanzo.chat and hanzo.app use,
// rather than reimplementing a chat here.
//
// - A SIGNED-IN Hanzo user gets the real interactive chat, embedded: the exact
//   `<Chat>` component, streaming completions billed to THEIR account through
//   api.hanzo.ai. No new anonymous-inference surface — the client authenticates
//   with the same `@hanzo/iam` SDK the site already holds (`useIam().sdk` IS the
//   `IamAuth` `@hanzo/ai` accepts), so a turn is metered like any other, never a
//   free-money path for a logged-out visitor.
// - EVERYONE ELSE keeps the marketing landing unchanged — the free "open
//   hanzo.chat" handoff for logged-out traffic, and the SEO/static HTML this
//   route prerenders (a signed-out session is what `output: export` bakes).
//
// Static-export-safe: the interactive branch only mounts client-side (`mounted`),
// so the prerender is always the marketing landing; a signed-in browser swaps to
// the chat after hydration.

import { useEffect, useMemo, useState } from 'react'
import { useIam } from '@hanzo/iam/react'
import { Chat } from '@hanzo/chat'
import { createAiClient } from '@hanzo/ai'
import { YStack } from '@hanzo/gui'
import { ChatLanding } from '@/components/chat/ChatLanding'

export function ChatSection() {
  const { sdk, isAuthenticated } = useIam()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // ONE client per session, reused across renders. `sdk` is the @hanzo/iam
  // browser SDK — structurally the `IamAuth` the client wants — so it hands over
  // a fresh, auto-refreshed access token per request. baseUrl defaults to the
  // gateway (https://api.hanzo.ai).
  const client = useMemo(() => (sdk ? createAiClient({ auth: sdk }) : null), [sdk])

  // Logged-out (or pre-hydration): the marketing landing, verbatim. This is what
  // the static export renders and what SEO reads.
  if (!mounted || !isAuthenticated || !client) return <ChatLanding />

  // Signed in: the real shared chat, embedded. Enso routes each turn by default,
  // matching hanzo.chat's "new chats default to Enso".
  return (
    <YStack flex={1} width="100%" maxWidth={960} marginHorizontal="auto" height="calc(100svh - 4rem)" paddingHorizontal="$4">
      <Chat client={client} model="enso" placeholder="Ask Hanzo anything" />
    </YStack>
  )
}

export default ChatSection
