'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Button } from "@hanzo/ui";
import { ArrowRight, LineChart } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import { Box } from '@hanzo/ui'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32 overflow-hidden">
      <Box className="absolute inset-0 bg-[var(--black)] z-0" />
      
      {/* Animated dots/points background */}
      <Box className="absolute inset-0 overflow-hidden opacity-30">
        {Array(20).fill(0).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </Box>
      
      <Box className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <Box className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-white/30 text-foreground/70 text-sm font-medium mb-6">
            Web analytics you host yourself
          </Box>
          <ChromeText as="h1" className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Hanzo Analytics
          </ChromeText>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Traffic, sessions and revenue for the sites you run, in a dashboard you can read
            without training. It is one script on the page and one database you own — no
            sampling, no data-processing agreement, and no export limits on your own numbers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 border-none text-primary-foreground">
            <a href="#start-free-trial">Start Free Trial</a>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            <a href="#request-demo" className="flex items-center">
              Request Demo <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-5xl mx-auto relative"
        >
          <Box className="bg-gradient-to-br from-neutral-900 to-background p-4 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden">
            <Box className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-2">
              <Box className="flex items-center">
                <LineChart className="h-5 w-5 text-foreground mr-2" />
                <span className="text-[var(--white)] font-medium">Hanzo Analytics Dashboard</span>
              </Box>
              <div className="flex space-x-1">
                <Box className="w-3 h-3 rounded-full bg-primary/10"></Box>
                <Box className="w-3 h-3 rounded-full bg-primary/10"></Box>
                <Box className="w-3 h-3 rounded-full bg-primary/10"></Box>
              </div>
            </Box>
            <Box className="grid grid-cols-3 gap-4">
              <Box className="col-span-2 bg-neutral-800/50 rounded-lg p-4 h-64">
                {/* Animated chart lines */}
                <Box className="h-full w-full relative">
                  <Box className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-700"></Box>
                  <Box className="absolute left-0 top-0 h-full w-[1px] bg-neutral-700"></Box>
                  
                  {/* Chart line */}
                  <svg className="h-full w-full" viewBox="0 0 100 50">
                    <motion.path
                      d="M0,50 L10,40 L20,45 L30,35 L40,38 L50,25 L60,30 L70,20 L80,15 L90,10 L100,5"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path
                      d="M0,50 L10,42 L20,40 L30,38 L40,30 L50,32 L60,25 L70,28 L80,20 L90,18 L100,15"
                      fill="none"
                      stroke="#a3a3a3"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.8 }}
                    />
                  </svg>
                </Box>
              </Box>
              <div className="space-y-4">
                <Box className="bg-neutral-800/50 rounded-lg p-4 h-[30%]">
                  <Box className="text-sm text-muted-foreground">Users</Box>
                  <motion.div 
                    className="text-2xl font-bold text-[var(--white)] mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    127,543
                  </motion.div>
                  <Box className="text-foreground/70 text-xs mt-1">+12.4% vs last week</Box>
                </Box>
                <Box className="bg-neutral-800/50 rounded-lg p-4 h-[30%]">
                  <Box className="text-sm text-muted-foreground">Conversion Rate</Box>
                  <motion.div 
                    className="text-2xl font-bold text-[var(--white)] mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    4.87%
                  </motion.div>
                  <Box className="text-foreground/70 text-xs mt-1">+0.8% vs last week</Box>
                </Box>
                <Box className="bg-neutral-800/50 rounded-lg p-4 h-[30%]">
                  <Box className="text-sm text-muted-foreground">Revenue</Box>
                  <motion.div 
                    className="text-2xl font-bold text-[var(--white)] mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    $45,892
                  </motion.div>
                  <Box className="text-foreground/70 text-xs mt-1">+15.2% vs last week</Box>
                </Box>
              </div>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default HeroSection;
