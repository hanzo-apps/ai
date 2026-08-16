// A CLIENT component, and `ssr: false` below is the whole reason. Next refuses
// that option in a Server Component outright — `app/page.tsx` imports this
// through HomeLanding, so without this line the apex does not compile and
// nothing publishes.
'use client'

import dynamic from 'next/dynamic'

/**
 * The fold: the globe, and the sentence that says what it is.
 *
 * THE GLOBE IS THE PICTURE. Thousands of points with live conversations arching
 * between them — the one place colour is allowed on this site, and the rule that
 * makes it mean something: if a viewer sees hue here, something is TALKING.
 *
 * `next/dynamic({ ssr: false })` because it is raw WebGL — there is no canvas to
 * draw into during a static export, and this site is `output: 'export'`.
 *
 * SIZING IS HEIGHT, NOT WIDTH, and it is the one thing a call site has to get
 * right. The sphere's on-screen diameter is a fixed fraction of the CANVAS
 * HEIGHT (a 48° vertical field of view at a fixed camera distance) and owes
 * nothing to how wide the canvas is, so fitting it to a wide, short band yields
 * a small globe adrift in black. The fold is the viewport MINUS the header
 * (`--hz-header`, stated once in globals.css) and the globe takes all of it.
 *
 * `dvh`, not `vh`: a phone's URL bar moves the usable height and `vh` measures
 * the tall state, so the globe would sit under the chrome while the bar shows.
 *
 * THE HEADING CANNOT RIDE IN THE PICTURE, so it does not. Type baked into pixels
 * cannot be selected, translated, reflowed or read aloud. The sentence lives
 * here, in the DOM, under the globe and visible on the first scroll —
 * cloud.hanzo.ai shipped a live page with ZERO `<h1>` by taking this for granted.
 *
 * The console film that was here is cloud.hanzo.ai's story and belongs on
 * cloud.hanzo.ai, which runs its own (`film/cloud`, `components/cloud/CloudLanding`).
 * A page gets ONE picture; this page's is the globe.
 */
const PointGlobe = dynamic(() => import('@/components/webgl/PointGlobe'), { ssr: false })

export default function Fold() {
  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{ height: 'calc(100dvh - var(--hz-header))' }}
      >
        <PointGlobe variant="hero" conversations={10} className="block h-full w-full" />
        {/* The globe meets the copy below it in black rather than at an edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--pure-black) 0%, transparent 100%)' }}
        />
      </section>

      {/* The picture carries the top edge now, so this band opens tight against
          it and keeps its full weight below — `pt-8` where it used to be a
          symmetrical `py-24`. */}
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-8 text-center sm:px-6 sm:pb-28 lg:px-8">
        {/* The line names the CATEGORY, because the previous one named two
            capabilities. "We train the models and run the cloud under them" is
            true, and it is a description of what we do rather than of what it
            gets you — a reader has to assemble the consequence themselves. The
            consequence is the product: the layers were designed together, so
            there are no seams to pay for. That is a category, and a category is
            what a front door should state. */}
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Hanzo OS
        </p>
        <h1 className="hz-display">
          The operating system for agentic companies.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-2xl leading-snug text-neutral-200 sm:text-3xl">
          Give your company intelligence.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-400">
          Hanzo OS unifies Enso, autonomous agents, company context, secure execution,
          full-stack observability, and the cloud beneath them — so people and agents think,
          act, learn and scale as one system.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://cloud.hanzo.ai"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Start building
          </a>
          <a
            href="#system"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white transition-colors hover:border-neutral-400"
          >
            Explore Hanzo OS
          </a>
        </div>

        {/* Trust markers, and they sit HERE rather than in the headline: a
            headline carrying its own credentials is a headline about us. */}
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-sm text-neutral-500">
          <span className="text-neutral-400">Open source</span>
          <span aria-hidden className="text-neutral-700">·</span>
          <span className="text-neutral-400">Fully observable</span>
          <span aria-hidden className="text-neutral-700">·</span>
          <span className="text-neutral-400">Run anywhere</span>
          <span aria-hidden className="text-neutral-700">·</span>
          <span>Techstars ’17</span>
        </p>
      </section>
    </>
  )
}
