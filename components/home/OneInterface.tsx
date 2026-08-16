/**
 * Two system-wide properties that are not products: one interface, and trust.
 *
 * "Great developer experience" is a claim every platform makes and none can
 * demonstrate in a sentence. The demonstrable version is symmetry — an agent, a
 * person in Hanzo Team, the console, the CLI, the SDK, the API and MCP all reach
 * the same actions under the same identity and the same policy, and leave the
 * same audit trail. That is WHY the experience is coherent, which is a stronger
 * thing to say than that it is.
 *
 * The security section states properties, not certifications. "Built for
 * regulated, private and sovereign environments" is honest; naming a compliance
 * regime we have not had independently verified and kept current would not be,
 * and a landing page is exactly where that kind of claim gets made carelessly.
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

const GUARANTEES = [
  'Every secret is scoped.',
  'Every execution is isolated.',
  'Every approval is attributable.',
  'Every change is auditable.',
]

export default function OneInterface() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            One interface
          </p>
          <h2 className="hz-display text-4xl sm:text-5xl">
            One interface for people and agents.
          </h2>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-neutral-400">
            Every capability is reachable the same way, whoever is asking.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {SURFACES.map((s) => (
            <span
              key={s}
              className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-300"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-neutral-300">
          <p>Same actions.</p>
          <p>Same identity.</p>
          <p>Same policies.</p>
          <p>Same audit trail.</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Security
          </p>
          <h2 className="hz-display text-4xl sm:text-5xl">Every agent has an identity.</h2>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-neutral-400">
            Every action is authorized. Identity, authorization, KMS, zero trust, private
            networking, policy, audit and post-quantum primitives are part of the operating
            system — not integrations added afterward. Built for regulated, private and
            sovereign environments.
          </p>
        </div>

        <ul className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-neutral-300">
          {GUARANTEES.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href="/security"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white transition-colors hover:border-neutral-400"
          >
            Explore security
          </a>
        </div>
      </section>
    </>
  )
}
