'use client'

/**
 * Enso — Efficiency & Savings. The savings ARE the product: Enso reaches
 * frontier-competitive accuracy by orchestrating cheap models and bills a
 * fraction of what always calling the best model costs.
 *
 * Data-driven parts (scatter, prices, per-request costs) read the leaderboard
 * snapshot so they stay honest and traceable: the three tiers are Ultra 98.0 >
 * Pro 96.0 > Flash 92.9 GPQA-Diamond, and every price claim names the model it
 * is measured against so it can be checked on the chart. Per-request figures are
 * derived from the billed tier rates at one stated mix (1K in / 1K out), never
 * typed in. Present results and savings; the routing mechanism is not described here.
 */
import { motion } from '@/components/motion'
import AccuracyCostScatter, { type ScatterPoint } from '@/components/models/AccuracyCostScatter'
import CostCalculator from '@/components/models/CostCalculator'
import { MODELS, scatterRows, fmtPrice, ensoSavings, ensoTier, fmtReqCost, reqCost, HARD_FRACTION, TOP_RATE } from '@/lib/leaderboard'

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
  vendor: r.vendor,
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

// ── Price headline: read off the snapshot, never typed in ────────────────────
// enso-ultra tops the field on GPQA; the honest price claim is against the
// priciest model in that same field, so both halves stay checkable on the chart
// above. Hard-coding "< Opus" went stale the moment a rate moved.
const ULTRA = MODELS.find((m) => m.model === 'enso-ultra')!
const DEAREST = scatterRows().reduce((a, b) => ((b.price as number) > (a.price as number) ? b : a))
const ULTRA_RATIO = ((DEAREST.price as number) / (ULTRA.price as number)).toFixed(1)
// Same formula the calculator below runs, at the same default mix — so the headline
// KPI and the calculator can never disagree.
const SAVED = Math.round(ensoSavings() * 100)

// Every score in the snapshot carries a `source`, and enso's are "hanzo-measured"
// while most competitors' come from Artificial Analysis or Vals AI. A number that
// tops a field it was measured on by the party who benefits has to say so ON the
// tile — a reader who discovers it later discounts every other figure here.
const G = ULTRA.scores.gpqa_diamond
// The count, not just the percentage. 98.0% is 194 right out of 198, and a
// reader who can see that can check it; one who cannot has to take the number
// on trust. It also survives an edit: a percentage nobody can write as an
// integer count over n did not come from a run, which is the test that rejected
// a proposed 96.3 (190.67 correct) and kept the real 96.0.
const ULTRA_EVIDENCE =
  G?.correct && G?.n
    ? `${G.correct}/${G.n} correct · Hanzo-measured`
    : G?.source === 'hanzo-measured'
      ? 'Hanzo-measured'
      : (G?.source ?? '')

const KPIS = [
  { v: '98.0%', k: `GPQA-Diamond · enso-ultra · ${ULTRA_EVIDENCE}` },
  { v: `${ULTRA_RATIO}× cheaper`, k: `than ${DEAREST.model}, which scores ${DEAREST.value}%` },
  { v: `${SAVED}%`, k: `saved vs always calling a top model, at ${HARD_FRACTION * 100}% hard` },
  { v: '3 tiers', k: 'One GPQA set of 198, three routing pools: 184 · 190 · 194 correct' },
]

// Per-request costs at the one reference mix (1K in / 1K out), derived from the
// billed tier rates so they move when a rate moves.
const ESCALATION = [
  { t: 'simple request', c: fmtReqCost(reqCost(ensoTier('enso-flash'))), d: 'the common case, on Flash' },
  { t: 'harder request', c: fmtReqCost(reqCost(ensoTier('enso-ultra'))), d: 'escalates to Ultra, only when needed' },
  { t: 'always-max baseline', c: fmtReqCost(reqCost(TOP_RATE)), d: 'paying top rate every time', faint: true },
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
            Enso delivers frontier accuracy and bills a fraction of what always calling a top model costs.
            enso-ultra reaches the field&rsquo;s best 98.0% GPQA-Diamond for {fmtPrice(ULTRA.price)}/MTok — {ULTRA_RATIO}× under
            the priciest frontier model, which scores {DEAREST.value}%.
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
          Measured, stated plainly: <span className="text-neutral-400">enso-ultra 98.0%</span>, enso-pro 96.0%,
          enso-flash 92.9% on GPQA-Diamond — each a distinct price/quality tier, all through one API.
        </p>

        {/* 01 Accuracy at cost */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mt-16">
          <Head
            n="01"
            title="Accuracy at cost"
            sub={`The goal is the top-left: high accuracy, low cost. enso-ultra sits there — 98.0% GPQA-Diamond (Hanzo-measured), at ${fmtPrice(ULTRA.price)}/MTok against fable-5 at $42 and ${DEAREST.model} at ${fmtPrice(DEAREST.price)}, both of which score lower. Pro and Flash trade accuracy for even lower cost.`}
          />
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 md:p-6">
            <AccuracyCostScatter points={SCATTER} />
          </div>
          <p className="mt-4 border-l-2 border-neutral-700 pl-3 text-sm leading-relaxed text-neutral-500">
            A solid ring is Hanzo-measured; a dashed ring is vendor-reported. enso-ultra (98.0%) leads the field on
            accuracy at {fmtPrice(ULTRA.price)}/MTok — the win is accuracy-per-dollar across the three tiers.
          </p>
        </motion.div>

        {/* 02 Coordinator economics */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mt-16">
          <Head
            n="02"
            title="Frontier accuracy without frontier prices"
            sub="Top-tier results without paying a top-tier rate on every request. Output price per million tokens across models in the field:"
          />
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 md:p-6">
            <div className="space-y-3">
              {COORD.map((c) => (
                // The bar is the only thing on this row that carries a quantity, so it is the
                // column that must not be squeezed. Three side-by-side tracks need ~640px to
                // work: the two fixed ones (label + price) cost 200px, and at 390 that left the
                // bar 92px — narrower than the label beside it, on a chart that IS the bar. So
                // below `sm` the row stacks: name and price share the top line, the bar spans
                // the full width beneath it and measures 316px instead of 92px.
                <div key={c.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 sm:grid-cols-[10rem_1fr_4.5rem]">
                  <div className="text-left text-sm sm:text-right">
                    <span className={c.banned ? 'font-semibold text-white' : 'text-neutral-300'}>{c.name}</span>
                    {c.banned && <span className="block font-mono text-[10px] text-neutral-500">not used to coordinate</span>}
                  </div>
                  <div className="col-span-2 row-start-2 h-6 overflow-hidden rounded bg-black/40 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                    <div
                      className={`h-full rounded ${c.banned ? 'bg-neutral-600' : 'bg-white'}`}
                      style={{ width: `${Math.max((c.price / COORD_MAX) * 100, 1.5)}%` }}
                    />
                  </div>
                  <div className="col-start-2 row-start-1 text-right font-mono text-sm font-semibold tabular-nums text-neutral-200 sm:col-start-3">{fmtPrice(c.price)}</div>
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

        {/* 03 Adaptive escalation */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mt-16">
          <Head
            n="03"
            title="Pay for what each request needs"
            sub="Simple requests cost little; only the hardest work costs more. You pick the tier, and Enso keeps every request inside that price/quality contract."
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
            Everyday requests cost a fraction of always paying the top rate — extra spend goes only to the hard fraction that needs it. Quality and cost are a property of
            the tier you choose, not a caller parameter. Per-request costs at billed token rates, 1K in / 1K out.
          </p>
        </motion.div>

        {/* 04 Calculator */}
        <motion.div {...fade} transition={{ duration: 0.5 }} className="mt-16">
          <Head
            n="04"
            title="What it saves you"
            sub="Estimate the monthly bill for your volume: always calling a top model, versus Enso routing most requests to a cheap one and escalating only the hard fraction."
          />
          <CostCalculator />
        </motion.div>
      </div>
    </section>
  )
}
