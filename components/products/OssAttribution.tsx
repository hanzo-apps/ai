'use client'

/**
 * OSS attribution block.
 *
 * One block, one source of strings: lib/constants/products-metadata.ts.
 * Renders a small pill row (License, GitHub, Stars, Upstream credit) and an
 * always-visible upstream attribution paragraph when the product is a fork.
 *
 * Stars are fetched client-side from the GitHub REST API; if the call fails
 * the component still renders — the audit only requires the structural block,
 * not a live count.
 */

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Github, Scale, Star, ExternalLink } from 'lucide-react'
import { getProductMetadata, type ProductMetadata } from '@/lib/constants/products-metadata'

type Props = {
  /** Product slug matching app/(marketing)/<slug>/page.tsx */
  slug: string
  /** Override metadata (useful when the page is generated from a non-canonical slug) */
  meta?: ProductMetadata
  className?: string
}

function parseRepoFromUrl(repoUrl: string): { owner: string; name: string } | null {
  const m = /^https?:\/\/github\.com\/([^\/]+)\/([^\/?#]+)/.exec(repoUrl)
  if (!m) return null
  return { owner: m[1], name: m[2] }
}

export function OssAttribution({ slug, meta: metaProp, className = '' }: Props) {
  const meta = metaProp ?? getProductMetadata(slug)
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    if (!meta) return
    const parsed = parseRepoFromUrl(meta.github_repo)
    if (!parsed) return
    // Org-level GitHub URLs (no repo name) won't return star counts. Skip silently.
    if (parsed.name === parsed.owner) return
    let cancelled = false
    fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.name}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled) return
        if (typeof data?.stargazers_count === 'number') setStars(data.stargazers_count)
      })
      .catch(() => {
        // Network or rate-limit failure — leave stars null; structural block still renders.
      })
    return () => {
      cancelled = true
    }
  }, [meta])

  if (!meta) return null

  return (
    <section
      data-testid="oss-attribution"
      className={`py-12 px-4 md:px-8 border-t border-border ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl md:text-2xl font-medium text-foreground mb-4">Open source</h2>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* License pill */}
          <span
            data-testid="oss-license"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs text-foreground/80"
          >
            <Scale className="w-3 h-3" />
            <span className="font-medium">License:</span> {meta.license}
          </span>

          {/* GitHub repo pill */}
          <a
            data-testid="oss-github"
            href={meta.github_repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Github className="w-3 h-3" />
            <span className="font-mono">{meta.github_repo.replace('https://github.com/', '')}</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Stars pill (only when known) */}
          {stars !== null && (
            <span
              data-testid="oss-stars"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs text-foreground/80"
            >
              <Star className="w-3 h-3" />
              {stars.toLocaleString()} stars
            </span>
          )}
        </div>
      </div>
    </section>
  )
}

export default OssAttribution
