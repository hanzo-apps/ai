'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cloudCategories, categorySlug, POSITIONING } from '@/lib/data/cloud-primitives'

/**
 * The products grid — the ten cloud-primitive categories, straight from the ONE
 * taxonomy (lib/data/cloud-primitives.ts). Each card links to its
 * `/products/<slug>` category page; the leaf chips link to each product's own
 * canonical home (the taxonomy `href`). Same source as the Platform mega-menu,
 * so the grid and the nav can never drift.
 */
export default function ProductsGrid() {
  return (
    <section className="border-t border-neutral-900 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <div className="text-xs font-medium uppercase tracking-widest text-neutral-500">Products</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ten categories, one cloud</h2>
          <p className="mt-4 text-lg text-neutral-400">{POSITIONING}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cloudCategories.map((cat, index) => (
            <motion.a
              key={cat.title}
              href={`/products/${categorySlug(cat.title)}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
              className="group flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-neutral-600 hover:bg-neutral-900/80"
            >
              <div className="flex items-start justify-between">
                <h3 className="flex items-center gap-1.5 text-xl font-semibold text-white">
                  {cat.title}
                  <ArrowRight className="h-4 w-4 text-neutral-600 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-300" />
                </h3>
                <span className="text-sm text-neutral-600">{cat.items.length}</span>
              </div>
              <p className="mt-2 text-sm text-neutral-400">{cat.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {cat.items.map((item) => {
                  const Icon = item.icon
                  const ext = Boolean(item.external) || /^https?:\/\//.test(item.href)
                  return (
                    <span
                      key={item.title}
                      className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-black/40 px-2.5 py-1 text-xs text-neutral-400"
                    >
                      <Icon className="h-3 w-3 text-neutral-600" />
                      {item.title}
                      {ext && <ArrowUpRight className="h-2.5 w-2.5 text-neutral-600" />}
                    </span>
                  )
                })}
              </div>

              <div className="mt-auto pt-5 text-xs text-neutral-600">{cat.gcp}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
