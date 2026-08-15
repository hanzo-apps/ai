import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

// NO PRICES HERE. This description outlived two repricings still advertising
// Pro $20, Plus $100 and Max $200 — a ladder with a tier we retired — because
// metadata is the one copy nobody re-reads and it cannot read the catalog: it
// is static export, resolved at build with no place to await a fetch. The cards
// state the numbers, live. This states the shape, which does not move.

export const metadata: Metadata = {
  title: 'Pricing — Hanzo AI',
  description: 'Start free on our free models. Paid plans open the best models, lift the limits and include spendable credit every month. Business is per user with a two seat minimum; Enterprise is custom.',
  openGraph: {
    title: 'Pricing — Hanzo AI',
    description: 'Start free on our free models. Paid plans open the best models, lift the limits and include spendable credit every month. Business is per user with a two seat minimum; Enterprise is custom.',
    url: 'https://hanzo.ai/pricing',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Hanzo AI Pricing'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Hanzo AI',
    description: 'Start free on our free models. Paid plans open the best models, lift the limits and include spendable credit every month. Business is per user with a two seat minimum; Enterprise is custom.',
    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
