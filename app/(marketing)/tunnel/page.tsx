'use client'

import React from 'react';
import { motion } from "@/components/motion";
import { ArrowRight, Route, Lock, Globe, Terminal, Zap, Shield, Network as NetworkIcon, Activity } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

import { ProductFooter } from "@/components/products/ProductFooter"
const Tunnel = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/10 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-foreground text-sm font-medium">hanzo share</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/10">
              Hanzo Tunnel
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              A public HTTPS URL for something running on your laptop. The port stays bound to localhost and the Hanzo fabric carries the traffic to it, so nothing is listening on whatever network the machine is sitting on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://docs.hanzo.ai/docs/projects/hanzoai/tunnel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
                Start Tunneling <ArrowRight className="h-5 w-5" />
              </a>
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 text-[var(--white)] hover:bg-primary/10 px-8 py-4 rounded-md text-lg font-medium">
                View Source
              </a>
            </div>
          </div>

          {/* Hero terminal */}
          <div className="relative bg-primary/10 border border-border rounded-xl p-8 overflow-hidden max-w-3xl mx-auto">
            <div className="absolute inset-0 hz-grid [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <pre className="text-sm sm:text-base overflow-x-auto bg-[var(--black)]/50 p-4 rounded-lg border border-white/30">
              <code className="text-foreground/80">
                <span className="text-foreground/60">$</span> <span className="text-foreground">hanzo share</span> <span className="text-[var(--white)]">3000</span>
                <br/>
                <span className="text-foreground/60">→ sharing 3000</span>
                <br/>
                <span className="text-[var(--white)]">https://wispyfox7421.share.hanzo.ai</span> <span className="text-foreground/60">→</span> <span className="text-[var(--white)]">localhost:3000</span>
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
              For the things that need a real URL
            </ChromeText>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              A webhook you have to receive. A build a client wants to click through. An OAuth callback that will not accept localhost.
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
              <h3 className="text-xl font-bold mb-2">The port stays on localhost</h3>
              <p className="text-foreground/80">
                Your service keeps listening on 127.0.0.1. The fabric reaches in and carries the traffic, so a café, a client's office, or a conference floor sees nothing.
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
              <h3 className="text-xl font-bold mb-2">A name you can keep</h3>
              <p className="text-foreground/80">
                You get a random token by default. Pass --name and the subdomain is yours to reuse, so the callback URL you registered last week still works today.
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
              <h3 className="text-xl font-bold mb-2">Your login is the account</h3>
              <p className="text-foreground/80">
                No second signup, no config file to fill in. The first share provisions the account from the identity you already signed in with, then prints the URL.
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
              <h3 className="text-xl font-bold mb-2">A shell is never open by hostname</h3>
              <p className="text-foreground/80">
                hanzo link publishes the terminal you are in so the console can watch it, or drive it. That one is gated behind your org's identity provider — knowing the URL is not enough, and if the gate cannot be applied the command refuses to publish.
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
              <h3 className="text-xl font-bold mb-2">It ends when you do</h3>
              <p className="text-foreground/80">
                The tunnel belongs to the command that started it. Close the terminal and the URL stops answering — a share cannot outlive the session that meant to make it.
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
              <h3 className="text-xl font-bold mb-2">Four things to put behind it</h3>
              <p className="text-foreground/80">
                proxy passes traffic through to a local port. web and static serve a directory as a site. drive hands over files. One flag picks which, and a port, a host:port, or a full URL all work as the target.
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
              <h2 className="text-3xl font-bold mb-4">One command, one URL</h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
                Install the CLI, sign in once, and name a port. It is the same sign-in that runs your agents and bills your usage, so there is nothing else to set up.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://docs.hanzo.ai/docs/skills/hanzo-tunnel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-medium">
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
            <a href="https://docs.hanzo.ai/docs/projects/hanzoai/tunnel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
            <ProductFooter slug="tunnel" name="Tunnel" />
</div>
  );
};

export default Tunnel;
