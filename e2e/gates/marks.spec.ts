import { test, expect } from '@playwright/test'
import { serveExport } from './export'

/**
 * A family wears the mark of the lab that MAKES it.
 *
 * Enso is ours. Zen is Zoo Labs Foundation's — we serve it, we did not train
 * it — and /models says so in its own hero copy. The marks have twice said
 * otherwise, and both times a green build and a green typecheck agreed:
 *
 *   The Hanzo H on everything. Our gateway namespace holds every family under
 *   `hanzo`, so reading the lab first drew our H on Zen, on GPT and on Claude.
 *   Fixed by reading the family before the lab, and `markOf` still does.
 *
 *   Our own house glyph on Zen. @hanzo/logo grouped a ZEN_MARK beside ENSO_MARK
 *   under HOUSE_MARKS, so Zen wore an ensō — Hanzo's brush ring, left open —
 *   while the paragraph above it credited Zoo. The page was drawing one house
 *   where the text named two. @hanzo/logo carries Hanzo's marks now; Zoo's venn
 *   is vendored here beside the other labs', and `zen -> zoo` is one row in OF.
 *
 * Neither glyph may decay to the monogram either. That fallback is for a lab
 * with no logo, and a mark silently becoming a letter is how a wrong import
 * would look on this page: still laid out, still green, just no longer a logo.
 *
 * The venn's disc MUST be cut by an SVG `<clipPath>`, in user units. A CSS
 * `clip-path: circle(11.5px …)` resolves against the RENDERED box instead of
 * the viewBox, so it cuts correctly at 96px and not at all at 18px — the mark
 * squares off into a scribble exactly where it is smallest and most used.
 */

/** The lab each family belongs to, and the shape that lab's mark must have. */
const MAKER = {
  enso: (mark: string) => /^<circle [^>]*r="8\.88"/.test(mark) && !mark.includes('clipPath'),
  zen: (mark: string) =>
    mark.includes('<clipPath') &&
    mark.includes('clip-path="url(#zoo-cut)"') &&
    (mark.match(/<circle/g) ?? []).length === 5,
} as const

test('Enso wears our ring, Zen wears Zoo’s venn, and neither is a letter', async ({ page }) => {
  test.setTimeout(3 * 60 * 1000)
  const server = await serveExport()
  try {
    await page.goto(server.url + '/models.html', { waitUntil: 'domcontentloaded' })

    // Read every glyph on the page with the model it stands for, rather than
    // naming the models: the row most worth measuring is the one added next.
    const drawn = await page.evaluate(() => {
      const glyphs = [...document.querySelectorAll('svg[focusable="false"], span[aria-hidden]')]
      return glyphs.flatMap((g) => {
        const href = (g.closest('a') as HTMLAnchorElement | null)?.getAttribute('href')
        const id = href?.match(/^\/models\/[^/]+\/(.+)$/)?.[1]
        if (!id) return []
        return [{ id, family: id.match(/^[a-z]+/)?.[0] ?? '', letter: g.tagName === 'SPAN', mark: g.innerHTML }]
      })
    })

    for (const family of Object.keys(MAKER) as (keyof typeof MAKER)[]) {
      const rows = drawn.filter((d) => d.family === family)
      expect(rows.length, `no ${family} model on /models, so its mark is unmeasured`).toBeGreaterThan(0)

      const letters = rows.filter((d) => d.letter).map((d) => d.id)
      expect(letters, `${family} fell back to a monogram`).toEqual([])

      const wrong = rows.filter((d) => !MAKER[family](d.mark)).map((d) => d.id)
      expect(wrong, `${family} is not wearing its maker's mark`).toEqual([])
    }

    // The two may not collapse into one another.
    const of = (family: string) => new Set(drawn.filter((d) => d.family === family).map((d) => d.mark))
    expect([...of('enso')].some((m) => of('zen').has(m)), 'Enso and Zen drew the same glyph').toBe(false)
  } finally {
    await server.close()
  }
})
