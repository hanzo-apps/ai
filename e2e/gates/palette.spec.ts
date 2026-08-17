import { test, expect, type Page } from '@playwright/test'
import { serveExport } from './export'

/**
 * ⌘K.
 *
 * It is `@hanzogui/shell`'s, and it is asserted HERE because this repo is where
 * it is wired to real data: the palette can only find /pricing because
 * `components/home/shell.tsx` hands it `lib/data/pages.json`, and that file is
 * written at prebuild by walking `app/`. A test in the package would prove the
 * matcher works on a fixture; this proves the site is searchable.
 *
 * The palette's own doors group is one of the three lists it ranks and is
 * asserted below. The header pill is NOT a door onto that group — it is a
 * direct link to hanzo.chat, and where it points is chrome.spec's subject.
 *
 * Against `out/` — the bytes that ship — because the whole chain has to hold:
 * the walk found the routes, the snapshot got bundled, and the palette hydrated.
 */

const FIELD = 'input[placeholder="Search Hanzo"]'
const ROW = '[role="option"]'

/**
 * Open the palette by the chord, which is the way most readers reach it.
 *
 * Retried until it takes. `load` fires when the bytes are down, and the ⌘K
 * listener is attached by an effect some milliseconds later — so a single press
 * races hydration and the whole suite goes red for a reason that is not the
 * palette. Pressing only while the field is absent means a retry can never
 * toggle a palette that just opened back shut.
 */
async function open(page: Page): Promise<void> {
  await expect(async () => {
    if ((await page.locator(FIELD).count()) === 0) await page.keyboard.press('Meta+k')
    await expect(page.locator(FIELD)).toBeFocused({ timeout: 1000 })
  }).toPass({ timeout: 15000 })
}

/**
 * Wait for the page to answer its own keyboard.
 *
 * For the tests that click something. A click landing before hydration follows
 * the anchor's real href and leaves the site, which fails as a missing element
 * three lines later and reads like a broken selector.
 */
async function hydrated(page: Page): Promise<void> {
  await open(page)
  await page.keyboard.press('Escape')
  await expect(page.locator(FIELD)).toHaveCount(0)
}

/** The titles the palette offers for `query`, in the order it ranks them. */
async function results(page: Page, query: string): Promise<string[]> {
  await page.locator(FIELD).fill(query)
  // The first row is re-selected on every query, so waiting for that is
  // waiting for the render rather than for a duration.
  await expect(page.locator(ROW).first()).toHaveAttribute('aria-selected', 'true')
  return page.locator(ROW).evaluateAll((rows) =>
    rows.map((row) => (row.querySelector('span > span')?.textContent ?? '').trim())
  )
}

test.describe('the command palette', () => {
  test('finds pages, products and doors, ranks them, and never dead-ends', async ({ page }) => {
    const server = await serveExport()
    try {
      await page.setViewportSize({ width: 1280, height: 900 })
      await page.goto(server.url + '/', { waitUntil: 'load' })
      await open(page)

      // At rest it offers the doors — what most readers summon it to do.
      const idle = await results(page, '')
      expect(idle.slice(0, 3)).toEqual(['Hanzo Chat', 'Hanzo App', 'Hanzo Team'])

      // A page this site publishes. This is the whole defect: a products-only
      // index answered "no results" about the page the header links above it.
      expect((await results(page, 'pricing'))[0]).toBe('Pricing')
      expect((await results(page, 'careers'))[0]).toBe('Careers')

      // A product, named by the catalog.
      expect((await results(page, 'vector'))[0]).toBe('Vector')

      // A dropped letter still finds the word.
      expect((await results(page, 'machins'))[0]).toBe('Machines')
      expect((await results(page, 'vctor'))[0]).toBe('Vector')

      // A subsequence through prose is not a result: "docs" walks d·o·c·s
      // through most sentences on the site, and answering that is what makes a
      // search untrustworthy. The docs row, and almost nothing else.
      const docs = await results(page, 'docs')
      // 'Documentation', not 'Docs'. One destination carried both names — the
      // header CTA said one, a nav row said the other, and the palette ranked
      // them against each other. docs.hanzo.ai has a single name now, and this
      // is it.
      expect(docs[0]).toBe('Documentation')
      expect(docs.length).toBeLessThanOrEqual(3)

      // No query is a dead end — whatever was typed can always be asked.
      expect(await results(page, 'qqzzxx')).toEqual(['Ask AI: qqzzxx'])
    } finally {
      await server.close()
    }
  })

  test('walks on the arrows and leaves on Enter', async ({ page }) => {
    const server = await serveExport()
    try {
      await page.setViewportSize({ width: 1280, height: 900 })
      await page.goto(server.url + '/', { waitUntil: 'load' })
      await open(page)
      await results(page, 'pricing')

      // The field keeps the caret, so the selection is announced from there or
      // not at all.
      const first = page.locator(ROW).first()
      await expect(page.locator(FIELD)).toHaveAttribute(
        'aria-activedescendant',
        (await first.getAttribute('id')) ?? ''
      )

      await page.keyboard.press('ArrowDown')
      await expect(first).toHaveAttribute('aria-selected', 'false')
      await page.keyboard.press('ArrowUp')
      await expect(first).toHaveAttribute('aria-selected', 'true')

      await page.keyboard.press('Enter')
      await expect(page).toHaveURL(/\/pricing$/)
    } finally {
      await server.close()
    }
  })

  test('closes on Escape', async ({ page }) => {
    const server = await serveExport()
    try {
      await page.setViewportSize({ width: 1280, height: 900 })
      await page.goto(server.url + '/', { waitUntil: 'load' })
      await open(page)
      await page.keyboard.press('Escape')
      await expect(page.locator(FIELD)).toHaveCount(0)
    } finally {
      await server.close()
    }
  })

  test('is the whole screen on a phone', async ({ page }) => {
    const server = await serveExport()
    try {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto(server.url + '/', { waitUntil: 'load' })
      await hydrated(page)
      await page.locator('button[aria-label="Search Hanzo or ask AI"]').click()
      // A 576px card floated over a 390px phone is a card with wallpaper
      // around it, so the panel spans the screen instead.
      const box = (await page.locator('[role="dialog"]').boundingBox())!
      expect(Math.round(box.width)).toBe(390)
      expect(Math.round(box.height)).toBe(844)
      // The page must not scroll sideways behind it.
      const scroll = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      )
      expect(scroll).toBeLessThanOrEqual(0)
    } finally {
      await server.close()
    }
  })
})

test('the header pill is a real link, and it leaves for the product', async ({ page }) => {
  const server = await serveExport()
  try {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto(server.url + '/', { waitUntil: 'load' })
    await hydrated(page)

    // A LINK, not a button: the pill carries `primaryCTA.href` so it goes
    // somewhere before hydration and for anyone without JavaScript.
    //
    // Scoped to the BANNER, because the page is free to carry a CTA of its own
    // by the same name — one does, and an unscoped role query matches both and
    // refuses to guess.
    const pill = page.getByRole('banner').getByRole('link', { name: 'Try Hanzo' })
    const href = await pill.getAttribute('href')
    expect(href, 'the pill leaves this site for the product').toMatch(/^https:\/\//)

    // And it opens nothing on the way: the site's answer to "try Hanzo" is the
    // product, so a dialog here is a chooser standing in front of it. Which host
    // it chooses is chrome.spec's subject, not this one's.
    await pill.click()
    await expect(page.locator('[role="dialog"]')).toHaveCount(0)
  } finally {
    await server.close()
  }
})
