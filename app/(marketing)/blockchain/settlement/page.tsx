import { CloudPrimitiveOverview } from '@/components/cloud/CloudPrimitiveOverview'
import { getPrimitive, getPrimitiveCategory } from '@/lib/data/cloud-primitives'

// Chain primitives live under /blockchain to match the existing on-chain
// section; the overview is rendered from the same single taxonomy source.
const settlement = getPrimitive('settlement')!

export const metadata = {
  title: `${settlement.title} — Hanzo Chain`,
  description: settlement.description ?? settlement.tagline,
}

export default function SettlementPage() {
  return <CloudPrimitiveOverview primitive={settlement} category={getPrimitiveCategory('settlement')} />
}
