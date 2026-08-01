import type { Metadata } from 'next'

/**
 * Which routes a crawler may index — one list, read by every surface that decides it.
 *
 * "It is not linked from the nav" is not a publication gate. `app/sitemap.ts`
 * walks the App Router tree and offers a crawler every page it finds, and
 * `app/robots.ts` allowed all of it, so an unapproved page was in sitemap.xml
 * from the moment its file existed — whether or not anything linked to it.
 *
 * Three controls decide whether a route is published, and each reads THIS list:
 *
 *   1. `app/sitemap.ts` — an unpublished route is not offered to a crawler.
 *   2. `app/robots.ts`  — and is disallowed if one comes looking anyway.
 *   3. the route's own `metadata.robots` — `noindex`.
 *
 * All three, because the first two are requests and only the third is an
 * instruction. robots.txt asks a crawler not to FETCH a URL; a URL that is
 * never fetched can still be indexed from a link somewhere else, listed by its
 * address alone. `noindex` in the page is the only one of the three that says
 * do not index THIS, and it is the only one that removes a page already found.
 */

/** Auth surfaces. Never indexed, whatever else is true of them. */
export const PRIVATE: readonly string[] = ['/auth', '/account', '/login']

/**
 * Routes whose copy no owner has approved. They build, they answer on their own
 * URL, and they are published nowhere.
 *
 * Adding a route here withholds it; deleting it is the approval. There is no
 * second switch, and no page can approve itself.
 */
export const UNAPPROVED: readonly string[] = []

/** A route is "under" a prefix when it is the prefix or a descendant of it. */
const under = (route: string, prefix: string) => route === prefix || route.startsWith(prefix + '/')

/** Every withheld prefix, in the order a reader would want to see them. */
export const WITHHELD: readonly string[] = [...PRIVATE, ...UNAPPROVED]

/** The one predicate. Everything else here is a projection of it. */
export function indexable(route: string): boolean {
  return !WITHHELD.some((prefix) => under(route, prefix))
}

/**
 * The `robots` metadata a route publishes about itself.
 *
 * `undefined` where the route is indexable, so an approved page carries no tag
 * at all and the default (index, follow) stands.
 */
export function robots(route: string): Metadata['robots'] {
  return indexable(route) ? undefined : { index: false, follow: false, nocache: true }
}
