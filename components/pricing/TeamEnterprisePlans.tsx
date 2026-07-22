'use client'

import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Users, Shield, Building2 } from "lucide-react";
import TeamPlanDetails from "./TeamPlanDetails";

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
  team: <Users className="h-6 w-6 text-muted-foreground" />,
  'team-max': <Users className="h-6 w-6 text-muted-foreground" />,
  enterprise: <Shield className="h-6 w-6 text-muted-foreground" />,
};

const BILLING_URL = "https://billing.hanzo.ai";

// Enterprise-tier (contact-sales, unpriced, or list price >= $9,999) books a
// call; everything else checks out through the live billing shell. Mirrors the
// canonical billing app's own plan-card logic.
const isSales = (plan: SubscriptionPlan) =>
  !!plan.contactSales || plan.priceMonthly == null || plan.priceMonthly >= 9999;

function planCheckoutUrl(plan: SubscriptionPlan): string {
  if (plan.checkoutUrl) return plan.checkoutUrl;
  const id = plan.checkoutId || plan.id;
  return `${BILLING_URL}/?plan=${encodeURIComponent(id)}#pricing`;
}

const STATIC_PLANS: SubscriptionPlan[] = [
  {
    id: 'team',
    name: 'Team',
    description: 'hanzo.team for your whole org. Org workspaces, SSO / IAM team management, shared billing, and enterprise-grade security. $25 per user, minimum 2 seats.',
    priceMonthly: 25,
    priceAnnual: 20,
    pricePerUser: true,
    category: 'team',
    features: [
      'hanzo.team org workspaces for your whole company',
      '$25/user/mo — minimum 2 seats',
      '$100/mo cloud credits per user',
      'SSO / SAML + IAM team management',
      'Shared billing + usage analytics',
      'Audit log + enterprise-grade security',
      'Up to 100 members',
      'Priority support',
      'Hanzo World Team — multi-seat OSINT dashboard, shared alerts (included)',
      'Earn up to 20% on idle compute & LLM resale',
    ],
  },
  {
    id: 'team-max',
    name: 'Team Max',
    description: 'Maximum AI power for every team member. Unlimited premium models, priority inference, and massive usage per seat.',
    priceMonthly: 225,
    priceAnnual: 180,
    pricePerUser: true,
    category: 'team',
    features: [
      'Everything in Team + Max',
      'Unlimited premium model access (Zen, Claude, GPT-4o, etc.)',
      'Priority inference across all models',
      '5000 requests/min per user',
      '10M tokens/min per user',
      '$100/mo cloud credits per user included',
      'Custom model fine-tuning',
      'Dedicated support channel',
      'Pay-as-you-go or prepay for additional cloud usage',
      'Hanzo World Team included',
      'Earn up to 20% on idle compute & LLM resale',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Full-scale AI infrastructure. Dedicated support, SLA, and on-prem deployment.',
    priceMonthly: 9999,
    priceAnnual: 7999,
    category: 'enterprise',
    features: [
      '$1,000/mo included usage',
      'Unlimited members',
      '99.99% SLA',
      'Dedicated account manager',
      'Custom rate limits',
      'On-premise deployment',
      'SOC 2 compliance',
      'Custom model fine-tuning',
      'Priority inference across all models',
      'Hanzo World Team included',
      'Volume usage discounts beyond included credit',
      'Earn up to 20% on idle compute & LLM resale',
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: "Need more? We'll build a plan around your infrastructure, compliance, and scale requirements.",
    priceMonthly: null,
    priceAnnual: null,
    category: 'enterprise',
    contactSales: true,
    features: [
      'Everything in Enterprise',
      'Custom SLA (up to 99.999%)',
      'Dedicated compute cluster',
      'Air-gapped / on-prem deployment',
      'Custom model training & hosting',
      'White-glove onboarding',
      '24/7 engineering support',
      'Earn up to 20% on idle compute & LLM resale',
    ],
  },
];

const TeamEnterprisePlans = () => {
  const [fromMaxPlan, setFromMaxPlan] = useState(false);
  const [fromProPlan, setFromProPlan] = useState(false);
  // Initialize with static plans immediately — no loading flash
  const [plans, setPlans] = useState<SubscriptionPlan[]>(STATIC_PLANS);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    if (from === 'max') {
      setFromMaxPlan(true);
      setFromProPlan(false);
    } else if (from === 'pro') {
      setFromProPlan(true);
      setFromMaxPlan(false);
    }
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  useEffect(() => {
    fetch(PLANS_API)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        const teamEnterprise = (d.plans || []).filter(
          (p: SubscriptionPlan) => p.category === "team" || p.category === "enterprise"
        );
        if (teamEnterprise.length) setPlans(teamEnterprise);
      })
      .catch(() => {
        // keep STATIC_PLANS already set
      });
  }, []);

  function formatPrice(plan: SubscriptionPlan) {
    if (isSales(plan)) return "Contact Sales";
    if (plan.priceMonthly === 0) return "Free";
    return `$${plan.priceMonthly!.toLocaleString()}`;
  }

  function billingPeriod(plan: SubscriptionPlan) {
    if (isSales(plan) || plan.priceMonthly === 0) return undefined;
    return plan.pricePerUser ? "/mo per seat" : "/month";
  }

  const iconFallback = <Building2 className="h-6 w-6 text-muted-foreground" />;

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {plans.map((plan) => (
          <PricingPlan
            key={plan.id}
            name={plan.name}
            icon={PLAN_ICONS[plan.id] || iconFallback}
            price={formatPrice(plan)}
            billingPeriod={billingPeriod(plan)}
            description={plan.description}
            features={plan.features}
            popular={plan.popular || plan.category === "team"}
            showDetails={plan.category === "team"}
            contactSalesUrl={isSales(plan) ? "https://cal.com/hanzo" : undefined}
            checkoutUrl={isSales(plan) ? undefined : planCheckoutUrl(plan)}
            ctaLabel="Get started"
          />
        ))}
      </div>

      <TeamPlanDetails fromMaxPlan={fromMaxPlan} fromProPlan={fromProPlan} />
    </div>
  );
};

export default TeamEnterprisePlans;
