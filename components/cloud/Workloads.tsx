'use client'

import { useState } from 'react'
import { Box, Monitor, SquareTerminal } from 'lucide-react'
import { Mockup } from '@/components/product/Mockup'

/**
 * Compute — one runtime, and the kinds of work it takes.
 *
 * TWO DEPTHS, on purpose. The SPECTRUM names all six kinds and orders them by
 * how much of a machine each one holds: a function borrows one for the length
 * of a call, Kubernetes IS the machine. That ordering is the argument — they
 * are not six products to choose between, they are one runtime addressed six
 * ways, so moving along it is a deploy target rather than a migration.
 *
 * Under it, the three ISOLATIONS a reader can actually inspect. A container, a
 * whole machine and a leased shell each have their own API surface, and picking
 * one swaps the film to show it.
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

/** The six, lightest hold on a machine first. */
const SPECTRUM: [string, string][] = [
  ['Functions', 'Scale to zero between calls.'],
  ['Containers', 'Your image, deployed and addressable.'],
  ['Sandboxes', 'Isolated shells for agents and untrusted code.'],
  ['Machines', 'A whole machine, by the second.'],
  ['GPUs', 'Accelerators attached to any of them.'],
  ['Kubernetes', 'The substrate all of it runs on.'],
]
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
    // `Machines`, the catalog's own name for it and the spectrum's — the film
    // is still `/workload/vms-wide`, which is an asset path rather than a name
    // a reader sees.
    id: 'vms',
    title: 'Machines',
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
        {/* `<h2>`, because the fold carries the page's one `<h1>`. Left-aligned
            and full measure, like every other band on this page — a centred
            heading in a column of left-aligned ones reads as a different page. */}
        <h2 className="max-w-5xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          One runtime for every kind of work.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
          The same plane, held for a millisecond or held for a month. What
          changes is how much of a machine the work needs, not what you have to
          learn.
        </p>

        {/* The spectrum. The rule beneath it brightens left to right, so the
            ordering reads as one continuum before a single label is read. */}
        <div className="mt-14">
          <div
            aria-hidden="true"
            className="h-px w-full"
            style={{
              background:
                'linear-gradient(to right, rgba(255,255,255,0.10), rgba(255,255,255,0.55))',
            }}
          />
          <ol className="grid grid-cols-2 gap-x-6 gap-y-7 pt-6 sm:grid-cols-3 lg:grid-cols-6">
            {SPECTRUM.map(([name, line]) => (
              <li key={name}>
                <p className="text-base font-medium text-white">{name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{line}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
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
