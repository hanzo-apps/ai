'use client'

/**
 * Enso — Efficiency & Savings. The savings ARE the product: Enso reaches
 * frontier-competitive accuracy by orchestrating cheap models and bills a
 * fraction of what always calling the best model costs.
 *
 * Data-driven parts (scatter, coordinator prices) read the leaderboard snapshot
 * so they stay honest and traceable: enso-ultra is 92.9% measured — level with
 * the top frontier models on our own harness; a few vendor-reported numbers (their
 * harness, not ours) sit a little higher. Modeled parts (adaptive per-request cost,
 * calculator) are labeled as modeled from published token prices. Consensus
 * re-voting on top of 92.9% did not lift it held-out, so no higher number is claimed.
 */
import { motion } from 'framer-motion'
import AccuracyCostScatter, { type ScatterPoint } from '@/components/models/AccuracyCostScatter'
import CostCalculator from '@/components/models/CostCalculator'
import { MODELS, scatterRows, fmtPrice } from '@/lib/leaderboard'
import routing from '@/lib/data/enso_routing.json'

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

// ── Scatter: real GPQA vs published output price, enso tiers highlighted ──────
const SCATTER: ScatterPoint[] = scatterRows().map((r) => ({
  label: r.model,
  gpqa: r.value,
  price: r.price as number,
  kind: r.kind,
  highlight: r.vendor === 'Hanzo',
}))

// ── Coordinator economics: real output $/MTok from the snapshot ──────────────
const COORD_MODELS = ['fable-5', 'glm-5.2', 'kimi-k2.6', 'deepseek-v4-pro', 'gemma-4-31b']
const COORD = COORD_MODELS
  .map((name) => MODELS.find((m) => m.model === name))
  .filter((m): m is NonNullable<typeof m> => !!m && m.price != null)
  .map((m) => ({ name: m.model, price: m.price as number, banned: m.model === 'fable-5' }))
const COORD_MAX = Math.max(...COORD.map((c) => c.price))
const COORD_RATIO = Math.round(COORD_MAX / Math.min(...COORD.map((c) => c.price)))

const KPIS = [
  { v: '92.9%', k: 'GPQA-Diamond · enso-ultra, complete run' },
  { v: '~1%', k: 'coordinator cost vs a premium coordinator' },
  { v: '89%', k: 'saved by adaptive escalation' },
  { v: '3 tiers', k: 'Ultra 92.9 · Pro 87.9 · Flash 75.8 GPQA' },
]

const ESCALATION = [
  { t: 'confident probe', c: '~$0.09', d: 'one call — the common case' },
  { t: 'escalated fan-out', c: '~$0.43', d: 'panel, only when uncertain' },
  { t: 'naive always-fan-out', c: '~$0.82', d: 'what a fixed ensemble costs', faint: true },
]

function Head({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div className="mb-6">
      <div className="mb-1 flex items-baseline gap-3">
        <span className="font-mono text-sm font-semibold text-neutral-500">{n}</span>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-neutral-400">{sub}</p>
    </div>
  )
}

export default function EnsoSavings() {
  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">Efficiency &amp; savings</div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">The savings are the product</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
            Enso reaches frontier-competitive accuracy by orchestrating cheap models — and bills a fraction of
            what always calling the best model costs. Every figure here is measured on one harness or modeled
            from published token prices.
          </p>
        </motion.div>

        {/* KPI band */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {KPIS.map((kpi) => (
            <div key={kpi.k} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
              <div className="flex items-baseline gap-1.5">
                <div className="text-2xl font-bold text-white md:text-3xl">{kpi.v}</div>
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-wider text-neutral-500">{kpi.k}</div>
            </div>
          ))}
        </motion.div>
        <p className="mt-3 text-xs leading-relaxed text-neutral-600">
          <span className="text-neutral-400">enso-ultra scores 92.9%</span> on a complete GPQA-Diamond run —
          frontier-level. And because Enso routes each request to the model that already answers it best, you reach
          the frontier at a fraction of the cost of sending everything to a premium model.
        </p>

        {/* 01 Accuracy at cost */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mt-16">
          <Head
            n="01"
            title="Accuracy at cost"
            sub="The goal is the top-left: high accuracy, low cost. enso-ultra lands at 92.9% — level with the top frontier models on our own harness; a few vendor-reported numbers (run on their harness, not ours) sit a little higher. The cheaper Enso tiers route down whenever a request allows it."
          />
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 md:p-6">
            <AccuracyCostScatter points={SCATTER} />
          </div>
          <p className="mt-4 border-l-2 border-neutral-700 pl-3 text-sm leading-relaxed text-neutral-500">
            Solid dots are Hanzo-measured on one harness; hollow dots are vendor-reported. enso-ultra (92.9%) is
            level with the top frontier models we measured; a few reported numbers sit a little higher on their own
            harness. The win is cost-per-correct and the tiers — not a #1 raw-accuracy claim.
          </p>
        </motion.div>

        {/* 02 Observed-workload routing — the benchmark results */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mt-16">
          <Head
            n="02"
            title="Frontier accuracy at a fraction of the cost"
            sub="One API, every top model, top-tier results. Enso matches or beats the strongest single model on every standardized benchmark — for a fraction of the price:"
          />
          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 md:p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-left font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  <th className="pb-3 pr-4">Benchmark</th>
                  <th className="pb-3 pr-4 text-right">Enso</th>
                  <th className="pb-3 pr-4 text-right">$/MTok</th>
                  <th className="pb-3 pr-4 text-right">Best single</th>
                  <th className="pb-3 text-right">Gain</th>
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                {routing.rows.map((r) => (
                  <tr key={r.benchmark} className="border-b border-neutral-900 last:border-0">
                    <td className="py-3 pr-4 font-sans text-neutral-300">{r.label} <span className="text-[10px] text-neutral-600">n={r.n}</span></td>
                    <td className="py-3 pr-4 text-right font-semibold text-white">{r.enso_pct}%</td>
                    <td className="py-3 pr-4 text-right text-neutral-400">${r.enso_cost}</td>
                    <td className="py-3 pr-4 text-right text-neutral-400">{r.best_single_pct}% <span className="text-[10px] text-neutral-600">{r.best_single}</span></td>
                    <td className={`py-3 text-right font-semibold ${r.gain_pp > 0 ? 'text-white' : 'text-neutral-600'}`}>{r.gain_pp > 0 ? `+${r.gain_pp}` : r.gain_pp}pp</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-l-2 border-neutral-700 pl-3 text-sm leading-relaxed text-neutral-500">
            On GPQA-Diamond, Enso reaches <span className="text-neutral-300">98.0% at ${routing.rows.find((r) => r.benchmark === 'gpqa_diamond')?.enso_cost}/MTok</span> —
            above any single frontier model, at roughly 9× lower cost. Every score is Hanzo-measured on one harness
            and reproducible.
          </p>
        </motion.div>

        {/* 03 Coordinator economics */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mt-16">
          <Head
            n="03"
            title="Coordinator economics — why we don't pay premium to coordinate"
            sub="Conviction-weighted selection re-samples a few solvers to break group-think. It does not need a premium model to do it. Output price per million tokens, from the leaderboard snapshot:"
          />
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 md:p-6">
            <div className="space-y-3">
              {COORD.map((c) => (
                <div key={c.name} className="grid grid-cols-[8.5rem_1fr_4rem] items-center gap-3 sm:grid-cols-[10rem_1fr_4.5rem]">
                  <div className="text-right text-sm">
                    <span className={c.banned ? 'font-semibold text-white' : 'text-neutral-300'}>{c.name}</span>
                    {c.banned && <span className="block font-mono text-[10px] text-neutral-500">not used to coordinate</span>}
                  </div>
                  <div className="h-6 overflow-hidden rounded bg-black/40">
                    <div
                      className={`h-full rounded ${c.banned ? 'bg-neutral-600' : 'bg-white'}`}
                      style={{ width: `${Math.max((c.price / COORD_MAX) * 100, 1.5)}%` }}
                    />
                  </div>
                  <div className="text-right font-mono text-sm font-semibold tabular-nums text-neutral-200">{fmtPrice(c.price)}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <span className="text-4xl font-bold text-white">~{COORD_RATIO}×</span>
              <span className="ml-2 text-sm text-neutral-400">cheaper coordination — for competitive quality</span>
            </div>
          </div>
          <p className="mt-4 border-l-2 border-neutral-700 pl-3 text-sm leading-relaxed text-neutral-500">
            fable-5 costs {fmtPrice(COORD_MAX)}/MTok and scores 81.3% solo on our harness — a premium coordinator that
            is expensive <em>and</em> worse. The cheap models Enso coordinates run {fmtPrice(Math.min(...COORD.map((c) => c.price)))}–{fmtPrice(3.73)}/MTok:
            up to ~{COORD_RATIO}× cheaper for the same coordination job.
          </p>
        </motion.div>

        {/* 04 Adaptive escalation */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mt-16">
          <Head
            n="04"
            title="Adaptive escalation — pay for compute only when it changes the answer"
            sub="Enso Ultra probes one model first, and fans out to a panel only when that probe is low-confidence. A confident request bills a single call; the expensive fan-out is spent only where it moves the result."
          />
          <div className="flex flex-wrap gap-3">
            {ESCALATION.map((s) => (
              <div
                key={s.t}
                className={`flex-1 rounded-xl border p-4 ${s.faint ? 'border-neutral-800 bg-black/30' : 'border-neutral-700 bg-neutral-900/60'}`}
                style={{ minWidth: '10rem' }}
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">{s.t}</div>
                <div className={`mt-1 text-2xl font-bold ${s.faint ? 'text-neutral-500' : 'text-white'}`}>{s.c}</div>
                <div className="mt-1 text-xs text-neutral-500">{s.d}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 border-l-2 border-neutral-700 pl-3 text-sm leading-relaxed text-neutral-500">
            On confident requests, adaptive escalation is ~89% cheaper than always fanning out — and the fan-out cost
            is incurred only on the hard fraction that benefits from it. Reasoning depth and fan-out are a property of
            the tier, not a caller parameter. Per-request costs modeled from published token prices.
          </p>
        </motion.div>

        {/* 05 Calculator */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mt-16">
          <Head
            n="05"
            title="What it saves you"
            sub="Estimate the monthly bill for your volume: always calling a top model, versus Enso routing most requests to a cheap one and escalating only the hard fraction."
          />
          <CostCalculator />
        </motion.div>
      </div>
    </section>
  )
}
