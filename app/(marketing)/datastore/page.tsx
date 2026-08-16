import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/datastore/HeroSection"
import KeyFeatures from "@/components/datastore/KeyFeatures"
import EfficiencySection from "@/components/datastore/EfficiencySection"
import UseCasesSection from "@/components/datastore/UseCasesSection"
import GetStartedSection from "@/components/datastore/GetStartedSection"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
import { Box } from '@hanzo/ui'
export const metadata = {
  title: "Hanzo Datastore — a column store for analytical SQL",
  description:
    "Each column of a table lives in its own compressed file, so a query reads only the columns it names and aggregates them with vector instructions. Built for dashboards, event analytics, metrics, logs and traces.",
}

export default function DatastorePage() {
  return (
    <>
      <HeroSection />
      <KeyFeatures />
      <EfficiencySection />
      <UseCasesSection />
      <OSSRevenueBanner upstreamName="Datastore" />
      <GetStartedSection />
      <section className="py-16 border-t border-neutral-800">
        <Box className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Load a table and ask it something</h2>
          <Box className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/datastore" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/datastore" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </Box>
                <ProductFooter slug="datastore" name="Datastore" />
</Box>
      </section>
    </>
  )
}
