'use client'

import React, { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion } from "framer-motion"

// WebGL point-globe backdrop — client-only + code-split (never SSR/build);
// static radial below is the no-WebGL / reduced-motion fallback.
const PointGlobe = dynamic(() => import("@/components/webgl/PointGlobe"), { ssr: false })
import { ArrowRight, CreditCard, Cpu, Check, Copy, Github } from "lucide-react"
import { ProductShot } from "@hanzogui/shell"
import CloudCategoryShowcase, { CloudCategoryMap } from "@/components/cloud/CloudCategoryShowcase"
import { CONSOLE } from "@/components/home/nav-data"
import { capabilityCount, categoryCount } from "@/lib/data/cloud-primitives"
import { MODELS_PHRASE } from '@/lib/data/model-count'
import { heroShot } from "@/lib/data/product-shots"

const DOCS = "https://docs.hanzo.ai/docs/services/cloud"
const GH = "https://github.com/hanzoai/cloud"

/**
 * cloud.hanzo.ai's front door — the body of `app/(marketing)/cloud/page.tsx`,
 * promoted to this host's web root by the Dockerfile's `SITE_ROOT=cloud`.
 *
 * It renders the PAGE only. The header and footer come from the shared
 * `(marketing)` layout (the shared `HanzoHeader` + `HanzoFooter`), which
 * is the same chrome hanzo.ai wears — so the two hosts are one product with one
 * nav, and this file cannot grow a second, divergent one. It used to carry
 * private `TopNav` / `Footer` copies whose "Sign in" pointed at a bare
 * hanzo.id/signin with no OAuth parameters, which could only strand the visitor
 * at a portal with nowhere to return to. Login is the shared header's single
 * console action now, and nothing here re-states it.
 */

/* ---------------------------------------------------------------- hero --- */

function Hero() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText("npx @hanzo/cloud deploy")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", filter: "blur(120px)" }}
        />
        <PointGlobe variant="ambient" arcs={3} className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 52% 44% at 50% 40%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.38) 44%, transparent 80%)" }}
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
          className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {/* The house headline treatment, borrowed verbatim from EnsoHero on
              the apex: one weight, one tracking, one monochrome white→neutral
              sheen. Coherence between the two faces is a shared type scale, not
              a second look that merely resembles the first. */}
          <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
            The AI cloud for agents and apps.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400"
        >
          One API for <span className="text-white">{MODELS_PHRASE}</span>, Base backends, identity,
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
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black no-underline transition-opacity hover:opacity-90 hover:no-underline"
          >
            Start building <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center rounded-full border border-neutral-700 px-7 text-sm font-medium text-white no-underline transition-colors hover:border-neutral-400 hover:no-underline"
          >
            Explore {capabilityCount} products
          </Link>
          <a
            href={GH}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline"
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
              <Copy className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-white" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ console --- */

/**
 * The console, shown rather than described.
 *
 * The hero above makes a claim ("the AI cloud for agents and apps") and this is
 * the evidence for it — so it sits directly under the claim, before the catalog
 * that elaborates it. Frame, art direction and loading behaviour all come from
 * `<ProductShot>` in the shared shell, so this shot and every category shot on
 * `/products/<slug>` present identically; a screenshot styled per-page is how a
 * product starts looking like three products.
 *
 * `priority` because this one is at the fold. Every OTHER shot on the site stays
 * lazy — the shell defaults to it, so no other call site has to remember.
 */
function ConsoleShot() {
  if (!heroShot) return null
  return (
    <section className="px-4 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ProductShot
          desktop={heroShot.desktop}
          mobile={heroShot.mobile}
          alt={heroShot.alt}
          priority
          href={CONSOLE}
        />
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- primitives --- */

/**
 * The ten cloud primitives — the whole catalog, on the front door.
 *
 * This replaces a hand-written list of six feature blurbs that named a subset
 * of the cloud and then went stale on its own. The section renders the SAME
 * `CloudCategoryShowcase` the `/products` index does, from the same taxonomy
 * the Products mega-menu reads, so what the menu promises and what this page
 * shows are one thing by construction. Web3 renders under the Lux brand and
 * hands off to lux.cloud — the showcase carries that rule, not this page.
 */
function Primitives() {
  return (
    <>
      <section className="border-t border-neutral-900 px-4 pb-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {capabilityCount} primitives. {categoryCount} categories. One cloud.
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Composable, open-source building blocks with one identity, one bill, and one API.
              Use one, use all — they work together out of the box.
            </p>
          </div>

          <div className="mt-14">
            <CloudCategoryMap />
          </div>
        </div>
      </section>

      <CloudCategoryShowcase />
    </>
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
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
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
            $0<span className="text-xl font-normal text-neutral-400"> to start</span>
          </div>
          <p className="mt-3 text-sm text-neutral-400">
            Create an organization, add a balance, and call any of {MODELS_PHRASE}. Costs accrue per use
            and are debited from your organization balance in real time.
          </p>
          <a
            href={CONSOLE}
            className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black no-underline transition-opacity hover:opacity-90 hover:no-underline"
          >
            Open the console <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={GH}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-neutral-700 px-6 text-sm font-medium text-white no-underline transition-colors hover:border-neutral-400 hover:no-underline"
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
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Start building on Hanzo Cloud
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-400">
          Ship your AI agent or app today. Open the console to provision models, Base, IAM, KMS, and
          search in minutes — or self-host the whole stack.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={CONSOLE}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black no-underline transition-opacity hover:opacity-90 hover:no-underline"
          >
            Start building <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={DOCS}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center rounded-full border border-neutral-700 px-7 text-sm font-medium text-white no-underline transition-colors hover:border-neutral-400 hover:no-underline"
          >
            Read the docs
          </a>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- page ---- */

export default function CloudLanding() {
  return (
    <>
      <Hero />
      <ConsoleShot />
      <Primitives />
      <Billing />
      <FinalCTA />
    </>
  )
}
