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

      <section className="mx-auto max-w-3xl px-4 pb-24 pt-8 text-center sm:px-6 sm:pb-28 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Frontier models, agents, and the cloud under them.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-400">
          Chat, build and ship on one API — models, Base backends, identity, secrets and vector
          search. The same code runs on your own hardware.
        </p>
      </section>
    </>
  )
}
