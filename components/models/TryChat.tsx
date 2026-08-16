'use client'

// The "try it" chat at the foot of /models. The chat itself is Conversation,
// the same one /chat offers; this section only says what sits under it while
// the thread is empty — the sign-in offer, for the models free does not reach.

import Link from 'next/link'
import { Box } from '@hanzo/ui'
import { Conversation } from '@/components/chat/Conversation'

export function TryChat() {
    return <Conversation placeholder="Ask any model anything" idle={<SignIn />} />
}

function SignIn() {
    return (
        <Box className="mt-6 rounded-2xl border border-border bg-secondary/20 p-8 text-center md:p-12">
            <p className="mx-auto mb-8 max-w-lg text-base text-muted-foreground md:text-lg">
                Sign in to chat with Enso, Zen, or any model on the endpoint. Pick a model, start a thread,
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
    )
}

export default TryChat
