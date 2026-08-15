import { test, expect } from '@playwright/test'
import { serveExport } from './export'

/**
 * The header offers each door ONCE, and hides nothing it did not mean to.
 *
 * Both rules here are scars, and both failures were silent — the page rendered,
 * the build was green, and only counting the rows found them.
 *
 * ONE DOOR. "Sign in" and the primary CTA were both `console.hanzo.ai`. The
 * header spent its two most valuable slots offering a choice that does not
 * exist, and the pair then needed a CSS `order` override to sit in a sensible
 * sequence — a hack whose only job was to arrange a duplicate. `signInHref`'s
 * own contract says to omit it on a surface whose primary CTA IS the sign-in;
 * this asserts we did.
 *
 * SCOPE A HIDE TO WHAT YOU MEANT. Documentation was moved out of the bar and
 * into the Meet Hanzo menu, by hiding the header's secondary CTA on its href.
 * Written as a DESCENDANT selector — `[data-hanzo-shell] a[href^=docs…]` — it
 * matched far more than the bar: the mega-menu drape, the command palette and
 * the footer each carry `data-hanzo-shell` too, so the rule deleted
 * "Documentation" and "Quickstarts" from the menu it was supposed to move them
 * into, and took the footer's docs links with them. The Resources column
 * rendered four of its six rows and nothing anywhere said so.
 *
 * So the two halves are asserted TOGETHER, because either alone passes while
 * the pair is wrong: the bar must not link docs, and the page must.
 */
const DOCS = 'https://docs.hanzo.ai'
const CONSOLE = 'https://console.hanzo.ai'

test.describe('header chrome', () => {
  let base: string
  let stop: () => Promise<void>

  test.beforeAll(async () => {
    const served = await serveExport()
    base = served.url
    stop = served.close
  })
  test.afterAll(async () => stop())

  test('one console door, not two', async ({ page }) => {
    await page.goto(`${base}/`)
    const bar = page.locator('header[data-hanzo-shell]')
    await expect(bar).toBeVisible()

    // Direct children only: the CTAs live in the bar itself, never in a drape.
    const doors = bar.locator(`> a[href^="${CONSOLE}"]`)
    await expect(doors).toHaveCount(1)
    await expect(doors.first()).toHaveText('Try Hanzo')

    // And nothing re-introduces the word by another route.
    await expect(bar.getByText('Sign in', { exact: true })).toHaveCount(0)
  })

  test('docs leaves the bar and stays on the page', async ({ page }) => {
    await page.goto(`${base}/`)

    // Out of the bar…
    const bar = page.locator('header[data-hanzo-shell]')
    const inBar = bar.locator(`> a[href^="${DOCS}"]:visible`)
    await expect(inBar).toHaveCount(0)

    // …and into the menu. Open it and read the row, rather than trusting that
    // the registry still holds it: the registry DID hold it throughout the bug.
    //
    // The trigger is named by @hanzogui/shell and it says "Hanzo" (it said "Meet
    // Hanzo" through 8.1.18). `exact` matters: "Search Hanzo or ask AI" is also
    // a button in this bar, and the wordmark beside it is a link of the same
    // name. What is asserted is unchanged — only who spells the label.
    await page.getByRole('button', { name: 'Hanzo', exact: true }).click()
    const menu = page.locator('#hanzo-meet-menu')
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link', { name: 'Documentation' })).toBeVisible()
    await expect(menu.getByRole('link', { name: 'Quickstarts' })).toBeVisible()

    // The footer keeps its docs links too — same rule, other end of the page.
    await page.keyboard.press('Escape')
    const footer = page.locator('footer[data-hanzo-shell]')
    if (await footer.count()) {
      await expect(footer.locator(`a[href^="${DOCS}"]:visible`).first()).toBeVisible()
    }
  })

  /**
   * What we publish is five pages, and Resources holds all five.
   *
   * The card only exists once the bar has hydrated, so this is the one thing
   * reading the export's bytes cannot answer — the hrefs are not in the HTML
   * until the menu opens. It is a HOVER rather than a click: resting the pointer
   * is what `useIntent` opens on, and a hover that lands early is harmless,
   * while an early click follows the label's own href and quietly moves the test
   * to another page.
   *
   * Then every row is walked to its page. A menu naming a route the export does
   * not carry is the one failure a header can ship that looks perfect.
   */
  test('Resources holds what we publish, and every row answers', async ({ page }) => {
    await page.goto(`${base}/`, { waitUntil: 'load' })
    const trigger = page
      .locator('header[data-hanzo-shell]')
      .getByRole('link', { name: 'Resources' })
    const card = page.getByRole('dialog', { name: 'Resources' })
    await expect(async () => {
      await trigger.hover()
      await expect(card).toBeVisible({ timeout: 1000 })
    }).toPass({ timeout: 15000 })

    const hrefs = await card
      .getByRole('link')
      .evaluateAll((rows) => rows.map((row) => row.getAttribute('href')))
    expect(hrefs).toEqual(['/learn', '/research', '/open-source', '/blog', '/customers'])

    for (const href of hrefs) {
      await page.goto(`${base}${href}`)
      await expect(page.locator('h1').first()).toBeVisible()
    }
  })
})
