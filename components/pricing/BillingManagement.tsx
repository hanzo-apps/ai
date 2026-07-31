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
      <div className="flex flex-wrap gap-4">
        {/* The console is where a subscription is actually managed, and it is
            first-party, so this navigates in place rather than opening a tab the
            way the external Discord link beside it does. This control carried no
            href and no onClick — it rendered as a button, next to one that
            works, and did nothing when clicked. */}
        <Button
          className="bg-[var(--black)] hover:bg-secondary text-[var(--white)] border border-border px-6 py-6"
          onClick={() => { window.location.href = 'https://cloud.hanzo.ai/billing' }}
        >
          Manage Subscription
        </Button>
        <Button 
          variant="outline" 
          className="border-border hover:bg-[var(--white)]/5 px-6 py-6"
          onClick={() => window.open('https://discord.com/invite/XthHQQj', '_blank')}
        >
          Join Discord
        </Button>
      </div>
    </div>
  );
};

export default BillingManagement;
