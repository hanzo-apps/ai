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
        title="An app backend in one file"
        lede="Base is a single Go binary that serves your data, your users, your files, live updates and scheduled work over one HTTP API. The store is a SQLite file on disk, so deploying is copying a binary and backing up is copying a file."
        ctas={[
          { label: 'Start free', href: CONSOLE, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (MIT). Runs as one binary — self-host or deploy managed on Hanzo Cloud.' }}
        what={{
          eyebrow: 'What is Hanzo Base',
          title: 'Declare a collection, get an API',
          sub: 'A collection is a real table with a schema you write down. The moment it exists it answers over HTTP, carries an access rule, streams its changes, and shows up in the admin. There is no code generation step and nothing to wire together.',
          pillars: [
            {
              icon: Database,
              title: 'Data',
              body: 'Records answer at /v1/collections/{name}/records — list, read, create, update, delete, with paging, sorting and a filter language over every field you declared. Schema changes are migrations. SQLite is the default store; hand Base a Postgres DSN and the same API runs on that instead.',
            },
            {
              icon: Fingerprint,
              title: 'Auth is Hanzo IAM',
              body: 'Base keeps no password and has no login form. It verifies the token IAM signed and reads the identity out of it — that is the whole of authentication. One account across every Hanzo surface, and no reset flow of your own to get wrong.',
            },
            {
              icon: Radio,
              title: 'Files and live updates',
              body: 'Uploads go to object storage and are served through the same rule that guards the record pointing at them. Clients open one stream and receive records as they change, so a page stays current without asking again every few seconds.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'What you get',
          items: [
            { icon: Zap, title: 'The schema is the API', body: 'Define a collection and its records are addressable the same second, with an admin UI to browse and edit them. Nothing is scaffolded into your repo, so there is nothing to regenerate when the schema moves.' },
            { icon: Radio, title: 'One stream, no polling', body: 'Subscribe over server-sent events and records arrive as they change. A browser cannot put a header on that request, so the stream is opened with a short-lived grant minted on an ordinary authenticated call — your access token never travels in a URL.' },
            { icon: ShieldCheck, title: 'Rules run before the count', body: 'An access rule is a predicate on the collection, folded into the query ahead of paging and ahead of the count — so a row you may not read is not counted either. With nobody signed in, a rule naming the caller matches nothing.' },
            { icon: FileStack, title: 'Files behind the same rule', body: 'An upload is guarded by the rule on the record that references it, and reading one takes a token minted per request rather than a URL that works forever.' },
            { icon: Server, title: 'A file per tenant', body: 'Each org gets its own SQLite file, opened under a key derived for that org — a different tenant is a different file, so no query can reach across two. Point Base at object storage and the write-ahead log streams there continuously, encrypted before it leaves the process, and you can restore to a moment.' },
            { icon: Boxes, title: 'Server-side logic, fenced in', body: 'A function is a record in a collection, so the collection’s rules decide who may run it. It runs in-process with two calls bound — read a record, read a list — and no network, no filesystem, no shell. Whatever the first version binds is supported forever, which is why that list is short.' },
          ],
        }}
        finalCta={{
          icon: Database,
          title: 'Run the binary',
          sub: 'Deploy Base managed on Hanzo Cloud, or run it yourself on a laptop, a box, or a cluster. Same API in all four places.',
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
