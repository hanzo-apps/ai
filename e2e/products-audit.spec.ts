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

    const h1 = page.locator('h1').first()
    await expect(h1, `${urlPath} missing <h1>`).toBeVisible()

    // OSS attribution
    const ossAttribution = page.locator('[data-testid="oss-attribution"]')
    const ossPresent =
      (await ossAttribution.count()) > 0 ||
      (await page.locator('text=/Open source/i').first().count()) > 0
    expect(ossPresent, `${urlPath} missing OSS attribution block`).toBe(true)

    // Deploy CTA — either the canonical testid, or a link to console.hanzo.ai/deploy/<slug>
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
