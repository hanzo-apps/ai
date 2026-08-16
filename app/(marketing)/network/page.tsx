'use client'

import React from 'react';
import { motion } from "@/components/motion";
import { ArrowRight, Network as NetworkIcon, Coins, Globe, Shield, Cpu, Zap, Server, Activity } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

import { ProductFooter } from "@/components/products/ProductFooter"
import Link from 'next/link'
import { Box } from '@hanzo/ui'
const Network = () => {
  return (
    <Box className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <Box className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></Box>
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Box className="text-center max-w-3xl mx-auto mb-16">
            <Box className="bg-primary/10 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-foreground text-sm font-medium">Compute Marketplace</span>
            </Box>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/10">
              Hanzo Network
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              hanzo.network is the fabric that hanzod nodes form. Put a machine on it and it serves models to whoever the cluster routes there. Ask the fabric for a model and it finds a peer that already has it loaded.
            </p>
            <Box className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://docs.hanzo.ai/docs/network" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                Buy Compute <ArrowRight className="h-5 w-5" />
              </a>
              <Link href="/node" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                Run a Node
              </Link>
            </Box>
          </Box>
        </Box>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Box className="text-center mb-16">
            <ChromeText as="h2" className="text-3xl font-bold mb-4">
              How the Network Works
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Machines join, declare what they can serve, and the cluster routes on what is actually loaded
            </p>
          </Box>

          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Globe className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Peers, not regions</h3>
              <p className="text-foreground/80">
                There is no region menu to choose from. A node discovers its peers over the fabric, and the topology is whatever is connected right now — you can ask it and read the answer.
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
              <h3 className="text-xl font-bold mb-2">Metered by the work</h3>
              <p className="text-foreground/80">
                A tenth of the block reward funds AI compute, and a provider's share is scaled by the level of the work it did. No subscription, no seat, nothing billed while a machine sits idle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Shield className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Proof of AI</h3>
              <p className="text-foreground/80">
                A node's confidential-compute tier is attested rather than declared, and what it earns is scaled by that attestation and by a trust score. A claim about a machine is worth nothing on its own.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Cpu className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Whatever the peers have loaded</h3>
              <p className="text-foreground/80">
                Ask the cluster which models it serves, which node would answer for one, and where a model nobody has loaded should be placed. Routing follows what is really in memory.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Zap className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">One command to join</h3>
              <p className="text-foreground/80">
                hanzo fabric join names a network and starts the node on it. If you would rather lend the machine to builds than to inference, hanzo runner offers the same box as a CI runner.
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
              <h3 className="text-xl font-bold mb-2">Anchored, not asserted</h3>
              <p className="text-foreground/80">
                Work is ordered on the Hanzo L2 and committed to Lux as a Merkle root, under a stake-weighted validator set. What you can check is what settled, not what a status page says.
              </p>
            </motion.div>
          </Box>
        </Box>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Box className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Box className="bg-gradient-to-r from-white/20 to-white/10 rounded-2xl p-8 md:p-12 border border-white/30">
            <Box className="text-center">
              <h2 className="text-3xl font-bold mb-4">Two ends of the same fabric</h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                Take a key and call it, or bring a machine and serve it. Most people who do the second started by doing the first.
              </p>
              <Box className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://docs.hanzo.ai/docs/api-keys" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                  Get an API Key <ArrowRight className="h-5 w-5" />
                </a>
                <Link href="/node" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                  Provide Compute
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <Box className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Network</h2>
          <Box className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/network" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </Box>
        </Box>
      </section>
            <ProductFooter slug="network" name="Network" />
</Box>
  );
};

export default Network;
