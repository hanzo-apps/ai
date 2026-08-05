'use client'

import React from "react";
import { Button } from "@hanzo/ui";
import { CreditCard } from "lucide-react";

const BillingManagement = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16 p-8 rounded-xl border border-border backdrop-blur-xl bg-[var(--black)] hover:border-border transition-all">
      <div className="flex items-center gap-4 mb-5">
        <CreditCard className="h-8 w-8 text-[var(--white)]" />
        <h2 className="text-2xl font-medium">Billing Management</h2>
      </div>
      <p className="text-foreground/80 mb-6 leading-relaxed">
        Manage your subscription easily. Need assistance? Join our Discord server for immediate support.
      </p>
      {/* Both of these are navigations, so both are anchors.

          They were `<Button onClick={…}>`, and @hanzo/ui's Button with no child
          anchor renders a div[role=button][tabindex=0] — focusable, but a div
          does not synthesize a click from Enter or Space the way a real button
          does, and React's onClick is only a DOM click listener. Measured on the
          live page: Tab reached both, focus was visible, and Enter and Space did
          NOTHING on either, while a mouse click on the same element navigated
          fine. That is WCAG 2.1.1 (Keyboard, Level A) — the two controls on this
          page a keyboard-only user could not operate.

          `asChild` keeps the styling and hands behaviour back to the <a>, which
          also restores cmd-click, middle-click and "copy link address". The plan
          CTAs in PricingPlan already do exactly this; these were the stragglers.

          The console is first-party so it navigates in place; Discord is
          external so it opens a tab. */}
      <div className="flex flex-wrap gap-4">
        <Button
          asChild
          className="bg-[var(--black)] hover:bg-secondary text-[var(--white)] border border-border px-6 py-6"
        >
          <a href="https://cloud.hanzo.ai/billing">Manage Subscription</a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-border hover:bg-[var(--white)]/5 px-6 py-6"
        >
          <a
            href="https://discord.gg/CJCyAsm9Vr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord
          </a>
        </Button>
      </div>
    </div>
  );
};

export default BillingManagement;
