'use client'

import { ArrowRight, KeyRound, ShieldCheck, Cpu, Lock, FileCheck, Network } from "lucide-react"

import { ProductFooter } from "@/components/products/ProductFooter"
const features = [
  {
    icon: ShieldCheck,
    title: "FIPS 140-3 Level 3",
    description: "Hardware-backed key storage in tamper-evident HSM modules with certified cryptographic boundaries.",
  },
  {
    icon: Cpu,
    title: "You send a message, you get a signature",
    description: "The private key is made inside the module and stays there. Your code passes a key id and some bytes and receives a signature back, so there is no moment at which the key exists in your process to be leaked, logged, or written to a core dump.",
  },
  {
    icon: Lock,
    title: "Unlocking the database",
    description: "The password that decrypts an encrypted store is itself stored encrypted, and the module decrypts it at boot. Nothing on the disk, in the environment or in a manifest is enough on its own to read the data.",
  },
  {
    icon: FileCheck,
    title: "Post-quantum, and honest about where it runs",
    description: "ML-DSA-65 is available as a signing algorithm today. On a module with post-quantum firmware it runs inside the boundary like any other key; without one it runs in the process, which is the right answer for a service that has to be quantum-ready before the hardware is, and the wrong one to describe as hardware-backed.",
  },
  {
    icon: Network,
    title: "Threshold signing, where the hardware can do it",
    description: "Some modules can run key generation and signing rounds internally, so no share is ever assembled anywhere. Shares are attested and encrypted at rest, and a share that arrives unattested is refused. Cloud key services cannot do this, and the interface says so rather than pretending.",
  },
  {
    icon: KeyRound,
    title: "Bring the module you already have",
    description: "AWS KMS, Google Cloud KMS, Azure Key Vault, a Zymbit secure compute module over local PKCS#11, or an in-memory signer for development. One Go interface behind all of them, so which module you use is a line of configuration rather than a rewrite.",
  },
]

export default function HsmPage() {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <main>
        <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`, filter: "blur(100px)" }} />
          </div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-foreground">
              Hanzo HSM
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Cloud HSM. FIPS 140-3 hardware-backed key management for production workloads. Generate, store, and use cryptographic keys without exposing private material.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/docs/mpc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Get started <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                    <Icon className="h-6 w-6 text-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get started with HSM</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/docs/mpc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
              <ProductFooter slug="hsm" name="HSM" />
</main>
    </div>
  )
}
