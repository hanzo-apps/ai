'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { cloudCategories } from '@/lib/data/cloud-primitives'

/**
 * Every category of the cloud, around the one thing they share.
 *
 * The page's claim about itself is "53 products, 10 categories, one cloud". It
 * used to ASSERT that in a sentence and then show a terminal thumbnail, with the
 * categories as cards two screens down — where a 900px viewport reached the
 * first row of five and a reader saw half the catalog. Drawing the categories
 * around a single centre states the same argument structurally: the many are
 * placed around the one, and all of them are on the fold.
 *
 * THIS FILE HOLDS NO LIST OF CATEGORIES. It renders `cloudCategories` — the same
 * export the mega-menu, the category grid and the `/products/<id>` landings
 * derive from, which is itself the commerce catalog's answer read at build time.
 * A category renamed in the catalog is renamed here, one added is drawn here,
 * and the numbers in the middle are however many came back. Nothing about the
 * taxonomy can be true here and false in the menu.
 *
 * GEOMETRY, NOT PICTURE. Nodes are placed by angle in percent of the box, so
 * every label is live DOM text at the page's own type scale — selectable,
 * translatable, searchable, and readable by a screen reader. Baking this into a
 * video or a canvas would buy a smoother arc and cost all five.
 *
 * A RING OF TEN DOES NOT FIT A PHONE. Below 640px the same ten nodes lay out as
 * a two-column grid under the centre, which keeps every label horizontal and
 * every target 44px. It is the ring's argument in the one shape that survives
 * the width — the many under the one — rather than a ring squashed until its
 * labels collide. One list, two geometries, no second component.
 */

/** Radius of the ring, in percent of the box's half-extent. */
const R = 38
/** First node at twelve o'clock; the rest follow clockwise, in catalog order. */
const START = -90

/** Where node `i` of `n` sits, in percent of the box. */
function place(i: number, n: number, radius = R) {
  const a = ((START + (360 / n) * i) * Math.PI) / 180
  return { x: 50 + radius * Math.cos(a), y: 50 + radius * Math.sin(a) }
}

export default function Orbit() {
  const cats = cloudCategories
  const n = cats.length
  // Which category the centre is describing. Hover AND focus set it, so the
  // preview is not a thing only a mouse can reach.
  const [at, setAt] = useState<number | null>(null)
  const active = at === null ? null : cats[at]
  const products = cats.reduce((t, c) => t + c.items.length, 0)

  return (
    // Two elements, two jobs: this one breathes forever (`hz-orbit`), the one
    // inside arrives once (`hz-arrive`). Both are transforms, and one element
    // has only one `transform` to give.
    <div className="hz-orbit relative w-full sm:aspect-square">
      {/* The glow is the only thing that bleeds. It has no edge of its own, and
          is what makes the ring read as a field rather than an object sitting
          on the page. It is kept FAINT on purpose: at 0.11 it was a grey haze
          the width of the column, and every node sitting on it lost the
          contrast that made its label readable. A backdrop may not cost the
          foreground anything. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 sm:block"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 66%)',
          filter: 'blur(80px)',
        }}
      />

      {/* The ring settles onto its radius rather than springing past it —
          `hz-arrive` in globals.css, which also decides it does not run at all
          under reduced motion. */}
      <div className="hz-arrive flex flex-col gap-3 sm:relative sm:block sm:h-full sm:w-full">
        {/* The orbit path and the spokes. Decorative — every fact they carry is
            also written in the links. */}
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full sm:block"
        >
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="0.22"
            strokeDasharray="0.5 2.2"
            strokeLinecap="round"
          />
          {cats.map((c, i) => {
            const near = place(i, n, 14)
            const far = place(i, n, R - 7)
            // TWO strokes, not one. The dashed one carries the motion; on its
            // own it is a row of loose fragments in every still frame the page
            // spends most of its life in — and under reduced motion, where it
            // never moves, that is the ONLY frame. The continuous one is the
            // connection; the dash is what travels along it.
            return (
              <g key={c.id}>
                <line
                  x1={near.x}
                  y1={near.y}
                  x2={far.x}
                  y2={far.y}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="0.22"
                />
                <line
                  x1={near.x}
                  y1={near.y}
                  x2={far.x}
                  y2={far.y}
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="0.3"
                  strokeDasharray="4 14"
                  strokeLinecap="round"
                  className="hz-spoke"
                  style={{ animationDelay: `${i * 0.34}s` }}
                />
              </g>
            )
          })}
        </svg>

        {/* THE CENTRE IS THE ARGUMENT. At rest it names what the ten share; under
            a pointer or a focus ring it becomes the lens for whichever category
            the reader is on. Its height is reserved either way, so nothing moves
            under the hand that is pointing at it. */}
        <div className="sm:absolute sm:left-1/2 sm:top-1/2 sm:w-[44%] sm:-translate-x-1/2 sm:-translate-y-1/2">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-black/70 px-4 py-3 text-center backdrop-blur-sm sm:aspect-square sm:rounded-full sm:border-white/25 sm:px-6 sm:py-4">
            <p className="text-sm font-semibold tracking-tight text-white sm:text-base">
              {active ? active.title : 'One cloud'}
            </p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-neutral-400 sm:text-xs">
              {active ? active.tagline : 'one API · one identity · one bill'}
            </p>
            <p className="mt-1.5 text-[11px] tabular-nums text-neutral-500">
              {active
                ? `${active.items.length} products`
                : `${products} products · ${n} categories`}
            </p>
          </div>
        </div>

        {/* The ten. A list, because that is what it is — and the tab order is
            catalog order whichever geometry the width picks. */}
        <ul className="grid grid-cols-2 gap-2 sm:block sm:h-full sm:w-full">
          {cats.map((c, i) => {
            const Icon = c.icon
            const p = place(i, n)
            return (
              <li
                key={c.id}
                className="hz-node sm:absolute sm:-translate-x-1/2 sm:-translate-y-1/2"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  animationDelay: `${0.14 + i * 0.035}s`,
                }}
              >
                <Link
                  href={`/products/${c.id}`}
                  onMouseEnter={() => setAt(i)}
                  onMouseLeave={() => setAt(null)}
                  onFocus={() => setAt(i)}
                  onBlur={() => setAt(null)}
                  className="group flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-black/80 px-3 text-sm text-neutral-200 no-underline backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-black hover:text-white hover:no-underline focus-visible:border-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:px-3.5"
                >
                  <Icon className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none" />
                  <span className="whitespace-nowrap font-medium">{c.title}</span>
                  <span className="ml-auto tabular-nums text-[11px] text-neutral-500 sm:ml-0">
                    {c.items.length}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
