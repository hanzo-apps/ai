/**
 * The social preview image — one file, one URL, one place it is named.
 *
 * Twelve layouts each declared their own `/<route>/opengraph-image`, and NOTHING
 * generated any of them: there is no `opengraph-image.tsx` in this tree and
 * `output: 'export'` emits only what a route file writes, so all twelve answered
 * 404 with 30 KB of HTML. Every share of this site to Slack, LinkedIn, iMessage
 * or X rendered imageless, and a green build could not have told anyone —
 * a metadata URL is a string, and nothing type-checks a string against the
 * export.
 *
 * `public/og-image.png` is the real, shipped, Hanzo-branded card (the mark, the
 * wordmark, "Build anything."). It is copied verbatim into the export and is
 * already 200 on BOTH hosts this one build serves — hanzo.ai and
 * cloud.hanzo.ai — so pointing at it needs no new artifact and no second
 * pipeline.
 *
 * Its dimensions are MEASURED from that file, not assumed: 2400x1258 (a 1.91:1
 * card at 2x). Declaring the conventional 1200x630 would have been a second,
 * wrong copy of a fact the file already carries.
 */
export const OG_IMAGE = {
  url: '/og-image.png',
  width: 2400,
  height: 1258,
} as const

/** `openGraph.images` for a page — the one card, labelled for that page. */
export const ogImages = (alt: string) => [{ ...OG_IMAGE, alt }]

/** `twitter.images` — the same card. Twitter takes bare URLs. */
export const twitterImages = [OG_IMAGE.url]
