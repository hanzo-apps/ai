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

// Every vendor in the snapshot gets a mark, and the mark is the vendor's own
// colour. `file` is a generated colour variant under /logos/color/ — the canonical
// monochrome files are fill="currentColor", and currentColor inside <image href>
// resolves against the IMAGE's document, not this one, so the chart could never
// tint them. That is why some dots read as grey smudges and others as nothing.
//
// A vendor with no logo asset gets its initial in its own colour rather than an
// anonymous grey dot, so the chart is consistent whether or not we have the mark.
// The five without files (NVIDIA, Meta, Zhipu, Xiaomi, MiniMax) are pending
// assets from hanzoai/icons; drop the file in and the monogram gives way to it.
type Mark = { file?: string; color: string; initial: string }
const VENDOR: Record<string, Mark> = {
  OpenAI:    { file: 'openai',    color: '#000000', initial: 'O' },
  Anthropic: { file: 'anthropic', color: '#D4A27F', initial: 'A' },
  Google:    { file: 'gemini',    color: '#4285F4', initial: 'G' },
  DeepSeek:  { file: 'deepseek',  color: '#4D6BFE', initial: 'D' },
  Moonshot:  { file: 'moonshot',  color: '#16191E', initial: 'K' },
  Alibaba:   { file: 'qwen',      color: '#615CED', initial: 'Q' },
  xAI:       { file: 'xai',       color: '#000000', initial: 'X' },
  Mistral:   { file: 'mistral',   color: '#FA520F', initial: 'M' },
  NVIDIA:    { color: '#76B900', initial: 'N' },
  Meta:      { color: '#0064E0', initial: 'M' },
  Zhipu:     { color: '#3859FF', initial: 'Z' },
  Xiaomi:    { color: '#FF6900', initial: 'M' },
  MiniMax:   { color: '#F23F5D', initial: 'M' },
  Other:     { color: '#6B7280', initial: '·' },
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
  text: string
}

// Everything a label can run into is a BOX, and there is ONE rule for all of them.
// Splitting the problem is what produced two defects in a row here: labels were
// de-collided against other LABELS, per side, by a fixed gap — so qwen3.5's label
// cleared kimi-k2.6's label by exactly that gap and ran straight through kimi's
// DOT; and when the dots were then handled by a second, separate pass, a
// right-anchored label met a left-anchored one, a pair that belonged to neither
// pass. Both are the same bug: an obstacle nobody was comparing against.
//
// So the obstacles are ONE list — every other disc, plus every label already
// placed — tested by one rectangle overlap. Labels settle top-to-bottom and only
// the label being placed moves, so everything above it is final: the pass
// terminates by construction, with no two labels each dodging the other forever.
//
// The extents are the ones the renderer actually produces. Text hangs above its
// own baseline, which is why "keep centres 12 apart" reads as sufficient and is
// not: 12 below a dot centre still puts the caps inside a radius-8 disc.
const AIR = 1.5 // daylight — separating to exactly tangent still reads as touching
const BASE_DY = 3 // the renderer draws the baseline at labelY - 3

interface Box { x0: number; x1: number; y0: number; y1: number }

// Metrics follow the size each point is actually drawn at — the Enso tiers are
// bold 12 on a wider disc, so measuring them at the 10.5 of everything else would
// under-report exactly the labels that matter most.
function metrics(p: Placed) {
  return p.highlight
    ? { r: 9.5, char: 7.2, rise: 8.6, drop: 2.9 }
    : { r: 8, char: 6.3, rise: 7.5, drop: 2.5 }
}

function labelBox(p: Placed): Box {
  const m = metrics(p)
  const w = p.text.length * m.char
  const base = p.labelY - BASE_DY
  const x0 = p.right ? p.cx + 13 : p.cx - 13 - w
  return { x0, x1: x0 + w, y0: base - m.rise, y1: base + m.drop }
}

function discBox(p: Placed): Box {
  const { r } = metrics(p)
  return { x0: p.cx - r, x1: p.cx + r, y0: p.cy - r, y1: p.cy + r }
}

const overlaps = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1

function settle(pts: Placed[]): void {
  const order = [...pts].sort((a, b) => a.cy - b.cy)
  const bot = H - PAD.b - 2
  for (let i = 0; i < order.length; i++) {
    const p = order[i]
    const m = metrics(p)
    const fixed = [...pts.filter((d) => d !== p).map(discBox), ...order.slice(0, i).map(labelBox)]
    for (let guard = 0; guard < 12; guard++) {
      const hit = fixed.find((o) => overlaps(labelBox(p), o))
      if (!hit) break
      const below = hit.y1 + m.rise + AIR
      p.labelY = BASE_DY + (below <= bot ? below : hit.y0 - m.drop - AIR)
    }
  }
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
    return { ...pt, cx, cy: yOf(pt.gpqa), right: cx < W * 0.6, labelY: yOf(pt.gpqa), text: `${pt.label} ${pt.gpqa}%` }
  })
  // Enso ladder: cheapest tier labels left, priciest labels right, so tiers never self-collide.
  const hi = placed.filter((p) => p.highlight)
  if (hi.length) { const maxP = Math.max(...hi.map((p) => p.price)); hi.forEach((p) => { p.right = p.price >= maxP }) }
  spread(placed) // distributes them evenly; settle is what guarantees they clear
  settle(placed)

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
        const mark = pt.vendor ? VENDOR[pt.vendor] : undefined
        const labelX = pt.right ? pt.cx + 13 : pt.cx - 13
        const nudged = Math.abs(pt.labelY - pt.cy) > 6
        return (
          <g key={pt.label}>
            <title>{`${pt.label} — ${pt.gpqa}% GPQA-Diamond · $${pt.price}/MTok${pt.kind === 'reported' ? ' (vendor-reported)' : ''}`}</title>
            {nudged && <line x1={pt.cx} y1={pt.cy} x2={labelX + (pt.right ? -2 : 2)} y2={pt.labelY - 3} stroke="rgba(255,255,255,0.14)" strokeWidth={1} />}
            {pt.highlight && <circle cx={pt.cx} cy={pt.cy} r={13} fill="rgba(255,255,255,0.16)" />}
            {/* The disc is ALWAYS light behind a mark. It used to be #20242e for
                vendor-reported rows, which swallowed every dark logo — OpenAI and
                Moonshot are near-black — so provenance now rides the RING alone
                and the disc's one job is contrast for the mark.
                A ring carrying that on its own has to be seen: at r=8 a 1px grey
                dash against a 1px white one is a difference you can measure and
                not one you can read, so measured gets a bright 2px halo and
                reported a broken edge with real gaps. */}
            <circle cx={pt.cx} cy={pt.cy} r={pt.highlight ? 9 : 8}
              fill={pt.highlight ? '#ffffff' : '#f2f3f5'}
              stroke={pt.highlight || pt.kind === 'measured' ? '#ffffff' : '#98a2b3'}
              strokeWidth={pt.highlight || pt.kind === 'measured' ? 2 : 1.5}
              strokeDasharray={!pt.highlight && pt.kind === 'reported' ? '2.5 2.2' : undefined} />
            {!pt.highlight && (mark?.file
              ? <image href={`/logos/color/${mark.file}.svg`} x={pt.cx - 5.5} y={pt.cy - 5.5} width={11} height={11} preserveAspectRatio="xMidYMid meet" />
              : <text x={pt.cx} y={pt.cy + 3.4} textAnchor="middle" fontSize={9} fontWeight={700}
                  fontFamily="ui-monospace, monospace" fill={mark?.color ?? '#6B7280'}>{mark?.initial ?? '·'}</text>)}
            <text x={labelX} y={pt.labelY - 3} textAnchor={pt.right ? 'start' : 'end'}
              fontSize={pt.highlight ? 12 : 10.5} fontFamily="ui-monospace, monospace"
              className={pt.highlight ? 'fill-white' : 'fill-neutral-400'} fontWeight={pt.highlight ? 700 : 400}>
              {pt.text}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
