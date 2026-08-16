'use client'

import React, { useState } from "react";
import UsageOverview from "@/components/usage/UsageOverview";
import ProjectUsage from "@/components/usage/ProjectUsage";
import ResourceBreakdown from "@/components/usage/ResourceBreakdown";
import DateRangePicker from "@/components/usage/DateRangePicker";
import AnimatedSection, { AnimatedHeading } from "@/components/ui/animated-section";
import { Box } from '@hanzo/ui'

const Usage = () => {
  const [dateRange, setDateRange] = useState({ start: "Mar 7", end: "Mar 8" });

  return (
    <Box className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      
      
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <Box className="max-w-6xl mx-auto">
          <AnimatedSection>
            <Box className="flex justify-between items-center mb-8">
              <AnimatedHeading>Usage</AnimatedHeading>
              <DateRangePicker 
                dateRange={dateRange} 
                onDateRangeChange={setDateRange} 
              />
            </Box>

            <UsageOverview 
              dateRange={dateRange}
              currentUsage="$0.04"
              discounts="$0.00"
              creditsUsed="$0.00"
              estimatedCost="$0.07"
              creditsAvailable="5.00"
              creditsRequired="0.00"
            />
            
            <Box className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Usage by Project</h2>
              <ProjectUsage />
            </Box>

            <Box className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Resource Breakdown</h2>
              <ResourceBreakdown />
            </Box>
          </AnimatedSection>
        </Box>
      </main>

      
    </Box>
  );
};

export default Usage;

