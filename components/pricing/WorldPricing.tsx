'use client'

import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Globe, Zap, Users, Building2 } from "lucide-react";

const PLANS_API = "https://api.hanzo.ai/v1/plans";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number | null;
  priceAnnual?: number | null;
  category: string;
  popular?: boolean;
  contactSales?: boolean;
  features: string[];
  limits?: Record<string, number | null>;
  payouts?: { idleResalePercent: number; description: string };
}

const PLAN_ICONS: Record<string, React.ReactNode> = {
  "world-free": <Globe className="h-6 w-6 text-muted-foreground" />,
  "world-pro": <Zap className="h-6 w-6 text-muted-foreground" />,
  "world-team": <Users className="h-6 w-6 text-muted-foreground" />,
  "world-enterprise": <Building2 className="h-6 w-6 text-muted-foreground" />,
};

// Static fallback mirrors https://api.hanzo.ai/v1/plans (category: world).
// The live response replaces these on load — keep the two in lockstep.
const STATIC_PLANS: SubscriptionPlan[] = [
  {
    id: "world-free",
    name: "World Free",
    priceMonthly: 0,
    priceAnnual: 0,
    category: "world",
    description: "Real-time global intelligence dashboard — free tier.",
    features: [
      "Live OSINT dashboard",
      "3 saved alerts",
      "Community Discord",
      "Daily email digest",
    ],
  },
  {
    id: "world-pro",
    name: "World Pro",
    priceMonthly: 29,
    priceAnnual: 290,
    category: "world",
    popular: true,
    description:
      "Everything in Free plus priority feeds, unlimited alerts, ZAP + MCP API access, WhatsApp/Telegram/SMS notifications. Included free in Hanzo Pro / Plus / Max / Team / Enterprise.",
    features: [
      "Everything in Free",
      "Unlimited alerts",
      "Full /v1/world + /v1/world/model API",
      "Live SSE stream (agents subscribe)",
      "Real-time sentiment + trader indicators",
      "ZAP + MCP real-time API",
      "WhatsApp / Telegram / SMS alerts",
      "Priority data feeds (AIS, FIRMS, GDELT)",
      "Zen AI analyst chat (pay-as-you-go)",
      "Data export (CSV, JSON, parquet)",
      "Priority support",
    ],
  },
  {
    id: "world-team",
    name: "World Team",
    priceMonthly: 99,
    priceAnnual: 990,
    category: "world",
    description:
      "Everything in Pro for up to 5 seats + shared workspace. Included free in Hanzo Team / Team Max / Enterprise.",
    features: [
      "Everything in Pro",
      "5 team seats",
      "Shared alert rules",
      "SSO via Hanzo IAM",
      "Org-level API keys",
      "Audit log",
    ],
  },
  {
    id: "world-enterprise",
    name: "World Enterprise",
    priceMonthly: null,
    priceAnnual: null,
    category: "world",
    contactSales: true,
    description:
      "Custom global-intelligence infrastructure. Dedicated ingest, custom feeds/pipelines, SLA, and private deployment.",
    features: [
      "Everything in Team",
      "Custom data feeds & pipelines",
      "Dedicated ingest workers",
      "99.9% SLA",
      "Private deployment (*.hanzo.app fork)",
      "Dedicated support & onboarding",
      "Custom model / analyst tuning",
    ],
  },
];

// Free first, priced ascending, contact/null last.
function sortKey(plan: SubscriptionPlan) {
  if (plan.contactSales || plan.priceMonthly == null) return Number.POSITIVE_INFINITY;
  return plan.priceMonthly;
}

const WorldPricing = () => {
  // Initialize with static plans immediately — no loading flash
  const [plans, setPlans] = useState<SubscriptionPlan[]>(STATIC_PLANS);

  useEffect(() => {
    fetch(PLANS_API)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        const world = (d.plans || []).filter(
          (p: SubscriptionPlan) => p.category === "world"
        );
        if (world.length) setPlans(world);
      })
      .catch(() => {
        // keep STATIC_PLANS already set
      });
  }, []);

  function formatPrice(plan: SubscriptionPlan) {
    if (plan.contactSales || plan.priceMonthly == null) return "Contact us";
    if (plan.priceMonthly === 0) return "Free";
    return `$${plan.priceMonthly.toLocaleString()}`;
  }

  function billingPeriod(plan: SubscriptionPlan) {
    if (plan.contactSales || plan.priceMonthly == null || plan.priceMonthly === 0) return undefined;
    return "/mo";
  }

  const iconFallback = <Globe className="h-6 w-6 text-muted-foreground" />;
  const sortedPlans = [...plans].sort((a, b) => sortKey(a) - sortKey(b));

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">Hanzo World</h2>
        <p className="text-muted-foreground text-lg">
          Real-time global intelligence — live OSINT feeds, sentiment, and trader
          indicators streamed to your dashboard, agents, and API. Included free with
          Hanzo Pro, Plus, Max, Team, and Enterprise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {sortedPlans.map((plan) => (
          <PricingPlan
            key={plan.id}
            name={plan.name}
            icon={PLAN_ICONS[plan.id] || iconFallback}
            price={formatPrice(plan)}
            billingPeriod={billingPeriod(plan)}
            description={plan.description}
            features={plan.features}
            popular={plan.popular}
            contactSalesUrl={plan.contactSales ? "https://cal.com/hanzo" : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default WorldPricing;
