'use client'

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useReducedMotion } from "framer-motion"
import { ArrowRight, Github } from "lucide-react"
import { CopyButton } from "@hanzo/ui/product"
import { Mockup } from '@/components/product/Mockup'
import Workloads from '@/components/cloud/Workloads'
import { CONSOLE } from "@/components/home/nav-data"
import { useModelCount } from '@/hooks/useModelCount'
import { cloudCategories, getPrimitive, spell, tour } from '@/lib/data/cloud-primitives'
import { Box } from '@hanzo/ui'

const DOCS = "https://docs.hanzo.ai/docs/services/cloud"
const GH = "https://github.com/hanzoai"
const STATUS = "https://status.hanzo.ai"

/**
 * The image we operate for you, and the one you can pull — same artifact.
 * Verified against GHCR: the tag resolves and the manifest answers.
 */
const DEPLOY = 'docker run -p 8080:8080 ghcr.io/hanzoai/cloud'

/** The installer, verified live: hanzo.sh answers with a POSIX shell script. */
const INSTALL = 'curl -fsSL https://hanzo.sh | sh'

/**
 * The whole API, from your own machine. This is the CLI's OWN spelling —
 * `Serve` is a registered subcommand in `hanzoai/cli` (src/main.rs) and takes
 * `cloud` for the entire API or one service by name.
 *
 * NOT `hanzo up`, which several pages on this site print and which the shipped
 * CLI does not have: an unrecognised first word is read as a task for the
 * coding agent, so the command does not fail — it does something else entirely.
 */
const SERVE = 'hanzo serve cloud'

/**
 * cloud.hanzo.ai's front door — the body of `app/(marketing)/cloud/page.tsx`,
 * promoted to this host's web root by the Dockerfile's `SITE_ROOT=cloud`.
 *
 * It renders the PAGE only. The header and footer come from the shared
 * `(marketing)` layout, which is the same chrome hanzo.ai wears — so the two
 * hosts are one product with one nav, and this file cannot grow a second,
 * divergent one.
 *
 * WHAT THIS PAGE SELLS, and what it does not. The apex sells Hanzo OS and the
 * thesis behind it. This sells the ABSTRACTION: you can put a model, an agent,
 * a database and a production application somewhere without first assembling a
 * hyperscaler out of parts. From code to production without building the cloud
 * first.
 *
 * That is a different argument from the one this page used to run, which was
 * an inventory — the categories, then every product in them, twice. Counting
 * the catalog explains what we own; it never explains why a reader should want
 * one of these instead of ten. So the page now runs the workloads and the
 * planes underneath them, and the catalog is a single explorer at the bottom
 * for the reader who came to browse. `/products` is still the whole index.
 *
 * THE ARC, one claim to a screen: the cloud, the shape of an application on it,
 * compute, where it can run, models, data, network, what you can see, what
 * holds it, the one API under all of it, deploying, taking it with you, paying
 * for it, then the catalog.
 *
 * NOTHING HERE ASSERTS A NUMBER IT CANNOT COUNT. The model count is asked of
 * the gateway at read time. The API paths are the catalog's, which is itself
 * gated on the served OpenAPI document. The tour's operations are checked
 * against that document on every build. A claim this page cannot check is a
 * claim this page does not make.
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
 * The tour — one story, told as the operations that would actually run it.
 *
 * WHY IT CAN BE TRUSTED. Every beat is resolved at BUILD time against the served
 * `/v1/openapi.json` (see `scripts/sync-catalog.mjs`): a beat survives iff the
 * document carries its path AND its verb, so an invented path and a real path
 * with the wrong verb are both dropped before they can reach a reader. The line
 * is ours; the verb, the path and the description under it are the API's own
 * words. The product chips come from the same catalogue the menu reads — and
 * where an operation has no product row yet, none are drawn rather than a
 * stand-in being found for it.
 *
 * IT IS THE PROOF, NOT THE DECORATION. It sits under the one-API claim because
 * it is what settles it: a dozen operations across six planes, one key, and not
 * one line of integration between them. A reader who does not believe the claim
 * above can read the paths.
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
      <Box className="mt-1 min-h-[3.25rem]">
        <code className="font-mono text-xs text-neutral-300">
          <span className="text-neutral-500">{beat.method}</span> {beat.path}
        </code>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">{beat.summary}</p>
      </Box>

      {/* Real products, where the catalogue carries one for that operation. */}
      <Box className="mt-3 flex min-h-[1.75rem] flex-wrap items-center gap-1.5">
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
      </Box>

      {/* The button sits BESIDE the dots where there is room and ABOVE them
          where there is not: at 390px the twelve targets wrap to three rows and
          a vertically centred button reads as floating in the middle of them. */}
      <Box className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => setHeld((v) => !v)}
          aria-pressed={held}
          className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-white/40 hover:text-white motion-reduce:transition-none"
        >
          {paused ? 'Play' : 'Pause'}
        </button>
        <Box className="-mx-1 flex flex-wrap items-center">
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
        </Box>
      </Box>
    </div>
  )
}

/* ----------------------------------------------------------------- parts --- */

/** The section shell every band below shares, so none can drift from the rest. */
function Band({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`border-t border-neutral-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8 ${className}`}>
      <Box className="mx-auto max-w-5xl">{children}</Box>
    </section>
  )
}

/** One band's headline. One size, one weight, everywhere. */
function Head({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
      {children}
    </h2>
  )
}

/** The line under a headline. */
function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">{children}</p>
  )
}

/** A link out of a band — one shape, so twelve of them read as one page. */
function More({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-neutral-300 no-underline transition-colors hover:text-white hover:no-underline motion-reduce:transition-none"
    >
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

/**
 * A command, shown with a prompt glyph that is never copied.
 *
 * The row WRAPS rather than scrolling: a command that runs off the right edge
 * of a phone is a command nobody can read before they run it. `break-words`,
 * not `break-all` — the latter broke the image name mid-token at 390px, which
 * is a command nobody can trust.
 */
function Command({ value, id }: { value: string; id: string }) {
  return (
    <Box className="inline-flex max-w-full flex-wrap items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5">
      <span className="break-words text-left font-mono text-xs text-neutral-300 sm:text-sm">
        $ {value}
      </span>
      <CopyButton value={value} label={`Copy: ${value}`} size={20} id={id} />
    </Box>
  )
}

/* ------------------------------------------------------------------ hero --- */

/**
 * The claim, the reach, and one thing a developer can run.
 *
 * THE COPY ARRIVES. Elements on a 70ms stagger, each 0.42s on a quintic
 * ease-out — quick enough that a reader who scrolls immediately is not waiting
 * on it, and flat at the end so nothing bounces. It is `hz-rise` in globals.css
 * rather than a prop on a motion component, so it starts at FIRST PAINT instead
 * of at hydration: an entrance declared in JavaScript ships `opacity: 0` in the
 * HTML, and the largest element on the page has no business being invisible
 * until a bundle lands. Reduced motion is decided in the same one place.
 */
function Hero({ models }: { models: string | null }) {
  /** The nth thing to arrive. One definition, so the rhythm cannot drift. */
  const rise = (i: number) => ({ animationDelay: `${i * 0.07}s` })

  // The model count leads the strip when the gateway has answered and is simply
  // absent when it has not. A row that says "models" with no number is a row
  // that spends a reader's attention on nothing.
  const strip = [
    models,
    'GPUs',
    'Functions',
    'Containers',
    'Databases',
    'Observability',
    'One API',
  ].filter(Boolean) as string[]

  return (
    // `svh`, not `vh`: mobile browser chrome makes `100vh` taller than the
    // screen and the fold overflows by exactly the address bar.
    <section className="flex min-h-svh w-full items-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      {/* Two columns from lg, and the tracks change SHAPE at xl rather than
          appearing there. Reading runs left to right, so the picture belongs
          beside the copy at every width that can hold both.

          At lg they share the width in proportion — 1fr to 1.1fr, which at 1024
          is 434 against 478. Naming the fixed 34rem measure this early is what
          used to force a stack: the first track takes its 544 whatever is left,
          so the picture got 360 and a 360x203 still beside a full column of
          type is worse than stacking.

          From xl the measure is capped instead. Past ~34rem a line is wider
          than anyone finishes reading, so every pixel beyond it belongs to the
          picture — 544 against 776 at 1440. Keeping the proportion there would
          grow both and leave the copy unreadable. */}
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] xl:gap-14 2xl:max-w-[1800px]">
        <div>
          <p style={rise(0)} className="hz-rise text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
            Hanzo Cloud
          </p>

          <h1 style={rise(1)} className="hz-display hz-rise mt-5">
            {/* SOLID INK. A white -> neutral gradient clipped to the glyphs
                makes the END of the line its dimmest point, so the last word
                reads as a render that never finished. Hanzo's ink is
                paper-white.

                Four words, and they are the category rather than a feeling.
                What this is IS the surprise: a cloud whose primitives assume
                there is a model in the application.

                The hyphen is U+2011, which does not offer a break. An ordinary
                one does, and at 434px of measure the line broke after it: "The
                AI-" over "native cloud.", which reads as a word cut in half. */}
            The AI&#8209;native cloud.
          </h1>

          <p
            style={rise(2)}
            className="hz-rise mt-7 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            Run models, agents, applications, data and infrastructure through one
            operating plane.
          </p>

          <p style={rise(3)} className="hz-rise mt-5 max-w-2xl text-base leading-relaxed text-neutral-500">
            Kubernetes-native. Fully observable. Open source. Run it on Hanzo
            infrastructure or infrastructure you control.
          </p>

          <div style={rise(4)} className="hz-rise mt-9 flex flex-wrap items-center gap-3">
            <a
              href={CONSOLE}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black no-underline transition-opacity hover:opacity-90 hover:no-underline"
            >
              Start building <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white no-underline transition-colors hover:border-neutral-400 hover:no-underline"
            >
              Explore the cloud
            </Link>
          </div>

          {/* The reach, as a strip rather than a paragraph. The one number in it
              is asked of the gateway at read time rather than baked. */}
          <p style={rise(5)} className="hz-rise mt-8 text-sm leading-7 text-neutral-500">
            {strip.map((item, i) => (
              <span key={item}>
                {i > 0 && <span className="text-neutral-700"> · </span>}
                {item}
              </span>
            ))}
          </p>

          {/* ONE developer artifact on the fold, and it is the whole platform
              running on a laptop. The tag resolves on GHCR and the console is
              at :8080 with the API under /v1 on the same origin. */}
          <Box style={rise(6)} className="hz-rise mt-7">
            <Command value={DEPLOY} id="deploy-cloud" />
          </Box>
        </div>

        {/* THE SECOND COLUMN. Below lg there is one track and it simply follows
            the copy at full width, which is the only honest answer on a phone —
            two tracks there give each about 170px.

            The console, running. A reader deciding whether to put their work
            here wants to see the thing they will be looking at every day, not a
            diagram of how it fits together. It carries no copy — a picture
            cannot reflow or answer a screen reader — so its meaning is the alt. */}
        <div style={rise(7)} className="hz-rise mt-14 min-w-0 lg:mt-0">
          <Mockup
            slug="console"
            alt="The Hanzo console: models, agents, applications, databases and clusters in one list."
          />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- whole --- */

/**
 * The shape of an AI application, and the fact that one system holds all of it.
 *
 * This is where the page used to state its inventory — the categories, then
 * every product in them. An inventory answers "what exists"; a reader standing
 * here is asking "will my application fit". So the stack is the WORKLOAD, not
 * the catalog: the six things a modern application is made of, in the order
 * they sit on each other.
 */
const WHOLE: [string, string][] = [
  ['Model', 'Inference, embeddings, routing, fallbacks.'],
  ['Agent', 'Tools, memory, sandboxes, orchestration.'],
  ['Application', 'Functions, containers, machines, endpoints.'],
  ['Data', 'Relational, vector, objects, cache.'],
  ['Infrastructure', 'Clusters, networking, regions, capacity.'],
  ['Operations', 'Identity, secrets, traces, billing.'],
]

function Whole() {
  return (
    <Band>
      <Head>One cloud for the whole AI application.</Head>
      <Lead>
        Not a model API beside a container host beside a database beside a
        tracing vendor. One system, with the parts already introduced to each
        other.
      </Lead>

      <Box className="mt-14 overflow-hidden rounded-2xl border border-neutral-800">
        <ol>
          {WHOLE.map(([label, parts]) => (
            <li
              key={label}
              className="grid items-baseline gap-x-8 border-t border-neutral-900 px-5 py-5 first:border-t-0 sm:grid-cols-[13rem_minmax(0,1fr)] sm:px-7 sm:py-6"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">
                {label}
              </span>
              <span className="mt-2 block text-lg text-neutral-200 sm:mt-0 sm:text-xl">{parts}</span>
            </li>
          ))}
        </ol>
      </Box>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
        Everything shares the same organization, project, identity, policy,
        usage and operational context.
      </p>
    </Band>
  )
}

/* ---------------------------------------------------------------- reach --- */

/**
 * One control plane, more than one place to run.
 *
 * WHAT IS CLAIMED, and what is carefully not. Hanzo's own fleet runs on one
 * provider; the other clouds are reached with credentials an org supplies for
 * ITSELF, and a cluster is attached rather than provisioned. So the claim is
 * "attach your own account or your own cluster" — which is what the code does —
 * and never "we run your workloads across eight clouds", which nothing here
 * would back.
 *
 * VISOR IS NAMED as the runtime and not as the product. The customer-facing
 * names are Machines, GPUs, Clusters and Kubernetes — each of which passes this
 * site's own reachability gate into the catalog — and Visor is what serves
 * them, which is how the apex site already refers to it. The link goes to
 * `/visor` here, never to a docs page: that path does not resolve.
 */
const REACH: [string, string][] = [
  ['Hanzo Cloud', 'Capacity we operate and meter, provisioned by the call.'],
  ['Your own cloud account', 'Your credentials, your machines, the same control plane over them.'],
  ['Your own cluster', 'Attach Kubernetes you already run and address it like any other.'],
]

function Reach() {
  return (
    <Band>
      <Head>The cloud is bigger than one provider.</Head>
      <Lead>
        One control plane, different infrastructure underneath it. The API, the
        console, the identities and the bill do not change when the machines do.
      </Lead>

      <Box className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800 sm:grid-cols-3">
        {REACH.map(([title, line]) => (
          <Box key={title} className="bg-black p-6 sm:p-7">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{line}</p>
          </Box>
        ))}
      </Box>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
        Machines, GPUs, clusters and Kubernetes are one surface whichever of
        those it lands on. Visor is the runtime underneath them, and it meters
        every provider against the org that asked.
      </p>

      <More href="/visor">Compute across your own accounts</More>
    </Band>
  )
}

/* --------------------------------------------------------------- models --- */

function Models() {
  return (
    <Band>
      <Head>Every model. One cloud interface.</Head>
      <Lead>
        Let Enso choose when you want the best answer for the job. Name a model
        when you want exactly that one, every time. Run open weights when you
        want to hold them yourself.
      </Lead>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
        Whichever you pick, auth, budgets, routing, fallbacks, usage and
        observability stay in one system — so changing your mind about a model
        is a string, not a migration.
      </p>

      <Box className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-neutral-500">
        <span className="text-neutral-300">OpenAI-compatible</span>
        <span className="text-neutral-700">·</span>
        <span className="text-neutral-300">Anthropic-compatible</span>
      </Box>

      <Box className="flex flex-wrap items-center gap-x-8">
        <More href="/models">Every model we serve</More>
        <More href="/agents">Build and run agents</More>
      </Box>
    </Band>
  )
}

/* ----------------------------------------------------------------- data --- */

/**
 * The data plane, one line per primitive.
 *
 * The LIST is the catalog's, not this file's: `cloudCategories` is read from
 * the commerce snapshot and filtered to what publishes, so a primitive renamed
 * upstream is renamed here and one withdrawn disappears. This file owns only
 * the sentence under each name, keyed by slug — a primitive with no sentence
 * still renders, with the catalog's own descriptor.
 */
const DATA: Record<string, string> = {
  sql: 'Relational, per project and per tenant.',
  vector: 'Embeddings stored and searched where they are used.',
  kv: 'Cache and queues at request latency.',
  s3: 'Objects, signed URLs, lifecycle rules.',
  docdb: 'Documents on the MongoDB wire protocol.',
  datastore: 'Columnar analytics over everything you collected.',
  base: 'An application backend — records, rules, realtime.',
  memory: 'What an agent is allowed to remember between runs.',
}

function Data() {
  const plane = cloudCategories.find((c) => c.id === 'data')
  if (!plane) return null

  return (
    <Band>
      <Head>The data primitives AI applications actually use.</Head>
      <Lead>
        Not one database with an extension bolted on. Each primitive is the
        right shape for the job, and they share a project, a key and a bill.
      </Lead>

      <Box className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {plane.items.map((item) => (
          <div key={item.slug}>
            <h3 className="text-lg font-medium">
              <Link
                href={item.href}
                className="text-white no-underline transition-opacity hover:opacity-70 hover:no-underline motion-reduce:transition-none"
              >
                {item.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              {DATA[item.slug] ?? item.desc}
            </p>
          </div>
        ))}
      </Box>
    </Band>
  )
}

/* -------------------------------------------------------------- network --- */

function Network() {
  return (
    <Band>
      <Head>Everything connects without becoming your problem.</Head>
      <Lead>
        Services find each other. Traffic reaches them over TLS on a name you
        chose. The edges are closed until you open one.
      </Lead>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
        The gateway fronts every API, DNS answers for your names, and routing
        between services is something the cloud does rather than something you
        write.
      </p>

      <More href="/network">The networking plane</More>
    </Band>
  )
}

/* -------------------------------------------------------------- observe --- */

/**
 * The differentiator, given a whole band rather than a card in a grid.
 *
 * A model call, an agent step, a query and a function invocation are four
 * different products almost everywhere else, which means four different traces
 * and no way to add them up. Here they are one request, so the sentence that
 * matters is short enough to be a headline of its own.
 */
function Observe() {
  return (
    <Band>
      <Head>See the entire system, not separate products.</Head>
      <Lead>
        One request, from the edge through an agent, a model, a tool, a database
        and a function — and what every hop of it cost.
      </Lead>

      <p className="mt-14 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        One trace. End to end.
      </p>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
        Logs, metrics, traces, evaluations and spend are read from the same
        request, so &ldquo;why was that answer slow&rdquo; and &ldquo;why was
        that answer expensive&rdquo; are the same question with the same answer.
      </p>

      <Box className="flex flex-wrap items-center gap-x-8">
        <More href="/o11y">Tracing, metrics and evaluation</More>
        <a
          href={STATUS}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline motion-reduce:transition-none"
        >
          Live status, in public <ArrowRight className="h-4 w-4" />
        </a>
      </Box>
    </Band>
  )
}

/* ------------------------------------------------------------- security --- */

function Security() {
  return (
    <Band>
      <Head>Security is part of the cloud.</Head>
      <Lead>
        Every person, agent and workload has an identity. Permissions follow the
        resource rather than the caller. Secrets stay scoped to the environment
        that needs them. Actions stay attributable to whoever took them.
      </Lead>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
        None of that is a product you add afterwards — an agent gets an identity
        because it runs here, and the trail is written because the call went
        through the same door as everything else.
      </p>

      <More href="/security">How identity, keys and audit work</More>
    </Band>
  )
}

/* ------------------------------------------------------------------ api --- */

/**
 * The one API, said as the addresses themselves.
 *
 * EVERY PATH IS THE CATALOG'S. `getPrimitive` reads the commerce snapshot,
 * which `scripts/sync-catalog.mjs` gates on the served OpenAPI document — so a
 * path printed here is one the platform answers, and a product whose path
 * stops answering drops out of this list rather than becoming a 404 in a
 * display font.
 */
const SURFACE = ['models', 'agents', 'functions', 'sql', 'vector', 's3']

function Api() {
  const paths = SURFACE.map((slug) => getPrimitive(slug)?.api).filter(Boolean) as string[]
  if (!paths.length) return null

  return (
    <Band>
      <Head>One API. Every capability.</Head>

      <Box className="mt-12 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/60">
        <Box className="overflow-x-auto px-5 py-6 sm:px-8 sm:py-8">
          <ul className="font-mono text-sm leading-8 text-neutral-300 sm:text-base sm:leading-9">
            {paths.map((path) => (
              <li key={path} className="whitespace-nowrap">
                <span className="text-neutral-600">api.hanzo.ai</span>
                {path}
              </li>
            ))}
            <li className="whitespace-nowrap text-neutral-600">api.hanzo.ai/v1/&hellip;</li>
          </ul>
        </Box>
      </Box>

      <p className="mt-10 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
        Same key. Same organization. Same project. Same policy model. Same usage
        ledger.
      </p>

      <p className="mt-6 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        The interface changes. The system doesn&rsquo;t.
      </p>

      {tour.beats.length > 0 && (
        <>
          <p className="mt-12 max-w-2xl text-base leading-relaxed text-neutral-500">
            {spell(tour.beats.length)} operations, one key, no glue. Each is
            checked against the published OpenAPI document on every build, and a
            beat the document does not carry is dropped rather than drawn.
          </p>
          <Box className="mt-8">
            <Tour />
          </Box>
        </>
      )}
    </Band>
  )
}

/* --------------------------------------------------------------- deploy --- */

function Deploy() {
  return (
    <Band>
      <Head>Push code. Get a production system.</Head>
      <Lead>
        No separate build service to wire up. No container registry to stand up.
        No secret product to buy. No logging to set up afterwards.
      </Lead>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
        What comes back is a running system with an address, a certificate, its
        secrets, its metrics, its logs and its share of the bill — because those
        were never separate purchases.
      </p>

      <Box className="flex flex-wrap items-center gap-x-8">
        <More href="/registry">Builds, releases and rollback</More>
        <More href="/cli">The CLI</More>
      </Box>
    </Band>
  )
}

/* ------------------------------------------------------------- portable --- */

/**
 * The exit, offered rather than hidden.
 *
 * Both commands are verified. `hanzo.sh` answers with a POSIX installer, and
 * `serve` is a registered subcommand of the shipped CLI that takes `cloud` for
 * the whole API. `hanzo up` — which several other pages on this site print — is
 * NOT a command the CLI has; an unrecognised first word is read as a task for
 * the coding agent, so it fails by doing something else.
 */
function Portable() {
  return (
    <Band>
      <Head>Your cloud shouldn&rsquo;t be a one-way door.</Head>
      <Lead>
        The platform is open source, and the image we operate is the image you
        can pull. Same API, same console, same data — on your cluster, in your
        network, or on a laptop on a plane.
      </Lead>

      <Box className="mt-10 flex flex-col items-start gap-3">
        <Command value={INSTALL} id="install-cli" />
        <Command value={SERVE} id="serve-cloud" />
      </Box>

      {/* No margin on the row: `More` and the source link each carry their own
          `mt-10`, and a container that adds a second one spaces this band twice
          as far off the commands above as every other band is spaced. */}
      <Box className="flex flex-wrap items-center gap-x-8">
        <More href="/open-source">What is open, and under which license</More>
        <a
          href={GH}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline motion-reduce:transition-none"
        >
          <Github className="h-4 w-4" /> View source
        </a>
      </Box>
    </Band>
  )
}

/* ---------------------------------------------------------------- price --- */

/**
 * The SHAPE of the bill, and one door to the rates.
 *
 * Plan mechanics are `/pricing`'s job. This page used to render the whole
 * ladder — four plan cards, per-seat team pricing, minimum seats — which is a
 * procurement question asked of a reader who is still deciding whether the
 * thing is for them. What belongs here is what you are actually billed for.
 */
const PRICE: [string, string][] = [
  ['Models', 'by usage'],
  ['Compute', 'by execution'],
  ['Storage', 'by consumption'],
  ['Managed services', 'by usage'],
]

function Price() {
  return (
    <Band>
      <Head>Pay for what runs.</Head>
      <Lead>
        Nothing is billed for existing. A function that was not called and a
        machine that was not running cost what they did — nothing.
      </Lead>

      <Box className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800 sm:grid-cols-2 lg:grid-cols-4">
        {PRICE.map(([what, how]) => (
          <Box key={what} className="bg-black p-6">
            <p className="text-lg font-medium text-white">{what}</p>
            <p className="mt-2 text-sm text-neutral-500">{how}</p>
          </Box>
        ))}
      </Box>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
        One organization balance and one usage ledger behind all of it, so every
        line traces back to a request somebody made.
      </p>

      <More href="/pricing">Every plan and every rate</More>
    </Band>
  )
}

/* -------------------------------------------------------------- explore --- */

/**
 * The catalog, at the bottom, for the reader who came to browse.
 *
 * SEVEN, and they are the planes a reader builds ON. Apps and Web3 are not
 * peers of Compute and Data — apps are built on this cloud, so listing them
 * beside the primitives they consume tells a reader the wrong thing about what
 * the cloud is. Both are still one click away in the full catalog, which is
 * what `/products` is for.
 *
 * The names are the CATALOG'S names, not this file's. A card headed one thing
 * that opens a page headed another is exactly the drift the catalog snapshot
 * exists to prevent — and each card's href is a route the sync resolved
 * against the filesystem.
 */
const EXPLORE = ['ai', 'compute', 'data', 'dev', 'observe', 'security', 'network']

function Explore() {
  const shown = EXPLORE.map((id) => cloudCategories.find((c) => c.id === id)).filter(
    Boolean,
  ) as typeof cloudCategories

  if (!shown.length) return null

  return (
    <Band>
      <Head>Explore the cloud.</Head>
      <Lead>Every plane, and what is in it.</Lead>

      <Box className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((cat) => {
          const Icon = cat.icon
          return (
            <Box key={cat.id} className="bg-black p-6">
              <h3 className="text-lg font-medium">
                <Link
                  href={`/products/${cat.id}`}
                  className="inline-flex items-center gap-2.5 text-white no-underline transition-opacity hover:opacity-70 hover:no-underline motion-reduce:transition-none"
                >
                  <Icon className="h-4 w-4 shrink-0 text-neutral-500" />
                  {cat.title}
                </Link>
              </h3>
              <p className="mt-4 text-sm leading-7">
                {/* Five, because a card is a taste of a plane rather than an
                    index of it — Observe carries seventeen products and a card
                    listing all of them is the wall this page just stopped
                    being. */}
                {cat.items.slice(0, 5).map((item, i) => (
                  <span key={item.slug}>
                    {i > 0 && <span className="text-neutral-700"> · </span>}
                    <Link
                      href={item.href}
                      className="hz-tap text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline motion-reduce:transition-none"
                    >
                      {item.title}
                    </Link>
                  </span>
                ))}
              </p>
            </Box>
          )
        })}
      </Box>

      <More href="/products">View the complete catalog</More>
    </Band>
  )
}

/* ----------------------------------------------------------------- cta --- */

function Close() {
  return (
    <section className="relative overflow-hidden border-t border-neutral-900 px-4 py-28 sm:px-6 sm:py-32 lg:px-8">
      <Box className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, var(--pure-white) 0%, transparent 70%)", filter: "blur(120px)" }}
        />
      </Box>
      <Box className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Build on a cloud designed for AI.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-400">
          Models. Agents. Compute. Data. Security. Observability.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-lg text-neutral-400">
          One API from prototype to production.
        </p>

        <Box className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
        </Box>

        <p className="mt-7 text-sm text-neutral-500">
          Or run Hanzo Cloud on infrastructure you control.
        </p>
      </Box>
    </section>
  )
}

/* --------------------------------------------------------------- page ---- */

/**
 * ProofStrip's rule, applied to a count asked at read time: floor to the
 * hundred so the phrase stays true between one read and the next, and state a
 * count below a hundred exactly rather than rounding it away to zero.
 */
function callable(n: number): string {
  return n >= 100
    ? `${Math.floor(n / 100) * 100}+ callable models`
    : `${n} callable models`
}

export default function CloudLanding() {
  // How many models the gateway will actually answer for, asked of the gateway.
  // Until it answers — and if it never does — the phrase that would quote a
  // number is not drawn at all. See `lib/data/model-count.ts` for why a
  // build-time snapshot cannot be right here.
  const n = useModelCount()

  return (
    <>
      <Hero models={n ? callable(n) : null} />
      <Whole />
      {/* Compute. `Workloads` is the band — one runtime, six kinds of work,
          with the three isolations shown in the API's own words. */}
      <Workloads />
      <Reach />
      <Models />
      <Data />
      <Network />
      <Observe />
      <Security />
      <Api />
      <Deploy />
      <Portable />
      <Price />
      <Explore />
      <Close />
    </>
  )
}
