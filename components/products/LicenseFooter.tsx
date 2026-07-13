/**
 * LicenseFooter — one-line open-source license notice for product pages and
 * docs. Where OssAttribution renders the full attribution block (license,
 * repo, upstream credit), this is the lightweight single line for surfaces
 * that only need the copyright + NOTICE pointer.
 */

import React from 'react'

type Props = {
  /** Product name rendered in the notice, e.g. "Hanzo Chat" */
  product: string
  className?: string
}

export function LicenseFooter({ product, className = '' }: Props) {
  return (
    <p
      data-testid="license-footer"
      className={`text-xs text-muted-foreground ${className}`}
    >
      &copy; Hanzo AI Inc. {product} incorporates open-source software &mdash; see NOTICE.
    </p>
  )
}

export default LicenseFooter
