// Cloud-native products mega-menu — structure + interaction + deep links.
//
// Proves the 10-category, two-row taxonomy renders (Web3, not Chain), hovering
// opens the panel, every leaf deep-links into BOTH the console (quick-launch)
// and the docs, and the old categories are gone.
//
//   pnpm exec playwright test e2e/mega-menu.spec.ts
//   BASE_URL=https://hanzo.ai pnpm exec playwright test e2e/mega-menu.spec.ts

import { test, expect } from '@playwright/test'

const CATEGORIES = [
  // row 1
  'AI', 'Compute', 'Data', 'Network', 'Security',
  // row 2
  'Dev', 'Deploy', 'Observe', 'Web3', 'Apps',
]

// Categories that were renamed/removed in the reorg — must NOT appear.
// 'Chain' was the interim label for category 9; the owner's final call is 'Web3'.
const REMOVED = ['AI & Agents', 'Developer', 'Async', 'Platform', 'Observability', 'Chain']

async function openProducts(page) {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Products', exact: true })
  await expect(trigger).toBeVisible()
  await trigger.hover()
  // Panel opens on hover; wait for the first category heading.
  await expect(page.getByRole('heading', { name: 'AI', exact: true })).toBeVisible()
}

test('mega-menu shows all 10 cloud categories', async ({ page }) => {
  await openProducts(page)
  for (const name of CATEGORIES) {
    await expect(
      page.getByRole('heading', { name, exact: true }),
      `category "${name}" missing from mega-menu`,
    ).toBeVisible()
  }
})

test('mega-menu drops the old categories', async ({ page }) => {
  await openProducts(page)
  for (const name of REMOVED) {
    await expect(
      page.getByRole('heading', { name, exact: true }),
      `removed category "${name}" still present`,
    ).toHaveCount(0)
  }
})

test('mega-menu surfaces the GCP-compatible positioning', async ({ page }) => {
  await openProducts(page)
  await expect(page.getByText('GCP-compatible. Open source. On-chain.')).toBeVisible()
})

test('no mega-menu leaf is a dead (#) link', async ({ page }) => {
  await openProducts(page)
  // Every product link in the open panel must point somewhere real.
  const deadCount = await page.locator('a[href="#"]:visible').count()
  expect(deadCount, 'found dead (#) links in mega-menu').toBe(0)
})

// Scope leaf lookups to the main nav landmark so footer links never collide.
const menu = (page) => page.getByRole('navigation').filter({ hasText: 'Products' }).first()

test('every leaf deep-links into the console (quick-launch) and the docs', async ({ page }) => {
  await openProducts(page)
  const nav = menu(page)

  // 10 categories × 6 leaves = 60 console quick-launch links + 60 docs links.
  const consoleLinks = nav.locator('a[href^="https://console.hanzo.ai/?deploy="]')
  const docsLinks = nav.locator('a[href^="https://docs.hanzo.ai/docs/"]')
  expect(await consoleLinks.count(), 'console quick-launch links').toBeGreaterThanOrEqual(60)
  expect(await docsLinks.count(), 'docs deep links').toBeGreaterThanOrEqual(60)

  // Spot-check a representative leaf — Data → Vector — has BOTH deep links.
  await expect(
    nav.locator('a[href="https://console.hanzo.ai/?deploy=vector"]'),
    'Vector console quick-launch',
  ).toHaveCount(1)
  expect(
    await nav.locator('a[href="https://docs.hanzo.ai/docs/services/vector"]').count(),
    'Vector docs deep link',
  ).toBeGreaterThanOrEqual(1)

  // And a generated leaf — AI → Fine-tuning — keeps its canonical product slug.
  await expect(
    nav.locator('a[href="https://console.hanzo.ai/?deploy=fine-tuning"]'),
    'Fine-tuning console quick-launch',
  ).toHaveCount(1)
})
