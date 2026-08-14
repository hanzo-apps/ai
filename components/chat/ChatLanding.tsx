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
const DOCS = 'https://docs.hanzo.ai/docs/chat'
const GITHUB = 'https://github.com/hanzoai/chat'

const SELFHOST = `git clone https://github.com/hanzoai/chat.git
cd chat
cp .env.example .env        # set HANZO_API_KEY
make up                     # app + MongoDB + Meilisearch

# open http://localhost:3080`

export function ChatLanding() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Chat · hanzo.chat"
        badgeIcon={MessageSquare}
        title="A chat app for the whole cloud"
        lede="One thread reaches every model, your MCP tools, your files, the web, a code sandbox, and the agents you already deployed. Switch models mid-conversation and keep the history."
        ctas={[
          { label: 'Open Hanzo Chat', href: CHAT, icon: MessageSquare },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source, MIT. Sign in with your Hanzo account at hanzo.chat, or run the whole stack yourself.' }}
        availableThrough={['hanzo.chat', 'Self-hosted', 'MCP tools', 'Hanzo Cloud agents']}
        what={{
          eyebrow: 'What is Hanzo Chat',
          title: 'The thread is the workspace',
          sub: 'Most chat apps are a window onto one model. This one is a window onto the account — the same key, tools, agents and files your code uses, in a place where you can try them by typing.',
          pillars: [
            {
              icon: Boxes,
              title: 'Every model, one thread',
              body: 'Change the model on the next turn and the conversation carries over, so you can hand a hard question up to a bigger model without repeating yourself. Or send it to Enso and let the router decide per turn.',
            },
            {
              icon: Bot,
              title: 'Agents and tools',
              body: 'Build an agent in the thread, or call one you already deployed with /agent or an @mention. Connect a Model Context Protocol server and its tools become things the model can call here.',
            },
            {
              icon: Compass,
              title: 'Answers with sources',
              body: 'Attach files and ask across them, search the web through our own backend rather than reselling someone else\'s, and run code in a sandbox that returns real output.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'What a turn can do',
          items: [
            { icon: Workflow, title: 'Enso routing', body: 'Send the turn to Enso instead of a model and the router classifies it, prices it, and picks. Easy turns stay cheap; hard ones escalate. The choice costs microseconds on a CPU, so it is free next to the call it precedes.' },
            { icon: Wrench, title: 'MCP tools', body: 'Point the thread at a Model Context Protocol server and its tools show up as things the model may call — yours, ours, or anyone\'s.' },
            { icon: Code2, title: 'Code interpreter', body: 'Code runs in a sandbox and the output comes back inline, so a wrong answer is visibly wrong instead of confidently formatted.' },
            { icon: FileStack, title: 'Your files', body: 'Images, PDFs and text. Ask across everything attached to the thread, not one document at a time.' },
            { icon: Globe, title: 'Web search', body: 'Grounded in our own search backend. There is no third-party search vendor in the loop, so what a query costs and what it retrieves are both ours to answer for.' },
            { icon: ImagePlus, title: 'Images', body: 'Generate them in the conversation you are already in, and keep iterating on the same thread rather than starting a new tool.' },
          ],
        }}
        code={{
          head: { eyebrow: 'Self-host', title: 'The whole stack, on your machine', sub: 'Node 24 and pnpm 10, or skip both and use the compose file. Sign-in federates to Hanzo IAM; inference, code execution and web search all route through api.hanzo.ai, so a self-hosted install is the same product with your database under it.' },
          lang: 'bash',
          source: SELFHOST,
          ctas: [
            { label: 'Read the docs', href: DOCS },
            { label: 'View on GitHub', href: GITHUB },
          ],
        }}
        finalCta={{
          icon: MessageSquare,
          title: 'Open a thread',
          sub: 'Sign in at hanzo.chat, or clone the repo and run it yourself.',
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
