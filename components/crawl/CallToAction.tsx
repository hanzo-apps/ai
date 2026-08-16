'use client'

import React from "react";
import { motion } from "@/components/motion";
import { ArrowRight, Globe, BookOpen } from "lucide-react";
import { Box } from '@hanzo/ui'

const CallToAction = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorations */}
      <Box className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <Box className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <Box className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8">
            <Globe className="w-4 h-4 text-foreground/70" />
            <span className="text-sm font-medium text-foreground/70">Hanzo Crawl</span>
          </Box>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Send it a URL
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            One call, and the page comes back as Markdown.
            <br />
            <span className="text-foreground/70">From your code over HTTP, or from a model over MCP.</span>
          </p>

          <Box className="flex flex-wrap justify-center gap-4">
            <a
              href="https://docs.hanzo.ai/docs/crawl"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 hover:bg-primary/20 text-primary-foreground font-medium rounded-full transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Read the Docs
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/hanzoai"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
            >
              View on GitHub
            </a>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default CallToAction;
