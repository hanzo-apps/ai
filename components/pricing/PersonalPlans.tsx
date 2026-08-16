'use client'

import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Zap, Users, Rocket, Sparkles } from "lucide-react";
import { loadPlans, fallbackPlans, sellableFeatures, planCheckoutUrl, type SubscriptionPlan } from "@/lib/plans";
import { Box } from '@hanzo/ui'

const PLAN_ICONS: Record<string, React.ReactNode> = {
  free: <Sparkles className="h-6 w-6 text-muted-foreground" />,
  go: <Rocket className="h-6 w-6 text-muted-foreground" />,
  pro: <Zap className="h-6 w-6 text-muted-foreground" />,
  max: <Users className="h-6 w-6 text-muted-foreground" />,
};

function planCtaLabel(): string {
  return "Get started";
}

// Where an account is made. The same door the rest of the site sends people to.
const SIGNUP_URL = "https://console.hanzo.ai";

// What the CATALOG may contribute to the lineup: a rung anyone can start on
// without talking to us.
//
// A zero alone does not say which — Enterprise is served at 0 to mean "ask us",
// and Free is served at 0 because it costs nothing — so contactSales is what
// separates them. Free was written by hand here for as long as it had no
// billing row to read; it has one now, and reads like every other rung.
//
// The filter runs on the fetched list as well as the seeded one, because the
// live response replaces the array wholesale and a filter on only one path is
// a filter that does not hold.
const isSellable = (p: SubscriptionPlan) =>
  !p.contactSales && p.priceMonthly != null;

// There is no static ladder here any more. It used to be a hand-copied array of
// plan rows, which is precisely how this page came to publish Pro at one price
// while billing charged another: a copy cannot know its source moved. The
// first-paint fallback now comes from @hanzo/plans — the same package commerce
// seeds its catalog from — and the live catalog replaces it on load.

// Free, read from the bundled catalog rather than the live one.
//
// Commerce is the authority on what a plan COSTS, and Free costs nothing — so
// there is no price here for the live catalog to be authoritative about, and
// waiting on it only creates a window where the page can lose the rung
// altogether. That window is real: the catalog and this page ship separately,
// and a page that draws Free from the API is a page with no Free tier for as
// long as the API has not caught up.
//
// It is still the ONE catalog either way: @hanzo/plans is the package commerce
// seeds from, so this is the same row by a build-time path.
const FREE = fallbackPlans("personal").find((p) => p.priceMonthly === 0);

const PersonalPlans = () => {
  // Commerce is the price authority for every rung that CHARGES —
  // /v1/billing/plans, fetched on load. The static array is a first-paint
  // fallback so the page never flashes empty, not a second source of truth:
  // whatever commerce returns replaces it wholesale.
  const [plans, setPlans] = useState<SubscriptionPlan[]>(fallbackPlans("personal").filter(isSellable));

  useEffect(() => {
    loadPlans("personal").then((live) => {
      const sellable = live.filter(isSellable);
      if (sellable.length) setPlans(sellable);
    });
  }, []);

  // Free leads, then everything that charges. The live row wins when commerce
  // publishes one — it is the authority, and its copy should reach the page —
  // and the bundled row stands in until then, so the rung is never absent and
  // never doubled.
  const free = plans.find((p) => p.priceMonthly === 0) ?? FREE;
  const ladder = [...(free ? [free] : []), ...plans.filter((p) => p.priceMonthly !== 0)];

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
    <Box className="max-w-6xl mx-auto mb-12">
      {/* The question a reader arrives with, answered before the prices.

          The measured funnel says they land here, see a monthly price next to
          AI they can get for nothing, and leave — 120 arrivals to 3 plan
          clicks. They leave because the page never answered it, so it is
          answered first, plainly, and in terms of what a plan actually buys:
          better models, higher limits, more compute. Nothing else is on offer
          and the page should not imply there is. */}
      <p className="max-w-2xl mx-auto mb-10 text-center text-base text-muted-foreground">
        <span className="text-foreground font-medium">Why pay when the AI is free?</span>{" "}
        Free gets you the free models with a daily limit and a little sandbox
        compute. Paid gets you the best models, higher limits, and real compute.
      </p>

      {/* Free leads, because everyone starts there — and it leads because the
          catalog puts it first, not because a card was placed ahead of the
          list. */}
      {/* Columns match the rungs the catalog serves. A count short of the set
          strands the last card alone on its own row — Max, the top tier, 773px
          below the others and under the fold at 1280 and 1440. */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {ladder.map((plan) => {
          const free = plan.priceMonthly === 0;
          return (
            <PricingPlan
              key={plan.id}
              // Free reports no plan click: it is the one rung that can never
              // reach a checkout, and counting it would dilute the step it sits
              // in with the choice that definitionally cannot convert.
              plan={free ? undefined : plan.id}
              name={plan.name}
              icon={PLAN_ICONS[plan.id] || iconFallback}
              price={formatPrice(plan)}
              billingPeriod={billingPeriod(plan)}
              description={plan.description}
              features={sellableFeatures(plan.features)}
              popular={plan.popular}
              checkoutUrl={free ? SIGNUP_URL : planCheckoutUrl(plan)}
              ctaLabel={free ? "Get started free" : planCtaLabel()}
            />
          );
        })}
      </Box>

      {/* The free path is now a card, not a footnote, so this line carries the
          part a card cannot: the source is open, and running it yourself costs
          nothing at all. */}
      <p className="text-center text-sm text-muted-foreground">
        Every paid plan is month to month, cancel any time.{" "}
        <a
          href="https://github.com/hanzoai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 hover:no-underline"
        >
          Everything open source
        </a>{" "}
        is free to download and run yourself.
      </p>
    </Box>
  );
};

export default PersonalPlans;
