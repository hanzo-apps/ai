'use client'

import React from "react";
import {
  PenLine, FileText, Users, Webhook,
  Shield, Layers, Mail, Fingerprint, Eye, Globe
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
      icon: <PenLine className="h-6 w-6 text-foreground/60" />,
      title: "Signatures",
      description: "Fields for a signature, initials, a date, a name, a checkbox or free text, placed where you want them on the page. The completed document carries a certificate recording each signer, the time, and the address they signed from."
    },
    {
      icon: <FileText className="h-6 w-6 text-foreground/60" />,
      title: "Templates",
      description: "The contract you send fifty times a month gets its fields placed once. After that, sending it is choosing a recipient."
    },
    {
      icon: <Users className="h-6 w-6 text-foreground/60" />,
      title: "Teams",
      description: "Documents belong to a team rather than to whoever uploaded them, so a person leaving does not take the paperwork with them. Roles decide who can send, who can only see."
    },
    {
      icon: <Webhook className="h-6 w-6 text-foreground/60" />,
      title: "Webhooks and an API",
      description: "Your system creates the document, adds the recipients and sends it. A webhook fires when somebody opens, signs or declines, so your side of the workflow moves without anybody watching an inbox."
    },
    {
      icon: <Shield className="h-6 w-6 text-foreground/60" />,
      title: "Security & Compliance",
      description: "End-to-end encryption, a signed trail on every document, and data that stays in the region you choose."
    },
    {
      icon: <Layers className="h-6 w-6 text-foreground/60" />,
      title: "Your name on it",
      description: "The signing page carries your logo and your colours on your own domain, so the person signing sees the company they are doing business with rather than the company we are."
    },
    {
      icon: <Mail className="h-6 w-6 text-foreground/60" />,
      title: "The chasing, done for you",
      description: "The invitation, the reminder for the one person who has not got to it yet, and the copy of the finished document to everybody who signed."
    },
    {
      icon: <Fingerprint className="h-6 w-6 text-foreground/60" />,
      title: "Signing in",
      description: "A passkey, or a password kept as a bcrypt digest. A document can also demand that a recipient authenticate before it will open, so the link alone is not enough to read it."
    },
    {
      icon: <Eye className="h-6 w-6 text-foreground/60" />,
      title: "Where it is right now",
      description: "Sent, opened, signed, declined — per recipient, as it happens. You know which of five people is holding up a deal without asking any of them."
    },
    {
      icon: <Globe className="h-6 w-6 text-foreground/60" />,
      title: "Twelve languages",
      description: "German, English, Spanish, French, Italian, Japanese, Korean, Dutch, Polish, Brazilian Portuguese, Albanian and Chinese. The signer reads the page in theirs, not yours."
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What is in it</h2>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            The parts of signing that are actually work: placing the fields, chasing the signers, and proving
            afterwards that it happened.
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
