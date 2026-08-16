'use client'

import { motion } from "@/components/motion"
import Link from "next/link"
import {
  ArrowRight,
  Boxes,
  Cloud,
  ExternalLink,
  Github,
  Package,
  Sparkles,
  Terminal,
} from "lucide-react"
import { SDKSection } from "@/components/products/SDKSection"
import { hanzoSDKs } from "@/lib/data/upstream-projects"
import { Box } from '@hanzo/ui'

// ---------------------------------------------------------------------------
// /sdks — the SDK ecosystem landing. One canonical story, two lines:
//   1. Full Cloud SDK — generated from the Hanzo OpenAPI, one per language.
//      Real code lives in the per-language org (hanzo-<lang>/sdk); the thin
//      wrapper/docs face is hanzoai/<lang>-sdk; the umbrella meta is hanzoai/sdk.
//   2. AI + Agents — the hand-crafted flagship (Python `hanzo`, Node `@hanzo/ai`).
// ---------------------------------------------------------------------------

type LangOrg = {
  lang: string
  org: string // per-language GitHub org (real code)
  realRepo: string // hanzo-<lang>/sdk — generated cloud SDK
  wrapper: string // hanzoai/<lang>-sdk — docs/landing
  install: string // a command that resolves today
  ai?: string // AI + agents package for this language (only shown when it resolves today)
  flagship?: boolean
}

// Per-language orgs — "we genuinely adopt + love each language." The card links
// the org (always live); the generated SDK + wrapper repos are its canonical homes.
// install strings verified against PyPI / npm / Go modules / crates / GitHub.
const perLanguageOrgs: LangOrg[] = [
  { lang: "Python", org: "hanzo-py", realRepo: "hanzo-py/sdk", wrapper: "hanzoai/python-sdk", install: "pip install hanzoai", ai: "hanzo", flagship: true },
  { lang: "Go", org: "hanzo-go", realRepo: "hanzo-go/sdk", wrapper: "hanzoai/go-sdk", install: "go get github.com/hanzoai/go-sdk" },
  { lang: "TypeScript", org: "hanzo-js", realRepo: "hanzo-js/sdk", wrapper: "hanzoai/js-sdk", install: "npm install @hanzo/sdk", ai: "@hanzo/ai" },
  { lang: "Rust", org: "hanzo-rs", realRepo: "hanzo-rs/sdk", wrapper: "hanzoai/rust-sdk", install: "cargo add hanzo", ai: "hanzo" },
  { lang: "Swift", org: "hanzo-swift", realRepo: "hanzo-swift/sdk", wrapper: "hanzoai/swift-sdk", install: ".package(url: \"https://github.com/hanzo-swift/sdk\")" },
  { lang: "Kotlin", org: "hanzo-kt", realRepo: "hanzo-kt/sdk", wrapper: "hanzoai/kotlin-sdk", install: 'implementation("com.github.hanzo-kt:sdk:v8.0.0")' },
]

// The AI + agents flagship line — distinct from the generated cloud SDK.
const aiFlagship: { lang: string; package: string; install: string; home: string; note: string }[] = [
  { lang: "Python", package: "hanzo", install: "pip install hanzo", home: "hanzoai/python-sdk", note: "Flagship — the most complete AI + agents library." },
  { lang: "Node", package: "@hanzo/ai", install: "npm install @hanzo/ai", home: "hanzo-js/ai", note: "Models, agents, tools, memory, and MCP for TypeScript." },
  { lang: "Rust", package: "hanzo", install: "cargo add hanzo", home: "hanzo-rs/sdk", note: "The AI + agents crate for Rust — crypto, DID, MCP, agents, embeddings, feature-gated." },
]

export default function SdksPage() {
  return (
    <Box className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 overflow-hidden">
        <Box className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.15]"
            style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", filter: "blur(100px)" }}
          />
        </Box>
        <Box className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-border text-xs font-medium text-foreground/70 uppercase tracking-wider mb-6">
              <Package className="w-3.5 h-3.5" /> SDKs
            </span>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-foreground">
              SDKs for every language
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Two lines, not one. A <span className="text-foreground">full Cloud SDK</span> generated from
              the OpenAPI document the API itself serves, so it is never behind the API — and a
              hand-written <span className="text-foreground">AI + Agents</span> library for the work a
              generator cannot express. Real code lives in the per-language org; the umbrella{" "}
              <span className="font-mono text-foreground">hanzoai/sdk</span> points at all of them.
            </p>
            <Box className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/hanzoai/sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium transition-colors"
              >
                <Github className="h-4 w-4" /> hanzoai/sdk
              </a>
              <Link
                href="/docs/sdk"
                className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium transition-colors"
              >
                API reference <ArrowRight className="h-4 w-4" />
              </Link>
            </Box>
          </motion.div>
        </Box>
      </section>

      {/* Two SDK lines */}
      <section className="px-4 md:px-8 pb-4">
        <Box className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-secondary/40 border border-border rounded-xl p-6"
          >
            <Box className="flex items-center gap-3 mb-3">
              <Box className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-foreground/80" />
              </Box>
              <h2 className="font-semibold text-foreground">Full Cloud SDK</h2>
            </Box>
            <p className="text-sm text-muted-foreground">
              Generated from one document and never edited by hand, so every route is reachable the day
              it ships — models, agents, data, compute, network, security, platform and chain. Method and
              class names are the document&apos;s operation ids, which is what makes a client checkable
              against a release instead of against somebody&apos;s memory. Real code lives in{" "}
              <span className="font-mono text-foreground/80">hanzo-&lt;lang&gt;/sdk</span>.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-secondary/40 border border-border rounded-xl p-6"
          >
            <Box className="flex items-center gap-3 mb-3">
              <Box className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-foreground/80" />
              </Box>
              <h2 className="font-semibold text-foreground">AI + Agents</h2>
            </Box>
            <p className="text-sm text-muted-foreground">
              The hand-crafted flagship: models, agents, tools, memory, and MCP. Python{" "}
              <span className="font-mono text-foreground/80">hanzo</span> is the most complete; Node ships{" "}
              <span className="font-mono text-foreground/80">@hanzo/ai</span>. Distinct from the generated
              cloud SDK — this is the &quot;we love this language&quot; library.
            </p>
          </motion.div>
        </Box>
      </section>

      {/* Cloud SDK — install grid, every language */}
      <SDKSection productName="Cloud" sdks={hanzoSDKs} />

      {/* Per-language orgs */}
      <section className="py-16 px-4 md:px-8 border-t border-border">
        <Box className="max-w-5xl mx-auto">
          <Box className="flex items-center gap-2 mb-2">
            <Terminal className="w-5 h-5 text-foreground" />
            <span className="text-sm font-medium text-foreground uppercase tracking-wider">
              Per-language orgs
            </span>
          </Box>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            A home for every ecosystem
          </h2>
          <p className="text-muted-foreground mb-4 max-w-2xl">
            Each language has its own org holding the generated cloud SDK, an AI + agents library and
            the split-out packages. Every one of them ships the same six runnable examples — prove the
            key works, one completion, balance and usage, a store round-trip, create and run an agent,
            list the tools — so knowing one language&apos;s set is enough to navigate another&apos;s.
          </p>
          <Box className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {perLanguageOrgs.map((l, i) => (
              <motion.a
                key={l.lang}
                href={`https://github.com/${l.org}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group bg-secondary/40 border border-border rounded-xl p-5 hover:border-foreground/30 transition-colors"
              >
                <Box className="flex items-start justify-between mb-3">
                  <Box className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{l.lang}</h3>
                    {l.flagship && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs rounded border border-border bg-primary/10 text-foreground/80">
                        Flagship
                      </span>
                    )}
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border border-border bg-background text-foreground/70">
                      GA
                    </span>
                  </Box>
                  <span className="font-mono text-xs text-muted-foreground">{l.org}</span>
                </Box>
                <Box className="bg-background rounded-lg p-3 mb-4 font-mono text-sm overflow-x-auto text-foreground/80">
                  {l.install}
                </Box>
                <Box className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border font-mono text-xs text-foreground/80">
                    <span className="text-foreground/40">sdk</span>
                    {l.realRepo}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border font-mono text-xs text-foreground/80">
                    <span className="text-foreground/40">docs</span>
                    {l.wrapper}
                  </span>
                  {l.ai && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border font-mono text-xs text-foreground/80">
                      <span className="text-foreground/40">ai</span>
                      {l.ai}
                    </span>
                  )}
                </Box>
              </motion.a>
            ))}
          </Box>
        </Box>
      </section>

      {/* AI + Agents flagship */}
      <section className="py-16 px-4 md:px-8 border-t border-border">
        <Box className="max-w-5xl mx-auto">
          <Box className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-foreground" />
            <span className="text-sm font-medium text-foreground uppercase tracking-wider">
              AI + Agents SDK
            </span>
          </Box>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            The flagship AI library
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Models, agents, tools, memory, and MCP — hand-crafted, not generated. Python leads;
            Rust and Node follow.
          </p>

          <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiFlagship.map((a, i) => (
              <motion.div
                key={a.lang}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="bg-secondary/40 border border-border rounded-xl p-5"
              >
                <Box className="flex items-center justify-between mb-3">
                  <Box className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{a.lang}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border border-border bg-background text-foreground/70">
                      GA
                    </span>
                  </Box>
                  <span className="font-mono text-xs text-muted-foreground">{a.home}</span>
                </Box>
                <Box className="bg-background rounded-lg p-3 mb-4 font-mono text-sm overflow-x-auto text-foreground/80">
                  {a.install}
                </Box>
                <p className="text-sm text-muted-foreground">{a.note}</p>
              </motion.div>
            ))}
          </Box>
        </Box>
      </section>

      {/* Umbrella CTA */}
      <section className="py-16 px-4 md:px-8 border-t border-border">
        <Box className="max-w-4xl mx-auto">
          <Box className="bg-secondary/40 border border-border rounded-xl p-8 text-center">
            <Box className="flex items-center justify-center gap-2 mb-3">
              <Boxes className="w-5 h-5 text-foreground" />
              <span className="font-mono text-sm text-foreground">hanzoai/sdk</span>
            </Box>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              One install. Every service. Every language.
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              The umbrella that points to every per-language SDK and the AI + Agents flagship. Start
              here and hop to whichever ecosystem you build in.
            </p>
            <Box className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/hanzoai/sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium transition-colors"
              >
                <Github className="h-4 w-4" /> Browse the umbrella
              </a>
              <a
                href="https://docs.hanzo.ai/docs/sdks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium transition-colors"
              >
                SDK documentation <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Box>
          </Box>
        </Box>
      </section>
    </Box>
  )
}
