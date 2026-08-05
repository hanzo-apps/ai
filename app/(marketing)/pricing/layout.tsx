import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

export const metadata: Metadata = {
  title: 'Pricing — Hanzo AI',
  description: 'Pay only for what you use. Pro $20/mo, Plus $100/mo, Max $200/mo — one subscription, unified AI usage across hanzo.ai, hanzo.app & hanzo.team, 3 invited guests included. Team $25/user/mo, minimum 2 seats. Enterprise: custom SLAs and dedicated support.',
  openGraph: {
    title: 'Pricing — Hanzo AI',
    description: 'Pay only for what you use. Pro $20/mo, Plus $100/mo, Max $200/mo — one subscription, unified AI usage across hanzo.ai, hanzo.app & hanzo.team, 3 invited guests included. Team $25/user/mo, minimum 2 seats. Enterprise: custom SLAs and dedicated support.',
    url: 'https://hanzo.ai/pricing',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Hanzo AI Pricing'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Hanzo AI',
    description: 'Pay only for what you use. Pro $20/mo, Plus $100/mo, Max $200/mo — one subscription, unified AI usage across hanzo.ai, hanzo.app & hanzo.team, 3 invited guests included. Team $25/user/mo, minimum 2 seats. Enterprise: custom SLAs and dedicated support.',
    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
