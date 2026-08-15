'use client'

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useReducedMotion } from "framer-motion"
import { ArrowRight, Github } from "lucide-react"
import { CopyButton } from "@hanzo/ui/product"
import Ladder from "@/components/cloud/Ladder"
import { Mockup } from '@/components/product/Mockup'
import Workloads from '@/components/cloud/Workloads'
import Layers from "@/components/cloud/Layers"
import { CONSOLE } from "@/components/home/nav-data"
import { useModelCount } from '@/hooks/useModelCount'
import { cloudCategories, layerCount, spell, tour } from '@/lib/data/cloud-primitives'

const DOCS = "https://docs.hanzo.ai/docs/services/cloud"
const GH = "https://github.com/hanzoai"
// The demo door. One address, so the hero and any later ask cannot diverge.
const DEMO = "mailto:sales@hanzo.ai?subject=Hanzo%20Cloud%20demo"
const STATUS = "https://status.hanzo.ai"

/** The image we operate for you, and the one you can pull. Same artifact. */
const DEPLOY = "docker run -p 8080:8080 ghcr.io/hanzoai/cloud"

/**
 * cloud.hanzo.ai's front door — the body of `app/(marketing)/cloud/page.tsx`,
 * promoted to this host's web root by the Dockerfile's `SITE_ROOT=cloud`.
 *
 * It renders the PAGE only. The header and footer come from the shared
 * `(marketing)` layout, which is the same chrome hanzo.ai wears — so the two
 * hosts are one product with one nav, and this file cannot grow a second,
 * divergent one.
 *
 * THE ARGUMENT, IN ORDER. The page used to open on "The AI cloud for agents and
 * apps", show the ten categories, and then spend four thousand pixels listing
 * seventy-nine products as cards. Every word of it was true and none of it was a
 * reason: it described the inventory and left the reader to work out why owning
 * one of these beats owning ten. So the page now runs an argument, one claim to
 * a screen:
 *
 *   1. the claim        ten integrated layers, one bill, no assembly tax
 *   2. the cost avoided what assembling ten vendors actually costs, counted
 *   3. the evidence     one org, one key, twelve real API calls, no glue
 *   4. the layers       what the ten are, and that they share one origin
 *   5. the terms        reliable, served, and priced — with the prices shown
 *
 * The inventory did not go anywhere: `/products` renders it, which is the page
 * whose job it is, and every product is still one click from here (see Layers).
 *
 * NOTHING HERE ASSERTS A NUMBER IT CANNOT COUNT. The ten is
 * `cloudCategories.length` — the commerce catalog's answer, read at build. The
 * model count is asked of the gateway at read time. The prices are the rows that
 * charge. A claim this page cannot check is a claim this page does not make.
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
 * IT IS THE PROOF, NOT THE DECORATION. It sits under the assembly-tax argument
 * because it is what settles it: twelve operations across six layers, one key,
 * and not one line of integration between them. A reader who does not believe
 * the claim above can read the paths.
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
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7"
    >
      <p className="text-xs uppercase tracking-wider text-neutral-600">{tour.story}</p>

      {/* Two lines reserved, so a short beat and a long one are the same box. */}
      <p className="mt-3 min-h-[3.5rem] text-lg font-medium leading-snug text-white sm:text-xl">
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

      {/* The button sits BESIDE the dots where there is room and ABOVE them
          where there is not: at 390px the twelve targets wrap to three rows and
          a vertically centred button reads as floating in the middle of them. */}
      <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
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

/* ------------------------------------------------------------------ hero --- */

/**
 * The claim, and the ten it is about.
 *
 * THE COPY ARRIVES. Four elements on a 70ms stagger, each 0.42s on a quintic
 * ease-out — quick enough that a reader who scrolls immediately is not waiting
 * on it, and flat at the end so nothing bounces. It is `hz-rise` in globals.css
 * rather than a prop on a motion component, so it starts at FIRST PAINT instead
 * of at hydration: an entrance declared in JavaScript ships `opacity: 0` in the
 * HTML, and the largest element on the page has no business being invisible
 * until a bundle lands. Reduced motion is decided in the same one place.
 */
function Hero({ layers, models }: { layers: number; models: string | null }) {
  /** The nth thing to arrive. One definition, so the rhythm cannot drift. */
  const rise = (i: number) => ({ animationDelay: `${i * 0.07}s` })

  return (
    // `svh`, not `vh`: mobile browser chrome makes `100vh` taller than the
    // screen and the fold overflows by exactly the address bar.
    <section className="flex min-h-svh w-full items-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      {/* The copy column is CAPPED and the orbit takes the rest, rather than the
          two splitting the width evenly. A measure wider than ~34rem is a
          measure nobody finishes reading, and every pixel it does not take is a
          pixel the ring can use. */}
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-14 2xl:max-w-[1800px]">
        <div>
          {/* THE POSITIONING, and it is one sentence long: what this is, and
              what it does for you. The eyebrow names the CATEGORY, because a
              reader who has never heard of us needs to know what KIND of thing
              this is before the promise means anything. */}
          <p style={rise(0)} className="hz-rise text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
            The Cloud Virtualization Platform
          </p>

          <h1
            style={rise(1)}
            className="hz-rise mt-5 text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4rem] 2xl:text-7xl"
          >
            {/* SOLID INK. A white -> neutral gradient clipped to the glyphs
                makes the END of the line its dimmest point, so the last word
                reads as a render that never finished. Hanzo's ink is
                paper-white. */}
            Give your cloud superpowers
          </h1>

          <p
            style={rise(2)}
            className="hz-rise mt-7 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            Virtualize every layer of infrastructure — compute, networking, identity, and
            services — into one AI-native cloud, composed from any combination of bare metal, your
            own cloud accounts, and the hyperscalers&rsquo; regions and services. So you can build,
            ship, and scale with superpowers.
          </p>

          {/* The one number on the fold, and it is asked of the gateway at read
              time rather than baked. Nothing is drawn until it answers: a
              sentence about how much we serve, with no measurement behind it, is
              a sentence worth less than the space it takes. */}
          {models && (
            <p style={rise(3)} className="hz-rise mt-6 text-sm text-neutral-500">
              One endpoint answers for{' '}
              <span className="font-medium text-neutral-300">{models}</span> right now.
            </p>
          )}

          <div style={rise(4)} className="hz-rise mt-9 flex flex-wrap items-center gap-3">
            <a
              href={CONSOLE}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black no-underline transition-opacity hover:opacity-90 hover:no-underline"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={DEMO}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white no-underline transition-colors hover:border-neutral-400 hover:no-underline"
            >
              Request a demo
            </a>
            <a
              href={GH}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline"
            >
              <Github className="h-4 w-4" /> View source
            </a>
          </div>

          {/* The sentence above says the cloud is COMPOSED. This is that: bare
              metal, your own accounts and the hyperscalers' regions receding
              behind one address. It carries no copy — a film cannot reflow or
              answer a screen reader — so its meaning is the alt. */}
          <div style={rise(5)} className="hz-rise mt-14 sm:mt-16">
            <Mockup
              base="/cloud-virtualize-wide"
              alt="Bare metal, your own cloud accounts (digitalocean, aws, gcp, azure) and hyperscaler regions composing into one cloud at api.hanzo.ai/v1, carrying all ten layers."
            />
          </div>
        </div>

      </div>
    </section>
  )
}

/* --------------------------------------------------------- assembly tax --- */

/**
 * What assembling it yourself costs — the argument the headline makes, made.
 *
 * "No assembly tax" is an assertion until the page says what the tax IS, so the
 * section counts it. Every row is a thing you own once per vendor and once per
 * platform, and the column of repeated {n}s against the column of 1s is the
 * argument stated as arithmetic rather than as an adjective. The last row is the
 * one that has no number on either side, and it is the expensive one.
 *
 * The {n} is `cloudCategories.length`, not a typed ten: the whole rhetorical
 * force of the table is that it is the SAME ten the page just showed, so it had
 * better move when that does.
 *
 * No competitor is named and none is implied — "ten vendors" is the shape of the
 * alternative, not an accusation about anyone's product.
 */
function AssemblyTax({ layers }: { layers: number }) {
  const rows: [string, string, string][] = [
    ['Accounts to open', String(layers), '1'],
    ['Keys to store and rotate', String(layers), '1'],
    ['SDKs to keep on a version', String(layers), '1'],
    ['Consoles to learn', String(layers), '1'],
    ['Invoices to reconcile', String(layers), '1'],
    ['Vendors to review for security', String(layers), '1'],
    ['Code holding it together', 'yours', 'none'],
  ]

  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          The assembly tax.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
          Nobody sends you a bill for it. You pay it in engineering — in the accounts, the keys, the
          SDK bumps, the security reviews, and above all in the code that holds one vendor's answer
          to the next vendor's input. It is the largest thing most teams buy, and it is invisible.
        </p>

        <div className="mt-14 overflow-hidden rounded-2xl border border-neutral-800">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-neutral-800">
                <th scope="col" className="px-5 py-4 text-sm font-normal text-neutral-500 sm:px-7">
                  Per year, forever
                </th>
                {/* The two answers are held CLOSE and the label takes the rest,
                    because the whole argument is read across those two columns:
                    spread to the width of the table they are two lists a reader
                    compares row by row, and side by side they are one glance. */}
                <th
                  scope="col"
                  className="w-24 px-3 py-4 text-right text-sm font-normal text-neutral-500 sm:w-32 sm:px-4"
                >
                  Assembled
                </th>
                <th
                  scope="col"
                  className="w-24 px-5 py-4 text-right text-sm font-medium text-white sm:w-36 sm:px-7"
                >
                  Hanzo Cloud
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, many, one]) => (
                <tr key={label} className="border-b border-neutral-900 last:border-0">
                  <th
                    scope="row"
                    className="px-5 py-4 text-left text-sm font-normal text-neutral-300 sm:px-7 sm:py-5 sm:text-base"
                  >
                    {label}
                  </th>
                  {/* The dim column is the one you pay for. Weight and value do
                      the work — no red, no strike-through, nothing that would
                      make a comparison read as a sneer. */}
                  <td className="px-3 py-4 text-right text-xl font-medium text-neutral-600 sm:px-4 sm:py-5 sm:text-2xl">
                    {many}
                  </td>
                  <td className="px-5 py-4 text-right text-xl font-medium text-white sm:px-7 sm:py-5 sm:text-2xl">
                    {one}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
          Integrated means the joins are already made. One origin, one identity, one balance — you
          did not build them, and you do not maintain them.
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- evidence --- */

/** The claim above, settled by the operations that would actually run it. */
function Evidence() {
  if (!tour.beats.length) return null
  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Counted, and spelled the way the headline spells its ten — a page
            that writes one count as a word and the next as a numeral reads as
            two pages. */}
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          One key. {spell(tour.beats.length)} calls. No glue.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
          Models, routing, agents, sandboxes, memory, a channel, a site, a storefront, and the bill
          for all of it — one organization, one bearer token, one origin. Every operation below is
          one the platform serves: each is checked against the published OpenAPI document on every
          build, and a beat the document does not carry is dropped rather than drawn.
        </p>
        <div className="mt-12">
          <Tour />
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- terms --- */

/**
 * The three promises, each said with the thing that makes it checkable.
 *
 * A pillar with nothing under it is a poster. Reliable is answered by an image
 * you can pull and a status page you can read; served, by source you can read
 * and terms you can negotiate; priced, by the ladder — the actual rows commerce
 * charges, rendered from the catalog rather than described.
 */
function Terms() {
  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Reliable platform.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-400">
              What we run for you is an image you can run yourself — the same artifact, on your own
              cluster or on a laptop. A platform you can hold is a platform that cannot strand you.
            </p>
            <p className="mt-5">
              <a
                href={STATUS}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline motion-reduce:transition-none"
              >
                Live status, in public →
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              World-class service.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-400">
              The source is public, so an answer can be a commit and a bug can be fixed in the open —
              not filed with someone who has never read the code. And if it has to run your way, it
              runs your way: dedicated, on-premise, or air-gapped.
            </p>
            <p className="mt-5">
              <Link
                href="/contact-sales"
                className="text-sm text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline motion-reduce:transition-none"
              >
                Talk to an engineer →
              </Link>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Predictable pricing.
            </h2>
            {/* NOT "no seats, no minimums", which the page then contradicts two
                inches lower: Team is priced per person with a floor of two. A
                plan, then metered usage, is what is actually true of every row
                in the ladder below. */}
            <p className="mt-4 text-base leading-relaxed text-neutral-400">
              A plan, then usage — metered per call against one organization balance, so every line
              traces back to a request. Here is the whole shape of it.
            </p>
          </div>
        </div>

        <Ladder />
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- cta --- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-neutral-900 px-4 py-28 sm:px-6 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", filter: "blur(120px)" }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Start with one bill.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-400">
          Open the console and the whole platform is already provisioned against one organization.
          Or pull the image and run it yourself — it is the same artifact either way.
        </p>

        {/* The `$` is a prompt glyph, so it is shown but never copied. The row
            wraps rather than scrolls: a command that runs off the right edge of
            a phone is a command nobody can read before they run it. It sits
            HERE, beside the sentence that offers it, rather than in the hero —
            on the fold it was a fourth thing competing with the claim, and in a
            third-width column it broke across three lines. */}
        <div className="mx-auto mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5">
          {/* `break-words`, not `break-all`: at 390px the latter broke the image
              name mid-token — "…/clou" then "d" — which is a command nobody can
              read, let alone trust. This wraps between the words the command
              already has and only splits a token that cannot fit on its own. */}
          <span className="break-words text-left font-mono text-xs text-neutral-300 sm:text-sm">
            $ {DEPLOY}
          </span>
          <CopyButton value={DEPLOY} label="Copy deploy command" size={20} id="install-cli" />
        </div>

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
  // Until it answers — and if it never does — the sentence that would quote a
  // number is not drawn at all. See `lib/data/model-count.ts` for why a
  // build-time snapshot cannot be right here.
  const n = useModelCount()

  return (
    <>
      <Hero layers={layerCount} models={n ? `${n} models` : null} />
      {/* The ten, immediately. A visitor who scrolls once should see the shape
          of the thing, not a third paragraph about it. */}
      <Layers />
      <Workloads />
      <AssemblyTax layers={layerCount} />
      <Evidence />
      <Terms />
      <FinalCTA />
    </>
  )
}
