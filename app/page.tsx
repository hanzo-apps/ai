import type { Metadata } from 'next'
import HomeLanding from '@/components/home/HomeLanding'

// Apex hanzo.ai — the UNIFIED, claude.com-direction landing for the whole Hanzo
// AI cloud. Lives at the app root (outside the (marketing) route group) so it is
// wrapped only by the root layout and ships its own nav + footer. Platform is the
// umbrella (the ten cloud-primitive categories); the nav routes out to each
// product's own home (Console, Builder, Studio, Chat). The DETAILED product /
// marketing pages live on cloud.hanzo.ai (the cloud-site image serves
// cloud-site.html at root and the full export beneath it).

const TITLE = 'Hanzo — The open-source AI cloud'
const DESCRIPTION =
  'The unified surface over Hanzo’s models and cloud — every service behind one OpenAI-compatible gateway at api.hanzo.ai/v1. Open-weight Zen models and the Enso router, ten cloud-primitive categories, one identity, one bill. Managed or self-hosted, on-chain.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://hanzo.ai' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://hanzo.ai',
    siteName: 'Hanzo',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
}

export default function Page() {
  return <HomeLanding />
}
