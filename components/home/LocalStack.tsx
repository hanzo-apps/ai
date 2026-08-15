'use client'

import { motion } from '@/components/motion'
import { ArrowUpRight } from 'lucide-react'
import { SH } from './nav-data'

/**
 * The claim this site was not making.
 *
 * hanzo.ai said nothing about running Hanzo yourself. Measured on the live
 * apex: the words `locally`, `localhost`, `on your machine`, `laptop`,
 * `offline` and `air-gap` returned zero matches, and the only self-host
 * reference on the whole page was the trailing half of one sentence in card 03
 * of BuildStory. The OSS products that make the claim true — desktop, the
 * engine, the ML library — were named nowhere outside the footer's "Install"
 * column.
 *
 * That is the differentiator, so it leads. This section sits directly under the
 * composer, ahead of the Enso flagship, because "you can run this without us"
 * is the thing a developer arrives wanting to know and the thing no hosted
 * competitor can answer.
 *
 * Every repo named here is PUBLIC and unarchived, checked against the GitHub
 * API. `hanzoai/node` is deliberately named in prose but NOT linked: desktop
 * genuinely bundles it (`apps/hanzo-desktop/src-tauri/tauri.conf.json` lists
 * `external-binaries/hanzo-node/hanzo-node` under `externalBin`), but the repo
 * is private, so a link would be a 404 for every logged-out visitor. Do not add
 * the link back until the repo is public — check, do not assume.
 *
 * The Desktop card said "ships the agent node AND the inference engine inside
 * the bundle, so it answers on first launch". Half of that was false and it is
 * worth recording why, because the mistake is easy to repeat: `externalBin`
 * declares hanzo-node, deno and uv and NOTHING ELSE, the
 * `external-binaries/hanzo-engine/` directory in the tree is EMPTY, and
 * node's Cargo.toml has `hanzo_engine` commented out. The engine is a separate
 * native service on :36900 (chat) and :36901 (embeddings), which the app finds
 * — `src-tauri/src/commands/engines.rs` browses `_hanzo-engine._tcp.local.`
 * over mDNS. A directory existing next to the bundled sidecars is not evidence
 * that its contents ship. Read the bundle config, not the folder listing.
 */

/**
 * A piece, the way IN to it, and the way to READ it.
 *
 * All four cards used to lead with "View source" and nothing else, under a
 * heading that says "Install options". A reader there wants the thing, and was
 * offered a repository — so `get` is the primary action now and it is the
 * shortest real path to running each piece.
 *
 * EVERY href here answered 200 before it was written down, and the label says
 * only what the destination actually is: "Download" where a download page
 * exists, "Docs" where the honest answer is a page that explains it. There is
 * no ML page on this site and no desktop page in the docs; neither is invented.
 * A card that promises a download and 404s is worse than one that says nothing.
 *
 * Source is `git.hanzo.ai` — the forge is where our code lives and github is a
 * mirror of it, so the landing links to the original.
 */
interface Piece {
  name: string
  body: string
  get: { label: string; href: string }
  source: string
}

const FORGE = 'https://git.hanzo.ai/hanzoai'
const DOCS = 'https://docs.hanzo.ai/docs'

const PIECES: Piece[] = [
  {
    name: 'Desktop',
    body: 'The whole stack as an app. The agent node ships inside the bundle as a sidecar; inference comes from the engine, running locally or on your LAN.',
    get: { label: 'Download', href: '/desktop' },
    source: `${FORGE}/desktop`,
  },
  {
    name: 'CLI',
    // The one-liner is already on this page, directly above, so this is the
    // page that covers the other ways in rather than a second copy of it.
    body: 'One static Rust binary — a coding agent, the MCP server, and every product of the cloud from your terminal. No runtime, no daemon.',
    get: { label: 'Install', href: `${DOCS}/services/platform/getting-started/cli` },
    source: `${FORGE}/cli`,
  },
  {
    name: 'Engine',
    body: 'The inference engine that actually runs the model. LLM and embedding serving in Rust, built for local hardware first.',
    get: { label: 'Docs', href: `${DOCS}/services/engine` },
    source: `${FORGE}/engine`,
  },
  {
    name: 'ML',
    body: 'The compute core underneath: multi-backend tensors across CPU, CUDA, Metal, ROCm and Vulkan, with quantization built in.',
    get: { label: 'Docs', href: `${DOCS}/services/ml` },
    source: `${FORGE}/ml`,
  },
]

export default function LocalStack() {
  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">Run it on your own machine</h2>
          <p className="mt-4 text-lg text-neutral-400">
            Most AI platforms hand you an API key. We hand you the platform. One binary, and{' '}
            <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-[15px] text-neutral-300">
              hanzo up
            </code>{' '}
            brings up the cloud itself — control plane, identity, secrets, gateway, storage,
            pub/sub — on your own hardware.
          </p>
          {/* neutral-400, not 500: #737373 on this black measures 4.43:1 at
              15px, just under AA's 4.5. The tier below the lead paragraph is
              carried by size here, not by a shade that fails to be readable. */}
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
            It is the same code we run in our own cloud, under an open licence. Point a client at{' '}
            <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-neutral-300">localhost</code> or
            at <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-neutral-300">api.hanzo.ai</code>{' '}
            — same API, nothing else changes.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <code className="w-full max-w-md overflow-x-auto whitespace-nowrap rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-left text-sm text-neutral-300">
              curl -fsSL https://hanzo.sh | sh
            </code>
            <a
              href={SH}
              className="hz-tap inline-flex items-center gap-1.5 text-sm font-medium text-white"
            >
              Install options
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PIECES.map((p, i) => (
            /* A CARD, not a link. It carries two destinations — the way in and
               the source — and an anchor cannot hold another anchor. */
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative flex min-h-[200px] flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-7 transition-colors hover:border-neutral-700"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    'radial-gradient(120% 120% at 80% 0%, color-mix(in srgb, var(--pure-white) 8%, transparent) 0%, transparent 55%)',
                }}
              />
              <h3 className="relative z-10 text-xl font-semibold text-white">{p.name}</h3>
              <p className="relative z-10 mt-2 text-[15px] leading-relaxed text-neutral-400">{p.body}</p>
              <div className="relative z-10 mt-auto flex items-center gap-4 pt-6">
                <a
                  href={p.get.href}
                  className="hz-tap items-center gap-1.5 text-sm font-medium text-white no-underline hover:no-underline"
                >
                  {p.get.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={p.source}
                  className="hz-tap items-center text-sm text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline"
                >
                  Source
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
