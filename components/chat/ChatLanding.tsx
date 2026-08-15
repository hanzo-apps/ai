'use client'

/**
 * hanzo.ai's page about Hanzo Chat.
 *
 * THE SPLIT. hanzo.chat is the chat product and owns the invitation to use it —
 * a visitor who lands there gets a composer and can type. This page is the
 * company's page ABOUT that product: what it is, and that the code is open. It
 * is the only one of the two with a reason to say the second half, and it hands
 * every reader who wants the first half over to hanzo.chat, which is the
 * canonical address and the first button here.
 *
 * WHAT THIS PAGE STOPPED SAYING. It used to be pitched as "a chat app for the
 * whole cloud" whose thread was "a window onto the account — the same key,
 * tools, agents and files your code uses". That is a developer's console, and
 * cloud.hanzo.ai already sells the cloud. It also claimed a routing cost in
 * microseconds that nothing here measures.
 *
 * FIVE CAPABILITIES CAME OFF, each checked in hanzoai/chat rather than assumed:
 * image generation ships no key and has no endpoint behind it; MCP is under a
 * standing build gate refusing it until something filters its tools, so a reader
 * may bring their own server but we do not hand them tools; the agent
 * marketplace is off for the USER role; conversation search reads env vars
 * nothing sets; and projects are a card linking to hanzo.app.
 *
 * The self-host quickstart came off too, and that one is worth stating plainly:
 * it published the wrong port for as long as it existed, named three of five
 * services, and `cp .env.example .env && make up` does not come up clean — UID
 * and GID are commented out and the search key is empty. Publishing an install
 * that fails is its own kind of untruth. The claim stays and the reader is sent
 * to the repo, which is where an install that works will live.
 */

import {
  MessageSquare,
  Globe,
  Terminal,
  FileStack,
  Bot,
  Route,
  Cloud,
  Share2,
  GitBranch,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const CHAT = 'https://hanzo.chat'
const DOCS = 'https://docs.hanzo.ai/docs/chat'
const GITHUB = 'https://github.com/hanzoai/chat'

export function ChatLanding() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Chat · hanzo.chat"
        badgeIcon={MessageSquare}
        title="A chat app that does more than answer"
        lede="It searches the web, runs the code it writes, and reads the files you drop in — in one conversation. Use it at hanzo.chat, or read the code and run the same thing yourself."
        ctas={[
          { label: 'Open Hanzo Chat', href: CHAT, icon: MessageSquare },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source, MIT. Sign in with your Hanzo account at hanzo.chat, where the first two questions need no account at all.' }}
        availableThrough={['hanzo.chat', 'Self-hosted']}
        mockup={{
          slug: 'chat',
          alt: 'A Hanzo Chat conversation, with the reader’s earlier chats listed beside it.',
        }}
        what={{
          eyebrow: 'What is Hanzo Chat',
          title: 'What a plain chat box cannot do',
          sub: 'All of it happens in the conversation you are already having, rather than in something you have to go and open.',
          pillars: [
            {
              icon: Route,
              title: 'You do not have to pick a model',
              body: 'Enso is our own model, and it picks which model answers each question. Name a different one whenever you like — the conversation carries over, so a hard question can go to something bigger without you saying it all again.',
            },
            {
              icon: Terminal,
              title: 'It goes and does the work',
              body: 'It searches the web and says where the answer came from, runs the code it writes and shows what came back, and reads the files you hand it. Not a description of the work. The work.',
            },
            {
              icon: Cloud,
              title: 'It is yours to run',
              body: 'The code is open under MIT and the repo is public. Clone it and you get the same product with your own database under it, federating sign-in to Hanzo IAM and routing through api.hanzo.ai.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'What a turn can do',
          items: [
            { icon: Globe, title: 'Search the web', body: 'Ask about something that happened this morning and it goes and looks. No third-party search vendor sits in the middle of it.' },
            { icon: Terminal, title: 'Run code', body: 'Code runs in a sandbox leased under your own account, and the output comes back inline — so an answer that does not work is visibly broken instead of confidently formatted.' },
            { icon: FileStack, title: 'Read your files', body: 'Images, PDFs and text. Ask across everything attached to the conversation, rather than one document at a time.' },
            { icon: Bot, title: 'Build an agent', body: 'Give a job you do often to something you can call by name, and hand it the tools it needs to finish.' },
            { icon: GitBranch, title: 'Fork a thread', body: 'Split the conversation where it got interesting and try the next question two ways, without losing the way it went the first time.' },
            { icon: Share2, title: 'Share a link', body: 'Hand someone the conversation and they can read it without an account of their own.' },
          ],
        }}
        finalCta={{
          icon: MessageSquare,
          title: 'Go and ask it something',
          sub: 'The first two questions do not need an account.',
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
