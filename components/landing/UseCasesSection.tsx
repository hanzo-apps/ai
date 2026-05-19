'use client'

import React from "react";
import { motion } from "framer-motion";
import { Shield, FileCheck, Workflow, UserCheck } from "lucide-react";

// "Why Hanzo" — agents need infrastructure, not just prompts.
const WHY_CARDS = [
  {
    icon: Shield,
    title: "Policy by default",
    desc: "Permissions, approvals, and rate limits are enforced at the platform — not bolted on per agent.",
  },
  {
    icon: FileCheck,
    title: "Evidence over vibes",
    desc: "Every agent run produces a diff, a log, and a test result. Decisions are reviewable, not guessed.",
  },
  {
    icon: Workflow,
    title: "Persistent execution",
    desc: "Long-running sandboxes install dependencies, refactor large codebases, and iterate until tests pass.",
  },
  {
    icon: UserCheck,
    title: "Human control",
    desc: "Plan-only, implement, test, deploy — pick the autonomy level. Humans approve what matters.",
  },
];

const UseCasesSection = () => {
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
            style={{ color: "var(--primary)", borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)" }}
          >
            Why Hanzo
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            AI agents need infrastructure, not just prompts.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A good demo can autocomplete a function. A production agent needs context, permissions, tools, memory, tests, secrets, sandboxes, and a way for humans to approve what matters. Hanzo gives agents the operating environment they need to do real work safely.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-5 rounded-xl border border-border bg-secondary/50"
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

export default UseCasesSection;
