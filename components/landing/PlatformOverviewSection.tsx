'use client'

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Bot,
  Plug,
  Database,
  Rocket,
  Shield,
} from "lucide-react";

// Main value prop — "Everything you need to ship AI software" (6 cards)
const VALUE_CARDS = [
  {
    icon: Brain,
    title: "Models",
    desc: "Access leading proprietary, open, and local models through one API.",
  },
  {
    icon: Bot,
    title: "Agents",
    desc: "Build agents that can use tools, inspect code, run tasks, and complete workflows.",
  },
  {
    icon: Plug,
    title: "Tools",
    desc: "Use 260+ MCP tools for browser, files, git, code, data, cloud, and internal systems.",
  },
  {
    icon: Database,
    title: "Memory",
    desc: "Keep context, history, and vector search available across terminal, IDE, browser, and API.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    desc: "Run locally, in Hanzo Cloud, in Kubernetes, or in your own private environment.",
  },
  {
    icon: Shield,
    title: "Governance",
    desc: "Control permissions with IAM, protect secrets with KMS, and review every action with audit logs.",
  },
];

const PlatformOverviewSection = () => {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Everything you need to ship AI software
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One platform for the agent stack — from model access to deployment, governance, and audit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALUE_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-6 rounded-xl border border-border bg-secondary/50 hover:bg-secondary hover:border-border/80 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverviewSection;
