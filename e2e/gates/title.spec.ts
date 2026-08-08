import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { policy } from '../../lib/publish'
import { pages } from './export'

/**
 * Every page a crawler may index says what it is.
 *
 * Measured on production 2026-08-08: **33 of the 53 URLs in sitemap.xml** served
 * one string — "Hanzo — the AI cloud for agents and apps", the root layout's
 * default, inherited. Nearly two thirds of the indexed brand site was
 * indistinguishable in a search result, in a browser tab and in a shared link.
 *
 * The cause is structural and silent, which is why it takes a gate rather than
 * care. Those pages are `'use client'`, and a client component CANNOT
 * `export const metadata` — it is a server-only export, so writing one is not an
 * error, it is IGNORED. Nothing throws, nothing warns, the build is green, and
 * the page quietly serves its parent's title. The next client page added here
 * will do it again by default.
 *
 * Read from `out/` and not from the source, for the reason the rest of this
 * suite is: `metadata` in a client file LOOKS right in the source and is absent
 * from the bytes. A gate that grepped for `pageMeta(` would have passed on all
 * thirty-three.
 */

/**
 * The subject is `policy(route) === 'public'`, not "every page in the export".
 *
 * 771 pages ship and 578 are public. The rest are `private` (the auth surfaces,
 * `Disallow`ed in robots.txt) or `noindex` (copy no owner has approved), and
 * 136 of them share the default title — the signed-in app shell, where a
 * per-route title is a feature to build and not a metadata line to write. A
 * gate that swept all 771 would be red on work nobody has scheduled, and a red
 * gate teaches people to skip it. `lib/publish` already answers "may a crawler
 * index this", so this asks IT rather than sniffing for a `noindex` tag —
 * `private` routes carry no tag by design (a `Disallow` is what stops the tag
 * ever being read), so a sniff would have called all eleven of them indexable.
 */
function published(): { route: string; title: string; description: string }[] {
  return pages()
    .filter(({ route }) => policy(route) === 'public')
    .map(({ route, file }) => {
      const html = readFileSync(file, 'utf8')
      return { route, title: text(html, TITLE), description: text(html, DESCRIPTION) }
    })
}

const TITLE = /<title[^>]*>([\s\S]*?)<\/title>/i
const DESCRIPTION = /<meta name="description" content="([^"]*)"/i

function text(html: string, pattern: RegExp): string {
  return (html.match(pattern)?.[1] ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

/** The root layout's default — the string every untitled page inherits. */
const INHERITED = 'Hanzo — the AI cloud for agents and apps'

test('the published subject is the whole public site', () => {
  // The floor. Every assertion below is of the form "no published page does X",
  // and each is trivially true of an empty list — a derivation that silently
  // finds nothing does not fail a gate, it switches the file off and reports
  // green. 578 of 771 at the time of writing; the floor is deliberately well
  // under that so approving a shelf does not fail an unrelated gate.
  expect(published().length).toBeGreaterThan(400)
  expect(published().some((p) => p.route === '/')).toBe(true)
})

test('no published page inherits the default title', () => {
  const inherited = published()
    .filter((p) => p.route !== '/' && p.title === INHERITED)
    .map((p) => p.route)
  expect(
    inherited,
    `${inherited.length} published page(s) serve the root layout's title verbatim, ` +
      `so they are indistinguishable in a tab and in a search result. A ` +
      `'use client' page cannot export metadata — give each a co-located ` +
      `layout.tsx calling pageMeta() with the page's OWN <h1> and lede.`,
  ).toEqual([])
})

test('no two published pages claim the same title', () => {
  // Not covered by the rule above: two client pages under one TITLED parent
  // inherit from that parent rather than from the root, so they agree with each
  // other and disagree with nothing. `/zen/models` and `/open-source/dividends`
  // were both that — each wearing its parent's name, and in `/zen`'s case the
  // parent wore the CHILD's ("Zen Models"), so the pair read as one page twice.
  const seen = new Map<string, string[]>()
  for (const { route, title } of published()) {
    seen.set(title, [...(seen.get(title) ?? []), route])
  }
  const shared = [...seen.entries()]
    .filter(([, routes]) => routes.length > 1)
    .map(([title, routes]) => `${routes.join(' + ')} → ${title}`)
  expect(shared).toEqual([])
})

test('every published title names the brand', () => {
  // A tab shows ~20 characters and a search result shows one line. "Gallery"
  // alone names nobody, and a bookmark made from it is unfindable a month
  // later. pageMeta() appends the suffix so no call site has to remember.
  const anonymous = published()
    .filter((p) => !p.title.includes('Hanzo'))
    .map((p) => `${p.route} → ${p.title}`)
  expect(anonymous).toEqual([])
})

test('no published page inherits the default description', () => {
  // A page with its own title and the root's description is half-fixed: the
  // title is the tab, the description is the sentence underneath it in the
  // result — which is the part that decides the click.
  const root = published().find((p) => p.route === '/')!.description
  expect(root.length).toBeGreaterThan(20)
  const inherited = published()
    .filter((p) => p.route !== '/' && p.description === root)
    .map((p) => p.route)
  expect(inherited).toEqual([])
})
