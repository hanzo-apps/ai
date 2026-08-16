'use client'

// The "try it" chat at the foot of /models, split by session the same way the
// /chat route is (see components/chat/ChatSection).
//
// SIGNED IN: the real shared `@hanzo/chat` experience — its own model picker,
// streaming through api.hanzo.ai and metered to THEIR account.
// SIGNED OUT: the same chat on the gateway's free pool through a widget key, so a
// visitor can ask a model here without an account (see hooks/useAi), with the
// sign-in offer kept underneath for the models free does not reach.

import Link from 'next/link'
import { Chat } from '@hanzo/chat'
import { YStack } from '@hanzo/gui'
import { Try } from '@/components/chat/Free'
import { useAi } from '@/hooks/useAi'
import { Box } from '@hanzo/ui'

const PLACEHOLDER = 'Ask any model anything'

export function TryChat() {
  const { client, model, free, ready } = useAi()

  // Signed in: the real shared chat, bounded to a card. Enso routes each turn by
  // default, matching hanzo.chat; the built-in picker switches model in place.
  if (ready && !free && client) {
    return (
      <YStack
        height={620}
        width="100%"
        maxWidth={880}
        marginHorizontal="auto"
        className="overflow-hidden rounded-2xl border border-border bg-secondary/20"
      >
        <Chat client={client} model={model} placeholder={PLACEHOLDER} />
      </YStack>
    )
  }

  return (
    <>
      <Try placeholder={PLACEHOLDER} />
      <Box className="mt-6 rounded-2xl border border-border bg-secondary/20 p-8 text-center md:p-12">
        <p className="mx-auto mb-8 max-w-lg text-base text-muted-foreground md:text-lg">
          Sign in to chat with Enso, Zen, or any model on the endpoint — pick a model, start a thread,
          billed to your account and kept private.
        </p>
        <Box className="flex flex-wrap justify-center gap-3">
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
        </Box>
      </Box>
    </>
  )
}

export default TryChat
