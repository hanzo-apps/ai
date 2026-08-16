"use client"

import { motion } from "@/components/motion"
import {
  Workflow,
  ArrowRight,
  Puzzle,
  Zap,
  Eye,
  Code,
  GitBranch,
  Shield,
} from "lucide-react"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
import { Box } from '@hanzo/ui'
export default function FlowPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <Box className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--white-08) 0%, transparent 70%)",
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
        </Box>

        <Box className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8"
          >
            <Workflow className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              flow.hanzo.ai
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
              Flow
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Build an AI workflow on a canvas, ship it as an API
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Drag a model, a vector store and a prompt onto a canvas, wire
            them together, and run it with the values you actually have.
            Every component is Python you can open and edit in place, so the
            canvas stops where your code starts instead of at a wall. When it
            works, publish it: a REST endpoint, a JSON file a Python app
            loads, or an MCP server, which turns the flow into a tool any MCP
            client can call.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">Python</Box>
              <Box className="text-sm text-muted-foreground">Every component</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">REST</Box>
              <Box className="text-sm text-muted-foreground">Or JSON, or MCP</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">:7860</Box>
              <Box className="text-sm text-muted-foreground">On your machine</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">MIT</Box>
              <Box className="text-sm text-muted-foreground">Self-hosted</Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://flow.hanzo.ai"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Open Flow
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://docs.hanzo.ai/docs/services/flow"
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
            >
              Documentation
            </a>
          </motion.div>
        </Box>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <Box className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The canvas is not the ceiling
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visual builders usually work right up until you need the thing
              they did not think of. This one hands you the source.
            </p>
          </motion.div>

          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Puzzle,
                title: "The library",
                description:
                  "Models, vector stores, document loaders, text splitters, output parsers, memory, retrievers and toolkits — plus anything you write yourself, which is a component like the rest.",
              },
              {
                icon: Code,
                title: "Open any node",
                description:
                  "A component is a Python class. Edit it in the browser and the change is live on the next run — no rebuild, no plugin format, no waiting for someone to add the parameter you need.",
              },
              {
                icon: Eye,
                title: "Step through it",
                description:
                  "The playground runs a flow one node at a time and shows what each one received and returned. When a chain gives a strange answer, this is where you find the node that caused it.",
              },
              {
                icon: GitBranch,
                title: "Multi-agent",
                description:
                  "Several agents on the same canvas, with conversation state between them and retrieval underneath — visible as a graph rather than buried in a prompt.",
              },
              {
                icon: Zap,
                title: "Publish it three ways",
                description:
                  "As a REST endpoint, as JSON your Python app loads directly, or as an MCP server — after which the flow is a tool your coding agent can call.",
              },
              {
                icon: Shield,
                title: "Keys stay out of the flow",
                description:
                  "Credentials live as variables the graph references by name, so a flow you export or share carries the wiring and not the secrets.",
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
                <Box className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
                  <feature.icon className="h-6 w-6 text-foreground" />
                </Box>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </Box>
        </Box>
      </section>

      <OSSRevenueBanner upstreamName="Langflow" />

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <Box className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-secondary/50 border border-border rounded-2xl p-8 md:p-12 text-center overflow-hidden"
          >
            <Box className="absolute inset-0 overflow-hidden">
              <Box className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <Box className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            </Box>

            <Box className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Run it locally first
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                uv pip install hanzoflow, then uv run hanzoflow run. It opens
                on 127.0.0.1:7860. Docker works too.
              </p>

              <Box className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://flow.hanzo.ai"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Open Flow
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/hanzoai"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
                >
                  View on GitHub
                </a>
              </Box>
            </Box>
          </motion.div>
                <ProductFooter slug="flow" name="Flow" />
</Box>
      </section>
    </>
  )
}
