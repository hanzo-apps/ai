"use client"

import { motion } from "framer-motion"
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

export default function VisorPage() {
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
            VM and bare-metal management plane
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Provision, configure, monitor, and tear down virtual machines and
            bare-metal hosts from one API. Built for AI workloads — GPU-aware,
            image-cached, and boot-fast.
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
              href="https://github.com/hanzoai/visor"
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
              One API for Every Host
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              VMs, bare metal, GPUs — Visor treats them all the same.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "GPU-Aware",
                description:
                  "First-class scheduling for NVIDIA, AMD, and accelerator hosts. Topology-aware placement and partitioning.",
              },
              {
                icon: HardDrive,
                title: "Image Caching",
                description:
                  "Content-addressable image store on every node. Cold-boot a 50GB image in seconds, not minutes.",
              },
              {
                icon: Network,
                title: "Software-Defined Networking",
                description:
                  "Per-tenant overlay networks, security groups, and floating IPs. Wire-speed via XDP and VXLAN.",
              },
              {
                icon: Activity,
                title: "Live Telemetry",
                description:
                  "Per-VM CPU, memory, GPU, disk, and network metrics streamed to your observability sink in real time.",
              },
              {
                icon: Terminal,
                title: "Console & Serial",
                description:
                  "Browser-based VNC and serial console. Recover stuck hosts without leaving the dashboard.",
              },
              {
                icon: ShieldCheck,
                title: "Hardware-Rooted Trust",
                description:
                  "TPM attestation and measured boot for bare metal. Verified images, signed kernels, encrypted disks.",
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

      {/* Resources / Final CTA */}
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Hanzo Visor</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://docs.hanzo.ai/docs/services/visor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium"
            >
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/hanzoai/visor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium"
            >
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="visor" name="Visor" />
</div>
      </section>
    </>
  )
}
