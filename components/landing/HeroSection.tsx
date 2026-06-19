'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

// Static terminal block — one and only one demo, no rotation, no step-typing.
// This block REPLACES the prior rotating-brand machinery (setInterval +
// setTerminalStep) and the duplicate "Hanzo Dev" terminal in
// DeveloperExperienceSection.
const TERMINAL_LINES: ReadonlyArray<{
  text: string;
  type: "command" | "comment";
}> = [
  { text: "$ curl -fsSL hanzo.sh | bash", type: "command" },
  { text: "$ hanzo login", type: "command" },
  { text: '$ hanzo dev "Build a RAG API for ./docs. Add /chat. Write tests. Deploy it."', type: "command" },
];

const STAT_BAND = [
  "390+ models",
  "Agent SDK",
  "MCP tools",
  "Vector DB",
  "IAM/KMS",
  "Self-hostable",
  "Open source",
];

const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("curl -fsSL hanzo.sh | bash");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-20 pb-8 px-4 md:px-8 lg:px-12">
      {/* Main Hero Container */}
      <div className="relative mx-auto w-full max-w-[1400px] min-h-[640px] rounded-2xl border border-border overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">

        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 0.18 : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle, #a78bfa 0%, transparent 70%)`,
              filter: "blur(100px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 0.12 : 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
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
            to fit the widest child (the terminal block, which contains long
            whitespace-pre lines). On narrow viewports that pushes the H1/body
            text past the viewport. min-w-0 lets each grid track shrink while
            the terminal handles its own overflow-x-auto internally.
          */}

            {/* Left: Copy */}
            <div className="flex flex-col min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="inline-flex text-xs font-medium rounded-full px-4 py-2 border w-fit mb-6"
                  style={{ color: "#c4b5fd", borderColor: "rgba(167, 139, 250, 0.3)" }}
                >
                  The open-source cloud for production AI agents
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[2rem] sm:text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.08] mb-6"
              >
                <span className="text-foreground">The open-source</span>
                <br />
                <span className="bg-gradient-to-r from-white via-white/85 to-white/65 bg-clip-text text-transparent">
                  AI cloud for agents.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-base xl:text-lg text-muted-foreground leading-relaxed mb-8 max-w-[560px]"
              >
                Build, deploy, and govern AI agents with one platform for models, tools, memory, vector search, sandboxes, IAM, KMS, and audit logs. Use Hanzo in the cloud, self-host it, or run it inside your own infrastructure.
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
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="https://docs.hanzo.ai"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex justify-center items-center px-5 sm:px-6 py-3 rounded-full font-medium tracking-tight transition-colors border border-white/25 bg-transparent hover:bg-white/10 hover:border-white/50 text-sm whitespace-nowrap"
                >
                  Read the docs
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-muted-foreground"
              >
                {STAT_BAND.map((label, idx) => (
                  <React.Fragment key={label}>
                    <span className="whitespace-nowrap">{label}</span>
                    {idx < STAT_BAND.length - 1 && (
                      <span aria-hidden className="text-muted-foreground/40">·</span>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>

            {/* Right: Single static terminal block — no rotation, no animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 lg:mt-0 w-full min-w-0"
            >
              <div className="rounded-xl border border-border bg-secondary/95 backdrop-blur-sm overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                  </div>
                  <span className="ml-2 text-[11px] text-muted-foreground font-mono">From prompt to production</span>
                  <button
                    onClick={handleCopy}
                    aria-label="Copy install command"
                    className="ml-auto p-1 rounded hover:bg-accent transition-colors"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-foreground/70" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <div className="p-5 font-mono text-[13px] leading-relaxed bg-background overflow-x-auto">
                  {TERMINAL_LINES.map((line, idx) => (
                    <div
                      key={idx}
                      className={`whitespace-pre ${idx === TERMINAL_LINES.length - 1 ? "mb-0" : "mb-2"} text-foreground/90`}
                    >
                      {line.text}
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Hanzo reads your codebase, plans the work, edits across files, runs tests, and prepares a deployable service with a complete audit trail.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
