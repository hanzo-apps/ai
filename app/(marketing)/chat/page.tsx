import type { Metadata } from 'next'
import { ChatSection } from '@/components/chat/ChatSection'

const TITLE = 'Hanzo Chat — a chat app for the whole cloud'
const DESCRIPTION =
  'One thread reaches every model, your MCP tools, your files, the web, a code sandbox, and the agents you already deployed. Switch models mid-conversation and keep the history. Open source: use hanzo.chat or run it yourself.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description:
      'Every model, your agents, your MCP tools, your files, web search, code and images — in one thread. Open source; use hanzo.chat or run it yourself.',
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
