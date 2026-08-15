'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cloudLayers, type CloudCategory } from '@/lib/data/cloud-primitives'

/**
 * The stack, as something a reader can interrogate.
 *
 * `Layers` states the ten and lists every product under each — it answers "what
 * is there" completely, and at seventy-eight links it answers it all at once.
 * This answers a different question: a reader who knows they need ONE of these
 * arrives wanting to find their layer, read what it stands on, and leave with a
 * link. So the ten are a stack they can point at, and only the one they point
 * at speaks.
 *
 * DEPTH IS THE ORDER, and it is rendered crown-first because that is how a
 * stack is drawn — `cloudLayers` is base-first (settlement underneath, apps on
 * top), so this reverses it once, here, rather than asking the data to be two
 * orders at the same time.
 *
 * SELECTION, NOT HOVER. Hover cannot be reached from a keyboard, does not exist
 * on a phone, and gives a reader no way to read one layer and then the next
 * without losing the first. Every layer is a button; arrow keys walk them.
 */

/** The leader from the selected layer to the panel that explains it. */
function Leader({ from, edge, to }: { from: DOMRect | null; edge: number; to: DOMRect | null }) {
  if (!from || !to) return null

  // The line leaves the COLUMN's edge, not the row's: rows are full-width here,
  // but the column edge is the one x that does not move as rows change height.
  const x1 = Math.max(from.right, edge)
  const y1 = from.top + from.height / 2
  const x2 = to.left
  const y2 = to.top + Math.min(44, to.height / 2)
  const cx = x1 + (x2 - x1) * 0.6

  return (
    <svg className="pointer-events-none fixed inset-0 z-10 h-full w-full" aria-hidden="true">
      <path
        d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 4"
        className="text-neutral-700"
      />
      <circle cx={x1} cy={y1} r="2.5" className="fill-neutral-600" />
      <circle cx={x2} cy={y2} r="2.5" className="fill-neutral-600" />
    </svg>
  )
}

export default function Stack() {
  // Crown first. See the note above: the data is base-first exactly once.
  const layers = [...cloudLayers].reverse()
  const [picked, setPicked] = useState(layers[0]?.id ?? '')

  const rows = useRef(new Map<string, HTMLElement>())
  const colRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [rects, setRects] = useState<{ from: DOMRect | null; edge: number; to: DOMRect | null }>({
    from: null,
    edge: 0,
    to: null,
  })

  // Viewport coordinates, so anything that moves either end invalidates them.
  useLayoutEffect(() => {
    const measure = () =>
      setRects({
        from: rows.current.get(picked)?.getBoundingClientRect() ?? null,
        edge: colRef.current?.getBoundingClientRect().right ?? 0,
        to: panelRef.current?.getBoundingClientRect() ?? null,
      })
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [picked])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement
      if (!(el instanceof HTMLElement) || !el.dataset.layer) return
      const step =
        e.key === 'ArrowDown' || e.key === 'ArrowRight'
          ? 1
          : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
            ? -1
            : 0
      if (!step) return
      e.preventDefault()
      const ids = layers.map((l) => l.id)
      const next = ids[(ids.indexOf(picked) + step + ids.length) % ids.length]
      setPicked(next)
      rows.current.get(next)?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [layers, picked])

  const shown = layers.find((l) => l.id === picked) as CloudCategory | undefined
  if (!shown) return null

  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Point at a layer.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
          Each one stands on the ones beneath it and answers on the same origin, to the same key.
          Pick the one you need and it tells you what it gives you and what is in it.
        </p>

        <Leader from={rects.from} edge={rects.edge} to={rects.to} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div ref={colRef} className="flex flex-col gap-1.5">
            {layers.map((l) => {
              const Icon = l.icon
              const on = picked === l.id
              return (
                <button
                  key={l.id}
                  ref={(el) => {
                    if (el) rows.current.set(l.id, el)
                    else rows.current.delete(l.id)
                  }}
                  data-layer={l.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPicked(l.id)}
                  className={[
                    'flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                    // Unselected recedes but stays readable: the stack has to keep
                    // reading as a stack while one of its layers is explained.
                    on
                      ? 'border-neutral-700 bg-neutral-900/60 opacity-100'
                      : 'border-neutral-900 bg-neutral-950/40 opacity-60 hover:opacity-90',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4 shrink-0 text-neutral-400" />
                  <span className="font-medium text-white">{l.title}</span>
                  <span className="ml-auto shrink-0 font-mono text-xs text-neutral-500">
                    {l.items.length}
                  </span>
                </button>
              )
            })}
          </div>

          <div
            ref={panelRef}
            className="h-fit rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 lg:sticky lg:top-24"
          >
            <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-neutral-500">Layer</p>
            <h3 className="mt-1.5 text-lg font-medium text-white">{shown.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{shown.tagline}</p>

            {/* Every product, named and linked. The panel is where the index
                lives now, one layer at a time instead of all seventy-eight. */}
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {shown.items.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="inline-block rounded-md border border-neutral-800 bg-neutral-900/50 px-2 py-1 text-xs text-neutral-300 transition hover:border-neutral-700 hover:text-white"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/products/${shown.id}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-300 hover:text-white"
            >
              All {shown.title.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
