import type { Metadata } from 'next'
import { ChatLanding } from '@/components/chat/ChatLanding'

const TITLE = 'Hanzo Chat — every model, agent, and tool in one chat'
const DESCRIPTION =
  'Chat with the Zen model family and other frontier models through one Hanzo API. Build agents, connect MCP tools, chat over your files, search the web, run code, and generate images — signed in with your Hanzo account. Open source; use hanzo.chat or self-host.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description:
      'Talk to the Hanzo AI cloud: every model, agents, MCP tools, files, web search, code, and images in one thread. Open source — use hanzo.chat or self-host.',
    url: 'https://hanzo.chat',
    siteName: 'Hanzo Chat',
    type: 'website',
  },
}

export default function ChatPage() {
  return <ChatLanding />
}
