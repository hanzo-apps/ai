'use client'

import { motion } from '@/components/motion'
import { ArrowUpRight } from 'lucide-react'
import { SH } from './nav-data'
import { Box } from '@hanzo/ui'

/**
 * The claim this site was not making.
 *
 * hanzo.ai said nothing about running Hanzo yourself. Measured on the live
 * apex: the words `locally`, `localhost`, `on your machine`, `laptop`,
 * `offline` and `air-gap` returned zero matches, and the only self-host
 * reference on the whole page was the trailing half of one sentence in card 03
 * of BuildStory.
 *
 * That is the differentiator, so it leads. This section sits directly under the
 * composer, ahead of the Enso flagship, because "you can run this without us"
 * is the thing a developer arrives wanting to know and the thing no hosted
 * competitor can answer.
 *
 * THE INVENTORY MOVED. Four cards used to stand here — Desktop, CLI, Engine, ML
 * — each with a way in and a link to its source on git.hanzo.ai. That is an
 * install page, and hanzo.sh is the install page: the "Install options" tap
 * below reaches every one of them. Two facts from those cards are worth keeping
 * where a future editor will find them, because both were got wrong once and
 * cost a day each:
 *
 *   - `hanzoai/node` is bundled by desktop (`apps/hanzo-desktop/src-tauri/
 *     tauri.conf.json` lists it under `externalBin`) but the repo is PRIVATE, so
 *     it may be named in prose and never linked. Check before linking it.
 *   - Desktop does NOT bundle the inference engine. `externalBin` declares
 *     hanzo-node, deno and uv and nothing else, `external-binaries/hanzo-engine/`
 *     is an EMPTY directory, and node's Cargo.toml has `hanzo_engine` commented
 *     out. The engine is a separate native service on :36900 and :36901 that the
 *     app finds over mDNS (`src-tauri/src/commands/engines.rs`). A directory next
 *     to the bundled sidecars is not evidence that its contents ship.
 *
 * Source is `git.hanzo.ai` — the forge is where our code lives and github is a
 * mirror of it, so the landing links to the original.
 */
export default function LocalStack() {
  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
      <Box className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">Run the same OS yourself.</h2>
          <p className="mt-4 text-lg text-neutral-400">
            Most AI platforms give you an API key. Hanzo gives you the platform.
          </p>

          <Box className="mt-8 flex flex-col items-center gap-3">
            <code className="w-full max-w-md overflow-x-auto whitespace-pre rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-left text-sm text-neutral-300">
              {'curl -fsSL https://hanzo.sh | sh\nhanzo serve cloud'}
            </code>
          </Box>

          {/* neutral-400, not 500: #737373 on this black measures 4.43:1 at
              15px, just under AA's 4.5. The tier below the lead paragraph is
              carried by size here, not by a shade that fails to be readable. */}
          <p className="mt-6 text-[15px] leading-relaxed text-neutral-400">
            Run it locally, on your own cluster, or on Hanzo Cloud. Same API. Same operating model.
          </p>

          <Box className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SH}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Install options
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://git.hanzo.ai/hanzoai"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white transition-colors hover:border-neutral-400"
            >
              Read the source
            </a>
          </Box>
        </motion.div>
      </Box>
    </section>
  )
}
