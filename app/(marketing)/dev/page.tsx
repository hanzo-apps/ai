'use client'

import React from "react";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hanzodev/HeroSection";
import WhyHanzo from "@/components/hanzodev/WhyHanzo";
import Features from "@/components/hanzodev/Features";
import OpenModels from "@/components/hanzodev/OpenModels";
import OpenPricing from "@/components/hanzodev/OpenPricing";
import OpenSource from "@/components/hanzodev/OpenSource";
import FAQSection from "@/components/hanzodev/FAQSection";
import FooterCTA from "@/components/hanzodev/FooterCTA";

import { ProductFooter } from "@/components/products/ProductFooter"
const HanzoDev = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">

      <main>
        <HeroSection />
        <WhyHanzo />
        <Features />
        <OpenModels />
        <OpenPricing />
        <OpenSource />
        <FAQSection />
        <FooterCTA />
        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get started with Dev</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
              <ProductFooter slug="dev" name="Dev" />
</main>

    </div>
  );
};

export default HanzoDev;
