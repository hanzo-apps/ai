'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Button } from "@hanzo/ui";
import { Github, Star, ArrowRight } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import { Box } from '@hanzo/ui'

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--black)] relative overflow-hidden">
      <Box className="absolute inset-0 bg-gradient-to-b from-white/10 to-background"></Box>
      <Box className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></Box>
      <Box className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></Box>
      
      <Box className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Box className="inline-block px-4 py-1 mb-6 rounded-full bg-primary/10 border border-white/50 text-foreground/70 text-sm font-medium">
            Multi-Agent Simulation Framework
          </Box>
          
          <ChromeText as="h1" className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Hanzo Bot
          </ChromeText>
          
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
            A powerful framework for creating, deploying, and managing autonomous AI agents.
            Build intelligent systems that can interact across multiple platforms while maintaining 
            consistent personalities and knowledge.
          </p>
          
          <Box className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-[var(--white)] border-border bg-[var(--white)]/5 hover:bg-[var(--white)]/10"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
              <Box className="ml-2 flex items-center">
                <Star className="h-4 w-4 fill-white text-foreground/60 mr-1" />
                <span className="text-foreground/80 text-sm">Star</span>
              </Box>
            </Button>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default HeroSection;
