// Copyright (C) 2020-2026, Hanzo AI Inc. All rights reserved.
//
// WaitlistTracking.example.tsx — READY-TO-USE funnel instrumentation for the
// launch waitlist (waitlist.hanzo.ai). This is the analytics wiring ONLY.
//
// OWNERSHIP: the waitlist funnel PAGE, its CTA links, the waitlist-guard, and its
// ingress are owned by a separate agent. This file exists so that whoever builds
// the funnel drops in the SAME one-way analytics module every Hanzo surface uses —
// no second analytics system, no copy-pasted gtag/fbq. Delete the `.example`
// suffix and place it where the funnel lives (or inline the two calls).
//
// TWO steps, both through the ONE shared module (components/HanzoAnalytics):
//
//   1) Render <HanzoAnalytics /> once in the funnel's <head>/root (the tag that
//      already fans out to first-party + GA4 + Meta Pixel via env-driven
//      data-ga-id / data-fb-pixel-id). Set NEXT_PUBLIC_ANALYTICS_WEBSITE_ID to the
//      waitlist's own analytics.hanzo.ai property; NEXT_PUBLIC_GA_ID and
//      NEXT_PUBLIC_FB_PIXEL_ID are the SAME global ids as the other surfaces.
//
//   2) On a SUCCESSFUL POST /v1/waitlist/join, call trackEvent('waitlist_join', …).
//      The native tracker forwards it to Hanzo analytics AND fires
//      GA4  gtag('event', 'waitlist_join', …)  AND
//      Meta fbq('trackCustom', 'waitlist_join', …)  automatically.
//      This is THE launch funnel conversion — the growth KPI.
//
// The /v1/waitlist/join API (hanzoai/base plugins/waitlist) returns:
//   { ok, waitlist, email, refCode, rank, total, referralCount, shareUrl, alreadyJoined }

'use client'

import { useState } from 'react'
import { HanzoAnalytics, trackEvent } from './HanzoAnalytics'

/** The slug of the launch waitlist row in the `waitlists` Base collection. */
const WAITLIST_SLUG = process.env.NEXT_PUBLIC_WAITLIST_SLUG || 'launch'

/** Where the waitlist API is served. Same-origin `/v1/waitlist/*` by default. */
const WAITLIST_API =
  process.env.NEXT_PUBLIC_WAITLIST_API || '' // '' => same-origin

type JoinResponse = {
  ok: boolean
  refCode: string
  rank: number
  total: number
  referralCount: number
  shareUrl: string
  alreadyJoined?: boolean
}

/**
 * The join form. On a successful join it fires the ONE funnel event through the
 * shared analytics module — so the conversion lands in Hanzo analytics, GA4, AND
 * the Meta Pixel with no per-provider code here.
 */
export function WaitlistJoin({ referrerCode }: { referrerCode?: string }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<JoinResponse | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('submitting')
    try {
      // Turnstile: if the funnel renders a widget, read its token here and add
      // turnstileToken to the body (the plugin gates /join on it when configured).
      const res = await fetch(`${WAITLIST_API}/v1/waitlist/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          waitlist: WAITLIST_SLUG,
          email,
          referrerCode,
        }),
      })
      if (!res.ok) throw new Error(`join failed: ${res.status}`)
      const data: JoinResponse = await res.json()
      setResult(data)
      setState('done')

      // THE funnel conversion — one call, fans out to first-party + GA4 + Pixel.
      // 'Lead' is the standard Meta funnel event; we send our own richer name too.
      trackEvent('waitlist_join', {
        rank: data.rank,
        total: data.total,
        referralCount: data.referralCount,
        alreadyJoined: !!data.alreadyJoined,
        referred: !!referrerCode,
      })
    } catch {
      setState('error')
    }
  }

  if (state === 'done' && result) {
    return (
      <div>
        You are <strong>#{result.rank}</strong> of {result.total}. Share to move up:
        <code>{result.shareUrl}</code>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <button type="submit" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Joining…' : 'Join the waitlist'}
      </button>
      {state === 'error' && <p>Something went wrong. Try again.</p>}
    </form>
  )
}

/** Mount once in the funnel root so the one analytics tag loads. */
export function WaitlistPageAnalytics() {
  return <HanzoAnalytics />
}
