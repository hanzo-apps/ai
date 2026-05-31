"use client"

import { motion } from "framer-motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  LayoutGrid,
  ArrowRight,
  Sparkles,
  Code,
  Rocket,
  Layers,
  Search,
  GitFork,
} from "lucide-react"

export default function GalleryPage() {
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
            <LayoutGrid className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              gallery.hanzo.ai
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Gallery
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Curated template showcase for Hanzo products
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Production-ready starters for every Hanzo product. Browse, fork,
            deploy. From RAG chatbots to multi-agent workflows — wired up to
            Hanzo Cloud, IAM, and KMS out of the box.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://gallery.hanzo.ai"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Browse the Gallery
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://docs.hanzo.ai/gallery"
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
            >
              Documentation
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
              Start from a Working App
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Templates that build, deploy, and scale on day one.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "RAG Chatbots",
                description:
                  "Vector + Chat + Zen, prewired. Plug your docs in, ship a branded assistant in an afternoon.",
              },
              {
                icon: Layers,
                title: "Agent Workflows",
                description:
                  "Multi-step agents using the Hanzo Agent SDK. Email triage, research bots, research-to-PR pipelines.",
              },
              {
                icon: Rocket,
                title: "Deploy in One Click",
                description:
                  "Every template ships with a Hanzo Cloud deploy button. CI, secrets, and scaling preconfigured.",
              },
              {
                icon: Code,
                title: "Open Source",
                description:
                  "All templates Apache-2.0 in the hanzoai/gallery monorepo. Read the code, fork the project.",
              },
              {
                icon: Search,
                title: "Searchable",
                description:
                  "Filter by stack, product, or use case. Live previews. Embedded code playgrounds.",
              },
              {
                icon: GitFork,
                title: "Submit Yours",
                description:
                  "Build a template the community will love? Open a PR — we showcase the best with a paid bounty.",
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

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-secondary/50 border border-border rounded-2xl p-8 md:p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Skip the Boilerplate
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Ship your idea, not your scaffolding.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://gallery.hanzo.ai"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Browse the Gallery
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/hanzoai/gallery"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Gallery</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/gallery" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/gallery" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="gallery" name="Gallery" />
</div>
      </section>
    </>
  )
}
