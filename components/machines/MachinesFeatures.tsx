'use client'


import React from 'react';
import { motion } from "@/components/motion";
import { Cpu, Server, Zap, Network, BarChart, Globe } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-card rounded-xl p-6"
      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 25%, transparent)" }}
    >
      <Icon className="h-10 w-10 mb-4" />
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
};

const MachinesFeatures = () => {
  const features = [
    {
      icon: Cpu,
      title: "Ask what exists",
      description: "The sizes and regions you can launch into are an endpoint, not a page in the docs. Read them, then pick one — nothing to keep in sync by hand.",
      delay: 0
    },
    {
      icon: Server,
      title: "Price it before you buy it",
      description: "A launch with dryRun returns the price and creates nothing. The same call without it creates the machine, so what you were quoted is what you asked for.",
      delay: 0.1
    },
    {
      icon: Zap,
      title: "Metered to the organization",
      description: "Time is debited from your org's prepaid balance while a machine is up. Before it launches, the cloud says whether you may — and what is missing if you may not.",
      delay: 0.2
    },
    {
      icon: Network,
      title: "One list, whoever owns them",
      description: "Rented machines, the droplets and cluster workers behind them, and your own hardware that dialed in with hanzo link all appear as one fleet, deduplicated.",
      delay: 0.3
    },
    {
      icon: BarChart,
      title: "A row per accelerator",
      description: "The GPU view counts real cards: from the size of the nodes you rented, and from what your own workers report through nvidia-smi. Where there is no inventory, it returns nothing rather than inventing something.",
      delay: 0.4
    },
    {
      icon: Globe,
      title: "A machine can carry an agent",
      description: "Bind a cloud agent to a machine and the pair is one thing to launch, message, stop and tear down. Unbinding is separate, so the agent can move without the machine going with it.",
      delay: 0.5
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ChromeText as="h2" className="text-3xl font-bold mb-4">
            How renting one works
          </ChromeText>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every step is an API call, so anything you do once by hand you can put in a script afterwards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachinesFeatures;
