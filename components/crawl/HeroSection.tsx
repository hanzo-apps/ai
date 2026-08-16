'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Globe, ArrowRight } from "lucide-react";
import { Box } from '@hanzo/ui'

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <Box className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </Box>

      <Box className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8"
        >
          <Globe className="w-4 h-4 text-foreground/70" />
          <span className="text-sm font-medium text-foreground/70">AI-Ready Web Crawler</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white/20 to-white/10 bg-clip-text text-transparent">
            Hanzo Crawl
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-2xl md:text-3xl font-medium text-foreground mb-4"
        >
          Give it a URL, get back Markdown
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          It fetches the page, finds the part a person would actually read, and renders that
          as Markdown. Navigation, cookie banners and footers do not come with it. A page that
          needs JavaScript gets a real browser; everything else is a fetch and a parse, which
          is most of the web and far faster.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
        >
          <Box className="bg-secondary/50 border border-border rounded-xl p-4">
            <Box className="text-2xl font-bold text-foreground/70">JS</Box>
            <Box className="text-sm text-muted-foreground">Full rendering</Box>
          </Box>
          <Box className="bg-secondary/50 border border-border rounded-xl p-4">
            <Box className="text-2xl font-bold text-foreground/70">Parallel</Box>
            <Box className="text-sm text-muted-foreground">High throughput</Box>
          </Box>
          <Box className="bg-secondary/50 border border-border rounded-xl p-4">
            <Box className="text-2xl font-bold text-foreground/70">LLM</Box>
            <Box className="text-sm text-muted-foreground">Structured extraction</Box>
          </Box>
          <Box className="bg-secondary/50 border border-border rounded-xl p-4">
            <Box className="text-2xl font-bold text-foreground/70">MD</Box>
            <Box className="text-sm text-muted-foreground">Clean Markdown</Box>
          </Box>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://docs.hanzo.ai/docs/crawl"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary-foreground font-medium rounded-full transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/hanzoai"
            className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
          >
            GitHub
          </a>
        </motion.div>
      </Box>
    </section>
  );
};

export default HeroSection;
