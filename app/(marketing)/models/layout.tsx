import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

const DESCRIPTION =
  'Enso is our frontier model family; Zen is our open-weight family. Both run on api.hanzo.ai, and models from other labs answer on the same endpoint with the same key.'

export const metadata: Metadata = {
  title: 'Models — Hanzo AI',
  description: DESCRIPTION,
  openGraph: {
    title: 'Models — Hanzo AI',
    description: DESCRIPTION,
    url: 'https://hanzo.ai/models',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Enso and Zen models on Hanzo AI'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Models — Hanzo AI',
    description: DESCRIPTION,
    images: twitterImages,
  },
}

export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
