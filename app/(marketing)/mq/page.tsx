"use client"

import { motion } from "@/components/motion"
import {
  ListOrdered,
  ArrowRight,
  Clock,
  Repeat,
  Shield,
  Zap,
  BarChart3,
  Layers,
} from "lucide-react"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"
import OSSComputeDividends from "@/components/oss/OSSComputeDividends"

import { ProductFooter } from "@/components/products/ProductFooter"
export default function MQPage() {
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
            <ListOrdered className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              Job queue
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
              MQ
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Background work, done later
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            MQ is a TypeScript library, not a server to run. Import it and
            your jobs live as data structures in Hanzo KV: add one here, and a
            worker in another process picks it up — with priorities, delays,
            retries with backoff, a rate limit per queue, and parent jobs that
            wait on their children. Every state change is a Lua script running
            inside the store, so two workers never take the same job.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">Library</div>
              <div className="text-sm text-muted-foreground">No broker to run</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">Cron</div>
              <div className="text-sm text-muted-foreground">Scheduling</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">Retries</div>
              <div className="text-sm text-muted-foreground">With backoff</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">At-least-once</div>
              <div className="text-sm text-muted-foreground">Delivery</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/docs/services/mq"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/hanzoai"
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
            >
              GitHub
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
              The queue is data, the workers are yours
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nothing sits in the middle deciding. The state is in Hanzo KV and
              your processes race for it, safely.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Scheduling",
                description:
                  "A cron expression, a delay in milliseconds, or a job that repeats on an interval — timezone aware, and held in the store rather than in a process that might restart.",
              },
              {
                icon: Zap,
                title: "Rate Limiting",
                description:
                  "Cap how many jobs a queue may start in a window, and how many a single worker runs at once. The third-party API with a quota stops being the reason your service falls over.",
              },
              {
                icon: Layers,
                title: "Priority Queues",
                description:
                  "A job carries a priority, so the urgent one goes ahead of the backlog. Inside one priority it stays first in, first out, which is what keeps ordinary work from quietly starving.",
              },
              {
                icon: Repeat,
                title: "Retry & Backoff",
                description:
                  "Set attempts and a backoff — fixed, exponential, or a function you write. A worker that dies mid-job loses its lock and the job is handed to another, so work is attempted at least once and can be attempted twice. Write it to be idempotent and that is a property rather than a surprise.",
              },
              {
                icon: BarChart3,
                title: "Watch it happen",
                description:
                  "QueueEvents streams completed, failed, progress and stalled as they occur, so a job's life is something you observe rather than reconstruct from logs afterwards.",
              },
              {
                icon: Shield,
                title: "Failure is a state, not a deletion",
                description:
                  "A job that runs out of attempts lands in the failed set carrying its error and stack. Read it, fix the cause, retry it. Nothing disappears because it went wrong.",
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

      {/* Code Example */}
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
              Add a job here, run it there
            </h2>
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
              <span className="text-xs text-muted-foreground ml-2">
                worker.ts
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-foreground/80">{`import { Queue, Worker } from "@hanzo/mq"

const queue = new Queue("emails", {
  connection: { host: "kv.hanzo.ai", port: 6379 }
})

// Add jobs with options
await queue.add("welcome", { userId: "usr_123" }, {
  priority: 1,
  delay: 5000,
  attempts: 3,
  backoff: { type: "exponential", delay: 1000 },
})

// Process jobs
const worker = new Worker("emails", async (job) => {
  await sendEmail(job.data.userId, "welcome")
}, {
  connection: { host: "kv.hanzo.ai", port: 6379 },
  concurrency: 10,
  limiter: { max: 100, duration: 60_000 },
})`}</code>
            </pre>
          </motion.div>
        </div>
      </section>

      <OSSRevenueBanner upstreamName="BullMQ" />
      <OSSComputeDividends variant="banner" />

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
                Add a job and walk away
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Free tier includes 10K jobs/month. No job size limits.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://docs.hanzo.ai/docs/services/mq"
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
              </div>
            </div>
          </motion.div>
                <ProductFooter slug="mq" name="MQ" />
</div>
      </section>
    </>
  )
}
