#!/usr/bin/env node
// Catalog audit for hanzo.ai product nav.
//
// 1. Loads productsNav from lib/constants/navigation-data.ts (via tsx).
// 2. Verifies every href resolves to a real app/(marketing)/<slug>/page.tsx.
// 3. Detects cross-category duplicates (same title/href in two categories).
// 4. Detects pages that lack OssAttribution + DeployBlock structural blocks.
//
// Output: a markdown table to stdout; also writes tests/products-audit.md.

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

// Import the data — Node 22+ supports TS via --experimental-strip-types, but for
// safety we parse navigation-data.ts directly using a slim regex extractor since
// the data shape is rigid.
const navSrc = readFileSync(path.join(ROOT, 'lib/constants/navigation-data.ts'), 'utf8')

// Extract just the productsNav array literal.
const startIdx = navSrc.indexOf('export const productsNav')
const endIdx = navSrc.indexOf('export const featuredProducts', startIdx)
const block = navSrc.slice(startIdx, endIdx)

// Parse: each `title: "Foo"` followed by an `items:` array on a category;
// each item is `{ title: "X", href: "Y", ... }`. Use a small state machine.
const categories = []
let m
const catRe = /title:\s*"([A-Z][^"]+)",\s*\n\s*items:\s*\[/g
while ((m = catRe.exec(block))) {
  const name = m[1]
  // Find the matching ] for this items array
  let depth = 1
  let i = m.index + m[0].length
  while (i < block.length && depth > 0) {
    const c = block[i]
    if (c === '[') depth++
    else if (c === ']') depth--
    i++
  }
  const arrSrc = block.slice(m.index + m[0].length, i - 1)
  const items = []
  const itemRe = /\{\s*title:\s*"([^"]+)",\s*href:\s*"([^"]+)"/g
  let im
  while ((im = itemRe.exec(arrSrc))) {
    items.push({ title: im[1], href: im[2] })
  }
  categories.push({ name, items })
}

// Cross-category uniqueness
const seenTitles = new Map()
const seenHrefs = new Map()
const dupTitles = []
const dupHrefs = []
for (const cat of categories) {
  for (const it of cat.items) {
    if (seenTitles.has(it.title)) {
      const prev = seenTitles.get(it.title)
      if (prev !== cat.name) dupTitles.push({ title: it.title, in: [prev, cat.name] })
    } else seenTitles.set(it.title, cat.name)

    if (seenHrefs.has(it.href)) {
      const prev = seenHrefs.get(it.href)
      if (prev !== cat.name) dupHrefs.push({ href: it.href, in: [prev, cat.name] })
    } else seenHrefs.set(it.href, cat.name)
  }
}

// Returns true if a sibling <slug>-client.tsx imports ProductFooter.
function hasInjectedInClient(pagePath) {
  const dir = path.dirname(pagePath)
  const slug = path.basename(dir)
  const clientFile = path.join(dir, `${slug}-client.tsx`)
  if (!existsSync(clientFile)) return false
  const src = readFileSync(clientFile, 'utf8')
  return src.includes('@/components/products/ProductFooter') || src.includes('<ProductFooter')
}

// Page existence + structural-block detection.
const rows = []
let deadLinks = 0
let missingOss = 0
let missingDeploy = 0
for (const cat of categories) {
  for (const it of cat.items) {
    const slug = it.href.startsWith('/') ? it.href.slice(1) : it.href
    const pagePath = path.join(ROOT, 'app/(marketing)', slug, 'page.tsx')
    const exists = existsSync(pagePath)
    let hasOss = false
    let hasDeploy = false
    if (exists) {
      const pageSrc = readFileSync(pagePath, 'utf8')
      // ProductFooter contributes both blocks; treat as a single canonical answer.
      const hasFooter =
        pageSrc.includes('<ProductFooter') ||
        pageSrc.includes('ProductStub') ||
        pageSrc.includes('@/components/products/ProductFooter') ||
        // Dispatcher pages render <FooClient /> whose client file we patch separately.
        /from\s+["'].\/[\w-]+-client/.test(pageSrc) && hasInjectedInClient(pagePath) ||
        // Web3 pages render via BlockchainProductLayout which embeds ProductFooter.
        pageSrc.includes('BlockchainProductLayout')
      hasOss =
        hasFooter ||
        pageSrc.includes('OssAttribution') ||
        pageSrc.includes("data-testid=\"oss-attribution\"") ||
        /UpstreamAttribution/.test(pageSrc)
      hasDeploy =
        hasFooter ||
        pageSrc.includes('DeployBlock') ||
        pageSrc.includes("data-testid=\"deploy-cta\"") ||
        /console\.hanzo\.ai\/deploy/.test(pageSrc)
    }
    if (!exists) deadLinks++
    if (exists && !hasOss) missingOss++
    if (exists && !hasDeploy) missingDeploy++
    rows.push({
      category: cat.name,
      product: it.title,
      slug,
      page_exists: exists,
      has_oss_block: hasOss,
      has_deploy_cta: hasDeploy,
    })
  }
}

// Render
const totals = {
  categories: categories.length,
  products: rows.length,
  dead_links: deadLinks,
  missing_oss: missingOss,
  missing_deploy: missingDeploy,
  dup_titles: dupTitles.length,
  dup_hrefs: dupHrefs.length,
}

let md = '# Products audit\n\n'
md += `Source: \`lib/constants/navigation-data.ts\` → \`productsNav\`.\n\n`
md += '## Totals\n\n'
for (const [k, v] of Object.entries(totals)) md += `- **${k}**: ${v}\n`
md += '\n'

md += '## Cross-category duplicates\n\n'
if (dupTitles.length === 0 && dupHrefs.length === 0) {
  md += '_None._\n\n'
} else {
  md += '| Item | Categories |\n|------|------------|\n'
  for (const d of dupTitles) md += `| title: \`${d.title}\` | ${d.in.join(' + ')} |\n`
  for (const d of dupHrefs) md += `| href: \`${d.href}\` | ${d.in.join(' + ')} |\n`
  md += '\n'
}

md += '## Per-product status\n\n'
md += '| Category | Product | Slug | page_exists | has_oss_block | has_deploy_cta |\n'
md += '|----------|---------|------|-------------|---------------|----------------|\n'
for (const r of rows) {
  md += `| ${r.category} | ${r.product} | \`${r.slug}\` | ${r.page_exists ? 'YES' : 'NO'} | ${r.has_oss_block ? 'YES' : 'NO'} | ${r.has_deploy_cta ? 'YES' : 'NO'} |\n`
}
md += '\n'

mkdirSync(path.join(ROOT, 'tests'), { recursive: true })
writeFileSync(path.join(ROOT, 'tests/products-audit.md'), md)

console.log(md)
console.log(JSON.stringify(totals))
