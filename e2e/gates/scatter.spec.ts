import { test, expect } from '@playwright/test'
import { serveExport } from './export'

/**
 * The accuracy-at-cost scatter draws every model, legibly, with nothing touching.
 *
 * Every defect this gate exists for shipped past a green build and a green
 * typecheck, and two of them shipped past a commit that said they were verified:
 *
 *   Ours was the unmarked one. The mark branch read `!pt.highlight && (…)`, so the
 *   three Enso tiers — the whole reason the chart is on /enso — were blank white
 *   discs in a field where every competitor wore its logo. Nothing in the source
 *   looks wrong; you have to render it and count.
 *
 *   The label sweep gave up silently. It moved a label clear of the FIRST obstacle
 *   it found and looked again, bounded by an iteration guard, so a label that could
 *   not win was drawn wherever the last attempt left it. A run that ran out of
 *   tries is indistinguishable from a run that succeeded unless something measures
 *   the boxes afterwards.
 *
 *   The type was 4.7 CSS px on a phone. Every assertion above passed while no one
 *   could read a single label — the same shape of defect as the sweep giving up:
 *   the thing that was actually wrong was the thing nothing measured.
 *
 * The floor is 10 CSS px, and it is not a taste call. It is the smallest type the
 * rest of this page already uses (`text-[10px]` in the KPI band and the coordinator
 * rows), so a chart label below it would be the only thing on /enso set smaller
 * than the site's own minimum. Asserting it at 390px is what makes the portrait
 * geometry load-bearing rather than decorative — delete the media query and this
 * fails.
 *
 * Fonts are awaited. The label widths the layout is computed from assume Geist
 * Mono's advance, and measuring before it loads measures the fallback instead —
 * which would make this gate report on a chart no visitor sees.
 */

const WIDTHS = [390, 768, 1440]
const CHART = 'svg[aria-label^="Accuracy versus output price"]'

/** The smallest type the rest of /enso uses. Nothing on the page may go under it. */
const MIN_TYPE_PX = 10

test('the scatter marks every model, legibly, with no label touching a label or a dot', async ({ page }) => {
  test.setTimeout(3 * 60 * 1000)
  const server = await serveExport()
  try {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(server.url + '/enso.html', { waitUntil: 'domcontentloaded' })
      await page.evaluate(() => document.fonts.ready)
      await page.locator(`${CHART}:visible`).first().scrollIntoViewIfNeeded()

      const read = await page.evaluate((sel) => {
        // Exactly one geometry is drawn per width; both in the tree would read the
        // field twice, to a screen reader as well as to a viewer.
        const shown = [...document.querySelectorAll(sel)].filter((s) => s.getBoundingClientRect().width > 0)
        if (shown.length !== 1) {
          return { visible: shown.length, unmarked: [] as string[], overlaps: [] as string[], typePx: 0, sideways: false }
        }
        const svg = shown[0]

        const points = [...svg.querySelectorAll('g')].filter((g) => g.querySelector('title'))
        const named = (g: Element) => (g.querySelector('title')?.textContent ?? '').split(' — ')[0]

        // A mark is a vendor <image>, our nested <svg> ensō, or a lab's monogram.
        const unmarked = points
          .filter((g) => !g.querySelector('image, svg, text[text-anchor="middle"]'))
          .map(named)

        const items = points.map((g) => ({
          name: named(g),
          // The name label anchors start/end beside the dot; a monogram anchors middle.
          label: [...g.querySelectorAll('text')].find((t) => t.getAttribute('text-anchor') !== 'middle'),
          // Every circle: our points draw a halo OUTSIDE the disc, and the halo is
          // the edge a reader sees. Measuring only the disc is what let a label
          // come to rest exactly tangent to a halo and call it clearance.
          dots: [...g.querySelectorAll('circle')],
        }))

        // Rendered size, not the user-unit attribute: the viewBox scale is the
        // whole question, so font-size alone would report 11 at every width.
        const units = parseFloat((svg.getAttribute('viewBox') ?? '0 0 1 1').split(/\s+/)[2])
        const scale = svg.getBoundingClientRect().width / units
        const typePx = Math.min(...items.flatMap((i) =>
          i.label ? [parseFloat(getComputedStyle(i.label).fontSize) * scale] : []))

        const meets = (a: DOMRect, b: DOMRect) =>
          Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.5 &&
          Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.5

        const overlaps: string[] = []
        for (const a of items) {
          if (!a.label) continue
          const box = a.label.getBoundingClientRect()
          for (const b of items) {
            if (b.dots.some((d) => meets(box, d.getBoundingClientRect()))) {
              overlaps.push(`${a.name} label × ${b.name} dot`)
            }
            if (b.label && a.name < b.name && meets(box, b.label.getBoundingClientRect())) {
              overlaps.push(`${a.name} label × ${b.name} label`)
            }
          }
        }

        return {
          visible: shown.length, unmarked, overlaps, typePx: +typePx.toFixed(2),
          sideways: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        }
      }, CHART)

      expect(read.visible, `${width}px: scatter geometries drawn (want exactly 1)`).toBe(1)
      expect(read.unmarked, `${width}px: points drawn with no mark at all`).toEqual([])
      expect(read.overlaps, `${width}px: labels touching a label or a dot`).toEqual([])
      expect(read.sideways, `${width}px: the page scrolls sideways`).toBe(false)
      expect(read.typePx, `${width}px: smallest rendered label, in CSS px`)
        .toBeGreaterThanOrEqual(MIN_TYPE_PX)
    }
  } finally {
    await server.close()
  }
})
