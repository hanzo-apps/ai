
import React from 'react';
import ChromeText from "@/components/ui/chrome-text";
import { Box } from '@hanzo/ui'

interface UseCaseCardProps {
  title: string;
  description: string;
  features: string[];
}

const UseCaseCard = ({ title, description, features }: UseCaseCardProps) => {
  return (
    <Box
      className="bg-card rounded-xl p-8"
      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 5%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)" }}
    >
      <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      <ul className="space-y-2 text-muted-foreground">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </Box>
  );
};

const MachinesUseCases = () => {
  const useCases = [
    {
      title: "Training runs",
      description: "A job that needs cards for hours and nothing for the rest of the week.",
      features: [
        "GPU sizes named from the list the API returns",
        "GPU-hours metered while the job runs",
        "Cancel and the hours used so far are billed, then the job stops"
      ]
    },
    {
      title: "Serving a model",
      description: "A machine that stays up because something is calling it.",
      features: [
        "Run Hanzo Engine on a card you rented",
        "Terminate it when the traffic goes away",
        "The bill follows the machine, not a reservation"
      ]
    },
    {
      title: "Work that will not fit in a request",
      description: "Renders, batches and simulations that take longer than an HTTP call.",
      features: [
        "A queue per GPU, plus a shared any-GPU lane",
        "Each item says which node claimed it",
        "Read the queue instead of guessing where a job went"
      ]
    },
    {
      title: "Agents that need a computer",
      description: "An agent with a machine under it, launched and torn down as one thing.",
      features: [
        "Bind a cloud agent to a machine",
        "Message it, or stop it, by name",
        "Tearing down the pair unbinds the agent first"
      ]
    }
  ];

  return (
    <section
      className="py-20"
      style={{ background: `linear-gradient(to bottom, transparent, var(--primary)10)` }}
    >
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="text-center mb-16">
          <ChromeText as="h2" className="text-3xl font-bold mb-4">
            When you want a whole machine
          </ChromeText>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Reach for one when the work outlasts a request, or needs a card of its own
          </p>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              title={useCase.title}
              description={useCase.description}
              features={useCase.features}
            />
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default MachinesUseCases;
