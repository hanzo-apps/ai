import {
  VectorHero,
  VectorFeatures,
  VectorHowItWorks,
  VectorPricing,
  VectorCTA,
} from "@/components/vector"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
export const metadata = {
  title: "Hanzo Vector - High-Performance Vector Database",
  description:
    "Store and search high-dimensional embeddings for semantic search, RAG, and recommendations. Powered by Qdrant.",
}

export default function VectorPage() {
  return (
    <>
      <VectorHero />
      <VectorFeatures />
      <VectorHowItWorks />
      <VectorPricing />
      <OSSRevenueBanner upstreamName="Qdrant" />
      <VectorCTA />
          <ProductFooter slug="vector" name="Vector" />
    </>
  )
}
