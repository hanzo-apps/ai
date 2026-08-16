"use client"

import { motion } from "@/components/motion"
import {
  Activity,
  ArrowRight,
  BarChart3,
  Clock,
  DollarSign,
  Eye,
  GitBranch,
  Shield,
} from "lucide-react"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
import { Box } from '@hanzo/ui'
export default function ConsolePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <Box className="absolute inset-0 overflow-hidden">
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
        </Box>

        <Box className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8"
          >
            <Activity className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              console.hanzo.ai
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
              Console
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            One admin for everything you run
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Every product on Hanzo Cloud has a module here — providers and
            models, keys, applications, stores, agents, clusters, domains,
            billing. Sign in once and the sidebar is whatever your organization
            actually uses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">/v1</Box>
              <Box className="text-sm text-muted-foreground">One API behind it</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">OIDC</Box>
              <Box className="text-sm text-muted-foreground">Sign in with Hanzo IAM</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">Per-org</Box>
              <Box className="text-sm text-muted-foreground">Data scoped to your org</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">OSS</Box>
              <Box className="text-sm text-muted-foreground">MIT or Apache-2.0</Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://console.hanzo.ai"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Open Console
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://docs.hanzo.ai/docs/console"
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
              A module per product, one shell around them
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Add what you use. Hide what you don't. The shell stays the same.
            </p>
          </motion.div>

          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Providers and models",
                description:
                  "Every model your organization can call, and which provider serves it. Connect an account of your own and its models appear beside the ones we run.",
              },
              {
                icon: DollarSign,
                title: "Usage and balance",
                description:
                  "A usage record per call and one balance per organization, so spend is attributed where it happened instead of totalled at the end of the month.",
              },
              {
                icon: Clock,
                title: "Keys",
                description:
                  "Issue an API key, scope it, revoke it. The key you paste into a client is minted here, and revoking it here is what stops it working.",
              },
              {
                icon: BarChart3,
                title: "Applications and stores",
                description:
                  "Register an app, hand it an identity, give it a store. The console writes the same resources the CLI does, because both are clients of the same API.",
              },
              {
                icon: GitBranch,
                title: "Find it by typing it",
                description:
                  "A command palette reaches every module and every record without learning where anything lives. The sidebar is yours to reorder and prune.",
              },
              {
                icon: Shield,
                title: "Scoped to the org on your token",
                description:
                  "Sign-in is OIDC against Hanzo IAM. What you see is what your organization owns, and switching organization switches the whole page — there is no global view to fall into by accident.",
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

      {/* Code Example */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <Box className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The console is a client. So is your code.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything on these screens is a call to api.hanzo.ai/v1, and the typed clients are generated from the same document.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-secondary border border-border rounded-xl overflow-hidden"
          >
            <Box className="flex items-center gap-2 px-4 py-2 border-b border-border">
              <Box className="flex gap-1.5">
                <Box className="w-3 h-3 rounded-full bg-neutral-700" />
                <Box className="w-3 h-3 rounded-full bg-neutral-700" />
                <Box className="w-3 h-3 rounded-full bg-neutral-700" />
              </Box>
              <span className="text-xs text-muted-foreground ml-2">
                app.py
              </span>
            </Box>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-foreground/80">{`from hanzoai.cloud import ApiClient, Configuration, ChatApi

# The key you issued in the console
config = Configuration(
    host="https://api.hanzo.ai",
    access_token="sk-...",
)

with ApiClient(config) as client:
    print(ChatApi(client).post_v1_chat_completions())

# The call, and what it cost, are on your
# organization's usage before it returns.`}</code>
            </pre>
          </motion.div>
        </Box>
      </section>

      <OSSRevenueBanner upstreamName="Console" />

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
                Open the console
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Sign in with your Hanzo identity. The organization you land in is the one that gets billed, and everything on these screens belongs to it.
              </p>

              <Box className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://console.hanzo.ai"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Open Console
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
                <ProductFooter slug="console" name="Console" />
</Box>
      </section>
    </>
  )
}
