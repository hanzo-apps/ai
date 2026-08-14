'use client'

import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useReducedMotion } from "framer-motion"
import { ArrowRight, CreditCard, Cpu, Check, Github } from "lucide-react"
import { CopyButton } from "@hanzo/ui/product"
import CloudCategoryShowcase, { CloudCategoryMap } from "@/components/cloud/CloudCategoryShowcase"
import Orbit from "@/components/cloud/Orbit"
import { CONSOLE } from "@/components/home/nav-data"
import { useModelCount } from '@/hooks/useModelCount'
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

const DEPLOY = "docker run -p 8080:8080 ghcr.io/hanzoai/cloud"

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

/**
 * What the cloud is, beside every part of it.
 *
 * WHAT IT REPLACED, and why. The right column used to be a 16:9 film of a
 * console, in a rounded bordered box — a window drawn inside a window, half a
 * grid wide, which reads as a thumbnail of the product rather than the product.
 * The section under it then claimed ten categories while a 900px viewport
 * reached five of them. One picture answers both: the ten categories themselves,
 * around the one API they share, at full size and above the fold. Nothing is
 * framed, because there is no longer a second surface to frame.
 *
 * THE COPY ARRIVES. Four elements on a 70ms stagger, each 0.42s on a quintic
 * ease-out — quick enough that a reader who scrolls immediately is not waiting
 * on it, and flat at the end so nothing bounces. It is `hz-rise` in globals.css
 * rather than a prop on a motion component, so it starts at FIRST PAINT instead
 * of at hydration: an entrance declared in JavaScript ships `opacity: 0` in the
 * HTML, and the largest element on the page has no business being invisible
 * until a bundle lands. Reduced motion is decided in the same one place.
 */
function Hero({ models }: { models: string }) {
  /** The nth thing to arrive. One definition, so the rhythm cannot drift. */
  const rise = (i: number) => ({ animationDelay: `${i * 0.07}s` })

  return (
    // `svh`, not `vh`: mobile browser chrome makes `100vh` taller than the
    // screen and the fold overflows by exactly the address bar.
    <section className="flex min-h-svh w-full items-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      {/* The copy column is CAPPED and the orbit takes the rest, rather than the
          two splitting the width evenly. A measure wider than ~32rem is a
          measure nobody finishes reading, and every pixel it does not take is a
          pixel the ring can use. */}
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-6 sm:gap-12 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-14 2xl:max-w-[1800px]">
        <div>
          <h1
            style={rise(0)}
            className="hz-rise text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl"
          >
            {/* The house headline treatment: one weight, one tracking, one
                monochrome white -> neutral sheen, same as the apex hero. */}
            <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
              The AI cloud for agents and apps.
            </span>
          </h1>

          <p
            style={rise(1)}
            className="hz-rise mt-5 text-lg leading-relaxed text-neutral-400 sm:mt-6 2xl:text-xl"
          >
            One API for <span className="text-white">{models}</span>, Base backends, identity,
            secrets, and vector plus full-text search. Pay-as-you-go, billed per organization — run
            it managed, self-host it on your own Kubernetes, or run the same binary on{' '}
            <span className="text-white">localhost</span>.
          </p>

          <div style={rise(2)} className="hz-rise mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
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
          <div
            style={rise(3)}
            className="hz-rise mt-6 inline-flex max-w-full flex-wrap items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 sm:mt-8"
          >
            <span className="font-mono text-sm text-neutral-300">$ {DEPLOY}</span>
            <CopyButton value={DEPLOY} label="Copy deploy command" size={20} id="install-cli" />
          </div>
        </div>

        {/* Capped by WIDTH, not height: the ring is square, so a width cap is
            the only one it can obey without distorting. 44rem keeps it under a
            900px fold once the section's own padding is paid for. */}
        <div className="mx-auto w-full max-w-[30rem] sm:max-w-[34rem] lg:max-w-[38rem] xl:max-w-[44rem]">
          <Orbit />
        </div>
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
              Open-source building blocks behind one origin and one /v1. They share an
              identity, a bill, and a key, so reaching for a second one costs you a line
              of code rather than an account.
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

function Billing({ models }: { models: string }) {
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
            No seats, no minimums. Add a balance and start; the whole team draws down the
            same one, and usage records say which call spent what.
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
            {/* "call any of {models}" read correctly for a number and became
                "any of every model we serve" the moment the gateway was slow.
                A sentence that takes a substitution has to parse for every
                value the substitution can take. */}
            Create an organization, pick a plan, and start calling {models}. Usage accrues per
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
          Open the console and provision models, Base, IAM, KMS and search against one
          organization. Or pull the image and run the same stack yourself — it is the
          same artifact either way.
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
  // How many models the gateway will actually answer for, asked of the gateway.
  // Until it answers — and if it never does — the sentences that would quote a
  // number say a true thing without one instead of a stale thing with one. See
  // `lib/data/model-count.ts` for why a build-time snapshot cannot be right here.
  const n = useModelCount()
  const models = n ? `${n} models` : 'every model we serve'

  return (
    <>
      <Hero models={models} />
      {/* The tour is the fold's evidence, not its furniture: it belongs under
          the claim, at full measure, rather than as a second panel stacked in
          the hero's other column. Nothing renders if the served OpenAPI
          document left it with no beats. */}
      {tour.beats.length > 0 ? (
        <section className="border-t border-neutral-900 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Tour />
          </div>
        </section>
      ) : null}
      <Products />
      <Billing models={models} />
      <FinalCTA />
    </>
  )
}
