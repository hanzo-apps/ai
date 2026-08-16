'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Button } from "@hanzo/ui";
import { Terminal, Eye, Cpu, MousePointer, Keyboard } from "lucide-react";
import { Box } from '@hanzo/ui'

const OperativeHero = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <Box className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></Box>
      <Box className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"></Box>
      <Box className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"></Box>
      
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Box className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 border border-white/30 text-foreground/70 text-sm font-medium mb-6">
              Computer use, in a container
            </span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--white)] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/10">
              Hanzo Operative
            </h1>

            <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto">
              A container with a Linux desktop inside it, and a model driving
              that desktop by screenshot, mouse and keyboard. You watch through
              a browser and send instructions from the same page. Nothing it
              does reaches your machine, because the machine it is using is the
              container.
            </p>

            <Box className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <a href="#get-started">Get Started</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 text-[var(--white)] border-border bg-[var(--white)]/5 hover:bg-[var(--white)]/10">
                <a href="https://docs.hanzo.ai/docs/services/operative" className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  View Docs
                </a>
              </Button>
            </Box>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <Box className="flex flex-col items-center">
              <Box className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-foreground" />
              </Box>
              <p className="text-sm font-medium text-foreground/80">Screen Vision</p>
            </Box>
            <Box className="flex flex-col items-center">
              <Box className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-foreground" />
              </Box>
              <p className="text-sm font-medium text-foreground/80">Multimodal Models</p>
            </Box>
            <Box className="flex flex-col items-center">
              <Box className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <MousePointer className="h-6 w-6 text-foreground" />
              </Box>
              <p className="text-sm font-medium text-foreground/80">Cursor Control</p>
            </Box>
            <Box className="flex flex-col items-center">
              <Box className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Keyboard className="h-6 w-6 text-foreground" />
              </Box>
              <p className="text-sm font-medium text-foreground/80">Keyboard Actions</p>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </section>
  );
};

export default OperativeHero;
