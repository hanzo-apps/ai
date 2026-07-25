'use client'

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Network, ArrowRight, Cpu, ShieldCheck, Globe } from "lucide-react";

// The flagship WebGL point-globe — client-only + code-split (never SSR/build).
const PointGlobe = dynamic(() => import("@/components/webgl/PointGlobe"), { ssr: false });

const NETWORK_CARDS = [
  {
    icon: Cpu,
    title: "Same binary, everywhere",
    desc: "hanzod nodes spawn the exact unified cloud binary we run in production. The network is the substrate; the cloud is one binary on top.",
  },
  {
    icon: ShieldCheck,
    title: "Mine on any device",
    desc: "Bring your own GPU or Kubernetes and earn at market price. Confidential workloads run inside NVIDIA TEE / Confidential Compute.",
  },
  {
    icon: Globe,
    title: "Free for public + OSS",
    desc: "Public and open-source workloads run free on public nodes. GitHub-for-compute — no gatekeeping, no lock-in.",
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
            The network is the cloud.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            hanzo.network is a decentralized network of <code className="font-mono text-foreground/90 text-[0.95em]">hanzod</code> nodes that spawn and power the same unified cloud binary we run in production. Bring any device, mine at market price, and run the whole cloud yourself — no single operator owns it.
          </p>
        </motion.div>

        {/* Flagship globe — a self-contained dark stage so the point-globe reads
            identically regardless of page theme. The radial is the static
            no-WebGL / reduced-motion fallback; the canvas glows on top. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-black"
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14]"
              style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", filter: "blur(120px)" }}
            />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>
          <PointGlobe variant="hero" arcs={4} className="relative mx-auto block h-[360px] w-full sm:h-[460px]" />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
          />
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
          <Link
            href="/node"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            Add compute, earn
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/network"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-foreground border border-border hover:bg-secondary transition-colors"
          >
            <Network className="w-4 h-4" />
            Explore the network
          </Link>
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
