'use client'

import { Section } from '@/components/marketing/page-kit'
import blueprints from '@/lib/data/blueprints.json'
import { Box } from '@hanzo/ui'

/**
 * What the same software costs when you run it.
 *
 * EVERY FIGURE IS THE API'S. `apps/blueprint` parses each stack's own
 * docker-compose, sums what its services reserve, and prices that through one
 * rate card it publishes with the answer; `scripts/sync-blueprints.mjs` fetches
 * it at build time. Nothing here is typed by hand, so the page cannot disagree
 * with the endpoint a customer can call themselves.
 *
 * WHAT THIS PAGE MAY NOT DO is win by arithmetic. The honest comparison is
 * compute against compute — a figure both sides can check — and then the parts
 * that are real and NOT in the number, said plainly rather than left for the
 * reader to discover. A page that added an invented "engineer-hours" line to
 * make the total look better would be the fabricated number the blueprint plane
 * exists to avoid, and nobody believes it anyway.
 *
 * So: the machines are priced, the operating is described, and the reader does
 * their own sum. That is the strongest version of this argument that is also
 * true.
 */

const usd = (cents: number) =>
  `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

/** What you are still holding after the machines are paid for. */
const OPERATING = [
  ['Upgrades', 'Every image above has a release cadence, and a CVE in any of them is yours to notice and roll.'],
  ['Backups', 'Taking one is a cron. Proving a restore works is a rehearsal, and it is the half that gets skipped.'],
  ['Availability', 'One replica of each is a single point of failure. A second is roughly twice the compute plus the state problem.'],
  ['Identity', 'Each of these has its own users and its own idea of an admin. Joining them is a project.'],
  ['On-call', 'Someone answers when it pages at 3am, and that person is on your payroll.'],
]

export default function Comparison() {
  const rows = blueprints.blueprints
  const total = rows.reduce((n, b) => n + b.centsPerMonth, 0)

  return (
    <>
      <Section
        title="Run it yourself, and here is the bill"
        lede="The open-source stacks people reach for, priced from the compute their own compose files reserve."
      >
        <Box className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500">
                <th className="py-3 pr-4 font-medium">Stack</th>
                <th className="py-3 pr-4 font-medium">Images it runs</th>
                <th className="py-3 pr-4 text-right font-medium tabular-nums">vCPU</th>
                <th className="py-3 pr-4 text-right font-medium tabular-nums">GB</th>
                <th className="py-3 text-right font-medium tabular-nums">Compute</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} className="border-b border-neutral-900">
                  <td className="py-3 pr-4 font-medium text-white">{b.id}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-neutral-500">{b.images.join(' · ')}</td>
                  <td className="py-3 pr-4 text-right tabular-nums text-neutral-400">{b.vcpuHr}</td>
                  <td className="py-3 pr-4 text-right tabular-nums text-neutral-400">{b.gbHr}</td>
                  <td className="py-3 text-right tabular-nums text-neutral-200">{usd(b.centsPerMonth)}/mo</td>
                </tr>
              ))}
              <tr>
                <td className="py-3 pr-4 font-medium text-white" colSpan={4}>
                  All of them, running
                </td>
                <td className="py-3 text-right font-medium tabular-nums text-white">{usd(total)}/mo</td>
              </tr>
            </tbody>
          </table>
        </Box>

        {/* The basis travels with the number, because a cost a reader cannot
            check is a number they are asked to take on faith. */}
        <p className="mt-6 text-sm leading-relaxed text-neutral-500">
          Compute only, from each stack&rsquo;s own compose file:{' '}
          <span className="text-neutral-400">{blueprints.rateCard?.basis}</span>. One replica of each,
          at the footprint the file reserves. Storage, egress and anything with a GPU are not in it —
          serving a model is a GPU, and no compose file above asks for one.
        </p>
      </Section>

      <Section
        title="And the part that is not a line item"
        lede="The machines are the cheap half. This is what you are holding once they are paid for."
      >
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {OPERATING.map(([term, def]) => (
            <div key={term}>
              <dt className="text-sm font-medium text-white">{term}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-neutral-400">{def}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm leading-relaxed text-neutral-500">
          We have not costed that list, and will not: an invented engineer-hours figure would be
          worth less than the arithmetic you can do yourself, knowing your own team. What Hanzo
          replaces is the whole column — one identity, one bill, one thing that pages someone else.
        </p>
      </Section>
    </>
  )
}
