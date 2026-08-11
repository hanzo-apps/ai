import { test, expect } from '@playwright/test'
import { serveExport } from './export'

/**
 * The accuracy-at-cost scatter draws every model, and nothing lands on anything.
 *
 * Both defects this gate exists for shipped past a green build and a green
 * typecheck, and one of them shipped past a commit that said it had been verified:
 *
 *   Ours was the unmarked one. The mark branch read `!pt.highlight && (…)`, so the
 *   three Enso tiers — the whole reason the chart is on /enso — were blank white
 *   discs in a field where every competitor wore its logo. Nothing in the source
 *   looks wrong; you have to render it and count.
 *
 *   The label sweep gave up silently. It moved a label clear of the FIRST obstacle
 *   it found and looked again, bounded by an iteration guard, so a label that could
 *   not win was drawn wherever the last attempt left it. `qwen3.5-397b-a17b` sat on
 *   `kimi-k2.6`'s disc at 390 and 1440 while the pass reported clean — a run that
 *   ran out of tries is indistinguishable from a run that succeeded, unless
 *   something measures the boxes afterwards.
 *
 * So this measures the boxes afterwards, over every ordered pair, at the three
 * widths the site is designed against. Geometry rather than a screenshot baseline,
 * because the assertion is exact and cannot flake on a font hint.
 */

const WIDTHS = [390, 768, 1440]
const CHART = 'svg[aria-label^="Accuracy versus output price"]'

test('the scatter marks every model, and no label touches a label or a dot', async ({ page }) => {
  test.setTimeout(3 * 60 * 1000)
  const server = await serveExport()
  try {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(server.url + '/enso.html', { waitUntil: 'domcontentloaded' })
      await page.locator(CHART).first().scrollIntoViewIfNeeded()

      const read = await page.evaluate((sel) => {
        const svg = document.querySelector(sel)
        if (!svg) return { missing: true, unmarked: [] as string[], overlaps: [] as string[], sideways: false }

        const points = [...svg.querySelectorAll('g')].filter((g) => g.querySelector('title'))
        const named = (g: Element) => (g.querySelector('title')?.textContent ?? '').split(' — ')[0]

        // A mark is a vendor <image>, our nested <svg> ensō, or a lab's monogram.
        const unmarked = points
          .filter((g) => !g.querySelector('image, svg, text[text-anchor="middle"]'))
          .map(named)

        const meets = (a: DOMRect, b: DOMRect) =>
          Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.5 &&
          Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.5

        const items = points.map((g) => ({
          name: named(g),
          // The name label anchors start/end beside the dot; a monogram anchors middle.
          label: [...g.querySelectorAll('text')].find((t) => t.getAttribute('text-anchor') !== 'middle'),
          dot: g.querySelector('circle'),
        }))
        const overlaps: string[] = []
        for (const a of items) {
          if (!a.label) continue
          for (const b of items) {
            if (b.dot && meets(a.label.getBoundingClientRect(), b.dot.getBoundingClientRect())) {
              overlaps.push(`${a.name} label × ${b.name} dot`)
            }
            if (b.label && a.name < b.name && meets(a.label.getBoundingClientRect(), b.label.getBoundingClientRect())) {
              overlaps.push(`${a.name} label × ${b.name} label`)
            }
          }
        }

        return {
          missing: false, unmarked, overlaps,
          sideways: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        }
      }, CHART)

      expect(read.missing, `${width}px: the scatter is not on /enso at all`).toBe(false)
      expect(read.unmarked, `${width}px: points drawn with no mark at all`).toEqual([])
      expect(read.overlaps, `${width}px: labels touching a label or a dot`).toEqual([])
      expect(read.sideways, `${width}px: the page scrolls sideways`).toBe(false)
    }
  } finally {
    await server.close()
  }
})
