import { notFound } from 'next/navigation'
import { CloudCategoryOverview } from '@/components/cloud/CloudCategoryOverview'
import { categorySlugs, getCategoryBySlug } from '@/lib/data/cloud-primitives'

// One category landing page per cloud primitive, generated from the single nav
// taxonomy (lib/data/cloud-primitives.ts) — the SAME source the products
// mega-menu reads. `/products/ai`, `/products/compute`, … each list and link
// every product in the category.
export function generateStaticParams() {
  return categorySlugs.map((categoryId) => ({ categoryId }))
}

export async function generateMetadata({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const category = getCategoryBySlug(categoryId)
  if (!category) return {}
  return {
    title: `${category.title} — Hanzo Cloud`,
    description: category.tagline,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  if (!getCategoryBySlug(categoryId)) notFound()
  return <CloudCategoryOverview slug={categoryId} />
}
