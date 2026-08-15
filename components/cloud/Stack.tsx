'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cloudCategories } from '@/lib/data/cloud-primitives'
import { inDepth } from '@/lib/data/stack'

/**
 * The cloud, as it is shaped: ten layers, the chain at the base, apps on top.
 *
 * It replaced a ring of the same ten around a centre reading "One cloud". A ring
 * says these things are PEERS arranged around a hub, which is the one thing they
 * are not — apps run on data, data runs on compute, and value settles on the
 * chain under all of it. The picture was arguing against the sentence beside it.
 *
 * THIS FILE HOLDS NO LIST OF CATEGORIES AND NO ORDER. Membership and labels are
 * `cloudCategories`, the same source the mega-menu reads; depth is `STACK` in
 * lib/data/stack.ts, the same list the films parse. So the hero, the menu and
 * every film describe one cloud by construction, and a category added anywhere
 * appears here on the next build with nothing to edit.
 *
 * Every slab is a LINK to its /products/<id> page, so the picture is also the
 * navigation — a diagram you can only look at is a diagram that has to be
 * redrawn the moment someone wants to click it.
 */
export default function Stack() {
  const layers = inDepth(cloudCategories)
  const n = layers.length
  // Which layer the reader is on. Hover AND focus, so the emphasis is not a
  // thing only a mouse can reach.
  const [at, setAt] = useState<number | null>(null)

  return (
    <div className="hz-arrive relative w-full">
      {/* The only thing that bleeds. Kept faint: a backdrop may not cost the
          foreground its contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[130%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 68%)',
          filter: 'blur(80px)',
        }}
      />

      {/* The seam that makes ten slabs one platform. Drawn behind them and
          visible in the gaps, so "integrated" is shown rather than printed. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2"
        style={{
          background:
            'linear-gradient(to top, rgba(255,255,255,0.03), rgba(255,255,255,0.28))',
        }}
      />

      <ol className="flex flex-col-reverse gap-1.5" onMouseLeave={() => setAt(null)}>
        {layers.map((c, i) => {
          // 0 at the base, 1 at the crown. Depth is luminance, never colour:
          // colour on this site means something is TALKING, and a layer is
          // structure.
          const lift = n > 1 ? i / (n - 1) : 1
          const fill = 5 + Math.round(lift * 16)
          const edge = 24 + Math.round(lift * 40)
          const on = at === i
          const ink = 110 + Math.round(lift * 70)
          const label = 128 + Math.round(lift * 100)
          const Icon = c.icon

          return (
            <li key={c.id}>
              <Link
                href={`/products/${c.id}`}
                onMouseEnter={() => setAt(i)}
                onFocus={() => setAt(i)}
                onBlur={() => setAt(null)}
                style={{
                  backgroundColor: `rgb(${fill},${fill},${fill})`,
                  borderColor: on ? '#525252' : `rgb(${edge},${edge},${edge})`,
                }}
                className="group flex min-h-14 items-center gap-3 rounded-xl border px-4 py-3 no-underline transition-colors duration-200 hover:no-underline sm:gap-4 sm:px-5"
              >
                {/* The icon takes only className and size, so the colour rides
                    a wrapper and the glyph inherits currentColor. */}
                <span
                  aria-hidden="true"
                  className="shrink-0 transition-colors"
                  style={{ color: on ? '#fff' : `rgb(${ink},${ink},${ink})` }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className="w-[5.5rem] shrink-0 text-sm font-medium transition-colors sm:w-28 sm:text-[15px]"
                  style={{ color: on ? '#fff' : `rgb(${label},${label},${label})` }}
                >
                  {c.title}
                </span>

                {/* The layer's own products, as far as the row goes. No count
                    and no "and more": membership is whatever answered at build
                    time, and a number here is a fact about that morning. */}
                <span className="hidden min-w-0 flex-1 gap-1.5 overflow-hidden sm:flex">
                  {c.items.slice(0, 5).map((item) => (
                    <span
                      key={item.slug}
                      className="whitespace-nowrap rounded-full border border-neutral-800 px-2 py-0.5 font-mono text-[11px] text-neutral-500 transition-colors group-hover:border-neutral-700 group-hover:text-neutral-400"
                    >
                      {item.title}
                    </span>
                  ))}
                </span>

                {/* On a phone there is no room for chips, so the layer says what
                    it is for instead. */}
                <span className="min-w-0 flex-1 truncate text-xs text-neutral-500 sm:hidden">
                  {c.tagline}
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
