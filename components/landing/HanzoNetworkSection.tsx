'use client'

import React from "react";
import { motion } from "framer-motion";
import { Github, Network, ArrowRight, Cpu, ShieldCheck, Globe } from "lucide-react";

const NETWORK_CARDS = [
  {
    icon: Cpu,
    title: "Compute marketplace",
    desc: "Contributors provide GPU capacity; workloads route by price, latency, and trust.",
  },
  {
    icon: ShieldCheck,
    title: "Verifiable work",
    desc: "Every job carries proof. Outputs are signed, attested, and auditable end-to-end.",
  },
  {
    icon: Globe,
    title: "Open participation",
    desc: "Run a node, serve inference, earn rewards. Open source. No gatekeeping.",
  },
];

const HanzoNetworkSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 border mb-6 border-white/20 text-white/80">
            <Network className="w-4 h-4" />
            Hanzo Network
          </div>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-4">
            Decentralized AI compute.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hanzo Network lets contributors provide GPU capacity for inference and training workloads. Developers get access to distributed AI compute. Contributors earn rewards for useful capacity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {NETWORK_CARDS.map((card, index) => {
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://hanzo.network"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            Learn more
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/hanzoai/network"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-foreground border border-border hover:bg-secondary transition-colors"
          >
            <Github className="w-4 h-4" />
            View source
          </a>
        </div>
      </div>
    </section>
  );
};

export default HanzoNetworkSection;
