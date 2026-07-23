import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Providers } from './providers'
import './globals.css'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE_TITLE = 'Hanzo — Open-source cloud for AI agents'
const SITE_DESCRIPTION = 'Build, deploy, and govern AI agents with unified access to models, MCP tools, memory, vector search, secure sandboxes, IAM, KMS, and audit logs. Open-source. Self-host or use the cloud.'

export const metadata: Metadata = {
  metadataBase: new URL('https://hanzo.ai'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // Full modern favicon set from the canonical Hanzo mark (public/favicon.*).
  // Single source of truth — there is no app/icon.* convention file.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Geist font CSS vars go on <html> (the :root element): Tailwind v4's @theme
  // tokens (--font-sans: var(--font-geist)…) and the preflight base font resolve
  // at :root, so the vars must be defined there — on <body> they'd be out of
  // scope and the whole chain falls back to system fonts.
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
        {/* Product events + errors ride the @hanzo/event client (in <Providers>).
            The web-analytics dashboard at analytics.hanzo.ai reads its OWN store, so
            its pageviews + autocapture come from the ONE Hanzo tag below — a RAW
            async <script> (next/script's afterInteractive is dropped by
            output:'export', so the tag would otherwise never ship). It streams to
            analytics.hanzo.ai/v1/event, the store the dashboard reads. */}
        <script async src="https://analytics.hanzo.ai/hz.js" data-site="hanzo.ai" />
      </body>
    </html>
  )
}
