import type { Metadata } from 'next'
import Link from 'next/link'
import { allModels } from '@zenlm/models'
import BenchmarkBrowser from '@/components/models/BenchmarkBrowser'
import { browserGroups, MODELS, isOpenWeightVendor } from '@/lib/leaderboard'

const TITLE = 'Zen — open-weight model family'
const DESCRIPTION =
  'The Zen family: open-weight frontier models you can self-host anywhere, co-designed by Hanzo AI and the Zoo Labs Foundation. Benchmarks shown are UPSTREAM-reported for the open ecosystem — only Enso is Hanzo-measured end-to-end.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://hanzo.ai/models/zen' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://hanzo.ai/models/zen',
    siteName: 'Hanzo AI',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

// Zen catalog, grouped by generation (specs/pricing live in @zenlm/models).
const GEN = [
  { id: 'zen5', label: 'Zen5', desc: 'Next-generation agentic frontier' },
  { id: 'zen4', label: 'Zen4', desc: 'Flagship language & code' },
  { id: 'zen3', label: 'Zen3', desc: 'Multimodal & specialized' },
  { id: 'foundation', label: 'Foundation', desc: 'Base checkpoints' },
]
const GENS = GEN.map((g) => ({
  ...g,
  models: allModels.filter((m) => m.generation === g.id),
})).filter((g) => g.models.length > 0)
const ZEN_COUNT = allModels.length

// Open-weight landscape from the leaderboard — all UPSTREAM-reported (plus the
// few open models we also measured). Provenance is preserved per row.
const OPEN_GROUPS = browserGroups({ pool: (m) => isOpenWeightVendor(m.vendor), limit: 30 })
const OPEN_COUNT = MODELS.filter((m) => isOpenWeightVendor(m.vendor)).length

export default function ZenModelsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-900 px-4 pb-16 pt-28 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[720px] w-[720px] -translate-x-1/2 rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 68%)', filter: 'blur(100px)' }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-neutral-500">
            <Link href="/models" className="hover:text-white">Models</Link>
            <span>/</span>
            <span className="text-neutral-300">Zen</span>
          </nav>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-white/5 px-4 py-2 text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Open weights · run anywhere · upstream-reported benchmarks
          </div>
          <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">The Zen family</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-400">
            {ZEN_COUNT} open-weight models across language, code, vision, image, audio, and retrieval — co-designed by
            Hanzo AI and the Zoo Labs Foundation. Free to self-host, or managed on Hanzo Cloud. Benchmarks here are
            UPSTREAM-reported for the open ecosystem Zen builds on; only Enso is Hanzo-measured end-to-end.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/zen/models" className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90">Full Zen catalog</Link>
            <a href="https://console.hanzo.ai" className="rounded-full border border-neutral-700 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400">Get API key</a>
          </div>
        </div>
      </section>

      {/* Generations */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-2xl font-bold">Four generations, one API</h2>
          <p className="mb-8 text-neutral-400">MoDE (Mixture of Diverse Experts) architecture. Explore the full catalog with specs and pricing.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {GENS.map((g) => (
              <Link
                key={g.id}
                href="/zen/models"
                className="flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 transition-colors hover:border-neutral-600"
              >
                <div className="text-lg font-semibold text-white">{g.label}</div>
                <div className="mb-3 text-xs text-neutral-500">{g.desc}</div>
                <div className="mt-auto font-mono text-2xl font-bold text-white">{g.models.length}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">models</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Open-weight landscape — upstream reported */}
      <section className="border-t border-neutral-900 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-2xl font-bold">The open-weight landscape — upstream reported</h2>
          <p className="mb-6 max-w-3xl text-neutral-400">
            Where the open ecosystem Zen builds on stands, by benchmark. {OPEN_COUNT} open-weight models; numbers
            are upstream-reported unless tagged Hanzo — we only relabel a score as ours when we ran it. Toggle the
            provenance to see which is which.
          </p>
          <BenchmarkBrowser groups={OPEN_GROUPS} defaultBench="gpqa_diamond" />
        </div>
      </section>

      {/* Honesty note + CTA */}
      <section className="border-t border-neutral-900 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 text-sm leading-relaxed text-neutral-400">
            <p>
              <span className="font-semibold text-white">Why upstream-reported?</span> Zen is the open-weight family;
              its results follow the reported numbers of the open bases it is built on, on the vendors&rsquo; own
              harnesses. Enso — the proprietary orchestration layer — is the one thing we measure end-to-end on a
              single common harness. That is the honest line between what we ran and what we cite.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/zen/models" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90">Full Zen catalog</Link>
            <Link href="/models/enso" className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400">See Enso (measured)</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
