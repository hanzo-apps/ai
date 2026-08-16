
import { Box } from '@hanzo/ui'/**
 * One system-wide property that is not a product: one interface.
 *
 * "Great developer experience" is a claim every platform makes and none can
 * demonstrate in a sentence. The demonstrable version is symmetry — an agent, a
 * person in Hanzo Team, the console, the CLI, the SDK, the API and MCP all reach
 * the same actions under the same identity and the same policy, and leave the
 * same audit trail. That is WHY the experience is coherent, which is a stronger
 * thing to say than that it is.
 *
 * This file used to render a SECOND section, headed "Every agent has an
 * identity.", stating the security guarantees and linking to /security. That
 * section now lives in `Security.tsx`, which states the same properties and
 * backs each one with the mechanism behind it, in the words /trust and
 * /security already use. Both rendered together printed one heading twice.
 */
/**
 * `Terraform` was the eighth chip and named a surface that does not exist: there
 * is no hanzoai provider on the Terraform registry, no provider repo in the
 * estate, and nothing in this repo that documents one. The infrastructure-as-code
 * surface we DO ship is hanzoai/operator — declarative resources for every Hanzo
 * service, reconciled from git — which has its own page at /operator.
 */
const SURFACES = [
  'AI agent',
  'Hanzo Team',
  'Console',
  'CLI',
  'SDK',
  'API',
  'MCP',
  'Infrastructure as code',
]

export default function OneInterface() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <Box className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            One interface
          </p>
          <h2 className="hz-display text-4xl sm:text-5xl">
            One interface for people and agents.
          </h2>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-neutral-400">
            Every capability is reachable the same way, whoever is asking.
          </p>
        </Box>

        <Box className="mt-12 flex flex-wrap justify-center gap-2">
          {SURFACES.map((s) => (
            <span
              key={s}
              className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-300"
            >
              {s}
            </span>
          ))}
        </Box>

        <Box className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-neutral-300">
          <p>Same actions.</p>
          <p>Same identity.</p>
          <p>Same policies.</p>
          <p>Same audit trail.</p>
        </Box>
    </section>
  )
}
