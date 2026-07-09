'use client'

import type { ComponentType } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Terminal,
  Boxes,
  Plug,
  KeyRound,
  ShieldCheck,
  HardDrive,
  Bot,
  ListTodo,
  Brain,
  Github,
  ExternalLink,
} from "lucide-react"
import { CodeExamplesSection } from "@/components/products/CodeExamplesSection"
import { SDKSection } from "@/components/products/SDKSection"
import { hanzoSDKs } from "@/lib/data/upstream-projects"

// ---------------------------------------------------------------------------
// One unified AI API, drop-in compatible with BOTH the OpenAI and Anthropic
// SDKs. Verified live against api.hanzo.ai:
//   • POST /v1/chat/completions  → OpenAI Chat Completions shape (Bearer auth)
//   • POST /v1/messages          → Anthropic Messages shape (x-api-key auth,
//                                   Anthropic error envelope: {type,error:{...}})
// Model ids below are real entries from the live GET /v1/models catalog.
// ---------------------------------------------------------------------------

const openaiExamples = [
  {
    language: "python",
    label: "Python",
    description: "Point the official OpenAI SDK at the Hanzo gateway.",
    code: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.hanzo.ai/v1",
    api_key="hk-...",  # your Hanzo API key
)

resp = client.chat.completions.create(
    model="zen5",  # any model on the gateway
    messages=[{"role": "user", "content": "Hello!"}],
)
print(resp.choices[0].message.content)`,
  },
  {
    language: "typescript",
    label: "TypeScript",
    description: "The OpenAI JS SDK — just change baseURL.",
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.hanzo.ai/v1",
  apiKey: "hk-...",
});

const resp = await client.chat.completions.create({
  model: "zen5",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(resp.choices[0].message.content);`,
  },
  {
    language: "curl",
    label: "cURL",
    description: "OpenAI-style: Authorization: Bearer.",
    code: `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "zen5",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
  },
]

const anthropicExamples = [
  {
    language: "python",
    label: "Python",
    description: "Point the official Anthropic SDK at the Hanzo gateway.",
    code: `from anthropic import Anthropic

client = Anthropic(
    base_url="https://api.hanzo.ai",
    api_key="hk-...",  # sent as the x-api-key header
)

msg = client.messages.create(
    model="zen5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}],
)
print(msg.content[0].text)`,
  },
  {
    language: "typescript",
    label: "TypeScript",
    description: "The Anthropic JS SDK — just change baseURL.",
    code: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://api.hanzo.ai",
  apiKey: "hk-...",
});

const msg = await client.messages.create({
  model: "zen5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(msg.content[0].text);`,
  },
  {
    language: "curl",
    label: "cURL",
    description: "Anthropic-style: /v1/messages, x-api-key header.",
    code: `curl https://api.hanzo.ai/v1/messages \\
  -H "x-api-key: $HANZO_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "zen5",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
  },
]

// Per-product SDKs & APIs — verified real packages (npm / PyPI) with a canonical
// GitHub repo. Beyond the unified AI SDK, each product ships its own surface.
type ProductSdk = {
  name: string
  purpose: string
  icon: ComponentType<{ className?: string }>
  packages: { registry: string; name: string }[]
  github: string
}

const productSdks: ProductSdk[] = [
  {
    name: "MCP",
    purpose: "260+ Model Context Protocol tools for agents & editors.",
    icon: Plug,
    packages: [
      { registry: "npm", name: "@hanzo/mcp" },
      { registry: "pip", name: "hanzo-mcp" },
    ],
    github: "https://github.com/hanzoai/mcp",
  },
  {
    name: "IAM",
    purpose: "OIDC / SSO — sign in with Hanzo ID (PKCE, server + browser).",
    icon: ShieldCheck,
    packages: [
      { registry: "npm", name: "@hanzo/iam" },
      { registry: "pip", name: "hanzo-iam" },
    ],
    github: "https://github.com/hanzoai/iam",
  },
  {
    name: "KMS",
    purpose: "Secrets & key management — read, seal, and sync org secrets.",
    icon: KeyRound,
    packages: [{ registry: "pip", name: "hanzo-kms" }],
    github: "https://github.com/hanzoai/kms",
  },
  {
    name: "S3",
    purpose: "S3-compatible object storage — buckets, objects, presigned URLs.",
    icon: HardDrive,
    packages: [{ registry: "pip", name: "hanzo-s3" }],
    github: "https://github.com/hanzoai/s3",
  },
  {
    name: "Agents",
    purpose: "Multi-agent SDK — build, orchestrate, and hand off between agents.",
    icon: Bot,
    packages: [{ registry: "pip", name: "hanzo-agent" }],
    github: "https://github.com/hanzoai/agent",
  },
  {
    name: "Tasks",
    purpose: "Durable workflows & scheduling — retries, timers, signals.",
    icon: ListTodo,
    packages: [{ registry: "pip", name: "hanzo-tasks" }],
    github: "https://github.com/hanzoai/tasks",
  },
  {
    name: "Memory",
    purpose: "Long-term memory — store, recall, and summarize across sessions.",
    icon: Brain,
    packages: [{ registry: "pip", name: "hanzo-memory" }],
    github: "https://github.com/hanzoai/memory",
  },
  {
    name: "UI",
    purpose: "Headless React components — the @hanzo/ui design system.",
    icon: Boxes,
    packages: [{ registry: "npm", name: "@hanzo/ui" }],
    github: "https://github.com/hanzoai/ui",
  },
]

const baseUrls = [
  { style: "OpenAI", base: "https://api.hanzo.ai/v1", path: "/v1/chat/completions", auth: "Authorization: Bearer hk-..." },
  { style: "Anthropic", base: "https://api.hanzo.ai", path: "/v1/messages", auth: "x-api-key: hk-..." },
]

export default function SdkPage() {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.15]"
            style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", filter: "blur(100px)" }}
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-border text-xs font-medium text-foreground/70 uppercase tracking-wider mb-6">
              <Terminal className="w-3.5 h-3.5" /> SDKs &amp; API
            </span>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-foreground">
              One API. Every language.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              The Hanzo API is drop-in compatible with both the{" "}
              <span className="text-foreground">OpenAI SDK</span> and the{" "}
              <span className="text-foreground">Anthropic SDK</span>. Keep the client you
              already use — change one line, the base URL — and get one gateway to 50+ models
              plus every Hanzo product SDK.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://docs.hanzo.ai/docs/sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium transition-colors"
              >
                Full API reference <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium transition-colors"
              >
                Get an API key
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Base URL reference */}
      <section className="px-4 md:px-8 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {baseUrls.map((b) => (
              <motion.div
                key={b.style}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-secondary/40 border border-border rounded-xl p-5"
              >
                <div className="text-sm font-medium text-foreground mb-3">
                  {b.style}-compatible
                </div>
                <dl className="space-y-2 font-mono text-xs text-muted-foreground">
                  <div className="flex justify-between gap-3">
                    <dt className="text-foreground/50">base_url</dt>
                    <dd className="text-foreground/80 text-right break-all">{b.base}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-foreground/50">endpoint</dt>
                    <dd className="text-foreground/80 text-right break-all">{b.path}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-foreground/50">auth</dt>
                    <dd className="text-foreground/80 text-right break-all">{b.auth}</dd>
                  </div>
                </dl>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OpenAI-style */}
      <CodeExamplesSection
        title="Use the OpenAI SDK"
        subtitle="POST /v1/chat/completions — identical request/response to OpenAI Chat Completions."
        examples={openaiExamples}
      />

      {/* Anthropic-style */}
      <CodeExamplesSection
        title="Use the Anthropic SDK"
        subtitle="POST /v1/messages — the native Anthropic Messages API, x-api-key auth and content-block responses."
        examples={anthropicExamples}
      />

      {/* Multi-language SDKs */}
      <div className="border-t border-border">
        <SDKSection productName="Hanzo" sdks={hanzoSDKs} />
      </div>

      {/* Per-product SDKs */}
      <section className="py-16 px-4 md:px-8 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Boxes className="w-5 h-5 text-foreground" />
            <span className="text-sm font-medium text-foreground uppercase tracking-wider">
              Per-product SDKs &amp; APIs
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Every product has its own SDK
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            The unified AI API is one surface. Each Hanzo product also ships a dedicated SDK —
            identity, secrets, storage, agents, tasks, memory, tools, and UI — so you compose
            exactly what you need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productSdks.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.a
                  key={p.name}
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group bg-secondary/40 border border-border rounded-xl p-5 hover:border-foreground/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-foreground/80" />
                      </div>
                      <h3 className="font-semibold text-foreground">{p.name}</h3>
                    </div>
                    <Github className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{p.purpose}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.packages.map((pkg) => (
                      <span
                        key={pkg.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border font-mono text-xs text-foreground/80"
                      >
                        <span className="text-foreground/40">{pkg.registry}</span>
                        {pkg.name}
                      </span>
                    ))}
                  </div>
                </motion.a>
              )
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
            <a
              href="https://github.com/hanzoai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-foreground/80 transition-colors"
            >
              <Github className="w-4 h-4" /> All Hanzo SDKs on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://docs.hanzo.ai/docs/sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              SDK documentation <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
