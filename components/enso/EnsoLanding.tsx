'use client'

/* MODELS is a PROP, not a literal. It comes from `fetchModels()` in the server
   page, which reads the serving catalog at build time — the same source the
   homepage strip uses, so the two cannot disagree. This said `400+` while the
   catalog served 527, which is the failure mode a typed number always has. */

/**
 * Hanzo Enso — the proprietary model-orchestration product landing.
 *
 * Enso is a multi-agent system delivered as ONE model: one API to the world's best models that solves
 * complex, multi-step tasks behind a single OpenAI- and Anthropic-compatible API. It ships in three
 * default presets — Enso Flash, Enso Pro, Enso Ultra. Enso is PROPRIETARY and
 * available ONLY via Hanzo Cloud; the open-weights Zen family stays free to self-host.
 *
 * This is the detailed product page (served at /enso on both hanzo.ai and
 * cloud.hanzo.ai). It ships the shared site chrome, so it lives at the app ROOT (outside the (marketing) route group),
 * like the apex home.
 *
 * No benchmark figures and no competitor comparisons. The page used to carry
 * both -- a score tile, and a paragraph placing Enso against three rival models
 * by name and number -- under a comment claiming it had no competitor tables.
 * It is a claim nobody can check: there is no published technical report behind
 * the numbers, and a reader cannot tell a measured score from a chosen one.
 *
 * What stays is what a reader can act on: Enso leads several public benchmarks,
 * said once and without a figure, and the tiers ordered by accuracy so someone
 * can pick between them. Prices stay exact -- see the note above PRESETS -- for
 * the opposite reason: a price is checkable against the bill.
 */
import { motion } from '@/components/motion'
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  Check,
  Cloud,
  Cpu,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { SiteHeader, SiteFooter } from '@/components/home/shell'
import { EnsoLogo } from './EnsoLogo'
import EnsoSavings from './EnsoSavings'

const CONSOLE = 'https://console.hanzo.ai'
const CLOUD = 'https://cloud.hanzo.ai'
const DOCS = 'https://docs.hanzo.ai/docs/services/models'
const CONTACT = 'https://cloud.hanzo.ai/contact/sales'

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div {...fade} transition={{ duration: 0.5 }} className="mx-auto mb-14 max-w-2xl text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">{eyebrow}</div>
      <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-neutral-400">{sub}</p>}
    </motion.div>
  )
}

const PILLARS = [
  {
    n: '01',
    icon: Network,
    title: 'One API — every model, every modality',
    body: 'Text, code, vision, documents, images, audio, and video through one OpenAI- and Anthropic-compatible endpoint. Enso unifies the frontier and open models across every modality — the first hyper-modal interface. You write one integration, not ten.',
  },
  {
    n: '02',
    icon: BrainCircuit,
    title: 'Superior on complex, multi-step work',
    body: 'Built for coding, reasoning, research, and other quality-critical workflows. Enso delivers stronger, more reliable results on hard, multi-step tasks than any single model.',
  },
  {
    n: '03',
    icon: ShieldCheck,
    title: 'You control the agent pool',
    body: 'Opt specific providers or models out of Enso’s pool to meet data, privacy, compliance, or org requirements — with a full audit trail of which models ran, on your organization’s cloud.',
  },
]

// No benchmark tile. A score on a wall is a brag, and there is no published
// technical report to send anyone to for the rest of the picture — so the
// claim lives in prose, without a figure, where it can be read as the sentence
// it is. The three below are facts about how the thing behaves.
const stats = (models: string) => [
  { icon: Zap, value: '<15µs', label: 'Routing overhead', sub: 'per request' },
  { icon: Boxes, value: models, label: 'Callable models', sub: 'frontier + open Zen, one API' },
  { icon: Sparkles, value: '1 API', label: 'OpenAI + Anthropic', sub: 'drop-in, or via Hanzo CLI' },
]

/**
 * The three presets as differentiated cost/quality contracts, ordered by
 * accuracy: Ultra, then Pro, then Flash. The ordering is what a reader needs to
 * choose between them; the scores behind it are not published, so they are not
 * quoted here or on the card.
 *
 * Price bands are input→output $/MTok and MUST equal what the billing engine
 * actually charges — the `retail` values in the Enso catalog, reconciled against
 * real usage rows. They are not a marketing band. Quoting a number below the
 * billed rate means charging customers above the advertised price, so if these
 * disagree with the catalog, the catalog is right and this is the bug.
 */
const TIERS = [
  {
    name: 'Enso Ultra',
    id: 'enso-ultra',
    priceBand: '$5 → $25',
    tag: 'Maximum quality',
    icon: Layers,
    body: 'Our most accurate model, for work where being wrong is expensive — research reproduction, security analysis, and long autonomous runs. It leads several public benchmarks, and costs less per output token than the frontier models it beats.',
    points: ['Research & paper reproduction', 'Security assessment', 'Deep, long-running tasks'],
    flagship: true,
  },
  {
    name: 'Enso Pro',
    id: 'enso · the default',
    priceBand: '$4 → $20',
    tag: 'Balanced — the everyday default',
    icon: Workflow,
    body: 'The default for real work — coding, code review, and agents that have to answer while someone waits. Priced for everyday scale. Opt out of specific providers to meet data and compliance constraints.',
    points: ['Coding & code review', 'Responsive agents', 'Provider opt-out controls'],
    featured: true,
  },
  {
    name: 'Enso Flash',
    id: 'enso-flash',
    priceBand: '$2 → $4',
    tag: 'Fastest, most economical',
    icon: Zap,
    body: 'The high-volume default. Lowest latency and lowest cost, for everyday chat, classification, extraction, and simple agent steps.',
    points: ['High-volume, low latency', 'Cheapest per request', 'Great default for chat & tools'],
  },
]

const USE_CASES = [
  { icon: Terminal, role: 'Coding & code review', body: 'Enso finds the bugs a single model misses — comprehensive reviews that surface twenty issues where others flag three. Drop it into your existing coding tools unchanged.' },
  { icon: BrainCircuit, role: 'Research & autonomy', body: 'Point Enso at a paper or a patent landscape and it works autonomously — reading, implementing, training, evaluating, and connecting sources across dozens of documents in hours, not days.' },
  { icon: ShieldCheck, role: 'Security assessment', body: 'From one scoped instruction, Enso drives an end-to-end assessment — recon, injection and auth checks, and a clean report with evidence and retest steps — staying strictly inside scope.' },
  { icon: Workflow, role: 'Orchestration at scale', body: 'Frontier-level output with unusually strong persona and identity stability across long sessions — the property that matters most for production agent products.' },
]

const FAQ = [
  { q: 'Where can I use Hanzo Enso?', a: 'Enso is proprietary and available ONLY through Hanzo Cloud — a single endpoint that speaks both the OpenAI and Anthropic API styles natively. Point your existing OpenAI or Anthropic client at the Hanzo base URL and call an `enso-*` model id — or use it in Claude Code or Codex via the Hanzo CLI. (The open-weights Zen family, by contrast, is free to run on Hanzo Cloud or self-host anywhere.)' },
  { q: 'What are Flash, Pro, and Ultra?', a: 'The three default Enso presets: Flash for fast, high-volume work; Pro as the balanced everyday default for coding and agents; Ultra for maximum quality on hard, high-stakes problems. All behind one API — switch by changing the model id. Zen and other models remain available too.' },
  { q: 'How is Enso different from the Zen models?', a: 'Zen is the family of OPEN-WEIGHT models built by Zoo Labs Foundation that you can self-host. Enso is Hanzo’s PROPRIETARY orchestration layer on top — a learned router that assembles and coordinates the best available models (Zen and frontier) per task. Enso runs only on Hanzo Cloud; Zen runs anywhere.' },
  { q: 'Can I control which models or providers Enso uses?', a: 'Yes. Opt specific providers or models out of Enso’s pool to satisfy data-residency, privacy, or compliance requirements. Every request records which models actually ran.' },
  { q: 'Will my data be used to train models? Can I opt out?', a: 'Off unless you turn it on. We do not use your inputs or outputs to train our models unless you explicitly opt in, and where an organization administers accounts the administrator controls that for everyone in it. Enso runs inside your Hanzo Cloud organization with a full audit trail. The terms are at /legal/research-contribution.' },
  { q: 'Can I see which underlying models Enso used for each query?', a: 'Yes. Each response carries the orchestration trace — the models selected, the roles they played, and the routing decisions — visible in the console and via the API.' },
  { q: 'Is Enso generally available?', a: 'Yes. Enso is available now on Hanzo Cloud and is the default for new chats and API requests — every default request routes through the Enso router, which selects the right tier (Flash, Pro, or Ultra) per task. Zen and other models stay available for explicit selection. Enterprise and dedicated deployment are available on request.' },
]

export default function EnsoLanding({ models }: { models: string }) {
  return (
    <>
      <SiteHeader surface="ai" />

      <main className="bg-black pt-16 text-white">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 68%)', filter: 'blur(110px)' }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <motion.div {...fade} transition={{ duration: 0.5 }} className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-white/5 px-4 py-2">
              <EnsoLogo size={16} className="text-white" />
              <span className="text-sm font-medium text-neutral-200">Enso · the intelligence layer of Hanzo OS</span>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.6, delay: 0.05 }} className="mx-auto mb-8 flex justify-center">
              <EnsoLogo size={88} className="text-white" />
            </motion.div>

            <motion.h1 {...fade} transition={{ duration: 0.5, delay: 0.1 }} className="text-balance text-5xl font-bold leading-[1.05] md:text-7xl">
              {/* The old headline was a Tolkien joke, and the paragraph under it spent
                  three clauses on mechanism ("dynamically orchestrates", "collective
                  intelligence") before ever naming a benefit. State the benefit; the
                  mechanism is the next line down and the whole page after it. */}
              <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                Never compromise on performance.
                <br className="hidden sm:block" /> Or price.
              </span>
            </motion.h1>

            <motion.p {...fade} transition={{ duration: 0.5, delay: 0.15 }} className="mx-auto mt-6 max-w-2xl text-xl text-neutral-300 md:text-2xl">
              Enso is a multi-agent intelligence system, delivered as one model. It reads every request and puts the
              right models on it — the frontier when the work is hard, the fast ones
              when it isn’t.
            </motion.p>

            <motion.div {...fade} transition={{ duration: 0.5, delay: 0.22 }} className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={CONSOLE} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-black transition-opacity hover:opacity-90">
                Start using Enso <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/models/enso" className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-8 py-3 font-medium text-white transition-colors hover:border-neutral-400">
                See the technology
              </Link>
            </motion.div>

            <motion.p {...fade} transition={{ duration: 0.5, delay: 0.3 }} className="mx-auto mt-6 inline-flex max-w-xl items-center justify-center gap-2 text-sm text-neutral-500">
              <Cloud className="h-4 w-4" /> Enso is proprietary and available only via Hanzo Cloud. The open-weights Zen family stays free to self-host.
            </motion.p>

            <motion.div {...fade} transition={{ duration: 0.5, delay: 0.36 }} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
              <span>Available through</span>
              {['OpenAI + Anthropic API', 'Claude Code / Codex via Hanzo CLI', 'Hanzo SDKs', 'MCP'].map((s) => (
                <span key={s} className="text-neutral-300">{s}</span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── What is Enso ─────────────────────────────────────────────────── */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHead
              eyebrow="What is Hanzo Enso"
              title="A multi-agent system, delivered as one model"
              sub="Instead of hand-designing team roles and workflows, Enso learns to assemble agents from a pool and coordinate them through efficient, non-obvious collaboration patterns — automatically, per task."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {PILLARS.map((p, i) => (
                <motion.div key={p.n} {...fade} transition={{ duration: 0.5, delay: i * 0.06 }} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                      <p.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-neutral-600">{p.n}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The connection the page lacked. Enso answering a question is the
            smallest thing it does; what makes it worth the integration is that
            the answer can become an action and the action becomes a measured
            outcome, without leaving the system. Placed high, right after the
            what-it-is section, because a reader deciding between Enso and a
            model API is deciding exactly this. */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Built into Hanzo OS
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-neutral-100 sm:text-4xl">
              Intelligence, action, outcome. One system.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
              Enso does not stop at an answer. It works through Hanzo agents, calls
              governed tools, executes in isolated sandboxes, reads your company context,
              deploys through Hanzo Cloud, and the result comes back measured by
              Observability and Insights — so the loop from intent to outcome closes inside
              one system rather than across five vendors.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-400">
              <Link href="/agents" className="hover:text-neutral-100">Agents</Link>
              <Link href="/tabs" className="hover:text-neutral-100">Sandboxes</Link>
              <Link href="/team" className="hover:text-neutral-100">Company context</Link>
              <Link href="/cloud" className="hover:text-neutral-100">Hanzo Cloud</Link>
              <Link href="/o11y" className="hover:text-neutral-100">Observability</Link>
              <Link href="/insights" className="hover:text-neutral-100">Insights</Link>
            </div>
          </div>
        </section>


        {/* ── Enso vs Zen ──────────────────────────────────────────────────── */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHead eyebrow="Enso vs Zen" title="Proprietary orchestration, on open foundations" />
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div {...fade} transition={{ duration: 0.5 }} className="rounded-2xl border border-neutral-700 bg-neutral-900/60 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <EnsoLogo size={28} className="text-white" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Enso</h3>
                    <p className="text-sm text-neutral-500">Proprietary · Hanzo Cloud only</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {['Learned orchestration over the best models', 'Flash · Pro · Ultra presets', 'One OpenAI + Anthropic endpoint', 'Managed, metered, audited on Hanzo Cloud'].map((x) => (
                    <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-white" /> {x}</li>
                  ))}
                </ul>
                <Link href="/models/enso" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neutral-300 hover:text-white">
                  Explore Enso benchmarks <ArrowUpRight className="h-4 w-4 text-neutral-500" />
                </Link>
              </motion.div>
              <motion.div {...fade} transition={{ duration: 0.5, delay: 0.06 }} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Boxes className="h-7 w-7 text-neutral-300" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Zen</h3>
                    <p className="text-sm text-neutral-500">Open weights · run anywhere</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {['Open-weight frontier models', 'Chat, code, and agents', 'Self-host on your own hardware', 'Free — or managed on Hanzo Cloud'].map((x) => (
                    <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-neutral-400" /> {x}</li>
                  ))}
                </ul>
                <Link href="/models/zen" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neutral-300 hover:text-white">
                  Explore Zen models <ArrowUpRight className="h-4 w-4 text-neutral-500" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Tech behind ──────────────────────────────────────────────────── */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHead
              eyebrow="The technology"
              title="Research-driven coordination for multi-agent intelligence"
              sub="Enso is grounded in Hanzo’s research on learned model orchestration (HIP-0510): how a system can learn to assemble, route, and coordinate expert agents for each task instead of relying on hand-designed workflows."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { tag: 'Learned router', title: 'Microsecond routing', body: 'A lightweight coordinator scores every request and dispatches it to the right model in microseconds — routing overhead you can ignore, applied to every call.' },
                { tag: 'Learned coordinator', title: 'Roles, turns, and verification', body: 'Enso assigns Thinker / Worker / Verifier roles and adaptively delegates across coding, math, reasoning, and knowledge tasks — coordinating diverse model pools to outperform any single worker.' },
              ].map((c, i) => (
                <motion.div key={c.tag} {...fade} transition={{ duration: 0.5, delay: i * 0.06 }} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-7">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">{c.tag}</div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{c.body}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href={DOCS} className="inline-flex items-center gap-1 text-sm font-medium text-neutral-300 hover:text-white">
                Learn more about Enso <ArrowUpRight className="h-4 w-4 text-neutral-500" />
              </a>
            </div>
          </div>
        </section>

        {/* ── How to use — Flash / Pro / Ultra ─────────────────────────────── */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHead
              eyebrow="How to use"
              title="Three presets — price × performance"
              sub="Ultra, Pro, and Flash trade cost against accuracy in that order. Pick the one that fits the work, and switch between them without changing your integration — it is one endpoint either way."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {TIERS.map((t, i) => (
                <motion.div
                  key={t.name}
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={`flex flex-col rounded-2xl border p-8 ${
                    t.flagship
                      ? 'border-white/30 bg-neutral-900/70'
                      : t.featured
                        ? 'border-neutral-600 bg-neutral-900/70'
                        : 'border-neutral-800 bg-neutral-900/50'
                  }`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                      <t.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">{t.name}</h3>
                        {t.flagship && <span className="rounded-full border border-white/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Flagship</span>}
                        {t.featured && <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">Default</span>}
                      </div>
                      <p className="font-mono text-xs text-neutral-500">{t.id}</p>
                    </div>
                  </div>
                  {/* The price leads, because it is the number a reader can
                      check against their own bill. A benchmark score sat here
                      at 3xl -- the largest thing on the card -- and nothing
                      published backs it. */}
                  <div className="mb-4 flex items-baseline gap-2 border-y border-neutral-800 py-3">
                    <span className="text-3xl font-bold text-white">{t.priceBand}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">/MTok in → out</span>
                  </div>
                  <p className="mb-2 text-xs font-medium text-neutral-500">{t.tag}</p>
                  <p className="mb-5 text-sm leading-relaxed text-neutral-400">{t.body}</p>
                  <ul className="mt-auto space-y-2">
                    {t.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-sm text-neutral-300">
                        <Check className="h-4 w-4 shrink-0 text-white" /> {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/models/enso" className="inline-flex items-center gap-1 text-sm font-medium text-neutral-300 hover:text-white">
                Compare every measured benchmark <ArrowUpRight className="h-4 w-4 text-neutral-500" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Quantitative results ─────────────────────────────────────────── */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHead
              eyebrow="Quantitative results"
              title="Frontier capability, measured — without single-vendor risk"
              sub="Enso reaches frontier-level results by routing each request to the right model in microseconds. Real, measured numbers — not a fabricated benchmark table."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats(models).map((s, i) => (
                <motion.div key={s.label} {...fade} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-7 text-center">
                  <s.icon className="mx-auto mb-4 h-6 w-6 text-neutral-400" />
                  <div className="text-4xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 text-sm font-medium text-neutral-300">{s.label}</div>
                  <div className="mt-0.5 text-xs text-neutral-500">{s.sub}</div>
                </motion.div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-neutral-600">
              Enso delivers frontier capability without the risk of single-vendor export controls or lock-in — the router
              always dispatches to a currently-available model in its pool.
            </p>
          </div>
        </section>

        {/* ── Efficiency & savings ─────────────────────────────────────────── */}
        <EnsoSavings />

        {/* ── Built for (use cases) ────────────────────────────────────────── */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHead eyebrow="Built for" title="What teams build with Enso" />
            <div className="grid gap-6 md:grid-cols-2">
              {USE_CASES.map((u, i) => (
                <motion.div key={u.role} {...fade} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <u.icon className="h-5 w-5 text-white" />
                    <h3 className="text-base font-semibold text-white">{u.role}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-400">{u.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────────────────── */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHead
              eyebrow="Pricing"
              title="Pay for intelligence, not integrations"
              sub="Usage-based, per-organization billing on Hanzo Cloud. When one agent handles a task you pay the standard rate for that model; when Enso coordinates several, you’re charged a single rate based on the top-tier model involved — never stacked fees."
            />
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div {...fade} transition={{ duration: 0.5 }} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-300"><Cpu className="h-4 w-4" /> Pay-as-you-go</div>
                <p className="mb-5 text-sm text-neutral-400">For production workloads that need maximum reliability. Consumption-based tokens, served at higher priority, with transparent per-request cost you can predict and export.</p>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {['Single rate — no stacked model fees', 'Per-request orchestration trace', 'Per-org usage & cost export'].map((x) => (
                    <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-white" /> {x}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...fade} transition={{ duration: 0.5, delay: 0.06 }} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-300"><Sparkles className="h-4 w-4" /> Subscription</div>
                <p className="mb-5 text-sm text-neutral-400">For casual, everyday hands-on use. Every tier includes Flash, Pro, and Ultra — upgrade when you need longer, heavier, or more frequent sessions.</p>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {['All three presets on every tier', 'Standard · Pro · Max usage tiers', 'Upgrade or downgrade anytime'].map((x) => (
                    <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-white" /> {x}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <div className="mt-8 text-center">
              <a href={`${CLOUD}/pricing`} className="inline-flex items-center gap-1 text-sm font-medium text-neutral-300 hover:text-white">
                See full pricing <ArrowUpRight className="h-4 w-4 text-neutral-500" />
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHead eyebrow="FAQ" title="Questions, answered" />
            <div className="divide-y divide-neutral-900 border-y border-neutral-900">
              {FAQ.map((f, i) => (
                <motion.details key={f.q} {...fade} transition={{ duration: 0.4, delay: i * 0.03 }} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white">
                    {f.q}
                    <ArrowRight className="h-4 w-4 shrink-0 text-neutral-500 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">{f.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div {...fade} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 p-10 text-center md:p-14">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              </div>
              <div className="relative z-10">
                <EnsoLogo size={40} className="mx-auto mb-4 text-white" />
                <h2 className="text-3xl font-bold text-white md:text-4xl">Ready to build with Hanzo Enso?</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">Enable Enso for your Hanzo Cloud organization, or talk to us about enterprise and dedicated deployment.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a href={CONSOLE} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-black transition-opacity hover:opacity-90">
                    Start using Enso <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href={CONTACT} className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-8 py-3 font-medium text-white transition-colors hover:border-neutral-400">
                    Contact sales
                  </a>
                  <a href={DOCS} className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-8 py-3 font-medium text-white transition-colors hover:border-neutral-400">
                    <Cpu className="h-4 w-4" /> Read the research
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter surface="ai" />
    </>
  )
}
