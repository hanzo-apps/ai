'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// WebGL point-globe — client-only + code-split so it never runs at build/SSR
// and stays out of the main bundle. Falls back to the static radial below when
// WebGL is unavailable.
const PointGlobe = dynamic(() => import('@/components/webgl/PointGlobe'), { ssr: false })

/**
 * The fold: the globe, and the sentence that says what it is.
 *
 * THE GLOBE IS THE PICTURE NOW. It was already here and it was already the best
 * one we have — 6,400 points, agents, live conversations arching between them on
 * great circles, each with a travelling head — but it was WALLPAPER: a radial
 * mask punched the middle out at 82% black to keep a composer legible on top of
 * it, so the one thing on this page worth looking at was dimmed by the thing
 * sitting over it. The composer has moved to the dock at the bottom of the
 * viewport, which is where a front door belongs and where hanzo.app keeps its
 * own. That vacates the fold, and the globe gets it.
 *
 * The scrim is top-weighted for the same reason it is no longer central: only
 * the heading needs a ground now, the heading sits high, and the sphere's body
 * — the part that moves — is left alone.
 *
 * A MONTAGE WAS THE OTHER CANDIDATE and it was measured rather than assumed.
 * hanzo.agency's case-study films are the only real client footage we have and
 * they are not fit for this: they are third-party YouTube embeds at 480p with no
 * masters in any repo, on a personal channel, and cutting a hero from them would
 * put someone else's compression and someone else's rights on our front door.
 * A film also cannot be BOTH shapes — hanzo.app tried exactly this hero and took
 * it out again, because one master covering a 0.46 phone and a 1.6 laptop shows
 * the middle quarter of itself on one of them. `@hanzo/frame` solves that with
 * two rendered masters, which is why the cloud film below still uses it; footage
 * we do not own and cannot re-render is not a candidate for that treatment.
 *
 * Sizing lives HERE, at the call site, and it is height, never width: the
 * sphere's on-screen diameter is a fixed fraction of the canvas HEIGHT (a 48°
 * vertical FOV at a fixed camera distance) and owes nothing to how wide the
 * canvas is. Fitting the canvas to a wide, short fold yields a small globe adrift
 * in black — overflow the section's height instead. Width is only elbow room, so
 * the sphere is never squeezed by a narrow column.
 *
 * `hero`, not `ambient`, BECAUSE of that size: point count is fixed per canvas,
 * so the same points spread over a sphere twice the diameter are four times as
 * sparse, and at this scale the ambient register draws a starfield.
 */
export default function Fold() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Static radial — instant paint, and the no-WebGL fallback. */}
        <div
          className="absolute left-1/2 top-[52%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.13]"
          style={{ background: 'radial-gradient(circle, var(--pure-white) 0%, transparent 70%)', filter: 'blur(120px)' }}
        />
        {/* THE WHOLE SPHERE, not a cap of one. The canvas used to run to 124% of
            a fold that is itself the viewport, which put the sphere's equator
            below the bottom edge and its sides past both others — a dotted dome
            filling the screen, which is a texture rather than a globe. Sized to
            fit, it is a body: you can see it is round, it is dense enough to
            have a silhouette, and the conversations arc over a horizon that is
            actually on screen. */}
        <PointGlobe
          variant="hero"
          conversations={7}
          className="absolute left-1/2 top-[41%] h-[48%] w-[140%] max-w-none -translate-x-1/2 sm:top-[25%] sm:h-[82%] sm:w-[110%]"
        />
        {/* The heading's ground, and nothing more. A band down the top of the
            fold rather than a hole in the middle of it — the sphere keeps its
            own contrast, and the words keep theirs. */}
        <div
          className="absolute inset-x-0 top-0 h-[52%]"
          style={{
            background:
              'linear-gradient(to bottom,' +
              ' color-mix(in srgb, var(--pure-black) 88%, transparent) 0%,' +
              ' color-mix(in srgb, var(--pure-black) 55%, transparent) 45%,' +
              ' transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Frontier models, agents, and the cloud under them.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-400"
        >
          Chat, build and ship on one API — models, Base backends, identity, secrets and vector
          search. The same code runs on your own hardware.
        </motion.p>
      </div>
    </section>
  )
}
