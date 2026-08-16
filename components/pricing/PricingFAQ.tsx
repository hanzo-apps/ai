
import React from "react";
import { Faq } from "@/components/ui/faq";
import { Box } from '@hanzo/ui'

const PricingFAQ = () => {
  // The questions a reader actually arrives with, answered against what we
  // actually sell. The old list described a ladder that no longer exists —
  // "Plus", a free tier "for everyone", and credits framed as a CAP ("within
  // the plan limits") when they are a GRANT. That last one mattered most: it
  // taught the reader the opposite of the offer.
  //
  // No price is written here. Prices live in the catalog and the cards read
  // them; an answer that names a number is a second copy that goes stale the
  // day pricing moves, which is exactly how "Plus $100" outlived Plus.
  const faqs = [
    {
      question: "Why pay when the AI is free?",
      answer: "Free runs on our free model pool and is rate limited. Paid opens the best models, lifts the limits, and includes spendable credit every month — so a good part of what you pay comes back to you as usage. Each plan card shows exactly how much."
    },
    {
      question: "What is the monthly credit?",
      answer: "Every paid plan includes spendable credit each month, usable on AI or on compute. The amount differs by plan and each card states it. It renews every billing cycle and is spent before your balance is."
    },
    {
      question: "Is it free to use?",
      answer: "Yes — create an account and use chat and the app on our free models, with a limited amount of use each day. There is no card required and no credit granted at signup; the free tier is free because the models are, not because we hand out a balance. Everything open source is also free to download and run yourself."
    },
    {
      question: "What happens when I hit the free limit?",
      answer: "The limit is a rate, so it clears shortly. If you keep hitting it, a paid plan raises the ceiling, opens the best models and adds monthly credit."
    },
    {
      question: "How does pricing work?",
      answer: "Two ways to pay, and you can use both. A monthly plan gives you higher limits, better models and a credit allowance each month. Pay as you go bills only for what you actually use, at the published per-model rates, with no subscription and no monthly minimum."
    },
    {
      question: "What counts as usage?",
      answer: "Model calls are billed on tokens in and tokens out at the rate published for that model. Compute is billed for what you run. Your plan credit is spent first, and anything beyond it draws on your balance."
    },
    {
      question: "How are users counted on Business?",
      answer: "A user is an individual with login access to your workspace. Business is billed per user per month with a two seat minimum. End users of the applications you build do not count."
    },
    {
      question: "Can I upgrade or downgrade at any time?",
      answer: "Yes. Upgrading takes effect immediately and you are billed the prorated difference. Downgrading takes effect at the end of the current billing period."
    },
    {
      question: "Do you offer a discount for annual billing?",
      answer: "Yes. Annual billing is cheaper per month than month to month on every paid plan, and the saving is shown on each plan before you buy."
    },
    {
      question: "What are my payment options?",
      answer: "All major cards. Enterprise customers can arrange invoice billing. Payments are processed by our payment provider and we never store your card."
    },
    {
      question: "Do you offer pricing for education or nonprofits?",
      answer: "Yes, for both. Contact sales with your institution or nonprofit credentials and we will sort out the right rate."
    },
    {
      question: "How is my data used?",
      answer: "Your content is yours. On paid plans we do not train on your data. We use industry standard encryption in transit and at rest, and you can request deletion at any time."
    }
  ];

  return (
    <Box className="max-w-3xl mx-auto my-16 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      
      <Faq items={faqs} />
    </Box>
  );
};

export default PricingFAQ;
