'use client'

import React from "react";
import { Button } from "@hanzo/ui";
import { Users, Building2 } from "lucide-react";

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

const TeamEnterpriseStrip = () => (
  <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-6 rounded-xl border border-border bg-[var(--black)] flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Team</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
        <span className="text-foreground font-medium">$25/user per month</span>,
        minimum 2 seats. Org workspaces, SSO via Hanzo IAM, and one unified bill
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

export default TeamEnterpriseStrip;
