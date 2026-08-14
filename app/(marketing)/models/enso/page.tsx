import type { Metadata } from 'next'
import Link from 'next/link'
import AccuracyCostScatter, { type ScatterPoint } from '@/components/models/AccuracyCostScatter'
import BenchmarkBrowser from '@/components/models/BenchmarkBrowser'
import { ENSO_TIERS, scatterRows, browserGroups, LEADERBOARD_META, fmtScore } from '@/lib/leaderboard'
import { BENCHMARKED_PHRASE, MODELS_PHRASE } from '@/lib/data/model-count'

const TITLE = 'Enso — Hanzo-measured benchmarks'
const DESCRIPTION =
  `The Enso family measured on one harness: three tiers that separate cleanly on quality, accuracy plotted against what it costs, and a reported-versus-measured comparison across ${BENCHMARKED_PHRASE}. Every score keeps its source.`

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
            Enso is our frontier family, and the router that picks among {MODELS_PHRASE} when you
            ask for auto. A vendor&rsquo;s published score and your own are rarely the same number, so
            everything below was run here, on one harness, ours and theirs alike — and every figure
            still says which it is.
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
          <h2 className="mb-2 text-2xl font-bold">Three tiers that stay in order</h2>
          <p className="mb-8 text-neutral-400">Ultra above Pro above Flash, on quality and on price, and it stays that way when the underlying models change. A tier is a contract about cost and quality, not another name for one model. GPQA is measured here; the price band is what you are billed, input then output, per million tokens.</p>
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
            Accuracy alone picks the most expensive model every time, so both axes are here at once.
            Top-left is where you want to be: right answers, cheap. Each dot carries its lab&rsquo;s
            mark; a solid ring means we measured it, a dashed ring means the vendor reported it. Every
            dot is labelled, and hovering gives the exact figure.
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
          <p className="mb-6 text-neutral-400">Start on Flash. Move a request up to Pro or Ultra when it earns the cost, by changing the model id and nothing else.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://console.hanzo.ai" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90">Get API access</a>
            <Link href="/models/zen" className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400">Explore Zen (open weights)</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
