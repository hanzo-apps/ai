/**
 * Accuracy-at-cost scatter — GPQA-Diamond vs published output $/MTok, log price axis.
 *
 * Pure presentational SVG (no client hooks) so both the server model pages and the
 * client Enso landing render it. Every model is a mark on a disc with an always-on
 * name label. Accuracy axis spans to 100 so top-tier points aren't clipped.
 *
 * EVERY point carries a mark, ours included. The mark branch used to be guarded on
 * NOT being highlighted, so the three Enso tiers — the only reason this chart is on
 * the page — were the one thing on it drawn as a blank white disc while every
 * competitor wore a logo. Ours is the HANZO H — `MARK_PATHS` from `@hanzo/logo`,
 * the same glyph the header wears — not the ensō ring.
 *
 * The ring is the mark of the enso PRODUCT; the H is the mark of the COMPANY that
 * makes it. Every other point here is a lab's company mark (OpenAI's, Anthropic's,
 * Google's), so a product mark in that row answers a different question than the
 * row is asking and reads as a fourth vendor nobody recognises. Ours is the only
 * one a visitor is guaranteed to have just seen, at the top of this very page.
 * Its ink is the house black: the house mark is monochrome, which is not an
 * exception to "each lab in its own colour" — it IS ours.
 *
 * TWO GEOMETRIES, ONE LAYOUT. SVG text scales with its viewBox, so the 720-unit
 * plot squeezed into a phone's 324px card drew its labels at 4.7 CSS px — measured,
 * not estimated. A phone gets the portrait plot instead, where the same code draws
 * the same chart at ~1.0 scale. This is art direction in the sense `<picture>`
 * means it, NOT a second chart: `settle()` below is the only placement code in the
 * file and both geometries call it. `.hz-scatter-*` shows exactly one, so only one
 * is ever painted or in the accessibility tree.
 *
 * NOTHING here is a bare design value. Type, colour and the mono face come from
 * `@hanzo/design`; the plot extents have no token set to come from and are the two
 * exported `Geom`s below, which are the one place to edit them.
 */
import { colors, fonts, typography } from '@hanzo/design'
import { MARK_PATHS, MARK_VIEWBOX } from '@hanzo/logo/logos'

export interface ScatterPoint {
  label: string
  gpqa: number
  price: number
  kind: 'measured' | 'reported'
  vendor?: string
  highlight?: boolean
}

/**
 * A rem token as an SVG user unit, against the 16px root this site does not move.
 *
 * Worth stating rather than hiding: a viewBox has no rem, so unlike page text this
 * plot does NOT follow a browser text-size preference. Making it do so means laying
 * the plot out in CSS instead of in a viewBox, which is a different component.
 */
const unit = (rem: string) => parseFloat(rem) * 16

/** Ink. One name per role, every value a @hanzo/design token. */
const INK = {
  label: colors['neutral-400'],
  axis: colors['neutral-600'],
  caption: colors['neutral-500'],
  disc: colors['neutral-100'],
  discOurs: colors['pure-white'],
  ring: colors['neutral-400'],
  house: colors['hanzo-black'],
}

/**
 * The three translucent whites — gridline, leader, halo — have no token, because
 * @hanzo/design carries opaque ramps and no overlay scale. They want an
 * `overlay-{faint,quiet,soft}` set alongside `colors`; until that exists they are
 * named here rather than spelt out at four call sites.
 */
const VEIL = { grid: 'rgba(255,255,255,0.06)', leader: 'rgba(255,255,255,0.14)', halo: 'rgba(255,255,255,0.16)' }

/**
 * The mono face, through the same custom property the rest of the site reads.
 *
 * Not cosmetic. `ui-monospace` resolves to SF Mono here and to whatever a Linux CI
 * image ships there, so the advance ratio the label widths are computed from was a
 * property of the machine. Bound to `--font-mono` it is Geist Mono everywhere, and
 * ADVANCE below is then a measured constant rather than an assumption.
 */
const MONO = 'var(--font-mono)'

/**
 * Geist Mono's own metrics, measured in the browser against the shipped face
 * rather than estimated: advance 0.5997em, and a rendered box 1.257em tall.
 *
 * The height is the one that bites. A label's box is what a reader sees it
 * occupy, and the previous cap-height estimate (0.72 + 0.24 = 0.96em) modelled it
 * a quarter short — so labels the layout believed were clear overlapped on screen
 * by ~2.6 units. RISE and DROP sum to 1.4em, comfortably over the measured 1.257,
 * because being generous here costs air and being mean costs a collision.
 */
const ADVANCE = 0.6
const RISE = 1.05
const DROP = 0.35

const PRICE_MIN = 0.3
const PRICE_MAX = 160
const ACC_MIN = 74
const ACC_MAX = 100

// Every vendor in the snapshot gets a mark, and the mark is the vendor's own
// colour. `file` is a generated colour variant under /logos/color/ — the canonical
// monochrome files are fill="currentColor", and currentColor inside <image href>
// resolves against the IMAGE's document, not this one, so the chart could never
// tint them. That is why some dots read as grey smudges and others as nothing.
//
// These hexes are a lab's BRAND, not our design system, so they are data and stay
// data — no Hanzo token will ever own Anthropic's orange.
//
// A vendor with no logo asset gets its initial in its own colour rather than an
// anonymous grey dot, so the chart is consistent whether or not we have the mark.
// Every vendor plotted here now carries a real mark; the initial is the fallback
// for a vendor genuinely absent from hanzoai/icons — drop its file in and the
// monogram gives way to it.
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
  NVIDIA:    { file: 'nvidia',    color: '#76B900', initial: 'N' },
  Meta:      { file: 'meta',      color: '#0064E0', initial: 'M' },
  Zhipu:     { file: 'zhipu',     color: '#3859FF', initial: 'Z' },
  Xiaomi:    { file: 'xiaomi',    color: '#FF6900', initial: 'M' },
  MiniMax:   { file: 'minimax',   color: '#F23F5D', initial: 'M' },
  Other:     { color: '#6B7280', initial: '·' },
}

export interface Geom {
  key: string
  /** Plot extents, in user units. */
  w: number
  h: number
  pad: { l: number; r: number; t: number; b: number }
  /** Type sizes, from @hanzo/design. */
  type: { label: number; ours: number; axis: number }
  /** Radii: the vendor disc, our disc, our halo (the outer DRAWN edge), the mark. */
  disc: { r: number; ours: number; halo: number; mark: number }
  priceTicks: number[]
  accTicks: number[]
}

/**
 * The two plots.
 *
 * There is no chart-geometry token set — @hanzo/design covers type, colour, space
 * and breakpoints, not plot extents — so this is the one editable home for them.
 * What it wants is a `chart-*` ramp alongside `spacing`; until that lands, edit
 * here and nowhere else. Type and radii are already token-derived.
 *
 * The portrait width is chosen against a MEASURED constraint, not to taste: the
 * card is the viewport less the page and card padding (324px at a 390px phone,
 * ~296px at 360px), and `w: 320` is the widest viewBox that still renders the
 * label token above 10 CSS px on the narrowest phone the site targets. 10px is not
 * arbitrary either — it is the smallest type the rest of this page already uses.
 */
export const WIDE: Geom = {
  key: 'wide',
  w: 720, h: 430, pad: { l: 44, r: 24, t: 30, b: 44 },
  type: { label: unit(typography['text-xs']), ours: unit(typography['text-sm']), axis: unit(typography['text-xs']) },
  disc: { r: 8, ours: 9, halo: 13, mark: 11 },
  priceTicks: [0.5, 2, 8, 30, 120],
  accTicks: [76, 80, 84, 88, 92, 96, 100],
}

/**
 * Portrait sets our own tier labels at the SAME size as everyone else's, where the
 * landscape plot sets them a step larger. Not a compromise on emphasis — they stay
 * bold and white, which is what actually separates them — but a consequence of the
 * width: at `text-sm`, "enso-flash 92.9%" is 125 units of a 282-unit plot, so it
 * cannot sit left of its dot at all, and the only seat left for it was seven lines
 * below the point it names. A hero point pushed halfway down the chart behind a
 * leader is a worse loss than one type step.
 */
export const PHONE: Geom = {
  key: 'phone',
  w: 320, h: 580, pad: { l: 28, r: 10, t: 26, b: 38 },
  type: { label: unit(typography['text-xs']), ours: unit(typography['text-xs']), axis: unit(typography['text-xs']) },
  disc: { r: 7, ours: 8, halo: 11, mark: 9.5 },
  priceTicks: [0.5, 8, 120],
  accTicks: [76, 82, 88, 94, 100],
}

interface Placed extends ScatterPoint {
  cx: number
  cy: number
  right: boolean
  labelY: number
  text: string
}

interface Box { x0: number; x1: number; y0: number; y1: number }

/** Daylight — separating to exactly tangent still reads as touching. */
const AIR = 1.5

function xOf(price: number, g: Geom): number {
  const lo = Math.log(PRICE_MIN)
  const t = (Math.log(Math.min(Math.max(price, PRICE_MIN), PRICE_MAX)) - lo) / (Math.log(PRICE_MAX) - lo)
  return g.pad.l + t * (g.w - g.pad.l - g.pad.r)
}

function yOf(acc: number, g: Geom): number {
  const t = (Math.min(Math.max(acc, ACC_MIN), ACC_MAX) - ACC_MIN) / (ACC_MAX - ACC_MIN)
  return g.h - g.pad.b - t * (g.h - g.pad.t - g.pad.b)
}

/**
 * What a point is actually drawn at.
 *
 * `edge` is the DRAWN outer radius, which for our tiers is the halo and not the
 * disc — and measuring the disc is exactly how the Enso labels came to rest
 * tangent to the halo they sit beside. Zero clearance is not a rounding question
 * you get to win: macOS rounded that contact under half a pixel and Linux rounded
 * it over, so the same build passed here and failed the gate in CI. The gap below
 * is derived from `edge`, so no label can be placed against an edge again.
 */
function metrics(p: Placed, g: Geom) {
  const size = p.highlight ? g.type.ours : g.type.label
  return {
    size,
    edge: p.highlight ? g.disc.halo : g.disc.r,
    char: size * ADVANCE,
    rise: size * RISE,
    drop: size * DROP,
  }
}

/** Clear air between a dot's drawn edge and the label beside it. */
const gapOf = (m: { edge: number }) => m.edge + AIR * 2

/** The label's extent, for a side and a baseline it has not been moved to yet. */
function labelBox(p: Placed, g: Geom, right = p.right, labelY = p.labelY): Box {
  const m = metrics(p, g)
  const w = p.text.length * m.char
  const x0 = right ? p.cx + gapOf(m) : p.cx - gapOf(m) - w
  return { x0, x1: x0 + w, y0: labelY - m.rise, y1: labelY + m.drop }
}

function discBox(p: Placed, g: Geom): Box {
  const { edge } = metrics(p, g)
  return { x0: p.cx - edge, x1: p.cx + edge, y0: p.cy - edge, y1: p.cy + edge }
}

const overlaps = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1

/**
 * Every label takes the free seat NEAREST its dot — down before up at equal
 * distance, and the far side of the dot only once the near side is exhausted.
 * One rule, no per-point offsets, and it terminates by construction.
 *
 * The predecessor moved a label just far enough to clear the FIRST obstacle it
 * found, then looked again, inside a 12-iteration guard. Clearing one obstacle can
 * land you on a second and clearing that one puts you back on the first, and when
 * the guard ran out the label was drawn wherever the last attempt left it. That is
 * why `qwen3.5-397b-a17b` still sat on `kimi-k2.6`'s disc and on `opus-4.8`'s label
 * after the pass claimed to be clean: a run that gave up looks exactly like a run
 * that succeeded. Scanning seats instead of chasing hits cannot give up.
 *
 * Every obstacle is in ONE list — the other discs AND the labels already placed —
 * tested by one rectangle overlap. Splitting that is what produced the defect
 * above; a pass that filters by side reproduces its own blind spot and reports clean.
 */
function settle(pts: Placed[], g: Geom): void {
  const order = [...pts].sort((a, b) => a.cy - b.cy)
  const top = g.pad.t - 8
  const bot = g.h - g.pad.b - 2
  for (let i = 0; i < order.length; i++) {
    const p = order[i]
    const m = metrics(p, g)
    const fixed = [
      ...pts.filter((d) => d !== p).map((d) => discBox(d, g)),
      ...order.slice(0, i).map((d) => labelBox(d, g)),
    ]
    const step = m.rise + m.drop + AIR // one line of this label's own type
    const fits = (right: boolean, y: number) => {
      const b = labelBox(p, g, right, y)
      return b.x0 >= g.pad.l - 8 && b.x1 <= g.w - g.pad.r + 8 && b.y0 >= top && b.y1 <= bot &&
        !fixed.some((o) => overlaps(b, o))
    }
    // Search to the ends of the plot, so exhausting it means the plot is genuinely
    // full rather than that the loop ran out of tries. A fixed cap is how the
    // predecessor came to draw labels on top of things, and a cap is invisible in
    // the output — the label just sits somewhere wrong and nothing says why.
    const reach = Math.ceil((bot - top) / step)
    for (let k = 0; k <= reach; k++) {
      const seat = (k === 0 ? [p.cy] : [p.cy + k * step, p.cy - k * step])
        .flatMap((y) => [{ right: p.right, y }, { right: !p.right, y }])
        .find((s) => fits(s.right, s.y))
      if (seat) { p.right = seat.right; p.labelY = seat.y; break }
    }
  }
}

function Plot({ points, g, className }: { points: ScatterPoint[]; g: Geom; className: string }) {
  // A label starts to the RIGHT of its dot and starts left only when it would run
  // off the plot — the side is a question about ROOM, asked of the label's own
  // width, and settle() answers the rest. What this replaces was a threshold on
  // the dot's x (`cx < W * 0.6`) plus a hand-written override putting the cheapest
  // Enso tier left and the priciest right: two rules, neither visible on screen,
  // which is what reads as labels sitting on whichever side they feel like.
  const placed: Placed[] = points.map((pt) => {
    const text = `${pt.label} ${pt.gpqa.toFixed(1)}%`
    const p: Placed = { ...pt, cx: xOf(pt.price, g), cy: yOf(pt.gpqa, g), right: true, labelY: yOf(pt.gpqa, g), text }
    const m = metrics(p, g)
    p.right = p.cx + gapOf(m) + text.length * m.char <= g.w - g.pad.r
    return p
  })
  settle(placed, g)

  return (
    <svg viewBox={`0 0 ${g.w} ${g.h}`} className={className} role="img"
      aria-label="Accuracy versus output price; every model labelled, Enso tiers highlighted.">
      {g.accTicks.map((a) => (
        <g key={`a${a}`}>
          <line x1={g.pad.l} x2={g.w - g.pad.r} y1={yOf(a, g)} y2={yOf(a, g)} stroke={VEIL.grid} />
          <text x={g.pad.l - 8} y={yOf(a, g) + 3} textAnchor="end" fill={INK.axis} fontSize={g.type.axis} fontFamily={MONO}>{a}</text>
        </g>
      ))}
      {g.priceTicks.map((p) => (
        <text key={`p${p}`} x={xOf(p, g)} y={g.h - g.pad.b + 16} textAnchor="middle" fill={INK.axis} fontSize={g.type.axis} fontFamily={MONO}>${p}</text>
      ))}
      <text x={g.pad.l - 8} y={g.pad.t - 14} textAnchor="start" fill={INK.caption} fontSize={g.type.axis} fontFamily={MONO}>GPQA %</text>
      <text x={g.w - g.pad.r} y={g.h - 6} textAnchor="end" fill={INK.caption} fontSize={g.type.axis} fontFamily={MONO}>cheap ← output $/MTok → expensive</text>

      {/* every model: mark on a disc + always-on de-collided name label. Non-Enso first so Enso draws on top. */}
      {[...placed].sort((a, b) => Number(!!a.highlight) - Number(!!b.highlight)).map((pt) => {
        const mark = pt.vendor ? VENDOR[pt.vendor] : undefined
        const m = metrics(pt, g)
        const labelX = pt.right ? pt.cx + gapOf(m) : pt.cx - gapOf(m)
        const nudged = Math.abs(pt.labelY - pt.cy) > 6
        const half = g.disc.mark / 2
        const mid = pt.labelY - m.size * 0.3
        return (
          <g key={pt.label}>
            <title>{`${pt.label} — ${pt.gpqa.toFixed(1)}% GPQA-Diamond · $${pt.price}/MTok${pt.kind === 'reported' ? ' (vendor-reported)' : ''}`}</title>
            {/* An elbow, in two axis-aligned runs. The leader used to be a single
                diagonal ending ON the text, and at gpt-5.6-sol it landed hard against
                "92.9%" — read at size, that is a slash someone typed after the number.
                A horizontal rule into a label cannot be mistaken for a glyph. */}
            {nudged && (
              <polyline fill="none" stroke={VEIL.leader} strokeWidth={1}
                points={`${pt.cx},${pt.cy + (pt.labelY > pt.cy ? m.edge : -m.edge)} ${pt.cx},${mid} ${pt.right ? labelX - 3 : labelX + 3},${mid}`} />
            )}
            {pt.highlight && <circle cx={pt.cx} cy={pt.cy} r={g.disc.halo} fill={VEIL.halo} />}
            {/* The disc is ALWAYS light behind a mark. It used to be dark for
                vendor-reported rows, which swallowed every dark logo — OpenAI and
                Moonshot are near-black — so provenance now rides the RING alone
                and the disc's one job is contrast for the mark.
                A ring carrying that on its own has to be seen: a 1px grey dash
                against a 1px white one is a difference you can measure and not one
                you can read, so measured gets a bright 2px halo and reported a
                broken edge with real gaps. */}
            <circle cx={pt.cx} cy={pt.cy} r={pt.highlight ? g.disc.ours : g.disc.r}
              fill={pt.highlight ? INK.discOurs : INK.disc}
              stroke={pt.highlight || pt.kind === 'measured' ? INK.discOurs : INK.ring}
              strokeWidth={pt.highlight || pt.kind === 'measured' ? 2 : 1.5}
              strokeDasharray={!pt.highlight && pt.kind === 'reported' ? '2.5 2.2' : undefined} />
            {pt.highlight
              ? <svg x={pt.cx - half} y={pt.cy - half} width={g.disc.mark} height={g.disc.mark}
                  viewBox={MARK_VIEWBOX}
                  fillRule="evenodd" fill={INK.house}
                  dangerouslySetInnerHTML={{ __html: MARK_PATHS }} />
              : mark?.file
                ? <image href={`/logos/color/${mark.file}.svg`} x={pt.cx - half} y={pt.cy - half}
                    width={g.disc.mark} height={g.disc.mark} preserveAspectRatio="xMidYMid meet" />
                : <text x={pt.cx} y={pt.cy} textAnchor="middle" dominantBaseline="central"
                    fontSize={g.disc.r * 1.15} fontWeight={700} fontFamily={MONO}
                    fill={mark?.color ?? VENDOR.Other.color}>{mark?.initial ?? VENDOR.Other.initial}</text>}
            <text x={labelX} y={pt.labelY} textAnchor={pt.right ? 'start' : 'end'}
              fontSize={m.size} fontFamily={MONO}
              fill={pt.highlight ? INK.discOurs : INK.label} fontWeight={pt.highlight ? 700 : 400}>
              {pt.text}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function AccuracyCostScatter({ points }: { points: ScatterPoint[] }) {
  return (
    <>
      <Plot points={points} g={PHONE} className="hz-scatter hz-scatter-phone" />
      <Plot points={points} g={WIDE} className="hz-scatter hz-scatter-wide" />
    </>
  )
}
