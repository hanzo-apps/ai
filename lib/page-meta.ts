import type { Metadata } from 'next'

/**
 * One page's metadata, said once.
 *
 * A `'use client'` page cannot `export const metadata` — it is a server-only
 * export, so writing one there is silently ignored rather than an error, and the
 * page quietly inherits the root's title. Measured on production 2026-08-08:
 * **33 of the 53 URLs in sitemap.xml** served the same fallback,
 * "Hanzo — the AI cloud for agents and apps". Nearly two thirds of the indexed
 * site was indistinguishable in a search result, a browser tab, and a shared
 * link.
 *
 * The cure is a co-located server `layout.tsx`. The cost of doing it the way
 * this repo already did it (see app/(marketing)/contact/layout.tsx) is that the
 * title and description are typed THREE times each — once plain, once for
 * OpenGraph, once for Twitter — so a fix to one is a fix to three, and the third
 * is the one nobody edits. Thirty-three pages of that is a hundred strings that
 * can disagree.
 *
 * So: say it once here. The title and description passed in are the page's OWN
 * words, lifted from its `<h1>` and lede rather than written fresh for search —
 * a page that describes itself differently to Google than to a reader is two
 * pages.
 */
export function pageMeta(opts: {
  /** The page's own headline. Suffixed with the brand for the tab and SERP. */
  title: string
  /** The page's own lede. One sentence; search engines cut near 160 chars. */
  description: string
  /** Absolute path, for the canonical URL. */
  path: string
}): Metadata {
  const title = `${opts.title} — Hanzo AI`
  const { description } = opts
  const url = `https://hanzo.ai${opts.path}`

  return {
    title,
    description,
    alternates: { canonical: opts.path },
    openGraph: { title, description, url, siteName: 'Hanzo AI', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}
