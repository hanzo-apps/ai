'use client'

import Link from "next/link";

import React from "react";
import PlatformHero from "@/components/platform/PlatformHero";
import PaaSCapabilities from "@/components/platform/PaaSCapabilities";
import TrustedBy from "@/components/platform/TrustedBy";
import CallToAction from "@/components/platform/CallToAction";
import ZenBackground from "@/components/zen/ZenBackground";
import ZenQuoteSection from "@/components/zen/ZenQuoteSection";
import OSSComputeDividends from "@/components/oss/OSSComputeDividends";
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner";
import { motion } from "framer-motion";
import { Github, Cloud, Server, Lock, Code2, Network, Terminal, ArrowRight } from "lucide-react";

import { ProductFooter } from "@/components/products/ProductFooter"
const DeploymentOptions = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Where it runs is your call
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Same platform, same console, same API. What changes is whose machines
            it lands on.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Self-Hosted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-white/30 transition-colors"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
            >
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Self-Hosted</h3>
            <p className="text-muted-foreground text-sm mb-4">
              One command on a VPS you already pay for. Everything the managed one does, on hardware you can walk up to.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-foreground">✓</span> Runs anywhere Docker runs
              </li>
              <li className="flex items-center gap-2">
                <span className="text-foreground">✓</span> Scales out across a Swarm cluster
              </li>
              <li className="flex items-center gap-2">
                <span className="text-foreground">✓</span> Or drives a Kubernetes cluster you own
              </li>
            </ul>
            <a
              href="https://github.com/hanzoai"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center mt-6 text-sm text-foreground hover:text-foreground/70"
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </motion.div>

          {/* Hanzo Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-white/30 transition-colors"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
            >
              <Cloud className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Hanzo Cloud</h3>
            <p className="text-muted-foreground text-sm mb-4">
              The same platform, run for you. Sign in and deploy — there is no server to stand up first.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-foreground">✓</span> Nothing to provision
              </li>
              <li className="flex items-center gap-2">
                <span className="text-foreground">✓</span> Deploy on push, or only on a tag
              </li>
              <li className="flex items-center gap-2">
                <span className="text-foreground">✓</span> Metered and billed per organization
              </li>
            </ul>
            <Link
              href="/cloud"
              className="inline-flex items-center mt-6 text-sm text-foreground hover:text-foreground/70"
            >
              Explore Cloud
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>

          {/* Hybrid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-white/30 transition-colors"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
            >
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Hybrid</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Run the control plane on your own server and let it deploy out to remote servers and clusters you already have.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-foreground">✓</span> Servers stay where they are
              </li>
              <li className="flex items-center gap-2">
                <span className="text-foreground">✓</span> One console over all of them
              </li>
              <li className="flex items-center gap-2">
                <span className="text-foreground">✓</span> Per-app target: this host, Swarm, or Kubernetes
              </li>
            </ul>
            <Link
              href="/enterprise"
              className="inline-flex items-center mt-6 text-sm text-foreground hover:text-foreground/70"
            >
              Contact Sales
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const OpenSourceBenefits = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-neutral-900 to-neutral-800/50 rounded-xl p-8 border border-border"
        >
          <div className="flex items-center gap-4 mb-8">
            <Github className="w-8 h-8 text-foreground" />
            <div>
              <h3 className="text-2xl font-bold text-foreground">Open source, all of it</h3>
              <p className="text-muted-foreground">Apache-2.0. Forked from Dokploy, and it says so in the NOTICE.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Code2 className="h-10 w-10 text-foreground" />
              <h4 className="text-lg font-bold text-foreground">Apache-2.0</h4>
              <p className="text-muted-foreground text-sm">
                Use it commercially. Change it. The upstream attribution travels with it, because a fork that hides its parent is one you cannot audit.
              </p>
            </div>

            <div className="space-y-4">
              <Lock className="h-10 w-10 text-foreground" />
              <h4 className="text-lg font-bold text-foreground">It is your server</h4>
              <p className="text-muted-foreground text-sm">
                Builds, images, databases and backups sit on machines you chose, in a region you picked, under credentials you hold.
              </p>
            </div>

            <div className="space-y-4">
              <Terminal className="h-10 w-10 text-foreground" />
              <h4 className="text-lg font-bold text-foreground">Read the part that surprised you</h4>
              <p className="text-muted-foreground text-sm">
                When a deploy does something you did not expect, the code that did it is right there, and so is the OpenAPI document the console itself calls.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <a
              href="https://github.com/hanzoai"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-neutral-600 bg-transparent hover:bg-accent text-sm text-foreground"
            >
              <Github className="w-4 h-4 mr-2" />
              Star on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Platform = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)] overflow-x-hidden">
      
      <ZenBackground />
      

      <main>
        <PlatformHero />
        <PaaSCapabilities />
        <ZenQuoteSection
          quote="The wise engineer owns their tools, lest their tools own them."
          attribution="Principle 14"
        />
        <DeploymentOptions />
        <OpenSourceBenefits />
        <TrustedBy />
        <OSSRevenueBanner upstreamName="Dokploy" />
        <OSSComputeDividends variant="banner" />
        <CallToAction />
              <ProductFooter slug="platform" name="Platform" />
</main>

      
    </div>
  );
};

export default Platform;
