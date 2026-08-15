"use client"

import { motion } from "@/components/motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  AlertTriangle,
  ArrowRight,
  Bug,
  Activity,
  Users,
  GitBranch,
  Bell,
  Zap,
} from "lucide-react"

export default function SentinelPage() {
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
            <AlertTriangle className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              sentry.hanzo.ai
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
              Sentinel
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Error tracking and performance monitoring
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Sentinel takes the errors your applications throw, groups the identical ones into a single issue,
            and tells you which issues are new, which came back, and which are getting worse. It speaks the
            Sentry wire protocol, so the client libraries you already have report to it unchanged — a DSN
            pointing at your instance is the only line that differs. There is no Sentinel SDK to adopt, and
            none is planned. The protocol is the interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/docs/skills/hanzo-sentry"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/hanzoai"
              target="_blank"
              rel="noopener noreferrer"
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
              Enough context to fix it without asking
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A stack trace tells you where. The rest of this tells you who, how often, since when, and what
              they were doing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bug,
                title: "One issue, not ten thousand events",
                description:
                  "Identical exceptions collapse into a single issue with a count and a first-seen date. Minified frontend frames are resolved through your source maps, and the breadcrumbs leading up to the throw come with it, so you read what the person did rather than guessing.",
              },
              {
                icon: Activity,
                title: "Traces, and profiles under them",
                description:
                  "A request that crosses four services is one trace, and the span that took the time is visible in it. Profiles go a level down to the function. Session replay shows the same failure from the browser's side.",
              },
              {
                icon: GitBranch,
                title: "Did this release make it worse",
                description:
                  "Crash-free sessions per release, so a regression shows up in the first hour of a rollout rather than in a support queue on Monday. Cron monitors catch the opposite failure — the job that stopped running and threw nothing at all.",
              },
              {
                icon: Users,
                title: "Which customers are hitting it",
                description:
                  "Events carry the identity and the environment they came from, so an issue can be read as a list of affected accounts. That turns triage from a guess about severity into a decision about who to call.",
              },
              {
                icon: Bell,
                title: "Where the alert goes",
                description:
                  "New issues, regressions and spikes route to Slack, PagerDuty, Opsgenie, Discord, Microsoft Teams, email, or a webhook of your own. It can also open the ticket — GitHub, GitLab, Jira and Bitbucket are wired both ways.",
              },
              {
                icon: Zap,
                title: "A fork, and it says so",
                description:
                  "Sentinel is a fork of Sentry, used under the Functional Source License with attribution kept current. Sentry is a trademark of Functional Software, Inc., and Sentinel is neither affiliated with nor endorsed by them. Naming what you forked is not the same as branding yourself with it.",
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

      {/* Resources / Get Started */}
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Hanzo Sentinel</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://docs.hanzo.ai/docs/skills/hanzo-sentry"
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
                <ProductFooter slug="sentinel" name="Sentinel" />
</div>
      </section>
    </>
  )
}
