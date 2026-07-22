'use client'

import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/sign/HeroSection"
import Features from "@/components/sign/Features"
import Pricing from "@/components/sign/Pricing"
import OpenSource from "@/components/sign/OpenSource"
import CallToAction from "@/components/sign/CallToAction"

import { ProductFooter } from "@/components/products/ProductFooter"
export default function SignClient() {
  return (
    <>
      <HeroSection />
      <Features />
      <Pricing />
      <OpenSource />
      <CallToAction />
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Sign</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/services/sign" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/sign" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
          <ProductFooter slug="sign" name="Sign" />
    </>
  )
}
