// Cloud-native products mega-menu — structure + interaction.
//
// Proves the 10-category, two-row taxonomy renders (Web3, not Chain), hovering
// opens the panel, no leaf is a dead link, and the old category labels are gone.
//
//   pnpm exec playwright test e2e/mega-menu.spec.ts
//   BASE_URL=https://hanzo.ai pnpm exec playwright test e2e/mega-menu.spec.ts
//
// This file was failing every assertion for long enough that it had stopped
// being a signal, and all five failures were the TEST being out of date rather
// than the menu being broken. Recording what was wrong, because each one is a
// way a UI test rots:
//
//   1. It looked for the categories via `getByRole('heading')`. In the panel
//      they are links, not headings, so the very first wait timed out and every
//      test failed in the shared helper — one cause wearing five hats.
//   2. It expected a category called `Deploy`. The owner's final label is
//      `Platform` (lib/data/cloud-primitives.ts, and the products table in
//      CLAUDE.md agree).
//   3. It ALSO listed `Platform` in REMOVED, so the correct taxonomy could not
//      have passed even once the panel opened. Two assertions contradicting
//      each other is the tell that a list was edited without re-reading it.
//   4. It asserted 60 `console.hanzo.ai/?deploy=<slug>` quick-launch links and
//      60 per-leaf docs links. That design is gone — leaves are plain internal
//      product routes now — and the console never read a `?deploy=` param
//      (there is no such handler anywhere in its source), so those links would
//      have gone nowhere useful even when they existed.
//
// Measured rather than assumed: hovering Products on BOTH `/` and `/overview`
// renders all ten categories, and neither page has a single `href="#"`.

import { test, expect } from '@playwright/test'

const CATEGORIES = [
  // row 1
  'AI', 'Compute', 'Data', 'Network', 'Security',
  // row 2
  'Dev', 'Platform', 'Observe', 'Web3', 'Apps',
]

// Labels from earlier drafts of the taxonomy — must NOT appear.
// 'Chain' was the interim label for category 9; the owner's final call is 'Web3'.
const REMOVED = ['AI & Agents', 'Developer', 'Async', 'Observability', 'Chain']

async function openProducts(page) {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Products', exact: true })
  await expect(trigger).toBeVisible()
  await trigger.hover()
  // The panel is client-rendered on hover — wait for a real leaf, not a heading.
  await expect(page.getByText('Compute', { exact: true }).first()).toBeVisible()
}

test('mega-menu shows all 10 cloud categories', async ({ page }) => {
  await openProducts(page)
  for (const name of CATEGORIES) {
    await expect(
      page.getByText(name, { exact: true }).first(),
      `category "${name}" missing from mega-menu`,
    ).toBeVisible()
  }
})

test('mega-menu drops the old category labels', async ({ page }) => {
  await openProducts(page)
  for (const name of REMOVED) {
    await expect(
      page.getByText(name, { exact: true }),
      `removed category "${name}" still present`,
    ).toHaveCount(0)
  }
})

test('no mega-menu leaf is a dead (#) link', async ({ page }) => {
  await openProducts(page)
  const dead = await page.locator('a[href="#"]').count()
  expect(dead, 'found dead (#) links with the mega-menu open').toBe(0)
})

test('every category deep-links to its /products page', async ({ page }) => {
  await openProducts(page)
  // The category header is the entry point to the category landing page, and
  // those routes are generated from the same `categorySlugs` the panel is — so
  // a missing one means the nav and the routes have drifted apart.
  //
  // Asserted as a SET, not as a count per category. A category is linked three
  // times on this page — the panel header, the panel's "All <Category> →"
  // handoff, and the homepage category grid — and the grid is below the fold,
  // so a per-category `toHaveCount(1)` passed or failed on whether framer's
  // whileInView had fired yet. It went green alone and red in a full run, which
  // is a test measuring the scheduler.
  //
  // The set is the stronger reading anyway: it catches a landing the menu links
  // that is not a category as well as a category the menu forgot.
  const linked = await page.$$eval('a[href^="/products/"]', (els) =>
    [...new Set(els.map((el) => el.getAttribute('href')!.slice('/products/'.length)))].sort(),
  )
  expect(linked, 'the /products landings the menu links').toEqual([
    'ai', 'apps', 'compute', 'data', 'dev', 'network', 'observe', 'platform', 'security', 'web3',
  ])
})
