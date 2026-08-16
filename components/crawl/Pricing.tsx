'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Check, ArrowRight } from "lucide-react";
import { Box } from '@hanzo/ui'

interface PlanProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  ctaHref: string;
}

const Plan = ({ name, price, period, features, highlighted, ctaLabel, ctaHref }: PlanProps) => (
  <div
    className={`rounded-xl p-6 flex flex-col ${
      highlighted
        ? "bg-primary/5 border-2 border-foreground/20"
        : "bg-secondary/50 border border-border"
    }`}
  >
    <h3 className="text-xl font-semibold text-foreground mb-1">{name}</h3>
    <Box className="mb-6">
      <span className="text-3xl font-bold text-foreground">{price}</span>
      {period && <span className="text-muted-foreground">/{period}</span>}
    </Box>
    <ul className="space-y-3 mb-8 flex-1">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-foreground/70 mt-0.5 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    <a
      href={ctaHref}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-full transition-colors text-sm ${
        highlighted
          ? "bg-primary/10 hover:bg-primary/20 text-primary-foreground"
          : "bg-transparent border border-border hover:border-neutral-500 text-foreground"
      }`}
    >
      {ctaLabel}
      <ArrowRight className="w-4 h-4" />
    </a>
  </div>
);

const plans: PlanProps[] = [
  {
    name: "Build",
    price: "$49",
    period: "mo",
    features: [
      "50,000 pages/month",
      "5 concurrent crawlers",
      "JavaScript rendering",
      "Markdown + structured output",
      "REST API access",
    ],
    ctaLabel: "Get Started",
    ctaHref: "https://docs.hanzo.ai/docs/crawl",
  },
  {
    name: "Scale",
    price: "$499",
    period: "mo",
    highlighted: true,
    features: [
      "500,000 pages/month",
      "25 concurrent crawlers",
      "Priority JS rendering",
      "LLM-based extraction",
      "Direct Search + Vector integration",
    ],
    ctaLabel: "Get Started",
    ctaHref: "https://docs.hanzo.ai/docs/crawl",
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited pages",
      "Unlimited concurrent crawlers",
      "Dedicated rendering pool",
      "Custom extraction schemas",
      "Dedicated support + SLA",
    ],
    ctaLabel: "Contact Sales",
    ctaHref: "/contact",
  },
];

const Pricing = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <Box className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You are paying for the hosted API and the browsers behind it, not for the code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {plans.map((plan) => (
            <Plan key={plan.name} {...plan} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-sm text-muted-foreground max-w-2xl mx-auto"
        >
          The crawler is open source, and so is the headless-browser image it escalates to.
          Run both yourself for nothing. The plans buy you somebody else operating them.
        </motion.p>
      </Box>
    </section>
  );
};

export default Pricing;
