/**
 * The two Hanzo link-CTA styles, centralized so the download sections share ONE
 * primary and ONE outline — the same monochrome, rounded-full anchor CTAs the
 * apex nav, DownloadHero, and the desktop banner already use.
 *
 * Primary = solid `--primary` fill (white on the dark site) with
 * `--primary-foreground` text (black) → high contrast, clearly the main action.
 * Outline = bordered, transparent fill, foreground text.
 *
 * These are plain <a>/<button> class strings (not `@hanzo/ui` <Button asChild>,
 * whose Slot rejects multi-child anchors) so they render in the static export.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"

export const CTA_PRIMARY = `${base} bg-primary text-primary-foreground hover:bg-primary/90`
export const CTA_OUTLINE = `${base} border border-border bg-transparent text-foreground hover:bg-secondary`
