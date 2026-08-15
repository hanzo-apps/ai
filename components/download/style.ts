/**
 * The download page's one visual system.
 *
 * Every section on this page reads its wrapper, heading, row and action from
 * here, so the rhythm is a fact rather than a habit. Before this the page held
 * nine sections that each chose their own padding (py-20 next to pt-12 pb-20),
 * their own heading size (text-3xl, text-4xl, md:text-5xl), and four different
 * card treatments — a white gradient border here, a flat neutral there — so the
 * page read as a stack of pages.
 *
 * Values are the ones the rest of the site already uses: the neutral-900 hairline
 * that separates product sections, the neutral-800 edge on a raised tile, and the
 * rounded-full monochrome CTA pair the nav and the hero use.
 */

/** A section: one rhythm, one hairline above it, one gutter. */
export const SECTION = 'border-t border-neutral-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8'

/** The measure. Rows and prose stay narrow; nothing on this page is full-bleed. */
export const HOLD = 'mx-auto max-w-3xl'

/** A section head. One size on this page — the h1 is the only thing above it. */
export const HEAD = 'text-2xl font-medium tracking-tight text-white sm:text-3xl'

/** The line under a head, when the head needs one. */
export const LEAD = 'mt-3 text-base leading-relaxed text-neutral-400'

/**
 * A list row: a name on the left, its action on the right, a hairline between.
 *
 * The page's whole body is rows — platforms, browsers, editors, tools. A row is
 * lighter than a card and stays even at any count, which is what the four heavy
 * tiles could not do: they held a checklist each and went ragged.
 */
export const ROW =
  'flex items-center justify-between gap-4 border-b border-neutral-900 py-3.5 last:border-b-0'

/** A raised tile, for the few things that are not rows. */
export const TILE =
  'rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition-colors hover:border-neutral-700'

const action =
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black'

/** The one filled action: white pill, black ink. */
export const PRIMARY = `${action} bg-white px-6 py-3 text-black hover:bg-white/90`

/** The bordered action, for a choice beside the primary one. */
export const OUTLINE = `${action} border border-neutral-800 px-6 py-3 text-white hover:bg-neutral-900`

/** The action a row carries: the same shape, at the row's register. */
export const QUIET = `${action} border border-neutral-800 px-4 py-1.5 text-neutral-200 hover:border-neutral-600 hover:text-white`

/** A link that ends a section — "View all N models →". */
export const MORE =
  'inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white'
