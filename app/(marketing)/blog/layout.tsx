import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

export const metadata: Metadata = {
  title: 'Blog — Hanzo AI',
  description: 'AI infrastructure insights: agent architecture, Zen model releases, model routing guides, MCP tools, and enterprise AI deployment. From the team building the AI cloud.',
  openGraph: {
    title: 'Blog — Hanzo AI',
    description: 'AI infrastructure insights: agent architecture, Zen model releases, model routing guides, MCP tools, and enterprise AI deployment. From the team building the AI cloud.',
    url: 'https://hanzo.ai/blog',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Hanzo AI Blog'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Hanzo AI',
    description: 'AI infrastructure insights: agent architecture, Zen model releases, model routing guides, MCP tools, and enterprise AI deployment. From the team building the AI cloud.',
    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
