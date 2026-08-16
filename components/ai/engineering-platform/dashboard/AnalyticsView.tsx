'use client'


import React from "react";
import { motion } from "@/components/motion";
import { BarChart, Terminal } from "lucide-react";
import { Box } from '@hanzo/ui'

const AnalyticsView = () => {
  return (
    <div className="space-y-4">
      <Box className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[var(--white)]">AI Analytics</h3>
        <div className="flex space-x-2">
          <button className="px-2 py-1 bg-primary/40 rounded-md text-xs text-foreground/70 flex items-center">
            <BarChart className="w-3 h-3 mr-1" />
            Reports
          </button>
          <button className="px-2 py-1 bg-neutral-800 rounded-md text-xs text-muted-foreground flex items-center">
            <Terminal className="w-3 h-3 mr-1" />
            Export
          </button>
        </div>
      </Box>

      <Box className="grid grid-cols-2 gap-3 mb-4">
        <Box className="bg-neutral-800/40 border border-neutral-700/40 rounded-lg p-3">
          <Box className="text-xs text-muted-foreground mb-1">Model Usage</Box>
          <Box className="relative h-32 mt-2">
            <Box className="absolute inset-0">
              <Box className="h-full w-full flex">
                <motion.div 
                  className="h-full bg-primary/70 rounded-l"
                  initial={{ width: 0 }}
                  animate={{ width: "42%" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
                <motion.div 
                  className="h-full bg-primary/70"
                  initial={{ width: 0 }}
                  animate={{ width: "28%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.div 
                  className="h-full bg-primary/10"
                  initial={{ width: 0 }}
                  animate={{ width: "15%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.div 
                  className="h-full bg-primary/10 rounded-r"
                  initial={{ width: 0 }}
                  animate={{ width: "15%" }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="grid grid-cols-2 gap-2 mt-3">
            <Box className="flex items-center">
              <Box className="w-2 h-2 rounded-full bg-primary mr-2"></Box>
              <span className="text-xs text-foreground/80">Zen (42%)</span>
            </Box>
            <Box className="flex items-center">
              <Box className="w-2 h-2 rounded-full bg-primary/10 mr-2"></Box>
              <span className="text-xs text-foreground/80">Claude (28%)</span>
            </Box>
            <Box className="flex items-center">
              <Box className="w-2 h-2 rounded-full bg-primary/10 mr-2"></Box>
              <span className="text-xs text-foreground/80">Llama 4 (15%)</span>
            </Box>
            <Box className="flex items-center">
              <Box className="w-2 h-2 rounded-full bg-primary/10 mr-2"></Box>
              <span className="text-xs text-foreground/80">Others (15%)</span>
            </Box>
          </Box>
        </Box>
        <Box className="bg-neutral-800/40 border border-neutral-700/40 rounded-lg p-3">
          <Box className="text-xs text-muted-foreground mb-1">Cost Analysis</Box>
          <Box className="h-32 relative">
            <div className="absolute bottom-0 w-full flex items-end space-x-1">
              {[35, 42, 38, 52, 45, 55, 47, 62, 48, 60, 53, 58].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-t from-white/90 to-white/10 rounded-t w-full"
                  style={{ height: `${value}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
              ))}
            </div>
          </Box>
          <Box className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </Box>
          <Box className="mt-1 text-xs text-foreground/80">
            $1,245 spent this month - <span className="text-foreground">14% under budget</span>
          </Box>
        </Box>
      </Box>

      <Box className="bg-neutral-800/40 border border-neutral-700/40 rounded-lg p-3">
        <Box className="text-xs text-muted-foreground mb-2">Performance Metrics</Box>
        <div className="space-y-3">
          <div>
            <Box className="flex justify-between text-xs mb-1">
              <span className="text-foreground/80">Response Quality</span>
              <span className="text-foreground/80">89%</span>
            </Box>
            <Box className="w-full bg-neutral-700/40 rounded-full h-1.5">
              <motion.div 
                className="bg-primary/10 h-1.5 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "89%" }}
                transition={{ duration: 0.8 }}
              />
            </Box>
          </div>
          <div>
            <Box className="flex justify-between text-xs mb-1">
              <span className="text-foreground/80">User Satisfaction</span>
              <span className="text-foreground/80">94%</span>
            </Box>
            <Box className="w-full bg-neutral-700/40 rounded-full h-1.5">
              <motion.div 
                className="bg-primary/10 h-1.5 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </Box>
          </div>
          <div>
            <Box className="flex justify-between text-xs mb-1">
              <span className="text-foreground/80">System Reliability</span>
              <span className="text-foreground/80">99.8%</span>
            </Box>
            <Box className="w-full bg-neutral-700/40 rounded-full h-1.5">
              <motion.div 
                className="bg-primary/10 h-1.5 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "99.8%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AnalyticsView;
