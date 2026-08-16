'use client'

import React from "react";
import { Button } from "@hanzo/ui";
import { ArrowRight, PenLine, Book, Code } from "lucide-react";
import { Box } from '@hanzo/ui'

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-neutral-900/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-6">Send the first one</h2>
          <p className="text-lg text-foreground/80 mb-8">
            Upload a PDF and place a signature field. You will know inside five minutes whether this fits.
          </p>

          <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Box className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 flex flex-col items-center">
              <PenLine className="h-12 w-12 text-foreground/60 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start signing</h3>
              <p className="text-muted-foreground mb-4 text-center">Open the hosted app and send a document</p>
              <Button
                className="mt-auto bg-primary/10 hover:bg-primary/10 text-primary-foreground"
                onClick={() => window.open('https://sign.hanzo.ai', '_blank')}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Box>

            <Box className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 flex flex-col items-center">
              <Book className="h-12 w-12 text-foreground/60 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Documentation</h3>
              <p className="text-muted-foreground mb-4 text-center">Setup, self-hosting, and the API reference</p>
              <Button
                className="mt-auto bg-primary/10 hover:bg-primary/10 text-primary-foreground"
                onClick={() => window.open('https://docs.hanzo.ai/docs/services/sign', '_blank')}
              >
                View Docs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Box>

            <Box className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 flex flex-col items-center">
              <Code className="h-12 w-12 text-foreground/60 mb-4" />
              <h3 className="text-xl font-semibold mb-2">The source</h3>
              <p className="text-muted-foreground mb-4 text-center">Read it before you trust a contract to it</p>
              <Button
                className="mt-auto bg-primary/10 hover:bg-primary/10 text-primary-foreground"
                onClick={() => window.open('https://github.com/hanzoai/esign', '_blank')}
              >
                View on GitHub <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="bg-primary/5 border border-border rounded-lg p-6 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-3">Something more specific</h3>
          <p className="text-foreground/80 mb-6">
            Signing inside your own product, a flow with approvals before the send, or running it on your
            infrastructure. Tell us the shape and we will tell you whether it fits.
          </p>
          <Button
            variant="outline"
            className="border-border text-foreground/60 hover:bg-primary/5"
            onClick={() => window.open('https://hanzo.ai/contact', '_blank')}
          >
            Contact Sales
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default CallToAction;
