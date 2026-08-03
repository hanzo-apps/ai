/**
 * Control 3, written into the export.
 *
 * `lib/publish` says which routes a crawler may fetch and must not index; this
 * puts the tag that says so into every page it names, and into no other. It
 * runs as the second half of `pnpm build` — the export is not finished until
 * the pages that must not be indexed say so.
 *
 * Loud, never partial: it counts what it stamped against what the policy asked
 * for and exits non-zero on any disagreement. A control that quietly covers
 * nineteen of twenty pages is worse than no control, because the twentieth is
 * indexed and the build is green.
 *
 * It also refuses to run over a page that already carries a robots tag. That is
 * the second spelling appearing, and two sources for one control is how the
 * first one drifted.
 */
// It imports the TypeScript source directly, which Node strips types from on
// its own from 22.18. That is the floor `.nvmrc` and `engines` both name, and
// it is the same floor wrangler already forced on the deploy. The alternative
// was a second copy of the list in JavaScript, which is the thing this file
// exists to prevent.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { EMPTY, NOINDEX, UNAPPROVED, policy } from '../lib/publish.ts'
import { shipped } from '../lib/routes.ts'

const OUT = join(import.meta.dirname, '..', 'out')
// At the END of the head, not the start: the character encoding declaration is
// supposed to be the first thing in there, and a tag inserted ahead of it pushes
// `<meta charSet>` down for no reason. Anywhere in the head is equally read.
const HEAD = '</head>'
const EXISTING = /<meta[^>]+name=["']robots["']/i

const pages = shipped(OUT)
if (pages.length === 0) {
  throw new Error(`no export at ${OUT}: \`next build\` writes it, and this is the rest of that build`)
}

// A route named by a list and absent from the export is a typo, and the tag it
// asked for lands on nothing. Silence there is the whole failure mode, so it is
// the first thing checked.
const withheld = new Set(pages.filter(({ route }) => policy(route) === 'noindex').map(({ route }) => route))
const absent = [...UNAPPROVED, ...EMPTY].filter((route) => !withheld.has(route))
if (absent.length > 0) {
  throw new Error(`withheld from indexing but not in the export: ${absent.join(', ')}`)
}

for (const { route, file } of pages) {
  if (!withheld.has(route)) continue
  const html = readFileSync(file, 'utf8')
  if (EXISTING.test(html)) {
    throw new Error(`${route} already declares a robots tag: lib/publish is the one place that decides this`)
  }
  if (!html.includes(HEAD)) throw new Error(`${route} has no <head> to carry the tag`)
  writeFileSync(file, html.replace(HEAD, NOINDEX + HEAD))
}
console.log(`noindex: ${withheld.size} of ${pages.length} exported pages withheld from indexing`)
