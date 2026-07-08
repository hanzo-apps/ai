'use client'


import React from "react";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/base/HeroSection";
import CoreFeatures from "@/components/base/CoreFeatures";
import Templates from "@/components/base/Templates";
import DeveloperExperience from "@/components/base/DeveloperExperience";
import Infrastructure from "@/components/base/Infrastructure";
import AIEngineering from "@/components/base/AIEngineering";
import CallToAction from "@/components/base/CallToAction";
import Community from "@/components/base/Community";
import Compliance from "@/components/base/Compliance";

import { ProductFooter } from "@/components/products/ProductFooter"
const Base = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">

      <main>
        <HeroSection />
        <CoreFeatures />
        <Templates />
        <DeveloperExperience />
        <Infrastructure />
        <AIEngineering />
        <Compliance />
        <CallToAction />
        <Community />
        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get started with Base</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/base" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/base" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
              <ProductFooter slug="base" name="Base" />
</main>

    </div>
  );
};

export default Base;
