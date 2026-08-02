import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { DISALLOW, PRIVATE, UNAPPROVED, indexable, matches, policy, robots } from '../../lib/publish'
import { OUT, pages, read } from './export'

/**
 * The publication gate, asserted on the bytes that ship.
 *
 * "It is not linked from the nav" was never a gate: `app/sitemap.ts` walks the
 * App Router tree and offers a crawler every page it finds. But nor is one
 * list read by three controls — a `Disallow` and a `noindex` over the same
 * route cancel each other, and a path segment written as a robots.txt string
 * prefix takes the next route that starts with the same letters. Both of those
 * shipped. So these gates check the two policies AGAINST EACH OTHER over the
 * whole export, rather than checking each control against the list it came
 * from.
 */

const NOINDEX = /<meta name="robots" content="[^"]*noindex/

/** Every route whose shipped page carries a noindex, read from the export. */
function noindexed(): string[] {
  return pages()
    .filter(({ file }) => NOINDEX.test(readFileSync(file, 'utf8')))
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

test('a route has exactly one policy, and a prefix is a path segment', () => {
  for (const prefix of PRIVATE) {
    expect(policy(prefix), `${prefix} is private`).toBe('private')
    expect(policy(prefix + '/sub'), `${prefix}/sub is private`).toBe('private')
  }
  for (const prefix of UNAPPROVED) {
    expect(policy(prefix), `${prefix} is unapproved`).toBe('unapproved')
    expect(policy(prefix + '/sub'), `${prefix}/sub is unapproved`).toBe('unapproved')
  }
  // A prefix is a path segment, not a string prefix: /risky is a different page.
  for (const route of ['/', '/api', '/commerce', '/risky', '/accountability', '/logins', '/authz']) {
    expect(policy(route), `${route} is public`).toBe('public')
  }
  // The projections agree with the predicate, in both directions.
  for (const route of ['/', '/api', '/authz', ...PRIVATE, ...UNAPPROVED]) {
    expect(indexable(route)).toBe(policy(route) === 'public')
    expect(robots(route) === undefined).toBe(policy(route) !== 'unapproved')
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
  ]
  for (const route of probes) {
    expect(covered(route), `${route}: Disallow coverage must equal the private segment`).toBe(
      policy(route) === 'private',
    )
  }
})

test('robots.txt disallows every private route and no unapproved one', () => {
  const txt = read('robots.txt')
  for (const line of DISALLOW) {
    expect(txt, `${line} must be disallowed`).toMatch(
      new RegExp(`^Disallow:\\s*${line.replace(/\$/g, '\\$')}\\s*$`, 'm'),
    )
  }
  // The other half, and the one that matters: an unapproved route must NOT be
  // disallowed. A crawler forbidden to fetch it never reads the noindex it
  // carries, so the Disallow would disable the only control that removes a
  // page already found.
  for (const prefix of UNAPPROVED) {
    const blocking = disallowed().filter((pattern) => matches(pattern, prefix))
    expect(blocking, `${prefix} must stay fetchable so its noindex is read`).toEqual([])
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

test('every unapproved route ships a noindex, and nothing else does', () => {
  // Generic over the list, not pinned to one file. The third control is the
  // only one written in a page rather than derived from the tree, so a route
  // added to UNAPPROVED whose author forgot the metadata line ships with no
  // noindex at all — and a gate that names `risk.html` stays green through it.
  const marked = noindexed()
  const shipped = pages().map(({ route }) => route)
  const missing = shipped.filter((route) => policy(route) === 'unapproved' && !marked.includes(route))
  expect(missing, `unapproved routes shipping no noindex: ${missing.join(', ')}`).toEqual([])
  // And the inverse, so the list stays the one place publication is decided:
  // a page cannot quietly noindex itself outside it.
  const unlisted = marked.filter((route) => policy(route) !== 'unapproved')
  expect(unlisted, `noindex on routes no list withholds: ${unlisted.join(', ')}`).toEqual([])
})

test('sitemap.xml offers no route that is private or unapproved', () => {
  const leaked = offered().filter((route) => !indexable(route))
  expect(leaked, `withheld routes offered to crawlers: ${leaked.join(', ')}`).toEqual([])
})

test('an approved page ships no noindex', () => {
  // The inverse case. Without it, a change that noindexed the whole site would
  // pass every assertion above.
  expect(read('api.html')).not.toMatch(NOINDEX)
  expect(read('authz.html'), '/authz is a product page and stays indexable').not.toMatch(NOINDEX)
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
  for (const banned of ['PRIVATE', 'UNAPPROVED', 'WITHHELD']) {
    expect(source, `app/robots.ts must not reach ${banned}: a prefix is not a Disallow line`).not.toContain(banned)
  }
})
