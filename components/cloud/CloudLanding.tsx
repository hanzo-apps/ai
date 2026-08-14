'use client'

import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, CreditCard, Cpu, Check, Github } from "lucide-react"
import { CopyButton } from "@hanzo/ui/product"
import CloudCategoryShowcase, { CloudCategoryMap } from "@/components/cloud/CloudCategoryShowcase"
import { CONSOLE } from "@/components/home/nav-data"
import { MODELS_PHRASE } from '@/lib/data/model-count'
import { cloudCategories, tour } from '@/lib/data/cloud-primitives'

const DOCS = "https://docs.hanzo.ai/docs/services/cloud"

/** Every product in the taxonomy — the number the page states about itself. */
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

/**
 * The film, in a column.
 *
 * `@hanzo/frame` is the film as THE FOLD — `min-height: 100svh`, full bleed,
 * no knob, by its own contract — and that is a different thing from a film
 * beside the copy. Dropped into half a grid it is a 100svh black box with the
 * headline stranded next to it, so the column plays the same six-file master
 * itself, in a 16:9 box it cannot outgrow.
 *
 * Landscape at every width (a 16:9 box is landscape even at 375), so it always
 * wants the `-wide` master; the `-tall` one exists for a fold that fills a
 * portrait screen, which this is not. Reduced motion gets the first frame and
 * no player, because a paused <video> still fetches the megabytes.
 */
function Film() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src="/cloud-hero-wide.mp4"
        poster="/cloud-hero-wide-first.jpg"
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {/* The words the film says, for anyone not watching it. */}
      <img
        className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
        src="/cloud-hero-wide-first.jpg"
        alt="One command brings up a Hanzo Cloud org. The console lists the model catalog — the house Enso family beside every model the gateway serves — and the Playground answers a prompt against it."
      />
    </div>
  )
}

/**
 * Two columns: what the cloud is on the left, what it looks like on the right.
 *
 * The film used to BE the fold, with the copy underneath it and the headline
 * inside the picture. Words burned into a moving field of dots cannot be
 * selected, translated, or read by anything that is not watching, and body copy
 * over one needs a scrim to be legible at all — which is a patch for a layout
 * that put text on top of media in the first place. Giving each its own column
 * removes the problem instead of dimming it.
 *
 * It STACKS at the phone, copy first. The copy column carries the only two
 * things a visitor can act on — the console link and a command they can copy —
 * plus the page's one `<h1>`; leading with a 16:9 film would push both below
 * the fold on a 375px screen and hand a reader a video before the page has said
 * its own name.
 */
/* ------------------------------------------------------------------ tour --- */

/** The products whose API this beat's operation belongs to, from the catalogue. */
function productsFor(path: string) {
  return cloudCategories
    .flatMap((c) => c.items)
    .filter((p) => {
      const api = p.api?.replace(/\/$/, '')
      if (!api) return false
      return path === api || path.startsWith(api + '/') || api.startsWith(path.replace(/\/$/, ''))
    })
}

const TYPE_MS = 26
const HOLD_MS = 2100

/**
 * The hero tour — one story, told as the operations that would actually run it.
 *
 * WHY IT CAN BE TRUSTED. Every beat is resolved at BUILD time against the served
 * `/v1/openapi.json` (see `scripts/sync-catalog.mjs`): a beat survives iff the
 * document carries its path AND its verb, so an invented path and a real path
 * with the wrong verb are both dropped before they can reach a reader. The line
 * is ours; the verb, the path and the description under it are the API's own
 * words. The product chips come from the same catalogue the count and the menu
 * read — and where an operation has no product row yet, none are drawn rather
 * than a stand-in being found for it.
 *
 * MOTION IS OPTIONAL, not decorated with an opt-out. Under
 * `prefers-reduced-motion` there is no typing and no auto-advance: the first
 * beat is simply shown, whole, and the dots still work as buttons. Someone who
 * wants to read is never a hostage — the panel pauses on the button, and on
 * hover or keyboard focus, and a dot both selects a beat and stops the clock.
 *
 * NOTHING RESIZES. The line reserves two lines, the description two more and the
 * chip row one, so a short beat and a long one occupy the same box and the fold
 * never moves under the reader. One `setTimeout` chain drives it — no interval
 * per beat, no timer left running when the tab is hidden.
 */
function Tour() {
  const reduced = useReducedMotion()
  const beats = tour.beats
  const [at, setAt] = useState(0)
  const [typed, setTyped] = useState(reduced ? Infinity : 0)
  const [held, setHeld] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const beat = beats[at]
  const line = beat?.line ?? ''
  const paused = held || !!reduced

  useEffect(() => {
    if (paused || !beats.length) return
    if (typed < line.length) {
      timer.current = setTimeout(() => setTyped((n) => n + 1), TYPE_MS)
    } else {
      timer.current = setTimeout(() => {
        setAt((i) => (i + 1) % beats.length)
        setTyped(0)
      }, HOLD_MS)
    }
    return () => clearTimeout(timer.current)
  }, [typed, line.length, paused, beats.length])

  // A hidden tab should not be typing to nobody.
  useEffect(() => {
    const onVis = () => setHeld(document.hidden ? true : false)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const pick = (i: number) => {
    setAt(i)
    setTyped(Infinity)
    setHeld(true)
  }

  if (!beats.length) return null
  const shown = reduced ? line : line.slice(0, typed)
  const lit = productsFor(beat.path)

  return (
    <div
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
    >
      <p className="text-xs uppercase tracking-wider text-neutral-600">{tour.story}</p>

      {/* Two lines reserved, so a short beat and a long one are the same box. */}
      <p className="mt-3 min-h-[3.5rem] text-lg font-medium leading-snug text-white">
        {shown}
        {!reduced && typed < line.length ? (
          <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 bg-white/80 motion-safe:animate-pulse" />
        ) : null}
      </p>

      {/* The operation that beat would actually run, in the API's own words. */}
      <div className="mt-1 min-h-[3.25rem]">
        <code className="font-mono text-xs text-neutral-300">
          <span className="text-neutral-500">{beat.method}</span> {beat.path}
        </code>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">{beat.summary}</p>
      </div>

      {/* Real products, where the catalogue carries one for that operation. */}
      <div className="mt-3 flex min-h-[1.75rem] flex-wrap items-center gap-1.5">
        {lit.map((p) => {
          const Icon = p.icon
          return (
            <span
              key={p.title}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs text-neutral-300"
            >
              <Icon className="h-3.5 w-3.5 text-neutral-400" /> {p.title}
            </span>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setHeld((v) => !v)}
          aria-pressed={held}
          className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-white/40 hover:text-white motion-reduce:transition-none"
        >
          {paused ? 'Play' : 'Pause'}
        </button>
        <div className="-mx-1 flex flex-wrap items-center">
          {beats.map((b, i) => (
            // The DOT is drawn inside the target rather than being it. This site
            // floors every button at 24px (44px where a finger points), which is
            // WCAG 2.5.8 / 2.5.5 and correct — a 6px control is not clickable by
            // anyone. Sized as a dot it obeyed the floor by stretching into a
            // 6x24 bar; sized as a target with a dot in it, both are right. The
            // width follows the same pointer question the height already asks,
            // so a finger gets 44x44 and a mouse keeps a 24px dot row.
            <button
              key={b.path + b.method}
              type="button"
              onClick={() => pick(i)}
              aria-label={b.line}
              aria-current={i === at ? 'true' : undefined}
              className="grid h-6 w-6 place-items-center rounded-full [@media(pointer:coarse)]:w-11"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors motion-reduce:transition-none ${
                  i === at ? 'bg-white' : 'bg-white/25 hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="flex min-h-svh w-full items-center px-4 py-14 sm:px-6 lg:px-8">
      {/* The SECTION is the viewport — full width, and `svh` rather than `vh`
          because mobile browser chrome makes `100vh` taller than the screen and
          the fold overflows by exactly the address bar. The CONTENT is what is
          capped: at 2560 a full-bleed grid would stretch the copy into a strip
          and blow the film past its 1920 master, which is the one way to make a
          crisp render look soft. 1600 keeps the measure readable and holds the
          film at ~780px, under 1x even on a retina panel. It takes ONE step up
          past 1536, to 1920, because at 2560 a 1600 island leaves 480px of black
          down each side; 1920 is the widest the cap may go, since half of it is
          928px and the master is 1920 — a film asked for more would be upscaled,
          which is the one way to make a crisp render look soft. Two even columns,
          not a narrow one beside a wide one: at 1280 a 5/7 split left the copy
          480px and broke the three actions across two ragged lines. */}
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 lg:grid-cols-2 lg:gap-16 2xl:max-w-[1920px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl"
        >
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
            {/* The house headline treatment: one weight, one tracking, one
                monochrome white -> neutral sheen, same as the apex hero. */}
            <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
              The AI cloud for agents and apps.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-400 2xl:max-w-xl 2xl:text-xl">
            One API for <span className="text-white">{MODELS_PHRASE}</span>, Base backends,
            identity, secrets, and vector plus full-text search. Pay-as-you-go, billed per
            organization — run it managed, self-host it on your own Kubernetes, or run the same
            binary on <span className="text-white">localhost</span>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
          </div>

          {/* The `$` is a prompt glyph, so it is shown but never copied. The row
              wraps rather than scrolls: a command that runs off the right edge of
              a phone is a command nobody can read before they run it. */}
          <div className="mt-8 inline-flex max-w-full flex-wrap items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5">
            <span className="font-mono text-sm text-neutral-300">$ {DEPLOY}</span>
            <CopyButton value={DEPLOY} label="Copy deploy command" size={20} id="install-cli" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Film />
          <Tour />
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ products --- */

/**
 * The ten categories of cloud products — the whole catalog, on the front door.
 *
 * This replaces a hand-written list of six feature blurbs that named a subset
 * of the cloud and then went stale on its own. The section renders the SAME
 * `CloudCategoryShowcase` the `/products` index does, from the same taxonomy
 * the Products mega-menu reads, so what the menu promises and what this page
 * shows are one thing by construction.
 */
function Products() {
  return (
    <>
      <section className="border-t border-neutral-900 px-4 pb-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            {/* No arithmetic. This said "53 products. 10 categories." — derived
                from the taxonomy every build, so never WRONG, and still the
                wrong thing to say. A count invites the reader to compare a
                number against some other vendor's number, which is a contest
                about size rather than about what any of it does; and it dates
                the page the moment the catalog moves, even when the figure
                keeps up. What matters is that the pieces fit together, which is
                exactly what the sentence below already says and what the map
                under it shows.

                `<h2>`, because the hero carries the page's one `<h1>`. */}
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Every building block. One cloud.
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
      <Products />
      <Billing />
      <FinalCTA />
    </>
  )
}
