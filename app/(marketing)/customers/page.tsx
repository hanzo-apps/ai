'use client'

import { Users, ArrowUpRight } from 'lucide-react'
import { Page, PageHero, Section, Prose, Cta } from '@/components/marketing/page-kit'
import { testimonials } from '@/lib/data/testimonials'

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.company}
              className="flex flex-col rounded-xl border border-border p-5 transition-colors hover:border-foreground/30"
            >
              <figcaption className="mb-3 text-sm font-medium text-foreground">{t.company}</figcaption>
              <blockquote className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="text-xs text-muted-foreground">
                <span className="text-foreground">{t.author}</span> · {t.role}
              </div>
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Build on the same platform">
        <Prose>
          <p>
            The infrastructure behind these deployments is open source and available to everyone. Start with the{' '}
            <a href="/learn">docs</a>, browse <a href="https://oss.hanzo.ai/">deployable applications</a>, or{' '}
            <a href="/contact">talk to us</a> about your workload.
          </p>
        </Prose>
        <div className="mt-6">
          <Cta href="/contact" icon={ArrowUpRight}>
            Talk to us
          </Cta>
        </div>
      </Section>
    </Page>
  )
}
