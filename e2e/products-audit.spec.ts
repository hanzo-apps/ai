// Structural audit + screenshot capture for every product page.
//
// Asserts (per slug):
//   - Page returns 200
//   - <h1> exists (hero)
//   - At least one anchor pointing at console.hanzo.ai/deploy/<slug> exists
//     OR a [data-testid="deploy-cta"] anchor exists
//   - At least one OSS attribution block exists (license + GitHub link)
//   - One screenshot saved to tests/screenshots/products/<slug>.png
//
// Run:
//   pnpm dev   # terminal A — serve on :8084
//   pnpm test e2e/products-audit.spec.ts

import { test, expect } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PRODUCT_SLUGS = [
  // AI & Agents
  'zen', 'agents', 'ai-studio', 'mcp', 'zap', 'llm', 'engine', 'jin', 'guard', 'skills',
  // Developer
  'dev', 'playground', 'code', 'cli', 'desktop', 'gui', 'ui', 'extension', 'operative',
  // Apps
  'chat', 'bot', 'app', 'search', 'crawl', 'base', 'commerce', 'payments', 'captable',
  'dataroom', 'sign', 'billing', 'ledger', 'treasury', 'studio', 'computer', 'enso',
  'gallery', 'world',
  // Compute
  'cloud', 'functions', 'machines', 'edge', 'realtime', 'node', 'network', 'tunnel', 'registry',
  // Data
  'vector', 'sql', 'kv', 'datastore', 'storage', 'docdb', 'database',
  // Async
  'flow', 'auto', 'tasks', 'pubsub', 'mq', 'stream',
  // Platform
  'iam', 'kms', 'platform', 'dns', 'console', 'gateway', 'ingress', 'operator', 'visor',
  'hsm', 'idv', 'authz',
  // Observability
  'insights', 'analytics', 'status', 'dashboards', 'telemetry', 'metrics', 'sentry', 'o11y',
]

const WEB3_SLUGS = [
  'chains', 'exchange', 'wallets', 'indexer', 'nft', 'tokens', 'pay', 'bridge',
]

const SHOT_DIR = path.resolve(__dirname, '../tests/screenshots/products')
test.beforeAll(() => {
  mkdirSync(SHOT_DIR, { recursive: true })
})

function checkPage(slug: string, urlPath: string) {
  test(`product audit: ${urlPath}`, async ({ page }) => {
    const resp = await page.goto(urlPath)
    expect(resp?.status(), `${urlPath} returned ${resp?.status()}`).toBe(200)

    // A REDIRECT STUB is a legitimate page shape, not a broken product page.
    // `/status` calls window.location.replace() from a useEffect, so it leaves
    // the moment it hydrates. Every assertion below then raced the navigation
    // and the first to lose reported "missing <h1>" — a real element, on a page
    // that was already gone.
    //
    // Detect it by WHERE WE ENDED UP, not by reading text off the stub: by the
    // time a locator resolves, the stub's own markup may no longer be there.
    // A page that forwards is fine as long as it lands somewhere real.
    // Compare against the ORIGIN OF THE RESPONSE, not against page.url(): the
    // stub can already have left by the time this runs, and resolving the
    // expected URL relative to the current one then compares the destination
    // with itself and finds no redirect at all. (Cost me a round trip.)
    const origin = new URL(resp?.url() ?? urlPath, 'https://hanzo.ai').host
    await page.waitForTimeout(1200)
    const landedOn = new URL(page.url())
    if (landedOn.host !== origin) {
      const resp2 = await page.request.get(page.url()).catch(() => null)
      expect(
        resp2?.status() ?? 0,
        `${urlPath} forwards to ${page.url()}, which does not serve`,
      ).toBeLessThan(400)
      return
    }

    const h1 = page.locator('h1').first()
    await expect(h1, `${urlPath} missing <h1>`).toBeVisible()

    // OSS attribution.
    //
    // When this fails, the page is usually RIGHT and the metadata is wrong. A
    // page cannot honestly show "open source · Apache-2.0 · view on GitHub"
    // for a repo the public cannot open, and `/enso` and `/cloud` are exactly
    // that: products-metadata declares `license: 'Apache-2.0'` and a
    // `github_repo`, while hanzoai/enso and hanzoai/cloud are both PRIVATE.
    // So fix the claim, not the page — publish the repo, or stop asserting a
    // licence for it. Same open question as the 72 private repos the OSS
    // catalog cites.
    const ossAttribution = page.locator('[data-testid="oss-attribution"]')
    const ossPresent =
      (await ossAttribution.count()) > 0 ||
      (await page.locator('text=/Open source/i').first().count()) > 0
    expect(
      ossPresent,
      `${urlPath} shows no OSS attribution. If products-metadata declares a ` +
        `license + github_repo for this slug, one of the two is lying — check ` +
        `whether that repo is actually public before "fixing" the page.`,
    ).toBe(true)

    // Deploy CTA. The href form is deliberately loose: the per-product
    // `/deploy/<slug>` path never resolved (the console has no such route) and
    // now points at the bare `/deploy`, so matching on the prefix keeps this
    // assertion about "there is a way to deploy" rather than about a URL shape
    // that has already changed once.
    const deployTestId = page.locator('[data-testid="deploy-cta"]')
    const deployHref = page.locator(`a[href*="console.hanzo.ai/deploy"]`)
    const deployPresent = (await deployTestId.count()) > 0 || (await deployHref.count()) > 0
    expect(deployPresent, `${urlPath} missing Deploy to Cloud CTA`).toBe(true)

    // Screenshot — full page so the entire hero + footer is captured.
    await page.screenshot({
      path: path.join(SHOT_DIR, `${slug.replace('/', '_')}.png`),
      fullPage: true,
    })
  })
}

test.describe('product page structure', () => {
  for (const slug of PRODUCT_SLUGS) checkPage(slug, `/${slug}`)
  for (const slug of WEB3_SLUGS) checkPage(`blockchain_${slug}`, `/blockchain/${slug}`)
})
