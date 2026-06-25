'use client'

import React, { useState } from "react"
import { motion } from "framer-motion"
import { HanzoLogo } from "@hanzo/logo/react"
import {
  ArrowRight,
  Bot,
  Database,
  KeyRound,
  Search,
  Boxes,
  ShieldCheck,
  CreditCard,
  Cpu,
  Check,
  Copy,
  Github,
} from "lucide-react"

const CONSOLE = "https://console.hanzo.ai"
const SIGNIN = "https://hanzo.id"
const DOCS = "https://docs.hanzo.ai/cloud"
const GH = "https://github.com/hanzoai/cloud"

/* ----------------------------------------------------------------- nav --- */

function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-800/80 bg-black/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="https://hanzo.ai" className="flex items-center gap-2">
          <HanzoLogo variant="white" size={22} />
          <span className="text-sm font-semibold tracking-tight text-white">
            Hanzo <span className="text-neutral-400">Cloud</span>
          </span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={DOCS}
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:text-white sm:inline-flex"
          >
            Docs
          </a>
          <a
            href={`${SIGNIN}/signin`}
            className="rounded-full border border-neutral-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
          >
            Sign in
          </a>
          <a
            href={CONSOLE}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Start building <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  )
}

/* ---------------------------------------------------------------- hero --- */

function Hero() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText("npx @hanzo/cloud deploy")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", filter: "blur(120px)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-medium text-neutral-300"
        >
          Open-source · Self-host or managed
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl font-semibold leading-[1.07] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          The open-source cloud for
          <br className="hidden sm:block" /> AI agents and apps.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400"
        >
          One API for <span className="text-white">51 live models</span>, Base backends, identity,
          secrets, vector search, and full-text search. Pay-as-you-go, billed per organization.
          Run it on Hanzo Cloud or self-host the exact same stack on your own Kubernetes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={CONSOLE}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Start building <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`${SIGNIN}/signin`}
            className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
          >
            Sign in
          </a>
          <a
            href={GH}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <Github className="h-4 w-4" /> View source
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={copy}
            className="group inline-flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5"
          >
            <span className="font-mono text-sm text-neutral-300">$ npx @hanzo/cloud deploy</span>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-white" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ features --- */

const FEATURES = [
  {
    icon: Bot,
    title: "51 live models, one API",
    body: "OpenAI, Anthropic, and open-weight models behind a single OpenAI-compatible endpoint. Switch providers without touching code; route, fall back, and cache automatically.",
  },
  {
    icon: Boxes,
    title: "Base backends",
    body: "Per-organization and per-user SQLite-backed Base instances. An instant application backend with auth, records, and realtime — no database to provision.",
  },
  {
    icon: ShieldCheck,
    title: "IAM",
    body: "OIDC identity for every app: SSO, OAuth2, social and Web3 login, organizations, and fine-grained access — all white-labeled to your domain.",
  },
  {
    icon: KeyRound,
    title: "KMS",
    body: "MPC-backed key management. Store secrets once, sync them into Kubernetes as native resources. Nothing lives in plaintext, ever.",
  },
  {
    icon: Database,
    title: "Vector search",
    body: "Managed vector database for embeddings and RAG. Build semantic search and agent memory on infrastructure that scales with your index.",
  },
  {
    icon: Search,
    title: "Full-text search",
    body: "Native full-text search over your data with per-user isolation built in. No separate search cluster to run or keep in sync.",
  },
]

function Features() {
  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Everything an AI product needs
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Composable, open-source building blocks. Use one, use all — they work together out of the box.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-7 transition-colors hover:border-neutral-700"
              >
                <Icon className="mb-5 h-8 w-8 text-white" />
                <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{f.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- billing --- */

function Billing() {
  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-medium text-neutral-300">
            <CreditCard className="h-3.5 w-3.5" /> Usage-based pricing
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Pay only for what you use.
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-neutral-400">
            Every model call, every byte, every key — metered and billed per organization.
            No seats, no minimums, no surprise invoices. Add a balance and start shipping; share it
            across your whole team under one organization.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Per-organization balances and usage records",
              "Transparent per-token and per-request metering",
              "Free tier to start — upgrade when you grow",
              "Self-host for $0 and bring your own provider keys",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                <span className="text-neutral-300">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-black p-8">
          <div className="flex items-baseline gap-2">
            <Cpu className="h-6 w-6 text-white" />
            <span className="text-sm font-medium text-neutral-400">Pay-as-you-go</span>
          </div>
          <div className="mt-4 text-5xl font-semibold tracking-tight text-white">
            $0<span className="text-xl font-normal text-neutral-500"> to start</span>
          </div>
          <p className="mt-3 text-sm text-neutral-400">
            Create an organization, add a balance, and call any of 51 models. Costs accrue per use
            and are debited from your organization balance in real time.
          </p>
          <a
            href={CONSOLE}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Open the console <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={GH}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
          >
            <Github className="h-4 w-4" /> Self-host it free
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- cta --- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-neutral-900 px-4 py-28 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", filter: "blur(120px)" }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Start building on Hanzo Cloud
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-400">
          Ship your AI agent or app today. Open the console to provision models, Base, IAM, KMS, and
          search in minutes — or self-host the whole stack.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={CONSOLE}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Start building <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={DOCS}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center rounded-full border border-neutral-700 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
          >
            Read the docs
          </a>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- footer --- */

function Footer() {
  return (
    <footer className="border-t border-neutral-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <HanzoLogo variant="white" size={18} />
          <span className="text-sm text-neutral-400">© Hanzo AI — open-source cloud</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
          <a href={CONSOLE} className="transition-colors hover:text-white">Console</a>
          <a href={DOCS} className="transition-colors hover:text-white">Docs</a>
          <a href={GH} className="transition-colors hover:text-white">GitHub</a>
          <a href="https://hanzo.ai" className="transition-colors hover:text-white">hanzo.ai</a>
        </div>
      </div>
    </footer>
  )
}

/* --------------------------------------------------------------- page ---- */

export default function CloudLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopNav />
      <Hero />
      <Features />
      <Billing />
      <FinalCTA />
      <Footer />
    </div>
  )
}
