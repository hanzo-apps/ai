'use client'

// The /chat surface, split by session — so hanzo.ai SHARES the one chat
// experience (`@hanzo/chat` on `@hanzo/ai`) that hanzo.chat and hanzo.app use,
// rather than reimplementing a chat here.
//
// - A SIGNED-IN Hanzo user gets the real interactive chat, embedded: the exact
//   `<Chat>` component, streaming completions billed to THEIR account through
//   api.hanzo.ai, with Enso routing each turn.
// - EVERYONE ELSE can try it free before the product story, on the gateway's free
//   pool through a widget key (see hooks/useAi). Free costs nothing and is
//   data-shared, so `<Try>` asks for that agreement once and keeps the notice up.
//   The landing stays underneath it, unchanged.
//
// Static-export-safe: the interactive branches only mount client-side, so the
// prerender is the landing alone — which is what SEO reads.

import { Chat } from '@hanzo/chat'
import { YStack } from '@hanzo/gui'
import { ChatLanding } from '@/components/chat/ChatLanding'
import { Try } from '@/components/chat/Free'
import { useAi } from '@/hooks/useAi'

const PLACEHOLDER = 'Ask Hanzo anything'

export function ChatSection() {
  const { client, model, free, ready } = useAi()

  if (ready && !free && client) {
    return (
      <YStack flex={1} width="100%" maxWidth={960} marginHorizontal="auto" height="calc(100svh - 4rem)" paddingHorizontal="$4">
        <Chat client={client} model={model} placeholder={PLACEHOLDER} />
      </YStack>
    )
  }

  return (
    <>
      <Try placeholder={PLACEHOLDER} />
      <ChatLanding />
    </>
  )
}

export default ChatSection
