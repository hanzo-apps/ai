'use client'


import React from "react";
import { Cpu, HardDrive, Globe, CircuitBoard } from "lucide-react";
import { motion } from "@/components/motion";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";
import { Box } from '@hanzo/ui'

const cardAnimation = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15
});

const ResourceBreakdown = () => {
  const resources = [
    {
      name: "Compute (CPU)",
      icon: <Cpu className="h-5 w-5" />,
      description: "CPU cost across all services",
      cost: "$0.0021 per vCPU/hour",
      percentage: 35
    },
    {
      name: "Memory (RAM)",
      icon: <CircuitBoard className="h-5 w-5" />,
      description: "Memory cost across all services",
      cost: "$0.0015 per GB/hour",
      percentage: 45
    },
    {
      name: "Storage",
      icon: <HardDrive className="h-5 w-5" />,
      description: "Persistent volume storage",
      cost: "$0.00015 per GB/hour",
      percentage: 15
    },
    {
      name: "Network Egress",
      icon: <Globe className="h-5 w-5" />,
      description: "Outbound data transfer",
      cost: "$0.10 per GB",
      percentage: 5
    }
  ];

  return (
    <motion.div 
      variants={cardAnimation}
      className="rounded-xl border border-neutral-800 bg-neutral-900/20 overflow-hidden p-6"
    >
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => (
          <Box 
            key={index} 
            className="bg-[var(--black)]/30 rounded-xl p-5 border border-neutral-800"
          >
            <Box className="flex items-center gap-3 mb-4">
              <Box className="text-muted-foreground">
                {resource.icon}
              </Box>
              <Box className="font-medium">{resource.name}</Box>
            </Box>
            
            <Box className="mb-4">
              <Box className="text-sm text-muted-foreground mb-1">{resource.description}</Box>
              <Box className="font-medium">{resource.cost}</Box>
            </Box>
            
            <Box className="w-full bg-neutral-800 rounded-full h-2.5">
              <Box 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${resource.percentage}%` }}
              ></Box>
            </Box>
            <Box className="text-sm text-muted-foreground mt-1">
              {resource.percentage}% of total cost
            </Box>
          </Box>
        ))}
      </Box>
    </motion.div>
  );
};

export default ResourceBreakdown;
