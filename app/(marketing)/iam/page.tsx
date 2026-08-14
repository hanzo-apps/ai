'use client'

import { ArrowRight } from "lucide-react"

import { ProductFooter } from "@/components/products/ProductFooter"
export default function IamPage() {
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
              Hanzo IAM
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Hanzo IAM is the sign-in behind every Hanzo service. There is one, and this is it.
              It speaks OpenID Connect and OAuth 2.0 — authorization code with PKCE, always S256 — so your
              application reads a standard discovery document, receives a signed token, and never handles a
              password. The passwords that do exist are argon2id digests, and the algorithm is read from the
              stored row rather than assumed; a scheme IAM does not recognize fails closed rather than passing.
              Refresh tokens are single-use and kept only as a hash. Each exchange mints a successor, and
              presenting a spent one revokes the whole family, so a stolen token cannot outlive the session it
              was taken from. A second factor is an authenticator app, a code by SMS or email, or a passkey, and
              adding or dropping one signs the account out of every other browser. Sign-in can arrive from
              Google, from GitHub, or from any OIDC issuer you name, and SCIM 2.0 keeps a directory in step.
              Tokens are signed RS256, with ML-DSA-65 available per certificate and published in the same JWKS,
              so a verifier that already knows how to fetch keys learns nothing new. Every organization is a
              tenancy boundary and membership travels in the token. What IAM does not do is decide what you may
              reach once you are through the door. That is Authz, reading the same token.
            </p>
          </div>
        </section>

        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get started with IAM</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/docs/iam" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/iam" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
              <ProductFooter slug="iam" name="IAM" />
</main>
    </div>
  )
}
