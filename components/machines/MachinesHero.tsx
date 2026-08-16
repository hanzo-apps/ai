'use client'


import React from 'react';
import { motion } from "@/components/motion";
import { Button } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const MachinesHero = () => {
  return (
    <section className="py-20 lg:py-32 relative">
      <Box
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, var(--primary)10, transparent)` }}
      />
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Box className="text-center max-w-3xl mx-auto mb-16">
          <Box
            className="rounded-full px-4 py-1 inline-block mb-4"
            style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)" }}
          >
            <span className="text-sm font-medium">High-Performance Computing</span>
          </Box>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to right, var(--primary), #a3a3a3)` }}
          >
            Hanzo Machines
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Rent a machine by the hour, metered to your organization. Ask what sizes and regions exist, price a launch before you make it, and see it in the same list as the workers you already own.
          </p>
          <Box className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="text-primary-foreground px-8 py-6 text-lg"

            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="text-foreground px-8 py-6 text-lg"
              style={{ borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)" }}
            >
              View Documentation
            </Button>
          </Box>
        </Box>

        {/* Hero Hardware Visualization */}
        <Box
          className="relative rounded-xl p-8 overflow-hidden"
          style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)" }}
        >
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Box
              className="bg-card rounded-lg p-4"
              style={{ border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)" }}
            >
              <h3 className="font-medium mb-2">NVIDIA H100</h3>
              <p className="text-sm text-muted-foreground mb-3">Dedicated GPU instances for AI/ML training</p>
              <div className="space-y-3">
                <Box className="bg-secondary rounded-md p-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">VRAM</span>
                  <span className="font-medium">80GB HBM3</span>
                </Box>
                <Box className="bg-secondary rounded-md p-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cores</span>
                  <span className="font-medium">16,896 CUDA</span>
                </Box>
                <Box className="bg-secondary rounded-md p-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tensor Cores</span>
                  <span className="font-medium">528 TCs</span>
                </Box>
              </div>
            </Box>

            <Box
              className="bg-card rounded-lg p-4"
              style={{ border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)" }}
            >
              <h3 className="font-medium mb-2">AMD EPYC 7763</h3>
              <p className="text-sm text-muted-foreground mb-3">High-core count CPU instances</p>
              <div className="space-y-3">
                <Box className="bg-secondary rounded-md p-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cores</span>
                  <span className="font-medium">64 Cores</span>
                </Box>
                <Box className="bg-secondary rounded-md p-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Threads</span>
                  <span className="font-medium">128 Threads</span>
                </Box>
                <Box className="bg-secondary rounded-md p-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Memory</span>
                  <span className="font-medium">Up to 2TB</span>
                </Box>
              </div>
            </Box>

            <Box
              className="bg-card rounded-lg p-4"
              style={{ border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)" }}
            >
              <h3 className="font-medium mb-2">Storage Options</h3>
              <p className="text-sm text-muted-foreground mb-3">Ultra-fast NVMe and persistent storage</p>
              <div className="space-y-3">
                <Box className="bg-secondary rounded-md p-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Local NVMe</span>
                  <span className="font-medium">Up to 8TB</span>
                </Box>
                <Box className="bg-secondary rounded-md p-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Network Storage</span>
                  <span className="font-medium">Unlimited</span>
                </Box>
                <Box className="bg-secondary rounded-md p-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">I/O Performance</span>
                  <span className="font-medium">7GB/s</span>
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default MachinesHero;
