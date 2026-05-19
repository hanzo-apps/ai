'use client'

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Network } from "lucide-react";

interface CoreProject {
  org: string;
  name: string;
  description: string;
}

// "Core projects" — the canonical 7-card block. Other repo lists were moved
// to /open-source. This page shows only the projects users land on first.
const CORE_PROJECTS: CoreProject[] = [
  { org: "hanzoai", name: "hanzo",  description: "The complete AI platform for agents, tools, models, and deployment." },
  { org: "hanzoai", name: "mcp",    description: "260+ Model Context Protocol tools and servers." },
  { org: "hanzoai", name: "llm",    description: "Unified gateway for model routing through an OpenAI-compatible API." },
  { org: "hanzoai", name: "dev",    description: "AI coding agent for terminal and IDE workflows." },
  { org: "hanzoai", name: "agent",  description: "Multi-agent orchestration framework." },
  { org: "hanzoai", name: "evals",  description: "Evaluation harness for models, agents, and workflows." },
  { org: "hanzoai", name: "ui",     description: "React components for AI applications." },
];

const OpenSourceSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 border mb-6 border-white/20 text-white/80">
            <Github className="w-4 h-4" />
            Open Source
          </div>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-4">
            Built in the open.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hanzo is open-source infrastructure for the AI-native software stack. Use the hosted cloud, inspect the source, fork the tools, or run the platform yourself.
          </p>
        </motion.div>

        {/* Core projects — 7 cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-lg font-semibold text-foreground mb-5">Core projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CORE_PROJECTS.map((repo, i) => (
              <motion.a
                key={`${repo.org}/${repo.name}`}
                href={`https://github.com/${repo.org}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 + (i % 7) * 0.04 }}
                className="group p-5 rounded-xl border border-border/60 bg-secondary/30 hover:bg-secondary/60 hover:border-border transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Github className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-mono text-sm text-muted-foreground truncate">{repo.org}/</span>
                    <span className="font-mono text-sm font-semibold text-foreground truncate">{repo.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground flex-shrink-0 transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{repo.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center"
        >
          <a
            href="https://github.com/hanzoai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            <Github className="w-5 h-5" />
            View on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
