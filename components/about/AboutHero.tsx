'use client'

import React from "react";
import { motion } from "@/components/motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Box } from '@hanzo/ui'

const AboutHero = () => {
  return (
    <section className="relative pt-24 pb-16 px-4 md:px-8 lg:px-12 overflow-hidden">
      {/* Background gradients */}
      <Box className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <Box
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
        <Box
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, var(--pure-white) 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
      </Box>

      <Box className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
            style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Company history
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="hz-display mb-6"
          >
            <span className="text-foreground">History of</span>
            <br />
            <span className="text-muted-foreground">Hanzo AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto"
          >
            Hanzo began as Crowdstart, a marketing platform. It incorporated as Hanzo AI in 2016,
            went through Techstars the next year, and now builds the AI cloud.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#timeline"
              className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 text-sm bg-primary text-primary-foreground"

            >
              Read the timeline
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link
              href="/zen"
              className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-border bg-transparent hover:bg-accent text-sm text-foreground"
            >
              The Zen of Hanzo
            </Link>
          </motion.div>
        </motion.div>
      </Box>
    </section>
  );
};

export default AboutHero;
