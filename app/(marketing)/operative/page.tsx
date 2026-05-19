'use client'


import React from 'react';
import { ArrowRight } from 'lucide-react';
import OperativeHero from '@/components/operator/OperativeHero';
import OperativeFeatures from '@/components/operator/OperativeFeatures';
import OperativeUsage from '@/components/operator/OperativeUsage';
import OperativeModels from '@/components/operator/OperativeModels';
import OperativeDemo from '@/components/operator/OperativeDemo';
import OperativeCTA from '@/components/operator/OperativeCTA';
import { OSSRevenueBanner } from '@/components/oss/OSSRevenueBanner';

import { ProductFooter } from "@/components/products/ProductFooter"
const Operative = () => {
  return (
    <>



      <main>
        <OperativeHero />
        <OperativeFeatures />
        <OperativeUsage />
        <OperativeModels />
        <OperativeDemo />
        <OSSRevenueBanner upstreamName="Anthropic Computer Use" />
        <OperativeCTA />
        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get started with Operative</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/operative" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/operative" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
              <ProductFooter slug="operative" name="Operative" />
</main>


    </>
  );
};

export default Operative;
