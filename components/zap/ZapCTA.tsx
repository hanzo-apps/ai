'use client'

import React from "react";
import { motion } from "@/components/motion";
import { ArrowRight, Zap, BookOpen, Github } from "lucide-react";

const ZapCTA = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8">
            <Zap className="w-4 h-4 text-foreground/70" />
            <span className="text-sm font-medium text-foreground/70">Go · Rust · TypeScript</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Point one agent at it
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start the daemon, add the MCP servers you already run, change one address in your agent.
            <br />
            <span className="text-foreground/70">Nothing else about your setup has to move.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://zap-proto.github.io/zap/docs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 hover:bg-primary/10 text-primary-foreground font-medium rounded-full transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Read the Docs
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/zap-proto/zap"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>

          <p className="mt-12 text-xs text-muted-foreground max-w-xl mx-auto">
            What ZAP saves depends on your workload, your payload size and your topology. The claim here is
            about mechanism, not about a number: a reader that walks the buffer in place does no parsing and no
            allocation, and shared backends run one process where per-agent sidecars run many. Measure it on
            your own traffic — we have not published a benchmark and will not quote one we cannot show you.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ZapCTA;
