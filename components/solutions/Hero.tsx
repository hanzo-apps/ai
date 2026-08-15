'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

const SolutionsHero: React.FC = () => {
  return (
    <div className="relative pb-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, #ffffff 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
          style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
        >
          <Rocket className="w-3.5 h-3.5" />
          Enterprise Solutions
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-foreground">AI infrastructure</span>
          <br />
          <span className="text-muted-foreground">and the team to land it.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10"
        >
          Hanzo runs the cloud your workload sits on — models, machines, databases, identity,
          secrets — behind one API. It is open source, so you can take it in-house whenever you
          want. When a project needs people rather than infrastructure, Hanzo Agency and Sensei
          Group do that part with your team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="hz-tap inline-flex items-center px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 text-sm bg-primary text-primary-foreground"

          >
            Talk to sales
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/solutions/capabilities"
            className="hz-tap inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-border bg-transparent hover:bg-secondary text-sm text-foreground"
          >
            See the capabilities
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SolutionsHero;
