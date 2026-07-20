import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Hanzo AI',
  description: 'Start free with $5 credit. Pro $20/mo, Plus $100/mo, Max $200/mo — one subscription, unified AI usage across hanzo.ai, hanzo.app & hanzo.team, 3 invited guests included. Team $25/user/mo, minimum 2 seats. Enterprise: custom SLAs and dedicated support.',
  openGraph: {
    title: 'Pricing — Hanzo AI',
    description: 'Start free with $5 credit. Pro $20/mo, Plus $100/mo, Max $200/mo — one subscription, unified AI usage across hanzo.ai, hanzo.app & hanzo.team, 3 invited guests included. Team $25/user/mo, minimum 2 seats. Enterprise: custom SLAs and dedicated support.',
    url: 'https://hanzo.ai/pricing',
    siteName: 'Hanzo AI',
    type: 'website',
    images: [{ url: '/pricing/opengraph-image', width: 1200, height: 630, alt: 'Hanzo AI Pricing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Hanzo AI',
    description: 'Start free with $5 credit. Pro $20/mo, Plus $100/mo, Max $200/mo — one subscription, unified AI usage across hanzo.ai, hanzo.app & hanzo.team, 3 invited guests included. Team $25/user/mo, minimum 2 seats. Enterprise: custom SLAs and dedicated support.',
    images: ['/pricing/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
