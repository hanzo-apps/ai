'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The product's own surface, running, beside the page's copy.
 *
 * Nothing readable is drawn into the film — no headline, no tagline, no product
 * name. Those are DOM text on this page, where they reflow at every container
 * width, answer a screen reader, translate, and can be corrected without a
 * re-render. What the film contains is the product's chrome: a shell's own
 * output, a table's rows, a chart. Rendered from the catalog by film/mock.
 *
 * Three files come from one prefix, the same shape `@hanzo/frame` uses for the
 * apex hero: the film, the frame it opens on, and the frame it ends on.
 *
 *   /mock/<slug>-wide.mp4         the film
 *   /mock/<slug>-wide-first.jpg   frame 0 — what a viewer sees before it plays
 *   /mock/<slug>-wide-last.jpg    the last frame — the product at rest
 *
 * A still is what ships. The film is fetched only when motion is welcome AND
 * the figure is near the viewport, so a page costs one image until then and a
 * reduced-motion viewer never downloads the video at all. The reduced-motion
 * still is the LAST frame, because that is the finished product; the poster is
 * frame 0, so the swap to the player is invisible.
 */
/**
 * `slug` names a film under /mock — the per-product surfaces film/mock renders.
 * `base` names one anywhere else, for a film that is not a product's own screen
 * (the platform stack). One of the two, never both: a component that takes two
 * ways to say where its film is has two ways to be pointed at nothing.
 */
/**
 * `ratio` is EMPTY by default, and that is the whole fix for a picture that sat
 * adrift in its own panel.
 *
 * It used to default to `aspect-video`, which is a shape stated in CSS about a
 * file this component cannot see. The plates are rendered into a fixed 1920x1080
 * frame whatever the window inside them measures, so most carried a band of
 * page-black around the chrome — public/workload's window is 1480x700, which is
 * 51% padding — and because the padding made the FILE 16:9, the CSS and the file
 * agreed exactly. Nothing was measurably wrong. The film simply rendered small in
 * the middle of its box with dead space on four sides, and no number pointed at it.
 *
 * `scripts/crop-shots.sh` takes the padding out of the asset. Once it is gone the
 * file is 2.11:1, or 1.70:1, or whatever that particular window happens to be —
 * and a hardcoded 16:9 would then squash it, which is the same defect wearing the
 * opposite sign. So the asset states its own shape and this states none: one
 * source of truth, and a film cropped tomorrow needs no edit here.
 *
 * No layout shift comes with it. `poster` is the first frame at the film's exact
 * dimensions, so the box is established by the poster before any video metadata
 * arrives — which is also why the crop script moves the stills with the film
 * rather than leaving them behind.
 *
 * A caller that genuinely needs a fixed box still passes one.
 */
export function Mockup({
  slug,
  base: at,
  alt,
  ratio = '',
}: {
  slug?: string
  base?: string
  alt: string
  ratio?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [film, setFilm] = useState(false)
  const base = at ?? `/mock/${slug}-wide`

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setFilm(true)
        io.disconnect()
      },
      { rootMargin: '300px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  // A product's own screen arrives with a window drawn around it — titlebar,
  // chrome, the lot — so framing it again draws a second window around the
  // first and it reads as a thumbnail of the product rather than the product.
  // That is why `slug` films paint nothing here.
  //
  // A `base` film is not a screen. It is a diagram, and a diagram is ink on the
  // same black the page is, with no chrome of its own to give it an edge. On
  // the cloud fold it dissolved: a faint grey rectangle a reader's eye slid
  // past, on the one visual above the fold. So a diagram gets the edge its
  // subject does not carry — a hairline and a surface a shade off the page,
  // which is what tells an eye where the figure starts.
  const diagram = at !== undefined

  return (
    <div
      ref={ref}
      className={
        diagram
          ? 'overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/60'
          : undefined
      }
    >
      {film ? (
        <video
          className={`block w-full ${ratio}`}
          src={`${base}.mp4`}
          poster={`${base}-first.jpg`}
          autoPlay
          muted
          playsInline
          aria-label={alt}
        />
      ) : (
        <picture>
          {/* No JS runs before this paints, so the choice has to be the
              browser's: a reduced-motion viewer is served the ending. */}
          <source media="(prefers-reduced-motion: reduce)" srcSet={`${base}-last.jpg`} />
          {/* A bare img, because next/image renders no <source> and the choice
              above is the browser's to make. */}
          <img className={`block w-full ${ratio}`} src={`${base}-first.jpg`} alt={alt} />
        </picture>
      )}
    </div>
  )
}
