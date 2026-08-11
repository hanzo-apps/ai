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
  // Three shelves withdrawn as sets (owner call, 2026-08-05): commerce +
  // fintech, cloud + infrastructure, and company + content. The site leads
  // with the AI platform; everything here still answers on its URL and
  // appears nowhere — no nav, no sitemap, no index. Deleting a line is the
  // re-approval. The legal pages (/privacy, /terms, /cookies, /sms-opt-in)
  // are deliberately NOT here: OAuth consent and compliance checks resolve
  // them, and a site whose privacy policy is hidden fails both.
  // ── commerce + fintech ──
  '/billing',
  '/blockchain',
  '/calculator',
  '/captable',
  '/commerce',
  '/defi',
  '/fintech',
  '/ledger',
  '/payments',
  '/risk',
  '/treasury',
  // ── cloud + infrastructure ──
  '/analytics',
  '/authz',
  '/base',
  '/cloud',
  '/console',
  '/dashboards',
  '/database',
  '/dataroom',
  '/datastore',
  '/dns',
  '/docdb',
  '/edge',
  '/engine',
  '/flow',
  '/functions',
  '/guard',
  '/hsm',
  '/iam',
  '/identity',
  '/idv',
  '/ingress',
  '/kms',
  '/kv',
  '/machines',
  // Unlike the rest of this shelf, /mcp's page is not withdrawn — it ships with
  // real copy. But the sites edge maps /mcp → the /v1/mcp API endpoint (308 →
  // JSON), so the marketing page never answers at its own URL. Keep it out of
  // sitemap.xml and noindex it rather than advertise a URL that redirects to
  // JSON; the real fix is at the edge (stop shadowing /mcp), which is separate.
  '/mcp',
  '/metrics',
  '/mq',
  '/network',
  '/node',
  '/o11y',
  '/operator',
  '/platform',
  '/pubsub',
  '/realtime',
  '/registry',
  '/s3',
  '/security',
  '/sentinel',
  '/sentry',
  '/sign',
  '/sql',
  '/status',
  '/storage',
  '/stream',
  '/telemetry',
  '/tunnel',
  '/visor',
  // ── company + content ──
  '/about',
  '/blog',
  '/brand',
  '/careers',
  '/contact',
  '/contact-sales',
  '/customers',
  '/enterprise',
  '/leadership',
  '/learn',
  '/philosophy',
  '/press',
  '/pricing',
  '/products',
  '/research',
  '/research-access',
  '/solutions',
  '/startups',
  '/support',
  '/team',
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
