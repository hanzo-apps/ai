'use client'

import { Users, ArrowUpRight } from 'lucide-react'
import { Page, PageHero, Section, Prose, Cta } from '@/components/marketing/page-kit'
import { testimonials } from '@/lib/data/testimonials'
import Link from 'next/link'
import { Box } from '@hanzo/ui'

export default function CustomersPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Customers"
        icon={Users}
        title="Teams building on Hanzo"
        lede="Hardware, health, media and fintech companies run production workloads on the platform. Here is what they say about it."
      />

      <Section>
        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.company}
              className="flex flex-col rounded-xl border border-border p-5 transition-colors hover:border-foreground/30"
            >
              <figcaption className="mb-3 text-sm font-medium text-foreground">{t.company}</figcaption>
              <blockquote className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <Box className="text-xs text-muted-foreground">
                <span className="text-foreground">{t.author}</span> · {t.role}
              </Box>
            </figure>
          ))}
        </Box>
      </Section>

      <Section title="Build on the same platform">
        <Prose>
          <p>
            The infrastructure behind these deployments is open source and available to everyone. Start with the{' '}
            <Link href="/learn">docs</Link>, browse <a href="https://oss.hanzo.ai/">deployable applications</a>, or{' '}
            <Link href="/contact">talk to us</Link> about your workload.
          </p>
        </Prose>
        <Box className="mt-6">
          <Cta href="/contact" icon={ArrowUpRight}>
            Talk to us
          </Cta>
        </Box>
      </Section>
    </Page>
  )
}
