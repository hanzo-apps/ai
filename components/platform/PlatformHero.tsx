'use client'

import React, { useState } from "react";
import { motion } from "@/components/motion";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  Terminal,
  Server,
  Database,
  Lock,
  Zap,
} from "lucide-react";
import { CopyButton } from "@hanzo/ui/product";

const FEATURES = [
  { id: "self-host", label: "Install", icon: Server },
  { id: "apps", label: "Apps", icon: Lock },
  { id: "databases", label: "Databases", icon: Database },
  { id: "compose", label: "Compose", icon: Zap },
  { id: "cli", label: "CLI", icon: Terminal },
];

const FeatureDemo = ({ activeFeature }: { activeFeature: string }) => {
  const demos: Record<string, { title: string; code: string }> = {
    "self-host": {
      title: "Install",
      code: `# Any VPS, one command. It installs the
# platform and prints the console URL.
curl -sSL https://hanzo.ai/install.sh | sh

# Or skip the server entirely and use the
# managed one at app.hanzo.ai.

# Develop it locally — pnpm monorepo:
pnpm install
pnpm platform:setup
pnpm platform:dev`,
    },
    apps: {
      title: "Applications",
      code: `# Source: GitHub, GitLab, Bitbucket, Gitea,
# any git remote, a Docker image, or a
# folder you drop on it.

# Build: it detects the stack with Nixpacks
# by default. Or pick a Dockerfile, Railpack,
# Heroku or Paketo buildpacks, or static.

# Deploy on push, or only on a tag.
# Auto-deploy is on unless you turn it off.

# Target: this server, a Swarm cluster, or
# a Kubernetes cluster you own.`,
    },
    databases: {
      title: "Databases",
      code: `# Provision one beside the app:
#   PostgreSQL   MySQL      MariaDB
#   MongoDB      Redis      libSQL

# Each gets its own credentials, its own
# volume, and a backup schedule that writes
# to object storage you control — S3, or
# anything that speaks it.

# Restore is the same screen, in reverse.`,
    },
    compose: {
      title: "Compose",
      code: `# A compose.yml is a first-class app, not a
# special case. Paste it, and every service
# in it comes up on the same network.

services:
  web:
    build: .
    ports: ["3000:3000"]
  worker:
    build: .
    command: node worker.js

# Domains, TLS and routing are attached per
# service afterwards.`,
    },
    cli: {
      title: "CLI and API",
      code: `# Everything the console does, the API does.
# It is documented as OpenAPI and served
# under /v1 — generated, not hand-written.

# Deploys, logs, domains, databases, backups
# and servers are all resources you can
# script against from CI.

# Notifications go where your team already
# is: Slack, Discord, Telegram, or email.`,
    },
  };

  const demo = demos[activeFeature];

  return (
    <div className="rounded-xl border border-border bg-secondary/95 backdrop-blur-sm overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary/10" />
          <div className="w-3 h-3 rounded-full bg-primary/10" />
          <div className="w-3 h-3 rounded-full bg-primary/10" />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeFeature}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-muted-foreground font-mono ml-2"
          >
            {demo.title}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="p-4 bg-background">
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeFeature}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-mono text-foreground/80 overflow-x-auto"
          >
            <code>{demo.code}</code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
};

const INSTALL = "curl -sSL https://hanzo.ai/install.sh | sh";

const PlatformHero = () => {
  const [activeFeature, setActiveFeature] = useState("self-host");

  return (
    <section className="relative pt-24 pb-16 px-4 md:px-8 lg:px-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — min-w-0 so the grid item may shrink below its
              content; without it a code sample inside forced 385px into a
              358px column and 27px of text fell outside a viewport that
              cannot scroll. */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
            >
              Open source • Apache-2.0 • Self-hostable
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
            >
              <span className="text-foreground">Point it at</span>
              <br />
              <span className="text-muted-foreground">a repository.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl"
            >
              Platform builds it, runs it, gives it a domain with a certificate, and
              shows you the logs. It is the deploy plane of the Open AI Cloud, and it
              runs on one VPS as happily as on a cluster you already own.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              <a
                href="https://github.com/hanzoai"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 text-sm bg-primary text-primary-foreground"

              >
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub
              </a>
              <a
                href="https://docs.hanzo.ai/docs/services/platform"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-border bg-transparent hover:bg-secondary text-sm text-foreground"
              >
                Documentation
              </a>
            </motion.div>

            {/* Install command */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary border border-border">
                <code className="text-sm font-mono text-foreground/80">{INSTALL}</code>
                <CopyButton value={INSTALL} label="Copy install command" size={20} id="install-cli" />
              </div>
            </motion.div>

            {/* Feature tabs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap gap-2"
            >
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                const isActive = activeFeature === feature.id;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {feature.label}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Feature Demo — min-w-0 for the same reason as the
              left column: a grid item's default `min-width: auto` will not
              shrink below its content, and the code sample inside forced 385px
              into a 358px column, putting 27px of it outside a viewport that
              cannot scroll. */}
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <FeatureDemo activeFeature={activeFeature} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformHero;
