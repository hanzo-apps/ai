"use client"

import { motion } from "@/components/motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  Server,
  ArrowRight,
  Cpu,
  HardDrive,
  Network,
  Activity,
  Terminal,
  ShieldCheck,
} from "lucide-react"
import { Box } from '@hanzo/ui'

export default function VisorPage() {
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
            <Server className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">
              hanzoai/visor
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
              Visor
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Machines from several clouds, through one API
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Launch a machine, attach a volume, open a console, tear it down — the same four verbs whether the
            hardware is DigitalOcean, AWS, Hetzner, Azure, Google Cloud, Aliyun, Lightsail, or a KVM host in
            your own rack. Every machine belongs to an organization, and that organization is read from the
            signed identity on the request, never from a field the caller filled in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://docs.hanzo.ai/docs/services/visor"
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
              What you get for the price of one integration
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A machine is a machine. The provider is a field on it.
            </p>
          </motion.div>

          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "One catalogue, GPUs included",
                description:
                  "Regions, sizes and GPU instances from each provider, cached and priced, read through the same call. Ask for what you want; Visor knows which provider can give it to you and what it will cost there.",
              },
              {
                icon: HardDrive,
                title: "Volumes and images",
                description:
                  "Attach and detach block storage, launch from a provider image or one of your own. Batch launches name themselves in sequence and group under the prefix, so a fleet is just machines and there is no second object to learn.",
              },
              {
                icon: Network,
                title: "Pools, and managed Kubernetes",
                description:
                  "Node pools group machines by shape and role. Managed Kubernetes clusters are provisioned through the same surface, so the cluster and the machines beside it are one inventory rather than two consoles.",
              },
              {
                icon: Activity,
                title: "Priced before it exists",
                description:
                  "A launch can run as a dry run: it returns the quote and spends nothing. A real launch is metered against the organization as it goes, per provider, so the bill is assembled from the same numbers the quote came from.",
              },
              {
                icon: Terminal,
                title: "A console in the browser",
                description:
                  "RDP, VNC and SSH reach the machine through a gateway and render in a tab — no client to install, no key to hand out, and no bastion of your own to keep patched. The session is a record, not just a connection.",
              },
              {
                icon: ShieldCheck,
                title: "Every action leaves a row",
                description:
                  "Who launched it, who opened a console, who destroyed it, under which organization and project. Authorization runs through the same grant calculus the rest of the estate uses, so a machine cannot be reached by anyone whose token does not cover it.",
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

      {/* Resources / Final CTA */}
      <section className="py-16 border-t border-neutral-800">
        <Box className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Hanzo Visor</h2>
          <Box className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://docs.hanzo.ai/docs/services/visor"
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
          </Box>
                <ProductFooter slug="visor" name="Visor" />
</Box>
      </section>
    </>
  )
}
