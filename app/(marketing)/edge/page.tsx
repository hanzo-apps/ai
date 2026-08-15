'use client'


import React from 'react';
import { motion } from "@/components/motion";
import { ArrowRight, Zap, Globe, Network, Server, Cloud, Code, Shield } from "lucide-react";
import { Button } from "@hanzo/ui";
import ChromeText from "@/components/ui/chrome-text";

import { ProductFooter } from "@/components/products/ProductFooter"
const Edge = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/5 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-foreground/70 text-sm font-medium">On-device inference</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white/20 to-white/10">
              Hanzo Edge
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Run a model on the machine in front of you. Edge is a Rust runtime that loads a quantized model and generates tokens locally — on a laptop, an ARM board, or a browser tab. Nothing is sent anywhere, because there is nothing to send it to.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary/10 hover:bg-primary/10 text-[var(--white)] px-8 py-6 text-lg">
                Get Started
              </Button>
              <Button variant="outline" className="border-border text-[var(--white)] hover:bg-primary/10 px-8 py-6 text-lg">
                View Documentation
              </Button>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative bg-primary/10 border border-border rounded-xl p-8 overflow-hidden">
            <div className="absolute inset-0 hz-grid [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-4 bg-[var(--black)]/30 rounded-lg border border-border">
                <Globe className="h-10 w-10 text-foreground/70 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Where it runs</h3>
                <p className="text-center text-foreground/80">macOS on Apple Silicon and Intel, Linux on x86 and ARM, and modern browsers through WebAssembly</p>
              </div>

              <div className="flex flex-col items-center p-4 bg-[var(--black)]/30 rounded-lg border border-border">
                <Zap className="h-10 w-10 text-foreground/70 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No network at all</h3>
                <p className="text-center text-foreground/80">Weights on disk, tokens out of local memory. There is no request, so there is nothing to be slow</p>
              </div>

              <div className="flex flex-col items-center p-4 bg-[var(--black)]/30 rounded-lg border border-border">
                <Network className="h-10 w-10 text-foreground/70 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Fetched once</h3>
                <p className="text-center text-foreground/80">Name a Hugging Face repo and it downloads and caches the weights. After that, offline</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ChromeText as="h2" className="text-3xl font-bold mb-4">
              What the runtime does
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              One Rust binary, a core crate to embed, a WASM build for the browser, and a local server for everything else
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <Code className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">A server on localhost</h3>
              <p className="text-foreground/80">
                hanzo-edge serve puts an inference endpoint on a port you pick. Point a client at it and the rest of your code does not change.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <Cloud className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">Quantized as a first language</h3>
              <p className="text-foreground/80">
                GGUF is the native format — Q4_K, Q5_K, Q8_0. A 4B model at Q4_K_M is about 2.5GB on disk, which is what makes a phone a plausible place to run one.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <Server className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">It uses what it finds</h3>
              <p className="text-foreground/80">
                Metal on Apple Silicon, CUDA where there is an NVIDIA card, AVX2 or AVX-512 on CPU. Detected at startup rather than configured by you.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <Globe className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">Zen models sized for devices</h3>
              <p className="text-foreground/80">
                zen3-nano at 600M for embedded work, zen-eco at 4B for phones and tablets, zen4-mini at 8B for a laptop. All published pre-quantized.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <Network className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">Token by token</h3>
              <p className="text-foreground/80">
                Streaming over server-sent events from the local server, or a callback from the Rust API, so a UI starts drawing before generation finishes.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-border rounded-xl p-6"
            >
              <Shield className="h-10 w-10 text-foreground/70 mb-4" />
              <h3 className="text-xl font-bold mb-2">The prompt never leaves</h3>
              <p className="text-foreground/80">
                Nothing is uploaded and there is no key to leak. The prompt and the output stay in the process that made them, which is the whole reason to run a model here.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-b from-background to-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ChromeText as="h2" className="text-3xl font-bold mb-4">
              When to reach for it
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Use Edge when the data cannot leave, the network cannot be relied on, or a per-call bill is the wrong shape. Use Hanzo Engine when you need full precision or many users at once.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary/5 border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Apps that work with no signal</h3>
              <p className="text-foreground/80 mb-4">
                The model is a file on disk, so the feature does not stop existing when the connection does.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>A desktop app that drafts and summarizes without a round trip</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Field tools on a laptop, on a site with no coverage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Anything that has to keep working on a plane</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/5 border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Text that cannot leave the building</h3>
              <p className="text-foreground/80 mb-4">
                Some prompts are a legal problem the moment they cross a network boundary. This is the answer to those.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Clinical and legal text processed on the workstation that holds it</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>On-premise deployments with no egress at all</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Personal data handled on the device it belongs to</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/5 border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Inside the browser tab</h3>
              <p className="text-foreground/80 mb-4">
                The WebAssembly build runs the model in the page, with nothing behind it — so a visitor costs you bandwidth once and compute never.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>A demo that does not bill per visitor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>An assistant inside a web app you already ship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Classification done client-side, before anything is uploaded</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/5 border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Small hardware</h3>
              <p className="text-foreground/80 mb-4">
                ARM64 Linux is a production target. Cortex-A class boards are experimental, and the 600M model is the one that fits them.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>A 600M model on a single-board computer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>An ARM server doing batch work on its own</span>
                </li>
                <li className="flex items-start">
                  <span className="text-foreground/70 mr-2">•</span>
                  <span>Kiosks and appliances with no account to sign in to</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-2xl p-8 md:p-12 border border-border">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Install it, name a model</h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                cargo install hanzo-edge, then hanzo-edge run --model zenlm/zen3-nano. It downloads the weights the first time and never needs the network again. Apache-2.0.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary/10 hover:bg-primary/10 text-[var(--white)] px-8 py-6 text-lg">
                  Install
                </Button>
                <Button variant="outline" className="border-border text-[var(--white)] hover:bg-primary/10 px-8 py-6 text-lg">
                  Read the docs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Edge</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/edge" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

            <ProductFooter slug="edge" name="Edge" />
</div>
  );
};

export default Edge;
