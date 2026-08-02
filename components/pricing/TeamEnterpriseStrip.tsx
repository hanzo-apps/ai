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
function teamFallback() {
  const seat = fallbackPlans("team")
    .filter((p) => p.priceMonthly != null && p.priceMonthly > 0)
    .sort((a, b) => (a.priceMonthly ?? 0) - (b.priceMonthly ?? 0))[0];
  return {
    price: seat?.priceMonthly ?? 25,
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
      const seat = live
        .filter((p) => p.priceMonthly != null && p.priceMonthly > 0)
        .sort((a, b) => (a.priceMonthly ?? 0) - (b.priceMonthly ?? 0))[0];
      if (!seat?.priceMonthly) return;
      setTerms({
        price: seat.priceMonthly,
        minSeats: Number(seat.limits?.minSeats) || teamFallback().minSeats,
      });
    });
  }, []);
  return terms;
}

const TeamEnterpriseStrip = () => {
  const { price, minSeats } = useTeamTerms();
  return (
  <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-6 rounded-xl border border-border bg-[var(--black)] flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Team</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
        <span className="text-foreground font-medium">${price}/user per month</span>,
        minimum {minSeats} seats. Org workspaces, SSO via Hanzo IAM, and one unified bill
        for everyone — the difference from a personal plan is the org, not the
        model access.
      </p>
      <Button asChild variant="outline" className="w-full border-border">
        <a href={TEAM_URL} target="_blank" rel="noopener noreferrer">
          Set up a team
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
        <a href={SALES_URL}>Contact us</a>
      </Button>
    </div>
  </div>
  );
};

export default TeamEnterpriseStrip;
