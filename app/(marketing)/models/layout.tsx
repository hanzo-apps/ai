import type { Metadata } from 'next'

const DESCRIPTION =
  'enso is our frontier model family; Zen is our open-weight family. Both run on api.hanzo.ai, and models from other labs answer on the same endpoint with the same key.'

export const metadata: Metadata = {
  title: 'Models — Hanzo AI',
  description: DESCRIPTION,
  openGraph: {
    title: 'Models — Hanzo AI',
    description: DESCRIPTION,
    url: 'https://hanzo.ai/models',
    siteName: 'Hanzo AI',
    type: 'website',
    images: [{ url: '/models/opengraph-image', width: 1200, height: 630, alt: 'enso and Zen models on Hanzo AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Models — Hanzo AI',
    description: DESCRIPTION,
    images: ['/models/opengraph-image'],
  },
}

export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
