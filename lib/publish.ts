import type { Metadata } from 'next'

/**
 * Whether a crawler may FETCH a route, and whether it may INDEX it.
 *
 * Two questions, not one, and the controls that answer them are in tension. A
 * `Disallow` in robots.txt stops the FETCH, and a page a crawler never fetches
 * is a page whose `noindex` it never reads. Google states it outright — "For
 * the noindex rule to be effective, the page or resource must not be blocked
 * by a robots.txt file" — so applying both to one route leaves only the weaker
 * of the two in force, and the bare URL stays listable from any inbound link.
 *
 * So there are two policies, and a route has exactly one of them:
 *
 *   private     the crawler must never fetch it. `Disallow` in robots.txt, and
 *               absent from sitemap.xml, because offering what you forbid is a
 *               contradiction. NO `noindex`: behind a `Disallow` it can never
 *               be read, and writing one claims a protection it does not have.
 *
 *   unapproved  the crawler may fetch it and must not index it. Absent from
 *               sitemap.xml, and `noindex` in the page itself — the only one of
 *               the three controls that removes a page a crawler already found.
 *               Deliberately NOT disallowed, because the `Disallow` is exactly
 *               what would stop the `noindex` being read.
 *
 * `policy()` is the one predicate. Every control below is a projection of it,
 * and no control reads the two lists directly.
 */

/** Auth surfaces. Never fetched. */
export const PRIVATE: readonly string[] = ['/auth', '/account', '/login']

/**
 * Routes whose copy no owner has approved. They build, they answer on their own
 * URL, they are fetched, and they are indexed nowhere.
 *
 * Adding a route here withholds it; deleting it is the approval. There is no
 * second switch, and no page can approve itself.
 */
export const UNAPPROVED: readonly string[] = []

export type Policy = 'public' | 'private' | 'unapproved'

/** A route is "under" a prefix when it is the prefix or a descendant of it. */
const under = (route: string, prefix: string) => route === prefix || route.startsWith(prefix + '/')

/** The one predicate. Everything else here is a projection of it. */
export function policy(route: string): Policy {
  if (PRIVATE.some((prefix) => under(route, prefix))) return 'private'
  if (UNAPPROVED.some((prefix) => under(route, prefix))) return 'unapproved'
  return 'public'
}

/** Control 1 — `app/sitemap.ts` offers a crawler only what is public. */
export function indexable(route: string): boolean {
  return policy(route) === 'public'
}

/**
 * One prefix, as the robots.txt lines that mean it.
 *
 * A robots.txt path matches as a STRING prefix and withholding is a PATH
 * SEGMENT — two different rules, and writing the segment as if it were the
 * string is what put the live /authz product page behind `Disallow: /auth`.
 * RFC 9309 §2.2.2 gives the grammar to say what is meant: `$` ends the match.
 * So one prefix becomes two lines — the route itself, anchored, and everything
 * beneath it — and the pair covers exactly `under()`.
 *
 * Unexported, and the only place a Disallow line is spelled. `app/robots.ts`
 * emits DISALLOW and cannot reach the prefixes, so a bare string prefix is not
 * a thing that surface can write.
 */
const lines = (prefix: string) => [prefix + '$', prefix + '/']

/** Control 2 — the robots.txt `Disallow` lines. Private routes only. */
export const DISALLOW: readonly string[] = PRIVATE.flatMap(lines)

/**
 * Control 3 — the `robots` metadata a route publishes about itself.
 *
 * `undefined` for anything not unapproved, so an approved page carries no tag
 * at all and the default (index, follow) stands — and a private page carries
 * none either, because its policy is "never fetched" and a directive nobody
 * fetches is not a control.
 */
export function robots(route: string): Metadata['robots'] {
  return policy(route) === 'unapproved' ? { index: false, follow: false, nocache: true } : undefined
}

/**
 * Does a robots.txt path pattern match a route, by the crawler's own rule?
 *
 * RFC 9309 §2.2.2: the pattern matches a PREFIX of the path, `*` stands for any
 * sequence of characters, and `$` anchors the end. This is what the gate runs
 * every offered route through, so the two rules are compared rather than
 * assumed to agree — the assumption is the defect.
 */
export function matches(pattern: string, route: string): boolean {
  const anchored = pattern.endsWith('$')
  const body = anchored ? pattern.slice(0, -1) : pattern
  const source =
    '^' +
    body
      .split('*')
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('.*') +
    (anchored ? '$' : '')
  return new RegExp(source).test(route)
}
