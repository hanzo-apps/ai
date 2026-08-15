'use client'

import { ArrowRight, UserCheck, FileText, Building2, ShieldCheck, Globe, Activity } from "lucide-react"

import { ProductFooter } from "@/components/products/ProductFooter"
const features = [
  {
    icon: UserCheck,
    title: "Four calls, whichever vendor",
    description: "Start a verification, check its status, parse a webhook, name yourself. Every provider implements the same four, so swapping one for another is configuration and not a rewrite of your onboarding.",
  },
  {
    icon: Building2,
    title: "A verdict, or nothing",
    description: "A provider whose response we do not parse refuses rather than answering. Two of them used to return approved without reading the reply — one for any response that was not an error, the other including a rejected document. Anything gating on that would have admitted an unverified person, so both now refuse until the parsing is written.",
  },
  {
    icon: ShieldCheck,
    title: "A webhook has to prove it is one",
    description: "Signatures are HMAC-SHA256 over the raw body, compared in constant time, with the header matched case-insensitively because the wire spelling and the canonical spelling differ. An empty signing secret is a refusal, never a skip — an HMAC under a key everybody knows is one anybody can compute.",
  },
  {
    icon: FileText,
    title: "Polling where a callback cannot be trusted",
    description: "Every result is verified before it counts. A webhook whose signature we can check is accepted; anything else is polled from the provider directly, so the verdict always comes from the source.",
  },
  {
    icon: Activity,
    title: "Credentials come from KMS",
    description: "The API token bills per check and the webhook token is what separates a provider's verdict from a forgery, so neither is a literal in the code and neither falls back to an environment variable. A missing secret fails at construction rather than producing a provider that quietly runs without one.",
  },
  {
    icon: Globe,
    title: "Verification is not screening",
    description: "Proving somebody is who they say is a different job from watching what they do afterwards. Sanctions lists, transaction monitoring, cases and the five-year record clock live in Hanzo Risk, and this does not duplicate them.",
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
              Hanzo IDV is one interface in front of the identity-verification vendors, so which vendor you use
              is a line of configuration rather than a rewrite of your onboarding. It does not verify anybody
              itself. It starts a check with the provider you chose, reads the verdict back, and proves that a
              callback came from them and not from someone who guessed the URL. Jumio and Onfido work end to end
              today; Plaid works by polling; the rest refuse until their response parsing is written, which is
              stated here because a verification service that guesses is worse than one that says it cannot tell.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/docs/services/iam/provider/idv/overview" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
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
            <h2 className="text-2xl font-bold mb-4">Get started with IDV</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/docs/services/iam/provider/idv/overview" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
              <ProductFooter slug="idv" name="IDV" />
</main>
    </div>
  )
}
