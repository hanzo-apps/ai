"use client"

import { motion } from "@/components/motion"
import {
  HardDrive,
  ArrowRight,
  Lock,
  Globe,
  Zap,
  FileUp,
  Layers,
  Shield,
} from "lucide-react"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
export default function StoragePage() {
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
            <HardDrive className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              s3.hanzo.ai
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
              Storage
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Buckets for files, weights and backups
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Anything that is a file — uploads, model weights, datasets,
            database backups, rendered media — kept in buckets addressed over
            HTTP. Send a large one in parts and resume the part that failed.
            Hand out a link that expires. Keep the old version of an object so
            an overwrite is recoverable, and let a lifecycle rule retire what
            has aged. Objects are erasure-coded across ten data shards and four
            parity shards, so four can be lost and the object still reads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">Buckets</div>
              <div className="text-sm text-muted-foreground">Over HTTP</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">AES-256</div>
              <div className="text-sm text-muted-foreground">At rest</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">10 + 4</div>
              <div className="text-sm text-muted-foreground">Erasure coding</div>
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">OIDC</div>
              <div className="text-sm text-muted-foreground">SSO built-in</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://s3.hanzo.ai"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
            >
              Open Storage Console
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://docs.hanzo.ai/docs/storage"
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
            >
              Documentation
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
              What a bucket gives you
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The pieces you would otherwise build around a filesystem, already built.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: "One HTTP API for objects",
                description:
                  "Buckets, objects, prefixes and listings over HTTP. Presigned URLs hand someone a link that stops working on a schedule. Multipart upload covers the file too big to send in one request.",
              },
              {
                icon: Lock,
                title: "Keys from KMS, not a config file",
                description:
                  "Each object gets a fresh data key, sealed under a key derived from your master, the key id and that request's own context. The master itself never lands on disk. Supply your own per-object key instead if you would rather hold it.",
              },
              {
                icon: Zap,
                title: "Large objects, handled as large",
                description:
                  "An upload splits into parts that travel in parallel, and a part that fails retries on its own rather than restarting the file — which is the whole difference between a resumable upload and an unresumable one at the sizes weights and datasets reach.",
              },
              {
                icon: Globe,
                title: "A console you sign into",
                description:
                  "Browse buckets, upload, set permissions and watch usage in the browser — behind your Hanzo account rather than a second password nobody remembers.",
              },
              {
                icon: FileUp,
                title: "Versions, locks and expiry",
                description:
                  "Keep old versions so an overwrite is recoverable. Put a retention period or a legal hold on an object and it cannot be deleted before its time. Write a lifecycle rule and the rest ages out on its own.",
              },
              {
                icon: Shield,
                title: "Sessions instead of standing keys",
                description:
                  "Sign in through OIDC and take a short-lived session rather than pasting a long-lived access key into a deployment. Bucket policies and per-user rules decide what that session can reach.",
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
              Three lines of setup
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
                upload.py
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-foreground/80">{`import boto3

s3 = boto3.client("s3",
    endpoint_url="https://s3.hanzo.ai",
    aws_access_key_id="your-access-key",
    aws_secret_access_key="your-secret-key",
)

# Upload a file
s3.upload_file("model.safetensors", "models", "v1/model.safetensors")

# Generate presigned URL
url = s3.generate_presigned_url("get_object",
    Params={"Bucket": "models", "Key": "v1/model.safetensors"},
    ExpiresIn=3600,
)`}</code>
            </pre>
          </motion.div>
        </div>
      </section>

      <OSSRevenueBanner upstreamName="MinIO" />

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
                Make a bucket
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Get started with 10 GB free. No egress fees on Hanzo Cloud.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://s3.hanzo.ai"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/hanzoai/storage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </motion.div>
                <ProductFooter slug="storage" name="Storage" />
</div>
      </section>
    </>
  )
}
