'use client'
import Redirect from '@/app/(marketing)/_redirect'

/**
 * /download forwards to hanzo.app/download, which is the ONE download page.
 *
 * There were two, and they disagreed: this one offered the `hanzoai/dev`
 * tarballs as "Desktop" while the desktop app is published elsewhere, and it
 * carried no browser or editor artifact at all. Keeping a second copy in step
 * with the releases is work nobody was doing, so the copy is gone rather than
 * corrected.
 *
 * A shell rather than a `redirects()` rule because this is a STATIC EXPORT —
 * Next's redirects need a server and are silently absent from an export, so a
 * configured rewrite would 404 every inbound link. It is listed in `EMPTY` in
 * `lib/publish.ts`, which keeps it out of sitemap.xml and marks it `noindex`:
 * a page with nothing to read may not be offered to a crawler.
 *
 * This also repairs every OTHER surface at once. `@hanzogui/shell`'s registry
 * points every Hanzo property's "Download" at `hanzo.ai/download`, so the whole
 * estate lands on the canonical page without republishing a shared package.
 */
export default function Page() {
  return <Redirect to="https://hanzo.app/download" />
}
