'use client'

import React, { useState } from "react";
import { motion } from "@/components/motion";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  LucideIcon,
} from "lucide-react";


import { Button } from "@hanzo/ui";
import { ProductFooter } from "@/components/products/ProductFooter";
import { BRAND } from "@/lib/constants/brand";
import { Box } from '@hanzo/ui'

export interface CodeExample {
  language: string;
  filename: string;
  code: string;
}

export interface BlockchainProductProps {
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
  useCases: Array<{
    title: string;
    description: string;
  }>;
  chains?: string[];
  codeExample?: {
    filename: string;
    code: string;
  };
  codeExamples?: CodeExample[];
  /**
   * Product slug for the canonical OSS + Deploy footer — the BARE slug, matching
   * the key in products-metadata and this page's own directory (`nft`, not
   * `blockchain/nft`; the page composes the prefix itself).
   *
   * REQUIRED, and it used to default to `name`'s last word lowercased. That
   * derivation read a marketing headline as a product identity, and the two are
   * different values that merely coincide most of the time:
   *
   *   "Hanzo DeFi"   -> defi        -> /docs/defi 404s, never written
   *   "Gas Manager"  -> manager     -> /docs/manager 404s; there is no such product
   *   "Hanzo NFT API"-> api         -> /docs/api EXISTS, so four products
   *   "Hanzo Tokens API" -> api        (nft, tokens, bundler, transfers) all
   *   ...                              silently addressed generic API docs
   *
   * The last case is the reason this is required rather than merely discouraged:
   * `nft` and `tokens` were declared in products-metadata with the correct
   * `docs_slug`, and the derivation routed around their own curated metadata.
   * A wrong 200 reports nothing and outlives every link check.
   */
  slug: string;
}

const BlockchainProductLayout: React.FC<BlockchainProductProps> = ({
  name,
  tagline,
  description,
  icon: ProductIcon,
  features,
  useCases,
  chains,
  codeExample,
  codeExamples,
  slug,
}) => {
  // Monochrome: one white accent for every blockchain product page. The glow,
  // badges, and icons are tinted via alpha suffixes on this single token.
  const accentColor = BRAND.primary;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-8 relative overflow-hidden">
        <Box className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <Box
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
            style={{
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
              filter: "blur(100px)",
            }}
          />
        </Box>

        <Box className="max-w-6xl mx-auto relative z-10">
          <Box className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Available Badge */}
              <Box
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: `${accentColor}4d`, backgroundColor: `${accentColor}1a` }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                <span className="text-sm font-medium" style={{ color: accentColor }}>
                  Available Now
                </span>
              </Box>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
                <span className="text-foreground">{name}</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6">{tagline}</p>
              <p className="text-lg text-muted-foreground mb-8">{description}</p>

              {/* Quick Features */}
              <Box className="grid sm:grid-cols-2 gap-4 mb-8">
                {features.slice(0, 4).map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <Box key={idx} className="flex items-start gap-3">
                      <Box
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${accentColor}1a` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: accentColor }} />
                      </Box>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </Box>
                  );
                })}
              </Box>

              <Link
                href="/blockchain"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Web3 Overview
              </Link>
            </motion.div>

            {/* Right: Signup Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-border bg-secondary/80 p-6 md:p-8"
            >
              {/* Quick Start */}
              <Box className="flex items-center gap-3 mb-6">
                <Box
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}1a` }}
                >
                  <ProductIcon className="w-6 h-6" style={{ color: accentColor }} />
                </Box>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Get Your API Key</h2>
                  <p className="text-sm text-muted-foreground">Start building in under 5 minutes</p>
                </div>
              </Box>

              {/* Performance Stats */}
              <Box className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { value: "HA", label: "Failover" },
                  { value: "<50ms", label: "Latency" },
                  { value: "100+", label: "Chains" },
                ].map((stat) => (
                  <Box key={stat.label} className="text-center">
                    <Box className="text-xl font-bold text-foreground">{stat.value}</Box>
                    <Box className="text-xs text-muted-foreground">{stat.label}</Box>
                  </Box>
                ))}
              </Box>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full py-3 rounded-lg font-medium text-black"
                  style={{ backgroundColor: accentColor }}
                  onClick={() => window.open('https://console.hanzo.ai', '_blank')}
                >
                  <span className="flex items-center justify-center gap-2">
                    Start Building Free
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-3 rounded-lg font-medium border-border hover:border-neutral-600"
                  onClick={() => window.open('https://docs.hanzo.ai/docs/blockchain', '_blank')}
                >
                  View Documentation
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                No credit card required. Free tier includes 300M compute units/month.
              </p>

              {/* Trust Signals */}
              <Box className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">Trusted by developers building:</p>
                <Box className="flex flex-wrap gap-2">
                  {["DeFi", "NFTs", "Payments", "Gaming", "AI Agents"].map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full border border-border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-8 bg-background">
        <Box className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Key Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need, nothing you don't.
            </p>
          </motion.div>

          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-6 rounded-xl border border-border bg-secondary/50"
                >
                  <Box
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${accentColor}1a` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accentColor }} />
                  </Box>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </Box>
        </Box>
      </section>

      {/* Code Examples - Polyglot */}
      {(codeExamples && codeExamples.length > 0) && (
        <section className="py-24 px-4 md:px-8">
          <Box className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
                Simple to Integrate
              </h2>
              <p className="text-lg text-muted-foreground">
                Get started with just a few lines of code. SDKs for every language.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-secondary/80 overflow-hidden"
            >
              {/* Language Tabs */}
              <Box className="flex items-center gap-1 px-4 py-2 border-b border-border bg-background overflow-x-auto">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.language}
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      activeTab === idx
                        ? "bg-neutral-800 text-foreground"
                        : "text-muted-foreground hover:text-foreground/80"
                    }`}
                  >
                    {example.language}
                  </button>
                ))}
              </Box>
              {/* File Header */}
              <Box className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
                <Box className="flex gap-1.5">
                  <Box className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                  <Box className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                  <Box className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                </Box>
                <span className="ml-2 text-xs text-muted-foreground font-mono">
                  {codeExamples[activeTab]?.filename}
                </span>
              </Box>
              <Box className="p-4 font-mono text-sm bg-background overflow-x-auto max-h-[500px]">
                <pre className="text-foreground/80">{codeExamples[activeTab]?.code}</pre>
              </Box>
            </motion.div>
          </Box>
        </section>
      )}

      {/* Legacy single code example fallback */}
      {codeExample && !codeExamples && (
        <section className="py-24 px-4 md:px-8">
          <Box className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
                Simple to Integrate
              </h2>
              <p className="text-lg text-muted-foreground">
                Get started with just a few lines of code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-secondary/80 overflow-hidden"
            >
              <Box className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
                <Box className="flex gap-1.5">
                  <Box className="w-3 h-3 rounded-full bg-primary/10" />
                  <Box className="w-3 h-3 rounded-full bg-primary/10" />
                  <Box className="w-3 h-3 rounded-full bg-primary/10" />
                </Box>
                <span className="ml-2 text-xs text-muted-foreground font-mono">{codeExample.filename}</span>
              </Box>
              <Box className="p-4 font-mono text-sm bg-background overflow-x-auto">
                <pre className="text-foreground/80">{codeExample.code}</pre>
              </Box>
            </motion.div>
          </Box>
        </section>
      )}

      {/* Use Cases */}
      <section className="py-24 px-4 md:px-8 bg-background">
        <Box className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Built For
            </h2>
          </motion.div>

          <Box className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-secondary/30"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </motion.div>
            ))}
          </Box>
        </Box>
      </section>

      {/* Supported Chains */}
      {chains && chains.length > 0 && (
        <section className="py-24 px-4 md:px-8">
          <Box className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
                Supported Chains
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3"
            >
              {chains.map((chain) => (
                <Box
                  key={chain}
                  className="px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm text-foreground/80"
                >
                  {chain}
                </Box>
              ))}
            </motion.div>
          </Box>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-24 px-4 md:px-8 border-t border-neutral-900">
        <Box className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Start Building with {name}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get your free API key and ship your first request in under 5 minutes. No credit card required.
            </p>
            <Box className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => window.open('https://console.hanzo.ai', '_blank')}
                className="px-6 py-3 rounded-lg font-medium text-black"
                style={{ backgroundColor: accentColor }}
              >
                Get Your API Key
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Link
                href="/blockchain"
                className="px-6 py-3 rounded-lg font-medium border border-border text-foreground hover:bg-secondary transition-colors"
              >
                Explore All Web3 Products
              </Link>
            </Box>
          </motion.div>
        </Box>
      </section>

      {/* Canonical OSS + Deploy footer — one block for every product page. */}
      <ProductFooter slug={slug} name={name} />
    </Box>
  );
};

export default BlockchainProductLayout;
