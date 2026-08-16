'use client'

import React from "react";
import { motion } from "@/components/motion";
import Link from "next/link";
import {
  Shield,
  Zap,
  Database,
  Key,
  HardDrive,
  Activity,
  Webhook,
  Terminal,
  Server,
  Lock,
  Users,
  FileJson,
  Clock,
  ChevronRight
} from "lucide-react";
import { Box } from '@hanzo/ui'

interface Service {
  name: string;
  description: string;
  icon: React.ElementType;
  href?: string;
}

const CORE_SERVICES: Service[] = [
  {
    name: "Auth",
    description: "Authentication, SSO, OAuth, JWT, and user management out of the box",
    icon: Shield,
    href: "/identity",
  },
  {
    name: "Functions",
    description: "Serverless functions with automatic scaling and edge deployment",
    icon: Zap,
    href: "/functions",
  },
  {
    name: "Database",
    description: "PostgreSQL, vector search, and real-time subscriptions",
    icon: Database,
    href: "/datastore",
  },
  {
    name: "Storage",
    description: "Distributed object storage with CDN integration",
    icon: HardDrive,
  },
  {
    name: "Realtime",
    description: "WebSockets, presence, and live sync for collaborative apps",
    icon: Activity,
    href: "/realtime",
  },
  {
    name: "Secrets",
    description: "Encrypted secret management with versioning and rotation",
    icon: Key,
  },
];

const ADDITIONAL_SERVICES: Service[] = [
  {
    name: "API Gateway",
    description: "Rate limiting, caching, and request transformation",
    icon: Server,
  },
  {
    name: "Cron Jobs",
    description: "Scheduled tasks with monitoring and retry logic",
    icon: Clock,
  },
  {
    name: "Webhooks",
    description: "Event-driven integrations with external services",
    icon: Webhook,
  },
  {
    name: "IAM",
    description: "Fine-grained access control and policies",
    icon: Users,
  },
  {
    name: "Edge Config",
    description: "Global configuration with instant propagation",
    icon: FileJson,
  },
  {
    name: "Vault",
    description: "Hardware-backed encryption and key management",
    icon: Lock,
  },
];

const PaaSCapabilities = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-neutral-900/30">
      <Box className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Box
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
          >
            <Terminal className="w-3.5 h-3.5" />
            Platform-as-a-Service
          </Box>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The services an app needs anyway
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Platform ships your code. These are the pieces it lands next to — each
            one a service you can deploy beside your app, or reach on Hanzo Cloud
            without deploying anything.
          </p>
        </motion.div>

        {/* Core services */}
        <Box className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-semibold text-foreground mb-6"
          >
            Core Services
          </motion.h3>
          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_SERVICES.map((service, index) => {
              const Icon = service.icon;
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 rounded-xl bg-secondary/50 border border-border transition-all ${
                    service.href ? "hover:border-white/30 cursor-pointer" : ""
                  }`}
                >
                  <Box className="flex items-start gap-4">
                    <Box
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
                    >
                      <Icon className="w-5 h-5" />
                    </Box>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </Box>
                </motion.div>
              );

              return service.href ? (
                <Link key={service.name} href={service.href || "#"}>
                  {content}
                </Link>
              ) : (
                <div key={service.name}>{content}</div>
              );
            })}
          </Box>
        </Box>

        {/* Additional services */}
        <Box className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-semibold text-foreground mb-6"
          >
            Additional Services
          </motion.h3>
          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDITIONAL_SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-lg bg-background/50 border border-border/50"
                >
                  <Box className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{service.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{service.description}</span>
                    </div>
                  </Box>
                </motion.div>
              );
            })}
          </Box>
        </Box>

        {/* CLI showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/80 border border-border rounded-xl overflow-hidden"
        >
          <Box className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Box className="flex gap-1.5">
              <Box className="w-3 h-3 rounded-full bg-primary/10" />
              <Box className="w-3 h-3 rounded-full bg-primary/10" />
              <Box className="w-3 h-3 rounded-full bg-primary/10" />
            </Box>
            <span className="text-xs text-muted-foreground font-mono">hanzo platform</span>
          </Box>
          <Box className="p-6 font-mono text-sm">
            <div className="space-y-3">
              <Box className="text-muted-foreground">
                <span className="text-foreground">$</span> hanzo init my-app
              </Box>
              <Box className="text-muted-foreground">
                ✓ Created project configuration
              </Box>
              <Box className="text-muted-foreground">
                ✓ Initialized Auth, Database, Storage
              </Box>
              <Box className="text-muted-foreground">
                ✓ Generated TypeScript types
              </Box>
              <Box className="mt-4 text-muted-foreground">
                <span className="text-foreground">$</span> hanzo dev
              </Box>
              <Box className="text-muted-foreground">
                Starting local development server...
              </Box>
              <Box className="flex items-center gap-2">
                <Box className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">
                  Platform running at http://localhost:8000
                </span>
              </Box>
              <Box className="mt-4 text-muted-foreground">
                <span className="text-foreground">$</span> hanzo serve cloud
              </Box>
              <Box className="text-muted-foreground">
                Deploying to production...
              </Box>
              <Box className="flex items-center gap-2">
                <Box className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">
                  Live at https://my-app.hanzo.app
                </span>
              </Box>
            </div>
          </Box>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Box className="flex flex-wrap justify-center gap-4">
            <a
              href="https://docs.hanzo.ai/docs/services/platform"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 text-sm bg-primary text-primary-foreground"

            >
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
            <Link
              href="/cloud"
              className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-border bg-transparent hover:bg-secondary text-sm text-foreground"
            >
              Compare to Cloud
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default PaaSCapabilities;
