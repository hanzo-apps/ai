import type { Metadata } from 'next'
import { ChatSection } from '@/components/chat/ChatSection'

const TITLE = 'Hanzo Chat — a chat app that does more than answer'
const DESCRIPTION =
  'It searches the web, runs the code it writes, reads the files you drop in and makes pictures — in one conversation. Use it at hanzo.chat, or run the same thing on your own machine.'

/* `url` is hanzo.chat, not this page. The product lives there and that is the
   address worth sharing; this page is what the company has to say about it. */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://hanzo.chat',
    siteName: 'Hanzo Chat',
    type: 'website',
  },
}

export default function ChatPage() {
  // Signed-in Hanzo users get the real embedded chat; everyone else keeps the
  // marketing landing + the free hanzo.chat handoff. See ChatSection.
  return <ChatSection />
}
