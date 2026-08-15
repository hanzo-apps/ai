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
        {/* Research first, product second. This is the company's front door,
            and a reader arriving at it is asking who we are before what we
            sell -- the API, the layers and the pricing all have their own
            pages and every one of them is a click away. What is true of us and
            of almost nobody else is that we train the models AND run the cloud
            under them, and publish the weights and the papers. That is the
            sentence. */}
        <h1 className="hz-display">
          We train the models and run the cloud under them.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-400">
          Zen is open weights, from something that fits on a laptop up to frontier. Enso is
          ours, and it routes across them. The papers, the methods and the results that did
          not work are public.
        </p>
      </section>
    </>
  )
}
