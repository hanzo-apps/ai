// Cloud-native products mega-menu — structure + interaction.
//
// Proves the 10-category, two-row taxonomy renders, hovering opens the panel,
// leaves navigate to real pages, and the old categories are gone.
//
//   pnpm exec playwright test e2e/mega-menu.spec.ts
//   BASE_URL=https://hanzo.ai pnpm exec playwright test e2e/mega-menu.spec.ts

import { test, expect } from '@playwright/test'

const CATEGORIES = [
  // row 1
  'AI', 'Compute', 'Data', 'Network', 'Security',
  // row 2
  'Dev', 'Deploy', 'Observe', 'Chain', 'Apps',
]

// Categories that were renamed/removed in the reorg — must NOT appear.
const REMOVED = ['AI & Agents', 'Developer', 'Async', 'Platform', 'Observability', 'Web3']

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

// Scope leaf lookups to the main nav landmark so footer links (e.g. the
// /solutions/* column) never collide with mega-menu leaves.
const menu = (page) => page.getByRole('navigation').filter({ hasText: 'Products' }).first()

test('hovering a category exposes its leaves and they navigate', async ({ page }) => {
  await openProducts(page)

  // A bespoke-page leaf (Network → VPC → /network).
  const vpc = menu(page).getByRole('link', { name: 'VPC', exact: true })
  await expect(vpc).toBeVisible()
  await vpc.click()
  await expect(page).toHaveURL(/\/network$/)
  expect((await page.locator('h1').first().innerText()).length).toBeGreaterThan(0)

  // A generated-overview leaf (AI → Fine-tuning → /cloud/fine-tuning).
  await openProducts(page)
  const ft = menu(page).getByRole('link', { name: 'Fine-tuning', exact: true })
  await expect(ft).toBeVisible()
  await ft.click()
  await expect(page).toHaveURL(/\/cloud\/fine-tuning$/)
  await expect(page.getByRole('heading', { name: 'Fine-tuning', exact: true })).toBeVisible()
})
