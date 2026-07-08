'use client'

import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Users, Shield, Building2 } from "lucide-react";
import TeamPlanDetails from "./TeamPlanDetails";

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
  pricePerUser?: boolean;
  features: string[];
  limits?: Record<string, number | null>;
  payouts?: { idleResalePercent: number; description: string };
}

const PLAN_ICONS: Record<string, React.ReactNode> = {
  team: <Users className="h-6 w-6 text-muted-foreground" />,
  'team-max': <Users className="h-6 w-6 text-muted-foreground" />,
  enterprise: <Shield className="h-6 w-6 text-muted-foreground" />,
};

const STATIC_PLANS: SubscriptionPlan[] = [
  {
    id: 'team',
    name: 'Team',
    description: 'For teams building together. SSO, shared billing, and custom training.',
    priceMonthly: 199,
    priceAnnual: 159,
    category: 'team',
    popular: true,
    features: [
      'Up to 10 members',
      'SSO / SAML',
      'Shared billing',
      'Usage analytics',
      'Custom model training',
      'Priority support',
      'Hanzo World Team included',
      '$159/mo billed annually',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Full-scale AI infrastructure. Dedicated support and on-prem deployment.',
    priceMonthly: null,
    category: 'enterprise',
    contactSales: true,
    features: [
      'Everything in Team',
      'Unlimited members',
      'Dedicated inference capacity',
      'Custom rate limits',
      'On-premise / VPC deployment',
      'Enterprise SLA',
      'SOC 2 readiness — controls aligned',
      'Custom model fine-tuning',
      'Dedicated account manager',
      '24/7 engineering support',
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
    if (plan.contactSales || plan.priceMonthly == null) return "Contact Sales";
    if (plan.priceMonthly === 0) return "Free";
    return `$${plan.priceMonthly.toLocaleString()}`;
  }

  function billingPeriod(plan: SubscriptionPlan) {
    if (plan.contactSales || plan.priceMonthly == null || plan.priceMonthly === 0) return undefined;
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
            contactSalesUrl={plan.contactSales ? "https://cal.com/hanzo" : undefined}
          />
        ))}
      </div>

      <TeamPlanDetails fromMaxPlan={fromMaxPlan} fromProPlan={fromProPlan} />
    </div>
  );
};

export default TeamEnterprisePlans;
