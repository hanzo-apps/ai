'use client'

/**
 * Deploy block.
 *
 * Primary CTA → console.hanzo.ai/deploy/<slug> (managed cloud deploy).
 * Secondary CTA → docs.hanzo.ai/<slug> (self-host docs).
 *
 * Both URLs derive from products-metadata so there is exactly one mapping
 * from slug to deploy URL and one from slug to docs URL.
 */

import React from 'react'
import { Rocket, BookOpen, ArrowRight } from 'lucide-react'
import { deployUrl, docsUrl, getProductMetadata } from '@/lib/constants/products-metadata'

type Props = {
  slug: string
  /** Optional pretty product name; defaults to the slug */
  name?: string
  className?: string
}

export function DeployBlock({ slug, name, className = '' }: Props) {
  const meta = getProductMetadata(slug)
  const deploy = deployUrl(slug)
  const docs = docsUrl(slug)
  const displayName = name ?? slug

  return (
    <section
      data-testid="deploy-block"
      className={`py-16 px-4 md:px-8 border-t border-border ${className}`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
          Get {displayName}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
          {meta?.tagline ?? 'Deploy in seconds or self-host with the open-source release.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            data-testid="deploy-cta"
            href={deploy}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            <Rocket className="w-4 h-4" />
            Deploy to Cloud
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            data-testid="self-host-cta"
            href={docs}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm border border-border bg-transparent hover:bg-secondary text-foreground transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Self-host
          </a>
        </div>
      </div>
    </section>
  )
}

export default DeployBlock
