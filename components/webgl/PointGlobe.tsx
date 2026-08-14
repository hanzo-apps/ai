'use client'

import { useEffect, useRef } from 'react'
import { SPECTRUM } from '@/lib/spectrum'

/**
 * PointGlobe — the flagship WebGL hero motif: a sphere of white points on true
 * black, slowly auto-rotating, laced with a sparse nearest-neighbour mesh. A
 * handful of those points are AGENTS (brighter, larger), and between them run
 * live CONVERSATIONS: great-circle paths that arch off the surface, each
 * carrying a travelling pulse. Conversations are born and die continuously, so
 * the globe reads as a network that is talking rather than a decorated sphere.
 *
 * Colour is the whole point of the split. The chrome — ground points, mesh,
 * agents — is monochrome white; the CONVERSATIONS carry the spectrum
 * (blue → violet → pink → amber) at low alpha. Nothing else on the page is
 * coloured, so a lit path reads unambiguously as traffic.
 *
 * Strictly decorative (`aria-hidden`) and engineered for a static-export prod site:
 *   - Raw WebGL + inline GLSL — zero runtime deps, code-split into its own chunk via
 *     the caller's `next/dynamic({ ssr:false })`. Never runs at build/SSR.
 *   - No-WebGL  → the canvas hides itself; the caller's static gradient shows through.
 *   - prefers-reduced-motion → renders ONE still frame: no rotation, no travel.
 *     The conversations are seeded from a fixed sequence, so that frame is the
 *     same picture on every load.
 *   - Pauses when the tab is hidden or the canvas scrolls offscreen (IntersectionObserver).
 *   - DPR capped at 2; node/conversation budget scales down on small / coarse-pointer devices.
 *   - One shader program; every buffer is allocated once at mount. A conversation
 *     rewrites its own slice only when it respawns, and the per-frame upload is
 *     the pulse positions — three floats per live conversation.
 */

type Variant = 'hero' | 'ambient'

export interface PointGlobeProps {
  className?: string
  /** `hero` = bright centrepiece; `ambient` = quiet backdrop behind content. */
  variant?: Variant
  /** Simultaneous live conversations between agents. 0 leaves a silent globe. */
  conversations?: number
  /** Mouse parallax. Default true; forced off under reduced-motion. */
  interactive?: boolean
}

/* ------------------------------------------------------------------ palette */

const WHITE: readonly [number, number, number] = [1, 1, 1]

/* -------------------------------------------------------------- gl helpers -- */

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s)
    return null
  }
  return s
}

// uMode selects how a vertex's alpha is shaped along a strip, using aT (0..1):
//   0 — flat: points and mesh lines, which have no strip position.
//   1 — path: soft at both ends so a conversation fades in and out of its
//       endpoints instead of butting into them.
//   2 — pulse tail: bright at uHead, gone uSpread behind it, nothing ahead.
const VERT = `
attribute vec3 aPos;
attribute float aT;
uniform mat4 uMVP;
uniform float uTime;
uniform float uBreath;
uniform float uPointSize;
uniform float uCamDist;
uniform float uMode;
uniform float uHead;
uniform float uSpread;
varying float vFade;
varying float vShape;
void main() {
  float phase = dot(aPos, vec3(12.9898, 78.233, 37.719));
  float b = 1.0 + uBreath * sin(uTime * 0.6 + phase);
  vec4 clip = uMVP * vec4(aPos * b, 1.0);
  gl_Position = clip;
  gl_PointSize = uPointSize / max(clip.w, 0.1);
  // Front of the globe (smaller clip.w) is brightest; far side fades out. The
  // floor is high enough that the silhouette — which sits at camera distance,
  // halfway down this ramp — still holds a rim rather than dissolving.
  vFade = clamp((uCamDist + 1.35 - clip.w) / 2.2, 0.18, 1.0);
  float shape = 1.0;
  if (uMode > 1.5) shape = smoothstep(uHead - uSpread, uHead, aT) * step(aT, uHead);
  else if (uMode > 0.5) shape = pow(sin(aT * 3.14159265), 0.65);
  vShape = shape;
}`

const FRAG = `
precision mediump float;
uniform float uAlpha;
uniform float uIsPoint;
uniform vec3 uColor;
varying float vFade;
varying float vShape;
void main() {
  float a = uAlpha * vFade * vShape;
  if (uIsPoint > 0.5) {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;         // round points
    a *= smoothstep(0.25, 0.02, d); // soft edge
  }
  gl_FragColor = vec4(uColor, a);
}`

/* ------------------------------------------------------------ mat4 (col-major) */

function perspective(out: Float32Array, fovy: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovy / 2)
  const nf = 1 / (near - far)
  out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0
  out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0
  out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1
  out[12] = 0; out[13] = 0; out[14] = 2 * far * near * nf; out[15] = 0
}

function mul(out: Float32Array, a: Float32Array, b: Float32Array) {
  for (let i = 0; i < 4; i++) {
    const ai0 = a[i], ai1 = a[i + 4], ai2 = a[i + 8], ai3 = a[i + 12]
    out[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3]
    out[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7]
    out[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11]
    out[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15]
  }
}

function rotY(out: Float32Array, r: number) {
  const c = Math.cos(r), s = Math.sin(r)
  out[0] = c; out[1] = 0; out[2] = -s; out[3] = 0
  out[4] = 0; out[5] = 1; out[6] = 0; out[7] = 0
  out[8] = s; out[9] = 0; out[10] = c; out[11] = 0
  out[12] = 0; out[13] = 0; out[14] = 0; out[15] = 1
}

function rotX(out: Float32Array, r: number) {
  const c = Math.cos(r), s = Math.sin(r)
  out[0] = 1; out[1] = 0; out[2] = 0; out[3] = 0
  out[4] = 0; out[5] = c; out[6] = s; out[7] = 0
  out[8] = 0; out[9] = -s; out[10] = c; out[11] = 0
  out[12] = 0; out[13] = 0; out[14] = 0; out[15] = 1
}

/* ------------------------------------------------------------ geometry init - */

/** Deterministic PRNG, so the reduced-motion still frame is the same picture every load. */
function rand(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Fibonacci-sphere node positions (unit radius). */
function sphereNodes(n: number): Float32Array {
  const pos = new Float32Array(n * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const t = golden * i
    pos[i * 3] = Math.cos(t) * r
    pos[i * 3 + 1] = y
    pos[i * 3 + 2] = Math.sin(t) * r
  }
  return pos
}

/**
 * Agents: `count` ground nodes, drawn from the Fibonacci sequence at an even
 * stride so they stay spread over the whole sphere instead of clumping.
 * Returned as their own position array — they are drawn as points, not indices.
 */
function agentNodes(nodes: Float32Array, n: number, count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const stride = n / count
  for (let a = 0; a < count; a++) {
    const i = Math.min(n - 1, Math.round(a * stride + stride * 0.5))
    pos[a * 3] = nodes[i * 3]
    pos[a * 3 + 1] = nodes[i * 3 + 1]
    pos[a * 3 + 2] = nodes[i * 3 + 2]
  }
  return pos
}

/**
 * A live conversation: a great-circle path between two agents, arched off the
 * surface so it reads as traffic through the air rather than paint on the
 * sphere, plus the state that makes it born, travel and die.
 */
interface Conversation {
  a: number       // agent index
  b: number       // agent index
  om: number      // angle subtended by a and b
  sin: number     // sin(om), precomputed for the slerp
  hue: number     // index into SPECTRUM
  born: number    // seconds
  life: number    // seconds
}

// A conversation is drawn as a RUN OF POINTS, not a line strip. WebGL clamps
// `lineWidth` to one DEVICE pixel on every mainstream driver, which at DPR 2 is
// half a CSS pixel — a coloured arc drawn that way is invisible on black, and
// that is exactly how the previous globe's arcs disappeared. Points carry a
// size we control, blur softly at the edges, and read as traffic besides.
const SEG = 68          // points per conversation path
const RADIUS = 1.025    // path sits just off the surface
const ARCH = 0.09       // how far it bows outward at the midpoint

/** Point at `t` along a conversation, written into `out` at `o`. */
function walk(c: Conversation, agents: Float32Array, t: number, out: Float32Array, o: number) {
  const s0 = Math.sin((1 - t) * c.om) / c.sin
  const s1 = Math.sin(t * c.om) / c.sin
  const lift = RADIUS * (1 + ARCH * Math.sin(Math.PI * t))
  const ia = c.a * 3, ib = c.b * 3
  out[o] = (agents[ia] * s0 + agents[ib] * s1) * lift
  out[o + 1] = (agents[ia + 1] * s0 + agents[ib + 1] * s1) * lift
  out[o + 2] = (agents[ia + 2] * s0 + agents[ib + 2] * s1) * lift
}

/**
 * Reseat a conversation on a fresh pair of agents. Pairs are rejected when the
 * two agents are near-neighbours (the path is a nub) or near-antipodal (it
 * wraps the whole globe and reads as a ring), so every path spans a legible
 * fraction of the sphere.
 */
function reseat(c: Conversation, agents: Float32Array, count: number, now: number, turn: number, next: () => number) {
  let a = 0, b = 0, dot = 1
  for (let i = 0; i < 16; i++) {
    a = Math.floor(next() * count)
    // Offset rather than a second free draw, so `a === b` — which would make
    // the path a division by sin(0) — cannot be rolled at all.
    b = (a + 1 + Math.floor(next() * (count - 1))) % count
    dot =
      agents[a * 3] * agents[b * 3] +
      agents[a * 3 + 1] * agents[b * 3 + 1] +
      agents[a * 3 + 2] * agents[b * 3 + 2]
    if (dot < 0.72 && dot > -0.4) break
  }
  c.a = a
  c.b = b
  c.om = Math.acos(Math.max(-1, Math.min(1, dot)))
  c.sin = Math.max(1e-4, Math.sin(c.om))
  c.hue = turn % SPECTRUM.length
  c.born = now
  c.life = 5.5 + next() * 5
}

/* ----------------------------------------------------------------- component */

export default function PointGlobe({
  className,
  variant = 'hero',
  conversations = variant === 'hero' ? 10 : 6,
  interactive = true,
}: PointGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    // No-WebGL → hide the canvas so the caller's static gradient fallback shows.
    if (typeof WebGLRenderingContext === 'undefined') {
      canvas.style.display = 'none'
      return
    }
    const gl = (canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      depth: false,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    const mq = (q: string) => (window.matchMedia ? window.matchMedia(q) : null)
    const reduce = mq('(prefers-reduced-motion: reduce)')?.matches ?? false
    const coarse = mq('(pointer: coarse)')?.matches ?? false
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Responsive budget.
    const minSide = Math.min(window.innerWidth, window.innerHeight)
    // The ground is dense because a point sphere only reads as a SPHERE when
    // its silhouette is crowded; at 1,600 points it reads as a starfield, which
    // is what this hero was. Nothing here is quadratic, so density is cheap.
    const small = coarse || minSide < 640
    const scale = variant === 'ambient' ? 0.72 : 1
    // HOW LARGE THE GLOBE RENDERS SETS ITS DENSITY — not how large the window
    // is, which is what this budget used to read. The sphere's diameter is a
    // fixed fraction of the CANVAS height and owes nothing to the viewport, so a
    // call site that overflows its section to make a planet (the documented way
    // to size a hero globe) spreads exactly these points over a far larger
    // silhouette. That is not a hypothetical: the fold's canvas runs to 124% of
    // a fold that is itself the viewport, and the sphere came back as the
    // starfield the line above says is the failure.
    //
    // Apparent density is N over the silhouette's AREA, and the silhouette is a
    // disc whose diameter tracks the canvas height — so holding density constant
    // means N tracks that ratio SQUARED. Bounded at both ends: a canvas smaller
    // than the viewport keeps a floor of points so it never thins out, and the
    // ceiling keeps a very tall canvas from asking for a budget nothing needs.
    // Read once, at mount, beside every other buffer decision; `clientHeight` is
    // valid here because the element is in the tree with its classes on it.
    const drawn = canvas.clientHeight || minSide
    const spread = Math.min(2.2, Math.max(0.8, (drawn / minSide) ** 2))
    let N = Math.round((small ? 2200 : minSide < 1024 ? 4000 : 6400) * scale * spread)
    N = Math.max(600, N)
    const agentCount = small ? 20 : minSide < 1024 ? 32 : 46
    const talk = small ? Math.min(conversations, 5) : conversations

    // Brightness / size presets. `size` values are CSS px (scaled by dpr and by
    // perspective w at draw time). Additive blending means the silhouette rim,
    // where points stack up, self-illuminates.
    // The ground is a dim, dense haze — the cloud. The agents and what passes
    // between them are what the eye is meant to land on, so they run three to
    // four times hotter and larger. Reading order is legibility, not decoration.
    const P =
      variant === 'hero'
        ? { node: 0.75, agent: 1.0, path: 1.0, tail: 1.0, pulse: 1.0, breath: 0.02, nodeSize: 2.0, agentSize: 6.6, pathSize: 2.7, tailSize: 4.4, pulseSize: 8.0 }
        : { node: 0.52, agent: 0.85, path: 0.75, tail: 0.9, pulse: 0.95, breath: 0.016, nodeSize: 1.8, agentSize: 5.4, pathSize: 2.2, tailSize: 3.6, pulseSize: 6.4 }

    /* -- program -- */
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) { canvas.style.display = 'none'; return }
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.style.display = 'none'; return }
    gl.useProgram(prog)

    const aPos = gl.getAttribLocation(prog, 'aPos')
    const aT = gl.getAttribLocation(prog, 'aT')
    const uMVP = gl.getUniformLocation(prog, 'uMVP')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uBreath = gl.getUniformLocation(prog, 'uBreath')
    const uPointSize = gl.getUniformLocation(prog, 'uPointSize')
    const uCamDist = gl.getUniformLocation(prog, 'uCamDist')
    const uAlpha = gl.getUniformLocation(prog, 'uAlpha')
    const uColor = gl.getUniformLocation(prog, 'uColor')
    const uIsPoint = gl.getUniformLocation(prog, 'uIsPoint')
    const uMode = gl.getUniformLocation(prog, 'uMode')
    const uHead = gl.getUniformLocation(prog, 'uHead')
    const uSpread = gl.getUniformLocation(prog, 'uSpread')

    /* -- geometry / buffers -- */
    const nodePos = sphereNodes(N)
    const agentPos = agentNodes(nodePos, N, agentCount)

    const nodeBuf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuf)
    gl.bufferData(gl.ARRAY_BUFFER, nodePos, gl.STATIC_DRAW)

    const agentBuf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, agentBuf)
    gl.bufferData(gl.ARRAY_BUFFER, agentPos, gl.STATIC_DRAW)

    // Paths: one slot per live conversation, rewritten only when that slot
    // respawns. `tPos` is the strip coordinate the shader shapes alpha from —
    // identical for every slot, so it is uploaded once and never touched again.
    const pathPos = new Float32Array(Math.max(1, talk) * SEG * 3)
    const pathBuf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, pathBuf)
    gl.bufferData(gl.ARRAY_BUFFER, pathPos.byteLength, gl.DYNAMIC_DRAW)

    const tPos = new Float32Array(Math.max(1, talk) * SEG)
    for (let s = 0; s < Math.max(1, talk); s++) {
      for (let k = 0; k < SEG; k++) tPos[s * SEG + k] = k / (SEG - 1)
    }
    const tBuf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuf)
    gl.bufferData(gl.ARRAY_BUFFER, tPos, gl.STATIC_DRAW)

    const pulsePos = new Float32Array(Math.max(1, talk) * 3)
    // Per-conversation fade, shared between the path passes and its pulse so
    // the two cannot disagree about how alive that conversation is.
    const fade = new Float32Array(Math.max(1, talk))
    const pulseBuf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, pulseBuf)
    gl.bufferData(gl.ARRAY_BUFFER, pulsePos.byteLength, gl.DYNAMIC_DRAW)

    // Agents currently holding a conversation, drawn hotter than the rest.
    const endPos = new Float32Array(Math.max(1, talk) * 2 * 3)
    const endBuf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, endBuf)
    gl.bufferData(gl.ARRAY_BUFFER, endPos.byteLength, gl.DYNAMIC_DRAW)

    /* -- conversation state -- */
    // Under reduced motion the whole clock is pinned to zero, so the one still
    // frame is drawn at exactly the time the conversations were seeded for.
    const t0 = reduce ? 0 : performance.now() * 0.001
    const next = rand(0x5eed)
    let turn = 0
    const live: Conversation[] = []
    function spawn(slot: number, now: number) {
      const c = live[slot]
      reseat(c, agentPos, agentCount, now, turn++, next)
      for (let k = 0; k < SEG; k++) walk(c, agentPos, k / (SEG - 1), pathPos, (slot * SEG + k) * 3)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, pathBuf)
      gl!.bufferSubData(gl!.ARRAY_BUFFER, slot * SEG * 3 * 4, pathPos.subarray(slot * SEG * 3, (slot + 1) * SEG * 3))
      for (let e = 0; e < 3; e++) {
        endPos[(slot * 2) * 3 + e] = agentPos[c.a * 3 + e]
        endPos[(slot * 2 + 1) * 3 + e] = agentPos[c.b * 3 + e]
      }
      gl!.bindBuffer(gl!.ARRAY_BUFFER, endBuf)
      gl!.bufferSubData(gl!.ARRAY_BUFFER, slot * 2 * 3 * 4, endPos.subarray(slot * 2 * 3, (slot + 1) * 2 * 3))
    }
    for (let s = 0; s < talk; s++) {
      live.push({ a: 0, b: 0, om: 1, sin: 1, hue: 0, born: 0, life: 8 })
      spawn(s, t0)
      // Back-date each birth so the first generation opens spread across the
      // envelope — mid-conversation — instead of every path fading up together.
      live[s].born = t0 - live[s].life * (0.1 + 0.74 * (talk > 1 ? s / (talk - 1) : 0.4))
    }

    /* -- gl state -- */
    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    // Additive RGB glow; alpha builds up "over" so the transparent canvas
    // composites cleanly onto the caller's dark backdrop in any page theme.
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)
    gl.enableVertexAttribArray(aPos)
    // The ground, agent and pulse passes have no position along a strip: they
    // run at uMode 0 and never read aT, but the attribute still needs a defined
    // generic value for the driver.
    gl.disableVertexAttribArray(aT)
    gl.vertexAttrib1f(aT, 0.5)

    /* -- matrices (preallocated) -- */
    const proj = new Float32Array(16)
    const view = new Float32Array(16)
    const model = new Float32Array(16)
    const mrx = new Float32Array(16)
    const mry = new Float32Array(16)
    const mv = new Float32Array(16)
    const mvp = new Float32Array(16)
    const camDist = 3.15
    view[0] = 1; view[5] = 1; view[10] = 1; view[15] = 1; view[14] = -camDist

    let aspect = 1
    function resize() {
      const w = Math.max(1, canvas!.clientWidth)
      const h = Math.max(1, canvas!.clientHeight)
      const cw = Math.round(w * dpr)
      const ch = Math.round(h * dpr)
      if (canvas!.width !== cw || canvas!.height !== ch) {
        canvas!.width = cw
        canvas!.height = ch
      }
      gl!.viewport(0, 0, cw, ch)
      aspect = cw / ch
      perspective(proj, (48 * Math.PI) / 180, aspect, 0.1, 100)
    }

    // Smoothed mouse parallax.
    let mx = 0, my = 0, tmx = 0, tmy = 0
    const onMove = (e: PointerEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2
      tmy = (e.clientY / window.innerHeight - 0.5) * 2
    }
    if (interactive && !reduce && !coarse) window.addEventListener('pointermove', onMove, { passive: true })

    function bind(buf: WebGLBuffer, strip: boolean) {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
      gl!.vertexAttribPointer(aPos, 3, gl!.FLOAT, false, 0, 0)
      if (strip) {
        gl!.bindBuffer(gl!.ARRAY_BUFFER, tBuf)
        gl!.enableVertexAttribArray(aT)
        gl!.vertexAttribPointer(aT, 1, gl!.FLOAT, false, 0, 0)
      } else {
        gl!.disableVertexAttribArray(aT)
      }
    }

    function paint(color: readonly [number, number, number], alpha: number, size: number) {
      gl!.uniform3f(uColor, color[0], color[1], color[2])
      gl!.uniform1f(uAlpha, alpha)
      gl!.uniform1f(uIsPoint, size > 0 ? 1 : 0)
      gl!.uniform1f(uPointSize, size > 0 ? size * dpr * camDist : 0)
    }

    function draw(time: number) {
      const secs = time * 0.001
      mx += (tmx - mx) * 0.05
      my += (tmy - my) * 0.05
      const spin = reduce ? 0.7 : time * 0.00006
      rotY(mry, spin + mx * 0.5)
      rotX(mrx, 0.32 + my * 0.28)
      mul(model, mry, mrx)
      mul(mv, view, model)
      mul(mvp, proj, mv)

      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.uniformMatrix4fv(uMVP, false, mvp)
      gl!.uniform1f(uTime, secs)
      gl!.uniform1f(uCamDist, camDist)
      gl!.uniform1f(uMode, 0)

      // The ground — uPointSize is scaled by camDist so P.nodeSize reads as
      // ~CSS px at the globe's centre depth (perspective shrinks the far side).
      bind(nodeBuf, false)
      gl!.uniform1f(uBreath, P.breath)
      paint(WHITE, P.node, P.nodeSize)
      gl!.drawArrays(gl!.POINTS, 0, N)

      gl!.uniform1f(uBreath, 0)

      if (talk > 0) {
        // Conversations. The whole path is laid down at a low alpha — the
        // channel, which says these two agents are connected — and then a short
        // bright run behind the travelling head is laid over it: the message.
        // Separating the two is what makes it read as motion ALONG a path
        // rather than a path that pulses in place.
        for (let s = 0; s < talk; s++) {
          const c = live[s]
          const age = (secs - c.born) / c.life
          if (age >= 1) { spawn(s, secs); fade[s] = 0; continue }
          // Fade in, hold, fade out — so paths arrive and leave instead of popping.
          const env = smooth(0, 0.14, age) * (1 - smooth(0.76, 1, age))
          fade[s] = env
          const hue = SPECTRUM[c.hue]

          // The head runs out and back: a message, then its reply.
          const trip = age * 2
          const head = trip < 1 ? trip : 2 - trip

          bind(pathBuf, true)
          gl!.uniform1f(uMode, 1)
          // Halo then core. Additive blending turns an oversized, near-
          // transparent copy of the same points into a bloom for the cost of
          // one more draw call, and bloom is what carries hue on black.
          paint(hue, P.path * env * 0.22, P.pathSize * 2.8)
          gl!.drawArrays(gl!.POINTS, s * SEG, SEG)
          paint(hue, P.path * env, P.pathSize)
          gl!.drawArrays(gl!.POINTS, s * SEG, SEG)

          gl!.uniform1f(uMode, 2)
          gl!.uniform1f(uHead, head)
          gl!.uniform1f(uSpread, 0.22)
          paint(hue, P.tail * env, P.tailSize)
          gl!.drawArrays(gl!.POINTS, s * SEG, SEG)

          walk(c, agentPos, head, pulsePos, s * 3)
        }

        // Pulse heads last, so a message rides over every path. White-hot: the
        // path already carries the hue, and a white head keeps the moving
        // object legible against it. Uploaded as one batch but drawn one at a
        // time — a batch shares its alpha, and a pulse at full brightness on a
        // path that has faded out is a white dot with nothing under it.
        gl!.uniform1f(uMode, 0)
        bind(pulseBuf, false)
        gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, pulsePos)
        for (let s = 0; s < talk; s++) {
          if (fade[s] < 0.02) continue
          paint(WHITE, P.pulse * fade[s], P.pulseSize)
          gl!.drawArrays(gl!.POINTS, s, 1)
        }
      }

      // Agents breathe with the ground they sit on — a static agent over a
      // breathing node separates from it by a couple of pixels and shimmers.
      gl!.uniform1f(uBreath, P.breath)

      // Every agent, so the network is populated even where nothing is talking.
      bind(agentBuf, false)
      paint(WHITE, P.agent * 0.6, P.agentSize)
      gl!.drawArrays(gl!.POINTS, 0, agentCount)

      // …then the ones currently holding a conversation, hotter, on top.
      if (talk > 0) {
        bind(endBuf, false)
        paint(WHITE, P.agent, P.agentSize * 1.18)
        gl!.drawArrays(gl!.POINTS, 0, talk * 2)
      }
    }

    /* -- run loop with pause gating -- */
    let raf = 0
    let running = false
    let visible = true
    let onscreen = true
    const loop = (t: number) => { draw(t); raf = requestAnimationFrame(loop) }
    function start() {
      if (running || reduce) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    function stop() {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
    function sync() {
      if (visible && onscreen) start()
      else stop()
    }

    const onVis = () => { visible = document.visibilityState !== 'hidden'; sync() }
    document.addEventListener('visibilitychange', onVis)

    const io = new IntersectionObserver(
      ([e]) => { onscreen = e.isIntersecting; sync() },
      { threshold: 0.01 },
    )
    io.observe(canvas)

    // The reduced-motion still is drawn at the seed clock, not `now`, so it is
    // the same picture on every load and on every resize.
    const still = t0 * 1000
    const ro = new ResizeObserver(() => { resize(); if (!running) draw(reduce ? still : performance.now()) })
    ro.observe(canvas)

    resize()
    draw(reduce ? still : performance.now()) // paint one frame immediately
    if (!reduce) sync()

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      io.disconnect()
      ro.disconnect()
      gl.deleteBuffer(nodeBuf)
      gl.deleteBuffer(agentBuf)
      gl.deleteBuffer(pathBuf)
      gl.deleteBuffer(tBuf)
      gl.deleteBuffer(pulseBuf)
      gl.deleteBuffer(endBuf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      // Deliberately NOT WEBGL_lose_context. A lost context is permanent for
      // that canvas element, and React hands the SAME element back on a
      // remount — so `getContext` returns the dead one, every shader compile
      // reports failure, and the effect's own guard hides the canvas for good.
      // Strict mode remounts every component once, which is why the globe was
      // invisible in dev. The deletes above are what actually free the GPU
      // memory; the context itself dies with the element.
    }
  }, [variant, conversations, interactive])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}

/** smoothstep, matching the GLSL builtin the shader uses on the same envelope. */
function smooth(a: number, b: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
