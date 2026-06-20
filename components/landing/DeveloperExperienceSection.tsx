'use client'

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Code,
  Globe,
  Plug,
  Bot,
  Brain,
  Database,
  Share2,
  Layers,
  History,
  Wrench,
  Lock,
  Users as UsersIcon,
  Shield,
  Zap,
  ExternalLink,
} from "lucide-react";
import { CodeTabs } from "@/components/ui/code-tabs";

// Developer workflow — works where developers already work.
const WORKFLOW_CARDS = [
  {
    icon: Terminal,
    title: "Terminal",
    desc: "Install with curl. Drive Hanzo Dev from the shell. Pipe agents into your build.",
  },
  {
    icon: Code,
    title: "VS Code & JetBrains",
    desc: "First-class extension surface for editing, refactoring, and reviewing agent diffs.",
  },
  {
    icon: Globe,
    title: "Browser",
    desc: "Chrome, Firefox, and Safari extensions for in-context agent assistance.",
  },
  {
    icon: Plug,
    title: "API",
    desc: "OpenAI-compatible HTTP API for models, tools, memory, and agent execution.",
  },
];

// Unified platform — one shared brain for your AI tools.
const UNIFIED_CARDS = [
  {
    icon: Brain,
    title: "Shared memory",
    desc: "Context persists across every surface and every session.",
  },
  {
    icon: Database,
    title: "Vector search",
    desc: "Semantic search over your entire codebase and knowledge base.",
  },
  {
    icon: Wrench,
    title: "Tool registry",
    desc: "260+ MCP tools available to every agent, IDE, and API call.",
  },
  {
    icon: History,
    title: "Unified history",
    desc: "Every prompt, every response, every tool call — searchable and replayable.",
  },
  {
    icon: Share2,
    title: "Team sync",
    desc: "Share context, memory, and projects across your team with org-scoped access.",
  },
];

// Remote agents — secure remote execution for teams.
const REMOTE_CARDS = [
  {
    icon: Zap,
    title: "Parallel runs",
    desc: "Execute work across repos and tasks simultaneously, with quotas per team.",
  },
  {
    icon: UsersIcon,
    title: "Shared workspaces",
    desc: "Collaborate via shared sandboxed environments and shared memory.",
  },
  {
    icon: Shield,
    title: "Quality gates",
    desc: "Enforce policy, tests, and reviews before any change lands on main.",
  },
  {
    icon: Lock,
    title: "Isolation",
    desc: "Each run gets its own sandbox. Network, file, and tool egress are scoped.",
  },
];

// API code examples — kept identical structure (CodeTabs) but updated copy block.
const API_CODE_EXAMPLES = [
  {
    language: "typescript",
    label: "TypeScript",
    code: `import { Hanzo } from "@hanzo/ai";

const hanzo = new Hanzo({
  apiKey: process.env.HANZO_API_KEY,
});

const response = await hanzo.chat.completions.create({
  model: "claude-sonnet-4-6",
  messages: [{ role: "user", content: "Hello!" }],
});

console.log(response.choices[0].message.content);`,
  },
  {
    language: "python",
    label: "Python",
    code: `from hanzo import Hanzo
import os

client = Hanzo(api_key=os.environ["HANZO_API_KEY"])

response = client.chat.completions.create(
    model="claude-sonnet-4-6",
    messages=[{"role": "user", "content": "Hello!"}],
)

print(response.choices[0].message.content)`,
  },
  {
    language: "go",
    label: "Go",
    code: `package main

import (
    "context"
    "fmt"
    "os"

    "github.com/hanzoai/hanzo-go"
)

func main() {
    client := hanzo.NewClient(os.Getenv("HANZO_API_KEY"))

    resp, _ := client.Chat.Completions.Create(
        context.Background(),
        hanzo.ChatCompletionRequest{
            Model: "claude-sonnet-4-6",
            Messages: []hanzo.Message{
                {Role: "user", Content: "Hello!"},
            },
        },
    )

    fmt.Println(resp.Choices[0].Message.Content)
}`,
  },
  {
    language: "bash",
    label: "cURL",
    code: `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`,
  },
];

const HANZO_DEV_BULLETS = [
  "Build APIs, scripts, components, and internal tools",
  "Fix bugs with full codebase context",
  "Add tests and CI workflows",
  "Refactor large systems safely",
  "Generate deployable services",
  "Modernize legacy code",
];

const DeveloperExperienceSection = () => {
  return (
    <section className="bg-background">
      {/* Developer workflow */}
      <div className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
              Works where developers already work.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hanzo lives in your terminal, your IDE, your browser, and your API — sharing one brain across them all.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKFLOW_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-5 rounded-xl border border-border bg-secondary/50"
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
        </div>
      </div>

      {/* Hanzo Dev */}
      <div className="py-24 px-4 md:px-8 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              {/*
                Static demo block — no animation. This intentionally replaces
                the prior typed-step terminal so there is exactly ONE animated
                terminal removed from the site (was: HeroSection rotation +
                this duplicate). Now: zero animated terminals, both static.
              */}
              <div className="rounded-xl border border-border bg-secondary/80 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
                  </div>
                  <span className="ml-2 text-[11px] text-muted-foreground font-mono">hanzo dev</span>
                </div>
                <div className="p-5 font-mono text-sm bg-background overflow-x-auto">
                  <div className="mb-2 text-foreground/90 whitespace-pre">
                    hanzo dev "Fix rate limiting. Add metrics. Add tests. Open a PR."
                  </div>
                  <div className="text-muted-foreground mb-1">
                    <span className="text-foreground/70">{"✓"} </span>Plan created
                  </div>
                  <div className="text-muted-foreground mb-1">
                    <span className="text-foreground/70">{"✓"} </span>Files updated
                  </div>
                  <div className="text-muted-foreground mb-1">
                    <span className="text-foreground/70">{"✓"} </span>Tests passing
                  </div>
                  <div className="text-foreground/90">
                    <span className="text-foreground/70">{"✓"} </span>Pull request opened
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p
                className="inline-flex items-center text-xs font-medium rounded-full px-4 py-2 border mb-6"
                style={{ color: "var(--primary)", borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)" }}
              >
                <Bot className="w-3.5 h-3.5 mr-1.5" />
                Hanzo Dev
              </p>
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
                AI coding agent in your terminal.
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Plan, edit across files, run tests, and open pull requests — driven by your repo, not by guesswork.
              </p>
              <ul className="space-y-3 text-muted-foreground mb-8">
                {HANZO_DEV_BULLETS.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-foreground/50 flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://docs.hanzo.ai/docs/dev"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90"
              >
                Read the Dev docs
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Unified platform */}
      <div className="py-24 px-4 md:px-8 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
              One shared brain for your AI tools.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Hanzo connects your models, tools, memory, and history across every surface. Your terminal, IDE, browser, agents, and API calls all share the same context layer.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {UNIFIED_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-5 rounded-xl border border-border bg-secondary/50"
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
        </div>
      </div>

      {/* Remote agents */}
      <div className="py-24 px-4 md:px-8 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
              Secure remote execution for teams.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Run long, parallel agent workloads on Hanzo Cloud or on your own Kubernetes — with isolation, quotas, and audit on by default.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REMOTE_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-5 rounded-xl border border-border bg-secondary/50"
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
        </div>
      </div>

      {/* API */}
      <div className="py-24 px-4 md:px-8 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-transparent p-8 md:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p
                  className="inline-flex text-xs font-medium rounded-full px-4 py-2 border mb-6"
                  style={{ color: "var(--primary)", borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)" }}
                >
                  Hanzo API
                </p>
                <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
                  One API for models, tools, and agents.
                </h2>
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  Hanzo provides a unified API for chat, model routing, tool calling, memory, and agent execution. It is compatible with existing OpenAI-style SDKs. Change the base URL and start routing through Hanzo.
                </p>
                <a
                  href="https://docs.hanzo.ai/api"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90"
                >
                  View API docs
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
              <CodeTabs tabs={API_CODE_EXAMPLES} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperExperienceSection;
