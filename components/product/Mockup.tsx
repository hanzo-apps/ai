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
export function Mockup({ slug, alt }: { slug: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [film, setFilm] = useState(false)
  const base = `/mock/${slug}-wide`

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

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-border bg-neutral-950"
    >
      {film ? (
        <video
          className="block aspect-video w-full"
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="block aspect-video w-full" src={`${base}-first.jpg`} alt={alt} />
        </picture>
      )}
    </div>
  )
}
