import type { Metadata } from 'next'

import { goImport } from '@/lib/go-modules'

// This path is a product page AND the import path of a Go module. The page is a
// client component and cannot carry metadata, so the segment's layout does: the
// tag is invisible to a reader and is the whole of what `go get hanzo.ai/docdb`
// needs. Defined once in lib/go-modules.
export const metadata: Metadata = { other: goImport('docdb') }

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
