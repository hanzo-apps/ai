#!/usr/bin/env node
// Inject ProductFooter into client.tsx files for dispatcher pages that
// the main injector skipped because page.tsx returns <FooClient />.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

// (slug, displayName)
const TARGETS = [
  ['commerce', 'Commerce'],
  ['captable', 'Captable'],
  ['dataroom', 'Dataroom'],
  ['sign',     'Sign'],
]

for (const [slug, name] of TARGETS) {
  const file = path.join(ROOT, 'app/(marketing)', slug, `${slug}-client.tsx`)
  if (!existsSync(file)) {
    console.error(`MISSING: ${file}`)
    continue
  }
  let src = readFileSync(file, 'utf8')
  if (src.includes('@/components/products/ProductFooter')) {
    console.log(`already-injected: ${slug}`)
    continue
  }
  // Add import after last import statement.
  const importRe = /^import .+? from .+?;?\s*$/gm
  let last = null
  let m
  while ((m = importRe.exec(src))) last = m
  const importStmt = `\nimport { ProductFooter } from "@/components/products/ProductFooter"`
  if (last) {
    src = src.slice(0, last.index + last[0].length) + importStmt + src.slice(last.index + last[0].length)
  } else {
    src = importStmt + '\n' + src
  }
  // Inject before closing </>
  const closeFrag = src.lastIndexOf('</>')
  if (closeFrag === -1) {
    console.error(`no fragment close: ${slug}`)
    continue
  }
  const tag = `      <ProductFooter slug="${slug}" name="${name}" />\n    `
  src = src.slice(0, closeFrag) + tag + src.slice(closeFrag)
  writeFileSync(file, src)
  console.log(`injected: ${slug}`)
}
