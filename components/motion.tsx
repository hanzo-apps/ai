'use client'

/**
 * motion — framer-motion, with one rule added: a scroll reveal may not hide content.
 *
 * `whileInView` is an ENHANCEMENT, and the site had it holding the content
 * hostage. The pairing every page reached for was
 *
 *     initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
 *
 * and `initial` is rendered — framer-motion writes it into the `style`
 * attribute of the exported HTML. So the shipped page states that the section
 * is transparent, and the ONLY thing that can take it back is an
 * IntersectionObserver firing after hydration. Every way that observer can be
 * late or absent — a viewport it never enters, a hydration error, a slow chunk,
 * a browser that never runs the script — leaves real copy at `opacity: 0`
 * forever. Measured on the live site at 1440x900: 4,380px of /about, 972px of
 * /solutions and 2,229px of the homepage rendered as black.
 *
 * The tell was that reduced-motion readers saw MORE than everyone else:
 * `app/globals.css` forces the start state visible under
 * `prefers-reduced-motion` and under `html.no-js`, so the two audiences nobody
 * designs for were the two the page worked for. A reveal that needs a rescue
 * rule to be readable is not a reveal, it is a hiding place.
 *
 * So the start state is grounded here, once, instead of at 815 call sites: the
 * element ships opaque and in position, and what is left of `initial` is a
 * nudge the entrance closes. Nothing about a call site changes — the same
 * props, the same durations, the same stagger — and there is no arrangement of
 * them that can blank a section again.
 */

import * as React from 'react'
import { motion as framer } from 'framer-motion'

/**
 * How far a reveal may start from where it belongs.
 *
 * A rise is the house entrance (`page-kit`'s `useRise` opens the same way), and
 * this is the whole of it: 8px is motion when it animates and nothing at all
 * when it does not, which is the point — the un-revealed page has to be a page
 * somebody can read, not a page waiting for one. Horizontal offsets are dropped
 * outright rather than clamped: an `x: -20` enter is wider than the viewport for
 * the length of the animation, which is the 4px sideways scroll `overflow-x:
 * clip` in `app/globals.css` exists to swallow.
 */
const NUDGE = 8

/** Reveal a section as it comes to the fold, not after. */
const EARLY = '0px 0px 96px 0px'

/**
 * A start state that a reader can read.
 *
 * `opacity`, `x` and `scale` are what make content unreadable when the reveal
 * does not run, so they never reach the DOM; `y` survives, clamped. Anything
 * else the call site asked for is its own business — `width: 0` draws a bar
 * growing, and an undrawn ornament is not a missing section.
 *
 * A variant NAME (`initial="hidden"`) cannot be inspected from here, so it
 * becomes `false`: the element mounts in the state `whileInView` targets, which
 * is the visible one, and its children inherit that through motion's context.
 */
function grounded(initial: unknown) {
  if (!initial || typeof initial !== 'object' || Array.isArray(initial)) return false
  const { opacity, x, scale, y, ...rest } = initial as Record<string, unknown>
  const start =
    typeof y === 'number' ? { ...rest, y: Math.max(-NUDGE, Math.min(NUDGE, y)) } : rest
  return Object.keys(start).length ? start : false
}

const wrapped = new Map<string, React.ComponentType<Record<string, unknown>>>()

export const motion = new Proxy(framer, {
  get(target, key) {
    // Intrinsic elements only — `motion.div`, `motion.section`. `create` and the
    // symbols are motion's own and pass straight through.
    if (typeof key !== 'string' || !/^[a-z]/.test(key)) return Reflect.get(target, key)
    let El = wrapped.get(key)
    if (!El) {
      const Base = Reflect.get(target, key) as React.ComponentType<Record<string, unknown>>
      El = (props: Record<string, unknown>) =>
        props.whileInView ? (
          <Base
            {...props}
            initial={grounded(props.initial)}
            viewport={{ once: true, margin: EARLY, ...(props.viewport as object) }}
          />
        ) : (
          <Base {...props} />
        )
      El.displayName = `motion.${key}`
      wrapped.set(key, El)
    }
    return El
  },
}) as typeof framer
