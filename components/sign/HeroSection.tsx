'use client'

import React from "react";
import { Button } from "@hanzo/ui";
import { PenLine, ExternalLink } from "lucide-react";
import { Box } from '@hanzo/ui'

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <Box className="absolute inset-0 z-0 bg-gradient-to-b from-background via-neutral-900/50 to-background" />
      <Box className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-white/20 via-white/15 to-transparent z-0" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="text-center max-w-4xl mx-auto">
          <Box className="inline-flex items-center px-3 py-1 mb-4 border border-border rounded-full bg-primary/5 text-foreground/60 text-sm">
            <PenLine className="mr-2 h-4 w-4" />
            Document signing
          </Box>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-[var(--white)]">Hanzo</span>
            <span className="bg-gradient-to-r from-white/20 to-white/10 bg-clip-text text-transparent"> Sign</span>
          </h1>

          <p className="text-foreground/80 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Upload a PDF, drop the fields where people need to sign, and send it. Each signer gets a link,
            signs in their browser, and the finished document comes back with a record of who signed it, when,
            and from where. Nobody installs anything and nobody prints anything.
          </p>

          <Box className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-primary/10 hover:bg-primary/10 text-primary-foreground"
              onClick={() => window.open('https://sign.hanzo.ai', '_blank')}
            >
              Get Started
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-neutral-600 text-[var(--white)] hover:bg-[var(--white)]/10"
              onClick={() => window.open('https://docs.hanzo.ai/docs/services/sign', '_blank')}
            >
              Documentation
            </Button>
          </Box>
        </Box>
      </div>
    </section>
  );
};

export default HeroSection;
