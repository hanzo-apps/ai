'use client'

import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Github, Code, Zap, Users, Rocket } from "lucide-react";

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
  pricePerUser?: boolean;
  features: string[];
  limits?: Record<string, number | null>;
  payouts?: { idleResalePercent: number; description: string };
  /** Optional backend-supplied checkout deep link / id (honored if present). */
  checkoutUrl?: string;
  checkoutId?: string;
}

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

function planCtaLabel(plan: SubscriptionPlan): string {
  return plan.priceMonthly === 0 ? "Start free" : "Get started";
}

// Static fallback mirrors https://api.hanzo.ai/v1/plans (category: personal).
// The live response replaces these on load — keep the two in lockstep.
const STATIC_PLANS: SubscriptionPlan[] = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'Get started for free. Explore the API with generous included credits.',
    priceMonthly: 0,
    priceAnnual: 0,
    category: 'personal',
    features: [
      '$5 free credit',
      '$5/mo included usage',
      '60 requests/min',
      '100K tokens/min',
      'Community support',
      'API access',
      'Earn up to 20% on idle compute & LLM resale',
    ],
  },
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
  // Initialize with static plans immediately — no loading flash
  const [plans, setPlans] = useState<SubscriptionPlan[]>(STATIC_PLANS);

  useEffect(() => {
    fetch(PLANS_API)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        const personal = (d.plans || []).filter(
          (p: SubscriptionPlan) => p.category === "personal"
        );
        if (personal.length) setPlans(personal);
      })
      .catch(() => {
        // keep STATIC_PLANS already set
      });
  }, []);

  function formatPrice(plan: SubscriptionPlan) {
    if (plan.contactSales || plan.priceMonthly == null) return "Custom";
    if (plan.priceMonthly === 0) return "Free";
    return `$${plan.priceMonthly}`;
  }

  function billingPeriod(plan: SubscriptionPlan) {
    if (plan.contactSales || plan.priceMonthly == null) return "";
    if (plan.priceMonthly === 0) return " to start";
    return "/month";
  }

  const iconFallback = <Rocket className="h-6 w-6 text-muted-foreground" />;

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
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
            ctaLabel={planCtaLabel(plan)}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalPlans;
