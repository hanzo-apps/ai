#!/usr/bin/env node
// Inject <ProductFooter slug=".." name=".." /> into every product page that
// lacks the OSS attribution block or Deploy CTA.
//
// Idempotent — re-running on a file that already has the import + component
// is a no-op.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const navSrc = readFileSync(path.join(ROOT, 'lib/constants/navigation-data.ts'), 'utf8')
const startIdx = navSrc.indexOf('export const productsNav')
const endIdx = navSrc.indexOf('export const featuredProducts', startIdx)
const block = navSrc.slice(startIdx, endIdx)

const all = []
const catRe = /title:\s*"([A-Z][^"]+)",\s*\n\s*items:\s*\[/g
let m
while ((m = catRe.exec(block))) {
  const name = m[1]
  let depth = 1
  let i = m.index + m[0].length
  while (i < block.length && depth > 0) {
    const c = block[i]
    if (c === '[') depth++
    else if (c === ']') depth--
    i++
  }
  const arrSrc = block.slice(m.index + m[0].length, i - 1)
  const itemRe = /\{\s*title:\s*"([^"]+)",\s*href:\s*"([^"]+)"/g
  let im
  while ((im = itemRe.exec(arrSrc))) {
    all.push({ category: name, title: im[1], href: im[2] })
  }
}

let touched = 0
let skippedAlready = 0
let skippedComplex = 0
for (const it of all) {
  const slug = it.href.startsWith('/') ? it.href.slice(1) : it.href
  const pagePath = path.join(ROOT, 'app/(marketing)', slug, 'page.tsx')
  if (!existsSync(pagePath)) continue
  let src = readFileSync(pagePath, 'utf8')

  // Already injected?
  if (src.includes('<ProductFooter') || src.includes('@/components/products/ProductFooter')) {
    skippedAlready++
    continue
  }

  // Already structurally complete? (has both OSS block and deploy console link)
  const hasOss =
    src.includes('OssAttribution') ||
    src.includes("data-testid=\"oss-attribution\"") ||
    src.includes('UpstreamAttribution')
  const hasDeploy =
    src.includes('DeployBlock') ||
    src.includes("data-testid=\"deploy-cta\"") ||
    src.includes('console.hanzo.ai/deploy')
  if (hasOss && hasDeploy) {
    skippedAlready++
    continue
  }

  // Find import position. Insert after the last top-of-file `import` statement.
  const importRe = /^import .+? from .+?;?\s*$/gm
  let lastImport = null
  let im
  while ((im = importRe.exec(src))) lastImport = im
  if (!lastImport) {
    // No imports — uncommon. Insert after `'use client'` or at the very top.
    const useClient = /^\s*'use client'\s*$/m.exec(src)
    const insertAt = useClient ? useClient.index + useClient[0].length : 0
    src =
      src.slice(0, insertAt) +
      `\nimport { ProductFooter } from "@/components/products/ProductFooter"\n` +
      src.slice(insertAt)
  } else {
    const insertAt = lastImport.index + lastImport[0].length
    src =
      src.slice(0, insertAt) +
      `\nimport { ProductFooter } from "@/components/products/ProductFooter"` +
      src.slice(insertAt)
  }

  // Find the right injection point. Priority:
  //   1. before </main>
  //   2. before the closing </> of a fragment return
  //   3. before the final </div> in the JSX return body
  // Dispatcher pages (return <FooClient />) have no JSX tree here — skip.
  const closeMain = src.lastIndexOf('</main>')
  const closeFragment = src.lastIndexOf('</>')
  const closeDiv = src.lastIndexOf('</div>')
  let injectAt = -1
  let injectTag = `        <ProductFooter slug="${slug}" name="${it.title}" />\n`
  if (closeMain !== -1) {
    injectAt = closeMain
  } else if (closeFragment !== -1) {
    injectAt = closeFragment
    injectTag = `      <ProductFooter slug="${slug}" name="${it.title}" />\n    `
  } else if (closeDiv !== -1) {
    injectAt = closeDiv
  }
  if (injectAt === -1) {
    skippedComplex++
    continue
  }

  src = src.slice(0, injectAt) + injectTag + src.slice(injectAt)
  writeFileSync(pagePath, src)
  touched++
}

console.log(JSON.stringify({ touched, skippedAlready, skippedComplex }))
