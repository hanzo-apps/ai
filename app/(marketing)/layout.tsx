import type { Metadata } from 'next'
import { SiteHeader, SiteFooter, SURFACE } from '@/components/home/shell'
import { AccountProvider } from '@/contexts/AccountContext'
import { ogImages, twitterImages } from '@/lib/constants/og'
import { Box } from '@hanzo/ui'

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
    images: ogImages(SITE_TITLE),
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: twitterImages,
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AccountProvider>
      <Box className="min-h-screen bg-black text-white">
        {/* Keyboard users land on the nav first and would otherwise tab through
            every menu on every page before reaching the content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border focus:border-neutral-700 focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {/* The BUILD says which site this is — see SURFACE in components/home/shell.
            This was hardcoded `cloud`, and since hanzo.ai and cloud.hanzo.ai are
            two deployments of this one tree, every page here wore Hanzo Cloud's
            brand: /models introduced itself as Hanzo Cloud while the root said
            Hanzo AI, two pages of one site reading as two companies. */}
        <SiteHeader surface={SURFACE} />
        <main id="main">{children}</main>
        <SiteFooter surface={SURFACE} />
      </Box>
    </AccountProvider>
  )
}
