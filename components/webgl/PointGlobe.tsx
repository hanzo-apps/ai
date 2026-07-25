'use client'

import { useEffect, useRef } from 'react'

/**
 * PointGlobe — the flagship monochrome WebGL hero motif: a sphere of white points
 * on true black, slowly auto-rotating, laced with a sparse nearest-neighbour mesh
 * and a few orbiting great-circle arcs each trailing a bright satellite. Reads as a
 * "distributed AI cloud." Additive-glow, so the silhouette rim self-illuminates.
 *
 * Strictly decorative (`aria-hidden`) and engineered for a static-export prod site:
 *   - Raw WebGL + inline GLSL — zero runtime deps, code-split into its own chunk via
 *     the caller's `next/dynamic({ ssr:false })`. Never runs at build/SSR.
 *   - No-WebGL  → the canvas hides itself; the caller's static gradient shows through.
 *   - prefers-reduced-motion → renders ONE still frame, no rAF loop.
 *   - Pauses when the tab is hidden or the canvas scrolls offscreen (IntersectionObserver).
 *   - DPR capped at 2; node/edge/arc budget scales down on small / coarse-pointer devices.
 *   - One shader program, a handful of draw calls, no per-frame allocation.
 *   - No network/CDN fetches (CSP + export safe).
 */

type Variant = 'hero' | 'ambient'

export interface PointGlobeProps {
  className?: string
  /** `hero` = bright centrepiece; `ambient` = quiet backdrop behind content. */
  variant?: Variant
  /** Orbiting great-circle arcs (each with a travelling satellite). 0 disables. */
  arcs?: number
  /** Mouse parallax. Default true; forced off under reduced-motion. */
  interactive?: boolean
}

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

const VERT = `
attribute vec3 aPos;
uniform mat4 uMVP;
uniform float uTime;
uniform float uBreath;
uniform float uPointSize;
uniform float uCamDist;
varying float vFade;
void main() {
  float phase = dot(aPos, vec3(12.9898, 78.233, 37.719));
  float b = 1.0 + uBreath * sin(uTime * 0.6 + phase);
  vec4 clip = uMVP * vec4(aPos * b, 1.0);
  gl_Position = clip;
  gl_PointSize = uPointSize / max(clip.w, 0.1);
  // Front of the globe (smaller clip.w) is brightest; far side fades out.
  vFade = clamp((uCamDist + 1.15 - clip.w) / 2.3, 0.12, 1.0);
}`

const FRAG = `
precision mediump float;
uniform float uAlpha;
uniform float uIsPoint;
varying float vFade;
void main() {
  float a = uAlpha * vFade;
  if (uIsPoint > 0.5) {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;         // round points
    a *= smoothstep(0.25, 0.02, d); // soft edge
  }
  gl_FragColor = vec4(1.0, 1.0, 1.0, a);
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

/** Transform a vec3 (w=1, rotation-only mat) into out[o..o+2]. */
function xform(m: Float32Array, x: number, y: number, z: number, out: Float32Array, o: number) {
  out[o] = m[0] * x + m[4] * y + m[8] * z + m[12]
  out[o + 1] = m[1] * x + m[5] * y + m[9] * z + m[13]
  out[o + 2] = m[2] * x + m[6] * y + m[10] * z + m[14]
}

/* ------------------------------------------------------------ geometry init - */

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

/** Sparse nearest-neighbour edge indices (each node linked to a few close ones). */
function meshEdges(pos: Float32Array, n: number): Uint16Array {
  const edges: number[] = []
  const deg = new Int32Array(n)
  const cap = 3
  const thr2 = Math.pow(2.6 / Math.sqrt(n), 2)
  for (let i = 0; i < n; i++) {
    if (deg[i] >= cap) continue
    const ax = pos[i * 3], ay = pos[i * 3 + 1], az = pos[i * 3 + 2]
    for (let j = i + 1; j < n; j++) {
      if (deg[i] >= cap) break
      if (deg[j] >= cap) continue
      const dx = ax - pos[j * 3], dy = ay - pos[j * 3 + 1], dz = az - pos[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < thr2) {
        edges.push(i, j)
        deg[i]++; deg[j]++
      }
    }
  }
  return new Uint16Array(edges)
}

interface Arc {
  rot: Float32Array // orientation of the great circle
  t0: number        // start angle
  span: number      // arc sweep
  speed: number     // satellite travel speed
  phase: number     // satellite start offset
}

/** A few great-circle arcs on a slightly larger radius, at varied orientations. */
function buildArcs(count: number, seg: number, radius: number): { pos: Float32Array; arcs: Arc[] } {
  const pos = new Float32Array(count * seg * 3)
  const arcs: Arc[] = []
  for (let a = 0; a < count; a++) {
    const ry = new Float32Array(16), rx = new Float32Array(16), rot = new Float32Array(16)
    rotY(ry, (a / count) * Math.PI * 2 + 0.6)
    rotX(rx, 0.5 + ((a * 1.3) % 1.4) - 0.7)
    mul(rot, ry, rx)
    const t0 = (a * 1.7) % (Math.PI * 2)
    const span = Math.PI * (0.7 + ((a * 0.37) % 0.6))
    for (let k = 0; k < seg; k++) {
      const th = t0 + (span * k) / (seg - 1)
      xform(rot, Math.cos(th) * radius, Math.sin(th) * radius, 0, pos, (a * seg + k) * 3)
    }
    arcs.push({ rot, t0, span, speed: 0.14 + (a % 3) * 0.05, phase: (a * 0.41) % 1 })
  }
  return { pos, arcs }
}

/* ----------------------------------------------------------------- component */

export default function PointGlobe({
  className,
  variant = 'hero',
  arcs = variant === 'hero' ? 4 : 0,
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
    const scale = variant === 'ambient' ? 0.72 : 1
    let N = Math.round((coarse || minSide < 640 ? 520 : minSide < 1024 ? 980 : 1600) * scale)
    N = Math.max(300, N)
    const arcCount = coarse || minSide < 640 ? Math.min(arcs, 2) : arcs

    // Brightness / size presets. `size` values are CSS px (scaled by dpr and by
    // perspective w at draw time). Additive blending means the silhouette rim,
    // where points stack up, self-illuminates.
    const P =
      variant === 'hero'
        ? { node: 0.82, line: 0.17, arc: 0.52, sat: 1.0, breath: 0.02, nodeSize: 2.7, satSize: 5.5 }
        : { node: 0.52, line: 0.1, arc: 0.3, sat: 0.75, breath: 0.016, nodeSize: 2.3, satSize: 4.5 }

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
    const uMVP = gl.getUniformLocation(prog, 'uMVP')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uBreath = gl.getUniformLocation(prog, 'uBreath')
    const uPointSize = gl.getUniformLocation(prog, 'uPointSize')
    const uCamDist = gl.getUniformLocation(prog, 'uCamDist')
    const uAlpha = gl.getUniformLocation(prog, 'uAlpha')
    const uIsPoint = gl.getUniformLocation(prog, 'uIsPoint')

    /* -- geometry / buffers -- */
    const nodePos = sphereNodes(N)
    const edgeIdx = meshEdges(nodePos, N)
    const seg = 56
    const arcRadius = 1.07
    const { pos: arcPos, arcs: arcDefs } = buildArcs(arcCount, seg, arcRadius)

    const nodeBuf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuf)
    gl.bufferData(gl.ARRAY_BUFFER, nodePos, gl.STATIC_DRAW)

    const edgeBuf = gl.createBuffer()!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuf)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edgeIdx, gl.STATIC_DRAW)

    const arcBuf = gl.createBuffer()!
    if (arcCount > 0) {
      gl.bindBuffer(gl.ARRAY_BUFFER, arcBuf)
      gl.bufferData(gl.ARRAY_BUFFER, arcPos, gl.STATIC_DRAW)
    }

    const satData = new Float32Array(Math.max(1, arcCount) * 3)
    const satBuf = gl.createBuffer()!

    /* -- gl state -- */
    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    // Additive RGB glow; alpha builds up "over" so the transparent canvas
    // composites cleanly onto the caller's dark backdrop in any page theme.
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

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

    function draw(time: number) {
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
      gl!.uniform1f(uTime, time * 0.001)
      gl!.uniform1f(uCamDist, camDist)

      // edges
      gl!.bindBuffer(gl!.ARRAY_BUFFER, nodeBuf)
      gl!.enableVertexAttribArray(aPos)
      gl!.vertexAttribPointer(aPos, 3, gl!.FLOAT, false, 0, 0)
      gl!.uniform1f(uBreath, P.breath)
      gl!.uniform1f(uIsPoint, 0)
      gl!.uniform1f(uPointSize, 0)
      gl!.uniform1f(uAlpha, P.line)
      gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, edgeBuf)
      gl!.drawElements(gl!.LINES, edgeIdx.length, gl!.UNSIGNED_SHORT, 0)

      // nodes — uPointSize is scaled by camDist so P.nodeSize reads as ~CSS px
      // at the globe's centre depth (perspective shrinks the far side naturally).
      gl!.uniform1f(uIsPoint, 1)
      gl!.uniform1f(uPointSize, P.nodeSize * dpr * camDist)
      gl!.uniform1f(uAlpha, P.node)
      gl!.drawArrays(gl!.POINTS, 0, N)

      if (arcCount > 0) {
        // arcs (no breathing)
        gl!.bindBuffer(gl!.ARRAY_BUFFER, arcBuf)
        gl!.vertexAttribPointer(aPos, 3, gl!.FLOAT, false, 0, 0)
        gl!.uniform1f(uBreath, 0)
        gl!.uniform1f(uIsPoint, 0)
        gl!.uniform1f(uPointSize, 0)
        gl!.uniform1f(uAlpha, P.arc)
        for (let a = 0; a < arcCount; a++) gl!.drawArrays(gl!.LINE_STRIP, a * seg, seg)

        // satellites travelling along each arc
        const ts = reduce ? 0.35 : time * 0.001
        for (let a = 0; a < arcCount; a++) {
          const d = arcDefs[a]
          const th = d.t0 + d.span * ((ts * d.speed + d.phase) % 1)
          xform(d.rot, Math.cos(th) * arcRadius, Math.sin(th) * arcRadius, 0, satData, a * 3)
        }
        gl!.bindBuffer(gl!.ARRAY_BUFFER, satBuf)
        gl!.bufferData(gl!.ARRAY_BUFFER, satData, gl!.DYNAMIC_DRAW)
        gl!.vertexAttribPointer(aPos, 3, gl!.FLOAT, false, 0, 0)
        gl!.uniform1f(uIsPoint, 1)
        gl!.uniform1f(uPointSize, P.satSize * dpr * camDist)
        gl!.uniform1f(uAlpha, P.sat)
        gl!.drawArrays(gl!.POINTS, 0, arcCount)
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

    const ro = new ResizeObserver(() => { resize(); if (!running) draw(reduce ? 0 : performance.now()) })
    ro.observe(canvas)

    resize()
    draw(reduce ? 0 : performance.now()) // paint one frame immediately (also the reduced-motion still)
    if (!reduce) sync()

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      io.disconnect()
      ro.disconnect()
      gl.deleteBuffer(nodeBuf)
      gl.deleteBuffer(edgeBuf)
      gl.deleteBuffer(arcBuf)
      gl.deleteBuffer(satBuf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [variant, arcs, interactive])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
