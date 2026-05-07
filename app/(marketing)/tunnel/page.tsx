'use client'

import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Route, Lock, Globe, Terminal, Zap, Shield, Network as NetworkIcon, Activity } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const Tunnel = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/10 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-foreground text-sm font-medium">Localhost Tunnels</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/10">
              Hanzo Tunnel
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Secure localhost tunnels for development and demos. Expose any local port to a public URL with end-to-end TLS in one command.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://docs.hanzo.ai/tunnel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                Start Tunneling <ArrowRight className="h-5 w-5" />
              </a>
              <a href="https://github.com/hanzoai/tunnel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                View Source
              </a>
            </div>
          </div>

          {/* Hero terminal */}
          <div className="relative bg-primary/10 border border-border rounded-xl p-8 overflow-hidden max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <pre className="text-sm sm:text-base overflow-x-auto bg-[var(--black)]/50 p-4 rounded-lg border border-white/30">
              <code className="text-foreground/80">
                <span className="text-foreground/60">$</span> <span className="text-foreground">hanzo tunnel</span> <span className="text-[var(--white)]">3000</span>
                <br/>
                <span className="text-foreground/60"># Tunnel ready</span>
                <br/>
                <span className="text-[var(--white)]">https://wispy-fox-7421.tunnel.hanzo.ai</span> <span className="text-foreground/60">→</span> <span className="text-[var(--white)]">localhost:3000</span>
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
              Built for Real Development
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Webhooks, mobile QA, customer demos, OAuth callbacks — without firewall fights
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
              <Lock className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">End-to-End TLS</h3>
              <p className="text-foreground/80">
                Every tunnel is encrypted edge-to-localhost with automatic certificates. No mixed-content warnings, no manual setup.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Globe className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Custom Domains</h3>
              <p className="text-foreground/80">
                Bring your own domain or use a memorable hanzo.ai subdomain. Reserved subdomains for paid users.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <Terminal className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Request Inspector</h3>
              <p className="text-foreground/80">
                Replay webhooks, inspect headers, retry failed requests from the local CLI. No more printf debugging.
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
              <h3 className="text-xl font-bold mb-2">Auth-Gated Tunnels</h3>
              <p className="text-foreground/80">
                Lock any tunnel behind Hanzo IAM, basic auth, or an allowlist. Share dev URLs without exposing them publicly.
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
              <h3 className="text-xl font-bold mb-2">Edge-Anchored</h3>
              <p className="text-foreground/80">
                Tunnels terminate at the nearest Hanzo edge POP. Sub-50ms latency from anywhere on the planet.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/10 border border-white/30 rounded-xl p-6"
            >
              <NetworkIcon className="h-10 w-10 text-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">TCP and HTTP</h3>
              <p className="text-foreground/80">
                Tunnel HTTP, raw TCP, SSH, or Postgres. Anything that speaks a port speaks tunnel.
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
              <h2 className="text-3xl font-bold mb-4">One Command, Public URL</h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                Install the CLI, run a single command, get a public URL. Stop wrestling with ngrok limits and rotating subdomains.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://docs.hanzo.ai/tunnel/install" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                  Install the CLI <ArrowRight className="h-5 w-5" />
                </a>
                <a href="/pricing" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                  See Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Tunnel</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/tunnel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/tunnel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tunnel;
