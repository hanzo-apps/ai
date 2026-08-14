import type { Metadata } from 'next'
import Link from 'next/link'
import { allModels } from '@zenlm/models'
import BenchmarkBrowser from '@/components/models/BenchmarkBrowser'
import { browserGroups, MODELS, isOpenWeightVendor } from '@/lib/leaderboard'

const TITLE = 'The Zen family — Hanzo AI'
const DESCRIPTION =
  'The Zen family: the models Hanzo trains, most with weights published so you can serve them yourself. Co-designed with the Zoo Labs Foundation. The open-weight landscape below shows vendor-reported figures; only Enso is measured here end to end.'

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
  { id: 'zen5', label: 'Zen5', desc: 'The current frontier run' },
  { id: 'zen4', label: 'Zen4', desc: 'Language and code' },
  { id: 'zen3', label: 'Zen3', desc: 'Vision, audio, and the specialists' },
  { id: 'foundation', label: 'Foundation', desc: 'Checkpoints to fine-tune from' },
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
            Weights published · run them anywhere
          </div>
          <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">The Zen family</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-400">
            {ZEN_COUNT} models across language, code, vision, image, audio, video and retrieval, co-designed
            by Hanzo AI and the Zoo Labs Foundation, our nonprofit. Most have their weights published, so you
            can call them here or serve them on your own hardware and never talk to us again. A handful are
            API-only; the catalog marks which.
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
          <h2 className="mb-2 text-2xl font-bold">Generations, and what each one is for</h2>
          <p className="mb-8 text-neutral-400">A generation is a training run, not a marketing tier: newer does not mean the older ones stop working, and a small model from an older generation is often the right call. The large ones are Zen MoDE — Mixture of Diverse Experts. Open any generation for specs and prices.</p>
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
          <h2 className="mb-2 text-2xl font-bold">Where open weights stand</h2>
          <p className="mb-6 max-w-3xl text-neutral-400">
            {OPEN_COUNT} open-weight models across the field, by benchmark, so you can see what running your
            own hardware costs you in capability before you commit to it. A figure is what its vendor
            published unless it is tagged Hanzo, which means we ran it ourselves. Toggle the provenance to
            see which is which.
          </p>
          <BenchmarkBrowser groups={OPEN_GROUPS} defaultBench="gpqa_diamond" />
        </div>
      </section>

      {/* Honesty note + CTA */}
      <section className="border-t border-neutral-900 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 text-sm leading-relaxed text-neutral-400">
            <p>
              <span className="font-semibold text-white">Why the two labels.</span> A score is only comparable
              to another score run the same way, and most published figures were not. So the table keeps the
              distinction rather than averaging it away: a figure we ran on our own harness says Hanzo, and a
              figure a vendor published says so too. Enso is the family we measure end to end on one common
              harness — see it on the Enso page. Everything else on this page is cited, not claimed.
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
