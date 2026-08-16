'use client'

import {
  HanzoHeader,
  HanzoFooter,
  resolveSurface,
  type HanzoCommandEntry,
  type HanzoLink,
  type HanzoNav,
  type ProductCategory,
} from '@hanzogui/shell'
import { cloudCategories } from '@/lib/data/cloud-primitives'
import { policy } from '@/lib/publish'
import pages from '@/lib/data/pages.json'
import { AGENCY, CONSOLE, DOCS as DOCS_HOST, FOUNDATION, goToChat } from './nav-data'

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

  // The bar names the six things a visitor can be here for, in the order they
  // are usually wanted: what we know, what we sell, who buys it, who builds on
  // it, who we are, and who governs us. It was three entries — Solutions,
  // Resources, Developers — and two of those name a shape of page rather than a
  // reason to click.
  //
  // `glyph` is a NAME from the shell's own MARKS set, never an element, so no
  // surface can give one menu a mark the others cannot draw. `shown()` gates
  // every href against the registry, so a link to a page we do not serve
  // disappears rather than 404s — which is also why each list is written long
  // and filtered rather than trimmed by hand.
  const localNav: HanzoNav[] = ([
    {
      id: 'research',
      label: 'Research',
      href: '/research',
      glyph: 'ring',
      items: ([
        { id: 'papers', label: 'Papers', href: '/research', glyph: 'book', hint: 'What we publish' },
        { id: 'models', label: 'Models', href: '/models', glyph: 'spark', hint: 'Every model we serve' },
        { id: 'zen', label: 'Zen', href: '/zen', glyph: 'circle', hint: 'Our open-weight family' },
        { id: 'open-source', label: 'Open Source', href: '/open-source', glyph: 'package', hint: 'Every tool we build' },
      ] as HanzoLink[]).filter((l) => shown(l.href)),
    },
    // Products sits SECOND, between the research and the commercial pitch,
    // because that is the order a reader asks in: what have you proven, what can
    // I use, what will it cost. It was missing entirely — every product was
    // reachable only through Business, which frames a thing you run as a thing
    // you buy.
    //
    // The primary column is the OS read top-down, the same order the homepage
    // descends: the company, the intelligence, the agents, the cloud beneath
    // them. Nav and page tell one story, or a reader has to reconcile two.
    {
      id: 'products',
      label: 'Products',
      href: '/products',
      glyph: 'blocks',
      items: ([
        { id: 'team', label: 'Hanzo Team', href: '/team', glyph: 'users', hint: 'People and AI coworkers' },
        { id: 'enso', label: 'Enso', href: '/enso', glyph: 'ring', hint: 'The intelligence layer' },
        { id: 'agents', label: 'Agents', href: '/agents', glyph: 'spark', hint: 'Tools, memory and sandboxes' },
        { id: 'cloud', label: 'Hanzo Cloud', href: '/cloud', glyph: 'globe', hint: 'The infrastructure beneath' },
      ] as HanzoLink[]).filter((l) => shown(l.href)),
      groups: [
        {
          id: 'build',
          title: 'Build',
          items: ([
            { id: 'p-dev', label: 'Hanzo Dev', href: '/dev' },
            { id: 'p-code', label: 'Hanzo Code', href: '/code' },
            { id: 'p-base', label: 'Base', href: '/base' },
            { id: 'p-functions', label: 'Functions', href: '/functions' },
            { id: 'p-tabs', label: 'Tabs', href: '/tabs' },
            { id: 'p-mcp', label: 'MCP', href: '/mcp' },
          ] as HanzoLink[]).filter((l) => shown(l.href)),
        },
        {
          id: 'observe',
          title: 'Observe',
          items: ([
            { id: 'p-o11y', label: 'Observability', href: '/o11y' },
            { id: 'p-insights', label: 'Insights', href: '/insights' },
            { id: 'p-analytics', label: 'Analytics', href: '/analytics' },
            { id: 'p-security', label: 'Security', href: '/security' },
          ] as HanzoLink[]).filter((l) => shown(l.href)),
        },
        {
          id: 'run',
          title: 'Run',
          items: ([
            { id: 'p-compute', label: 'Compute', href: '/products/compute' },
            { id: 'p-storage', label: 'Storage', href: '/storage' },
            { id: 'p-database', label: 'Database', href: '/database' },
            { id: 'p-network', label: 'Network', href: '/network' },
            { id: 'p-commerce', label: 'Commerce', href: '/commerce' },
          ] as HanzoLink[]).filter((l) => shown(l.href)),
        },
      ],
    },
    {
      id: 'business',
      label: 'Business',
      href: '/solutions',
      glyph: 'blocks',
      items: ([
        { id: 'solutions', label: 'Solutions', href: '/solutions', glyph: 'blocks', hint: 'By industry and by job' },
        { id: 'customers', label: 'Customers', href: '/customers', glyph: 'users', hint: 'Teams building on Hanzo' },
        { id: 'pricing', label: 'Pricing', href: '/pricing', glyph: 'card', hint: 'Plans and rates' },
        { id: 'contact', label: 'Contact sales', href: '/contact', glyph: 'chat', hint: 'Talk to us' },
      ] as HanzoLink[]).filter((l) => shown(l.href)),
      groups: [
        {
          id: 'by-need',
          title: 'Solutions',
          items: ([
            { id: 'agents', label: 'Agents', href: '/agents' },
            { id: 'search', label: 'Search', href: '/search' },
            { id: 'data', label: 'Data', href: '/products/data' },
            { id: 'compute', label: 'Compute', href: '/products/compute' },
            { id: 'security', label: 'Security', href: '/security' },
          ] as HanzoLink[]).filter((l) => shown(l.href)),
        },
        {
          id: 'services',
          title: 'Services',
          items: [
            { id: 'agency', label: 'Agency', href: AGENCY, external: true },
            { id: 'support', label: 'Enterprise support', href: '/contact' },
          ] as HanzoLink[],
        },
      ],
    },
    {
      id: 'developers',
      label: 'Developers',
      href: '/dev',
      glyph: 'code',
      items: ([
        { id: 'docs', label: 'Docs', href: DOCS_HOST, glyph: 'book', hint: 'docs.hanzo.ai', external: true },
        { id: 'api', label: 'API', href: '/api', glyph: 'gateway', hint: 'One endpoint, one key' },
        { id: 'sdks', label: 'SDKs', href: '/sdks', glyph: 'package', hint: 'Python, TypeScript, Go, Rust' },
        { id: 'cli', label: 'CLI', href: '/cli', glyph: 'terminal', hint: 'Hanzo from a terminal' },
        { id: 'dev', label: 'Hanzo Dev', href: '/dev', glyph: 'code', hint: 'The coding agent' },
        { id: 'learn', label: 'Learn', href: '/learn', glyph: 'cap', hint: 'Guides and walkthroughs' },
      ] as HanzoLink[]).filter((l) => shown(l.href)),
      groups: [
        {
          id: 'reference',
          title: 'Resources',
          items: [
            { id: 'docs-ref', label: 'Docs', href: DOCS_HOST, external: true },
            { id: 'quickstart', label: 'Quickstart', href: `${DOCS_HOST}/docs/getting-started`, external: true },
            { id: 'api-ref', label: 'API reference', href: `${DOCS_HOST}/docs/api`, external: true },
            { id: 'status', label: 'Status', href: '/status' },
          ] as HanzoLink[],
        },
        {
          id: 'build-on',
          title: 'Build on Hanzo',
          items: ([
            { id: 'console', label: 'Console', href: CONSOLE, external: true },
            { id: 'open-source-dev', label: 'Open source', href: '/open-source' },
            { id: 'mcp', label: 'MCP', href: '/mcp' },
          ] as HanzoLink[]).filter((l) => shown(l.href)),
        },
      ],
    },
    {
      id: 'company',
      label: 'Company',
      href: '/about',
      glyph: 'user',
      items: ([
        { id: 'about', label: 'About', href: '/about', glyph: 'user', hint: 'Who we are' },
        { id: 'careers', label: 'Careers', href: '/careers', glyph: 'rocket', hint: 'Work here' },
        { id: 'blog', label: 'Blog', href: '/blog', glyph: 'book', hint: 'News and deep dives' },
        { id: 'press', label: 'Press', href: '/press', glyph: 'display', hint: 'Media and brand' },
        { id: 'trust', label: 'Trust', href: '/trust', glyph: 'shield', hint: 'Security and compliance' },
        { id: 'investors', label: 'Investors', href: '/investors', glyph: 'card', hint: 'Backing this' },
      ] as HanzoLink[]).filter((l) => shown(l.href)),
      // The reference gives Company a Resources column, and these four are the
      // pages a reader looks for AFTER deciding they care who we are: the mark,
      // how we think, what we fund, and whether it is up right now. None of them
      // belongs in the primary list — that column is who we are, not what we
      // publish.
      groups: [
        {
          id: 'company-resources',
          title: 'Resources',
          items: ([
            { id: 'c-brand', label: 'Brand', href: '/brand' },
            { id: 'c-philosophy', label: 'Philosophy', href: '/philosophy' },
            { id: 'c-osfund', label: 'Open Source Fund', href: '/open-source-fund' },
            { id: 'c-status', label: 'Status', href: '/status' },
          ] as HanzoLink[]).filter((l) => shown(l.href)),
        },
      ],
    },
    // Zoo Labs Foundation governs Hanzo, so it is a peer of the company entry
    // rather than a link buried inside it.
    { id: 'foundation', label: 'Foundation', href: FOUNDATION, glyph: 'globe', external: true },
  ] as HanzoNav[]).filter((l) => shown(l.href))

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
