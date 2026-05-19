'use client'

import React from "react";
import { motion } from "framer-motion";
import { Zap, FileCheck, Trophy } from "lucide-react";

// Race agents. Ship the winner.
const PROVIDERS = [
  "GPT", "Claude", "Gemini", "Mistral", "Groq", "xAI",
  "DeepSeek", "Qwen", "Hugging Face", "OpenRouter",
  "Replicate", "Together", "Fireworks", "local",
];

const CARDS = [
  {
    icon: Zap,
    title: "Parallel attempts",
    desc: "Run multiple models or agents on the same task simultaneously in isolated sandboxes.",
  },
  {
    icon: FileCheck,
    title: "Automatic scoring",
    desc: "Score every attempt on tests, code quality, performance, and policy checks.",
  },
  {
    icon: Trophy,
    title: "Best patch wins",
    desc: "Promote the winning diff; archive every attempt with full audit trail.",
  },
];

const MultiAgentSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Race agents. Ship the winner.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Hanzo can run multiple models or agents against the same task in parallel, then compare results using tests, code quality, performance, and policy checks. GPT, Claude, Gemini, Mistral, Groq, xAI, DeepSeek, Qwen, Hugging Face, OpenRouter, Replicate, Together, Fireworks, and local models can all participate in the same workflow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-12 p-4 rounded-xl bg-secondary/30 border border-border"
        >
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mr-2">
            Providers
          </span>
          {PROVIDERS.map((name) => (
            <span
              key={name}
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-neutral-800/60 border border-border/40 text-xs text-foreground/80"
            >
              {name}
            </span>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-6 rounded-xl border border-border bg-secondary/50"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MultiAgentSection;
