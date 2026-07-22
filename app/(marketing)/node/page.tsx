'use client'

import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Server, Cpu, Network, Shield, Coins, Activity, Zap, Container } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

import { ProductFooter } from "@/components/products/ProductFooter"
const Node = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/10 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-foreground text-sm font-medium">Decentralized AI Compute</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/10">
              Hanzo Node
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Run a node on the Hanzo Network. Contribute compute, serve inference, and earn rewards from a decentralized AI marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://docs.hanzo.ai/docs/proof-of-ai/node-operator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                Run a Node <ArrowRight className="h-5 w-5" />
              </a>
              <a href="https://github.com/hanzoai/node" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                View Source
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ChromeText as="h2" className="text-3xl font-bold mb-4">
              Why Run a Hanzo Node
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Turn idle hardware into productive compute on a permissionless AI network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Server className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Bring Your Own GPU</h3>
              <p className="text-foreground/80">
                Run on consumer GPUs, datacenter accelerators, or Apple Silicon. The runtime adapts to your hardware.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Coins className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Earn for Inference</h3>
              <p className="text-foreground/80">
                Stake to join the network and earn rewards every time your node serves a verified inference request.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Cpu className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Zen Models Out of the Box</h3>
              <p className="text-foreground/80">
                Pre-bundled with Zen MoDE model variants. Pull, quantize, and serve with a single command.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Shield className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Verifiable Execution</h3>
              <p className="text-foreground/80">
                Proof of AI receipts let clients verify which model produced which response, signed by your node key.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Container className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">One-Container Deploy</h3>
              <p className="text-foreground/80">
                Single OCI image, no orchestration required. Run on a laptop, a homelab, or a Kubernetes cluster.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Activity className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Live Telemetry</h3>
              <p className="text-foreground/80">
                Built-in metrics, health checks, and reward tracking. Watch your node earn in real time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-2xl p-8 md:p-12 border border-white/30">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Join the Network</h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                Spin up a node in under five minutes and start earning from the decentralized AI compute layer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://docs.hanzo.ai/docs/proof-of-ai/node-operator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                  Quickstart <ArrowRight className="h-5 w-5" />
                </a>
                <a href="/network" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                  About the Network
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Node</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/proof-of-ai/node-operator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/node" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
            <ProductFooter slug="node" name="Node" />
</div>
  );
};

export default Node;
