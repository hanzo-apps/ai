'use client'

import {
  MessageSquare,
  Boxes,
  Bot,
  Compass,
  Cloud,
  Workflow,
  Wrench,
  Code2,
  FileStack,
  Globe,
  ImagePlus,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const CHAT = 'https://hanzo.chat'
const DOCS = 'https://docs.hanzo.ai/chat'
const GITHUB = 'https://github.com/hanzoai/chat'

export function ChatLanding() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Chat · hanzo.chat"
        badgeIcon={MessageSquare}
        title="The front door to Hanzo AI"
        lede="Hanzo Chat is where you talk to the Hanzo AI cloud. Open a thread to reach the Zen model family and other frontier models through one API — switch models mid-conversation, or let Enso route each turn to the best fit — then build agents, connect MCP tools, chat over your files, search the web, run code, and generate images, all in the same conversation."
        ctas={[
          { label: 'Open Hanzo Chat', href: CHAT, icon: MessageSquare },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (Apache-2.0). Sign in with your Hanzo account, or self-host the whole stack.' }}
        what={{
          eyebrow: 'What is Hanzo Chat',
          title: 'Chat with the whole Hanzo cloud',
          sub: 'One place to pick a model, attach your tools and files, and keep the entire conversation — signed in with your Hanzo account, or self-hosted from the open-source release.',
          pillars: [
            {
              icon: Boxes,
              title: 'Every model, one thread',
              body: 'Reach the Zen model family and other frontier models through a single Hanzo API. Switch models mid-conversation, or let Enso route each turn to the best-fit model.',
            },
            {
              icon: Bot,
              title: 'Agents and tools',
              body: 'Build an agent right in the thread, or run your Hanzo Cloud agents with an /agent command or an @mention. Connect Model Context Protocol servers so a model can call your tools.',
            },
            {
              icon: Compass,
              title: 'Grounded, not guessing',
              body: 'Chat over your own files, search the web through Hanzo’s own backend, and run code in a sandbox — so answers come from real sources, not guesswork.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'One chat, every capability',
          items: [
            { icon: Workflow, title: 'Enso routing by default', body: 'New chats default to Enso, which routes each turn to the best-fit model — easy turns stay cheap, hard ones escalate.' },
            { icon: Wrench, title: 'MCP tools', body: 'Connect Model Context Protocol servers and let a model call your tools, APIs, and data.' },
            { icon: Code2, title: 'Code interpreter', body: 'Run code in a sandboxed runtime and get results back inline, without leaving the thread.' },
            { icon: FileStack, title: 'Chat over your files', body: 'Upload images, PDFs, and text, then ask questions across everything you’ve attached.' },
            { icon: Globe, title: 'Grounded web search', body: 'Answers backed by Hanzo’s own search backend — no third-party search service in the loop.' },
            { icon: ImagePlus, title: 'Image generation', body: 'Generate images inline, in the same conversation you’re already working in.' },
          ],
        }}
        finalCta={{
          icon: MessageSquare,
          title: 'Open a thread',
          sub: 'Pick a model, attach your tools and files, and start chatting on hanzo.chat — or self-host the open-source stack.',
          buttons: [
            { label: 'Open Hanzo Chat', href: CHAT, icon: MessageSquare },
            { label: 'Read the docs', href: DOCS },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      />
      <ProductFooter slug="chat" name="Chat" />
    </>
  )
}

export default ChatLanding
