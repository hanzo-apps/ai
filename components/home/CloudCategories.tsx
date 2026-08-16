'use client'

import { ArrowRight } from 'lucide-react'
import { YStack } from '@hanzo/gui'
import { CardGrid, Cta, Section, type CardItem } from '@/components/marketing/page-kit'
import { cloudCategories } from '@/lib/data/cloud-primitives'

/**
 * The breadth of the cloud, on the apex — six groups, not a catalog.
 *
 * Ten categories used to render here with every product in each one named,
 * because the only designed path to the full set was a breadcrumb on a generated
 * stub page. The path is what mattered and the inventory was the cost: the
 * complete list belongs in the product catalog, which is a page built to be
 * read that way, and a landing page repeating it is a second copy that answers
 * a question nobody asked here. Six groups say the shape; /products says the
 * rest.
 *
 * WEB3 AND APPS ARE NOT PRIMARY. Both are real categories in the catalog and
 * both keep their /products page — they are simply not one of the six a reader
 * needs to understand what this cloud is. Settlement, the part of web3 that
 * belongs on this page, is named under Network.
 *
 * TITLE, ICON AND LINK ARE DERIVED from `lib/data/cloud-primitives.ts` — the
 * same source as the mega-menu and the `/products/<id>` pages — so a link here
 * cannot rot, and a category the catalog drops disappears rather than 404s. The
 * four or five words under each are this page's own: short enough to scan, and
 * every one of them is a product in that category (Enso, which is Hanzo's own
 * model, is named under AI because it is what a reader is looking for there).
 */
const GROUPS: [id: string, items: string][] = [
  ['ai', 'Models, Enso, agents, embeddings'],
  ['compute', 'GPU, functions, machines, Kubernetes'],
  ['data', 'SQL, vector, KV, storage, analytics'],
  ['observe', 'Insights, logs, metrics, traces, evals'],
  ['security', 'Identity, authorization, secrets, zero trust'],
  ['network', 'Gateway, networking, edge, settlement'],
]

const CATEGORIES: CardItem[] = GROUPS.flatMap(([id, items]) => {
  const category = cloudCategories.find((c) => c.id === id)
  return category
    ? [{ title: category.title, icon: category.icon, description: items, href: `/products/${id}` }]
    : []
})

export default function CloudCategories() {
  return (
    <Section
      title="More than an AI layer."
      lede="Each one is a route on api.hanzo.ai/v1 — same key, same base URL."
    >
      <CardGrid items={CATEGORIES} columns={3} />
      <YStack marginTop="$5">
        <Cta href="/products" icon={ArrowRight}>
          Explore all products
        </Cta>
      </YStack>
    </Section>
  )
}
