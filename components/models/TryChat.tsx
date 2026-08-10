'use client'

// The "try it" chat at the foot of /models, split by session the same way the
// /chat route is (see components/chat/ChatSection): a SIGNED-IN Hanzo user gets
// the real shared `@hanzo/chat` experience — its own model picker, streaming
// through api.hanzo.ai and metered to THEIR account — while everyone else gets a
// compact sign-in prompt. No anonymous-inference path opens here; a logged-out
// visitor never spends someone's balance.
//
// Static-export-safe: the interactive branch mounts client-side only, so the
// prerendered HTML is always the signed-out prompt and a signed-in browser swaps
// to the chat after hydration.

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useIam } from '@hanzo/iam/react'
import { Chat } from '@hanzo/chat'
import { createAiClient } from '@hanzo/ai'
import { YStack } from '@hanzo/gui'

export function TryChat() {
  const { sdk, isAuthenticated } = useIam()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // ONE client per session — `sdk` is the @hanzo/iam browser SDK, structurally
  // the `IamAuth` the client wants, so every request carries a fresh access
  // token. baseUrl defaults to the gateway (https://api.hanzo.ai).
  const client = useMemo(() => (sdk ? createAiClient({ auth: sdk }) : null), [sdk])

  // Logged-out or pre-hydration: the compact prompt the static export bakes.
  if (!mounted || !isAuthenticated || !client) {
    return (
      <div className="rounded-2xl border border-border bg-secondary/20 p-8 text-center md:p-12">
        <p className="mx-auto mb-8 max-w-lg text-base text-muted-foreground md:text-lg">
          Sign in to chat with Enso, Zen, or any model on the endpoint — pick a model, start a thread,
          billed to your account.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Get free API key
          </Link>
          <Link
            href="https://hanzo.chat"
            className="rounded-full border border-neutral-700 px-8 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400"
          >
            Open hanzo.chat
          </Link>
        </div>
      </div>
    )
  }

  // Signed in: the real shared chat, bounded to a card. Enso routes each turn by
  // default, matching hanzo.chat; the built-in picker switches model in place.
  return (
    <YStack
      height={620}
      width="100%"
      maxWidth={880}
      marginHorizontal="auto"
      className="overflow-hidden rounded-2xl border border-border bg-secondary/20"
    >
      <Chat client={client} model="enso" placeholder="Ask any model anything" />
    </YStack>
  )
}

export default TryChat
