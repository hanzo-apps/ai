"use client"

import { motion } from "framer-motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  ArrowRight,
  Layers,
  Smartphone,
  Monitor,
  Palette,
  Zap,
  Component,
  Globe,
  Code2,
  Sparkles,
} from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "One Codebase, Every Surface",
    description:
      "Write your UI once. Render it natively on iOS, Android, web, and desktop. Same components, same props, same behavior.",
  },
  {
    icon: Palette,
    title: "Design Tokens, Not CSS",
    description:
      "Color, spacing, typography, motion — all centralized as tokens. White-label by org, theme by feature, all without forking.",
  },
  {
    icon: Zap,
    title: "Compile-Time CSS",
    description:
      "Styles flatten to atomic CSS at build time. Zero runtime cost on the web, zero style recalc on native.",
  },
  {
    icon: Component,
    title: "Composable Primitives",
    description:
      "Stack, XStack, YStack, Text, Button, Sheet, and Dialog — primitives that compose into anything without leaking abstraction.",
  },
  {
    icon: Sparkles,
    title: "Animated by Default",
    description:
      "Spring-driven animations on every prop. No extra library, no boilerplate — just declare the target state and ship.",
  },
  {
    icon: Code2,
    title: "Type-Safe Theming",
    description:
      "Every token is typed. TypeScript catches design-system drift before it lands in production.",
  },
]

export default function GuiPage() {
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
            <Layers className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              @hanzo/gui — Cross-Platform UI Kit
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
              GUI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            One UI kit. Every platform.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            The cross-platform UI kit and design system that powers every Hanzo
            surface — web, mobile, desktop. Tokens, primitives, and motion that
            ship the same code everywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">iOS</div>
              <div className="text-sm text-muted-foreground">Native</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">Android</div>
              <div className="text-sm text-muted-foreground">Native</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">Web</div>
              <div className="text-sm text-muted-foreground">Atomic CSS</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">Desktop</div>
              <div className="text-sm text-muted-foreground">macOS · Win · Linux</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/gui"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Read the docs
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/hanzoai/gui"
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
              Build it once. Ship it everywhere.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The same code that runs your web app runs your iOS app. No bridges, no compromise.
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
              Drop it in. Start shipping.
            </h2>
            <p className="text-xl text-muted-foreground">
              One install gets you the whole kit.
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
              <code className="text-foreground/80">{`# Install
pnpm add @hanzo/gui

# Use it
import { YStack, Button, Text } from '@hanzo/gui'

export function Welcome() {
  return (
    <YStack space="$4" padding="$4">
      <Text size="$8">Hello, Hanzo</Text>
      <Button>Get started</Button>
    </YStack>
  )
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
                The design system that ships your product
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Powered every Hanzo surface in production. Battle-tested across web, native, and desktop.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://docs.hanzo.ai/gui"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Read the docs
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/hanzoai/gui"
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
          <h2 className="text-2xl font-bold mb-4">Get started with GUI</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/gui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/gui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="gui" name="GUI" />
</div>
      </section>
    </>
  )
}
