"use client"

import { motion } from "@/components/motion"
import {
  KeyRound,
  ArrowRight,
  Lock,
  RefreshCw,
  Eye,
  GitBranch,
  Shield,
  Terminal,
} from "lucide-react"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
import { Box } from '@hanzo/ui'
export default function KMSPage() {
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
            <KeyRound className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              kms.hanzo.ai
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
              KMS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Secrets management
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Hanzo KMS is where the credentials your code needs actually live, so they stop living in a file
            somebody committed. The SDK seals a value on your machine before it goes anywhere: your passphrase
            becomes a key through Argon2id, that key becomes an organization key through HKDF-SHA256, and the
            value is sealed with AES-256-GCM. The organization key never leaves the client. What the server
            stores is a blob it cannot read.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">AES-256</Box>
              <Box className="text-sm text-muted-foreground">Sealed on your machine</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">K8s</Box>
              <Box className="text-sm text-muted-foreground">Secrets kept in step</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">Audit</Box>
              <Box className="text-sm text-muted-foreground">Every read recorded</Box>
            </Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4">
              <Box className="text-2xl font-bold text-foreground">MIT</Box>
              <Box className="text-sm text-muted-foreground">Run it yourself</Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://kms.hanzo.ai"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Open KMS
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://docs.hanzo.ai/docs/kms"
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
              What it holds and how it holds it
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A secret is a value under a path, a name and an environment, inside one organization. That is the
              whole model.
            </p>
          </motion.div>

          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: "Sealed before it leaves you",
                description:
                  "Argon2id turns a passphrase into a key, HKDF-SHA256 turns that into the organization's key, and AES-256-GCM seals the value. The organization key stays on the client. Sharing with a colleague wraps that same key to their public key using a hybrid post-quantum exchange, so nobody has to send anybody a secret to share one.",
              },
              {
                icon: GitBranch,
                title: "Into the process, not into a file",
                description:
                  "Run a command with the secrets already in its environment, export a dotenv when a tool insists on one, or let the Kubernetes operator keep a Secret in step with what KMS holds. The CLI also reads your repository and its git history looking for values that escaped.",
              },
              {
                icon: RefreshCw,
                title: "Replacing one is deliberate",
                description:
                  "Rotate is a command, and a write states the version it means to replace — so a second writer who read the old value is refused rather than quietly winning. Signing keys generate, sign and rotate through the same surface, backed by threshold MPC.",
              },
              {
                icon: Eye,
                title: "Who read it, when, and why",
                description:
                  "Reads and writes land in an append-only record written by a single writer off the request path, so keeping it never slows a fetch. An AI agent's read is attributed to that agent by name, not to whichever human's key it borrowed.",
              },
              {
                icon: Terminal,
                title: "One key, several languages",
                description:
                  "A CLI for a laptop and for CI. SDKs in Go, Node and Python over the same routes. In-cluster callers can take the binary ZAP transport instead of HTTP, and it enforces the identical token and role checks.",
              },
              {
                icon: Shield,
                title: "Fail closed, or do not start",
                description:
                  "Every call carries a Hanzo IAM token verified against a cached JWKS; HMAC and alg none are refused outright. The organization comes from the verified token, never from a field the caller sets. Outside development the daemon will not boot without an issuer, an audience and a JWKS URL — there is no accidental open mode. A secret can be marked so that any agent read waits for a person to approve it, or is refused.",
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
              Nothing lands on disk
            </h2>
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
                terminal
              </span>
            </Box>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-foreground/80">{`# Sign in, then point this directory at a path
kms login
kms init

# Start the process with its secrets already in the environment
kms run -- npm start

# ...or write a dotenv, for a tool that insists on one
kms export --format=dotenv

# Replace a value
kms rotate DATABASE_PASSWORD

# Find the ones that already escaped, here and in git history
kms scan`}</code>
            </pre>
          </motion.div>
        </Box>
      </section>

      <OSSRevenueBanner upstreamName="Infisical" />

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
                Take them out of the repo
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Use it hosted, or run the same binary yourself. The source is MIT and the client is where the
                encryption happens either way.
              </p>

              <Box className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://kms.hanzo.ai"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Open KMS
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/hanzoai/kms"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
                >
                  View on GitHub
                </a>
              </Box>
            </Box>
          </motion.div>
                <ProductFooter slug="kms" name="KMS" />
</Box>
      </section>
    </>
  )
}
