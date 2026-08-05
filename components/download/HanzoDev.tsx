'use client'

import { motion } from "framer-motion";
import { Button } from "@hanzo/ui";
import { CopyButton } from "@hanzo/ui/product";
import { Terminal, ArrowRight, Cpu, Bot, Code } from "lucide-react";
import { CTA_PRIMARY, CTA_OUTLINE } from "./cta";

// Each tool names where it actually installs from. `path` is the common case —
// an install script on hanzo.sh — but it is not a law: hanzo.sh/agents 404ed
// because the card assumed every tool shipped from the same host, and one does
// not. `href` + `label` say so explicitly rather than deriving a location.
const shortcuts: Array<{
  href: string
  label: string
  name: string
  desc: string
  icon: typeof Bot
}> = [
  { href: "https://hanzo.sh/dev", label: "hanzo.sh/dev", name: "hanzo-dev", desc: "AI coding agent", icon: Bot },
  { href: "https://hanzo.sh/mcp", label: "hanzo.sh/mcp", name: "hanzo-mcp", desc: "MCP server (260+ tools)", icon: Cpu },
  { href: "https://hanzo.sh/cli", label: "hanzo.sh/cli", name: "hanzo", desc: "Cloud CLI", icon: Terminal },
  { href: "https://pypi.org/project/hanzo-agents/", label: "pip install hanzo-agents", name: "hanzo-agents", desc: "Multi-agent SDK", icon: Code },
];

const INSTALL = "curl -fsSL hanzo.sh | bash";

const HanzoDev = () => {

  return (
    <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[var(--black)] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-steel">
            For Developers
          </h2>

          <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            Install the complete Hanzo AI toolkit in one command. CLI, MCP, Agents, Dev tools — in Python, Rust, or JavaScript.
          </p>

          {/* Main install command */}
          <div className="flex justify-center mb-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4 flex items-center">
              <Terminal className="h-5 w-5 text-foreground mr-3 flex-shrink-0" />
              <code className="text-foreground/80 font-mono text-lg">{INSTALL}</code>
              <div className="ml-4">
                <CopyButton value={INSTALL} label="Copy install command" id="install-cli" />
              </div>
            </div>
          </div>

          {/* Shortcuts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
            {shortcuts.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors text-left"
                >
                  <Icon className="h-5 w-5 text-foreground mb-2" />
                  <div className="font-mono text-sm text-foreground/80">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                  <div className="text-xs text-muted-foreground/60 mt-1">{s.label}</div>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://hanzo.sh" target="_blank" rel="noopener noreferrer" className={CTA_PRIMARY}>
              Visit hanzo.sh
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="/dev" className={CTA_OUTLINE}>
              Learn More
            </a>
          </div>
        </motion.div>
      </div>

      <style>
        {`
        .text-gradient-steel {
          background: linear-gradient(
            90deg,
            rgb(180, 180, 180),
            rgb(240, 240, 240),
            rgb(180, 180, 180)
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 6s ease infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>
    </section>
  );
};

export default HanzoDev;
