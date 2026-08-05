import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

export const metadata: Metadata = {
  title: 'Enterprise AI — Hanzo AI',
  description: 'Enterprise-grade AI infrastructure with custom SLAs, dedicated support, air-gapped deployment, SSO, audit logs, and volume pricing. Techstars-backed, SOC 2 readiness.',
  openGraph: {
    title: 'Enterprise AI — Hanzo AI',
    description: 'Enterprise-grade AI infrastructure with custom SLAs, dedicated support, air-gapped deployment, SSO, audit logs, and volume pricing. Techstars-backed, SOC 2 readiness.',
    url: 'https://hanzo.ai/enterprise',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Hanzo AI Enterprise'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI — Hanzo AI',
    description: 'Enterprise-grade AI infrastructure with custom SLAs, dedicated support, air-gapped deployment, SSO, audit logs, and volume pricing. Techstars-backed, SOC 2 readiness.',
    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
