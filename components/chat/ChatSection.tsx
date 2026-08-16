'use client'

// The /chat surface. The chat itself is Conversation, which every surface on
// this site shares; this route only says what the page is while the thread is
// empty.
//
// Static-export-safe: Conversation's interactive branches only mount
// client-side, so the prerender is the landing alone — which is what SEO reads.

import { ChatLanding } from '@/components/chat/ChatLanding'
import { Conversation } from '@/components/chat/Conversation'

export function ChatSection() {
    return <Conversation placeholder="Ask Hanzo anything" idle={<ChatLanding />} />
}

export default ChatSection
