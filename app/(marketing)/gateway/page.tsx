"use client"

import { motion } from "@/components/motion"
import { ProductFooter } from "@/components/products/ProductFooter"
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
            The trust boundary in front of the API
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Every request to api.hanzo.ai passes through it. It decides who the
            caller is: check the token against Hanzo IAM, throw away every
            identity header the client sent, write the canonical ones back from
            the verified claims, then hand the request on.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/docs/gateway"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/hanzoai"
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
              Nothing downstream has to ask who is calling
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gateway answers that once, at the edge, so every service behind it
              can read an org id and believe it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "The token is checked here",
                description:
                  "A JWT is validated against Hanzo IAM's JWKS before anything else reads the request. Opaque API keys aren't JWTs, so they go on to the service that issued them and it decides.",
              },
              {
                icon: Lock,
                title: "Identity headers are written, not trusted",
                description:
                  "X-User-Id, X-Org-Id, X-Roles and every X-IAM-* variant are stripped from every inbound request, then written back from the verified claims — sub, owner, roles. A curl flag can't set them.",
              },
              {
                icon: Route,
                title: "No route map, deliberately",
                description:
                  "For api.hanzo.ai it forwards /* straight to Hanzo Cloud, which owns the /v1 mount table. A second table here would be a second thing to keep in sync, and the first one to go stale.",
              },
              {
                icon: Gauge,
                title: "Rate limits per caller and overall",
                description:
                  "Token-bucket limits by client IP and across the edge as a whole, with per-endpoint overrides in config. A rejected request gets a 429 and a Retry-After, not a dropped connection.",
              },
              {
                icon: Eye,
                title: "Liveness that consults nothing",
                description:
                  "The health check answers whether the process is up and asks no backend. A probe that fails when a dependency blinks restarts a healthy process and turns one outage into two — so backends are dialed lazily and degrade per request instead.",
              },
              {
                icon: Plug,
                title: "A hop, or no hop at all",
                description:
                  "Run it as its own service in front of the API, or mount it inside the cloud binary with one call. Same checks either way — one less network hop when you don't want one.",
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
              href="https://docs.hanzo.ai/docs/gateway"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium"
            >
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/hanzoai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium"
            >
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="gateway" name="Gateway" />
</div>
      </section>
    </>
  )
}
