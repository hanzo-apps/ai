'use client'

import Link from 'next/link'
import { motion } from '@/components/motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@hanzo/ui'
import { CopyButton } from '@hanzo/ui/product'
import { PartnerLogoRow } from '@/components/shared'
import { infrastructureLogos } from '@/lib/constants/partner-logos'
import CloudCategoryShowcase, { CloudCategoryMap } from '@/components/cloud/CloudCategoryShowcase'
import { POSITIONING } from '@/lib/data/cloud-primitives'
import { CONSOLE } from '@/components/home/nav-data'
import { Box } from '@hanzo/ui'

// The products index — one source (lib/data/cloud-primitives.ts) drives the
// mega-menu, the category landing pages, AND this overview, so nothing drifts.
export default function Products() {
  return (
    <Box className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] blur-[100px]" />
        <Box className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            {/* The section is Platform, and it is the SAME heading on both
                hosts because there is only one of this page. hanzo.ai and
                cloud.hanzo.ai are one static export of one tree; the Dockerfile's
                SURFACE copies a chosen page over index.html, so the two hosts
                differ at `/` and NOWHERE else. A per-host heading would have to
                read the hostname in the browser, which puts the page's one h1
                outside the HTML a crawler reads and gives the tree a second,
                divergent voice for one product.

                The positioning line below still says what the cloud IS, so the
                heading is free to name the section rather than re-argue it. */}
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">Platform</h1>
            <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground md:text-xl">{POSITIONING}</p>

            <Box className="mx-auto mb-10 max-w-2xl rounded-2xl border border-border bg-secondary/50 p-6">
              <p className="mb-3 text-sm text-muted-foreground">Get started in seconds</p>
              <Box className="flex items-center justify-between rounded-xl bg-background p-4 font-mono">
                <code className="text-foreground/70">curl -fsSL hanzo.sh | bash</code>
                <CopyButton value="curl -fsSL hanzo.sh | bash" id="install-cli" />
              </Box>
            </Box>

            <Box className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full bg-white text-black hover:opacity-90" asChild>
                <a href={CONSOLE}>
                  Start building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-neutral-700 text-white hover:border-neutral-400"
                asChild
              >
                <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer">
                  Documentation
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Box>
          </motion.div>
        </Box>
      </section>

      {/* Partners */}
      <section className="border-t border-border px-4 py-12">
        <Box className="mx-auto max-w-6xl text-center">
          <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">Runs on the infrastructure you already trust</p>
          <PartnerLogoRow logos={infrastructureLogos} invert className="opacity-70" />
        </Box>
      </section>

      {/* Category grid — each links to its /products/<slug> landing page */}
      <section className="px-4 py-20">
        <Box className="mx-auto max-w-6xl">
          <CloudCategoryMap />
        </Box>
      </section>

      {/* Every product, grouped by category */}
      <CloudCategoryShowcase />

      {/* CTA */}
      <section className="border-t border-border px-4 py-24">
        <Box className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to build?</h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Free tier for every product. No credit card required.
          </p>
          <Box className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-full bg-white text-black hover:opacity-90" asChild>
              <a href={CONSOLE}>
                Start building
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-neutral-700 text-white hover:border-neutral-400"
              asChild
            >
              <Link href="/pricing">See pricing</Link>
            </Button>
          </Box>
        </Box>
      </section>
    </Box>
  )
}
