'use client'

import { HanzoHeader, HanzoFooter, resolveSurface, type ProductCategory } from '@hanzogui/shell'
import { categorySlug, cloudCategories } from '@/lib/data/cloud-primitives'
import { CONSOLE, goToChat } from './nav-data'

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
  const href = `/products/${categorySlug(category.title)}`
  return {
    id: categorySlug(category.title),
    label: category.title,
    href,
    // The note is the scope caveat ("fiat only") and belongs wherever the
    // category is named, so it rides the one line the menu gives us — unless
    // the tagline already says it, as Web3's does about Lux. Appending it there
    // said "powered by Lux" twice and overran the line into an ellipsis.
    tagline:
      category.note && !category.tagline.toLowerCase().includes(category.note.toLowerCase())
        ? `${category.tagline} · ${category.note}`
        : category.tagline,
    items: [
      ...category.items.slice(0, MENU_LEAVES).map((item) => ({
        id: item.slug ?? categorySlug(item.title),
        label: item.title,
        href: item.href,
        hint: item.desc,
        // Web3 leaves are Lux Network surfaces on lux.cloud — off-property, so
        // they open in a new tab and never claim to be a Hanzo page.
        external: Boolean(item.external),
      })),
      // Categories run 7-15 deep and the tiles must stay level across a 2x5
      // grid, so every tile shows the same five and then says how many more
      // there are. The count is the honest part: it names what the link is for,
      // so nothing is dropped quietly — the category page lists all of them.
      {
        id: `${categorySlug(category.title)}-all`,
        label: `All ${category.items.length} →`,
        href,
      },
    ],
  }
})

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
  const DOCS = { id: 'docs', label: 'Documentation', href: 'https://docs.hanzo.ai' }

  // Both registry surfaces carry docs.hanzo.ai TWICE in the header — once as a
  // "Developers" nav item and again as "Docs" (cloud) or the secondary CTA
  // (ai) — so the same destination competed with itself in two places. Docs is
  // the secondary action; the nav keeps the pages only this site serves.
  //
  // The cloud primary was "Open Console" and its secondary "Get API key", which
  // put THREE console.hanzo.ai actions in one header next to the sign-in. One
  // primary is enough: `Start building`, with `Sign in` beside it.
  const localNav = base.localNav.filter((l) => !l.href.startsWith('https://docs.hanzo.ai'))

  return (
    <HanzoHeader
      surface={{
        ...base,
        localNav,
        secondaryCTA: DOCS,
        ...(surface === 'cloud'
          ? { primaryCTA: { ...base.primaryCTA, label: 'Start building', href: CONSOLE } }
          : null),
      }}
      productsTaxonomy={PRODUCTS_TAXONOMY}
      currentCategoryId={currentCategoryId}
      signInHref={CONSOLE}
      onAskHanzo={goToChat}
    />
  )
}

/** The footer, same on every face. `currentProductId` marks where you are. */
export function SiteFooter({ surface }: { surface: 'ai' | 'cloud' }) {
  return <HanzoFooter currentProductId={surface} />
}
