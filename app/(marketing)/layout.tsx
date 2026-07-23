import type { Metadata } from 'next'
import LandingNav from '@/components/home/LandingNav'
import LandingFooter from '@/components/home/LandingFooter'
import GlobalChatWidget from '@/components/GlobalChatWidget'
import { AccountProvider } from '@/contexts/AccountContext'
import { BillingProvider } from '@/contexts/BillingContext'

const SITE_TITLE = 'Hanzo — the AI cloud for agents and apps'
const SITE_DESCRIPTION = 'Build, deploy, and govern AI agents with unified access to models, MCP tools, memory, vector search, secure sandboxes, IAM, KMS, and audit logs. Open-source. Self-host or use the cloud.'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://hanzo.ai',
    siteName: 'Hanzo AI',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AccountProvider>
      <BillingProvider>
        <div className="min-h-screen bg-black text-white">
          <LandingNav />
          <main>{children}</main>
          <LandingFooter />
        </div>
        <GlobalChatWidget />
      </BillingProvider>
    </AccountProvider>
  )
}
