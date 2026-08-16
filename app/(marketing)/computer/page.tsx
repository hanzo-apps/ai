"use client"

import { motion } from "@/components/motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  Laptop,
  ArrowRight,
  MousePointer2,
  Eye,
  Keyboard,
  Shield,
  Zap,
  Workflow,
} from "lucide-react"
import { Box } from '@hanzo/ui'

export default function ComputerPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <Box className="absolute inset-0 overflow-hidden">
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
        </Box>

        <Box className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8"
          >
            <Laptop className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              computer.hanzo.ai
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
              Computer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            An agent that uses the computer in front of it
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            It takes a screenshot, decides where to click, and clicks —
            the same inputs and outputs a person has. Say what you want in a
            sentence and it works through the apps already on the machine,
            with no API and no integration for any of them. Install it with
            pip, run <span className="font-mono">operate</span>, and type an
            objective.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://computer.hanzo.ai"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Try Hanzo Computer
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://docs.hanzo.ai/docs/skills/hanzo-computer"
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
              If a person can click it, so can this
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The screen is the interface. That is the whole trick, and it is
              why the app you need to automate does not have to know anything
              about it.
            </p>
          </motion.div>

          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "It reads pixels",
                description:
                  "No DOM, no accessibility tree, no selectors to maintain. A native app, a canvas, a remote desktop and a web page all look the same to it — like a screenshot.",
              },
              {
                icon: MousePointer2,
                title: "Mouse and keyboard",
                description:
                  "Mac, Windows, and Linux with an X server. On macOS the terminal asks for Screen Recording and Accessibility the first time, because those are exactly the permissions this needs.",
              },
              {
                icon: Keyboard,
                title: "OCR when clicking is hard",
                description:
                  "Add -with-ocr to the model and it reads text off the screen to build a map of clickable elements — the fix for a button a model can see but keeps missing by twenty pixels.",
              },
              {
                icon: Workflow,
                title: "Set-of-Mark prompting",
                description:
                  "Add -with-som and the screenshot arrives pre-labelled, so the model names a marked element instead of guessing a coordinate.",
              },
              {
                icon: Zap,
                title: "Say it out loud",
                description:
                  "operate --voice takes the objective by microphone. Needs the audio extras and portaudio installed; it is not in the base install.",
              },
              {
                icon: Shield,
                title: "It has whatever you have",
                description:
                  "This runs as you, on your machine, with your logged-in sessions. Give it a fresh user account or a VM before you give it anything that matters — and remember that text on a web page can try to redirect it.",
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
                For the software with no API
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                The vendor portal that exports one CSV at a time. The desktop
                tool from 2009. The internal app nobody will reopen. Those.
              </p>

              <Box className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://computer.hanzo.ai"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Try Hanzo Computer
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/hanzoai/computer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
                >
                  View on GitHub
                </a>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </section>

      {/* Resources */}
      <section className="py-16 border-t border-neutral-800">
        <Box className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Hanzo Computer</h2>
          <Box className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/skills/hanzo-computer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/computer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </Box>
                <ProductFooter slug="computer" name="Computer" />
</Box>
      </section>
    </>
  )
}
