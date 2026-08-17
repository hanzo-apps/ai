import { test, expect } from '@playwright/test'
import { serveExport } from './export'

/**
 * The door out of the ladder.
 *
 * Every paid card on /pricing is a link to the same place, and two properties of
 * that link decide whether a reader who presses it can still buy. Both were
 * wrong at once, and neither is visible in a screenshot of the page:
 *
 *   IT MUST NAME THE PLAN. `?plan=<slug>` is the only thing that travels — the
 *   price is never in the URL and must never be, because commerce prices the
 *   charge from its own catalog. Downstream, billing continues the choice and
 *   pay renders the plan and its price from that one id. A link with no plan on
 *   it drops the reader at the top of a ladder they have already read.
 *
 *   IT MUST STAY IN THIS TAB. Buying is not consulting a reference. A new tab
 *   opens with an empty history, so Back is dead in it and the ladder the buyer
 *   was comparing is stranded behind a tab strip — measured: a click on Pro
 *   opened a second tab, crossed billing and landed on the identity provider,
 *   with no way back to the tier below the one they clicked.
 *
 * Against `out/` — the bytes that ship — and after hydration, because the hrefs
 * are written by `lib/plans` from the live catalog and the first paint is the
 * published fallback. Both spellings have to be right; asserting the markup
 * would only measure one of them.
 *
 * Nothing here states a PRICE. The ladder is re-priced upstream in commerce, so
 * a number written down in this file is wrong the week it is written; what a
 * gate can own is the shape of the link, which does not move.
 */

/** The hosts a checkout may point at. Anything else on a plan CTA is not a sale. */
const CHECKOUT = /^https:\/\/(billing|pay)\.hanzo\.ai\//

type Cta = { href: string; target: string; text: string }

test.describe('the checkout link', () => {
  test('names its plan and keeps the ladder in reach', async ({ page }) => {
    const server = await serveExport()
    try {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(server.url + '/pricing', { waitUntil: 'load' })

      // The cards paint from the published fallback and are replaced by the live
      // catalog. Either way there are CTAs; waiting for the first one is waiting
      // for the render rather than for a duration.
      const ctas = page.locator('a[href^="https://billing.hanzo.ai/"], a[href^="https://pay.hanzo.ai/"]')
      await expect(ctas.first()).toBeAttached({ timeout: 15000 })

      const links: Cta[] = await ctas.evaluateAll((as) =>
        as.map((a) => ({
          href: (a as HTMLAnchorElement).href,
          target: (a as HTMLAnchorElement).target,
          text: (a.textContent ?? '').trim(),
        })),
      )

      // A pricing page with no way to buy is the failure this gate would
      // otherwise pass on, so the count is asserted before the properties.
      expect(links.length, 'no plan on /pricing links to a checkout').toBeGreaterThan(0)

      for (const cta of links) {
        expect(cta.href, `"${cta.text}" points somewhere that is not a checkout`).toMatch(CHECKOUT)
        expect(
          new URL(cta.href).searchParams.get('plan'),
          `"${cta.text}" opens the checkout without naming a plan`,
        ).toBeTruthy()
        expect(cta.target, `"${cta.text}" opens a new tab, which kills the back button`).toBe('')
      }
    } finally {
      await server.close()
    }
  })
})
