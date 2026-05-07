'use client'

import { ArrowRight, UserCheck, FileText, Building2, ShieldCheck, Globe, Activity } from "lucide-react"

const features = [
  {
    icon: UserCheck,
    title: "KYC for individuals",
    description: "Document verification, biometric liveness, and identity matching across 200+ countries with sub-minute decisioning.",
  },
  {
    icon: Building2,
    title: "KYB for businesses",
    description: "Beneficial ownership lookup, corporate registry checks, and UBO resolution for entities worldwide.",
  },
  {
    icon: ShieldCheck,
    title: "AML screening",
    description: "Real-time sanctions, PEP, and adverse media screening against global watchlists with continuous monitoring.",
  },
  {
    icon: FileText,
    title: "Document AI",
    description: "Passport, driver license, utility bill, and bank statement extraction with template-free OCR.",
  },
  {
    icon: Activity,
    title: "Risk scoring",
    description: "Composite risk signals across device, behavior, document, and watchlist dimensions. Tunable thresholds per use case.",
  },
  {
    icon: Globe,
    title: "Audit-ready records",
    description: "Immutable verification trails with timestamps, evidence, and reviewer notes for regulator-ready exports.",
  },
]

export default function IdvPage() {
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
              Hanzo IDV
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Identity verification for regulated workflows. KYC, KYB, and AML in a single API. Onboard customers in under a minute, satisfy auditors with one record.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/idv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Get started <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/idv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
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
            <h2 className="text-2xl font-bold mb-4">Get started with IDV</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/idv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/idv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
