'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Mockup } from '@/components/product/Mockup'
import { cloudLayers, spell, type Primitive } from '@/lib/data/cloud-primitives'

/**
 * The ten layers, on the one spine they all hang off.
 *
 * WHAT THIS REPLACED. The front door used to render `CloudCategoryShowcase` —
 * ten headings, each followed by a grid of small cards, one per product. That is
 * an INDEX: it answers "what exists" and never answers "why is it one thing".
 * Seventy-nine cards is also four thousand pixels of identical rectangles, which
 * is the shape a reader skips rather than the shape a reader reads. The index
 * still exists, unchanged, at `/products` — where a reader who wants to browse
 * every product goes on purpose.
 *
 * WHAT IT SAYS INSTEAD. A layer is one row: its number, its name at heading
 * size, the one line that says what it gives you, and every product in it named
 * and linked. The rows hang off a single rule labelled `api.hanzo.ai/v1`,
 * because that is the argument — the ten are not ten things next to each other,
 * they are ten branches of one origin. Nothing is lost: every product is still a
 * link, so the front door still reaches all of them, in a tenth of the height.
 *
 * THE FILM AND THE LIST ARE ONE PICTURE. `film/stack` draws the ten assembling
 * base to crown; this names the same ten in the same order, with what each one
 * holds. The order is `cloudLayers` — DEPTH, from `lib/data/stack.json`, which
 * the film composes from too — and not the catalog's `order`, which is the
 * menu's. Numbered in menu order under a film that stands on the chain, the
 * page would show a stack and then contradict it.
 *
 * IT HOLDS NO LIST. `cloudLayers` is the commerce catalog's answer, filtered to
 * what publishes — the same export the mega-menu, the orbit and the
 * `/products/<id>` landings read. A category renamed in the catalog is renamed
 * here; a product withdrawn disappears from here. The number in the gutter is
 * the row's INDEX, not a total typed anywhere: if the catalog ever carries nine
 * categories or eleven, this counts to nine or eleven and the heading above it
 * (which asks how many there are rather than asserting it) follows.
 *
 * DEPTHS ARE UNEVEN because they are measured. AI carries seven products and
 * Observe sixteen; padding either to match the other would be inventing a
 * catalog to fit a grid.
 */

/** The origin every one of them answers on. */
const ORIGIN = 'api.hanzo.ai/v1'

const isExternal = (item: Primitive) => /^https?:\/\//.test(item.href)

/** One product, named and linked — the leaf of a layer, as prose rather than a card. */
function Leaf({ item }: { item: Primitive }) {
  const className =
    'text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline motion-reduce:transition-none'
  return isExternal(item) ? (
    <a href={item.href} target="_blank" rel="noreferrer noopener" className={className}>
      {item.title}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {item.title}
    </Link>
  )
}

export default function Layers() {
  const layers = cloudLayers

  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {/* The count is COUNTED. Writing "Ten" here would be a number this
              file cannot check, in the one place the page is most exposed —
              directly above the things being counted. */}
          {spell(layers.length)} layers. One origin.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
          Every one of them answers on{' '}
          <code className="font-mono text-neutral-300">{ORIGIN}</code>, to the same key, against the
          same balance. Reaching for the next layer is a line of code, not a procurement cycle.
        </p>

        {/* The stack, assembling. It carries no copy of its own — a film cannot
            reflow, translate or answer a screen reader — so what it MEANS is the
            alt, and the list under it is the same ten in the same order, as text
            a reader can select and a crawler can read. */}
        <div className="mt-14">
          <Mockup
            base="/cloud-stack-wide"
            alt={`The ${layers.length} layers of the Open AI Cloud, assembling base to crown: ${layers
              .map((l) => l.title)
              .join(', ')}.`}
          />
        </div>

        <div className="mt-16">
          <ol>
            {layers.map((layer, i) => {
              const Icon = layer.icon
              const last = i === layers.length - 1
              return (
                <li
                  key={layer.id}
                  className="group relative grid gap-x-8 border-t border-neutral-900 py-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:py-10 lg:grid-cols-[4rem_20rem_minmax(0,1fr)] lg:gap-x-10"
                >
                  {/* THE SPINE, drawn per row rather than once across the list —
                      so it is centred on the number by construction (`left-1/2`
                      of the cell the number is centred in) and no measurement
                      here can drift out of agreement with the grid above it. The
                      ground colour behind the numeral is what cuts it.

                      It reaches past its own cell by exactly the row's padding
                      (`-top-10` / `-bottom-10` against `sm:py-10`), because a
                      grid item is laid out INSIDE the padding: bounded by the
                      cell, ten segments stop 40px short at each end and the line
                      reads as ten dashes rather than one spine.

                      It stops at the last number instead of running past it: a
                      line that continues into empty space is a line that has
                      somewhere else to go. Hidden below `sm`, where the gutter
                      that would hold it is the width of the numeral itself. */}
                  <div className="relative mb-3 sm:mb-0">
                    <div
                      aria-hidden="true"
                      className={`absolute -top-10 left-1/2 hidden w-px -translate-x-1/2 bg-neutral-800 sm:block ${
                        last ? 'bottom-1/2' : '-bottom-10'
                      }`}
                    />
                    <span className="relative z-10 inline-flex bg-black py-1 font-mono text-sm text-neutral-600 sm:block sm:w-full sm:text-center">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* The claim: what the layer is. */}
                  <div className="min-w-0 sm:col-start-2">
                    {/* The NAME is the door. It used to be a heading with an
                        "Explore <layer>" link under it — ten identical calls to
                        action down one page, each repeating the word directly
                        above it. A reader who wants the layer clicks the layer. */}
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      <Link
                        href={`/products/${layer.id}`}
                        className="inline-flex items-center gap-3 text-white no-underline hover:no-underline"
                      >
                        <Icon className="h-5 w-5 shrink-0 text-neutral-500 transition-colors group-hover:text-white motion-reduce:transition-none sm:h-6 sm:w-6" />
                        {layer.title}
                        <ArrowRight className="h-5 w-5 shrink-0 text-neutral-700 transition-transform group-hover:translate-x-1 group-hover:text-white motion-reduce:transition-none" />
                      </Link>
                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-neutral-400 sm:text-lg">
                      {layer.tagline}
                    </p>
                  </div>

                  {/* The evidence: every product in the layer, named. A reader
                      learns what the layer actually contains, and every one is
                      still a door — which is the whole of what the card grid
                      did. It takes the third column from `lg`, where the row is
                      otherwise half empty; below that it falls under the claim,
                      never under the number. */}
                  <p className="mt-5 text-sm leading-7 sm:col-start-2 lg:col-start-3 lg:row-start-1 lg:mt-1.5">
                    {layer.items.map((item, n) => (
                      <span key={item.slug}>
                        {n > 0 && <span className="text-neutral-700"> · </span>}
                        <Leaf item={item} />
                      </span>
                    ))}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
