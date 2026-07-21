/**
 * Accuracy-at-cost scatter — GPQA-Diamond vs published output $/MTok, log price axis.
 *
 * Pure presentational SVG (no client hooks) so both the server model pages and the
 * client Enso landing can render it. Points are real leaderboard values; measured
 * (Hanzo, one harness) render solid, vendor-reported render hollow — the honest
 * distinction. Top-left is the goal: high accuracy, low cost.
 */
export interface ScatterPoint {
  label: string
  gpqa: number
  price: number
  kind: 'measured' | 'reported'
  highlight?: boolean
}

const W = 720
const H = 380
const PAD = { l: 44, r: 24, t: 28, b: 44 }
const PRICE_MIN = 0.3
const PRICE_MAX = 160
const ACC_MIN = 74
const ACC_MAX = 96

function xOf(price: number): number {
  const lo = Math.log(PRICE_MIN)
  const hi = Math.log(PRICE_MAX)
  const t = (Math.log(Math.min(Math.max(price, PRICE_MIN), PRICE_MAX)) - lo) / (hi - lo)
  return PAD.l + t * (W - PAD.l - PAD.r)
}

function yOf(acc: number): number {
  const t = (Math.min(Math.max(acc, ACC_MIN), ACC_MAX) - ACC_MIN) / (ACC_MAX - ACC_MIN)
  return H - PAD.b - t * (H - PAD.t - PAD.b)
}

const PRICE_TICKS = [0.5, 2, 8, 30, 120]
const ACC_TICKS = [76, 80, 84, 88, 92, 96]

export default function AccuracyCostScatter({ points }: { points: ScatterPoint[] }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Accuracy versus output price. Enso tiers highlighted."
    >
      {/* gridlines + axes */}
      {ACC_TICKS.map((a) => (
        <g key={`a${a}`}>
          <line x1={PAD.l} x2={W - PAD.r} y1={yOf(a)} y2={yOf(a)} stroke="rgba(255,255,255,0.06)" />
          <text x={PAD.l - 8} y={yOf(a) + 3} textAnchor="end" className="fill-neutral-600" fontSize="11" fontFamily="ui-monospace, monospace">
            {a}
          </text>
        </g>
      ))}
      {PRICE_TICKS.map((p) => (
        <text key={`p${p}`} x={xOf(p)} y={H - PAD.b + 16} textAnchor="middle" className="fill-neutral-600" fontSize="11" fontFamily="ui-monospace, monospace">
          ${p}
        </text>
      ))}
      <text x={PAD.l - 8} y={PAD.t - 12} textAnchor="start" className="fill-neutral-500" fontSize="11" fontFamily="ui-monospace, monospace">
        GPQA %
      </text>
      <text x={W - PAD.r} y={H - 6} textAnchor="end" className="fill-neutral-500" fontSize="11" fontFamily="ui-monospace, monospace">
        cheap ← output $/MTok → expensive
      </text>

      {/* points */}
      {points.map((pt) => {
        const cx = xOf(pt.price)
        const cy = yOf(pt.gpqa)
        const labelRight = cx < W - 150
        return (
          <g key={pt.label}>
            {pt.highlight && <circle cx={cx} cy={cy} r={10} fill="rgba(255,255,255,0.14)" />}
            <circle
              cx={cx}
              cy={cy}
              r={pt.highlight ? 6 : 5}
              fill={pt.kind === 'measured' ? '#ffffff' : 'transparent'}
              stroke={pt.highlight ? '#ffffff' : pt.kind === 'measured' ? '#ffffff' : '#8a8a8a'}
              strokeWidth={pt.highlight ? 2 : 1.5}
            />
            <text
              x={labelRight ? cx + 11 : cx - 11}
              y={cy + 3}
              textAnchor={labelRight ? 'start' : 'end'}
              fontSize="11.5"
              fontFamily="ui-monospace, monospace"
              className={pt.highlight ? 'fill-white' : 'fill-neutral-400'}
              fontWeight={pt.highlight ? 600 : 400}
            >
              {pt.label} {pt.gpqa}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}
