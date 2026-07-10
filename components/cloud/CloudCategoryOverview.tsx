'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  POSITIONING,
  categorySlug,
  cloudCategories,
  getCategoryBySlug,
  type Primitive,
} from '@/lib/data/cloud-primitives'

const STATUS_LABEL: Record<NonNullable<Primitive['status']>, string> = {
  ga: 'GA',
  beta: 'Beta',
  coming: 'Soon',
}

const isExternal = (item: Primitive) => Boolean(item.external) || /^https?:\/\//.test(item.href)

/**
 * Category landing page for one of the ten cloud primitives. Data-driven from
 * the single nav taxonomy (lib/data/cloud-primitives.ts) — the SAME source the
 * mega-menu reads, so the category header, this page, and every leaf can never
 * drift apart. One component renders all ten categories (DRY).
 *
 * Web3 is a Lux Network surface: when the category is Lux-branded every leaf
 * hands off to lux.cloud and the page shows the Lux brand, never the Hanzo mark.
 */
export function CloudCategoryOverview({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug)
  if (!category) return null

  const isLux = category.brand === 'lux'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        {/* Hero radial gradient — design-system standard */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] blur-[100px]" />

        <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
          {/* Breadcrumb — reads like a cloud console path */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/products" className="transition-colors hover:text-foreground">
              Products
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/70">{category.title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isLux && (
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground">
                Powered by Lux Network
              </span>
            )}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{category.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{category.tagline}</p>
            <p className="mt-3 text-sm text-muted-foreground/70">
              {isLux ? 'Lux Network' : 'GCP-compatible'} ·{' '}
              <span className="text-foreground/70">{category.gcp}</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product grid — every leaf in the category, each a real link */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.items.map((item, i) => {
            const Icon = item.icon
            const external = isExternal(item)
            const Card = (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group h-full rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 transition-all hover:border-neutral-600 hover:bg-neutral-900/80"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-primary/5">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status && (
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-foreground/60">
                        {STATUS_LABEL[item.status]}
                      </span>
                    )}
                    {external ? (
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-foreground" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-foreground" />
                    )}
                  </div>
                </div>
                <h3 className="mt-4 flex items-center gap-2 font-semibold transition-colors group-hover:text-foreground">
                  {item.title}
                </h3>
                {item.desc && <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>}
              </motion.div>
            )

            return external ? (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer">
                {Card}
              </a>
            ) : (
              <Link key={item.title} href={item.href}>
                {Card}
              </Link>
            )
          })}
        </div>

        {/* Positioning + CTAs */}
        <p className="mt-14 text-sm text-muted-foreground">{POSITIONING}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {isLux ? (
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="https://lux.cloud" target="_blank" rel="noopener noreferrer">
                Explore lux.cloud
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
          ) : (
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/signup">
                Get started
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            className="border-border bg-transparent text-foreground/80 hover:bg-accent hover:text-foreground"
          >
            <a
              href={isLux ? 'https://docs.lux.cloud' : 'https://docs.hanzo.ai'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="mr-1.5 h-4 w-4" />
              Docs
            </a>
          </Button>
          {!isLux && (
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-4 w-4" />
                Source
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Other categories — keep the whole taxonomy one click away */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="mb-5 text-xs uppercase tracking-widest text-muted-foreground">Explore the cloud</p>
          <div className="flex flex-wrap gap-2">
            {cloudCategories
              .filter((c) => c.title !== category.title)
              .map((c) => (
                <Link
                  key={c.title}
                  href={`/products/${categorySlug(c.title)}`}
                  className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-neutral-600 hover:text-foreground"
                >
                  {c.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CloudCategoryOverview
