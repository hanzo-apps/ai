"use client"

import { motion } from "framer-motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  Shield,
  ArrowRight,
  Filter,
  Lock,
  Eye,
  AlertTriangle,
  ScrollText,
  Plug,
} from "lucide-react"

export default function GuardPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(253, 68, 68, 0.08) 0%, transparent 70%)",
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
            <Shield className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              hanzoai/guard
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Guard
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            It reads what goes into a model, and what comes back
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            People paste their social security number into a chat box. Guard catches it on the way out and
            replaces it before the model ever sees it, then reads the reply on the way back. It runs three ways:
            as a proxy in front of an LLM API, as a wrapper around a command-line tool, or as a filter in front
            of an MCP server. A Rust library and a Unix pipe if you would rather not run a process at all.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/docs/services/guard"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Get started
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
              What it looks for
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Detectors you can read, thresholds you can move, and no claim to understand meaning. Guard is the
              first layer, not the only one.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Six shapes an injection takes",
                description:
                  "Overriding the instructions, role-play, asking for the system prompt, bypassing a rule, hiding the ask in an encoding, and reframing the context. A match returns a confidence rather than a verdict, and you decide what confidence is worth blocking.",
              },
              {
                icon: Lock,
                title: "The things people paste by accident",
                description:
                  "Social security numbers, card numbers checked against the Luhn digit so a phone number is not mistaken for one, emails, phone numbers, IP addresses, and provider API keys. Each becomes a typed marker, so the model still knows a card number was there and does not lose the sentence.",
              },
              {
                icon: Filter,
                title: "Both directions, on purpose",
                description:
                  "The reply is read with the same detectors as the request, because the leak that matters is usually the one coming back. A machine-learning classifier for categories like violence and self-harm is available and off unless you turn it on — pattern matching is the default because it is the part that behaves the same every time.",
              },
              {
                icon: ScrollText,
                title: "You set the dials",
                description:
                  "Turn each detector on or off, set the injection threshold, add your own patterns for whatever is sensitive in your domain, and choose the marker text. Requests are rate limited per user with a token bucket, so a single caller cannot burn the budget.",
              },
              {
                icon: Eye,
                title: "A log that is not a second copy of the leak",
                description:
                  "Decisions are written as JSON lines with a hash of the content, not the content. Logging what you just redacted would put it in a file with weaker access control than the one you took it out of. Turn content logging on deliberately, or leave it off.",
              },
              {
                icon: Plug,
                title: "Nothing to rewrite",
                description:
                  "Start the proxy with your provider as the upstream and point the base URL at it. Or wrap a CLI tool over a pseudo-terminal and everything you type is filtered on its way in. Or put it in front of an MCP server and filter the tool calls.",
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

      {/* Final CTA */}
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Guard</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://docs.hanzo.ai/docs/services/guard"
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
                <ProductFooter slug="guard" name="Guard" />
</div>
      </section>
    </>
  )
}
