import { test, expect } from '@playwright/test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { DISALLOW, EMPTY, NOINDEX, PRIVATE, UNAPPROVED, indexable, matches, policy } from '../../lib/publish'
import { copy } from '../../lib/routes'
import { OUT, ROOT, pages, read } from './export'

/**
 * The publication gate, asserted on the bytes that ship.
 *
 * "It is not linked from the nav" was never a gate: `app/sitemap.ts` walks the
 * App Router tree and offers a crawler every page it finds. But nor is one
 * list read by three controls — a `Disallow` and a `noindex` over the same
 * route cancel each other, and a path segment written as a robots.txt string
 * prefix takes the next route that starts with the same letters. Both of those
 * shipped. So these gates check the policies AGAINST EACH OTHER over the whole
 * export, rather than checking each control against the list it came from.
 *
 * And against the CONTENT of the export, not only its shape: a route offered
 * for indexing that has nothing to index is a soft 404 the site advertises,
 * and twenty of them shipped under a floor that counted routes.
 */

/**
 * Every route whose shipped page carries a noindex, read from the export.
 *
 * Matched against `lib/publish`'s own spelling rather than a pattern written
 * here: the gate that says the tag has one spelling would be worth nothing if
 * the gate itself held a second one.
 */
function noindexed(): string[] {
  return pages()
    .filter(({ file }) => readFileSync(file, 'utf8').includes(NOINDEX))
    .map(({ route }) => route)
    .sort()
}

/** Every route offered to a crawler, read from the shipped sitemap. */
function offered(): string[] {
  const xml = read('sitemap.xml')
  return [...xml.matchAll(/<loc>https:\/\/hanzo\.ai([^<]*)<\/loc>/g)].map((m) => m[1] || '/')
}

/** Every Disallow line in the shipped robots.txt. */
function disallowed(): string[] {
  return [...read('robots.txt').matchAll(/^Disallow:\s*(\S+)\s*$/gm)].map((m) => m[1])
}

/** The rendered words of every shipped page, in one walk of the export. */
function said(): Map<string, string> {
  return new Map(pages().map(({ route, file }) => [route, copy(readFileSync(file, 'utf8'))]))
}

test('a route has exactly one policy, and a surface is a path segment', () => {
  for (const surface of PRIVATE) {
    expect(policy(surface), `${surface} is private`).toBe('private')
    expect(policy(surface + '/sub'), `${surface}/sub is private`).toBe('private')
  }
  for (const surface of UNAPPROVED) {
    expect(policy(surface), `${surface} is withheld from the index`).toBe('noindex')
    expect(policy(surface + '/sub'), `${surface}/sub is withheld too`).toBe('noindex')
  }
  // A surface is a path segment, not a string prefix: /risky is a different page.
  for (const route of ['/', '/api', '/computer', '/risky', '/accountability', '/logins', '/automations']) {
    expect(policy(route), `${route} is public`).toBe('public')
  }
  // /authz is THE control for the /auth prefix bug, and it is published now, so
  // the contrast is sharper than it was: if PRIVATE's /auth matched as a string
  // prefix rather than a path segment this would read 'private'. The assertion
  // moved from 'noindex' to 'public' when UNAPPROVED was emptied — the route's
  // POLICY changed, the rule it proves did not.
  expect(policy('/authz'), '/authz is its own page, not swallowed by /auth').toBe('public')
  // An EMPTY entry is a PAGE and takes nothing beneath it: /docs forwards to
  // docs.hanzo.ai and /docs/sdk is three thousand words of its own.
  for (const page of EMPTY) {
    expect(policy(page), `${page} is withheld from the index`).toBe('noindex')
    expect(policy(page + '/sub'), `${page}/sub is its own page and its own decision`).toBe('public')
  }
  expect(policy('/docs/sdk'), '/docs/sdk is published under an unpublished /docs').toBe('public')
  // The query is not part of the route: the same bytes answer both.
  for (const route of [...PRIVATE, ...EMPTY]) {
    expect(policy(route + '?x=1'), `${route}?x=1 is the same page`).toBe(policy(route))
  }
  // A route has one REASON as well as one policy: the list it is on says why it
  // is withheld, and two lists claiming the same route makes that unanswerable.
  const named = [...PRIVATE, ...UNAPPROVED, ...EMPTY]
  const twice = named.filter((route, at) => named.indexOf(route) !== at)
  expect(twice, `named by two lists, so the reason is ambiguous: ${twice.join(', ')}`).toEqual([])
  const covered = (surfaces: readonly string[], page: string) =>
    surfaces.filter((surface) => page === surface || page.startsWith(surface + '/'))
  for (const page of EMPTY) {
    const already = [...covered(PRIVATE, page), ...covered(UNAPPROVED, page)]
    expect(already, `${page} is already withheld as a surface: ${already.join(', ')}`).toEqual([])
  }
  // The projection agrees with the predicate, in both directions.
  for (const route of ['/', '/api', '/authz', ...PRIVATE, ...UNAPPROVED, ...EMPTY]) {
    expect(indexable(route)).toBe(policy(route) === 'public')
  }
})

test('a Disallow line means the segment, under the crawler’s own matching rule', () => {
  // RFC 9309 §2.2.2: a Disallow path matches a PREFIX of the URL path, with `*`
  // for any run of characters and `$` for the end. That is a different rule
  // from `under()`, and the pair of lines lib/publish emits is what makes the
  // two agree. Written the obvious way — one bare prefix — `/auth` matches
  // `/authz`, which is a live product page.
  expect(matches('/auth', '/authz'), 'the bare prefix is why this gate exists').toBe(true)
  const covered = (route: string) => DISALLOW.some((pattern) => matches(pattern, route))
  const probes = [
    '/auth',
    '/auth/',
    '/auth/callback',
    '/authz',
    '/authz/scopes',
    '/account',
    '/account/billing',
    '/accountability',
    '/login',
    '/logins',
    '/risk',
    '/risky',
    '/',
    '/api',
    // The URL forms, not just the paths. A crawler asks for a URL, and
    // `/login?next=/account` is the shape a login link actually has — matched
    // by neither `/login$` nor `/login/`, so with two lines per prefix the
    // whole auth surface stayed fetchable behind a query string.
    '/auth/callback?code=x',
    '/login?next=/account',
    '/account?tab=billing',
    '/authz?tab=scopes',
    '/accountability?x=1',
    '/risky?x=1',
  ]
  for (const route of probes) {
    expect(covered(route), `${route}: Disallow coverage must equal the private segment`).toBe(
      policy(route) === 'private',
    )
  }
})

test('robots.txt disallows every private route and nothing it needs fetched', () => {
  const txt = read('robots.txt')
  // Read back as lines, not as a regex built from the line: a Disallow pattern
  // is not a regular expression, and `/auth?` compiled as one makes the `h`
  // optional and matches `Disallow: /aut`. Comparing the parsed lines is exact.
  const emitted = disallowed()
  for (const line of DISALLOW) {
    expect(emitted, `${line} must be disallowed`).toContain(line)
  }
  // The other half, and the one that matters: a route withheld by `noindex`
  // must NOT be disallowed. A crawler forbidden to fetch it never reads the
  // noindex it carries, so the Disallow would disable the only control that
  // removes a page already found.
  for (const route of [...UNAPPROVED, ...EMPTY]) {
    const blocking = disallowed().filter((pattern) => matches(pattern, route))
    expect(blocking, `${route} must stay fetchable so its noindex is read`).toEqual([])
  }
  expect(txt).toContain('Sitemap: https://hanzo.ai/sitemap.xml')
})

test('no route offered in sitemap.xml is forbidden by robots.txt', () => {
  // The two files are written by two surfaces from one predicate, and this is
  // the assertion that they agree — read back off the shipped bytes, by the
  // crawler's rule rather than ours. `Disallow: /auth` with /authz in the
  // sitemap is one build both advertising and forbidding a product page.
  const patterns = disallowed()
  expect(patterns.length, 'robots.txt must actually disallow something').toBeGreaterThan(0)
  const routes = offered()
  expect(routes.length, 'the sitemap must list the site').toBeGreaterThan(50)
  expect(routes, 'the sitemap must be real').toContain('/api')
  const conflicted = routes.flatMap((route) =>
    patterns.filter((pattern) => matches(pattern, route)).map((pattern) => `${route} <- Disallow: ${pattern}`),
  )
  expect(conflicted, `offered and forbidden by the same build:\n${conflicted.join('\n')}`).toEqual([])
})

test('no route is both disallowed and noindexed', () => {
  // The controls are in tension: a page a crawler may not fetch is a page
  // whose noindex it never reads. Applying both to one route leaves the weaker
  // in force while reading as if the stronger were. Either is a policy; the
  // pair is a mistake, and it is the mistake this split exists to make
  // unrepresentable.
  const both = noindexed().filter((route) => DISALLOW.some((pattern) => matches(pattern, route)))
  expect(both, `disallowed AND noindexed, so the noindex can never be read: ${both.join(', ')}`).toEqual([])
})

test('every withheld route ships a noindex, and nothing else does', () => {
  // Generic over the policy, not pinned to one file. The third control is the
  // only one that lives in a page rather than in a file derived from the tree,
  // so a route added to a list whose author forgot the tag ships with no
  // noindex at all — and a gate that names `risk.html` stays green through it.
  const marked = noindexed()
  const shipped = pages().map(({ route }) => route)
  const missing = shipped.filter((route) => policy(route) === 'noindex' && !marked.includes(route))
  expect(missing, `withheld routes shipping no noindex: ${missing.join(', ')}`).toEqual([])
  // And the inverse, so the list stays the one place publication is decided:
  // a page cannot quietly noindex itself outside it.
  const unlisted = marked.filter((route) => policy(route) !== 'noindex')
  expect(unlisted, `noindex on routes no list withholds: ${unlisted.join(', ')}`).toEqual([])
  // The floor: this whole assertion is "no route is missing a tag", which an
  // export that withheld nothing satisfies perfectly.
  expect(marked.length, 'the export must actually withhold something').toBeGreaterThan(0)
})

test('sitemap.xml offers no route the policy withholds', () => {
  const leaked = offered().filter((route) => !indexable(route))
  expect(leaked, `withheld routes offered to crawlers: ${leaked.join(', ')}`).toEqual([])
})

test('every route offered for indexing has something to index', () => {
  // The dimension that matters. `requireExport` bounds how MANY routes shipped,
  // and every gate here is "no page in the export does X" — both are satisfied
  // by an export of blank pages, so a page with nothing on it passes the floor
  // and every assertion above it. Twenty did: fourteen client-side forwards
  // (`/docs` -> docs.hanzo.ai, `/defi` -> /blockchain, `/status`, `/signup`)
  // and six shells that render a session the crawler does not have
  // (`/dashboard`, `/user-profile`, `/referral`). All were in the live
  // sitemap. Google calls the first a redirect to keep out of a sitemap and the
  // second a soft 404.
  //
  // The floor is DERIVED, not typed: the largest declared-empty page is what
  // "nothing to read" measures, and nothing offered may read shorter than that.
  // A constant here would be a number somebody has to remember to raise, which
  // is the shape of the defect this replaces.
  const rendered = said()
  const size = (route: string) => rendered.get(route)?.length ?? 0
  const empty = EMPTY.map((route) => ({ route, chars: size(route) })).sort((a, b) => b.chars - a.chars)
  expect(empty.length, 'the floor is derived from these, so there must be some').toBeGreaterThan(0)
  expect(offered().length, 'and there must be a site to measure against it').toBeGreaterThan(50)
  const floor = empty[0]
  const thin = offered()
    .map((route) => ({ route, chars: size(route) }))
    .filter(({ chars }) => chars <= floor.chars)
    .sort((a, b) => a.chars - b.chars)
  expect(
    thin.map(({ route, chars }) => `${route} (${chars} chars, floor ${floor.route} ${floor.chars})`),
    'offered to crawlers with no more to read than a page declared empty',
  ).toEqual([])
})

test('every route declared empty is empty, and grows out of the list', () => {
  // The other direction, and the one that keeps the list from rotting: a page
  // that gains copy must be published rather than sit withheld because nobody
  // revisited a literal. Empty is MEASURED, never asserted — and measured
  // against the site's own shortest real page, so this too is derived and there
  // is no threshold to maintain. The pair of gates says the two populations are
  // separable, which is the honest claim: it is a floor, not an oracle.
  const rendered = said()
  for (const route of EMPTY) {
    expect(rendered.has(route), `${route} is withheld and ships no page at all`).toBe(true)
  }
  const published = offered()
    .filter((route) => policy(route) === 'public')
    .map((route) => ({ route, chars: rendered.get(route)?.length ?? 0 }))
    .sort((a, b) => a.chars - b.chars)
  expect(published.length, 'the comparison is against the published pages, so there must be some').toBeGreaterThan(50)
  const shortest = published[0]
  const grown = EMPTY.map((route) => ({ route, chars: rendered.get(route)?.length ?? 0 })).filter(
    ({ chars }) => chars >= shortest.chars,
  )
  expect(
    grown.map(({ route, chars }) => `${route} (${chars} chars, published ${shortest.route} ${shortest.chars})`),
    'declared to have nothing to read, and reads like a published page — publish it',
  ).toEqual([])
})

test('an approved page ships no noindex', () => {
  // The inverse case. Without it, a change that noindexed the whole site would
  // pass every assertion above. (/authz held this seat until the cloud +
  // infrastructure shelf was withdrawn; /models is the site's core and the
  // page least likely to ever be.)
  expect(read('api.html')).not.toContain(NOINDEX)
  expect(read('models.html'), '/models is the catalog and stays indexable').not.toContain(NOINDEX)
})

test('the auth surfaces stay private', () => {
  // The gate replaced an EXCLUDE list; these were what it covered, and they
  // must not have been dropped on the way through.
  expect(PRIVATE).toEqual(['/auth', '/account', '/login'])
  for (const prefix of PRIVATE) expect(policy(prefix)).toBe('private')
})

test('robots.txt is emitted from DISALLOW and cannot spell a bare prefix', () => {
  // The defect was one surface re-deriving the rule. There is one constructor
  // for a Disallow line and it is not exported, so this pins that the surface
  // reaches it and reaches nothing else — the other spelling stays absent
  // rather than merely being absent today.
  const source = readFileSync(join(OUT, '..', 'app', 'robots.ts'), 'utf8')
  expect(source, 'app/robots.ts must emit DISALLOW').toContain('DISALLOW')
  for (const banned of ['PRIVATE', 'UNAPPROVED', 'EMPTY', 'WITHHELD']) {
    expect(source, `app/robots.ts must not reach ${banned}: a prefix is not a Disallow line`).not.toContain(banned)
  }
})

test('the noindex tag is spelled once and written once', () => {
  // The same pin over control 3. It used to be page `metadata` reading the
  // list, which made the one control a page states about ITSELF the one control
  // a page could forget — and nineteen of the twenty pages that need it are
  // `'use client'`, where Next forbids a `metadata` export at all. Now
  // `lib/publish` spells the tag and `scripts/noindex.mjs` writes it, and this
  // says nothing else in the tree does either. The build step is the other half:
  // it refuses to stamp a page that already carries a robots tag, so a second
  // author is a failed build rather than a quietly duplicated directive.
  // Spelled: the tag itself, or Next's `robots:` metadata key, anywhere in the
  // tree. Written: whoever imports the one spelling.
  const SPELLED = /<meta[^>]*name=["']robots["']|robots:\s*(\{|robots\()/
  const WRITES = /\bNOINDEX\b/
  const spells: string[] = []
  const writes: string[] = []
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true, encoding: 'utf8' })) {
      const path = join(dir, e.name)
      if (e.isDirectory()) {
        walk(path)
        continue
      }
      if (!/\.(tsx|ts|mjs|js)$/.test(e.name)) continue
      const source = readFileSync(path, 'utf8')
      const name = path.slice(ROOT.length + 1)
      if (SPELLED.test(source)) spells.push(name)
      if (WRITES.test(source) && name !== 'lib/publish.ts') writes.push(name)
    }
  }
  // The shipping tree only. A spec is not a page and cannot write into the
  // export; what it may not do is spell the tag a second time, and it does not
  // — it imports the one spelling and matches the shipped bytes against it.
  for (const dir of ['app', 'lib', 'scripts', 'components']) walk(join(ROOT, dir))
  expect(spells.sort(), 'the tag is spelled in one place, and no page states it').toEqual(['lib/publish.ts'])
  expect(writes.sort(), 'and one build step writes it into the export').toEqual(['scripts/noindex.mjs'])
})
