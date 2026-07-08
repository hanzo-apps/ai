'use client'

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, Building2 } from "lucide-react";

const FREE_FEATURES = [
  "$5 free credit — no card required",
  "60 requests/min, 100K tokens/min",
  "OpenAI-compatible API",
  "Chat, agents, and MCP tools",
  "Community support",
  "Pay-as-you-go after credit",
];

const PricingPreviewSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="inline-flex text-xs font-medium rounded-full px-4 py-2 border mb-6"
            style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-4">
            Start free. Scale on your terms.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No credit card to get started. Move to Enterprise when you need higher limits or private deployment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl border border-border bg-secondary/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">Free</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              $0<span className="text-lg font-normal text-muted-foreground">/month</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Everything you need to build and ship your first AI agents.
            </p>

            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-foreground" />
                  </div>
                  <span className="text-foreground/80 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://console.hanzo.ai"
              className="inline-flex justify-center items-center w-full px-6 py-3 rounded-full font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              Start building free
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <p className="text-xs text-muted-foreground/70 text-center mt-3">
              No credit card required
            </p>
          </motion.div>

          {/* Enterprise tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 rounded-2xl border border-white/30 bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">Enterprise</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Custom
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              For teams that need higher limits, private deployment, SLAs, dedicated support, compliance, and custom infrastructure.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Higher API and storage limits",
                "Private cloud or on-prem deployment",
                "SLAs and dedicated support",
                "SOC 2 readiness, HIPAA BAA available",
                "Custom contracts and procurement",
                "Solution architect engagement",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-foreground" />
                  </div>
                  <span className="text-foreground/80 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact/sales"
              className="inline-flex justify-center items-center w-full px-6 py-3 rounded-full font-medium text-sm border border-white/40 hover:border-white/60 hover:bg-white/10 transition-all"
            >
              Contact sales
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View detailed pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPreviewSection;
