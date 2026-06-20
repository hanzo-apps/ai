// Deterministic internal broken-link audit against the static export in out/.
// Extracts every internal href from all emitted HTML and resolves it to a real
// route file (App Router static export: /a/b -> out/a/b.html or out/a/b/index.html).
// External (http), anchors (#), mailto/tel, and known non-page assets are skipped.
// Exit 0 + "0 broken" gate. Run: node explore-verification/link-audit.mjs
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const OUT = new URL('../out/', import.meta.url).pathname.replace(/\/$/, '')

function walk(dir) {
  const out = []
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) {
      if (e === '_next') continue
      out.push(...walk(p))
    } else if (e.endsWith('.html')) out.push(p)
  }
  return out
}

// Resolve an internal path (e.g. "/blockchain/assets") to an emitted file.
function resolves(path) {
  let p = path.split('#')[0].split('?')[0]
  if (p === '' || p === '/') return existsSync(join(OUT, 'index.html'))
  p = p.replace(/^\//, '').replace(/\/$/, '')
  // direct file, directory index, or static asset that actually exists
  return (
    existsSync(join(OUT, p + '.html')) ||
    existsSync(join(OUT, p, 'index.html')) ||
    existsSync(join(OUT, p))
  )
}

const files = walk(OUT)
const hrefRe = /href="([^"]+)"/g
const broken = new Map() // href -> Set(source files)
let internalCount = 0

for (const f of files) {
  const html = readFileSync(f, 'utf8')
  let m
  while ((m = hrefRe.exec(html))) {
    const href = m[1]
    // skip external / non-navigational
    if (/^(https?:|mailto:|tel:|data:|javascript:)/i.test(href)) continue
    if (href.startsWith('#')) continue
    if (href.startsWith('//')) continue
    // skip pure asset refs Next emits (these are real files under _next or root)
    internalCount++
    if (!resolves(href)) {
      if (!broken.has(href)) broken.set(href, new Set())
      broken.get(href).add(f.replace(OUT + '/', ''))
    }
  }
}

console.log(`Scanned ${files.length} HTML files, ${internalCount} internal href refs.`)
if (broken.size === 0) {
  console.log('0 broken internal links.')
  process.exit(0)
}
console.log(`\n${broken.size} BROKEN internal links:`)
for (const [href, srcs] of [...broken].sort()) {
  const list = [...srcs].slice(0, 3).join(', ')
  console.log(`  ${href}  <- ${list}${srcs.size > 3 ? ` (+${srcs.size - 3} more)` : ''}`)
}
process.exit(1)
