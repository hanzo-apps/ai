'use client'


import React from "react";
import { Button } from "@hanzo/ui";
import { motion } from "@/components/motion";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";
import { Box } from '@hanzo/ui'

interface UsageOverviewProps {
  dateRange: {
    start: string;
    end: string;
  };
  currentUsage: string;
  discounts: string;
  creditsUsed: string;
  estimatedCost: string;
  creditsAvailable: string;
  creditsRequired: string;
}

const cardAnimation = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15
});

const UsageOverview = ({
  dateRange,
  currentUsage,
  discounts,
  creditsUsed,
  estimatedCost,
  creditsAvailable,
  creditsRequired
}: UsageOverviewProps) => {
  return (
    <motion.div 
      variants={cardAnimation}
      className="rounded-xl border border-neutral-800 bg-neutral-900/20 overflow-hidden"
    >
      <Box className="p-6 border-b border-neutral-800">
        <h2 className="text-xl font-semibold mb-1">
          {dateRange.start} to {dateRange.end} Credit Usage
        </h2>
      </Box>
      
      <Box className="p-6">
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Box className="flex justify-between items-center">
              <span className="text-muted-foreground">Current Usage</span>
              <span>{currentUsage}</span>
            </Box>
            <Box className="flex justify-between items-center">
              <span className="text-muted-foreground">Discounts</span>
              <span>{discounts}</span>
            </Box>
            <Box className="flex justify-between items-center">
              <span className="text-muted-foreground">Credits Used</span>
              <span>{creditsUsed}</span>
            </Box>
            <Box className="flex justify-between items-center">
              <span className="text-muted-foreground">Estimated Month's Cost</span>
              <span>{estimatedCost}</span>
            </Box>
          </div>
          
          <Box className="bg-neutral-900/30 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <Box className="mb-2">
              <Box className="text-sm text-muted-foreground">Credits Available</Box>
              <Box className="text-3xl font-bold">{creditsAvailable}</Box>
            </Box>
            
            <Box className="mb-6">
              <Box className="text-sm text-foreground/70">Est Credits Required</Box>
              <Box className="text-3xl font-bold text-foreground/70">{creditsRequired}</Box>
            </Box>
            
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
            >
              Purchase Credits
            </Button>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default UsageOverview;
