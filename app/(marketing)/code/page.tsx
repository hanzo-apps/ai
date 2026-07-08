'use client'


import React from "react";
import { ArrowRight } from "lucide-react";
import HanzoCodeHero from "@/components/hanzocode/HanzoCodeHero";
import HanzoCodeFeatures from "@/components/hanzocode/HanzoCodeFeatures";
import HanzoCodeBenefits from "@/components/hanzocode/HanzoCodeBenefits";
import HanzoCodeFrontier from "@/components/hanzocode/HanzoCodeFrontier";
import HanzoCodeCTA from "@/components/hanzocode/HanzoCodeCTA";
import HanzoCodeCompanies from "@/components/hanzocode/HanzoCodeCompanies";
import HanzoCodeCompatibility from "@/components/hanzocode/HanzoCodeCompatibility";
import HanzoCodeAgents from "@/components/hanzocode/HanzoCodeAgents";

import { ProductFooter } from "@/components/products/ProductFooter"
const HanzoCode = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">

      <main>
        <HanzoCodeHero />
        <HanzoCodeCompanies />
        <HanzoCodeBenefits />
        <HanzoCodeCompatibility />
        <HanzoCodeAgents />
        <HanzoCodeFeatures />
        <HanzoCodeFrontier />
        <HanzoCodeCTA />
        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get started with Code</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/code" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/code" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
              <ProductFooter slug="code" name="Code" />
</main>

    </div>
  );
};

export default HanzoCode;
