'use client'

import { useState } from 'react'
import { Box, Monitor, SquareTerminal } from 'lucide-react'
import { Mockup } from '@/components/product/Mockup'

/**
 * The three ways to run something on this cloud.
 *
 * A container, a whole machine, and a leased shell are not three products — they
 * are three isolations of one compute plane, chosen per workload. The section
 * says that by putting them in one control rather than three sections: picking
 * one swaps the film, and the film is the API surface that kind actually has.
 *
 * EVERY OPERATION IN EVERY FILM IS QUOTED, NOT WRITTEN. film/workload composes
 * from GET /v1/openapi.json at render time, so an endpoint added or removed
 * shows up on the next render and this page cannot describe a surface that is
 * not served. The route under each film is the same one a reader can curl.
 *
 * The copy here says what the ISOLATION is for. It states no latency, no boot
 * time and no capacity, because this repo has no measurement for any of them
 * and a number without one is the thing every other claim on this site is
 * checked against.
 */
const KINDS = [
  {
    id: 'containers',
    title: 'Containers',
    icon: Box,
    blurb:
      'Deploy an image and invoke it. Deployments, triggers, secrets, metrics and logs are all part of the same surface, so a function you ship is a function you can watch.',
    route: '/v1/functions',
  },
  {
    id: 'vms',
    title: 'Virtual machines',
    icon: Monitor,
    blurb:
      'A whole machine when a container is the wrong shape — provisioned on our account or folded in from yours, each one carrying an agent you address directly.',
    route: '/v1/machines',
  },
  {
    id: 'sandboxes',
    title: 'Sandboxes',
    icon: SquareTerminal,
    blurb:
      'An isolated filesystem and shell, leased for as long as the work runs and reaped when it stops. Read and write files, exec into it, end it — the isolation an agent runs inside.',
    route: '/v1/sandboxes',
  },
] as const

export default function Workloads() {
  const [at, setAt] = useState(0)
  const kind = KINDS[at]

  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          {/* `<h2>`, because the fold carries the page's one `<h1>`. */}
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Every workload, one compute plane
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-400">
            A container, a whole machine, or a leased shell — the isolation is a choice per
            workload, not three products to buy.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
          {/* The three, as one control. Buttons, not links: this swaps a picture
              on the page rather than going anywhere. */}
          <div className="flex flex-col">
            {KINDS.map((k, i) => {
              const on = i === at
              const Icon = k.icon
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setAt(i)}
                  aria-current={on}
                  className={`group border-t border-neutral-900 py-6 text-left transition-colors last:border-b ${
                    on ? 'border-l-2 border-l-white pl-5' : 'pl-5 hover:bg-white/[0.015]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon
                      className={`h-4 w-4 transition-colors ${on ? 'text-white' : 'text-neutral-600'}`}
                    />
                    <span
                      className={`text-lg font-medium transition-colors ${
                        on ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'
                      }`}
                    >
                      {k.title}
                    </span>
                  </span>
                  {/* Only the open one explains itself — three paragraphs at
                      once is a wall, and the point of the control is that you
                      are looking at one thing. */}
                  {on && (
                    <>
                      <span className="mt-3 block text-sm leading-relaxed text-neutral-400">
                        {k.blurb}
                      </span>
                      <span className="mt-3 block font-mono text-xs text-neutral-600">
                        api.hanzo.ai{k.route}
                      </span>
                    </>
                  )}
                </button>
              )
            })}
          </div>

          {/* One <Mockup> per kind, all mounted, and the hidden ones cost
              nothing: it ships a still and fetches the film only when motion is
              welcome AND it is near the viewport. Keying a single Mockup on the
              selection would remount it on every click and re-fetch the film. */}
          <div className="relative">
            {KINDS.map((k, i) => (
              <div key={k.id} className={i === at ? 'block' : 'hidden'}>
                <Mockup
                  base={`/workload/${k.id}-wide`}
                  alt={`The ${k.title.toLowerCase()} surface on api.hanzo.ai${k.route}, operation by operation.`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
