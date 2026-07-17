'use client'

import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Github, Code, Users, Rocket } from "lucide-react";

const PLANS_API = "https://pricing.hanzo.ai/v1/plans";

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
  /** Optional backend-supplied checkout deep link / id (honored if present). */
  checkoutUrl?: string;
  checkoutId?: string;
}

const PLAN_ICONS: Record<string, React.ReactNode> = {
  developer: <Github className="h-6 w-6 text-muted-foreground" />,
  pro: <Code className="h-6 w-6 text-muted-foreground" />,
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

// Static fallback mirrors https://pricing.hanzo.ai/v1/plans (category: personal).
// The live response replaces these on load — keep the two in lockstep.
const STATIC_PLANS: SubscriptionPlan[] = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'Get started for free. Explore the API with generous included credits.',
    priceMonthly: 0,
    category: 'personal',
    features: [
      '$5 free credit',
      '60 requests/min',
      '100K tokens/min',
      'API access',
      'Community support',
      'Pay-as-you-go after credit',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For developers shipping real products. Higher limits and priority support.',
    priceMonthly: 49,
    priceAnnual: 39,
    category: 'personal',
    popular: true,
    features: [
      '500 requests/min',
      '1M tokens/min',
      'Priority inference',
      'Analytics dashboard',
      'Email support',
      'Hanzo World Pro included',
      '$39/mo billed annually',
    ],
  },
  {
    id: 'max',
    name: 'Max',
    description: 'Maximum AI power for individuals. Unlimited premium model access and massive usage allowances.',
    priceMonthly: 200,
    priceAnnual: 160,
    category: 'personal',
    features: [
      'Everything in Pro',
      'Unlimited premium model access',
      '5000 requests/min',
      '10M tokens/min',
      '$100/mo cloud credits included',
      'Custom model fine-tuning',
      'Dedicated support channel',
      '$160/mo billed annually',
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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
