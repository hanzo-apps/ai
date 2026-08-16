'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Github } from 'lucide-react'
import { loadPlans, fallbackPlans, credit, type SubscriptionPlan } from '@/lib/plans'
import { Box } from '@hanzo/ui'

/**
 * The price ladder — the SHAPE of the bill, on the front door.
 *
 * "Predictable pricing" is only worth writing beside the thing that makes it
 * checkable, so this renders the rows commerce actually charges rather than an
 * adjective about them. Every number here is read: the plan price, and the
 * credit the biller mints for it (`credit`, in lib/plans). Nothing in this file
 * is typed.
 *
 * ONE SOURCE, TWO RENDERINGS. `lib/plans.ts` is the catalog for every pricing
 * surface — GET /v1/billing/plans, with @hanzo/plans as the first-paint fallback
 * so the block is never blank and never last-remembered. `/pricing` renders the
 * same rows in FULL, with every feature and a checkout on each card. This
 * renders their SHAPE: what you pay, what comes back, and where it stops. A
 * visitor deciding whether the pricing is honest needs the shape; a visitor
 * deciding which plan to buy needs the page that sells them, and the link at the
 * bottom is the door to it. There is no checkout here, because a second checkout
 * is a second thing to keep right.
 *
 * A row priced at 0 is DROPPED, for the reason `PersonalPlans` drops it: there
 * is no free tier of the hosted product, and a $0 card in the lineup reads as
 * one. The free path is the open source, and it is stated as itself.
 */

const sellable = (p: SubscriptionPlan) => p.priceMonthly != null && p.priceMonthly > 0
const byPrice = (a: SubscriptionPlan, b: SubscriptionPlan) =>
  (a.priceMonthly ?? 0) - (b.priceMonthly ?? 0)

/** The plans of one category, live, with the published catalog as first paint. */
function usePlans(category: string): SubscriptionPlan[] {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(() =>
    fallbackPlans(category).filter(sellable).sort(byPrice),
  )
  useEffect(() => {
    loadPlans(category).then((live) => {
      const rows = live.filter(sellable).sort(byPrice)
      if (rows.length) setPlans(rows)
    })
  }, [category])
  return plans
}

export default function Ladder() {
  const personal = usePlans('personal')
  const team = usePlans('team')[0]
  // The credit line is only true of the plans that actually carry it, so it is
  // asked of them rather than asserted: every sellable plan above the entry one
  // returns its whole price as credit today, and if commerce reprices one of
  // them the sentence stops being drawn rather than becoming a lie.
  const returned = personal.filter((p) => credit(p) === p.priceMonthly)
  const allReturn = returned.length > 0 && returned.length === personal.length - 1

  return (
    <Box className="mt-14">
      <Box className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800 sm:grid-cols-4">
        {personal.map((plan) => {
          const c = credit(plan)
          return (
            <Box key={plan.id} className="bg-black p-5 sm:p-6">
              <p className="text-sm font-medium text-neutral-400">{plan.name}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                ${plan.priceMonthly}
                <span className="text-base font-normal text-neutral-500">/mo</span>
              </p>
              {c !== null && (
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  <span className="text-neutral-300">${c}</span> back as credit
                </p>
              )}
            </Box>
          )
        })}
      </Box>

      {allReturn && (
        <p className="mt-6 text-base leading-relaxed text-neutral-400">
          Above the entry plan, the fee is not a fee. Every dollar returns as credit you spend on
          inference, compute, or storage — so the plan buys you the software, and the usage is the
          only thing you are actually billed for.
        </p>
      )}

      <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-neutral-900 pt-8 sm:grid-cols-3">
        <div>
          <dt className="text-sm font-medium text-white">Teams</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-neutral-500">
            {team?.priceMonthly != null ? (
              <>
                ${team.priceMonthly} per person, minimum{' '}
                {Number(team.limits?.minSeats) || 2} seats. One org, one bill, SSO through Hanzo IAM.
              </>
            ) : (
              <>One org, one bill, SSO through Hanzo IAM.</>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-white">Enterprise</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-neutral-500">
            Dedicated capacity, on-premise or air-gapped, and terms written for you.{' '}
            <Link href="/contact-sales" className="text-neutral-300 underline underline-offset-4 hover:text-white">
              Talk to us
            </Link>
            .
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-white">Self-hosted</dt>
          {/* "The platform is open source", not "every layer is": the catalog
              names a repository for 65 of its 79 products, and a claim about all
              of them is a claim this page cannot check. The image is one it can
              — it is published, and it is the one we run. */}
          <dd className="mt-1.5 text-sm leading-relaxed text-neutral-500">
            $0. The platform is open source — run the same image on your own cluster and bring your
            own provider keys.
          </dd>
        </div>
      </dl>

      <Box className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/pricing"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white no-underline transition-opacity hover:opacity-70 hover:no-underline motion-reduce:transition-none"
        >
          Every plan and every rate <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="https://github.com/hanzoai"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-neutral-400 no-underline transition-colors hover:text-white hover:no-underline motion-reduce:transition-none"
        >
          <Github className="h-4 w-4" /> Run it yourself
        </a>
      </Box>
    </Box>
  )
}
