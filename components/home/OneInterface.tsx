import { Box } from '@hanzo/ui'

/**
 * One system-wide property that is not a product: one interface.
 *
 * "Great developer experience" is a claim every platform makes and none can
 * demonstrate in a sentence. The demonstrable version is symmetry — an agent, a
 * person in Hanzo Team, the console, the CLI, the SDK, the API and MCP all reach
 * the same resources under the same identity and the same policy, and leave the
 * same audit trail. That is WHY the experience is coherent, which is a stronger
 * thing to say than that it is. The four lines at the bottom say it; the
 * paragraph that used to sit under the heading only announced it, so it went.
 *
 * `IaC` is hanzoai/operator — declarative resources for every Hanzo service,
 * reconciled from git, with its own page at /operator. It is NOT Terraform:
 * there is no hanzoai provider on the Terraform registry, no provider repo in
 * the estate, and nothing in this repo documenting one. `Terraform` was the
 * eighth chip once and named a surface that does not exist.
 *
 * This file used to render a SECOND section, headed "Every agent has an
 * identity.", stating the security guarantees and linking to /security. That
 * section now lives in `Security.tsx`. Both rendered together printed one
 * heading twice.
 */
const SURFACES = ['Team', 'Chat', 'Console', 'CLI', 'SDK', 'API', 'MCP', 'IaC']

export default function OneInterface() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <Box className="mx-auto max-w-2xl text-center">
        <h2 className="hz-display text-4xl sm:text-5xl">One system. Every interface.</h2>
      </Box>

      <Box className="mt-10 flex flex-wrap justify-center gap-2">
        {SURFACES.map((s) => (
          <span
            key={s}
            className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-300"
          >
            {s}
          </span>
        ))}
      </Box>

      <Box className="mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed text-neutral-300">
        <p>Same resources.</p>
        <p>Same identity.</p>
        <p>Same policies.</p>
        <p>Same audit trail.</p>
      </Box>
    </section>
  )
}
