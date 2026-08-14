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
 * So there are two answers a route can have besides `public`, and it has
 * exactly one of them:
 *
 *   private   the crawler must never fetch it. `Disallow` in robots.txt, and
 *             absent from sitemap.xml, because offering what you forbid is a
 *             contradiction. NO `noindex`: behind a `Disallow` it can never be
 *             read, and writing one claims a protection it does not have.
 *
 *   noindex   the crawler may fetch it and must not index it. Absent from
 *             sitemap.xml, and `noindex` in the page itself — the only one of
 *             the three controls that removes a page a crawler already found.
 *             Deliberately NOT disallowed, because the `Disallow` is exactly
 *             what would stop the `noindex` being read.
 *
 * The POLICY is named for the control; the LISTS are named for the reason. Two
 * routes can be withheld from the index for entirely different reasons and
 * still need the identical mechanism, so the mechanism is written once.
 *
 * `policy()` is the one predicate. Every control below is a projection of it,
 * and no control reads the lists directly.
 */

/** Auth surfaces. Never fetched. A SURFACE: everything beneath it too. */
export const PRIVATE: readonly string[] = ['/auth', '/account', '/login']

/**
 * Routes whose copy no owner has approved. They build, they answer on their own
 * URL, they are fetched, and they are indexed nowhere. A SURFACE.
 *
 * Deleting a route from this list is the approval — there is no second switch,
 * and no page can approve itself.
 */
export const UNAPPROVED: readonly string[] = [
  // EMPTIED — owner approval, 2026-08-13. All 78 routes that were
  // withheld here are now published: they answer on their own URL, they are in
  // sitemap.xml, they carry no `noindex`, and the chrome links them.
  //
  // The list is kept rather than deleted because it is the MECHANISM, not the
  // decision. It is how a route is withheld while its copy is written, and the
  // gate below still holds whatever is in it in both directions — so the next
  // unwritten page has somewhere to go, and does not need this file rebuilt.
  //
  // Withholding a route from the index also withholds it from the MENU: the
  // header calls `policy()` through `shown()`, so Solutions, Pricing, Learn,
  // Research and Support were absent from the nav for exactly this reason, not
  // because nobody had added them.
]

/**
 * Routes with nothing to read: a redirect, or a shell that waits for a session.
 *
 * A sitemap offers pages for INDEXING and these have nothing to index — the
 * first kind is a redirect, which Google's own sitemap guidance says to leave
 * out; the second is a soft 404. Every one of them was offered to crawlers,
 * and no gate could see it, because the export floor bounds how many routes
 * shipped and an export of twenty blank pages satisfies that exactly as well
 * as this one does. Count is not the dimension that matters here; content is.
 *
 * A PAGE, not a surface, and the distinction is load-bearing: `/docs` is a
 * client-side forward to docs.hanzo.ai while its sibling `/docs/sdk` is three
 * thousand words. Emptiness is a property of a page. Privacy is a property of
 * a surface — everything under `/account` is private, including the page
 * nobody has written yet.
 *
 * The way OFF this list is to give the page something to say. The gate holds
 * the list to that in both directions: nothing offered to a crawler may read
 * shorter than these, and none of these may grow copy without being published.
 */
export const EMPTY: readonly string[] = [
  // Redirect shells. Each exists so links minted under an old name keep
  // working, and each renders one sentence and a forwarding link — `/defi` and
  // `/fintech` to the products that absorbed them, `/sentry` to Sentinel (the
  // rename is a trademark matter, see that page). They are pages only because
  // this is a STATIC EXPORT: Next's `redirects()` needs a server and is
  // silently absent from an export, so a configured rewrite would 404 every
  // inbound link.
  //
  // Offering them for indexing put six results in front of readers that carry
  // nothing to read, and it dragged the thin-page floor down onto the whole
  // `/docs/*` shelf — one cause, two red gates, which is why they arrive
  // together.
  '/defi',
  '/defi/exchange',
  '/defi/staking',
  '/fintech',
  '/fintech/payments',
  '/sentry',
  // Same shape: this one forwards to status.hanzo.ai, which owns live status.
  '/status',
  // `/integrations` is the page about what Hanzo works with, and it is a
  // product of the Dev category — the catalog's own `href` points there. This
  // was a second copy of that subject built by hand from sample data, under a
  // `/products/<slug>` name no category answers to. Nothing ever linked it.
  '/products/integrations',
  '/dashboard',
  '/docs',
  '/docs/api',
  '/docs/audit',
  '/docs/cli',
  '/docs/environments',
  '/docs/local',
  '/docs/orgs',
  '/docs/templates',
  '/docs/webhooks',
  '/organization-profile',
  '/referral',
  '/signup',
  '/user-profile',
]

export type Policy = 'public' | 'private' | 'noindex'

/**
 * The route, without the query.
 *
 * A static export serves the same bytes for `/login` and `/login?next=/account`,
 * so they are one page and must have one policy — and a crawler that may fetch
 * the second has fetched the first.
 */
const path = (route: string) => route.split(/[?#]/)[0]

/** A route is "under" a surface when it is the surface or a descendant of it. */
const under = (route: string, surface: string) => {
  const p = path(route)
  return p === surface || p.startsWith(surface + '/')
}

/** The one predicate. Everything else here is a projection of it. */
export function policy(route: string): Policy {
  if (PRIVATE.some((surface) => under(route, surface))) return 'private'
  if (UNAPPROVED.some((surface) => under(route, surface))) return 'noindex'
  if (EMPTY.some((page) => path(route) === page)) return 'noindex'
  return 'public'
}

/** Control 1 — `app/sitemap.ts` offers a crawler only what is public. */
export function indexable(route: string): boolean {
  return policy(route) === 'public'
}

/**
 * One surface, as the robots.txt lines that mean it.
 *
 * A robots.txt path matches as a STRING prefix and withholding is a PATH
 * SEGMENT — two different rules, and writing the segment as if it were the
 * string is what put the live /authz product page behind `Disallow: /auth`.
 * RFC 9309 §2.2.2 gives the grammar to say what is meant: `$` ends the match.
 * So one surface becomes the three URL FORMS that are the same route — itself
 * anchored, everything beneath it, and itself with a query on it. The third is
 * not decoration: `/login$` does not match `/login?next=/account`, and a login
 * URL is exactly the one that gets linked with a query. Together they cover
 * `under()` over URLs, not merely over paths.
 *
 * Unexported, and the only place a Disallow line is spelled. `app/robots.ts`
 * emits DISALLOW and cannot reach the lists, so a bare string prefix is not a
 * thing that surface can write.
 */
const lines = (surface: string) => [surface + '$', surface + '/', surface + '?']

/** Control 2 — the robots.txt `Disallow` lines. Private routes only. */
export const DISALLOW: readonly string[] = PRIVATE.flatMap(lines)

/**
 * Control 3 — the tag a withheld page carries, in its one spelling.
 *
 * `scripts/noindex.mjs` writes it into the export; no page writes it and no
 * page can. It was page `metadata` reading this list, and that made the only
 * control a page states about ITSELF the only one a page could forget: a route
 * added to a list without the matching line in its `page.tsx` shipped with no
 * tag at all, and every gate stayed green. Most of the pages that need it are
 * `'use client'` besides, where Next forbids a `metadata` export outright, so
 * the per-page spelling would have been twenty `layout.tsx` files carrying one
 * line each — and the twenty-first page would not have had it either.
 */
export const NOINDEX = '<meta name="robots" content="noindex, nofollow, nocache"/>'

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
