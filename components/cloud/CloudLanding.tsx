'use client'

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Frame from "@hanzo/frame"
import { ArrowRight, CreditCard, Cpu, Check, Github } from "lucide-react"
import { CopyButton } from "@hanzo/ui/product"
import CloudCategoryShowcase, { CloudCategoryMap } from "@/components/cloud/CloudCategoryShowcase"
import { CONSOLE } from "@/components/home/nav-data"
import { categoryCount } from "@/lib/data/cloud-primitives"
import { MODELS_PHRASE } from '@/lib/data/model-count'

const DOCS = "https://docs.hanzo.ai/docs/services/cloud"
const GH = "https://github.com/hanzoai"

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

const DEPLOY = "npx @hanzo/cloud deploy"

function Hero() {
  return (
    <section className="relative">
      {/* The film IS the hero. It says the product's name for it, in the
          console's own chrome, copy and typefaces — so the badge, the headline
          and the paragraph that used to stand here are gone rather than
          repeated over the top of it. What stays is what a film cannot do: the
          three actions, and a command you can copy.

          Rendered from `film/cloud` — one generator, two masters, because a
          phone and a laptop are not the same shape and `object-fit: cover`
          crops whichever it is handed. `@hanzo/frame` resolves all six files
          from this one prefix and picks by orientation. */}
      <Frame
        src="/cloud-hero"
        alt="One command brings up a Hanzo Cloud org. The console lists the model catalog — the house Enso family beside every model the gateway serves — and the Playground answers a prompt against it."
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-12 text-center sm:px-6 lg:px-8">
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
            Explore the products
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
          {/* The `$` is a prompt glyph, so it is shown but never copied. */}
          <div className="inline-flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5">
            <span className="font-mono text-sm text-neutral-300">$ {DEPLOY}</span>
            <CopyButton value={DEPLOY} label="Copy deploy command" size={20} id="install-cli" />
          </div>
        </motion.div>
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
 * shows are one thing by construction.
 */
function Primitives() {
  return (
    <>
      <section className="border-t border-neutral-900 px-4 pb-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Every primitive. One cloud.
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
              "Plans from $9/mo, with gateway credits included",
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
            $9<span className="text-xl font-normal text-neutral-500">/mo to start</span>
          </div>
          <p className="mt-3 text-sm text-neutral-400">
            Create an organization, pick a plan, and call any of {MODELS_PHRASE}. Usage accrues per
            call and is debited from your organization balance in real time.
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
      <Primitives />
      <Billing />
      <FinalCTA />
    </>
  )
}
