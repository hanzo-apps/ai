'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@hanzo/ui";
import { Users, Building2 } from "lucide-react";
import { loadPlans, fallbackPlans, planCheckoutUrl, type SubscriptionPlan } from "@/lib/plans";
import { useAnalytics } from "@hanzo/event/react";
import { EVENTS } from "@hanzo/event";
import { Box } from '@hanzo/ui'

// Team and Enterprise used to be four full plan cards sitting beside the
// personal plans — Team, Team Max, Enterprise ($9999/mo) and Custom. That put
// the two decisions a visitor actually makes (which personal plan, and "is
// there something for my company") behind eight cards of comparison, and it
// published a $9999 figure that belongs to hanzo.agency rather than here.
//
// They are two sentences, so they are rendered as two sentences. Team has one
// real number worth stating up front — the seat price, over the seat minimum —
// and it is stated the way the personal ladder states its own, in the same
// figure at the same weight. Enterprise has no number, because its price is the
// outcome of a conversation. A card with "Custom" where the price goes is a card
// that exists to look symmetrical.
//
// Both controls are anchors via `asChild`. @hanzo/ui's Button with a bare
// onClick renders a div[role=button], which is focusable but never fires on
// Enter or Space — see BillingManagement for the same defect measured live.

// The sales page, not a raw mailto. /contact/sales carries the booking link
// (cal.hanzo.ai) and the enterprise address together, so a reader picks the
// channel; a mailto picks for them and dead-ends anyone without a mail client
// configured. Every other enterprise surface on the site already points here.
const SALES_URL = "/contact/sales";

// The seat price is read from commerce — GET /v1/billing/plans, category `team`,
// the same rows that actually charge. $25 stays as the FALLBACK rather than the
// source: loadPlans resolves to [] on any failure, and a pricing page that
// renders a blank where the price goes is worse than one showing the last known
// number. Same contract PersonalPlans holds.
//
// Enterprise deliberately has no number here and takes no live value. Its price
// is the outcome of a conversation, and the catalog's enterprise row exists to be
// charged against after that conversation, not to be advertised before it.
//
// The seat fallback is READ from @hanzo/plans rather than written here, for the
// same reason the personal ladder is: a hand-typed 25 goes stale silently the
// moment the catalog reprices, and a pricing page that is confidently wrong is
// worse than one that is briefly blank.
const entrySeat = (rows: ReturnType<typeof fallbackPlans>) =>
  rows
    .filter((p) => p.priceMonthly != null && p.priceMonthly > 0)
    .sort((a, b) => (a.priceMonthly ?? 0) - (b.priceMonthly ?? 0))[0];

/**
 * The row commerce charges for a seat.
 *
 * The ROW, not a copy of three of its fields: the price, the seat minimum, the
 * checkout link and the id the click reports are all answers to "which plan is
 * this", and reading them off one value is what keeps them answers about the
 * same plan.
 */
function useEntrySeat(): SubscriptionPlan | undefined {
  const [seat, setSeat] = useState(() => entrySeat(fallbackPlans("team")));
  useEffect(() => {
    loadPlans("team").then((live) => {
      const fresh = entrySeat(live);
      if (fresh?.priceMonthly) setSeat(fresh);
    });
  }, []);
  return seat;
}

const TeamEnterpriseStrip = () => {
  const seat = useEntrySeat();
  // The seat price is the MONTHLY one, because month to month is the only term
  // the checkout sells: every catalog row serves `interval: "monthly"`, and
  // subscribe takes a plan and a quantity with no interval beside them. The row
  // publishes a priceAnnual too, and it is a number nothing charges — so it is
  // not read here, and no other surface on this page reads it either.
  const monthly = seat?.priceMonthly ?? null;
  const minSeats = Number(seat?.limits?.minSeats) || 2;
  const analytics = useAnalytics();
  // The same event the ladder above reports, from the two cards that were
  // silent: a business buyer choosing a plan is the step the upgrade funnel
  // reads between viewing prices and reaching checkout, and these CTAs were
  // absent from it. `plan` is the catalog id, so it joins to the id billing
  // and pay file their side of the funnel under.
  //
  // Sent at once rather than on the batch timer. Contact sales navigates THIS
  // tab, and a batch still queued when the document goes away is never issued —
  // measured in Chromium, that click put nothing on the wire at all. billing
  // flushes the same way before it hands a buyer to the card form.
  const choose = (plan: string, cta: string) => {
    analytics.capture(EVENTS.PLAN_CLICKED, { plan, cta });
    analytics.flush(true);
  };
  return (
  <Box className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Every line of this card — the price, the seat minimum, the door it opens
        and the id its click reports — is read off one row. With no row there is
        nothing to sell, and the card would otherwise render a price with no
        number, a minimum nothing stated, and no way to buy. */}
    {seat && (
    <Box className="p-6 rounded-xl border border-border bg-[var(--black)] flex flex-col">
      <Box className="flex items-center gap-3 mb-3">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Business</h3>
      </Box>
      {/* The price, in the figure and the weight the personal ladder states its
          own in, over the unit it is charged in. A price set in body copy reads
          as a smaller offer than the same price set as a headline, and this is
          the largest tier a reader can buy without a conversation. */}
      <Box className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl font-bold">${monthly}</span>
        <span className="text-muted-foreground">/user/month</span>
      </Box>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
        Minimum {minSeats} seats. A secure workspace with company context: org
        projects and shared history, SSO via Hanzo IAM, roles, and one unified
        bill for everyone.
      </p>
      <Button asChild variant="outline" className="w-full border-border">
        <a
          href={planCheckoutUrl(seat)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => choose(seat.id, "Get started")}
        >
          Get started
        </a>
      </Button>
    </Box>
    )}

    <Box className="p-6 rounded-xl border border-border bg-[var(--black)] flex flex-col">
      <Box className="flex items-center gap-3 mb-3">
        <Building2 className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Enterprise</h3>
      </Box>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
        Dedicated capacity, on-prem or air-gapped deployment, custom SLAs and
        model hosting. Priced against your infrastructure and volume, so it
        starts with a conversation rather than a number.
      </p>
      <Button asChild variant="outline" className="w-full border-border">
        <a href={SALES_URL} onClick={() => choose("enterprise", "Contact sales")}>
          Contact sales
        </a>
      </Button>
    </Box>
  </Box>
  );
};

export default TeamEnterpriseStrip;
