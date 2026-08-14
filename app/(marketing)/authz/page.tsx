'use client'

import { ArrowRight, Shield, Network, Zap, GitBranch, ScrollText, Search } from "lucide-react"

import { ProductFooter } from "@/components/products/ProductFooter"
const features = [
  {
    icon: Network,
    title: "Where a thing is, and who may touch it",
    description: "A location is a path — acme, acme/prod, acme/prod/web, and the app or site under that. Access is a grant at a prefix of one. Keeping them apart is the whole design: containment names a resource, it does not hand every ancestor's members the child.",
  },
  {
    icon: Zap,
    title: "Nothing on the decision path does I/O",
    description: "No store, no config, no init, no network call. Authz is a leaf package a service imports, so the check is a function call and a request that reaches your handler has already been decided.",
  },
  {
    icon: GitBranch,
    title: "One rule covers every arrangement",
    description: "Can is true when some grant the caller holds prefixes the target and its role admits the verb. An org-wide member holds a grant at the org; a workspace member holds one a level down; an invite-only project is a grant with no ancestor above it. There is no second mechanism.",
  },
  {
    icon: Shield,
    title: "Delegation is a narrower grant",
    description: "Handing an agent or a short-lived credential part of your authority means writing a grant deeper in the path than your own, with an expiry if you want one. Nothing can be delegated that the delegator does not already hold.",
  },
  {
    icon: ScrollText,
    title: "The decision travels, the grant set stays",
    description: "The edge resolves the requested scope once and writes the resolved path and role into the token, so the token stays the same size no matter how many grants a person has, and no service behind the edge asks IAM anything.",
  },
  {
    icon: Search,
    title: "Only what IAM signs",
    description: "Verification accepts the algorithms IAM's signer actually produces — RSA, EC, and ML-DSA-65 for a post-quantum certificate. HMAC and alg none are rejected. Key material is an argument, so the leaf never fetches a JWKS and a caller that supplies no keys verifies nothing.",
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
              Hanzo Authz reads a token and answers whether the caller may do the thing. It verifies the JWT
              that IAM signed, then asks one question: does a grant this caller holds cover this path, and does
              its role admit this verb. It is a library, not a service — no store, no configuration, no network
              call on any path — so every Hanzo service asks that question the same way and gets the same answer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/docs/authz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
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
              <a href="https://docs.hanzo.ai/docs/authz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/authz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
              <ProductFooter slug="authz" name="Authz" />
</main>
    </div>
  )
}
