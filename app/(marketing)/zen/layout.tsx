import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

export const metadata: Metadata = {
  title: 'Zen Models — the family Hanzo trains',
  description: 'Language, code, vision, audio and video models from 0.6B up to frontier, most with published weights. The large ones are Zen MoDE — Mixture of Diverse Experts — holding many parameters and using few per token. From $0.15/MTok.',
  openGraph: {
    title: 'Zen Models — the family Hanzo trains',
    description: 'Language, code, vision, audio and video models from 0.6B up to frontier, most with published weights. The large ones are Zen MoDE — Mixture of Diverse Experts — holding many parameters and using few per token. From $0.15/MTok.',
    url: 'https://hanzo.ai/zen',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Zen Models by Hanzo'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zen Models — the family Hanzo trains',
    description: 'Language, code, vision, audio and video models from 0.6B up to frontier, most with published weights. The large ones are Zen MoDE — Mixture of Diverse Experts — holding many parameters and using few per token. From $0.15/MTok.',
    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
