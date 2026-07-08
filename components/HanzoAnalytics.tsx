// Copyright (C) 2020-2026, Hanzo AI Inc. All rights reserved.
//
// HanzoAnalytics — the ONE analytics tag for every Hanzo surface.
//
// There is exactly one analytics module in the stack: the native tracker served
// from https://analytics.hanzo.ai/script.js (hanzoai/analytics). It is a
// multi-provider tag manager — a single <script> fans out to:
//   - Hanzo's own first-party analytics (/api/send, /api/ast, /api/element)
//   - GA4          via data-ga-id       -> googletagmanager.com/gtag/js
//   - Meta Pixel   via data-fb-pixel-id -> connect.facebook.net/.../fbevents.js
//   - GTM / TikTok / LinkedIn / Pinterest / Snap / Plausible (unused here)
//
// So GA4 + the Facebook Pixel are NOT separate snippets: they are data
// attributes on this one tag. Add a provider by setting its env var; nothing
// else changes. This is the DRY, one-way-to-do-everything analytics surface —
// reused verbatim across hanzo.ai, hanzo.app, console, and the waitlist funnel.
//
// IDs are env-driven and PUBLIC (they ship in client JS — not KMS secrets):
//   NEXT_PUBLIC_ANALYTICS_WEBSITE_ID  per-surface Hanzo-analytics website id
//   NEXT_PUBLIC_GA_ID                 GA4 measurement id  (G-XXXXXXXXXX) — global
//   NEXT_PUBLIC_FB_PIXEL_ID           Meta Pixel id       (15-16 digits) — global
//
// When GA/Pixel env vars are unset the tracker simply does not load them — no
// fabricated ids, first-party analytics keeps working. Funnel/custom events go
// through the SAME module via trackEvent() below (fires fbq trackCustom + gtag
// event automatically).

'use client'

import Script from 'next/script'

/** Per-surface Hanzo-analytics website id. Defaults to the hanzo.ai property so
 *  first-party tracking keeps working even before the env var is provisioned. */
const WEBSITE_ID =
  process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID ||
  'a323a8ae-c811-4061-9626-22caaffc612f'

/** Global GA4 measurement id (G-XXXXXXXXXX). Unset until the user supplies one. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID
/** Global Meta/Facebook Pixel id. Unset until the user supplies one. */
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

export function HanzoAnalytics() {
  return (
    <Script
      src="https://analytics.hanzo.ai/script.js"
      data-website-id={WEBSITE_ID}
      {...(GA_ID ? { 'data-ga-id': GA_ID } : {})}
      {...(FB_PIXEL_ID ? { 'data-fb-pixel-id': FB_PIXEL_ID } : {})}
      strategy="afterInteractive"
    />
  )
}

/**
 * trackEvent — fire a named conversion/funnel event through the one analytics
 * module. The native tracker forwards it to Hanzo analytics AND (when the
 * corresponding id is set) to GA4 (`gtag('event', name, props)`) and the Meta
 * Pixel (`fbq('trackCustom', name, props)`). Safe to call before the script
 * loads — the tracker queues via window.hanzo.
 *
 * The launch funnel calls trackEvent('waitlist_join', { rank, referralCount })
 * on a successful /v1/waitlist/join.
 */
export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as unknown as {
    hanzo?: { track: (n: string, p?: Record<string, unknown>) => void }
  }
  try {
    w.hanzo?.track(name, props)
  } catch {
    /* analytics must never break the app */
  }
}
