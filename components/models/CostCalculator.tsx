'use client'

/**
 * Monthly-bill estimator: always calling a top model vs Enso routing the easy
 * majority to a cheap model and escalating only the hard fraction. Costs are
 * modeled at the one reference request (1K in / 1K out) from our billed tier
 * rates and the top model's published rate — the caller's mix sets the exact
 * number, so this is illustrative.
 */
import { useState } from 'react'
import { HARD_FRACTION, TOP_RATE, ensoSavings, ensoTier, fmtReqCost, reqCost } from '@/lib/leaderboard'
import { Box } from '@hanzo/ui'

// Per-request cost at the one reference mix (1K in / 1K out), derived from the billed
// tier rates. Every Enso tier is priced at or below the top model, so Enso is cheaper at
// ANY hard fraction — easy requests route to Flash, hard requests escalate to Ultra, and
// Ultra ($5/$25) still sits under GPT-5.6 ($5/$30).
const TOP_REQ = reqCost(TOP_RATE) // $0.035 on every request
const FLASH_REQ = reqCost(ensoTier('enso-flash')) // easy requests
const ULTRA_REQ = reqCost(ensoTier('enso-ultra')) // hard requests — still < top

const money = (x: number) => `$${Math.round(x).toLocaleString()}`

export default function CostCalculator() {
  const [reqs, setReqs] = useState(1_000_000)
  const [hard, setHard] = useState(HARD_FRACTION * 100)

  const hardFrac = hard / 100
  const top = reqs * TOP_REQ
  const enso = reqs * ((1 - hardFrac) * FLASH_REQ + hardFrac * ULTRA_REQ)
  const savePct = Math.round(ensoSavings(hardFrac) * 100)

  return (
    <Box className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 md:p-8">
      <div className="space-y-5">
        <label className="block">
          <Box className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-300">Requests / month</span>
            <span className="font-mono text-white tabular-nums">{reqs.toLocaleString()}</span>
          </Box>
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
          <Box className="mb-2 flex items-center justify-between text-sm">
            <span className="text-neutral-300">Hard fraction (needs escalation)</span>
            <span className="font-mono text-white tabular-nums">{hard}%</span>
          </Box>
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

      <Box className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Box className="rounded-xl border border-neutral-800 bg-black/40 p-4">
          <Box className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">Always top model</Box>
          <Box className="mt-1 font-mono text-2xl font-semibold tabular-nums text-neutral-300">{money(top)}<span className="text-sm text-neutral-600">/mo</span></Box>
        </Box>
        <Box className="rounded-xl border border-white/25 bg-white/[0.04] p-4">
          <Box className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">Enso (routed + adaptive)</Box>
          <Box className="mt-1 font-mono text-2xl font-semibold tabular-nums text-white">{money(enso)}<span className="text-sm text-neutral-600">/mo</span></Box>
        </Box>
        <Box className="rounded-xl border border-neutral-800 bg-black/40 p-4">
          <Box className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">You save</Box>
          <Box className="mt-1 font-mono text-2xl font-semibold tabular-nums text-white">{savePct}%</Box>
          <Box className="font-mono text-xs text-neutral-500">{money(top - enso)}/mo</Box>
        </Box>
      </Box>

      <p className="mt-5 border-l-2 border-neutral-700 pl-3 text-xs leading-relaxed text-neutral-500">
        Model: a top model bills the premium rate on every request ({fmtReqCost(TOP_REQ)}/req); Enso serves the
        easy majority on Flash ({fmtReqCost(FLASH_REQ)}/req) and only the hard fraction escalates to Ultra
        ({fmtReqCost(ULTRA_REQ)}/req). Billed token rates at a 1K-in/1K-out request — your mix sets the exact number.
      </p>
    </Box>
  )
}
