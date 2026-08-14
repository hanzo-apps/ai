import {
  SearchHero,
  SearchFeatures,
  SearchHowItWorks,
  SearchPricing,
  SearchCTA,
} from "@/components/search"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
export const metadata = {
  title: "Hanzo Search — keyword and meaning in the same query",
  description:
    "Push your documents once. Full text finds the exact string, vector search finds the thing you described, and one request runs both and returns a single ranked list. Point a model at the same index for answers with sources.",
}

export default function SearchPage() {
  return (
    <>
      <SearchHero />
      <SearchFeatures />
      <SearchHowItWorks />
      <SearchPricing />
      <OSSRevenueBanner upstreamName="Meilisearch" />
      <SearchCTA />
          <ProductFooter slug="search" name="Search" />
    </>
  )
}
