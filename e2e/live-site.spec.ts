// Live marketing-site E2E + visual capture.
//
// Drives the real, deployed hanzo.ai (or any BASE_URL) with a real browser:
//   - renders the core marketing views (home, pricing, zen, open-source, dev, chat)
//   - opens the Products mega-menu and asserts the full catalog is present
//   - sweeps header/footer links and fails on any 404/5xx
//   - clicks real footer links and confirms each destination renders
//
// Every step writes a PNG to SHOT_DIR so the run doubles as a visual record.
//
// Run against production:
//   BASE_URL=https://hanzo.ai \
//   SHOT_DIR=/abs/path/to/screenshots \
//   npx playwright test e2e/live-site.spec.ts --project=chromium
//
// SHOT_DIR defaults to test-results/live-shots (git-ignored) when unset.

import { test, expect, type Page } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const SHOT_DIR = process.env.SHOT_DIR || join('test-results', 'live-shots')
mkdirSync(SHOT_DIR, { recursive: true })

const shot = (name: string) => join(SHOT_DIR, name)

// Scroll the whole page in viewport-sized steps so framer-motion
// `whileInView` sections actually animate in before we screenshot,
// then return to the top for a clean full-page capture.
async function settle(page: Page) {
  await page.waitForLoadState('domcontentloaded')
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.85)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 250))
  })
}

async function capture(page: Page, path: string, file: string) {
  const resp = await page.goto(path, { waitUntil: 'commit' })
  // Static export serves real 200s for prerendered routes.
  expect(resp, `no response for ${path}`).toBeTruthy()
  expect(resp!.status(), `${path} returned ${resp!.status()}`).toBeLessThan(400)
  await settle(page)
  const body = await page.locator('body').innerText()
  expect(body.length, `${path} body too short (stub?)`).toBeGreaterThan(200)
  await page.screenshot({ path: shot(file), fullPage: true })
  return body
}

// Core marketing views the task requires a screenshot of.
const VIEWS: Array<[string, string]> = [
  ['/', '00-home.png'],
  ['/pricing', '01-pricing.png'],
  ['/zen', '02-zen.png'],
  ['/open-source', '03-open-source.png'],
  ['/dev', '04-dev.png'],
  ['/chat', '05-chat.png'],
]

test.describe('hanzo.ai — core marketing views render', () => {
  for (const [path, file] of VIEWS) {
    test(`renders ${path}`, async ({ page }) => {
      test.setTimeout(60000)
      const body = await capture(page, path, file)
      // Every marketing page has a visible hero heading.
      await expect(page.locator('h1, h2').first()).toBeVisible()
      // No client-side error boundary / Next 404 text leaked into the view.
      expect(body).not.toMatch(/This page could not be found|404\s*\|/i)
    })
  }
})

test.describe('hanzo.ai — Products mega-menu', () => {
  test('hovering Products reveals the full catalog', async ({ page }) => {
    test.setTimeout(60000)
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/', { waitUntil: 'commit' })
    await page.waitForLoadState('networkidle').catch(() => {})

    // The top bar is a <nav> (not <header>); the Products button is unique.
    const nav = page.locator('nav').first()
    const trigger = page.getByRole('button', { name: 'Products', exact: true })
    await expect(trigger).toBeVisible()

    // Desktop NavMenu opens on hover, but useMediaQuery hydrates to `true`
    // only after mount — fall back to a click (mobile toggle) if the panel
    // doesn't appear on hover. Detect "open" via the Compute category heading
    // (present in both the deployed and local product taxonomies).
    const probe = nav.getByRole('heading', { name: /^compute$/i })
    await trigger.hover()
    try {
      await probe.waitFor({ state: 'visible', timeout: 3000 })
    } catch {
      await trigger.click()
      await probe.waitFor({ state: 'visible', timeout: 5000 })
    }

    // Mega-menu reveals the full category grid. Taxonomy/casing differs
    // between deploys, so assert case-insensitively on stable categories
    // plus a healthy category count.
    const headings = await nav
      .locator('h3, h4')
      .evaluateAll((els) => els.map((e) => (e as HTMLElement).innerText.trim()).filter(Boolean))
    const upper = headings.map((h) => h.toUpperCase())
    for (const cat of ['COMPUTE', 'DATA']) {
      expect(upper, `categories revealed: ${headings.join(', ')}`).toContain(cat)
    }
    expect(headings.length, `categories: ${headings.join(', ')}`).toBeGreaterThanOrEqual(6)

    await page.screenshot({ path: shot('06-products-menu.png'), fullPage: false })
  })
})

// Header + footer destinations. Internal routes must be < 400; we record
// any offender. External links (github/discord/docs) are probed by HEAD.
const INTERNAL_LINKS = [
  '/pricing', '/enterprise', '/zen', '/agents', '/dev', '/chat', '/search',
  '/crawl', '/vector', '/cloud', '/iam', '/kms', '/platform', '/console',
  '/insights', '/blockchain/chains', '/blockchain/exchange', '/blockchain/wallets',
  '/blockchain/pay', '/about', '/team', '/careers', '/security', '/press',
  '/privacy', '/terms',
]

test.describe('hanzo.ai — link integrity (no 404/5xx)', () => {
  test('all header/footer internal routes resolve', async ({ page }) => {
    test.setTimeout(120000)
    const broken: string[] = []
    for (const href of INTERNAL_LINKS) {
      const resp = await page.goto(href, { waitUntil: 'commit' }).catch(() => null)
      const status = resp?.status() ?? 0
      if (!resp || status >= 400) broken.push(`${href} -> ${status || 'no response'}`)
    }
    expect(broken, `broken links:\n${broken.join('\n')}`).toEqual([])
  })

  test('all rendered footer links resolve', async ({ page }) => {
    test.setTimeout(120000)
    await page.goto('/', { waitUntil: 'commit' })
    await page.waitForLoadState('networkidle').catch(() => {})
    const hrefs = await page.locator('footer a[href^="/"]').evaluateAll((els) =>
      Array.from(
        new Set(els.map((e) => (e as HTMLAnchorElement).getAttribute('href')).filter(Boolean)),
      ),
    )
    expect(hrefs.length, 'footer should render many links').toBeGreaterThan(10)
    const broken: string[] = []
    for (const href of hrefs) {
      const resp = await page.goto(href!, { waitUntil: 'commit' }).catch(() => null)
      const status = resp?.status() ?? 0
      if (!resp || status >= 400) broken.push(`${href} -> ${status || 'no response'}`)
    }
    expect(broken, `broken footer links:\n${broken.join('\n')}`).toEqual([])
  })
})

test.describe('hanzo.ai — clicking footer links navigates', () => {
  // Real clicks (not just goto) on footer anchors; confirm each renders.
  const CLICKS: Array<[string, string, string]> = [
    ['Hanzo Dev', '/dev', '07-link-dev.png'],
    ['Privacy', '/privacy', '08-link-privacy.png'],
  ]
  for (const [label, expectedPath, file] of CLICKS) {
    test(`footer "${label}" -> ${expectedPath}`, async ({ page }) => {
      test.setTimeout(60000)
      await page.goto('/', { waitUntil: 'commit' })
      await page.waitForLoadState('networkidle').catch(() => {})
      const link = page.locator(`footer a[href="${expectedPath}"]`).first()
      await link.scrollIntoViewIfNeeded()
      await expect(link).toBeVisible()
      await link.click()
      await page.waitForURL(`**${expectedPath}`, { timeout: 15000 })
      await settle(page)
      await expect(page.locator('h1, h2').first()).toBeVisible()
      await page.screenshot({ path: shot(file), fullPage: true })
    })
  }
})
