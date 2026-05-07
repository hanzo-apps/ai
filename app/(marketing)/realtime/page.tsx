'use client'


import React from "react";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/realtime/HeroSection";
import Features from "@/components/realtime/Features";
import UseCases from "@/components/realtime/UseCases";
import Integration from "@/components/realtime/Integration";
import Scaling from "@/components/realtime/Scaling";
import CallToAction from "@/components/realtime/CallToAction";

const Realtime = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">

      <main>
        <HeroSection />
        <Features />
        <UseCases />
        <Integration />
        <Scaling />
        <CallToAction />
        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get started with Realtime</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/realtime" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/realtime" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Realtime;
