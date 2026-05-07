// Product-page integrity tests.
//
//   - Every product slug listed in productsNav must serve a page (200 + non-empty body)
//   - Every product page's primary content (hero h1 + body text) must be UNIQUE
//     across the entire product catalog — no two products share the same hero
//   - Every external GitHub and docs link rendered on a product page must
//     resolve to a real URL (not 404)
//
// Run:
//   1. pnpm dev    (in another terminal — runs on :8084)
//   2. pnpm test products.spec.ts
//
// CI uses BASE_URL=https://hanzo.ai for the deployed-site smoke test.

import { test, expect } from '@playwright/test'

// Mirror productsNav from lib/constants/navigation-data.ts.
// Web3 lives under /blockchain/<slug> — separate sub-section.
const PRODUCT_SLUGS = [
  // AI & Agents
  'zen', 'agents', 'ai-studio', 'mcp', 'zap', 'llm', 'engine', 'jin', 'guard', 'skills',
  // Developer
  'dev', 'code', 'cli', 'desktop', 'gui', 'ui', 'extension', 'operative',
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

test.describe('product pages serve a real page', () => {
  for (const slug of PRODUCT_SLUGS) {
    test(`/${slug} returns 200 with non-empty body`, async ({ page }) => {
      const resp = await page.goto(`/${slug}`)
      expect(resp?.status()).toBe(200)
      const body = await page.locator('body').innerText()
      expect(body.length).toBeGreaterThan(200) // not a stub
    })
  }
  for (const slug of WEB3_SLUGS) {
    test(`/blockchain/${slug} returns 200 with non-empty body`, async ({ page }) => {
      const resp = await page.goto(`/blockchain/${slug}`)
      expect(resp?.status()).toBe(200)
      const body = await page.locator('body').innerText()
      expect(body.length).toBeGreaterThan(200)
    })
  }
})

test.describe('product pages have unique hero content', () => {
  test('every product page has a unique h1 + tagline', async ({ page }) => {
    test.setTimeout(180000) // 80+ pages × ~1.5s each
    const seenH1: Map<string, string> = new Map()
    const seenSig: Map<string, string> = new Map()
    const conflicts: string[] = []

    for (const slug of PRODUCT_SLUGS) {
      await page.goto(`/${slug}`)
      const h1 = (await page.locator('h1').first().innerText().catch(() => '')).trim()
      // Use first ~600 chars of normalized body content as a uniqueness signature
      const body = (await page.locator('main, body').first().innerText().catch(() => '')).trim()
      const sig = body.replace(/\s+/g, ' ').slice(0, 600)

      if (h1) {
        const prev = seenH1.get(h1)
        if (prev && prev !== slug) {
          conflicts.push(`H1 "${h1}" shared by /${prev} and /${slug}`)
        } else {
          seenH1.set(h1, slug)
        }
      }
      if (sig) {
        const prev = seenSig.get(sig)
        if (prev && prev !== slug) {
          conflicts.push(`Body signature shared by /${prev} and /${slug}`)
        } else {
          seenSig.set(sig, slug)
        }
      }
    }

    if (conflicts.length) {
      console.log('\nUNIQUENESS CONFLICTS:\n' + conflicts.join('\n'))
    }
    expect(conflicts, conflicts.join('\n')).toEqual([])
  })
})

test.describe('product pages link to real GitHub URLs', () => {
  // Per-product link probe with HEAD requests (cheaper, less rate-limited than GET).
  // Skips docs.hanzo.ai (separate site, its own e2e suite). Only github.com/hanzoai.
  for (const slug of PRODUCT_SLUGS) {
    test(`/${slug}: github.com/hanzoai/<repo> links resolve`, async ({ page, request }) => {
      test.setTimeout(60000)
      await page.goto(`/${slug}`)
      const hrefs = await page.locator('a[href^="https://github.com/hanzoai/"]').evaluateAll(
        (els) => Array.from(new Set(els.map((el) => (el as HTMLAnchorElement).href)))
      )
      for (const href of hrefs) {
        // Use HEAD — much faster + less likely to be rate-limited than GET.
        const r = await request.head(href, { maxRedirects: 5, timeout: 15000 })
        expect(r.status(), `${href} returned ${r.status()}`).not.toBe(404)
      }
    })
  }
})
