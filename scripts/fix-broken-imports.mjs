#!/usr/bin/env node
// Repair files where the ProductFooter import got injected in the middle of
// a multi-line `import { ... } from "..."` block.
//
// Pattern to detect: line matches `^import \{\s*$` followed by ProductFooter
// import line. Fix: remove the misplaced ProductFooter import line from that
// location, then re-insert it after the closing `} from "lucide-react"` (or
// equivalent) of the broken multi-line import.

import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const out = execSync(
  `grep -rln 'import { ProductFooter } from "@/components/products/ProductFooter"' "${ROOT}/app" "${ROOT}/components" 2>/dev/null || true`,
  { encoding: 'utf8' }
)
const files = out.split('\n').filter(Boolean)

let fixed = 0
for (const file of files) {
  let src = readFileSync(file, 'utf8')
  // Find broken pattern: `import {\n<spaces>import { ProductFooter } ...`
  const broken = /(^import\s*\{\s*)\n(import\s*\{\s*ProductFooter\s*\}\s*from\s*"@\/components\/products\/ProductFooter"\s*)/m
  if (!broken.test(src)) continue

  // Remove the misplaced import line.
  let next = src.replace(broken, '$1')

  // Now find the closing `} from "..."` of the multi-line import that we
  // restored, and insert the ProductFooter import after it.
  const closeRe = /^import\s*\{[\s\S]*?\}\s*from\s*"[^"]+"\s*;?\s*$/m
  const m = closeRe.exec(next)
  if (!m) {
    // Shouldn't happen, but bail safely.
    writeFileSync(file, next)
    continue
  }
  const end = m.index + m[0].length
  next = next.slice(0, end) + '\nimport { ProductFooter } from "@/components/products/ProductFooter"' + next.slice(end)

  writeFileSync(file, next)
  fixed++
}

console.log(JSON.stringify({ scanned: files.length, fixed }))
