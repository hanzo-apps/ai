"use client"

import { motion } from "@/components/motion"
import {
  Cog,
  ArrowRight,
  Plug,
  Clock,
  GitBranch,
  Shield,
  Zap,
  Eye,
} from "lucide-react"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
import { Box } from '@hanzo/ui'
export default function AutoPage() {
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
            <Cog className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              auto.hanzo.ai
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
              Auto
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Workflow automation in one binary
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Draw a workflow, connect the apps it touches, and fire it from a
            webhook or a schedule. The whole thing is one Go process: the
            editor, the connector catalog, the database and the durable
            executor are compiled in. There is no Node at runtime, no
            reverse proxy to configure, and no Postgres to run beside it.
            One image, one port, one thing to restart.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">Go</Box>
              <Box className="text-sm text-muted-foreground">One process</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">SQLite</Box>
              <Box className="text-sm text-muted-foreground">Per replica</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">/v1</Box>
              <Box className="text-sm text-muted-foreground">Flows and runs</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">Apache</Box>
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
              href="https://auto.hanzo.ai"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Open Auto
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://docs.hanzo.ai/docs/services/auto"
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
              A run that survives the restart
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Most of what makes automation hard is what happens on step
              seven of nine when the process dies.
            </p>
          </motion.div>

          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Durable execution",
                description:
                  "A run is a record, not a goroutine. Step state is written down as it goes, so a crash, a deploy or a rescheduled pod resumes where it stopped rather than starting over or losing the run.",
              },
              {
                icon: Plug,
                title: "The catalog is in the binary",
                description:
                  "GET /v1/pieces lists the connectors this build has. No plugin registry to reach at boot, so the version you deployed is the version that runs, offline and forever.",
              },
              {
                icon: Zap,
                title: "Triggers",
                description:
                  "POST to a trigger and a run starts. Or start one by hand against /v1/runs. Either way it is the same run object with the same history.",
              },
              {
                icon: Eye,
                title: "Watch it live",
                description:
                  "The editor is React Flow, embedded in the binary, and it follows a run over a server-sent event stream — so the canvas you drew is the canvas you watch execute.",
              },
              {
                icon: GitBranch,
                title: "Draft, then publish",
                description:
                  "Edit a flow freely; nothing changes for callers until you publish. What triggers fire is a published version, so editing in the afternoon does not change what runs overnight.",
              },
              {
                icon: Shield,
                title: "Connections, not pasted keys",
                description:
                  "A connection is a named credential the flow refers to. It is encrypted at rest through Hanzo KMS, and who may touch it is Hanzo IAM's answer, not a second login here.",
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

      {/* Integrations */}
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
              Some of what it connects
            </h2>
          </motion.div>

          <Box className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Slack", "GitHub", "Notion", "Gmail", "Stripe",
              "HubSpot", "Jira", "Linear", "Discord", "Airtable",
              "Google Sheets", "Postgres",
            ].map((name, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="bg-secondary/30 border border-border rounded-lg p-3 text-center hover:border-neutral-600 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{name}</span>
              </motion.div>
            ))}
          </Box>
        </Box>
      </section>

      <OSSRevenueBanner upstreamName="ActivePieces" />

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
                Or run it yourself
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                One container, one port, a SQLite file for state. Nothing
                else to stand up first.
              </p>

              <Box className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://auto.hanzo.ai"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Open Auto
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
                <ProductFooter slug="auto" name="Auto" />
</Box>
      </section>
    </>
  )
}
