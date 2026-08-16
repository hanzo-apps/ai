'use client'

import { Cookie } from 'lucide-react'
import { Page, PageHero, Section, Prose, CardGrid, type CardItem } from '@/components/marketing/page-kit'
import Link from 'next/link'

const CATEGORIES: CardItem[] = [
  {
    title: 'Strictly necessary',
    description:
      'Set when you sign in, to keep you signed in and to protect the session. The site cannot work without these, so they are not optional.',
  },
  {
    title: 'Analytics',
    description:
      'Used to count visits and understand which pages are useful. Hanzo runs its own analytics rather than sending this to a third-party ad network.',
  },
  {
    title: 'Security and delivery',
    description:
      'Our CDN may set identifiers to route traffic, mitigate abuse and keep the site available.',
  },
]

export default function CookiesPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Legal"
        icon={Cookie}
        title="Cookie Policy"
        lede="How Hanzo uses cookies and similar storage on hanzo.ai and our other properties."
      />

      <Section title="What we use">
        <Prose>
          <p>
            Browsing the public marketing pages does not require you to accept anything: these pages set no cookies of
            their own. Storage comes into play when you sign in, and when we measure aggregate traffic.
          </p>
        </Prose>
      </Section>

      <Section title="Categories">
        <CardGrid items={CATEGORIES} columns={3} />
      </Section>

      <Section title="Your choices">
        <Prose>
          <p>
            Every browser can block or delete cookies and clear site storage, and most let you do this per site. Blocking
            strictly necessary storage will sign you out and prevent signing back in; blocking analytics storage does not
            affect how the product works.
          </p>
          <p>
            Hanzo does not sell personal information and does not use these cookies for cross-site advertising.
          </p>
        </Prose>
      </Section>

      <Section title="More">
        <Prose>
          <p>
            This policy sits alongside our <Link href="/privacy">Privacy Policy</Link> and{' '}
            <Link href="/terms">Terms of Service</Link>. If you have a question about it, or want to make a data request,
            contact us at <Link href="/contact">hanzo.ai/contact</Link>.
          </p>
        </Prose>
      </Section>
    </Page>
  )
}
