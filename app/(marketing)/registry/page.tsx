'use client'

import React from 'react';
import { motion } from "@/components/motion";
import { ArrowRight, Container, Lock, KeyRound, Shield, Zap, Globe, Layers, UserCheck } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

import { ProductFooter } from "@/components/products/ProductFooter"
import Link from 'next/link'
import { Box } from '@hanzo/ui'
const Registry = () => {
  return (
    <Box className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <Box className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></Box>
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Box className="text-center max-w-3xl mx-auto mb-16">
            <Box className="bg-primary/10 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-foreground text-sm font-medium">Container Registry</span>
            </Box>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/10">
              Hanzo Registry
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              A private registry for your container images at registry.hanzo.ai. It serves the OCI distribution API, so docker, podman, buildkit, skopeo and crane already know how to talk to it — and the credential is a short-lived token minted by your Hanzo IAM login, not a password living in a dockerconfigjson secret.
            </p>
            <Box className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://docs.hanzo.ai/docs/registry" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                Push an Image <ArrowRight className="h-5 w-5" />
              </a>
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                View Source
              </a>
            </Box>
          </Box>

          {/* Hero terminal */}
          <Box className="relative bg-primary/10 border border-border rounded-xl p-8 overflow-hidden max-w-3xl mx-auto">
            <div className="absolute inset-0 hz-grid [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <pre className="text-sm sm:text-base overflow-x-auto bg-[var(--black)]/50 p-4 rounded-lg border border-white/30">
              <code className="text-foreground/80">
                <span className="text-foreground/60">$</span> <span className="text-foreground">hanzo</span> <span className="text-[var(--white)]">login registry.hanzo.ai</span>
                <br/>
                <span className="text-foreground/60"># IAM mints a short-lived token</span>
                <br/>
                <span className="text-foreground/60">$</span> <span className="text-foreground">docker push</span> <span className="text-[var(--white)]">registry.hanzo.ai/acme/api:v1.2.3</span>
              </code>
            </pre>
          </Box>
        </Box>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Box className="text-center mb-16">
            <ChromeText as="h2" className="text-3xl font-bold mb-4">
              Built on Hanzo IAM
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              The credential expires on its own, so there is nothing to rotate and nothing to leak
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
              <KeyRound className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">IAM Token Auth</h3>
              <p className="text-foreground/80">
                An unauthenticated pull gets a 401 naming Hanzo IAM. Your client fetches a token there, the registry checks its signature against a certificate it holds, and the push goes through. No password is stored at either end.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <UserCheck className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Org-Scoped Repos</h3>
              <p className="text-foreground/80">
                A repository name begins with your org, and what a token may do with it is decided by IAM at the moment the token is minted. Adding a teammate is one grant in one place, not a secret copied into a second.
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
              <h3 className="text-xl font-bold mb-2">Cosign + Attestation</h3>
              <p className="text-foreground/80">
                cosign signatures and in-toto attestations are ordinary OCI artifacts, so they push and pull to the same repository as the image they describe. Verification happens where the image runs, against exactly what the registry stored.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Layers className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">OCI Compliant</h3>
              <p className="text-foreground/80">
                The registry HTTP API v2 at /v2/, and nothing bespoke on top of it. Every client, scanner and admission controller that reads an image already speaks it, which is the whole point of not inventing one.
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
              <h3 className="text-xl font-bold mb-2">Tags come off cleanly</h3>
              <p className="text-foreground/80">
                Deletes are enabled, so a tag you pushed by mistake goes away and the blobs behind it are reclaimed. A registry you can only add to is one that only grows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Globe className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">The same account as everything else</h3>
              <p className="text-foreground/80">
                Whoever signs into Hanzo Cloud is who pushes an image. One directory of people, one place to revoke someone — and no separate registry account to remember when they leave.
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
              <h2 className="text-3xl font-bold mb-4">Delete the dockerconfigjson secret</h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                Put a token IAM mints in its place, and let it expire on its own. There is nothing left to rotate.
              </p>
              <Box className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://docs.hanzo.ai/docs/registry" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                  Quickstart <ArrowRight className="h-5 w-5" />
                </a>
                <Link href="/iam" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                  About IAM
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <Box className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Registry</h2>
          <Box className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/registry" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </Box>
        </Box>
      </section>
            <ProductFooter slug="registry" name="Registry" />
</Box>
  );
};

export default Registry;
