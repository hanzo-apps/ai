import { test, expect } from '@playwright/test'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { OUT, requireExport, serveExport } from './export'

/**
 * No page hides content off the side of a phone.
 *
 * globals.css sets `overflow-x: clip` on html AND body, so the page genuinely
 * cannot scroll sideways — which means content wider than the viewport is not
 * awkward, it is UNREACHABLE. There is no gesture that brings it back.
 *
 * This lived in `e2e/mobile-export.spec.ts`, outside the gates project, so it
 * never ran in CI — and while it was out there it could not have caught
 * anything anyway. It measured `documentElement.scrollWidth - clientWidth` and
 * `window.scrollX`, and `overflow-x: clip` pins both constant: injecting a
 * 1400px-wide div into a real exported page left scrollWidth at 390 and scrollX
 * at 0. The fix that makes the invariant true is the same fix that blinded the
 * test for it. Once it could fail it immediately found three pages — a tab
 * strip, a chat panel, and a hero's code column — with text outside the
 * viewport, each a flex or grid item whose default `min-width: auto` refused to
 * shrink below its content.
 *
 * So it belongs here, against `out/`, gating the deploy. It costs ~40s for the
 * whole export.
 *
 * Two things it deliberately does NOT flag, both learned by measuring:
 *
 *   Decoration. /about's 800px radial glow is centred with -translate-x-1/2 and
 *   sits 205px past the edge BY CONSTRUCTION. A reader loses nothing, so only
 *   text-bearing elements count. 8px of slack absorbs sub-pixel rounding and the
 *   `whileInView` x:20 enter animation, which is briefly wider on purpose.
 *
 *   Content inside a horizontally scrollable ancestor. That is the sanctioned
 *   pattern — wide things scroll in their own container — and condemning it
 *   reported ~40 pages broken for doing exactly the right thing.
 */

const VIEWPORT = { width: 390, height: 844 }

/** Every page in the export that ships. */
function routes(): string[] {
  requireExport()
  const out: string[] = []
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name.endsWith('.html')) out.push('/' + p.replace(OUT + '/', ''))
    }
  }
  walk(OUT)
  return out.sort()
}

test('no exported page hides text off the side at 390px', async ({ page }) => {
  test.setTimeout(10 * 60 * 1000)
  const server = await serveExport()
  try {
    await page.setViewportSize(VIEWPORT)
    const bad: string[] = []
    const forwarded: string[] = []

    for (const route of routes()) {
      let landed = false
      for (let i = 0; i < 4 && !landed; i++) {
        try {
          await page.goto(server.url + route, { waitUntil: 'domcontentloaded' })
          landed = true
        } catch {
          await page.waitForTimeout(200)
        }
      }
      if (!landed) {
        bad.push(`${route} NAVIGATION FAILED`)
        continue
      }

      let worst: number | null = null
      try {
        worst = await page.evaluate(() => {
          const d = document.documentElement
          const prevHtml = d.style.overflowX
          const prevBody = document.body.style.overflowX
          // Un-clip, or every measurement below is a constant.
          d.style.overflowX = 'visible'
          document.body.style.overflowX = 'visible'
          void d.offsetWidth
          const vw = d.clientWidth

          const reachable = (el: Element) => {
            for (let p = el.parentElement; p; p = p.parentElement) {
              const ox = getComputedStyle(p).overflowX
              if ((ox === 'auto' || ox === 'scroll') && p.scrollWidth > p.clientWidth + 1) return true
            }
            return false
          }

          const SLACK = 8
          let max = 0
          for (const el of Array.from(document.querySelectorAll('*'))) {
            if (!(el.textContent || '').trim()) continue
            const r = el.getBoundingClientRect()
            if (r.width <= 0) continue
            const past = Math.round(r.right - vw)
            if (past > SLACK && past > max && !reachable(el)) max = past
          }

          d.style.overflowX = prevHtml
          document.body.style.overflowX = prevBody
          return max
        })
      } catch (e) {
        // A redirect stub (/status, /login, /signup forward on hydration)
        // destroys the execution context. Left unhandled this threw out of the
        // loop and ONE such page ended the whole sweep, reporting a single
        // failure that read like a layout bug. A page that leaves cannot hide
        // anything; skip it, but say so — silent skips shrink coverage while
        // still reporting green.
        if (!/Execution context was destroyed|navigation/i.test(String(e))) throw e
        forwarded.push(route)
        continue
      }

      if (worst > 0) bad.push(`${route} — ${worst}px of text outside the viewport`)
    }

    if (forwarded.length) {
      console.log(`skipped ${forwarded.length} forwarding page(s): ${forwarded.join(', ')}`)
    }
    expect(
      bad,
      `pages hiding text off-screen at 390px (overflow-x: clip means it is unreachable):\n${bad.join('\n')}`,
    ).toEqual([])
  } finally {
    await server.close()
  }
})
