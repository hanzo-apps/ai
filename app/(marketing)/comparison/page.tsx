import type { Metadata } from 'next'
import Comparison from '@/components/marketing/Comparison'
import { PageHero } from '@/components/marketing/page-kit'

export const metadata: Metadata = {
  title: 'What it costs to run it yourself — Hanzo',
  description:
    'The open-source stacks people reach for, priced from the compute their own compose files reserve, and the operating work that is not a line item.',
}

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Comparison"
        title="Buy it, or run it"
        lede="Everything Hanzo does is open source, so the honest question is not whether you could run it — you could — but what that costs. These are real numbers from real compose files."
      />
      <Comparison />
    </>
  )
}
