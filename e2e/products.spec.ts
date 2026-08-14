// Product-page integrity tests for the cloud taxonomy.
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
// The paths are READ from the taxonomy, not mirrored beside it. They used to be
// a hand-kept copy told to stay "in lockstep", and it had drifted to four pages
// that no longer exist (/cloud/rerank, /cloud/jobs, /cloud/cost, /engine) and a
// /blockchain section the taxonomy dropped — so the suite was testing a site
// nobody was shipping while the real leaves went unchecked. A list that has to
// be kept in lockstep by hand is a list that will not be.

import { test, expect } from '@playwright/test'
import { cloudCategories } from '../lib/data/cloud-primitives'

// Off-property leaves are another host's to keep alive, and probing them here
// would make this suite red on somebody else's outage.
const LEAF_PATHS = [
  ...new Set(
    cloudCategories
      .flatMap((c) => c.items)
      .map((i) => i.href)
      .filter((h) => h.startsWith('/')),
  ),
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
    test.setTimeout(LEAF_PATHS.length * 3000) // ~1.5s a page, doubled for a cold cache
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
