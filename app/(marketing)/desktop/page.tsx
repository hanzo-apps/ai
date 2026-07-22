"use client"

import { motion } from "framer-motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  ArrowRight,
  MonitorSmartphone,
  Cloud,
  Brain,
  Bot,
  Lock,
  Zap,
  Wifi,
  Settings,
  Apple,
} from "lucide-react"

const features = [
  {
    icon: Cloud,
    title: "All of Hanzo Cloud",
    description:
      "Sign in once and reach every Hanzo Cloud surface — projects, deployments, logs, billing, secrets — natively, without a browser tab.",
  },
  {
    icon: Brain,
    title: "Models, On Tap",
    description:
      "Chat with Zen models and 100+ third-party LLMs from a window that's always one keystroke away.",
  },
  {
    icon: Bot,
    title: "Agents That Live On Your Desk",
    description:
      "Run, monitor, and intervene in long-running agents from a real native UI. See tool calls and outputs as they happen.",
  },
  {
    icon: Wifi,
    title: "Online or Off",
    description:
      "Pin local models for offline work. Sync notes, prompts, and conversations the moment you reconnect.",
  },
  {
    icon: Lock,
    title: "Enterprise Auth",
    description:
      "SSO via Hanzo IAM with your org policy, MFA, and KMS-backed credentials. No tokens stored in plaintext, ever.",
  },
  {
    icon: Settings,
    title: "Native Performance",
    description:
      "Built on a native shell — instant launch, no Electron sluggishness, GPU-accelerated where it matters.",
  },
]

export default function DesktopPage() {
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
            <MonitorSmartphone className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              Native Desktop Client
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
              Desktop
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Hanzo Cloud, Models, and Agents — natively
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            One signed-in window for every Hanzo product on your machine.
            macOS, Windows, and Linux. Always-on, always-connected, always private.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/docs/projects/hanzoai/desktop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Download
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/hanzoai/desktop"
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
              The Hanzo OS, on your desktop
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Skip the browser. Skip the tabs. Open one app and you're already there.
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

      {/* Platforms */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Available everywhere you work
          </motion.h2>
          <p className="text-xl text-muted-foreground mb-12">
            Native installers for macOS (Apple Silicon + Intel), Windows, and Linux.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-6">
              <Apple className="w-8 h-8 mx-auto mb-3 text-foreground" />
              <div className="text-foreground font-medium">macOS</div>
              <div className="text-sm text-muted-foreground">arm64 + intel</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-6">
              <MonitorSmartphone className="w-8 h-8 mx-auto mb-3 text-foreground" />
              <div className="text-foreground font-medium">Windows</div>
              <div className="text-sm text-muted-foreground">x64 + arm64</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-6">
              <Zap className="w-8 h-8 mx-auto mb-3 text-foreground" />
              <div className="text-foreground font-medium">Linux</div>
              <div className="text-sm text-muted-foreground">deb + rpm + AppImage</div>
            </div>
          </div>
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
                Stop tab-switching. Start shipping.
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                One window. Every Hanzo product. Sign in once and never lose context again.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://docs.hanzo.ai/docs/projects/hanzoai/desktop"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Download
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/hanzoai/desktop"
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
          <h2 className="text-2xl font-bold mb-4">Get started with Desktop</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/projects/hanzoai/desktop" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/desktop" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="desktop" name="Desktop" />
</div>
      </section>
    </>
  )
}
