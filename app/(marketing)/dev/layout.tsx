import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

export const metadata: Metadata = {
  title: 'Hanzo Dev — AI Coding Agent for Terminal & IDE',
  description: 'Ship production code with AI. Hanzo Dev reads your repo, edits across files coherently, runs tests, and opens PRs. Install with curl -fsSL hanzo.sh | bash',
  openGraph: {
    title: 'Hanzo Dev — AI Coding Agent for Terminal & IDE',
    description: 'Ship production code with AI. Hanzo Dev reads your repo, edits across files coherently, runs tests, and opens PRs. Install with curl -fsSL hanzo.sh | bash',
    url: 'https://hanzo.ai/dev',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Hanzo Dev — AI Coding Agent'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hanzo Dev — AI Coding Agent for Terminal & IDE',
    description: 'Ship production code with AI. Hanzo Dev reads your repo, edits across files coherently, runs tests, and opens PRs. Install with curl -fsSL hanzo.sh | bash',
    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
