'use client'

import {
  Database,
  Cloud,
  Fingerprint,
  Radio,
  FileStack,
  ShieldCheck,
  Boxes,
  Server,
  Zap,
  Rocket,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const DOCS = 'https://docs.hanzo.ai/docs/base'
const GITHUB = 'https://github.com/hanzoai/base'
const CONSOLE = 'https://console.hanzo.ai'

export default function BasePage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Base · App backend"
        badgeIcon={Database}
        title="The backend in one file"
        lede="An embedded application backend — database, auth, file storage, and realtime — in a single deployable, with Hanzo IAM wired in natively. SQLite by default for instant local dev; scale out when you need to."
        ctas={[
          { label: 'Start free', href: CONSOLE, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (MIT). Runs as one binary — self-host or deploy managed on Hanzo Cloud.' }}
        what={{
          eyebrow: 'What is Hanzo Base',
          title: 'Everything an app backend needs, embedded',
          sub: 'Stop re-implementing auth, storage, and realtime for every project. Base ships them as one cohesive backend that grows from a laptop to production.',
          pillars: [
            {
              icon: Database,
              title: 'Database',
              body: 'A real database with schema, migrations, and a typed REST API generated for you — SQLite embedded by default, Postgres when you go multi-instance.',
            },
            {
              icon: Fingerprint,
              title: 'Auth via Hanzo IAM',
              body: 'Users, sessions, and OAuth handled by Hanzo IAM — one identity across every Hanzo surface, with no bespoke auth to build or maintain.',
            },
            {
              icon: Radio,
              title: 'Files & realtime',
              body: 'Object storage with access rules and live subscriptions over websockets — the pieces every app reinvents, built in from day one.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'Batteries included, nothing hidden',
          items: [
            { icon: Zap, title: 'Instant REST API', body: 'Every collection gets a typed CRUD API and an admin UI the moment you define it.' },
            { icon: Radio, title: 'Realtime subscriptions', body: 'Subscribe to records over websockets and push changes to clients without polling.' },
            { icon: ShieldCheck, title: 'Rules-based access', body: 'Per-collection read/write rules evaluated on the edge of every request.' },
            { icon: FileStack, title: 'File storage', body: 'Upload, transform, and serve files under the same access rules as your data.' },
            { icon: Server, title: 'SQLite → Postgres', body: 'Embedded SQLite for fast local dev; switch to Postgres for multi-instance production.' },
            { icon: Boxes, title: 'IAM-native SSO', body: 'Sign-in, org and tenant scoping, and audit come from Hanzo IAM out of the box.' },
          ],
        }}
        finalCta={{
          icon: Database,
          title: 'Stand up your backend in minutes',
          sub: 'Deploy Base on Hanzo Cloud, or run the single binary anywhere you like.',
          buttons: [
            { label: 'Deploy on Hanzo Cloud', href: CONSOLE, icon: Rocket },
            { label: 'Read the docs', href: DOCS },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      />
      <ProductFooter slug="base" name="Base" />
    </>
  )
}
