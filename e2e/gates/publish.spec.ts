import { test, expect } from '@playwright/test'
import { indexable, PRIVATE, WITHHELD, robots } from '../../lib/publish'
import { read } from './export'

/**
 * The publication gate, asserted on the bytes that ship.
 *
 * "It is not linked from the nav" was never a gate. `app/sitemap.ts` walks the
 * App Router tree and publishes every page it finds, and robots.txt allowed all
 * of it — so an unapproved page was offered to every crawler the moment its
 * file existed. These tests fail if any of the three controls stops reading the
 * one list, and if the list stops being enforced end to end.
 */

test('the predicate withholds every listed prefix, and nothing else', () => {
  for (const prefix of WITHHELD) {
    expect(indexable(prefix), `${prefix} must be withheld`).toBe(false)
    expect(indexable(prefix + '/sub'), `${prefix}/sub must be withheld`).toBe(false)
  }
  // A prefix is a path segment, not a string prefix: /risky is a different page.
  for (const route of ['/', '/api', '/commerce', '/risky', '/accountability', '/logins']) {
    expect(indexable(route), `${route} must be publishable`).toBe(true)
  }
})

test('a withheld route emits noindex, and an approved route emits no directive', () => {
  expect(robots('/login')).toEqual({ index: false, follow: false, nocache: true })
  expect(robots('/api')).toBeUndefined()
})

test('sitemap.xml offers no withheld route', () => {
  const xml = read('sitemap.xml')
  // The gate is only meaningful if the sitemap is real: it must carry the pages
  // that ARE approved. Otherwise an empty file would pass.
  expect(xml).toContain('<loc>https://hanzo.ai/api</loc>')
  const published = [...xml.matchAll(/<loc>https:\/\/hanzo\.ai([^<]*)<\/loc>/g)].map((m) => m[1])
  expect(published.length, 'the sitemap must list the site').toBeGreaterThan(50)
  // A path segment, not a string prefix: /authz is a product page and stays.
  const leaked = published.filter((route) => !indexable(route === '' ? '/' : route))
  expect(leaked, `withheld routes offered to crawlers: ${leaked.join(', ')}`).toEqual([])
})

test('robots.txt disallows every withheld route', () => {
  const txt = read('robots.txt')
  for (const prefix of WITHHELD) {
    expect(txt, `${prefix} must be disallowed`).toMatch(new RegExp(`^Disallow:\\s*${prefix}\\s*$`, 'm'))
  }
  expect(txt).toContain('Sitemap: https://hanzo.ai/sitemap.xml')
})

test('an approved page ships no noindex', () => {
  // The inverse case. Without it, a change that noindexed the whole site would
  // pass every assertion above.
  expect(read('api.html')).not.toMatch(/<meta name="robots" content="[^"]*noindex/)
})

test('the auth surfaces stay withheld', () => {
  // The gate replaced an EXCLUDE list; these were what it covered, and they
  // must not have been dropped on the way through.
  expect(PRIVATE).toEqual(['/auth', '/account', '/login'])
  for (const p of PRIVATE) expect(indexable(p)).toBe(false)
})
