import type { Metadata } from 'next'
import DevLanding from '@/components/dev/DevLanding'

export const metadata: Metadata = {
  title: 'Hanzo Dev — AI coding agent for your editor and terminal',
  description:
    'The open-source (Apache-2.0) AI coding agent that runs in your terminal and editor. Describe a change in plain language — Dev reads your repo, writes and reviews the code, and ships. Backed by Hanzo Cloud for any model, agents, and one-command deploys.',
  openGraph: {
    title: 'Hanzo Dev — AI coding agent for your editor and terminal',
    description:
      'Open-source coding agent for your terminal and editor. Plain language in, reviewed diffs out — backed by Hanzo Cloud for any model, agents, and deploys.',
    url: 'https://hanzo.sh',
    siteName: 'Hanzo Dev',
    type: 'website',
  },
}

export default function DevPage() {
  return <DevLanding />
}
