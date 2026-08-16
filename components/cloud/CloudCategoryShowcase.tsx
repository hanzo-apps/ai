'use client'

import Link from 'next/link'
import { motion } from '@/components/motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cloudCategories, type CloudCategory, type Primitive } from '@/lib/data/cloud-primitives'
import { Box } from '@hanzo/ui'

/**
 * The cloud primitives, shown in full — the ONE product showcase.
 *
 * Both surfaces that exist to say "here is everything Hanzo Cloud is" render
 * THIS component: the products index (`/products`) and the cloud.hanzo.ai root
 * (`components/cloud/CloudLanding`). It reads `lib/data/cloud-primitives.ts`,
 * the same source as the mega-menu and the `/products/<id>` category pages, so
 * the nav, the index, and the cloud front door can never drift — and since that
 * source is the commerce catalog filtered to what answers, none of them can
 * show a product that does not.
 *
 * One brand renders here, and it is Hanzo's. A leaf on another Hanzo property
 * opens in a new tab; nothing on this host is badged with another company's
 * name.
 */

const isExternal = (item: Primitive) => /^https?:\/\//.test(item.href)

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
      className="group h-full rounded-xl border border-transparent p-4 transition-colors duration-200 hover:border-white/15 motion-reduce:transition-none"
    >
      <Box className="flex items-start gap-3">
        <div className="grid h-8 w-8 flex-none place-items-center rounded-lg border border-white/10 transition-colors duration-200 group-hover:border-white/15 motion-reduce:transition-none">
          <Icon className="h-4 w-4 text-neutral-400 transition-colors duration-200 group-hover:text-white motion-reduce:transition-none" />
        </div>
        <Box className="min-w-0 flex-1">
          <Box className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-medium text-neutral-200 transition-colors duration-200 group-hover:text-white motion-reduce:transition-none">
              {item.title}
            </h3>
            {external && <ArrowUpRight className="h-3 w-3 flex-shrink-0 text-muted-foreground/40" />}
          </Box>
          {item.desc && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">{item.desc}</p>}
        </Box>
      </Box>
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

/**
 * The categories as cards — the map of the cloud, each a door to its page.
 *
 * FIVE ACROSS, because the catalog carries ten categories and 2×5 closes the
 * block: the whole map is taken in at once instead of scrolled through.
 *
 * Every track count here DIVIDES ten, and that is the whole rule. The middle
 * step used to be three, which is the one number between two and five that does
 * not — so a tablet drew 3·3·3 and then a single orphan card on a fourth row,
 * reading as an afterthought rather than a peer. Two and five are the only
 * widths this block takes.
 *
 * The cards are correspondingly quieter — a category is a signpost, not an
 * argument, so it carries its name and one line, at the size those need and no
 * larger. It used to carry a count of its leaves as well; that number is now
 * whatever answered at build time, which is a fact about the API's morning
 * rather than anything a reader can use.
 */
export function CloudCategoryMap() {
  return (
    <Box className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {cloudCategories.map((category, index) => {
        const Icon = category.icon
        return (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: (index % 5) * 0.04 }}
          >
            <Link href={`/products/${category.id}`}>
              <div className="group h-full cursor-pointer rounded-xl border border-white/10 p-4 transition-colors duration-200 hover:border-white/25 motion-reduce:transition-none">
                <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight text-neutral-200 transition-colors duration-200 group-hover:text-white motion-reduce:transition-none">
                  <Icon className="h-4 w-4 shrink-0 text-neutral-400 transition-colors duration-200 group-hover:text-white motion-reduce:transition-none" />
                  {category.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{category.tagline}</p>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </Box>
  )
}

/** One category section — heading, tagline, and every primitive in it. */
function CategorySection({ category }: { category: CloudCategory }) {
  const slug = category.id
  return (
    <section id={slug} className="border-t border-border px-4 py-16 sm:px-6 lg:px-8">
      <Box className="mx-auto max-w-6xl">
        <Box className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{category.title}</h2>
            <p className="mt-1 text-sm text-neutral-500">{category.tagline}</p>
          </div>
          <Link
            href={`/products/${slug}`}
            className="flex flex-shrink-0 items-center gap-1 text-sm text-neutral-400 no-underline transition-colors duration-200 hover:text-white hover:no-underline motion-reduce:transition-none"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Box>

        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {category.items.map((item, idx) => (
            <PrimitiveCard key={item.title} item={item} index={idx} />
          ))}
        </Box>
      </Box>
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
