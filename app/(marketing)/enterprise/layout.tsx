import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

export const metadata: Metadata = {
  title: 'Enterprise AI — Hanzo AI',
  description: 'Run Hanzo in our cloud or in yours. Air-gapped deployment, SSO, audit logs, volume pricing, and a person to call.',
  openGraph: {
    title: 'Enterprise AI — Hanzo AI',
    description: 'Run Hanzo in our cloud or in yours. Air-gapped deployment, SSO, audit logs, volume pricing, and a person to call.',
    url: 'https://hanzo.ai/enterprise',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Hanzo AI Enterprise'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI — Hanzo AI',
    description: 'Run Hanzo in our cloud or in yours. Air-gapped deployment, SSO, audit logs, volume pricing, and a person to call.',
    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
