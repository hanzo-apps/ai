'use client'

import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Container, Lock, KeyRound, Shield, Zap, Globe, Layers, UserCheck } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

import { ProductFooter } from "@/components/products/ProductFooter"
const Registry = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/10 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-foreground text-sm font-medium">Container Registry</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/10">
              Hanzo Registry
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Container registry with IAM-token auth. Push, pull, and sign OCI images without rotating long-lived registry passwords.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://docs.hanzo.ai/docs/registry" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                Push an Image <ArrowRight className="h-5 w-5" />
              </a>
              <a href="https://github.com/hanzoai/registry" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                View Source
              </a>
            </div>
          </div>

          {/* Hero terminal */}
          <div className="relative bg-primary/10 border border-border rounded-xl p-8 overflow-hidden max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <pre className="text-sm sm:text-base overflow-x-auto bg-[var(--black)]/50 p-4 rounded-lg border border-white/30">
              <code className="text-foreground/80">
                <span className="text-foreground/60">$</span> <span className="text-foreground">hanzo</span> <span className="text-[var(--white)]">login registry.hanzo.ai</span>
                <br/>
                <span className="text-foreground/60"># IAM token minted, valid 1h</span>
                <br/>
                <span className="text-foreground/60">$</span> <span className="text-foreground">docker push</span> <span className="text-[var(--white)]">registry.hanzo.ai/acme/api:v1.2.3</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ChromeText as="h2" className="text-3xl font-bold mb-4">
              Built on Hanzo IAM
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Identity-aware container delivery with no static credentials to leak
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
              <KeyRound className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">IAM Token Auth</h3>
              <p className="text-foreground/80">
                Short-lived OIDC tokens from Hanzo IAM gate every push and pull. No registry passwords to rotate or revoke.
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
                Every repository belongs to an org. RBAC follows IAM groups, so onboarding a teammate is one IAM grant away.
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
                Native sigstore signing and SLSA attestations. Verify provenance before any image runs.
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
                Standard OCI v1.1 distribution and image specs. Works with docker, podman, buildkit, skopeo, crane.
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
              <h3 className="text-xl font-bold mb-2">Pull-Through Cache</h3>
              <p className="text-foreground/80">
                Mirror upstream registries (Docker Hub, GHCR, GAR) with on-demand caching. Predictable bandwidth, no rate limits.
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
              <h3 className="text-xl font-bold mb-2">Edge Replication</h3>
              <p className="text-foreground/80">
                Layers replicate to every Hanzo region. Pulls hit the nearest cache for fast cluster bootstraps.
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
              <h2 className="text-3xl font-bold mb-4">No More Static Registry Creds</h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                Replace dockerconfigjson secrets with IAM-issued tokens. Audit every push, expire every credential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://docs.hanzo.ai/registry/quickstart" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                  Quickstart <ArrowRight className="h-5 w-5" />
                </a>
                <a href="/iam" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                  About IAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Registry</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/registry" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/registry" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
            <ProductFooter slug="registry" name="Registry" />
</div>
  );
};

export default Registry;
