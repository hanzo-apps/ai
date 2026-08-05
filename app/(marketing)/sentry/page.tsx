// The product is Sentinel. This route exists only so links minted while it was
// called /sentry keep working.
//
// It is a real page rather than a `redirects()` entry because this site is a
// STATIC EXPORT (`output: 'export'` in next.config), and Next's redirects need a
// server — they are silently absent from an export, so the rewrite would look
// configured and 404 every inbound link.
//
// The rename is a TRADEMARK matter: "Sentry" is a mark of Functional Software,
// Inc. and this product is a fork, so our own surface must not carry the name.
// Attribution to upstream stays exactly where it belongs — the `upstream_fork`
// and `upstream_url` fields in products-metadata.ts — because naming what you
// forked is required, and is a different act from branding yourself with it.
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function SentryRedirect() {
  useEffect(() => {
    window.location.replace('/sentinel')
  }, [])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Sentinel</h1>
      <p className="text-sm text-foreground/60">
        This page moved to <Link href="/sentinel" className="underline underline-offset-4">/sentinel</Link>.
      </p>
    </div>
  )
}
