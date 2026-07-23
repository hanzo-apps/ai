import type { Metadata } from 'next'
import BotLanding from '@/components/bot/BotLanding'

export const metadata: Metadata = {
  title: 'Hanzo Bot — publish AI agents to every channel',
  description:
    'Connect your AI agents to WhatsApp, Telegram, Discord, Slack, iMessage, and Signal — plus web chat — through one open-source gateway you run yourself. Multi-agent routing, media, group chats, automations, and skills.',
  openGraph: {
    title: 'Hanzo Bot — publish AI agents to every channel',
    description:
      'One open-source gateway connects your agents to WhatsApp, Telegram, Discord, Slack, iMessage, and Signal, plus web chat. Multi-agent routing, media, automations, and skills — self-hosted.',
    url: 'https://hanzo.bot',
    siteName: 'Hanzo Bot',
    type: 'website',
  },
}

export default function BotPage() {
  return <BotLanding />
}
