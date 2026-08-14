
import React from 'react';
import { Shield, Database, Server } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

interface EnterpriseFeatureProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
}

const EnterpriseFeature = ({ icon: Icon, title, description }: EnterpriseFeatureProps) => {
  return (
    <div
      className="bg-card rounded-xl p-6 flex flex-col items-center text-center"
      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 5%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)" }}
    >
      <Icon className="h-12 w-12 mb-4" />
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

const MachinesEnterprise = () => {
  const features = [
    {
      icon: Shield,
      title: "Scoped to your organization",
      description: "A machine belongs to one org and is named within it. Every read and every terminate is checked against the org on your token, not against the id in the URL."
    },
    {
      icon: Database,
      title: "Bring your own account",
      description: "Link a DigitalOcean, AWS or GCP account and the clusters it holds fold into the same fleet. Your capacity, your contract, one place to see it."
    },
    {
      icon: Server,
      title: "Pick the region deliberately",
      description: "Launches name a region from the list the API returns, so where a workload runs is a decision you made rather than one that was made for you."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ChromeText as="h2" className="text-3xl font-bold mb-4">
            Whose machine it is
          </ChromeText>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ownership, region and account are decisions the API makes you state
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <EnterpriseFeature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachinesEnterprise;
