'use client'

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const FINAL_CODE = [
  "$ curl -fsSL hanzo.sh | bash",
  "$ hanzo dev \"Build my first AI app\"",
];

const FinalCTASection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, var(--primary) 0%, transparent 60%)`,
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-5">
            The AI cloud you can run yourself.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build on it in our cloud, add compute to the network and earn, or self-host the whole thing. One binary, three paths — pick yours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4 mb-12"
        >
          <a
            href="https://console.hanzo.ai"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            Start building free
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Link
            href="/node"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm border border-white/25 bg-transparent hover:bg-white/10 hover:border-white/50 transition-colors"
          >
            Add compute, earn
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href="https://docs.hanzo.ai/self-host"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm border border-border hover:bg-secondary hover:border-neutral-600 transition-all"
          >
            Self-host
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </motion.div>

        {/* Static code block — no animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="rounded-xl border border-border bg-secondary/80 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
              </div>
              <span className="text-[11px] text-muted-foreground font-mono ml-2">terminal</span>
            </div>
            <div className="p-5 font-mono text-sm bg-background overflow-x-auto">
              {FINAL_CODE.map((line, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre text-foreground/90 ${idx === FINAL_CODE.length - 1 ? "" : "mb-2"}`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
