'use client'


import React from 'react';
import { ArrowRight } from 'lucide-react';
import MachinesHero from "@/components/machines/MachinesHero";
import MachinesFeatures from "@/components/machines/MachinesFeatures";
import MachinesUseCases from "@/components/machines/MachinesUseCases";
import MachinesEnterprise from "@/components/machines/MachinesEnterprise";
import MachinesCTA from "@/components/machines/MachinesCTA";

const Machines = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">

      <MachinesHero />
      <MachinesFeatures />
      <MachinesUseCases />
      <MachinesEnterprise />
      <MachinesCTA />

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Machines</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/machines" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Machines;
