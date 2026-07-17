'use client'

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Brain,
  Database,
  Radio,
  Activity,
  CreditCard,
  Server,
  Cpu,
  LayoutGrid,
} from "lucide-react";

// The 67 capabilities, grouped into nine categories (a symmetric 3×3 grid). One
// capability = one name = one /v1/<name>. Breadth without overwhelm — one API.
const CATEGORY_CARDS = [
  {
    icon: ShieldCheck,
    title: "Identity & Trust",
    desc: "Who you are, what you may touch, where secrets live — IAM, authorization, KMS, and zero-trust.",
  },
  {
    icon: Brain,
    title: "Intelligence",
    desc: "The mind of the cloud — models, ML, the inference engine, agents, evals, and code execution.",
  },
  {
    icon: Cpu,
    title: "Compute",
    desc: "Raw horsepower on demand — GPUs, machines, containers, functions, and edge runtimes.",
  },
  {
    icon: Database,
    title: "Data",
    desc: "The stores every capability reads and writes — object storage, Base, SQL, KV, and vector search.",
  },
  {
    icon: Radio,
    title: "Streams",
    desc: "Messaging, durable tasks, and async orchestration — pub/sub, queues, streams, and workflows.",
  },
  {
    icon: Activity,
    title: "Observability",
    desc: "See everything — telemetry, tracing, and usage analytics across every request.",
  },
  {
    icon: CreditCard,
    title: "Commerce",
    desc: "The economy — meter, price, bill, and reward, with billing, plans, and wallets built in.",
  },
  {
    icon: Server,
    title: "Platform",
    desc: "The cloud fabric — deploy, provision, route, and host through the native PaaS and gateway.",
  },
  {
    icon: LayoutGrid,
    title: "Applications",
    desc: "User-facing surfaces on top of it all — console, chat, search, git, teams, and knowledge.",
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
          className="text-left mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            67 capabilities. One API.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Everything the cloud does is one route — <code className="font-mono text-foreground/90 text-[0.95em]">api.hanzo.ai/v1/&lt;capability&gt;</code>. Sixty-seven capabilities, grouped into nine categories. Breadth without the overwhelm.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORY_CARDS.map((card, index) => {
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
