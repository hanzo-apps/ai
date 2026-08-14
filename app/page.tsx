import type { Metadata } from 'next'
import HomeLanding from '@/components/home/HomeLanding'
import { ogImages, twitterImages } from '@/lib/constants/og'

// Apex hanzo.ai — the clean, chat-centric landing. Lives at the app root (outside
// the (marketing) route group) so it is wrapped only by the root layout and
// ships its own openai-style nav + footer. The DETAILED product/marketing pages
// live on cloud.hanzo.ai (the cloud-www image serves the /overview homepage at
// root and the full export beneath it); the nav here deep-links to cloud.hanzo.ai.

const TITLE = 'Hanzo — the open AI cloud'
const DESCRIPTION =
  'Chat with frontier models, build agents, and run the services an app needs — models, Base backends, IAM, KMS, and vector search behind one API. The same code runs on your own machine.'

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
    images: ogImages(TITLE),
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: twitterImages,
  },
}

export default function Page() {
  return <HomeLanding />
}
