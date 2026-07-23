import type { Metadata } from 'next'
import Link from 'next/link'
import AccuracyCostScatter, { type ScatterPoint } from '@/components/models/AccuracyCostScatter'
import BenchmarkBrowser from '@/components/models/BenchmarkBrowser'
import { ENSO_TIERS, scatterRows, browserGroups, LEADERBOARD_META, fmtScore } from '@/lib/leaderboard'

const TITLE = 'Enso — Hanzo-measured benchmarks'
const DESCRIPTION =
  'The Enso family: three differentiated tiers (Ultra 98.0% > Pro 96.0% > Flash 92.9% GPQA-Diamond), frontier accuracy at a fraction of the cost, and a reported-vs-measured comparison across 130+ models. Honest by construction — every score keeps its source.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://hanzo.ai/models/enso' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://hanzo.ai/models/enso',
    siteName: 'Hanzo AI',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const SCATTER: ScatterPoint[] = scatterRows().map((r) => ({
  label: r.model,
  gpqa: r.value,
  price: r.price as number,
  kind: r.kind,
  vendor: r.vendor,
  highlight: r.vendor === 'Hanzo',
}))

const GROUPS = browserGroups({ highlightVendor: 'Hanzo' })

export default function EnsoModelsPage() {
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
            <span className="text-neutral-300">Enso</span>
          </nav>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-white/5 px-4 py-2 text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Hanzo-measured · GPQA-Diamond, one common harness
          </div>
          <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">Enso, measured</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-400">
            Enso orchestrates 400+ models behind one API. Here is how it scores when we run it — and the field —
            on a single harness: three differentiated tiers, accuracy-at-cost, and every number kept with its source.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://console.hanzo.ai" className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90">Start using Enso</a>
            <Link href="/enso" className="rounded-full border border-neutral-700 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400">The Enso product</Link>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-2xl font-bold">Three tiers, monotonic in quality</h2>
          <p className="mb-8 text-neutral-400">Ultra &gt; Pro &gt; Flash — a cost/quality contract, not a model alias. GPQA is Hanzo-measured; price bands are published input→output $/MTok.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ENSO_TIERS.map((t) => (
              <div
                key={t.id}
                className={`flex flex-col rounded-2xl border p-6 ${t.flagship ? 'border-white/30 bg-neutral-900/70' : 'border-neutral-800 bg-neutral-900/50'}`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                  {t.flagship && <span className="rounded-full border border-white/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Flagship</span>}
                  {t.featured && <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">Default</span>}
                </div>
                <div className="font-mono text-xs text-neutral-500">{t.id}</div>
                <div className="my-4 flex items-baseline gap-2 border-y border-neutral-800 py-3">
                  <span className="text-3xl font-bold text-white">{fmtScore(t.gpqa)}%</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">GPQA</span>
                  <span className="ml-auto font-mono text-xs text-neutral-400">${t.priceIn} → ${t.priceOut}</span>
                </div>
                <p className="text-sm leading-relaxed text-neutral-400">{t.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accuracy at cost */}
      <section className="border-t border-neutral-900 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-2xl font-bold">Accuracy at cost</h2>
          <p className="mb-6 max-w-3xl text-neutral-400">
            enso-ultra reaches 98.0% GPQA-Diamond — top-left is the goal (high accuracy, low cost), and it sits there
            at a price below premium single models that score far lower. Solid dots are Hanzo-measured; hollow
            dots are vendor-reported. Every dot is labelled; hover for the exact figure.
          </p>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 md:p-6">
            <AccuracyCostScatter points={SCATTER} />
          </div>
        </div>
      </section>

      {/* Reported vs measured browser */}
      <section className="border-t border-neutral-900 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-2xl font-bold">Reported vs. what we measured</h2>
          <p className="mb-6 max-w-3xl text-neutral-400">
            Pick a benchmark, then filter by provenance. Enso numbers are all Hanzo-measured; the rest of the field
            shows a mix of what we measured and what vendors report. {LEADERBOARD_META.totalModels} models,{' '}
            {LEADERBOARD_META.totalBenchmarks} benchmarks.
          </p>
          <BenchmarkBrowser groups={GROUPS} defaultBench="gpqa_diamond" highlightVendor="Hanzo" />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-900 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 text-2xl font-bold">Build on the tier that fits</h2>
          <p className="mb-6 text-neutral-400">Flash, Pro, and Ultra behind one OpenAI-compatible API. Switch by changing the model id.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://console.hanzo.ai" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90">Get API access</a>
            <Link href="/models/zen" className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400">Explore Zen (open weights)</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
