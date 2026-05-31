'use client'

/**
 * ProductFooter — single composite block that goes at the bottom of every
 * product page so they all share an identical OSS attribution + deploy CTA.
 *
 * Existing bespoke pages keep their bespoke content above; the footer adds
 * the canonical structural blocks that the audit + test suite expect.
 */

import React from 'react'
import { OssAttribution } from './OssAttribution'
import { DeployBlock } from './DeployBlock'

type Props = {
  slug: string
  name: string
}

export function ProductFooter({ slug, name }: Props) {
  return (
    <>
      <OssAttribution slug={slug} />
      <DeployBlock slug={slug} name={name} />
    </>
  )
}

export default ProductFooter
