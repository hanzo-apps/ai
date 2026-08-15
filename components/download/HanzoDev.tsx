'use client'

import { CopyButton } from '@hanzo/ui/product'
import { Row } from './Row'
import { SECTION, HOLD, HEAD, LEAD, MORE } from './style'

/**
 * The same product, from a terminal.
 *
 * One command, then the four things it installs, as rows. The section used to
 * open with a shimmering gradient headline of its own and close with two more
 * full-size CTAs, which made a footnote look like a second landing page.
 */
const INSTALL = 'curl -fsSL hanzo.sh | bash'

// Each tool names where it installs from. That is stated per tool rather than
// derived from a shared host: hanzo.sh/agents once 404ed because the page
// assumed every tool shipped from the same place, and one does not.
const TOOLS = [
  { name: 'hanzo-dev', note: 'AI coding agent', href: 'https://hanzo.sh/dev' },
  { name: 'hanzo-mcp', note: 'MCP server, 260+ tools', href: 'https://hanzo.sh/mcp' },
  { name: 'hanzo', note: 'Cloud CLI', href: 'https://hanzo.sh/cli' },
  { name: 'hanzo-agents', note: 'Multi-agent SDK', href: 'https://pypi.org/project/hanzo-agents/' },
]

const HanzoDev = () => (
  <section className={SECTION}>
    <div className={HOLD}>
      <h2 className={HEAD}>From the terminal</h2>
      <p className={LEAD}>The whole toolkit in one command — Python, Rust or JavaScript.</p>

      <div className="mt-8 flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3">
        <code className="flex-1 truncate font-mono text-sm text-neutral-300">{INSTALL}</code>
        <CopyButton value={INSTALL} label="Copy install command" id="install-cli" />
      </div>

      <div className="mt-8 grid gap-x-10 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <Row key={t.name} name={t.name} note={t.note} href={t.href} verb="Docs" />
        ))}
      </div>

      <a className={`${MORE} mt-6`} href="/dev">
        Everything for developers →
      </a>
    </div>
  </section>
)

export default HanzoDev
