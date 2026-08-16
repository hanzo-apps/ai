
import React from "react";
import { Server, Database, Shield, Zap, Layers, GitBranch } from "lucide-react";

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TechCard = ({ icon, title, description }: TechCardProps) => {
  return (
    <div className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-6 hover:border-border transition-all duration-300">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const TechStack = () => {
  const techItems = [
    {
      icon: <Server className="h-8 w-8 text-foreground/60" />,
      title: "One Go binary",
      description: "A single container with no queue, no cache tier and no companion services to stand up beside it. Run it locally the same way it runs in production."
    },
    {
      icon: <Database className="h-8 w-8 text-foreground/60" />,
      title: "A store per organisation",
      description: "Tenants are separated by where their data lives rather than by a column, so one tenant's query cannot reach another's rows."
    },
    {
      icon: <Shield className="h-8 w-8 text-foreground/60" />,
      title: "Outside the card boundary",
      description: "Card numbers are tokenized by a separate service. This one is connected to that boundary without being inside it, which is the whole point of drawing one."
    },
    {
      icon: <Zap className="h-8 w-8 text-foreground/60" />,
      title: "Identity from Hanzo IAM",
      description: "Sign-in, organisations and tokens come from IAM. There is no second user table here to fall out of step with the first."
    },
    {
      icon: <Layers className="h-8 w-8 text-foreground/60" />,
      title: "Mounts into the cloud binary",
      description: "It runs on its own or as a subsystem inside the unified Hanzo Cloud binary. Same code, same routes, one fewer process to operate."
    },
    {
      icon: <GitBranch className="h-8 w-8 text-foreground/60" />,
      title: "Open source",
      description: "MIT or Apache-2.0, your choice. Read how your money is handled instead of taking our word for it."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-neutral-900/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What you are running</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Worth knowing before you put your revenue behind it.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techItems.map((item, index) => (
            <TechCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
