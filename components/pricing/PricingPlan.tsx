'use client'

import React from "react";
import { Button } from "@hanzo/ui";
import { Check } from "lucide-react";
import { useAnalytics } from "@hanzo/event/react";
import { EVENTS } from "@hanzo/event";
import { Box } from '@hanzo/ui'

interface PricingPlanProps {
  name: string;
  icon: React.ReactNode;
  price: string;
  billingPeriod?: string;
  description: string;
  features: string[];
  popular?: boolean;
  customColor?: string;
  showDetails?: boolean;
  githubLink?: boolean;
  contactSalesUrl?: string;
  /** Live checkout URL — clicking the CTA starts the subscription. */
  checkoutUrl?: string;
  /** Override the primary CTA label (e.g. "Start free"). */
  ctaLabel?: string;
}

const PricingPlan = ({
  name,
  icon,
  price,
  billingPeriod,
  description,
  features,
  popular = false,
  customColor,
  showDetails = false,
  githubLink = false,
  contactSalesUrl,
  checkoutUrl,
  ctaLabel,
}: PricingPlanProps) => {
  const analytics = useAnalytics();
  const track = (cta: string) => analytics.capture(EVENTS.PLAN_CLICKED, { plan: name, cta });
  // A CTA that NAVIGATES is an anchor, not a click handler. Button renders a
  // div[role=button], which never fires on Enter or Space — so a `window.open`
  // handler made these plans unstartable by keyboard or screen reader, and took
  // cmd-click, middle-click and "copy link" with it. `asChild` keeps the styling
  // and hands the behaviour back to a real <a>.
  const ctaProps = (cta: string, url: string) => ({
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: () => track(cta),
  });
  const primaryLabel = ctaLabel || "Get Started";

  // Use monochrome design
  const borderColor = popular 
    ? "border-neutral-700" 
    : "border-neutral-800";
  
  const bgColor = popular 
    ? "bg-neutral-900/30" 
    : "bg-[var(--black)]/50";

  // Button color - prominent option gets white bg, others get outline
  const buttonClass = popular 
    ? "bg-[var(--white)] text-primary-foreground border border-neutral-300 hover:bg-transparent hover:text-[var(--white)] hover:border-[var(--white)] transition-all duration-300" 
    : "bg-transparent border border-border text-foreground hover:bg-[var(--white)] hover:text-primary-foreground transition-all duration-300";

  const renderButton = () => {
    // Contact-sales tiers (Enterprise / Custom) → book a call.
    if (contactSalesUrl) {
      return (
        <Button asChild className={`w-full mb-8 ${buttonClass}`}>
          <a {...ctaProps('Contact Sales', contactSalesUrl)}>Contact Sales</a>
        </Button>
      );
    }
    // Team tab: the Team card opens the seat/credit configurator inline.
    if (name === "Team" && showDetails) {
      return (
        <Button
          className={`w-full mb-8 ${buttonClass}`}
          onClick={() => {
            track('Configure Plan');
            const teamConfigSection = document.getElementById('team-config-section');
            if (teamConfigSection) {
              teamConfigSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Configure Plan
        </Button>
      );
    }
    if (name === "Pro" && showDetails) {
      return (
        <Button
          className={`w-full mb-8 ${buttonClass}`}
          onClick={() => {
            track('Get Started');
            const teamConfigSection = document.getElementById('team-config-section');
            if (teamConfigSection) {
              window.history.pushState({}, '', window.location.pathname + '?from=pro');
              teamConfigSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Get Started
        </Button>
      );
    }
    // Real checkout — starts the subscription against the live billing stack.
    if (checkoutUrl) {
      return (
        <Button asChild className={`w-full mb-8 ${buttonClass}`}>
          <a {...ctaProps(primaryLabel, checkoutUrl)}>{primaryLabel}</a>
        </Button>
      );
    }
    // Legacy fallback (open-source repos) only if no checkout is wired.
    if (githubLink || name === "Dev") {
      return (
        <Button asChild className={`w-full mb-8 ${buttonClass}`}>
          <a {...ctaProps('Get on GitHub', 'https://github.com/hanzoai/')}>Get on GitHub</a>
        </Button>
      );
    }
    return (
      <Button
        className={`w-full mb-8 ${buttonClass}`}
        onClick={() => track('Get Started')}
      >
        {primaryLabel}
      </Button>
    );
  };

  return (
    <div 
      className={`relative rounded-2xl border ${borderColor} ${bgColor} p-8 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/20`}
    >
      {popular && (
        <Box className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Box className="bg-[var(--white)] text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </Box>
        </Box>
      )}

      <Box className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold">{name}</h3>
      </Box>
      
      {/* The description reserves a fixed block so the CTA below it lands at the
          same height in every card. Descriptions come from commerce and differ by
          a line — Plus reads three lines where Pro and Max read four — which put
          the middle card's button 24px above its neighbours' and made a row of
          equal-height cards look misaligned.

          The grid already stretches the cards to equal height, so the slack has
          to be absorbed somewhere ABOVE the button; absorbing it below (a flex-1
          feature list) cannot work, because the feature lists are different
          lengths too. Reserving here is the only point where all three agree.

          Only from `md` up, where the cards sit side by side and alignment is
          something you can see. Stacked on a phone there is nothing to align and
          a floor would just add dead space between each card and its button. */}
      <Box className="mb-6">
        <Box className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-bold">{price}</span>
          {billingPeriod && (
            <span className="text-muted-foreground">{billingPeriod}</span>
          )}
        </Box>

        <p className="text-muted-foreground md:min-h-[8.75rem]">{description}</p>
      </Box>

      {renderButton()}

      <ul className="space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingPlan;
