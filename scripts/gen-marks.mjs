#!/usr/bin/env node
// Generates public/marks/<id>.svg — the monochrome brand marks worn by the
// surface grid ("Hanzo AI, native in every tool you use.").
//
// Run: node scripts/gen-marks.mjs
//
// One table, below, is the whole provenance record: every mark id in
// data/surfaces.ts resolves to exactly one source.
//
//   si:<slug>     simple-icons (CC0-1.0) — the canonical monochrome brand set.
//   local:<file>  already vendored under public/providers/ for the provider grid;
//                 copied so the surface grid owns its own namespace and neither
//                 grid can break the other by re-keying a catalog id.
//
// A surface with NO entry here carries `mark: null` and renders the monogram
// plate instead. That is deliberate, not a gap: simple-icons carries no
// Microsoft marks (Edge, VS Code, Microsoft 365, Outlook, Teams), and has since
// dropped Slack, Salesforce and Canva; it never carried DocuSign, Procore, Clio
// or Epic Systems. Those are trademarks we hold no redistribution licence for.
// Pin the CURRENT simple-icons and take what it ships — reaching back to an
// older release to recover a mark its owner had removed is not a licence. A
// uniform monogram is the honest fallback; a look-alike pictograph is not.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public/marks')
const SI = join(ROOT, 'node_modules/simple-icons/icons')
const PROVIDERS = join(ROOT, 'public/providers')

const SOURCES = {
  chrome: 'si:googlechrome',
  firefox: 'si:firefoxbrowser',
  safari: 'si:safari',
  cursor: 'local:cursor',
  windsurf: 'local:windsurf',
  antigravity: 'local:antigravity',
  jetbrains: 'local:jetbrains',
  google: 'si:google',
  figma: 'si:figma',
  sketch: 'si:sketch',
  zoom: 'si:zoom',
  notion: 'si:notion',
  hubspot: 'si:hubspot',
  shopify: 'si:shopify',
  zendesk: 'si:zendesk',
  github: 'si:github',
  gitlab: 'si:gitlab',
  jupyter: 'si:jupyter',
  raycast: 'si:raycast',
  quickbooks: 'si:quickbooks',
  claude: 'local:claude',
}

mkdirSync(OUT, { recursive: true })

let written = 0
for (const [id, source] of Object.entries(SOURCES)) {
  const [kind, key] = source.split(':')
  const from = kind === 'si' ? join(SI, `${key}.svg`) : join(PROVIDERS, `${key}.svg`)
  if (!existsSync(from)) throw new Error(`mark "${id}": source not found — ${from}`)
  // The mask reads alpha only, so <title> and any fill are inert. Drop the title
  // so the file carries no text a screen reader could reach through an <img>.
  const svg = readFileSync(from, 'utf8').replace(/<title>.*?<\/title>/s, '')
  writeFileSync(join(OUT, `${id}.svg`), svg)
  written++
}

console.log(`wrote ${written} marks → public/marks/`)
