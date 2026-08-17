'use client'

// The chat on this site. One of them.
//
// Three concerns meet here and each stays where it lives: `useAi` answers whose
// pool pays, `Gate` answers whether a free visitor has agreed to free's terms,
// and `Thread` renders the conversation. This wires them, and every surface that
// offers a chat calls this rather than assembling its own — /chat and the foot
// of /models differ only in the copy they pass as `idle`.
//
// Before the first message the page is still a page: a composer with `idle`
// under it. After it the page is the chat and nothing else, because answering
// underneath a product pitch reads as a demo of a chat rather than as a chat.
//
// `<Chat>` from @hanzo/chat owns its own thread, so a surface that reacts to the
// thread cannot use it — two `useChat` calls would be two conversations. The
// package's own answer is to compose `useChat` with the exported pieces, which
// is what `Thread` does. The pieces are still the package's, so hanzo.ai,
// hanzo.chat and hanzo.app render the same parts.

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { Composer, MessageList, ModelPicker, useChat, type Client } from '@hanzo/chat'
import { YStack } from '@hanzo/gui'
import { Gate, Notice } from '@/components/chat/Free'
import { useAi } from '@/hooks/useAi'

export function Conversation({
    placeholder,
    idle,
}: {
    placeholder: string
    /** The page, while the thread is empty. Gone once it is not. */
    idle?: ReactNode
}) {
    const { client, model, free, ready } = useAi()

    if (!ready || !client) {
        return <>{idle}</>
    }

    if (!free) {
        return <Thread client={client} model={model} placeholder={placeholder} idle={idle} />
    }

    // The gate wraps the THREAD, never `idle`. `idle` is the page — on the home
    // route it is the entire site — and wrapping it meant a signed-out visitor
    // was met by a consent dialog where the homepage should be, before they had
    // asked anything. Consent is owed when someone sends, not when they arrive.
    return (
        <>
            <Gate>
                <Thread client={client} model={model} placeholder={placeholder} />
            </Gate>
            <Notice />
            {idle}
        </>
    )
}

function Thread({
    client,
    model: initialModel,
    placeholder,
    idle,
}: {
    client: Client
    model?: string
    placeholder: string
    idle?: ReactNode
}) {
    const [model, setModel] = useState(initialModel ?? 'enso')
    const { messages, isLoading, send, stop } = useChat({ client, model })

    if (messages.length === 0) {
        return (
            <>
                <YStack width="100%" maxWidth={880} marginHorizontal="auto" paddingHorizontal="$4">
                    <Composer onSend={send} placeholder={placeholder} />
                </YStack>
                {idle}
            </>
        )
    }

    return (
        <YStack
            width="100%"
            maxWidth={960}
            marginHorizontal="auto"
            height="calc(100svh - 4rem)"
            paddingHorizontal="$4"
        >
            <ModelPicker client={client} value={model} onChange={setModel} />
            <MessageList messages={messages} />
            <Composer onSend={send} busy={isLoading} onStop={stop} placeholder={placeholder} />
            <KeepBuilding />
        </YStack>
    )
}

/** Where a thread goes when a visitor wants more than one page can hold. */
function KeepBuilding() {
    return (
        <p className="px-1 py-3 text-center text-xs text-muted-foreground">
            Keep building at{' '}
            <Link href="https://hanzo.chat" className="underline underline-offset-2 hover:text-foreground">
                hanzo.chat
            </Link>{' '}
            or{' '}
            <Link href="https://hanzo.app" className="underline underline-offset-2 hover:text-foreground">
                hanzo.app
            </Link>
        </p>
    )
}
