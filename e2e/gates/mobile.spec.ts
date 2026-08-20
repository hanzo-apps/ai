import { test, expect } from '@playwright/test'
import { policy } from '../../lib/publish'
import { pages, serveExport } from './export'

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
 * test for it.
 *
 * It then measured the wrong MOMENT, which blinded it a second way. Every page
 * here is a React page hydrated from the export, and the widest parts of it are
 * rendered by the client: measured at `domcontentloaded` this reported /ai-studio
 * clean, while the settled page has 192px of its composer — the Send button — off
 * the side. Because the export is walked through as it hydrates, WHEN the walk
 * happens decided the answer: on an idle machine it read the pre-hydration paint
 * and passed, and inside the full suite it read a half-hydrated one and reported
 * three pages that are fine once settled. A gate whose verdict depends on machine
 * load is not a gate; it teaches a re-run, and a re-run until green is a gate
 * switched off.
 *
 * So the measurement is of the SETTLED page and says so: fonts resolved, then
 * sampled until two consecutive samples agree. It is ONE `evaluate` per page, not
 * a loop of them — sampling across round trips is what let a client-side forward
 * land BETWEEN two of them, which destroys the execution context and made
 * "skipped" a race. A page that does not converge is a NAMED failure below, never
 * an approximation: a bound that gives up quietly is the thing being fixed.
 *
 * Two things it deliberately does NOT flag, both learned by measuring:
 *
 *   Decoration. /about's 800px radial glow is centred with -translate-x-1/2 and
 *   sits 205px past the edge BY CONSTRUCTION. A reader loses nothing, so only
 *   text-bearing elements count. 8px of slack absorbs sub-pixel rounding.
 *
 *   Content inside a horizontally scrollable ancestor. That is the sanctioned
 *   pattern — wide things scroll in their own container — and condemning it
 *   reported ~40 pages broken for doing exactly the right thing.
 */

const VIEWPORT = { width: 390, height: 844 }

/** Slack for sub-pixel rounding. Not for animation: the measurement is settled. */
const SLACK = 8

/** How many samples a page gets to hold still, and how long between them. */
const SAMPLES = 10
const QUIET = 120

/** What one page's settled layout says. */
interface Reading {
  /** The furthest any unreachable text sits past the viewport, 0 for none. */
  past: number
  /** Which element that was, for the failure message. */
  who: string
  /** Whether two consecutive samples agreed. False means nothing was measured. */
  settled: boolean
}

/**
 * Measure the settled page, in the page, in one round trip.
 *
 * Passed as a function to `evaluate`, so it is the browser that waits: the fonts
 * and the sampling both happen inside one call, and a forward that fires part way
 * through fails the call rather than corrupting the next page's reading.
 */
async function reading([slack, samples, quiet]: readonly [number, number, number]): Promise<Reading> {
  const probe = () => {
    const d = document.documentElement
    const wasHtml = d.style.overflowX
    const wasBody = document.body.style.overflowX
    // Un-clip, or every measurement here is a constant.
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

    let past = 0
    let who = ''
    for (const el of Array.from(document.querySelectorAll('*'))) {
      if (!(el.textContent || '').trim()) continue
      const r = el.getBoundingClientRect()
      if (r.width <= 0) continue
      const out = Math.round(r.right - vw)
      if (out > slack && out > past && !reachable(el)) {
        past = out
        who = `<${el.tagName.toLowerCase()}> ${JSON.stringify((el.textContent || '').trim().slice(0, 40))}`
      }
    }

    d.style.overflowX = wasHtml
    document.body.style.overflowX = wasBody
    return { past, who }
  }

  await document.fonts.ready
  let last = probe()
  for (let i = 0; i < samples; i++) {
    await new Promise((done) => setTimeout(done, quiet))
    const next = probe()
    if (next.past === last.past) return { ...next, settled: true }
    last = next
  }
  return { ...last, settled: false }
}

/**
 * The three ways a page LEAVING shows up, and nothing else.
 *
 * A client-side forward destroys the execution context under the measurement, and
 * if it fires while the NEXT route is loading the browser aborts that navigation
 * instead — the same event, a different message, and the reason a sweep could die
 * on `/skills` for something `/signup` did. Everything else rethrows: a gate that
 * swallows an unrecognised error is a gate that reports green for a reason nobody
 * chose.
 */
const leaves = (e: unknown) =>
  /Execution context was destroyed|net::ERR_ABORTED|navigation/i.test(String(e))

test('no exported page hides text off the side at 390px', async ({ page }) => {
  test.setTimeout(15 * 60 * 1000)
  const server = await serveExport()
  try {
    await page.setViewportSize(VIEWPORT)
    const hiding: string[] = []
    const unsettled: string[] = []
    const leaving: string[] = []
    let measured = 0

    const subject = pages()
    for (const { route } of subject) {
      let read: Reading | null = null
      // Two attempts, because a forward is the one thing that can end the call
      // for a reason that is not the page's layout.
      for (let attempt = 0; attempt < 2 && !read; attempt++) {
        try {
          // One page at a time. A forward scheduled by the PREVIOUS route runs in
          // the previous route's context, and if it fires while this one is loading
          // the browser aborts this navigation — so a sweep read a page as broken
          // for what its alphabetical neighbour did. Tearing the old context down
          // first makes each reading a fact about its own route.
          await page.goto('about:blank')
          await page.goto(server.url + route, { waitUntil: 'load' })
          read = await page.evaluate(reading, [SLACK, SAMPLES, QUIET] as const)
        } catch (e) {
          if (!leaves(e)) throw e
        }
      }
      if (!read) {
        leaving.push(route)
        continue
      }
      measured++
      if (!read.settled) unsettled.push(`${route} — still moving after ${SAMPLES} samples`)
      else if (read.past > 0) hiding.push(`${route} — ${read.past}px of text outside the viewport: ${read.who}`)
    }

    // The invariant. Named first because it is the one a reader feels.
    expect(
      hiding,
      `pages hiding text off-screen at 390px (overflow-x: clip means it is unreachable):\n${hiding.join('\n')}`,
    ).toEqual([])

    // A page that never held still was not measured, and "not measured" must not
    // read back as "clean". This was a `console.log`, which is how a sweep can
    // cover a fraction of the export and still report green.
    expect(
      unsettled,
      `pages whose layout never settled, so nothing was measured:\n${unsettled.join('\n')}`,
    ).toEqual([])

    // A page that forwards has no layout of its own to measure, and skipping it
    // is right — but WHICH pages those are is a declaration, not a discovery.
    // `lib/publish`'s own words for the list they belong to: "a redirect, or a
    // shell that waits for a session". So a forward is allowed exactly where the
    // publication policy already says there is nothing to read, and a published
    // page that quietly navigates away fails here and names itself.
    const undeclared = leaving.filter((route) => policy(route) === 'public')
    expect(
      undeclared,
      `published pages that navigated away, so their layout went unmeasured — ` +
        `declare them in lib/publish or stop them forwarding:\n${undeclared.join('\n')}`,
    ).toEqual([])

    // And the subject is accounted for in full: every route either held still
    // long enough to be measured or is a declared forward. Nothing falls out.
    expect(measured + leaving.length, 'every route in the export is measured or declared').toBe(subject.length)
    expect(measured, 'and the measured part is the bulk of the export').toBeGreaterThan(subject.length - 20)
  } finally {
    await server.close()
  }
})
