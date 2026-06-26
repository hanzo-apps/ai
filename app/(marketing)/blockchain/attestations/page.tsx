import { CloudPrimitiveOverview } from '@/components/cloud/CloudPrimitiveOverview'
import { getPrimitive, getPrimitiveCategory } from '@/lib/data/cloud-primitives'

const attestations = getPrimitive('attestations')!

export const metadata = {
  title: `${attestations.title} — Hanzo Chain`,
  description: attestations.description ?? attestations.tagline,
}

export default function AttestationsPage() {
  return <CloudPrimitiveOverview primitive={attestations} category={getPrimitiveCategory('attestations')} />
}
