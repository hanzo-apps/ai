import Link from 'next/link'
import { ProviderMark } from '@/components/models/ProviderMark'
import type { ModelData } from '@/lib/models'
import {
  fetchModels,
  getOrgAndSlug,
  orgDisplayName,
  formatContext,
  getModelContext,
  MODALITY_STYLES,
  modelPagePath,
} from '@/lib/models'

export const revalidate = 3600

// enso is the frontier family; Zen is the open-weight family. Both are trained
// and served here, so both lead. Anything not in this list groups by the lab
// that trained it, further down.
const OURS = [
  'enso',
  'enso-flash',
  'enso-ultra',
  'zen5',
  'zen5-pro',
  'zen5-coder',
  'zen5-flash',
  'zen-vl',
  'zen-image',
  'zen-embedding',
]

function ModalityBadge({ modality }: { modality: string }) {
  const style = MODALITY_STYLES[modality] ?? { bg: 'bg-secondary', text: 'text-muted-foreground' }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${style.bg} ${style.text}`}
    >
      {modality}
    </span>
  )
}

function ModelCard({ model }: { model: ModelData }) {
  const { org } = getOrgAndSlug(model.id)
  const ctx = getModelContext(model)
  return (
    <Link
      href={modelPagePath(model.id)}
      className="p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-all group flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <ProviderMark org={org} model={model.id} />
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">{model.name}</div>
            <div className="text-xs text-muted-foreground font-mono">{model.id}</div>
          </div>
        </div>
        {ctx && (
          <span className="shrink-0 text-xs text-muted-foreground bg-secondary rounded px-1.5 py-0.5">
            {formatContext(ctx)}
          </span>
        )}
      </div>
      {model.description && <p className="text-xs text-muted-foreground line-clamp-2">{model.description}</p>}
      {model.modalities && model.modalities.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {model.modalities.slice(0, 3).map((m) => (
            <ModalityBadge key={m} modality={m} />
          ))}
        </div>
      )}
    </Link>
  )
}

export default async function ModelsPage() {
  const data = await fetchModels()
  const available = data.models.filter((m) => m.status !== 'coming-soon')
  const byId = new Map(available.map((m) => [m.id, m]))

  // Group by org
  const byOrg: Record<string, typeof available> = {}
  for (const model of available) {
    const { org } = getOrgAndSlug(model.id)
    if (!byOrg[org]) byOrg[org] = []
    byOrg[org].push(model)
  }

  // Sort orgs by model count descending, but put hanzo first
  const sortedOrgs = Object.entries(byOrg).sort(([a, ac], [b, bc]) => {
    if (a === 'hanzo') return -1
    if (b === 'hanzo') return 1
    return bc.length - ac.length
  })

  // Our own families, in the order we would recommend them. Ids are looked up
  // in the live catalogue rather than copied out of it, so a model we stop
  // serving drops off this page instead of 404-ing from it. The previous
  // selector asked for `category === 'flagship'`, which no model in the
  // catalogue has ever carried — so every slot fell through to the
  // third-party clause and our own models never appeared.
  const ours = OURS.flatMap((id) => byId.get(id) ?? [])
  const oursIds = new Set(ours.map((m) => m.id))
  const elsewhere = available
    .filter((m) => getOrgAndSlug(m.id).org !== 'hanzo' && !oursIds.has(m.id))
    .slice(0, 9)

  const codeExample = `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "zen5",
    "messages": [{ "role": "user", "content": "Hello" }]
  }'`

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-900 px-4 pb-20 pt-32 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 68%)', filter: 'blur(100px)' }}
        />
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-white/5 px-4 py-2 text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Live from api.hanzo.ai
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
              enso and Zen, on one endpoint
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-neutral-300">
            enso is our frontier family. Zen is our open-weight family — call it here or run the weights
            yourself. Models from other labs answer on the same endpoint when you need one.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Get free API key
            </Link>
            <Link
              href="https://docs.hanzo.ai"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-8 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400"
            >
              View docs
            </Link>
          </div>
        </div>
      </section>

      {/* Our models */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Our models</h2>
          <p className="text-muted-foreground mb-8">
            <span className="text-foreground font-medium">enso</span> is our frontier family;{' '}
            <span className="text-foreground font-medium">Zen</span> is our open-weight family, with the weights
            published. Both are trained here and served here.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ours.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Provider grid */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Browse by lab</h2>
          <p className="text-muted-foreground mb-8">Every model on the endpoint, grouped by who trained it.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {sortedOrgs.map(([org, models]) => (
              <Link
                key={org}
                href={`/models/${org}`}
                className="p-4 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/50 transition-all group flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <ProviderMark org={org} />
                  <span className="font-medium text-sm truncate">{orgDisplayName(org)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {models.length} model{models.length !== 1 ? 's' : ''}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Models from other labs */}
      <section className="py-16 px-4 border-t border-border bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Models from other labs</h2>
          <p className="text-muted-foreground mb-8">
            Routed on the same endpoint, with the same key, when a workflow needs a specific one.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {elsewhere.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Code CTA */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border bg-secondary/20 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">One key, one host</h2>
              <p className="text-muted-foreground">
                Changing model is changing one string. The endpoint takes and returns the chat-completions
                JSON shape, so an HTTP client already written against that shape works once its base URL
                points at api.hanzo.ai/v1.
              </p>
            </div>
            <div className="rounded-xl bg-background border border-border overflow-hidden mb-8">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">typescript</span>
              </div>
              <pre className="p-4 text-xs text-foreground/90 font-mono overflow-x-auto leading-relaxed">
                <code>{codeExample}</code>
              </pre>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/signup"
                className="px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Get Free API Key
              </Link>
              <Link
                href="https://docs.hanzo.ai"
                className="px-6 py-3 rounded-lg border border-border text-sm font-medium hover:bg-secondary/50 transition-colors"
              >
                Read the Docs
              </Link>
              <Link
                href="/chat"
                className="px-6 py-3 rounded-lg border border-border text-sm font-medium hover:bg-secondary/50 transition-colors"
              >
                Try in Chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 px-4 border-t border-border bg-secondary/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">2</div>
            <div className="text-sm text-muted-foreground mt-1">Model families of our own</div>
          </div>
          <div>
            <div className="text-3xl font-bold">1</div>
            <div className="text-sm text-muted-foreground mt-1">Host</div>
          </div>
          <div>
            <div className="text-3xl font-bold">1</div>
            <div className="text-sm text-muted-foreground mt-1">API Key</div>
          </div>
          <div>
            <div className="text-3xl font-bold">$0</div>
            <div className="text-sm text-muted-foreground mt-1">To Start</div>
          </div>
        </div>
      </section>
    </div>
  )
}
