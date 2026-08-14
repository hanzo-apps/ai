'use client'

import { CardGrid, Section, type CardItem } from '@/components/marketing/page-kit'
import { categorySlug, cloudCategories } from '@/lib/data/cloud-primitives'

/**
 * The cloud taxonomy, on the apex.
 *
 * The ten categories used to appear nowhere on hanzo.ai's front page: the only
 * designed path to the full set of capabilities was a breadcrumb on a generated
 * stub page, so most of them were reachable only by accident. This is that path,
 * made deliberate — every category card links to its `/products/<slug>` page,
 * which lists and links each of its six capabilities.
 *
 * Content is DERIVED from `lib/data/cloud-primitives.ts` — the same single source
 * the mega-menu, the `/products/<slug>` category pages and the generated
 * `/cloud/<slug>` overview pages read — so a category cannot appear here without
 * its page existing, no count can drift, and no link can rot. The card body is
 * the six capability names rather than the category tagline: the tagline is the
 * first thing the destination page says, while the names are what make the
 * breadth legible from the front page.
 *
 * Shapes come from `components/marketing/page-kit` (`Section` + `CardGrid` +
 * `Cta`), which renders from the @hanzo/design tokens through gui — so this
 * section carries no styling of its own and stays in step with every other
 * marketing surface.
 */
// The /products landings are withdrawn (lib/publish), so a card leads to the
// category's first published leaf — cloudCategories is already that projection.
const CATEGORIES: CardItem[] = cloudCategories.map((c) => ({
  title: c.title,
  icon: c.icon,
  description: c.items.map((i) => i.title).join(' · '),
  href: c.items[0]?.href ?? '/',
}))

export default function CloudCategories() {
  return (
    <Section
      title="Every capability. One API."
      lede="Every capability is one route on api.hanzo.ai/v1. Open source, metered, and settled on-chain."
    >
      <CardGrid items={CATEGORIES} columns={2} />
    </Section>
  )
}
