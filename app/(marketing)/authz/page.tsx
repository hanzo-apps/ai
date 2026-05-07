'use client'

import { ArrowRight, Shield, Network, Zap, GitBranch, ScrollText, Search } from "lucide-react"

const features = [
  {
    icon: Network,
    title: "Relationship-based access",
    description: "Zanzibar-style relationship graph. Model real-world permissions: documents own folders, folders own teams, teams own users.",
  },
  {
    icon: Zap,
    title: "Sub-10ms checks",
    description: "Distributed cache with consistent snapshots. Authorization decisions at the speed of database reads, not API calls.",
  },
  {
    icon: GitBranch,
    title: "Schema as code",
    description: "Define object types, relations, and permissions in a typed schema. Version-controlled, tested, and migration-safe.",
  },
  {
    icon: Shield,
    title: "Fine-grained policies",
    description: "Per-resource, per-relation authorization. No more coarse role-bucketing. Express exactly who can do what.",
  },
  {
    icon: ScrollText,
    title: "Full audit trail",
    description: "Every check, every write, every schema change. Immutable log for compliance and incident review.",
  },
  {
    icon: Search,
    title: "Reverse lookup",
    description: "Ask the inverse question: which resources can this user access? Native list-objects API for filtered views.",
  },
]

export default function AuthzPage() {
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
              Hanzo Authz
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Fine-grained authorization engine. Zanzibar-style relationship graph for production scale. Move permission checks out of your code and into a single source of truth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/authz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Get started <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/authz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
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
            <h2 className="text-2xl font-bold mb-4">Get started with Authz</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/authz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/authz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
