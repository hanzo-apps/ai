'use client'

import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Github, Code, Zap, Users, Rocket } from "lucide-react";
import { loadPlans, type SubscriptionPlan } from "@/lib/plans";

const PLAN_ICONS: Record<string, React.ReactNode> = {
  developer: <Github className="h-6 w-6 text-muted-foreground" />,
  pro: <Code className="h-6 w-6 text-muted-foreground" />,
  plus: <Zap className="h-6 w-6 text-muted-foreground" />,
  max: <Users className="h-6 w-6 text-muted-foreground" />,
};

// Canonical checkout. The billing shell reads the "#pricing" hash and opens the
// subscription portal for the signed-in user (auto OIDC via hanzo.id when
// needed), where selecting a plan starts the subscription. If /v1/plans ever
// supplies a checkout link/id we honor it; otherwise we deep-link by plan id.
const BILLING_URL = "https://billing.hanzo.ai";

function planCheckoutUrl(plan: SubscriptionPlan): string {
  if (plan.checkoutUrl) return plan.checkoutUrl;
  const id = plan.checkoutId || plan.id;
  return `${BILLING_URL}/?plan=${encodeURIComponent(id)}#pricing`;
}

function planCtaLabel(): string {
  return "Get started";
}

// There is NO free plan. The free path is the open source: every OSS release and
// OSS model is downloadable and self-hostable at no cost, which is a different
// offer from a $0 tier of the hosted product and should not be dressed up as
// one. A "Free" card sitting in the paid lineup read as the entry tier and
// buried the actual entry tier at $20.
//
// So a plan priced at 0 is DROPPED here rather than removed from the catalog:
// /v1/billing/plans still serves `developer`, and the live response replaces
// this array wholesale on load. Filtering only the static list would be
// cosmetic — the fetched list has to be filtered too, which is why the filter
// lives in one function both paths run through.
const isSellable = (p: SubscriptionPlan) =>
  p.priceMonthly != null && p.priceMonthly > 0;

// Static fallback mirrors /v1/billing/plans (category: personal) — see lib/plans.
// The live response replaces these on load — keep the two in lockstep.
const STATIC_PLANS: SubscriptionPlan[] = [
  {
    id: 'pro',
    name: 'Pro',
    description: 'For developers shipping real products. One $20 subscription with unified AI usage across hanzo.ai, hanzo.app, and hanzo.team — Hanzo World Pro included.',
    priceMonthly: 20,
    priceAnnual: 16,
    category: 'personal',
    popular: true,
    features: [
      '$20/mo included usage',
      'Unified AI usage across hanzo.ai, hanzo.app & hanzo.team',
      'hanzo.team access — invite up to 3 guests',
      '500 requests/min',
      '1M tokens/min',
      '$5/mo cloud credits included',
      'Email support',
      'Analytics dashboard',
      'Priority inference',
      'Hanzo World Pro — live OSINT, ZAP + MCP API, unlimited alerts (included)',
      'Pay-as-you-go beyond included usage',
      'Earn up to 20% on idle compute & LLM resale',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    description: '5x Pro for power users. Unified AI usage across hanzo.ai, hanzo.app, and hanzo.team with max-tier models and priority support.',
    priceMonthly: 100,
    priceAnnual: 80,
    category: 'personal',
    features: [
      'Everything in Pro, 5x the usage',
      '$100/mo included usage',
      'Unified AI usage across hanzo.ai, hanzo.app & hanzo.team',
      'hanzo.team access — invite up to 3 guests',
      '2500 requests/min',
      '5M tokens/min',
      '$25/mo cloud credits included',
      'Max-tier model access',
      'Priority support',
      'Hanzo World Pro included',
      'Earn up to 20% on idle compute & LLM resale',
    ],
  },
  {
    id: 'max',
    name: 'Max',
    description: 'Maximum AI power for individuals. 20x Pro usage, unlimited premium models, and unified AI usage across hanzo.ai, hanzo.app, and hanzo.team.',
    priceMonthly: 200,
    priceAnnual: 160,
    pricePerUser: true,
    category: 'personal',
    features: [
      'Everything in Plus',
      'Unlimited premium model access (Zen, Claude, GPT-4o, etc.)',
      'Unified AI usage across hanzo.ai, hanzo.app & hanzo.team',
      'hanzo.team access — invite up to 3 guests',
      'Priority inference across all models',
      '5000 requests/min',
      '10M tokens/min',
      '$100/mo cloud credits included',
      'Custom model fine-tuning',
      'Dedicated support channel',
      'Pay-as-you-go or prepay for additional cloud usage',
      'Hanzo World Pro included',
      'Earn up to 20% on idle compute & LLM resale',
    ],
  },
];

const PersonalPlans = () => {
  // Commerce is the price authority — /v1/billing/plans, fetched on load. The
  // static array is a first-paint fallback so the page never flashes empty, not
  // a second source of truth: whatever commerce returns replaces it wholesale.
  const [plans, setPlans] = useState<SubscriptionPlan[]>(STATIC_PLANS.filter(isSellable));

  useEffect(() => {
    loadPlans("personal").then((live) => {
      const sellable = live.filter(isSellable);
      if (sellable.length) setPlans(sellable);
    });
  }, []);

  function formatPrice(plan: SubscriptionPlan) {
    if (plan.contactSales || plan.priceMonthly == null) return "Custom";
    return `$${plan.priceMonthly}`;
  }

  function billingPeriod(plan: SubscriptionPlan) {
    if (plan.contactSales || plan.priceMonthly == null) return "";
    return "/month";
  }

  const iconFallback = <Rocket className="h-6 w-6 text-muted-foreground" />;

  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {plans.map((plan) => (
          <PricingPlan
            key={plan.id}
            name={plan.name}
            icon={PLAN_ICONS[plan.id] || iconFallback}
            price={formatPrice(plan)}
            billingPeriod={billingPeriod(plan)}
            description={plan.description}
            features={plan.features}
            popular={plan.popular}
            checkoutUrl={planCheckoutUrl(plan)}
            ctaLabel={planCtaLabel()}
          />
        ))}
      </div>

      {/* The free path, stated as what it is. Not a plan — there is no $0 tier
          of the hosted product — but the OSS releases and OSS models are free to
          download and run yourself, and that is the honest answer to "is there a
          free option". Kept as one line under the plans so it cannot be mistaken
          for a fourth card. */}
      <p className="text-center text-sm text-muted-foreground">
        No free tier — but everything open source is free.{" "}
        <a
          href="https://github.com/hanzoai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 hover:no-underline"
        >
          Download the OSS releases and models
        </a>{" "}
        and run them yourself.
      </p>
    </div>
  );
};

export default PersonalPlans;
