'use client'

/**
 * Reported-vs-measured benchmark browser.
 *
 * Pick a benchmark, then filter by provenance: everything, only what Hanzo
 * measured on one harness, or only what a vendor/third-party reported. Vendors
 * report on their own harness; we measure everyone on one — the toggle makes the
 * difference visible, and every row keeps its exact source in the title on hover.
 */
import { useState } from 'react'
import type { BenchRow, SourceKind } from '@/lib/leaderboard'
import { fmtScore, fmtPrice, sourceShort } from '@/lib/leaderboard'

export interface BenchGroup {
  id: string
  label: string
  rows: BenchRow[]
}

type Filter = 'all' | SourceKind

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'measured', label: 'Hanzo-measured' },
  { id: 'reported', label: 'Vendor-reported' },
]

function SourceBadge({ kind, source }: { kind: SourceKind; source: string }) {
  const measured = kind === 'measured'
  return (
    <span
      title={source}
      className={`inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[10px] font-medium ${
        measured ? 'bg-white/15 text-white' : 'bg-white/5 text-neutral-400'
      }`}
    >
      {measured ? 'Hanzo' : sourceShort(source)}
    </span>
  )
}

export default function BenchmarkBrowser({
  groups,
  defaultBench,
  highlightVendor = 'Hanzo',
  showPrice = true,
}: {
  groups: BenchGroup[]
  defaultBench?: string
  highlightVendor?: string
  showPrice?: boolean
}) {
  const [benchId, setBenchId] = useState(defaultBench ?? groups[0]?.id)
  const [filter, setFilter] = useState<Filter>('all')

  const group = groups.find((g) => g.id === benchId) ?? groups[0]
  const rows = group.rows.filter((r) => filter === 'all' || r.kind === filter)

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 md:p-6">
      {/* benchmark tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setBenchId(g.id)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              g.id === group.id
                ? 'border-white/40 bg-white/10 text-white'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* provenance filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
              f.id === filter
                ? 'bg-white text-black'
                : 'border border-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse font-mono text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-left">
              <th className="py-2 pr-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Model</th>
              <th className="py-2 pr-2 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-500">{group.label}</th>
              <th className="py-2 pr-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Source</th>
              {showPrice && <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-500">$/MTok out</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const hot = r.vendor === highlightVendor
              return (
                <tr key={r.model} className={`border-b border-neutral-900 ${hot ? 'bg-white/[0.03]' : ''}`}>
                  <td className={`py-2 pr-2 ${hot ? 'font-semibold text-white' : 'text-neutral-200'}`}>
                    {r.model}
                    {hot && <span className="ml-2 rounded bg-white/15 px-1.5 py-0.5 text-[10px] text-white">enso</span>}
                  </td>
                  <td className={`py-2 pr-2 text-right tabular-nums ${hot ? 'font-semibold text-white' : 'text-neutral-200'}`}>{fmtScore(r.value)}</td>
                  <td className="py-2 pr-2"><SourceBadge kind={r.kind} source={r.source} /></td>
                  {showPrice && <td className="py-2 text-right tabular-nums text-neutral-400">{fmtPrice(r.price)}</td>}
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={showPrice ? 4 : 3} className="py-6 text-center text-neutral-500">
                  No {filter === 'measured' ? 'Hanzo-measured' : 'vendor-reported'} scores for {group.label}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-neutral-500">
        Vendors report on their own harness; Hanzo measures everyone on one. Where both exist the gap is the
        harness talking — not the model getting better. Hover a source for its exact provenance.
      </p>
    </div>
  )
}
