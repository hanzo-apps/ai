'use client'

/**
 * Minimal product page used for products without a bespoke marketing page.
 *
 * Composition (one and only one shape):
 *   Hero → OssAttribution → DeployBlock
 *
 * Every value comes from lib/constants/products-metadata.ts so there is
 * exactly one source per product. Pages that need richer content should
 * compose these three blocks themselves rather than fork this file.
 */

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Github } from 'lucide-react'
import { getProductMetadata, deployUrl } from '@/lib/constants/products-metadata'
import { OssAttribution } from './OssAttribution'
import { DeployBlock } from './DeployBlock'

type Props = {
  slug: string
  name: string
}

export function ProductStub({ slug, name }: Props) {
  const meta = getProductMetadata(slug)
  if (!meta) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-medium mb-4">{name}</h1>
          <p className="text-muted-foreground">Product metadata missing for slug “{slug}”.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero — uniform gradient + buttons across every stub */}
      <section
        data-testid="product-hero"
        className="relative pt-20 pb-16 px-4 md:px-8 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.12]"
            style={{
              background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-6">
            {name}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {meta.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              data-testid="primary-cta"
              href={deployUrl(slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              Deploy to Cloud
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              data-testid="github-cta"
              href={meta.github_repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm border border-border bg-transparent hover:bg-secondary text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <OssAttribution slug={slug} />
      <DeployBlock slug={slug} name={name} />
    </div>
  )
}

export default ProductStub
