"use client"

import { motion } from "framer-motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  Plug,
  ArrowRight,
  Package,
  Search,
  Download,
  GitBranch,
  Lock,
  Wrench,
} from "lucide-react"

export default function SkillsPage() {
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
            <Plug className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              hanzoai/skills
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Development knowledge your coding agent loads only when it needs it
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            A skill is a markdown file about one thing — Postgres query
            plans, Zig comptime, TLS certificate chains. Install the plugin
            and your agent reads the right one when the work calls for it,
            instead of carrying all of them into every session.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/docs/skills"
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
              Coverage costs context. This is the trade.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Load every guide at boot and the context window is spent
              before the first file is opened. Load none and the agent
              guesses at things that have known answers. Skills splits the
              difference: small files, and a discovery layer that fetches
              them on the keywords in what you asked for.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: "A skill is a markdown file",
                description:
                  "Frontmatter carries a name and a description. Below it is prose, code, and links to related skills. Nothing to compile, nothing to run — you can read one before you trust it.",
              },
              {
                icon: Search,
                title: "Gateway skills do the finding",
                description:
                  "A gateway is a small skill whose whole job is to notice. Say Postgres and discover-database wakes up; say comptime and discover-zig does. It pulls the specific files and gets out of the way.",
              },
              {
                icon: Download,
                title: "Install it as a plugin",
                description:
                  "/plugin install https://github.com/hanzoai/skills in Claude Code, or add hanzoai/skills as a marketplace and pick what you want.",
              },
              {
                icon: GitBranch,
                title: "Written small on purpose",
                description:
                  "One topic per file, a few hundred lines each. Five focused reads cost less than one monolithic guide, and you get the five that matter instead of the one that covers everything badly.",
              },
              {
                icon: Lock,
                title: "Cross-referenced, not duplicated",
                description:
                  "Skills link to the skills next to them, so an agent following a thread from API design into rate limiting into Redis reads three files and never the same paragraph twice.",
              },
              {
                icon: Wrench,
                title: "Add your own",
                description:
                  "Drop a markdown file in a category, give it a name and a description, and it joins discovery. Your house conventions load the same way the public ones do.",
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
          <h2 className="text-2xl font-bold mb-4">Get started with Skills</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://docs.hanzo.ai/docs/skills"
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
                <ProductFooter slug="skills" name="Skills" />
</div>
      </section>
    </>
  )
}
