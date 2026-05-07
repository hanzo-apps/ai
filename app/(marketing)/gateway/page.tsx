"use client"

import { motion } from "framer-motion"
import {
  Network,
  ArrowRight,
  Shield,
  Gauge,
  Eye,
  Route,
  Plug,
  Lock,
} from "lucide-react"

export default function GatewayPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8"
          >
            <Network className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              api.hanzo.ai
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Gateway
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Unified API gateway
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            One front door for every Hanzo service. Authentication, rate
            limiting, intelligent routing, and full observability — built into a
            single high-performance edge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/gateway"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/hanzoai/gateway"
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
            >
              View on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything Routes Through Gateway
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Auth, rate limit, route, and observe — one gateway, every service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Native IAM Auth",
                description:
                  "JWT validation at the edge. Identity headers injected into every upstream. Client-supplied identity headers stripped.",
              },
              {
                icon: Gauge,
                title: "Rate Limiting",
                description:
                  "Per-org, per-user, per-route token bucket limits. Burst tolerant. Backed by Valkey for cluster-wide consistency.",
              },
              {
                icon: Route,
                title: "Smart Routing",
                description:
                  "Path-based, header-based, and weighted routing. Canary deploys, A/B traffic splits, and zero-downtime cutovers.",
              },
              {
                icon: Eye,
                title: "Observability",
                description:
                  "Structured logs, metrics, and distributed traces for every request. OTLP export to your collector of choice.",
              },
              {
                icon: Plug,
                title: "Extensible",
                description:
                  "Plugin architecture for custom auth, transforms, and policies. Write in Go or use the embedded Lua VM.",
              },
              {
                icon: Lock,
                title: "TLS Everywhere",
                description:
                  "Automatic certificate provisioning via ACME. mTLS for service-to-service. HTTP/2 and HTTP/3 ready.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-neutral-600 transition-colors"
              >
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
                  <feature.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources / Final CTA */}
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Hanzo Gateway</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://docs.hanzo.ai/gateway"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium"
            >
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/hanzoai/gateway"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
