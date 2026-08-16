'use client'

import React from "react";
import {
  PieChart, Coins, Target, Banknote,
  FileText, PenLine, Users, TrendingUp, Shield, Fingerprint
} from "lucide-react";
import { Box } from '@hanzo/ui'

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Box className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-border transition-colors duration-300">
      <Box className="bg-primary/5 p-3 rounded-lg w-fit mb-4">
        {icon}
      </Box>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Box>
  );
};

const Features = () => {
  const features = [
    {
      icon: <PieChart className="h-6 w-6 text-foreground/60" />,
      title: "Ownership, fully diluted",
      description: "The number that matters is not how many shares exist, it is what everyone owns once the options and the notes convert. That is the default view here."
    },
    {
      icon: <Coins className="h-6 w-6 text-foreground/60" />,
      title: "Share Classes",
      description: "Common, preferred, and custom share classes. Track authorized shares, par value, and voting rights."
    },
    {
      icon: <Target className="h-6 w-6 text-foreground/60" />,
      title: "Option grants",
      description: "ISO and NSO, with the cliff and the schedule attached to the grant. Vested-to-date is computed from the dates rather than typed in and left to rot."
    },
    {
      icon: <Banknote className="h-6 w-6 text-foreground/60" />,
      title: "SAFEs and notes",
      description: "Caps, discounts and interest held as terms, not as a note in a folder. What they convert into at a given price is a calculation you can run before you agree to it."
    },
    {
      icon: <FileText className="h-6 w-6 text-foreground/60" />,
      title: "Equity Plans",
      description: "Option pools and equity incentive plans. Manage board-approved pools with real-time utilization tracking."
    },
    {
      icon: <PenLine className="h-6 w-6 text-foreground/60" />,
      title: "Built-in E-Signing",
      description: "Integrated document signing for equity grants, board consents, and stock purchase agreements."
    },
    {
      icon: <Users className="h-6 w-6 text-foreground/60" />,
      title: "Stakeholders",
      description: "Founders, employees, investors and advisors, each seeing their own holding and nobody else's. The exercise window after someone leaves is a date the system knows, not one they have to remember."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-foreground/60" />,
      title: "Waterfall",
      description: "At an exit price, who gets paid and in what order. Preferences mean the founders' share is not their percentage, and this is where that becomes visible."
    },
    {
      icon: <Shield className="h-6 w-6 text-foreground/60" />,
      title: "Audit Trail",
      description: "Complete audit history for every transaction. SOC 2 compatible controls and data integrity."
    },
    {
      icon: <Fingerprint className="h-6 w-6 text-foreground/60" />,
      title: "SSO Authentication",
      description: "Passkeys, Google SSO, and Hanzo IAM single sign-on for secure access."
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The instruments, modelled</h2>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            A spreadsheet can hold these numbers. It cannot tell you what they become at the next price.
          </p>
        </Box>
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </Box>
      </div>
    </section>
  );
};

export default Features;
