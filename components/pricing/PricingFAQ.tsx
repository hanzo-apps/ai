
import React from "react";
import { Faq } from "@/components/ui/faq";

const PricingFAQ = () => {
  // The questions a reader actually arrives with, answered against what we
  // actually sell: access and capacity. The old list described a ladder that no
  // longer exists — "Plus", and a free tier "for everyone" — and talked about
  // credits, which is not something we offer.
  //
  // No price is written here. Prices live in the catalog and the cards read
  // them; an answer that names a number is a second copy that goes stale the
  // day pricing moves, which is exactly how "Plus $100" outlived Plus.
  const faqs = [
    {
      question: "Why pay when the AI is free?",
      answer: "Free gets you the free models with a daily limit and a little sandbox compute. Paid gets you the best models, higher limits, and real compute. You are paying for access and capacity — the better the plan, the more of both."
    },
    {
      question: "What do I get for paying more?",
      answer: "Three things, and they move together: which models you can call, how much you can call them, and how much compute you can run. Each card lists what that plan opens up."
    },
    {
      question: "Is it free to use?",
      answer: "Yes. Create an account and use the free models with a daily limit, plus a small amount of sandbox compute. No card required, and nothing is granted to your balance at signup. Everything open source is also free to download and run yourself."
    },
    {
      question: "What happens when I hit the free limit?",
      answer: "Your allowance renews. If you are hitting it regularly, a paid plan raises the ceiling and opens the better models."
    },
    {
      question: "How does pricing work?",
      answer: "Two ways to pay, and you can use both. A monthly plan raises your limits and opens the better models. Pay as you go bills only for what you actually use, at the published per-model rates, with no subscription and no monthly minimum."
    },
    {
      question: "What counts as usage?",
      answer: "Model calls are billed on tokens in and tokens out at the rate published for that model. Compute is billed for what you run. Anything your plan does not cover draws on your balance."
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
    <div className="max-w-3xl mx-auto my-16 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      
      <Faq items={faqs} />
    </div>
  );
};

export default PricingFAQ;
