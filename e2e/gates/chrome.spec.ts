import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { test, expect } from '@playwright/test'
import { serveExport } from './export'

const OUT = join(process.cwd(), 'out')

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

test.describe('header chrome', () => {
  let base: string
  let stop: () => Promise<void>

  test.beforeAll(async () => {
    const served = await serveExport()
    base = served.url
    stop = served.close
  })
  test.afterAll(async () => stop())

  test('no door is offered twice', async ({ page }) => {
    await page.goto(`${base}/`)
    const bar = page.locator('header[data-hanzo-shell]')
    await expect(bar).toBeVisible()

    // Direct children only: the CTAs live in the bar itself, never in a drape.
    //
    // The rule is that the bar's two most valuable slots may not spend
    // themselves on ONE destination — which is what happened when "Sign in" and
    // the primary CTA were both console.hanzo.ai, and the pair then needed a CSS
    // `order` override whose only job was to arrange a duplicate. Written as
    // "exactly one console link" it asserted where that door points, and the bar
    // has since moved it: the pill is `Try Hanzo` to chat, because the console is
    // where you go once you have an account. So it counts DUPLICATES, which is
    // the scar, and says nothing about which hosts the bar chooses.
    const hrefs = (
      await bar.locator('> a[href]').evaluateAll((rows) => rows.map((r) => r.getAttribute('href')))
    ).filter((href): href is string => !!href)
    expect(hrefs.length, 'the bar carries actions').toBeGreaterThan(0)

    const twice = hrefs.filter((href, i) => hrefs.indexOf(href) !== i)
    expect([...new Set(twice)], 'the bar offers one destination twice').toEqual([])

    // The bar offers a sign-in again, because a reader who is signed out needs
    // the door and the header is where they look for it. So the scar is stated
    // as what was actually wrong — sign-in and the CTA on ONE host — rather than
    // as the absence of the control that happened to be carrying it.
    const hostOf = async (label: string) => {
      const href = await bar.locator('> a').filter({ hasText: label }).first().getAttribute('href')
      return href ? new URL(href, base).host : null
    }
    const [cta, signIn] = await Promise.all([hostOf('Try Hanzo'), hostOf('Sign in')])
    expect(signIn, 'the bar carries a sign-in door').toBeTruthy()
    expect(signIn, 'sign-in is not a second copy of the CTA').not.toBe(cta)
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
    // The menu opens by RESTING on the name — @hanzogui/shell says so, and the
    // trigger carries no onClick of its own. A click happens to work on a warm
    // desktop and does not headless, where the pointer sequence a click syn-
    // thesises can outrun the open. Hovering is what a reader does and what the
    // component listens for, and the assertion below polls, so an open that
    // takes a moment still counts.
    //
    // The trigger is asked for as the first control in the bar that opens a
    // dialog, rather than by tag or label: the wordmark beside it is a link of
    // the same name, and shell moves the label ("Meet Hanzo", then "Hanzo", and
    // the surface's own name on other properties). Neither is what this is about.
    await bar.locator('[aria-haspopup="dialog"]').first().hover()
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
  test('every header menu opens, and every row answers', async ({ page }) => {
    await page.goto(`${base}/`, { waitUntil: 'load' })
    const bar = page.locator('header[data-hanzo-shell]')

    // Every menu, found by what a menu IS rather than by its label. This gate
    // named ONE menu — Resources — and the header was later rebuilt around
    // different entries, so it asserted a card nothing renders and froze the
    // publish behind it. What it was really protecting is the second half: a
    // menu naming a route the export does not carry is the one failure a
    // header can ship that looks perfect. That holds for whichever menus the
    // bar has this week.
    // The NAV's menus. The bar carries two other things that declare
    // `aria-haspopup` — the Hanzo mark's menu and the Try Hanzo pill — and both
    // open on a CLICK, so sweeping the whole bar hovers a pill that never
    // answers. The local nav is the set this gate is about.
    const nav = bar.locator('nav')
    const labels = await nav
      .locator('a[aria-haspopup="dialog"]')
      .evaluateAll((rows) => rows.map((row) => row.textContent?.trim() ?? ''))
    expect(labels.length, 'the nav carries menus').toBeGreaterThan(0)

    const seen = new Set<string>()
    for (const label of labels) {
      const trigger = nav.locator('a[aria-haspopup="dialog"]').filter({ hasText: label }).first()
      const card = page.getByRole('dialog', { name: label })
      await expect(async () => {
        await trigger.hover()
        await expect(card).toBeVisible({ timeout: 1000 })
      }, `the ${label} menu opens`).toPass({ timeout: 15000 })

      const hrefs = await card
        .getByRole('link')
        .evaluateAll((rows) => rows.map((row) => row.getAttribute('href')))
      expect(hrefs.length, `the ${label} menu has rows`).toBeGreaterThan(0)
      for (const href of hrefs) if (href?.startsWith('/')) seen.add(href)
    }

    // Asked of the EXPORT, once per route: a row repeated across menus is the
    // same page. Navigating each was the old shape and it does not scale past
    // one menu — five rows is a moment, forty-five is a timeout — while the
    // question is only ever whether the export carries the file the row names.
    const missing = [...seen].filter((href) => {
      const rel = href.replace(/^\//, '') || 'index'
      return !existsSync(join(OUT, `${rel}.html`)) && !existsSync(join(OUT, rel, 'index.html'))
    })
    expect(missing, 'a menu row names a route the export does not carry').toEqual([])
  })
})
