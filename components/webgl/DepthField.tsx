'use client'

import { useEffect, useRef } from 'react'

/**
 * DepthField — the restrained companion to PointGlobe: a monochrome stack of
 * translucent "layer" planes receding into depth, with slow drift and gentle mouse
 * parallax (deeper planes move more). Pure Canvas2D — tiny, cheap, decorative.
 *
 * Same guardrails as PointGlobe:
 *   - No-2d-context → hides itself (caller's static bg shows).
 *   - prefers-reduced-motion → one still frame, no loop.
 *   - Pauses when hidden / offscreen. DPR capped at 2. `aria-hidden`.
 */
export interface DepthFieldProps {
  className?: string
  /** Number of stacked planes. */
  layers?: number
  interactive?: boolean
}

export default function DepthField({ className, layers = 6, interactive = true }: DepthFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return
    const ctx = canvas.getContext('2d')
    if (!ctx) { canvas.style.display = 'none'; return }

    const mq = (q: string) => (window.matchMedia ? window.matchMedia(q) : null)
    const reduce = mq('(prefers-reduced-motion: reduce)')?.matches ?? false
    const coarse = mq('(pointer: coarse)')?.matches ?? false
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const L = coarse ? Math.min(layers, 4) : layers

    let w = 0, h = 0
    function resize() {
      w = Math.max(1, canvas!.clientWidth)
      h = Math.max(1, canvas!.clientHeight)
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    let mx = 0, my = 0, tmx = 0, tmy = 0
    const onMove = (e: PointerEvent) => {
      const r = canvas!.getBoundingClientRect()
      tmx = ((e.clientX - r.left) / Math.max(1, r.width) - 0.5) * 2
      tmy = ((e.clientY - r.top) / Math.max(1, r.height) - 0.5) * 2
    }
    if (interactive && !reduce && !coarse) window.addEventListener('pointermove', onMove, { passive: true })

    function roundRect(x: number, y: number, rw: number, rh: number, r: number) {
      ctx!.beginPath()
      ctx!.moveTo(x + r, y)
      ctx!.arcTo(x + rw, y, x + rw, y + rh, r)
      ctx!.arcTo(x + rw, y + rh, x, y + rh, r)
      ctx!.arcTo(x, y + rh, x, y, r)
      ctx!.arcTo(x, y, x + rw, y, r)
      ctx!.closePath()
    }

    function draw(time: number) {
      mx += (tmx - mx) * 0.05
      my += (tmy - my) * 0.05
      ctx!.clearRect(0, 0, w, h)

      const cx = w / 2, cy = h / 2
      const base = Math.min(w, h) * 0.42
      const pw = base * 1.5, ph = base
      const t = reduce ? 0 : time * 0.001

      // Back-to-front so nearer planes overlay farther ones.
      for (let i = L - 1; i >= 0; i--) {
        const depth = i / (L - 1) // 0 = front, 1 = back
        const drift = Math.sin(t * 0.5 + i * 0.7) * 6 * (1 - depth)
        // Isometric-ish stagger: deeper planes sit up-right; parallax scales with depth.
        const ox = (depth - 0.4) * base * 0.34 + mx * 26 * depth + drift
        const oy = (depth - 0.4) * base * -0.22 + my * 18 * depth - drift * 0.6
        const s = 1 - depth * 0.16
        const x = cx - (pw * s) / 2 + ox
        const y = cy - (ph * s) / 2 + oy
        const a = (1 - depth) * 0.5 + 0.06

        roundRect(x, y, pw * s, ph * s, 14 * s)
        ctx!.fillStyle = `rgba(255,255,255,${0.02 + (1 - depth) * 0.03})`
        ctx!.fill()
        ctx!.lineWidth = 1
        ctx!.strokeStyle = `rgba(255,255,255,${a * 0.5})`
        ctx!.stroke()

        // A couple of hairlines inside each plane to read as "content" — kept minimal.
        ctx!.strokeStyle = `rgba(255,255,255,${a * 0.18})`
        ctx!.beginPath()
        ctx!.moveTo(x + 16 * s, y + ph * s * 0.4)
        ctx!.lineTo(x + pw * s - 16 * s, y + ph * s * 0.4)
        ctx!.moveTo(x + 16 * s, y + ph * s * 0.62)
        ctx!.lineTo(x + pw * s * 0.7, y + ph * s * 0.62)
        ctx!.stroke()
      }
    }

    let raf = 0, running = false, visible = true, onscreen = true
    const loop = (t: number) => { draw(t); raf = requestAnimationFrame(loop) }
    function start() { if (running || reduce) return; running = true; raf = requestAnimationFrame(loop) }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0 }
    function sync() { if (visible && onscreen) start(); else stop() }

    const onVis = () => { visible = document.visibilityState !== 'hidden'; sync() }
    document.addEventListener('visibilitychange', onVis)
    const io = new IntersectionObserver(([e]) => { onscreen = e.isIntersecting; sync() }, { threshold: 0.01 })
    io.observe(canvas)
    const ro = new ResizeObserver(() => { resize(); if (!running) draw(reduce ? 0 : performance.now()) })
    ro.observe(canvas)

    resize()
    draw(reduce ? 0 : performance.now())
    if (!reduce) sync()

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      io.disconnect()
      ro.disconnect()
    }
  }, [layers, interactive])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
