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
// Allowed paths on docs.hanzo.ai, and nothing else:
//   (empty) or /   — the docs marketing home
//   /docs          — the content tree root, and anything under it
//   /reference     — the interactive OpenAPI reference
//   /blog/<slug>   — a docs blog post
//
// Spelled as predicates below rather than as example URLs, because an example
// URL in a comment is itself a docs.hanzo.ai link and this file scans source.

import { test, expect } from '@playwright/test'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SKIP = new Set(['node_modules', '.git', 'out', 'dist', '.turbo', '.claude'])
// Build outputs are not source, and next writes more than one of them: a
// `--distDir` run leaves `.next-c` beside `.next`, which this scan then read as
// if it were source. Stale bundles still carry the bare links this test was
// written to kill, so it went red locally for everyone and stayed red — and a
// test that is always failing is not a gate, it is noise people learn to skip.
const isBuildOutput = (entry: string) => entry.startsWith('.next')
const SOURCE = /\.(tsx?|jsx?|mdx?)$/
const LINK = /https:\/\/docs\.hanzo\.ai([^\s"'`)\]}<>,]*)/g

function sources(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry) || isBuildOutput(entry)) continue
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
  p === '/sitemap.xml' ||
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

// The two tests above check SHAPE, and say so. Shape is not enough: twelve links
// addressed /docs/… correctly and still 404ed, because a product page derived its
// identity from its display name ("Gas Manager" -> manager) and then asserted
// /docs/<that> existed. Worse, four pages whose names end in "API" all derived
// `api`, and /docs/api DOES exist — so they were wrong with a 200, which no
// status-code checker can ever see.
//
// This is the existence gate. It reads docs.hanzo.ai's sitemap (one request,
// ~2.7k paths) rather than probing each link, so it stays cheap as the site
// grows. It needs the network, so it is skipped when the fetch fails rather than
// turning an offline CI run red — a gate that cannot run must not lie either way.
test('every docs_slug names a page that docs.hanzo.ai actually publishes', async () => {
  const { docsUrl, productsMetadata } = await import('../lib/constants/products-metadata')

  let xml: string
  try {
    const res = await fetch('https://docs.hanzo.ai/sitemap.xml')
    if (!res.ok) test.skip(true, `sitemap returned ${res.status}`)
    xml = await res.text()
  } catch {
    test.skip(true, 'docs.hanzo.ai unreachable')
    return
  }

  const published = new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
      m[1].replace(/^https:\/\/docs\.hanzo\.ai/, '').replace(/\/$/, ''),
    ),
  )
  expect(published.size, 'sitemap parsed').toBeGreaterThan(100)

  const missing = Object.keys(productsMetadata)
    .map((slug) => [slug, docsUrl(slug)] as const)
    .filter(([, url]) => url !== null)
    .map(([slug, url]) => [slug, url!.replace('https://docs.hanzo.ai', '')] as const)
    .filter(([, path]) => !published.has(path))
    .map(([slug, path]) => `${slug} -> ${path}`)

  expect(
    missing,
    `these products link to docs pages that do not exist. Either write the page, ` +
      `point docs_slug at one that exists, or set docs_slug: null:\n${missing.join('\n')}`,
  ).toEqual([])
})
