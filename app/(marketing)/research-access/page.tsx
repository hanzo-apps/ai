'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  FlaskConical,
  Sparkles,
  ExternalLink,
  Users,
  Share2,
  Server,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '@hanzo/capture/react'
import { EVENTS } from '@hanzo/capture'

const ZEN5_MODELS = [
  { id: 'zen5', label: 'zen5', description: 'Flagship next-gen foundation model' },
  { id: 'zen5-pro', label: 'zen5-pro', description: 'High-performance reasoning' },
  { id: 'zen5-max', label: 'zen5-max', description: '2M context, largest open-weight' },
  { id: 'zen5-ultra', label: 'zen5-ultra', description: 'Extended reasoning with CoT' },
  { id: 'zen5-mini', label: 'zen5-mini', description: 'Efficient edge deployment' },
]

const MOVE_UP = [
  {
    icon: Users,
    title: 'Refer friends',
    description: 'Every signup from your link moves you up the line.',
  },
  {
    icon: Share2,
    title: 'Share on social',
    description: 'Post on X, Discord, Telegram, YouTube, or Instagram.',
  },
  {
    icon: Server,
    title: 'Run a hanzod node',
    description: 'Contribute a cloud fragment and jump the line.',
  },
]

export default function ResearchAccessPage() {
  const analytics = useAnalytics()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Hero Section */}
        <section className="relative pt-28 pb-12 px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-foreground border border-border">
                <FlaskConical className="w-3 h-3" />
                Research Preview
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4"
            >
              Zen 5 Research Preview
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
            >
              Sign up free, then climb the waitlist for access to the Zen model
              family and hundreds of models behind one API. Zen 5 is in
              training; preview builds ship to the platform and publish as open
              weights as they land.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild className="bg-primary text-primary-foreground hover:bg-accent">
                <a
                  href="https://console.hanzo.ai"
                  onClick={() =>
                    analytics.capture(EVENTS.WAITLIST_JOINED, { source: 'research-preview' })
                  }
                >
                  Sign up free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
              >
                <Link href="/zen">Explore Zen models</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Move up the waitlist */}
        <section className="pb-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center text-xl sm:text-2xl font-medium tracking-tight mb-2"
            >
              Move up the line
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-center text-sm text-muted-foreground mb-8"
            >
              Earn points to jump ahead. The more you contribute, the sooner you
              get in.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MOVE_UP.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                  className="p-5 rounded-xl border border-border bg-secondary/30"
                >
                  <item.icon className="w-5 h-5 text-foreground mb-3" />
                  <h3 className="font-medium text-foreground text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Zen 5 lineup */}
        <section className="pb-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {ZEN5_MODELS.map((model) => (
                <div
                  key={model.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border bg-secondary/30"
                >
                  <Sparkles className="mt-0.5 w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="font-mono text-sm font-medium text-foreground">
                      {model.label}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {model.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Open weights */}
        <section className="pb-24 px-4 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-sm text-muted-foreground"
            >
              Released Zen models are open weight.{' '}
              <a
                href="https://huggingface.co/zenlm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline hover:no-underline text-foreground"
              >
                Browse on HuggingFace <ExternalLink className="w-3 h-3" />
              </a>
            </motion.p>
          </div>
        </section>
      </main>
    </div>
  )
}
