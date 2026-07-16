"use client"

import { motion } from "framer-motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  ArrowRight,
  Blocks,
  Accessibility,
  Palette,
  Code2,
  Zap,
  Component,
  ShieldCheck,
  Layers,
  Sparkles,
} from "lucide-react"

const features = [
  {
    icon: Component,
    title: "60+ Components",
    description:
      "Buttons, dialogs, dropdowns, tables, forms, navigation — everything you need to build a Hanzo-grade React app, batteries included.",
  },
  {
    icon: Accessibility,
    title: "Accessible by Default",
    description:
      "WAI-ARIA compliant, keyboard navigable, screen reader tested. Accessibility isn't an afterthought — it's the foundation.",
  },
  {
    icon: Palette,
    title: "Themeable, Not Theme-locked",
    description:
      "CSS variables and Tailwind tokens make every component re-skin in seconds. White-label per org, theme per route, dark by default.",
  },
  {
    icon: Code2,
    title: "Copy, Don't Install",
    description:
      "Components live in your repo, not in node_modules. Tweak them, fork them, own them. No vendor escape velocity required.",
  },
  {
    icon: Zap,
    title: "Zero Runtime",
    description:
      "Built on Tailwind and Radix primitives. No styled-components, no emotion, no runtime CSS-in-JS — just classes that ship.",
  },
  {
    icon: ShieldCheck,
    title: "Production Tested",
    description:
      "Powers chat.hanzo.ai, console.hanzo.ai, and every Hanzo dashboard. If it ships in our products, it ships in your code.",
  },
]

export default function UiPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8"
          >
            <Blocks className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              React Component Library
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
              UI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            The React components powering Hanzo apps
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Open-source, accessible, themeable React components built on Tailwind
            and Radix primitives. Copy into your repo, own them forever, ship faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/docs/projects/hanzoai/ui"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Browse components
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/hanzoai/ui"
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
            >
              GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features */}
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
              Components your design team will sign off on
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The same library we use to ship our own products — open-sourced for yours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
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

      {/* Quickstart */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              From <code className="text-foreground">init</code> to UI in 60 seconds
            </h2>
            <p className="text-xl text-muted-foreground">
              Add the components you need. Skip the ones you don't.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-secondary border border-border rounded-xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-neutral-700" />
                <div className="w-3 h-3 rounded-full bg-neutral-700" />
                <div className="w-3 h-3 rounded-full bg-neutral-700" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-foreground/80">{`# Initialize in any React project
npx @hanzo/ui init

# Add the components you need
npx @hanzo/ui add button dialog dropdown-menu

# Use them
import { Button } from "@/components/ui/button"

export function Hello() {
  return <Button>Ship it</Button>
}`}</code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
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
                Stop reinventing buttons.
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Hanzo UI gives you the components — you focus on what makes your product different.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://docs.hanzo.ai/docs/projects/hanzoai/ui"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Browse components
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/hanzoai/ui"
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
          <h2 className="text-2xl font-bold mb-4">Get started with UI</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/projects/hanzoai/ui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/ui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="ui" name="UI" />
</div>
      </section>
    </>
  )
}
