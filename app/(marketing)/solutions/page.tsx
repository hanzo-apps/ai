'use client'


import React from "react";
import SolutionsHero from "@/components/solutions/Hero";
import MainCards from "@/components/solutions/MainCards";
import UnifiedAICloud from "@/components/solutions/UnifiedAICloud";
import ExpertServices from "@/components/solutions/ExpertServices";
import CallToAction from "@/components/index3/CallToAction";
import { Box } from '@hanzo/ui'

const Solutions: React.FC = () => {
  return (
    <Box className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      
      
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <Box className="max-w-7xl mx-auto">
          <SolutionsHero />
          <MainCards />
          <UnifiedAICloud />
          <ExpertServices />
          <CallToAction />
        </Box>
      </main>

      
    </Box>
  );
};

export default Solutions;
