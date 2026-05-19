#!/usr/bin/env node
// Find pages where the ProductFooter import was injected inside a template
// literal or otherwise invalid location, and fix them by:
//   1. Removing all ProductFooter import lines that are NOT at top level.
//   2. Ensuring exactly one ProductFooter import exists at the top, after
//      the last legitimate top-of-file import.

import { readFileSync, writeFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

// Use git grep to find all files containing the import line.
const out = execSync(
  `grep -rln 'import { ProductFooter } from "@/components/products/ProductFooter"' "${ROOT}/app" "${ROOT}/components" 2>/dev/null || true`,
  { encoding: 'utf8' }
)
const files = out.split('\n').filter(Boolean)

let fixed = 0
for (const file of files) {
  let src = readFileSync(file, 'utf8')

  // Identify lines that are inside a template literal. We do a simple pass:
  // count backticks before each `import` occurrence; odd count means inside a
  // template literal.
  const lines = src.split('\n')
  const occurrences = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('import { ProductFooter } from "@/components/products/ProductFooter"')) {
      occurrences.push(i)
    }
  }
  if (occurrences.length === 0) continue

  // Count backticks up to each occurrence's line start, in the joined buffer.
  const lineStarts = []
  let acc = 0
  for (const l of lines) {
    lineStarts.push(acc)
    acc += l.length + 1 // +1 for the \n
  }

  const toRemoveIdx = []
  let validTopIdx = -1
  for (const idx of occurrences) {
    const before = src.slice(0, lineStarts[idx])
    const backticks = (before.match(/`/g) || []).length
    if (backticks % 2 === 1) {
      // Inside a template literal — bogus injection.
      toRemoveIdx.push(idx)
    } else {
      validTopIdx = idx
    }
  }

  if (toRemoveIdx.length === 0) continue

  // Remove the bogus lines (drop the entire line including newline).
  const filtered = lines.filter((_, i) => !toRemoveIdx.includes(i))
  let next = filtered.join('\n')

  // If no valid top import remained, prepend one after the LAST legit top
  // import in the file.
  if (validTopIdx === -1) {
    const lineRe = /^import .+?$/gm
    let last = null
    let m
    while ((m = lineRe.exec(next))) {
      const before = next.slice(0, m.index)
      // Reject matches inside a template literal.
      const ticks = (before.match(/`/g) || []).length
      if (ticks % 2 === 0) last = m
    }
    if (last) {
      next =
        next.slice(0, last.index + last[0].length) +
        '\nimport { ProductFooter } from "@/components/products/ProductFooter"' +
        next.slice(last.index + last[0].length)
    }
  }

  writeFileSync(file, next)
  fixed++
}

console.log(JSON.stringify({ scanned: files.length, fixed }))
