import { notFound } from 'next/navigation'
import { CloudPrimitiveOverview } from '@/components/cloud/CloudPrimitiveOverview'
import { cloudPrimitiveSlugs, getPrimitive, getPrimitiveCategory } from '@/lib/data/cloud-primitives'

// Every cloud primitive without a bespoke page is pre-rendered here, so the
// mega-menu can link to it with zero risk of a 404 in the static export.
export function generateStaticParams() {
  return cloudPrimitiveSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const primitive = getPrimitive(slug)
  if (!primitive) return {}
  return {
    title: `${primitive.title} — Hanzo Cloud`,
    description: primitive.description ?? primitive.tagline,
  }
}

export default async function CloudPrimitivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const primitive = getPrimitive(slug)
  if (!primitive) notFound()
  return <CloudPrimitiveOverview primitive={primitive} category={getPrimitiveCategory(slug)} />
}
