'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@hanzo/ui";
import { Users, Building2 } from "lucide-react";
import { loadPlans, fallbackPlans } from "@/lib/plans";

// Team and Enterprise used to be four full plan cards sitting beside the
// personal plans — Team, Team Max, Enterprise ($9999/mo) and Custom. That put
// the two decisions a visitor actually makes (which personal plan, and "is
// there something for my company") behind eight cards of comparison, and it
// published a $9999 figure that belongs to hanzo.agency rather than here.
//
// They are two sentences, so they are rendered as two sentences. Team has one
// real number worth stating up front — $25 per user, minimum two seats — and
// Enterprise has none, because its price is the outcome of a conversation. A
// card with "Custom" where the price goes is a card that exists to look
// symmetrical.
//
// Both controls are anchors via `asChild`. @hanzo/ui's Button with a bare
// onClick renders a div[role=button], which is focusable but never fires on
// Enter or Space — see BillingManagement for the same defect measured live.

const TEAM_URL = "https://billing.hanzo.ai/?plan=team#pricing";
const SALES_URL = "mailto:sales@hanzo.ai?subject=Hanzo%20Enterprise";

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

function teamFallback() {
  const seat = entrySeat(fallbackPlans("team"));
  return {
    monthly: seat?.priceMonthly ?? null,
    annual: seat?.priceAnnual ?? null,
    minSeats: Number(seat?.limits?.minSeats) || 2,
  };
}

/** The seat price and seat minimum, both from the row commerce charges. */
function useTeamTerms() {
  const [terms, setTerms] = useState(teamFallback);
  useEffect(() => {
    loadPlans("team").then((live) => {
      // The cheapest sellable row is the entry seat — `team` today, but read
      // rather than named so adding a cheaper tier does not silently keep
      // advertising the old one.
      const seat = entrySeat(live);
      if (!seat?.priceMonthly) return;
      setTerms({
        monthly: seat.priceMonthly,
        annual: seat.priceAnnual ?? null,
        minSeats: Number(seat.limits?.minSeats) || teamFallback().minSeats,
      });
    });
  }, []);
  return terms;
}

const TeamEnterpriseStrip = () => {
  const { monthly, annual, minSeats } = useTeamTerms();
  // Annual is the headline because it is the cheaper of the two and the one a
  // company buying seats will take; monthly is the footnote. Both are read, so
  // a plan sold at a single price simply states that price and no footnote.
  const headline = annual ?? monthly;
  return (
  <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-6 rounded-xl border border-border bg-[var(--black)] flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Business</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
        <span className="text-foreground font-medium">
          ${headline} per user per month
        </span>
        , minimum {minSeats} seats. A secure workspace with company context: org
        projects and shared history, SSO via Hanzo IAM, roles, and one unified
        bill for everyone.
        {annual != null && monthly != null && annual !== monthly && (
          <>
            {" "}
            <span className="text-muted-foreground/80">
              Billed annually; ${monthly} per user per month month to month.
            </span>
          </>
        )}
      </p>
      <Button asChild variant="outline" className="w-full border-border">
        <a href={TEAM_URL} target="_blank" rel="noopener noreferrer">
          Get started
        </a>
      </Button>
    </div>

    <div className="p-6 rounded-xl border border-border bg-[var(--black)] flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <Building2 className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Enterprise</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
        Dedicated capacity, on-prem or air-gapped deployment, custom SLAs and
        model hosting. Priced against your infrastructure and volume, so it
        starts with a conversation rather than a number.
      </p>
      <Button asChild variant="outline" className="w-full border-border">
        <a href={SALES_URL}>Contact sales</a>
      </Button>
    </div>
  </div>
  );
};

export default TeamEnterpriseStrip;
