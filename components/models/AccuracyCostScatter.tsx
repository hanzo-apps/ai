/**
 * Accuracy-at-cost scatter — GPQA-Diamond vs published output $/MTok, log price axis.
 *
 * Pure presentational SVG (no client hooks) so both the server model pages and the
 * client Enso landing render it. Every model is a provider-logo chip on a disc with an
 * always-on name label; labels are de-collided vertically per side (with a leader line
 * when nudged) so nothing overlaps. The three Enso tiers render highlighted/bold as a
 * clean price/quality ladder. Accuracy axis spans to 100 so top-tier points aren't clipped.
 */
export interface ScatterPoint {
  label: string
  gpqa: number
  price: number
  kind: 'measured' | 'reported'
  vendor?: string
  highlight?: boolean
}

const W = 720
const H = 420
const PAD = { l: 44, r: 24, t: 30, b: 44 }
const PRICE_MIN = 0.3
const PRICE_MAX = 160
const ACC_MIN = 74
const ACC_MAX = 100
const LABEL_GAP = 14

const LOGO: Record<string, string> = {
  OpenAI: 'openai', Anthropic: 'anthropic', Google: 'gemini', DeepSeek: 'deepseek',
  Moonshot: 'moonshot', Alibaba: 'qwen', xAI: 'xai', Mistral: 'mistral',
}

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
const ACC_TICKS = [76, 80, 84, 88, 92, 96, 100]

interface Placed extends ScatterPoint {
  cx: number
  cy: number
  right: boolean
  labelY: number
}

// spread de-collides labels: group by side, sort by dot y, push each down to clear the
// previous by LABEL_GAP, then pull any bottom overflow back up so all stay in the box.
function spread(pts: Placed[]): void {
  for (const right of [true, false]) {
    const side = pts.filter((p) => p.right === right).sort((a, b) => a.cy - b.cy)
    for (let i = 1; i < side.length; i++) {
      if (side[i].labelY - side[i - 1].labelY < LABEL_GAP) side[i].labelY = side[i - 1].labelY + LABEL_GAP
    }
    const bot = H - PAD.b - 2
    for (let i = side.length - 1; i > 0; i--) {
      if (side[i].labelY > bot) side[i].labelY = bot - (side.length - 1 - i) * LABEL_GAP
      if (side[i].labelY < side[i - 1].labelY + LABEL_GAP) side[i - 1].labelY = side[i].labelY - LABEL_GAP
    }
  }
}

export default function AccuracyCostScatter({ points }: { points: ScatterPoint[] }) {
  const placed: Placed[] = points.map((pt) => {
    const cx = xOf(pt.price)
    return { ...pt, cx, cy: yOf(pt.gpqa), right: cx < W * 0.6, labelY: yOf(pt.gpqa) }
  })
  // Enso ladder: cheapest tier labels left, priciest labels right, so tiers never self-collide.
  const hi = placed.filter((p) => p.highlight)
  if (hi.length) { const maxP = Math.max(...hi.map((p) => p.price)); hi.forEach((p) => { p.right = p.price >= maxP }) }
  spread(placed)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
      aria-label="Accuracy versus output price; every model labelled, Enso tiers highlighted.">
      {ACC_TICKS.map((a) => (
        <g key={`a${a}`}>
          <line x1={PAD.l} x2={W - PAD.r} y1={yOf(a)} y2={yOf(a)} stroke="rgba(255,255,255,0.06)" />
          <text x={PAD.l - 8} y={yOf(a) + 3} textAnchor="end" className="fill-neutral-600" fontSize="11" fontFamily="ui-monospace, monospace">{a}</text>
        </g>
      ))}
      {PRICE_TICKS.map((p) => (
        <text key={`p${p}`} x={xOf(p)} y={H - PAD.b + 16} textAnchor="middle" className="fill-neutral-600" fontSize="11" fontFamily="ui-monospace, monospace">${p}</text>
      ))}
      <text x={PAD.l - 8} y={PAD.t - 14} textAnchor="start" className="fill-neutral-500" fontSize="11" fontFamily="ui-monospace, monospace">GPQA %</text>
      <text x={W - PAD.r} y={H - 6} textAnchor="end" className="fill-neutral-500" fontSize="11" fontFamily="ui-monospace, monospace">cheap ← output $/MTok → expensive</text>

      {/* every model: logo chip + always-on de-collided name label. Non-Enso first so Enso draws on top. */}
      {[...placed].sort((a, b) => Number(!!a.highlight) - Number(!!b.highlight)).map((pt) => {
        const logo = pt.vendor ? LOGO[pt.vendor] : undefined
        const labelX = pt.right ? pt.cx + 13 : pt.cx - 13
        const nudged = Math.abs(pt.labelY - pt.cy) > 6
        return (
          <g key={pt.label}>
            <title>{`${pt.label} — ${pt.gpqa}% GPQA-Diamond · $${pt.price}/MTok${pt.kind === 'reported' ? ' (vendor-reported)' : ''}`}</title>
            {nudged && <line x1={pt.cx} y1={pt.cy} x2={labelX + (pt.right ? -2 : 2)} y2={pt.labelY - 3} stroke="rgba(255,255,255,0.14)" strokeWidth={1} />}
            {pt.highlight && <circle cx={pt.cx} cy={pt.cy} r={13} fill="rgba(255,255,255,0.16)" />}
            <circle cx={pt.cx} cy={pt.cy} r={pt.highlight ? 9 : 8}
              fill={pt.highlight ? '#ffffff' : pt.kind === 'measured' ? '#e8e8e8' : '#20242e'}
              stroke={pt.highlight ? '#ffffff' : pt.kind === 'measured' ? '#ffffff' : '#4a5163'} strokeWidth={pt.highlight ? 2 : 1} />
            {!pt.highlight && (logo
              ? <image href={`/logos/${logo}.svg`} x={pt.cx - 5.5} y={pt.cy - 5.5} width={11} height={11} preserveAspectRatio="xMidYMid meet" />
              : <circle cx={pt.cx} cy={pt.cy} r={2.5} fill={pt.kind === 'measured' ? '#111' : '#8a8a8a'} />)}
            <text x={labelX} y={pt.labelY - 3} textAnchor={pt.right ? 'start' : 'end'}
              fontSize={pt.highlight ? 12 : 10.5} fontFamily="ui-monospace, monospace"
              className={pt.highlight ? 'fill-white' : 'fill-neutral-400'} fontWeight={pt.highlight ? 700 : 400}>
              {pt.label} {pt.gpqa}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}
