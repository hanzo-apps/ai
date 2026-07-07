'use client'

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Link2, Gauge, Users, ArrowRight, BookOpen } from "lucide-react";

// Three-step story for the universal AI connector: link accounts, see usage,
// share with your org. Mirrors PlatformOverviewSection's card grid.
const STEPS = [
  {
    icon: Link2,
    title: "Connect once",
    desc: "Link OpenAI, Anthropic, Hanzo, and 50+ AI providers — plus GPU, cloud, and integration accounts — using logins you already have. No passwords stored.",
  },
  {
    icon: Gauge,
    title: "See unified usage",
    desc: "Rate limits, resets, credits, and spend for every account, in one view — native in the dev CLI, Hanzo Desktop, hanzo.app, hanzo.chat, and console.hanzo.ai.",
  },
  {
    icon: Users,
    title: "Share with your org",
    desc: "Add your team to share verified logins and route usage through Hanzo for org-wide analytics and per-member reporting. 1% fee on routed usage.",
  },
];

const UsagePlaneSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 border mb-6 border-white/20 text-white/80">
            <Link2 className="w-4 h-4" />
            Universal AI connector
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Connect every AI account. One usage plane.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hanzo is the connective layer for AI — link your accounts once and see limits,
            credits, and spend everywhere Hanzo runs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-6 rounded-xl border border-border bg-secondary/50 hover:bg-secondary hover:border-border/80 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://console.hanzo.ai/ai-accounts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            Connect your accounts
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://docs.hanzo.ai/docs/usage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm border border-white/25 bg-transparent hover:bg-white/10 hover:border-white/50 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Read the docs
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default UsagePlaneSection;
