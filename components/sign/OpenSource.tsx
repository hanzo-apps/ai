'use client'

import React from "react";
import { Github, Heart, ExternalLink } from "lucide-react";
import { Button } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const OpenSource = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="max-w-3xl mx-auto">
          <Box className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8">
            <Box className="flex items-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-foreground" />
              <h3 className="text-xl font-semibold">Built on Open Source</h3>
            </Box>
            <p className="text-foreground/80 mb-6">
              Hanzo Sign is built on{" "}
              <a href="https://documenso.com" target="_blank" rel="noopener noreferrer" className="text-[var(--white)] underline underline-offset-4 hover:text-white/70 transition-colors">
                Documenso
              </a>
              , an open-source document signing platform, under the AGPL. The upstream project is named here and
              in the licence, because naming what you forked is required and is a different act from branding
              yourself with it. Run our build, or run your own — the whole thing is a TypeScript application
              over Postgres, and you can read every line that touches a document before you trust it with one.
            </p>
            <Box className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border-neutral-700 text-foreground/80 hover:bg-neutral-800"
                onClick={() => window.open('https://github.com/hanzoai/esign', '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                hanzoai/esign
              </Button>
              <Button
                variant="outline"
                className="border-neutral-700 text-foreground/80 hover:bg-neutral-800"
                onClick={() => window.open('https://github.com/documenso/documenso', '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Upstream: documenso/documenso
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </section>
  );
};

export default OpenSource;
