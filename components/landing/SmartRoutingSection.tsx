'use client'

import React from "react";
import { motion } from "framer-motion";
import { Route, TerminalSquare, Receipt, ArrowRight, BookOpen } from "lucide-react";

// Smart routing — the money-saving value prop. Send `model: "auto"` to
// api.hanzo.ai and each prompt is routed to the model that fits the task and
// your SLO: on-device zen, a cheap tier, or a frontier model. You are billed
// as whatever served you, and X-Routed-Model makes every choice transparent.
// Mirrors UsagePlaneSection's badge → heading → 3-card grid → CTA idiom.
const STEPS = [
  {
    icon: TerminalSquare,
    title: 'Send model: "auto"',
    desc: 'Point any OpenAI-compatible client at api.hanzo.ai /v1/chat/completions and set model:"auto". One model id — no per-call model picking, no vendor lock-in.',
  },
  {
    icon: Route,
    title: "Routed by task + SLO",
    desc: "A built-in heuristic — upgradeable to the trained zen-router — sends each prompt to a local zen model, a cheap tier, or a frontier model, by difficulty and your latency/quality SLO.",
  },
  {
    icon: Receipt,
    title: "Billed as what served you",
    desc: "You pay for the model that actually answered — not a flat premium. Every response carries an X-Routed-Model header, so routing is fully transparent and auditable.",
  },
];

// Honest worked mix: 70% simple → local/open (~$0), 20% → cheap tier,
// 10% → frontier ⇒ ~89% lower spend on THIS mix. Savings are workload-
// dependent — we say "up to 90%" and always show the mix behind it.
const MIX = [
  { label: "On-device zen", share: 70, note: "simple prompts · ~$0" },
  { label: "Cheap tier", share: 20, note: "mid-difficulty" },
  { label: "Frontier", share: 10, note: "hardest prompts" },
];

const SmartRoutingSection = () => {
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
            <Route className="w-4 h-4" />
            Smart routing
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            One model id. The right model every time.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hanzo Cloud routes each prompt to the model that fits the task and your SLO —
            local zen, a cheap tier, or a frontier model — so you get frontier quality
            without frontier bills. Up to 90% lower AI spend, depending on your workload.
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

        {/* Honest cost illustration — the mix behind "up to 90%". */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 p-6 rounded-xl border border-border bg-secondary/50"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <div className="text-sm font-semibold text-foreground">
                A typical workload, routed
              </div>
              <div className="text-sm text-muted-foreground">
                Most prompts are easy. Only the hard ones need a frontier model.
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-semibold text-foreground">
                ~89% lower
              </div>
              <div className="text-xs text-muted-foreground">
                API spend on this example mix
              </div>
            </div>
          </div>

          <div className="flex w-full h-3 rounded-full overflow-hidden mb-4">
            <div className="bg-neutral-200" style={{ width: "70%" }} />
            <div className="bg-neutral-500" style={{ width: "20%" }} />
            <div className="bg-neutral-700" style={{ width: "10%" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MIX.map((m) => (
              <div key={m.label} className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-foreground">{m.share}%</span>
                  <span className="text-muted-foreground">{m.label}</span>
                </div>
                <div className="text-xs text-muted-foreground">{m.note}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
            Illustrative, not a guarantee — savings depend on your prompt mix. On the
            public RouterBench data, oracle routing reaches 0.909 quality at roughly 13×
            lower cost than the best single model (replication smoke run).{" "}
            <a
              href="https://papers.hanzo.ai/hanzo-router"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2 hover:opacity-80"
            >
              Read the research
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://console.hanzo.ai/ai-accounts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            Turn on smart routing
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://docs.hanzo.ai/docs/usage/routing"
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

export default SmartRoutingSection;
