'use client'

import {
  Bot,
  Lock,
  Rocket,
  MessagesSquare,
  Server,
  Route,
  Paperclip,
  Users,
  Clock,
  Blocks,
  Smartphone,
  KeyRound,
  MessageSquare,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const BOT = 'https://hanzo.bot'
const DOCS = 'https://docs.hanzo.ai/bot'
const GITHUB = 'https://github.com/hanzoai/bot'

export default function BotLanding() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Bot · Agents in every channel"
        badgeIcon={Bot}
        title="Your agents, in every channel"
        lede="Hanzo Bot connects your AI agents to the messaging channels people already use — WhatsApp, Telegram, Discord, Slack, iMessage, and Signal — plus a built-in web chat. One gateway owns the connections, routes each conversation to the right agent, streams replies back, and carries images, audio, and voice notes. Install it with a single command and run it on your own machine."
        ctas={[
          { label: 'Get started', href: BOT, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Lock, text: 'Open source (MIT). Runs as a single gateway you install on your own machine — your keys, chats, and data stay with you.' }}
        what={{
          eyebrow: 'What is Hanzo Bot',
          title: 'One gateway from your agents to every channel',
          sub: 'Stop rebuilding a bot for every platform. Bot bridges the channels your users already live in to the agents you already have — through one process you run and control.',
          pillars: [
            {
              icon: MessagesSquare,
              title: 'Every channel',
              body: 'Connect once to WhatsApp, Telegram, Discord, Slack, iMessage, and Signal, plus a browser chat — with Mattermost and more added by plugins. A message in any of them reaches your agent; the reply streams back to the same thread.',
            },
            {
              icon: Server,
              title: 'One gateway',
              body: 'A single long-running process owns every channel connection and the control plane. It binds to loopback by default and requires a token for any remote access — local-first, and fully under your control.',
            },
            {
              icon: Route,
              title: 'Many agents, routed',
              body: 'Route each account, group, or contact to its own agent with an isolated workspace and session, so one deployment can run distinct assistants — support in one place, sales in another — without crossing wires.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'Everything a real chat agent needs',
          items: [
            { icon: Paperclip, title: 'Media & voice', body: 'Send and receive images, audio, and documents; optional transcription turns voice notes into text your agent can act on.' },
            { icon: Users, title: 'Group chats', body: 'Works in direct messages and groups. Groups stay isolated and reply on mention by default, with per-group activation rules you control.' },
            { icon: Clock, title: 'Automations', body: 'Trigger agents on a schedule with cron jobs, or from anything with webhooks and Gmail push — so they act without waiting to be messaged.' },
            { icon: Blocks, title: 'Skills', body: 'Extend agents with installable skills — a growing library of command-line tools and integrations they can call to do real work.' },
            { icon: Smartphone, title: 'Companion apps', body: 'A menu-bar app on macOS, plus iOS and Android that pair as nodes and add a camera and canvas surface.' },
            { icon: KeyRound, title: 'Bring your subscription', body: 'Sign in with your existing Claude Pro/Max or ChatGPT/Codex plan over OAuth — no separate per-token API bill to wire up.' },
          ],
        }}
        finalCta={{
          icon: MessageSquare,
          title: 'Put your agent in every channel',
          sub: 'Install the gateway with one command and connect your first channel in minutes.',
          buttons: [
            { label: 'Get started', href: BOT, icon: Rocket },
            { label: 'Read the docs', href: DOCS },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      />
      <ProductFooter slug="bot" name="Bot" />
    </>
  )
}
