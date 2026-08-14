import Link from 'next/link'
import { ProviderMark } from '@/components/models/ProviderMark'
import { TryChat } from '@/components/models/TryChat'
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

// Enso is the frontier family; Zen is the open-weight family. Both are trained
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

// "Top models" shows one flagship per major lab, in the order we would point a
// visitor at. The labs are named; the model is resolved from the live catalogue,
// so a version bump follows on its own and a lab we stop serving simply drops
// out. This replaced "the first nine non-Hanzo ids in catalogue order", which
// led with whatever happened to sit at the top — obscure fine-tunes and a
// ~alias duplicate — while the names people know sat further down or never
// appeared.
const TOP_LABS = [
  'anthropic',
  'openai',
  'google',
  'deepseek',
  'qwen',
  'x-ai',
  'meta',
  'moonshotai',
  'mistral',
]

// A lab's canonical model: the headline general-purpose one, not a corner of its
// catalogue. Excludes alias namespaces (~lab), point variants (:free, :batch),
// speed/size/preview cuts, date-stamped snapshots, and specialised modalities
// (image, audio, embedding, …) — a "Top models" row wants the model a visitor
// pictures when they hear the lab's name, not its image endpoint.
function isCanonical(id: string): boolean {
  const slug = id.split('/').pop() ?? id
  if (id.startsWith('~') || id.includes(':')) return false
  if (/(?:^|[-])(?:fast|flash|mini|nano|tiny|small|lite|air|preview|exp|latest|thinking|code|base|instruct|image|video|audio|voice|tts|embed|embedding|rerank|ocr|guard|moderation)(?:$|[-])/i.test(slug))
    return false
  if (/-\d{6,}$/.test(slug)) return false
  return true
}

// The catalogue gives our own families the slug as their name ("enso"), while
// every other model already carries a proper one ("Zen5 — Next Generation",
// "Claude Opus"). When the name is just the id, title-case the slug so the card
// reads "Enso", "Enso Flash", "Zen5 Coder" — the mono line below still shows the
// exact API id, so nothing is lost.
function displayName(model: ModelData): string {
  if (model.name && model.name !== model.id) return model.name
  return model.id
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}

// A missing description comes back as "Zen model: <id>" — noise that only
// repeats the slug already shown, and wrong on the Enso cards (Enso is the
// frontier family, not a Zen model). Show a description only when it says
// something the id does not.
function realDescription(model: ModelData): string | undefined {
  const d = model.description?.trim()
  if (!d || d.toLowerCase().startsWith('zen model:')) return undefined
  return d
}

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
  const desc = realDescription(model)
  return (
    <Link
      href={modelPagePath(model.id)}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-secondary/30 p-5 transition-all hover:bg-secondary/50 hover:border-neutral-700 md:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <ProviderMark org={org} model={model.id} />
          <div className="min-w-0">
            <div className="truncate text-base font-medium tracking-tight">{displayName(model)}</div>
            <div className="truncate font-mono text-xs text-muted-foreground">{model.id}</div>
          </div>
        </div>
        {ctx && (
          <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            {formatContext(ctx)}
          </span>
        )}
      </div>
      {desc && <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>}
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

  // Group by lab. A leading `~` marks a latest-alias namespace of a lab that is
  // already here (`~anthropic` is Anthropic's "…-latest" pointers), so it folds
  // into the base — otherwise the grid carried a second, near-empty "~anthropic"
  // card beside "Anthropic". This matches markOf, which already strips `~`.
  const byOrg: Record<string, typeof available> = {}
  for (const model of available) {
    const org = getOrgAndSlug(model.id).org.replace(/^~/, '')
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
  // One canonical flagship per lab in TOP_LABS, in that order. `find` takes the
  // first canonical model the catalogue lists for the lab, which is its newest;
  // a lab with nothing canonical drops out rather than showing a variant.
  const top = TOP_LABS.flatMap((lab) => {
    const m = available.find(
      (x) => getOrgAndSlug(x.id).org.replace(/^~/, '') === lab && !oursIds.has(x.id) && isCanonical(x.id),
    )
    return m ? [m] : []
  })

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
      <section className="relative overflow-hidden border-b border-neutral-900 px-6 pb-24 pt-32 text-center md:pb-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 68%)', filter: 'blur(100px)' }}
        />
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-white/5 px-4 py-2 text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Live from api.hanzo.ai
          </div>
          <h1 className="mb-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
              Enso and Zen, on one endpoint
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-300 md:text-xl">
            Enso is our frontier family, and the router that picks for you when you ask for auto. Zen is the
            family whose weights we publish — call it here, or serve it yourself. Models from other labs answer
            at the same address with the same key, so choosing one is not a migration.
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
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">Our models</h2>
          <p className="mb-10 max-w-2xl text-base text-muted-foreground md:mb-12 md:text-lg">
            <span className="font-medium text-foreground">Enso</span> is our frontier family, and it leads several
            public benchmarks.{' '}
            <span className="font-medium text-foreground">Zen</span> is the family we publish the weights for, from
            0.6B up. Both are trained here and served here.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {ours.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Top models — the most-reached-for models from other labs, surfaced
          before the full lab index so a visitor sees names they know first. */}
      <section className="border-t border-border bg-secondary/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">Top models</h2>
          <p className="mb-10 max-w-2xl text-base text-muted-foreground md:mb-12 md:text-lg">
            One flagship per lab, so you can find the name you already know. They answer at the same address
            with the same key, and switching to one is changing a string.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {top.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by lab */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">Browse by lab</h2>
          <p className="mb-10 max-w-2xl text-base text-muted-foreground md:mb-12 md:text-lg">
            Every model on the endpoint, grouped by who trained it. Prices and context windows come from the
            live catalog, so what you read here is what you will be billed.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
            {sortedOrgs.map(([org, models]) => (
              <Link
                key={org}
                href={`/models/${org}`}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-secondary/20 p-5 transition-all hover:bg-secondary/50 hover:border-neutral-700"
              >
                <div className="flex items-center gap-3">
                  <ProviderMark org={org} />
                  <span className="truncate text-sm font-medium tracking-tight">{orgDisplayName(org)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {models.length} model{models.length !== 1 ? 's' : ''}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Try it — the shared chat, with the built-in model picker */}
      <section className="border-t border-border bg-secondary/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">Try it</h2>
          <p className="mb-10 max-w-2xl text-base text-muted-foreground md:mb-12 md:text-lg">
            Pick any model and start a thread — the same chat that runs at hanzo.chat, signed in with your
            Hanzo account.
          </p>
          <TryChat />
        </div>
      </section>

      {/* Code CTA */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border bg-secondary/20 p-8 md:p-12">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-3xl font-semibold tracking-tight">One key, one host</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Changing model is changing one string. The endpoint takes and returns the chat-completions
                JSON shape, so an HTTP client already written against that shape works once its base URL
                points at api.hanzo.ai/v1.
              </p>
            </div>
            <div className="mb-8 overflow-hidden rounded-xl border border-border bg-background">
              <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">typescript</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground/90">
                <code>{codeExample}</code>
              </pre>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/signup"
                className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Get Free API Key
              </Link>
              <Link
                href="https://docs.hanzo.ai"
                className="rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary/50"
              >
                Read the Docs
              </Link>
              <Link
                href="/chat"
                className="rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary/50"
              >
                Try in Chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-border bg-secondary/10 px-6 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          <div>
            <div className="text-3xl font-semibold">2</div>
            <div className="mt-1 text-sm text-muted-foreground">Model families of our own</div>
          </div>
          <div>
            <div className="text-3xl font-semibold">1</div>
            <div className="mt-1 text-sm text-muted-foreground">Host</div>
          </div>
          <div>
            <div className="text-3xl font-semibold">1</div>
            <div className="mt-1 text-sm text-muted-foreground">API Key</div>
          </div>
          <div>
            <div className="text-3xl font-semibold">$0</div>
            <div className="mt-1 text-sm text-muted-foreground">To Start</div>
          </div>
        </div>
      </section>
    </div>
  )
}
