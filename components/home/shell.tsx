'use client'

import {
  HanzoHeader,
  HanzoFooter,
  resolveSurface,
  type HanzoCommandEntry,
  type HanzoNav,
  type ProductCategory,
} from '@hanzogui/shell'
import { cloudCategories } from '@/lib/data/cloud-primitives'
import { policy } from '@/lib/publish'
import pages from '@/lib/data/pages.json'
import { CONSOLE, goToChat } from './nav-data'

/**
 * The chrome links a page iff it is PUBLISHED — the same `policy()` that
 * writes the sitemap and the noindex tags, so lib/publish's lists are the ONE
 * switch for menu, nav and footer alike. The registry spells this site's own
 * routes as absolute hanzo.ai URLs; normalize those, and let every
 * off-property link (docs.hanzo.ai, lux.cloud) through untouched.
 */
const shown = (href: string): boolean => {
  const local = href.replace(/^https:\/\/(?:cloud\.)?hanzo\.ai(?=\/|$)/, '')
  if (!local.startsWith('/')) return true
  return policy(local) === 'public'
}

/**
 * The shared chrome — ONE header and ONE footer for every face this export
 * serves.
 *
 * hanzo.ai and cloud.hanzo.ai are one product seen from two angles, so they
 * wear the same shell: `@hanzogui/shell`'s `HanzoHeader` + `HanzoFooter`, which
 * theme from `@hanzo/brand`'s tokens and are the same chrome hanzo.chat,
 * hanzo.app and studio wear. Coherence is then structural rather than a thing
 * two hand-written navs have to keep agreeing about — this repo previously held
 * three (a landing nav, a private one inside CloudLanding, and a third on 404),
 * and they had already drifted.
 *
 * What changes between faces is CONTENT, not chrome. The shell's registry
 * carries a `HanzoSurface` per host — brand name, local nav, and the two header
 * actions — so hanzo.ai leads with chat and cloud.hanzo.ai leads with the
 * console, through the same components in the same positions.
 */

/**
 * The ten cloud primitives, in the shell's menu shape.
 *
 * Mapped from `lib/data/cloud-primitives.ts`, NOT from the shell registry's own
 * copy. That is deliberate: this repo's taxonomy is the source that also
 * generates the `/products/<slug>` pages and the `/cloud/<slug>` overviews, and
 * its hrefs are same-origin relative paths, so every leaf resolves on whichever
 * host is serving this export. The registry's copy is absolute hanzo.ai URLs —
 * correct for a foreign property embedding the menu, wrong for the site that
 * owns the pages, which would leave cloud.hanzo.ai's menu pointing off-host.
 */
/** How many leaves a mega-menu tile shows before handing off to its page. */
const MENU_LEAVES = 5

export const PRODUCTS_TAXONOMY: ProductCategory[] = cloudCategories.map((category) => {
  // `cloudCategories` is already the PUBLISHED projection (hidden leaves and
  // emptied categories are gone at the source). What remains here is the
  // landing: with /products withdrawn, a tile must not point into it, so the
  // category href falls back to its first leaf and the "All N →" row only
  // renders when the landing is a page we still publish.
  const landing = `/products/${category.id}`
  const href = shown(landing) ? landing : (category.items[0]?.href ?? landing)
  return {
    id: category.id,
    label: category.title,
    href,
    tagline: category.tagline,
    items: [
      ...category.items.slice(0, MENU_LEAVES).map((item) => ({
        id: item.slug,
        label: item.title,
        href: item.href,
        hint: item.desc,
        // An absolute href is another host, so the leaf opens in a new tab.
        // Read off the URL, never declared twice.
        external: /^https?:\/\//.test(item.href),
      })),
      // Categories run uneven and the tiles must stay level across the grid, so
      // every tile shows the same five and then hands off to the page that
      // lists the rest. It names the CATEGORY rather than a remainder: the
      // membership is measured per build now, so a number here would be a count
      // of what happened to answer this morning.
      // Only when that page is published: an "All … →" into a withdrawn landing
      // is a link to a page we just unlisted.
      ...(shown(landing)
        ? [{ id: `${category.id}-all`, label: `All ${category.title} →`, href: landing }]
        : []),
    ],
  }
})

/**
 * The column count that splits the taxonomy into EQUAL rows, no wider than `max`.
 *
 * Seven categories give one row of seven; ten give two rows of five — the shape
 * the shelves were written for. `@hanzogui/shell` 8.1.5 states a FIXED five
 * instead, which only ever divided ten: with seven published it laid a 5x2 grid
 * and left THREE dead cells in the second row, and at 2560 those five tracks
 * were 507px wide apiece, so a one-word leaf sat marooned in the middle of a
 * column. Deriving the count means the grid cannot hold a hole again whatever
 * `lib/publish` withdraws or restores.
 */
const columnsFor = (n: number, max: number): number =>
  n < 1 ? 1 : Math.ceil(n / Math.ceil(n / Math.min(max, n)))

/**
 * The three counts the menu picks between, as custom properties.
 *
 * The COUNT is computed here, where the taxonomy is; the WIDTHS that choose
 * between them are three media queries in `app/globals.css`, because a media
 * query is the one thing an inline style cannot say. Neither half repeats the
 * other, and both are deleted together the day the fix lands in the package.
 *
 * `display: contents` on the carrier: the properties inherit down the DOM to
 * the panel, which is a descendant of the header, while no box is generated —
 * a real wrapper would become the sticky header's containing block and the
 * header would stop sticking the moment it scrolled.
 */
const MENU_COLUMNS = {
  display: 'contents',
  '--hanzo-products-cols-base': columnsFor(PRODUCTS_TAXONOMY.length, 4),
  '--hanzo-products-cols-mid': columnsFor(PRODUCTS_TAXONOMY.length, 5),
  '--hanzo-products-cols-wide': columnsFor(PRODUCTS_TAXONOMY.length, 7),
} as React.CSSProperties

/**
 * What ⌘K can find besides the products: every page this site publishes.
 *
 * Written by `scripts/sync-pages.mjs` at prebuild from the App Router tree,
 * through the same `policy()` that writes the sitemap — so the palette can
 * neither miss a published page nor offer a withheld one, and neither can go
 * stale, because nobody maintains the list. Before this the palette searched
 * the taxonomy alone and answered "no results" for `pricing`.
 */
const SITE_PAGES: HanzoCommandEntry[] = pages.map((page) => ({
  ...page,
  group: 'Pages',
}))

/**
 * The header, bound to this site's IA.
 *
 * `signInHref` is the whole login story: this is a marketing site, it owns no
 * session and runs no OAuth, and console.hanzo.ai owns auth. Both faces point
 * there, so signing in means the same thing wherever you are.
 */
export function SiteHeader({
  surface,
  currentCategoryId,
}: {
  surface: 'ai' | 'cloud'
  currentCategoryId?: string
}) {
  const base = resolveSurface(surface)

  // The header names the FOUR ways in: what we sell, what it is for, what to
  // read, and what to build with. Products is the mega-menu (taxonomy below);
  // these three are the rest.
  //
  // Every href is a page this site actually serves — measured, not assumed.
  // Resources is the one that names more than a page: what we publish is five
  // pages, not one, so the label HOLDS them and carries `/learn` as the page it
  // names — which is what it opens without JavaScript, and what the label meant
  // when it was a plain link. `/developers` still does not exist, so Developers
  // keeps pointing at `/dev`, the hub that does.
  //
  // Each hint is the page's own sentence, shortened. A menu that describes a
  // page in words the page does not use is a second copy that drifts.
  //
  // Documentation is NOT here and is not a top-level action either. It used to
  // be the far-right secondary CTA, which put a link to another host in the
  // most valuable slot on the page, competing with the one thing we want a
  // reader to do. It belongs under Developers, where someone looking for it is
  // already standing.
  //
  // It is HIDDEN IN CSS rather than dropped, and that is not a preference:
  // `HanzoHeader` renders a CTA through a component that reads `link.href`
  // UNGUARDED, so passing `undefined` throws `Cannot read properties of
  // undefined (reading 'href')` and takes the whole page down with it — measured,
  // a blank render with no header and no <h1>. hanzo.app hit the identical trap
  // on `primaryCTA` and settled it the same way. The object stays valid; the
  // rule in app/globals.css takes it off the page.
  const DOCS = { id: 'docs', label: 'Documentation', href: 'https://docs.hanzo.ai' }

  const localNav: HanzoNav[] = [
    { id: 'solutions', label: 'Solutions', href: '/solutions' },
    {
      id: 'resources',
      label: 'Resources',
      href: '/learn',
      items: [
        { id: 'learn', label: 'Learn', href: '/learn', hint: 'Guides and documentation' },
        { id: 'research', label: 'Research', href: '/research', hint: 'Work we publish' },
        {
          id: 'open-source',
          label: 'Open Source',
          href: '/open-source',
          hint: 'Every tool we build, published',
        },
        { id: 'blog', label: 'Blog', href: '/blog', hint: 'News and deep dives' },
        {
          id: 'customers',
          label: 'Customers',
          href: '/customers',
          hint: 'Teams building on Hanzo',
        },
      ].filter((l) => shown(l.href)),
    },
    { id: 'developers', label: 'Developers', href: '/dev' },
  ].filter((l) => shown(l.href))

  // ONE action, far right: try the thing.
  //
  // There were two, and they were the SAME URL. `signInHref` renders the
  // shell's default "Sign in", and it pointed at console.hanzo.ai; so did this
  // CTA. A visitor read two controls, weighed them, and arrived at one page
  // either way — the header spending its most valuable inches offering a choice
  // that does not exist. The prop's own contract already says this: supplying
  // it is what makes the affordance exist, and a surface "whose primary CTA IS
  // the sign-in" is told to omit it. This is that surface.
  //
  // Dropping it also retires a CSS rule. The primary used to need `order: 1` to
  // get past Sign in, which the shell emits last; with nothing to get past, the
  // DOM order is already the right order and the override is gone rather than
  // kept as decoration.
  //
  // The pill OPENS THE DOORS rather than taking one. "Try Hanzo" as a single
  // href answers a question nobody asked: a visitor arrives wanting to build an
  // app, or to keep data somewhere, or to chat, or to code from a terminal, and
  // any one destination is wrong for most of them. `tryMenu` opens the canonical
  // TRY_HANZO_GROUPS — Chat · App · Team · Studio · Bot · Cloud · Base · Dev,
  // and the installs beside them — while `href` stays the fallback the pill
  // still carries, so it is a real link before hydration and without JS.
  //
  // It arrives WITH its pin, in one commit. The prop landed here once ahead of
  // the package that declares it and turned main red: this site has no
  // `ignoreBuildErrors`, so an unknown prop is a failed BUILD, not a warning.
  const TRY = { ...base.primaryCTA, label: 'Try Hanzo', href: CONSOLE }

  return (
    <div style={MENU_COLUMNS}>
      <HanzoHeader
        surface={{
          ...base,
          localNav,
          secondaryCTA: DOCS,
          primaryCTA: TRY,
        }}
        productsTaxonomy={PRODUCTS_TAXONOMY}
        commands={SITE_PAGES}
        currentCategoryId={currentCategoryId}
        onAskHanzo={goToChat}
        tryMenu
      />
    </div>
  )
}

/** The footer, same on every face. `currentProductId` marks where you are. */
export function SiteFooter({ surface }: { surface: 'ai' | 'cloud' }) {
  return <HanzoFooter currentProductId={surface} visible={shown} />
}
