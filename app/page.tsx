import type { Metadata } from 'next'
import HomeLanding from '@/components/home/HomeLanding'

// Apex hanzo.ai — the clean, chat-centric landing. Lives at the app root (outside
// the (marketing) route group) so it is wrapped only by the root layout and
// ships its own openai-style nav + footer. The DETAILED product/marketing pages
// live on cloud.hanzo.ai (the cloud-site image serves cloud-site.html at root and
// the full export beneath it); the nav here deep-links to cloud.hanzo.ai.

const TITLE = 'Hanzo — Chat, models, and the open-source AI cloud'
const DESCRIPTION =
  'Ask Hanzo anything. Chat with open frontier models, build agents, and ship on the open-source AI cloud — models, Base backends, IAM, KMS, and vector search behind one API.'

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
