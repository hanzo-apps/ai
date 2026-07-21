/**
 * Enso benchmark data layer.
 *
 * One source of truth for the model-family browsers (/models/enso, /models/zen)
 * and the Enso savings section. Reads the frozen leaderboard snapshot
 * (lib/data/leaderboard.json — 134 models, each score tagged with its `source`)
 * and exposes pure, typed accessors. Honest by construction: every score keeps
 * its provenance, and `sourceKind` is the single predicate that separates what
 * Hanzo measured on one harness from what a vendor/third-party reported.
 *
 * Enso numbers are Hanzo-measured. The Zen family (open weights) and every
 * third-party model surface their UPSTREAM reported numbers — never relabeled
 * as ours.
 */
import raw from './data/leaderboard.json'

export type BenchId = string

export interface Score {
  value: number
  source: string
}

export interface LbModel {
  model: string
  vendor: string
  scores: Record<BenchId, Score>
  price: number | null
  intelligence: number
}

interface Leaderboard {
  benchmarks: Record<BenchId, string>
  task_bench: Record<string, BenchId[]>
  models: LbModel[]
}

const data = raw as unknown as Leaderboard

/** benchmark id → display label (e.g. gpqa_diamond → "GPQA-Diamond"). */
export const BENCHMARKS: Record<BenchId, string> = data.benchmarks

/** Ordered benchmark ids, headline reasoning/science first. */
export const BENCH_ORDER: BenchId[] = [
  'gpqa_diamond',
  'humanitys_last_exam',
  'mmlu_pro',
  'livecodebench',
  'livecodebench_pro',
  'swe_bench_pro',
  'terminal_bench',
  'scicode',
  'charxiv_reasoning',
  'tau3_banking',
  'mrcr_v2',
  'long_context_reasoning',
].filter((b) => b in BENCHMARKS)

export const MODELS: LbModel[] = data.models

// ── Provenance ────────────────────────────────────────────────────────────
export type SourceKind = 'measured' | 'reported'

/** The single predicate: measured ⟺ Hanzo ran it on our one harness. */
export function sourceKind(source: string): SourceKind {
  return source === 'hanzo-measured' ? 'measured' : 'reported'
}

/** Compact label for a source string (full string kept for the row `title`). */
export function sourceShort(source: string): string {
  if (source === 'hanzo-measured') return 'Hanzo-measured'
  if (source === 'provider-reported') return 'Provider-reported'
  if (source === 'do-catalog') return 'Catalog'
  const dash = source.indexOf('—')
  const head = (dash >= 0 ? source.slice(0, dash) : source).trim()
  return head.length > 26 ? `${head.slice(0, 24)}…` : head
}

// ── Vendors ───────────────────────────────────────────────────────────────
/** Vendors whose weights ship open — the upstream landscape Zen builds on. */
export const OPEN_WEIGHT_VENDORS = new Set<string>([
  'DeepSeek',
  'Alibaba',
  'Zhipu',
  'Moonshot',
  'NVIDIA',
  'Meta',
  'MiniMax',
  'Xiaomi',
])

export function isOpenWeightVendor(vendor: string): boolean {
  return OPEN_WEIGHT_VENDORS.has(vendor)
}

// ── Enso tiers ────────────────────────────────────────────────────────────
/**
 * The three Enso presets as differentiated cost/quality contracts. GPQA values
 * are Hanzo-measured (cross-checked against the leaderboard snapshot); price
 * bands are published input→output $/MTok. Monotonic in quality:
 * Ultra (92.9) > Pro (87.9) > Flash (75.8).
 */
export interface EnsoTier {
  id: string
  name: string
  gpqa: number
  priceIn: number
  priceOut: number
  tag: string
  blurb: string
  featured?: boolean
  flagship?: boolean
}

export const ENSO_TIERS: EnsoTier[] = [
  {
    id: 'enso-ultra',
    name: 'Enso Ultra',
    gpqa: 92.9,
    priceIn: 12.5,
    priceOut: 75,
    tag: 'Maximum verified quality',
    blurb:
      'Adaptive fan-out + conviction-weighted selection on the hardest problems. A confident probe bills one call, so Ultra prices near Pro despite being top-tier.',
    flagship: true,
  },
  {
    id: 'enso',
    name: 'Enso Pro',
    gpqa: 87.9,
    priceIn: 20,
    priceOut: 75,
    tag: 'Balanced — the everyday default',
    blurb:
      'Routed to the best-fit model per request across coding, review, and responsive agents. Routes down to a cheap model whenever one suffices. 1M context.',
    featured: true,
  },
  {
    id: 'enso-flash',
    name: 'Enso Flash',
    gpqa: 75.8,
    priceIn: 2,
    priceOut: 6,
    tag: 'Fastest, most economical',
    blurb:
      'The high-volume default — a single lean model for chat, extraction, and simple steps, escalating only when a task needs it. Cheapest per request.',
  },
]

/** Enso rows straight from the leaderboard (all Hanzo-measured). */
export function ensoModels(): LbModel[] {
  return MODELS.filter((m) => m.vendor === 'Hanzo')
}

// ── Per-benchmark rows (drives the reported-vs-measured browser) ───────────
export interface BenchRow {
  model: string
  vendor: string
  value: number
  source: string
  kind: SourceKind
  price: number | null
}

/** All models that carry a score for `bench`, sorted high→low. */
export function rowsForBenchmark(bench: BenchId): BenchRow[] {
  const rows: BenchRow[] = []
  for (const m of MODELS) {
    const s = m.scores[bench]
    if (!s) continue
    rows.push({
      model: m.model,
      vendor: m.vendor,
      value: s.value,
      source: s.source,
      kind: sourceKind(s.source),
      price: m.price,
    })
  }
  return rows.sort((a, b) => b.value - a.value)
}

/**
 * Curated accuracy-at-cost set: the three Enso tiers plus a representative
 * frontier + open-weight field, all with a published price. Shared by the Enso
 * savings section and the /models/enso browser so the scatter never drifts.
 */
export const SCATTER_MODELS = [
  'enso-ultra', 'enso', 'enso-flash', 'gpt-5.5', 'gpt-5.2-pro', 'gpt-5.6-sol',
  'kimi-k2.6', 'qwen3.5-397b-a17b', 'opus-4.8', 'glm-5.2', 'gemma-4-31b', 'fable-5',
]

export function scatterRows(): BenchRow[] {
  return rowsForBenchmark('gpqa_diamond').filter((r) => SCATTER_MODELS.includes(r.model) && r.price != null)
}

/**
 * Groups for the reported-vs-measured browser: every covered benchmark, top rows
 * plus any highlighted-vendor row so it is always visible.
 */
export function browserGroups(opts?: {
  pool?: (m: LbModel) => boolean
  highlightVendor?: string
  limit?: number
}): { id: BenchId; label: string; rows: BenchRow[] }[] {
  const { pool, highlightVendor, limit = 40 } = opts ?? {}
  return coveredBenchmarks(pool).map(({ id, label }) => {
    let all = rowsForBenchmark(id)
    if (pool) {
      const keep = new Set(MODELS.filter(pool).map((m) => m.model))
      all = all.filter((r) => keep.has(r.model))
    }
    const top = all.slice(0, limit)
    const extra = highlightVendor
      ? all.filter((r) => r.vendor === highlightVendor && !top.includes(r))
      : []
    const rows = [...top, ...extra].sort((a, b) => b.value - a.value)
    return { id, label, rows }
  })
}

/** Benchmarks that have at least one row, in headline order. */
export function coveredBenchmarks(pool?: (m: LbModel) => boolean): { id: BenchId; label: string }[] {
  const test = pool ?? (() => true)
  return BENCH_ORDER.filter((b) => MODELS.some((m) => test(m) && m.scores[b])).map((id) => ({
    id,
    label: BENCHMARKS[id],
  }))
}

// ── Formatting ────────────────────────────────────────────────────────────
export function fmtScore(v: number): string {
  return Number.isInteger(v) ? `${v}` : v.toFixed(1)
}

export function fmtPrice(p: number | null): string {
  if (p == null) return '—'
  if (p >= 100) return `$${Math.round(p)}`
  return `$${p}`
}

export const LEADERBOARD_META = {
  totalModels: MODELS.length,
  totalBenchmarks: BENCH_ORDER.length,
  measuredScores: MODELS.reduce(
    (n, m) => n + Object.values(m.scores).filter((s) => sourceKind(s.source) === 'measured').length,
    0,
  ),
} as const
