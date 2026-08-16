'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Button } from "@hanzo/ui";
import { ArrowRight } from "lucide-react";
import { Box } from '@hanzo/ui'

const CallToAction = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-neutral-950/30">
      <Box className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-6 leading-tight">
            Get Started Today
          </h2>
          <p className="text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Launch your next-generation project instantly or request a custom demo to explore 
            Hanzo Base's powerful capabilities.
          </p>
          
          <Box className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="primary" borderRadius="$10" paddingHorizontal="$6">
              <span className="py-1 leading-relaxed">Start Building</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" borderRadius="$10" paddingHorizontal="$6">
              <span className="py-1 leading-relaxed">Read Docs</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default CallToAction;
