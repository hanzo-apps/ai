// Every docs.hanzo.ai link this site emits must address the docs CONTENT tree.
//
// docs.hanzo.ai serves its MDX under /docs. It once also answered bare product
// paths (docs.hanzo.ai/mcp, /chat, /vector, …) through the vanity aliases in
// the docs repo's `apps/docs/public/_redirects` — a Cloudflare Pages file. The
// site moved to hanzoai/static, which does not read that file, and all 73 of
// those links started 404ing silently: no build breaks, no test fails, the
// anchor just lands on a "not found".
//
// This test is the tripwire. It reads source, not the network, so it runs
// anywhere and costs nothing. It cannot tell you that /docs/foo EXISTS — only
// the docs content tree can — but it does catch the whole class of bug above,
// which is what actually happened.
//
// Allowed shapes:
//   https://docs.hanzo.ai            — the docs marketing home
//   https://docs.hanzo.ai/docs       — the content tree root (and its children)
//   https://docs.hanzo.ai/reference  — the interactive OpenAPI reference
//   https://docs.hanzo.ai/blog/...   — the docs blog

import { test, expect } from '@playwright/test'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SKIP = new Set(['node_modules', '.next', '.git', 'out', 'dist', '.turbo', '.claude'])
const SOURCE = /\.(tsx?|jsx?|mdx?)$/
const LINK = /https:\/\/docs\.hanzo\.ai([^\s"'`)\]}<>,]*)/g

function sources(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) sources(full, out)
    else if (SOURCE.test(entry)) out.push(full)
  }
  return out
}

const ok = (p: string) =>
  p === '' ||
  p === '/' ||
  p === '/reference' ||
  p === '/docs' ||
  p.startsWith('/docs/') ||
  p.startsWith('/blog/')

test('every docs.hanzo.ai link addresses the /docs content tree', () => {
  const bad: string[] = []

  for (const file of sources(ROOT)) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        for (const m of line.matchAll(LINK)) {
          // Template holes (`${target}`) are resolved by the caller; the
          // generator that builds them is asserted separately, below.
          if (m[1].includes('${')) continue
          if (!ok(m[1].split('#')[0].split('?')[0])) {
            bad.push(`${path.relative(ROOT, file)}:${i + 1}  ${m[0]}`)
          }
        }
      })
  }

  expect(bad, `bare docs.hanzo.ai paths 404 in production:\n${bad.join('\n')}`).toEqual([])
})

test('docsUrl() builds a /docs path', async () => {
  const { docsUrl, productsMetadata } = await import('../lib/constants/products-metadata')

  for (const slug of Object.keys(productsMetadata)) {
    const url = docsUrl(slug)
    if (url === null) continue // product has no docs page — link is dropped
    expect(url, `docsUrl('${slug}')`).toMatch(/^https:\/\/docs\.hanzo\.ai\/docs\/.+/)
  }
})
