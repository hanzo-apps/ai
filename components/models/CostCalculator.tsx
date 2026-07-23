'use client'

/**
 * Monthly-bill estimator: always calling a top model vs Enso routing the easy
 * majority to a cheap model and escalating only the hard fraction. Costs are
 * modeled from published upstream token prices for a typical short-answer
 * request — the caller's mix sets the exact number, so this is illustrative.
 */
import { useState } from 'react'

// Retail per-request cost at ~1K-in/1K-out. Every Enso tier is priced at or below the
// top model, so Enso is cheaper at ANY hard fraction — easy requests route to Flash,
// hard requests escalate to Ultra, and Ultra ($5/$25) still sits under GPT-5.6 ($5/$30).
const TOP_REQ = 0.035 // GPT-5.6 $5/$30 on every request
const FLASH_REQ = 0.006 // Enso Flash $2/$4 (easy requests)
const ULTRA_REQ = 0.030 // Enso Ultra $5/$25 (hard requests) — still < top

const money = (x: number) => `$${Math.round(x).toLocaleString()}`

export default function CostCalculator() {
  const [reqs, setReqs] = useState(1_000_000)
  const [hard, setHard] = useState(20)

  const hardFrac = hard / 100
  const top = reqs * TOP_REQ
  const enso = reqs * ((1 - hardFrac) * FLASH_REQ + hardFrac * ULTRA_REQ)
  const savePct = top > 0 ? Math.round((1 - enso / top) * 100) : 0

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 md:p-8">
      <div className="space-y-5">
        <label className="block">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-300">Requests / month</span>
            <span className="font-mono text-white tabular-nums">{reqs.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={10_000}
            max={10_000_000}
            step={10_000}
            value={reqs}
            onChange={(e) => setReqs(Number(e.target.value))}
            className="w-full accent-white"
            aria-label="Requests per month"
          />
        </label>
        <label className="block">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-300">Hard fraction (needs escalation)</span>
            <span className="font-mono text-white tabular-nums">{hard}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={hard}
            onChange={(e) => setHard(Number(e.target.value))}
            className="w-full accent-white"
            aria-label="Hard fraction needing escalation"
          />
        </label>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-black/40 p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">Always top model</div>
          <div className="mt-1 font-mono text-2xl font-semibold tabular-nums text-neutral-300">{money(top)}<span className="text-sm text-neutral-600">/mo</span></div>
        </div>
        <div className="rounded-xl border border-white/25 bg-white/[0.04] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">Enso (routed + adaptive)</div>
          <div className="mt-1 font-mono text-2xl font-semibold tabular-nums text-white">{money(enso)}<span className="text-sm text-neutral-600">/mo</span></div>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-black/40 p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">You save</div>
          <div className="mt-1 font-mono text-2xl font-semibold tabular-nums text-white">{savePct}%</div>
          <div className="font-mono text-xs text-neutral-500">{money(top - enso)}/mo</div>
        </div>
      </div>

      <p className="mt-5 border-l-2 border-neutral-700 pl-3 text-xs leading-relaxed text-neutral-500">
        Model: a top model bills the premium rate on every request; Enso serves the easy majority cheaply
        (~$0.002/req) and only the hard fraction costs more (~$0.43/req). Illustrative at
        published token prices for a typical short-answer request — your mix sets the exact number.
      </p>
    </div>
  )
}
