/**
 * shell-products — adapts hanzo.ai's OWN cloud taxonomy (`cloudCategories`, the
 * single source of truth in `cloud-primitives.ts`) to the shape the shared shell
 * renders (`@hanzogui/shell`'s `ProductCategory[]`).
 *
 * This keeps `cloud-primitives.ts` as THE source of truth — it still drives the
 * `/products/<slug>` landing pages and the `/cloud/[slug]` overview routes — while
 * letting the shared `HanzoHeader`/`ProductsMegaMenu` render the identical ten-
 * category menu. The adapter only reshapes (drops the lucide icons the inline-
 * styled shell doesn't use); it invents no links, so the menu can never drift
 * from the routes.
 */
import type { ProductCategory } from '@hanzogui/shell'
import { cloudCategories, categorySlug } from '@/lib/data/cloud-primitives'

export const shellProductCategories: ProductCategory[] = cloudCategories.map((category) => ({
  id: categorySlug(category.title),
  label: category.title,
  // Category header links to its /products/<slug> landing page (same route the
  // page tree generates from `categorySlugs`).
  href: `/products/${categorySlug(category.title)}`,
  tagline: category.tagline,
  items: category.items.map((item) => ({
    // Title is unique within a category; the Web3 leaves share an href
    // (lux.cloud/services), so slug the title for a stable, collision-free id.
    id: categorySlug(item.title),
    label: item.title,
    href: item.href,
    hint: item.desc,
    external: item.external,
  })),
}))
