/**
 * One owner per page, written into the export.
 *
 * This one build is served on TWO hosts — hanzo.ai and cloud.hanzo.ai — so
 * every route it ships answers at both, byte for byte. Measured live:
 * `hanzo.ai/vector` and `cloud.hanzo.ai/vector` are the same document, and so
 * are ~60 more. Without a canonical those are two pages competing to rank for
 * one thing, and a crawler picks the winner for us.
 *
 * hanzo.ai owns them. That is the same decision the chrome now makes — the
 * public menu opens hanzo.ai/chat rather than hanzo.chat, because the page that
 * can explain a product is the one worth landing on — and search should agree
 * with the navigation rather than disagree quietly.
 *
 * It runs beside `noindex.mjs`, over the same `shipped()` listing, and follows
 * the same three rules that file states: derive the answer rather than list it,
 * refuse to write a second spelling over a page that already carries one, and
 * count what was stamped so a partial pass cannot pass quietly.
 *
 * Next.js emits a canonical only where a route sets `alternates.canonical`, and
 * four of 218 pages do. Retrofitting the other 214 by hand would put the rule
 * in 214 places; the export is the one place it is true of everything.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { shipped } from '../lib/routes.ts'

const OUT = join(import.meta.dirname, '..', 'out')
const SITE = 'https://hanzo.ai'
const HEAD = '</head>'
const EXISTING = /<link[^>]+rel=["']canonical["']/i

/**
 * cloud.hanzo.ai's ROOT is this file, copied over index.html at image build
 * (see the Dockerfile's SURFACE). As a route it is `/cloud`, and that is what
 * it must claim: the two are the same page — identical h1, within 80 characters
 * of each other — so the host's front door points at the page hanzo.ai
 * publishes rather than competing with it.
 */
const OWNER = new Map([['/cloud', `${SITE}/cloud`]])

const pages = shipped(OUT)
if (pages.length === 0) {
  throw new Error(`no export at ${OUT}: \`next build\` writes it, and this is the rest of that build`)
}

let stamped = 0
let already = 0
for (const { route, file } of pages) {
  const html = readFileSync(file, 'utf8')
  // A page that already declares one keeps it. Those four routes set it in
  // their own metadata, and a second tag in the same head is the ambiguity this
  // exists to remove.
  if (EXISTING.test(html)) {
    already++
    continue
  }
  if (!html.includes(HEAD)) throw new Error(`${route} has no <head> to carry a canonical`)
  const href = OWNER.get(route) ?? `${SITE}${route === '/' ? '' : route}`
  writeFileSync(file, html.replace(HEAD, `<link rel="canonical" href="${href}"/>${HEAD}`))
  stamped++
}

// Every page ends up with exactly one, or this did not do its job.
const missing = pages.filter(({ file }) => !EXISTING.test(readFileSync(file, 'utf8')))
if (missing.length > 0) {
  throw new Error(`no canonical on ${missing.length} page(s): ${missing.slice(0, 5).map((p) => p.route).join(', ')}`)
}
console.log(`canonical: ${stamped} stamped, ${already} already declared — ${pages.length} pages, one owner each`)
