import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

export const metadata: Metadata = {
  title: 'Zen Models by Zoo Labs Foundation — Hanzo AI',
  description: 'Zen from Zoo Labs Foundation: frontier AI models from 0.6B to 1T+ parameters. Zen MoDE (Mixture of Diverse Experts). OpenAI-compatible API. Vision, audio, code, math. From $0.15/MTok.',
  openGraph: {
    title: 'Zen Models by Zoo Labs Foundation — Hanzo AI',
    description: 'Zen from Zoo Labs Foundation: frontier AI models from 0.6B to 1T+ parameters. Zen MoDE (Mixture of Diverse Experts). OpenAI-compatible API. Vision, audio, code, math. From $0.15/MTok.',
    url: 'https://hanzo.ai/zen',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Zen Models by Zoo Labs Foundation'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zen Models by Zoo Labs Foundation — Hanzo AI',
    description: 'Zen from Zoo Labs Foundation: frontier AI models from 0.6B to 1T+ parameters. Zen MoDE (Mixture of Diverse Experts). OpenAI-compatible API. Vision, audio, code, math. From $0.15/MTok.',

    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
