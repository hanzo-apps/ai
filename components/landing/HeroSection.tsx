'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { capabilityCount } from "@/lib/data/cloud-primitives";

// The one CLI proof-point shown inside the product preview. One demo, no
// rotation, no step-typing — the same install line the copy button yields.
const INSTALL_CMD = "curl -fsSL hanzo.sh | bash";
const DEV_CMD = '$ hanzo dev "Build a RAG API for ./docs. Add /chat. Write tests. Deploy it."';

// Capability strip under the CTAs — V8's Open-Edition proof points, now each a
// deep link to the product page that owns it. The header no longer carries a
// flat Docs link; every product page owns its own docs + console CTAs. The
// `dynamic:"models"` item resolves its count live at mount (see useModelCount).
const STAT_BAND: ReadonlyArray<{ label: string; href: string; dynamic?: "models" }> = [
  { label: `${capabilityCount} capabilities`, href: "/products" },
  { label: "open models", href: "/zen/models", dynamic: "models" },
  { label: "One API", href: "/gateway" },
  { label: "One binary", href: "/open-source" },
  { label: "Bring your own GPU or K8s", href: "/cloud" },
  { label: "Mine on any device", href: "/network" },
  { label: "Free for public + OSS", href: "/pricing" },
  { label: "Open source", href: "/open-source" },
];

// Rows rendered inside the animated console preview — a stylized, on-brand
// snapshot of console.hanzo.ai (NOT a screenshot, so it never goes stale). Each
// metric animates in on mount, restoring the motion the static terminal dropped.
const CONSOLE_METRICS = [
  { label: "Agents running", value: "12", accent: "#a78bfa" },
  { label: "Requests / min", value: "48.2k", accent: "#e879f9" },
  { label: "Models served", value: "390+", accent: "#c4b5fd" },
];
const CONSOLE_NAV = ["Agents", "Models", "Vector", "Gateway", "IAM", "Audit"];

// useModelCount resolves the live number of models the gateway serves, so the
// hero's "N+ open models" is a real figure, not a hardcoded one. Static export →
// this is a client fetch; on any failure it falls back to the last-known 390+.
function useModelCount(): string {
  const [count, setCount] = useState<string>("390+");
  useEffect(() => {
    let alive = true;
    fetch("https://api.hanzo.ai/v1/models", { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        const n = Array.isArray(j?.data) ? j.data.length : Array.isArray(j) ? j.length : 0;
        if (alive && n > 0) {
          // Round down to a clean floor (e.g. 394 → "390+") so the badge reads marketing-clean.
          const floored = Math.max(50, Math.floor(n / 10) * 10);
          setCount(`${floored}+`);
        }
      })
      .catch(() => {/* keep fallback */});
    return () => { alive = false; };
  }, []);
  return count;
}

const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modelCount = useModelCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-20 pb-8 px-4 md:px-8 lg:px-12">
      {/* Main Hero Container */}
      <div className="relative mx-auto w-full max-w-[1400px] min-h-[640px] rounded-2xl border border-border overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">

        {/* Background gradients — slow, continuous drift (restores the ambient motion). */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 0.20 : 0, x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ opacity: { duration: 1.5 }, x: { duration: 18, repeat: Infinity, ease: "easeInOut" }, y: { duration: 22, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle, #a78bfa 0%, transparent 70%)`,
              filter: "blur(100px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 0.14 : 0, x: [0, -30, 0], y: [0, 24, 0] }}
            transition={{ opacity: { duration: 1.5, delay: 0.2 }, x: { duration: 20, repeat: Infinity, ease: "easeInOut" }, y: { duration: 16, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, #e879f9 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 0.04 : 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1.1fr_1fr] lg:gap-10 xl:gap-14 items-center min-w-0">
          {/*
            min-w-0 above is critical: without it, the grid track stretches
            to fit the widest child on narrow viewports and pushes the H1/body
            text past the viewport. min-w-0 lets each grid track shrink while
            the preview handles its own overflow internally.
          */}

            {/* Left: Copy */}
            <div className="flex flex-col min-w-0">
              {/* Eyebrow — V8 badge, now a linked pill (adopts the reference's
                  linked-badge mechanic; V8 copy preserved verbatim). */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href="/network"
                  className="group inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 border w-fit mb-6 transition-colors hover:bg-white/5"
                  style={{ color: "#c4b5fd", borderColor: "rgba(167, 139, 250, 0.3)" }}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-pulse" />
                  V8 · Open Edition — the decentralized AI cloud
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[2rem] sm:text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.08] mb-6"
              >
                <span className="text-foreground">The AI cloud</span>
                <br />
                <span className="bg-gradient-to-r from-white via-white/85 to-white/65 bg-clip-text text-transparent">
                  you can run yourself.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-base xl:text-lg text-muted-foreground leading-relaxed mb-8 max-w-[560px]"
              >
                Not another AI API. Hanzo is a decentralized cloud powered by hanzo.network — <code className="font-mono text-foreground/90 text-[0.9em]">hanzod</code> nodes spawn the same unified <code className="font-mono text-foreground/90 text-[0.9em]">cloud</code> binary we run in production. {capabilityCount} capabilities behind one API. Open source, one binary. Bring your own GPU or Kubernetes, or run it all on your laptop. Connect any provider, watch usage and cost in one place, and let the native router serve the most optimal model — <span className="text-foreground font-medium">saving up to 90% on compute</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 mb-8"
              >
                <a
                  href="https://console.hanzo.ai"
                  className="inline-flex justify-center items-center px-5 sm:px-6 py-3 rounded-full font-medium tracking-tight transition-all hover:opacity-90 text-sm bg-primary text-primary-foreground whitespace-nowrap"
                >
                  Start building free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link
                  href="/network"
                  className="inline-flex justify-center items-center px-5 sm:px-6 py-3 rounded-full font-medium tracking-tight transition-colors border border-white/25 bg-transparent hover:bg-white/10 hover:border-white/50 text-sm whitespace-nowrap"
                >
                  Add compute, earn
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>

              {/* Capability strip — every item deep-links to its product page. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-muted-foreground"
              >
                {STAT_BAND.map((item, idx) => (
                  <React.Fragment key={item.label}>
                    <Link
                      href={item.href}
                      className="whitespace-nowrap transition-colors hover:text-foreground"
                    >
                      {item.dynamic === "models" ? `${modelCount} ${item.label}` : item.label}
                    </Link>
                    {idx < STAT_BAND.length - 1 && (
                      <span aria-hidden className="text-muted-foreground/40">·</span>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>

              {/* Techstars '17 badge — Hanzo AI is a Techstars '17 company.
                  Uses the canonical asset; `invert` renders the black mark
                  white on the dark hero (matching the trust band treatment). */}
              <motion.a
                href="https://www.techstars.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                aria-label="Hanzo AI is a Techstars 2017 company"
                className="group mt-8 inline-flex items-center gap-2 w-fit text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="uppercase tracking-wider text-[11px]">Backed by</span>
                <img
                  src="/logos/partners/techstars.svg"
                  alt="Techstars"
                  className="h-10 w-auto invert opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="font-medium text-foreground/90">&rsquo;17</span>
              </motion.a>
            </div>

            {/* Right: animated product preview — a browser window framing a
                stylized console.hanzo.ai, floating gently. Replaces the bare
                terminal with a real "this is the product" moment. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 lg:mt-0 w-full min-w-0"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-xl border border-border bg-secondary/95 backdrop-blur-sm overflow-hidden shadow-2xl"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
                  </div>
                  <div className="ml-2 flex-1 flex items-center justify-center">
                    <span className="text-[11px] text-muted-foreground font-mono px-3 py-1 rounded-md bg-background/60 border border-border/60">
                      console.hanzo.ai
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    aria-label="Copy install command"
                    className="p-1 rounded hover:bg-accent transition-colors"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-foreground/70" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Console body: sidebar + metric cards + activity + CLI strip */}
                <div className="bg-background">
                  <div className="grid grid-cols-[120px_1fr] min-h-[300px]">
                    {/* Sidebar */}
                    <div className="border-r border-border/60 p-3 hidden sm:flex flex-col gap-1">
                      {CONSOLE_NAV.map((n, i) => (
                        <motion.div
                          key={n}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                          className={`text-[11px] px-2 py-1.5 rounded-md ${i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground"}`}
                        >
                          {n}
                        </motion.div>
                      ))}
                    </div>

                    {/* Main */}
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-2.5 mb-4">
                        {CONSOLE_METRICS.map((m, i) => (
                          <motion.div
                            key={m.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                            className="rounded-lg border border-border/60 bg-secondary/40 p-2.5"
                          >
                            <div className="text-[10px] text-muted-foreground mb-1 truncate">{m.label}</div>
                            <div className="text-lg font-semibold" style={{ color: m.accent }}>{m.value}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Animated activity bars */}
                      <div className="rounded-lg border border-border/60 bg-secondary/40 p-3 mb-4">
                        <div className="text-[10px] text-muted-foreground mb-2">Inference throughput</div>
                        <div className="flex items-end gap-1 h-14">
                          {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 50, 75].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 0.6, delay: 0.8 + i * 0.04, ease: "easeOut" }}
                              className="flex-1 rounded-sm"
                              style={{ background: "linear-gradient(to top, #a78bfa, #e879f9)" }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* CLI strip — the dev proof-point, kept compact */}
                      <div className="rounded-lg border border-border/60 bg-black/60 px-3 py-2 font-mono text-[11px] text-foreground/85 overflow-x-auto whitespace-pre">
                        <span className="text-[#a78bfa]">{DEV_CMD}</span>
                        <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-foreground/70 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                One console for the whole cloud — models, agents, vector search, gateways, IAM, and audit. Run it in our cloud, on your own infrastructure, or on the network, with a complete audit trail.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
