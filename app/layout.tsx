import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { GuiProvider } from '@/components/GuiProvider'
import { Providers } from './providers'
import './globals.css'
// THE MATERIAL. `glass.css` is @hanzo/ui's frosted surfaces, row separators,
// dialog scrim and the PAPER ladder — `.elevation-1/2` reading @hanzo/design's
// `--shadow-sheet-*`, and `.fold`, the corner turned back that means an item
// opens. It is the rules alone: every value in it is a design token this app
// already mounts, so it publishes nothing and shadows nothing.
//
// Not `@hanzo/ui/theme.css`, which is the same rules WITH design's whole sheet
// and `base.css` inlined ahead of them. globals.css already imports design's ten
// token files, and it imports `base.css` into `layer(base)` deliberately — bare,
// its element selectors (`a { color: … }`) outrank every layered utility, because
// unlayered wins regardless of specificity, and the header CTA renders
// white-on-white. hanzo.app takes theme.css because it has no utility layer to
// lose to; this site has 63,151 utility tokens and takes the material only.
import '@hanzo/ui/glass.css'
// The @hanzo/gui atomic sheet, as a real stylesheet Next can fingerprint and the
// browser can cache. Generated from lib/gui.ts by `prebuild`; see
// scripts/gen-gui-css.mjs for why it is not injected at render time.
import './gui.css'
import { ogImages, twitterImages } from '@/lib/constants/og'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/* viewport-fit=cover: draw under the notch and home indicator instead of
   letterboxing; app/globals.css pays the safe-area insets back where chrome
   and content need them. */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const SITE_TITLE = 'Hanzo — the AI cloud for agents and apps'
const SITE_DESCRIPTION = 'Build, deploy, and govern AI agents with unified access to models, MCP tools, memory, vector search, secure sandboxes, IAM, KMS, and audit logs. Open-source. Self-host or use the cloud.'

export const metadata: Metadata = {
  metadataBase: new URL('https://hanzo.ai'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // Full modern favicon set from the canonical Hanzo mark (public/favicon.*).
  // Single source of truth — there is no app/icon.* convention file.
  // THE SVG LEADS, AND THE .ico CARRIES NO `sizes`. `sizes="any"` is not a hint
  // that a raster fits every box — it makes the .ico the browser's PREFERRED
  // candidate, outranking a typed SVG whatever the order, so the vector never
  // drew and the tab showed whatever that 5 KB raster was baked from. hanzoai/id
  // hit the identical bug: it swapped the SVG per brand and the swap was
  // invisible for the same reason.
  //
  // Unqualified, the .ico is what a browser with no SVG support falls back to,
  // which is the job it should have had all along.
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  // Hanzo Edit widget reads this to know which repo backs the page (fork→edit→PR).
  other: { 'hanzo:repo': 'hanzoai/hanzo.ai' },
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
    <html lang="en" suppressHydrationWarning className={`no-js ${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-background text-foreground">
        {/* Content must not depend on scripting. Entry reveals ship SSR'd
            `opacity:0` (framer-motion `initial=`) and gui marks the
            pre-hydration pass `t_unmounted`; with JS off neither ever advances,
            so the hero shipped invisible. This one line runs before any content
            is parsed; when it never runs, globals.css's `html.no-js` rules
            force every JS-gated reveal visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GuiProvider>
            <Providers>{children}</Providers>
          </GuiProvider>
        </ThemeProvider>
        {/* No analytics tag here: pageviews AND interaction autocapture already ride
            the ONE @hanzo/event client in <Providers> (host + ingest key + consent
            gate in one place). A second hz.js tag posted to the same /v1/event door
            and double-counted every pageview. */}
        {/* Hanzo Edit — ever-present "improve this page" widget (repo in metadata.other). */}
        <script async src="https://hanzo.app/edit.js" />
      </body>
    </html>
  )
}
