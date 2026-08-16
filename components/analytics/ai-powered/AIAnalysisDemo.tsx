'use client'


import React from "react";
import { motion } from "@/components/motion";
import { LineChart } from "lucide-react";
import { Box } from '@hanzo/ui'

const AIAnalysisDemo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-r from-neutral-900 to-neutral-900/50 rounded-xl p-6 border border-neutral-800 shadow-xl overflow-hidden relative"
    >
      <div className="absolute inset-0 hz-grid" style={{ '--hz-grid-size': '24px', '--hz-grid-opacity': '0.02' } as React.CSSProperties}></div>
      
      <Box className="relative z-10">
        <Box className="flex items-center mb-6">
          <LineChart className="h-6 w-6 text-foreground mr-3" />
          <h3 className="text-2xl font-bold">AI Analysis in Action</h3>
        </Box>
        
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Box className="col-span-2">
            <Box className="bg-[var(--black)]/50 rounded-lg p-5 border border-neutral-800">
              <h4 className="text-lg font-medium mb-4">Traffic Anomaly Detection</h4>
              <Box className="h-60 relative">
                {/* Base line chart */}
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <motion.path
                    d="M0,80 C25,70 50,65 75,60 C100,55 125,50 150,55 C175,60 200,80 225,50 C250,20 275,35 300,30"
                    fill="none"
                    stroke="var(--pure-white)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                  />
                  
                  {/* Anomaly area */}
                  <motion.path
                    d="M200,80 C206,65 212,40 218,20 C224,30 230,45 236,50"
                    fill="none"
                    stroke="var(--neutral-400)"
                    strokeWidth="3"
                    strokeDasharray="2,2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 1.8 }}
                  />
                  
                  {/* Anomaly circle */}
                  <motion.circle
                    cx="218"
                    cy="20"
                    r="5"
                    fill="#a3a3a3"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 2 }}
                  />
                </svg>
                
                {/* Anomaly detection popup */}
                <motion.div
                  className="absolute top-4 right-8 bg-primary/10 text-[var(--white)] text-xs rounded px-3 py-2 border border-border"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 2.2 }}
                >
                  <Box className="font-bold mb-1">Anomaly Detected</Box>
                  <div>Unusual traffic spike</div>
                  <div>Confidence: 98.7%</div>
                </motion.div>
              </Box>
            </Box>
          </Box>
          
          <div className="space-y-4">
            <Box className="bg-[var(--black)]/50 rounded-lg p-5 border border-neutral-800">
              <h4 className="text-lg font-medium mb-3">AI Insights</h4>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.4 }}
                className="space-y-3"
              >
                <Box className="text-sm">
                  <Box className="font-medium text-foreground/70">Traffic Anomaly</Box>
                  <Box className="text-muted-foreground">Unusual spike detected at 14:32 UTC</Box>
                </Box>
                <Box className="text-sm">
                  <Box className="font-medium text-foreground/70">Conversion Opportunity</Box>
                  <Box className="text-muted-foreground">Checkout abandonment 23% higher on mobile</Box>
                </Box>
                <Box className="text-sm">
                  <Box className="font-medium text-foreground/70">Performance Alert</Box>
                  <Box className="text-muted-foreground">API latency increased by 150ms</Box>
                </Box>
              </motion.div>
            </Box>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.6 }}
              className="bg-primary/10 rounded-lg p-5 border border-border"
            >
              <h4 className="text-lg font-medium mb-2">AI Recommendation</h4>
              <p className="text-sm text-foreground/80">
                Based on the traffic pattern analysis, we recommend scaling your infrastructure in the US-West region for the next 3 hours.
              </p>
              <button className="mt-3 text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 rounded">
                Apply Recommendation
              </button>
            </motion.div>
          </div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default AIAnalysisDemo;
