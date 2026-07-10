'use client'

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Copy, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PartnerLogoRow } from '@/components/shared'
import { partnerLogos } from '@/lib/constants/partner-logos'
import {
  POSITIONING,
  categorySlug,
  cloudCategories,
  type Primitive,
} from '@/lib/data/cloud-primitives'

const isExternal = (item: Primitive) => Boolean(item.external) || /^https?:\/\//.test(item.href)

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="rounded p-2 transition-colors hover:bg-primary/10" title="Copy to clipboard">
      {copied ? <Check className="h-4 w-4 text-foreground/70" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
    </button>
  )
}

// The products index — one source (lib/data/cloud-primitives.ts) drives the
// mega-menu, the category landing pages, AND this overview, so nothing drifts.
export default function Products() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">The Open AI Cloud</h1>
            <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground md:text-xl">{POSITIONING}</p>

            <div className="mx-auto mb-10 max-w-2xl rounded-2xl border border-border bg-secondary/50 p-6">
              <p className="mb-3 text-sm text-muted-foreground">Get started in seconds</p>
              <div className="flex items-center justify-between rounded-xl bg-background p-4 font-mono">
                <code className="text-foreground/70">curl -fsSL hanzo.sh | bash</code>
                <CopyButton text="curl -fsSL hanzo.sh | bash" />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/20" asChild>
                <Link href="/pricing">
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-neutral-600 hover:bg-secondary"
                asChild
              >
                <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer">
                  Documentation
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-border px-4 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">Built with technology partners</p>
          <PartnerLogoRow logos={partnerLogos} invert className="opacity-70" />
        </div>
      </section>

      {/* Category grid — each links to its /products/<slug> landing page */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cloudCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/products/${categorySlug(category.title)}`}>
                  <div className="group h-full cursor-pointer rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-neutral-600 hover:bg-neutral-900/80">
                    <div className="flex items-start justify-between">
                      <h2 className="flex items-center gap-2 text-xl font-semibold transition-colors group-hover:text-foreground">
                        {category.title}
                        <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </h2>
                      <span className="text-sm text-muted-foreground">{category.items.length}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{category.tagline}</p>
                    <p className="mt-4 text-xs text-muted-foreground/60">{category.gcp}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Every product, grouped by category */}
      {cloudCategories.map((category) => (
        <section key={category.title} id={categorySlug(category.title)} className="border-t border-border px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold">{category.title}</h2>
                <p className="text-sm text-muted-foreground">{category.tagline}</p>
              </div>
              <Link
                href={`/products/${categorySlug(category.title)}`}
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.items.map((item, idx) => {
                const Icon = item.icon
                const external = isExternal(item)
                const inner = (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group h-full rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-600 hover:bg-neutral-900/80"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg border border-border bg-primary/5 p-2">
                        <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="truncate text-sm font-medium transition-colors group-hover:text-foreground">
                            {item.title}
                          </h3>
                          {external && <ArrowUpRight className="h-3 w-3 flex-shrink-0 text-muted-foreground/40" />}
                        </div>
                        {item.desc && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.desc}</p>}
                      </div>
                    </div>
                  </motion.div>
                )
                return external ? (
                  <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <Link key={item.title} href={item.href}>
                    {inner}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="border-t border-border px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to build?</h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Free tier for every product. No credit card required. Scale as you grow.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/20" asChild>
              <Link href="/pricing">
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-neutral-600 hover:bg-secondary"
              asChild
            >
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
