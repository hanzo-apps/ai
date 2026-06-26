// Product-page integrity tests for the 10-category cloud taxonomy.
//
//   - Every leaf in the products mega-menu must serve a real page
//     (200 + non-empty body) — bespoke product pages AND generated
//     cloud-primitive overviews. No dead links, no empty stubs.
//   - Every leaf page's hero (h1) + body signature must be UNIQUE across the
//     whole taxonomy — no two leaves share content.
//   - Every github.com/hanzoai/<repo> link rendered on a leaf page resolves.
//
// Run:
//   1. serve the static build (or `pnpm dev`) on :8084
//   2. pnpm exec playwright test e2e/products.spec.ts
//
// CI / live smoke: BASE_URL=https://hanzo.ai pnpm exec playwright test
//
// LEAF_PATHS mirrors lib/data/cloud-primitives.ts (the single source of truth).
// Keep them in lockstep.

import { test, expect } from '@playwright/test'

const LEAF_PATHS = [
  // AI
  '/models', '/agents', '/engine', '/cloud/fine-tuning', '/cloud/embeddings', '/cloud/evals',
  // Compute
  '/cloud/gpus', '/machines', '/cloud/containers', '/functions', '/edge', '/cloud/jobs',
  // Data
  '/vector', '/sql', '/kv', '/storage', '/datastore', '/docdb',
  // Network
  '/gateway', '/network', '/dns', '/cloud/cdn', '/ingress', '/cloud/service-mesh',
  // Security
  '/iam', '/authz', '/kms', '/hsm', '/cloud/secrets', '/cloud/audit',
  // Dev
  '/cli', '/cloud/sdks', '/cloud/api', '/playground', '/code', '/desktop',
  // Deploy
  '/platform', '/cloud/environments', '/cloud/builds', '/registry', '/cloud/releases', '/cloud/pipelines',
  // Observe
  '/cloud/logs', '/metrics', '/telemetry', '/dashboards', '/sentry', '/cloud/cost',
  // Chain
  '/blockchain/settlement', '/blockchain/wallets', '/blockchain/tokens', '/blockchain/indexer',
  '/blockchain/oracle', '/blockchain/attestations',
  // Apps
  '/chat', '/bot', '/search', '/crawl', '/studio', '/console',
]

test.describe('every mega-menu leaf serves a real page', () => {
  for (const path of LEAF_PATHS) {
    test(`${path} returns 200 with non-empty body`, async ({ page }) => {
      const resp = await page.goto(path)
      expect(resp?.status(), `${path} returned ${resp?.status()}`).toBe(200)
      const body = await page.locator('body').innerText()
      expect(body.length, `${path} body too short`).toBeGreaterThan(200)
    })
  }
})

test.describe('leaf pages have unique hero content', () => {
  test('every leaf page has a unique h1 + body signature', async ({ page }) => {
    test.setTimeout(180000) // 60 pages × ~1.5s
    const seenH1 = new Map<string, string>()
    const seenSig = new Map<string, string>()
    const conflicts: string[] = []

    for (const path of LEAF_PATHS) {
      await page.goto(path)
      const h1 = (await page.locator('h1').first().innerText().catch(() => '')).trim()
      const body = (await page.locator('main, body').first().innerText().catch(() => '')).trim()
      const sig = body.replace(/\s+/g, ' ').slice(0, 600)

      if (h1) {
        const prev = seenH1.get(h1)
        if (prev && prev !== path) conflicts.push(`H1 "${h1}" shared by ${prev} and ${path}`)
        else seenH1.set(h1, path)
      }
      if (sig) {
        const prev = seenSig.get(sig)
        if (prev && prev !== path) conflicts.push(`Body signature shared by ${prev} and ${path}`)
        else seenSig.set(sig, path)
      }
    }

    if (conflicts.length) console.log('\nUNIQUENESS CONFLICTS:\n' + conflicts.join('\n'))
    expect(conflicts, conflicts.join('\n')).toEqual([])
  })
})

test.describe('leaf pages link to real GitHub URLs', () => {
  for (const path of LEAF_PATHS) {
    test(`${path}: github.com/hanzoai/<repo> links resolve`, async ({ page, request }) => {
      test.setTimeout(60000)
      await page.goto(path)
      const hrefs = await page.locator('a[href^="https://github.com/hanzoai/"]').evaluateAll(
        (els) => Array.from(new Set(els.map((el) => (el as HTMLAnchorElement).href)))
      )
      for (const href of hrefs) {
        const r = await request.head(href, { maxRedirects: 5, timeout: 15000 })
        expect(r.status(), `${href} returned ${r.status()}`).not.toBe(404)
      }
    })
  }
})
