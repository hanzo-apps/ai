'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { categorySlug, cloudCategories, type CloudCategory, type Primitive } from '@/lib/data/cloud-primitives'

/**
 * The ten cloud primitives, shown in full — the ONE product showcase.
 *
 * Both surfaces that exist to say "here is everything Hanzo Cloud is" render
 * THIS component: the products index (`/products`) and the cloud.hanzo.ai root
 * (`components/cloud/CloudLanding`). It reads `lib/data/cloud-primitives.ts`,
 * the same source as the mega-menu and the `/products/<slug>` category pages,
 * so the nav, the index, and the cloud front door can never drift.
 *
 * Web3 is a Lux Network surface. Its leaves hand off to lux.cloud under the LUX
 * brand and carry no Hanzo console link — the white-label separation is
 * absolute, so the category is labelled as Lux wherever it renders.
 */

const isExternal = (item: Primitive) => Boolean(item.external) || /^https?:\/\//.test(item.href)

/** One primitive — icon, name, and its one-line descriptor. */
function PrimitiveCard({ item, index }: { item: Primitive; index: number }) {
  const Icon = item.icon
  const external = isExternal(item)
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
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
    <a href={item.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={item.href}>{inner}</Link>
  )
}

/** The ten categories as cards — the map of the cloud, each a door to its page. */
export function CloudCategoryMap() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cloudCategories.map((category, index) => {
        const Icon = category.icon
        return (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
          >
            <Link href={`/products/${categorySlug(category.title)}`}>
              <div className="group h-full cursor-pointer rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-neutral-600 hover:bg-neutral-900/80">
                <div className="flex items-start justify-between">
                  <h3 className="flex items-center gap-2 text-xl font-semibold transition-colors group-hover:text-foreground">
                    <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                    {category.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <span className="text-sm text-muted-foreground">{category.items.length}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{category.tagline}</p>
                {category.brand === 'lux' && (
                  <span className="mt-3 inline-flex rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                    Lux Network
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}

/** One category section — heading, tagline, and all six primitives. */
function CategorySection({ category }: { category: CloudCategory }) {
  const slug = categorySlug(category.title)
  return (
    <section id={slug} className="border-t border-border px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{category.title}</h2>
            <p className="text-sm text-muted-foreground">{category.tagline}</p>
            {category.brand === 'lux' && (
              <p className="mt-1 text-xs text-muted-foreground/70">Powered by Lux Network</p>
            )}
          </div>
          <Link
            href={`/products/${slug}`}
            className="flex flex-shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {category.items.map((item, idx) => (
            <PrimitiveCard key={item.title} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** Every product, grouped by category — the full catalog. */
export default function CloudCategoryShowcase() {
  return (
    <>
      {cloudCategories.map((category) => (
        <CategorySection key={category.title} category={category} />
      ))}
    </>
  )
}
