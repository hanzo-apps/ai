'use client'

import React from "react";
import {
  BarChart3, FolderLock, Shield, Paintbrush,
  Eye, Mail, Globe, Webhook, Users, Fingerprint
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-border transition-colors duration-300">
      <div className="bg-primary/5 p-3 rounded-lg w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6 text-foreground/60" />,
      title: "Page-by-page analytics",
      description: "Time spent on each page, how far they got, and whether they came back. Which page an investor re-read twice tells you what the next call is about."
    },
    {
      icon: <FolderLock className="h-6 w-6 text-foreground/60" />,
      title: "Data rooms",
      description: "A folder tree rather than a single file, shared as one link. Diligence is forty documents and a hundred questions, and both sides need to know what is in scope."
    },
    {
      icon: <Shield className="h-6 w-6 text-foreground/60" />,
      title: "Access controls",
      description: "A password, a verified email, an NDA to accept, an expiry date, downloads off. Set them per link, so the same document can be open to one person and shut to another."
    },
    {
      icon: <Paintbrush className="h-6 w-6 text-foreground/60" />,
      title: "Custom Branding",
      description: "White-label with your logo, colors, and custom domain. Present a professional experience to investors."
    },
    {
      icon: <Eye className="h-6 w-6 text-foreground/60" />,
      title: "Watermarking",
      description: "The viewer's own email printed across every page. It does not make a screenshot impossible; it makes an anonymous one impossible, which is the part that changes behaviour."
    },
    {
      icon: <Mail className="h-6 w-6 text-foreground/60" />,
      title: "Email verification",
      description: "A code to the address before the document opens. Otherwise a forwarded link is a stranger, and your analytics are counting the wrong person."
    },
    {
      icon: <Globe className="h-6 w-6 text-foreground/60" />,
      title: "Custom Domains",
      description: "Use your own domain for sharing links. Build trust with a branded URL."
    },
    {
      icon: <Webhook className="h-6 w-6 text-foreground/60" />,
      title: "Webhooks",
      description: "A view fires an event. Knowing someone opened the deck while you are still in the thread is worth more than knowing it on Monday."
    },
    {
      icon: <Users className="h-6 w-6 text-foreground/60" />,
      title: "Team Management",
      description: "Multi-tenant workspaces with role-based access. Manage sharing across your organization."
    },
    {
      icon: <Fingerprint className="h-6 w-6 text-foreground/60" />,
      title: "SSO Authentication",
      description: "Passkeys, Google, LinkedIn, SAML SSO, and Hanzo IAM single sign-on."
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">A link you still control</h2>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            Every setting here is per link, so one document can be shared ten different ways.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
