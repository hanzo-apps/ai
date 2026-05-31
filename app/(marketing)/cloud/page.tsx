import { ArrowRight } from "lucide-react"
import ZenBackground from "@/components/zen/ZenBackground"
import ZenQuoteSection from "@/components/zen/ZenQuoteSection"
import OSSComputeDividends from "@/components/oss/OSSComputeDividends"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"
import CloudHero from "@/components/cloud/CloudHero"
import Features from "@/components/cloud/Features"
import ProductCatalog from "@/components/cloud/ProductCatalog"
import Regions from "@/components/cloud/Regions"
import Security from "@/components/cloud/Security"
import TechStack from "@/components/cloud/TechStack"
import CallToAction from "@/components/cloud/CallToAction"
import DesktopAppBanner from "@/components/DesktopAppBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
export const metadata = {
  title: "Hanzo Cloud - Complete Cloud Platform",
  description:
    "90+ managed services for AI, databases, compute, and more. Build, deploy, and scale modern applications on a unified platform.",
}

export default function CloudPage() {
  return (
    <>
      <ZenBackground />
      <CloudHero />
      <ProductCatalog />
      <ZenQuoteSection
        quote="The engineer who masters the cloud sees no distinction between the physical and the virtual."
        attribution="Principle 27"
      />
      <Features />
      <Regions />
      <Security />
      <TechStack />
      <OSSRevenueBanner />
      <OSSComputeDividends variant="banner" />
      <CallToAction />
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Cloud</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/cloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/cloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="cloud" name="Cloud" />
</div>
      </section>
      <DesktopAppBanner />
    </>
  )
}
