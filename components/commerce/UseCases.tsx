
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

// The `color` prop is gone. It was interpolated into class names
// (`text-${color}-400`, `from-${color}-500/20`), and Tailwind only generates a
// utility it can SEE spelled out in the source — an interpolated name is never
// spelled out, so those three classes emitted no rule and the amber accent has
// never rendered. The brand is monochrome anyway; these are now the site's own
// foreground tokens, written literally.
interface UseCaseCardProps {
  title: string;
  description: string;
  image?: string;
  index: number;
}

const UseCaseCard = ({ title, description, image, index }: UseCaseCardProps) => {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-neutral-800 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex flex-col h-full`}>
      <Box className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="link" size="sm" className="text-foreground/60 hover:text-foreground/60 p-0 w-fit">
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </Box>
      <Box className="w-full md:w-1/2 bg-neutral-900/50 h-48 md:h-auto relative overflow-hidden">
        <Box className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></Box>
        <Box className="absolute inset-0 flex items-center justify-center">
          <Box className="text-foreground text-9xl opacity-10 font-bold">{index + 1}</Box>
        </Box>
      </Box>
    </div>
  );
};

const UseCases = () => {
  const useCases = [
    {
      title: "A storefront you designed",
      description: "You have a front end you like and do not want a theme system telling you how it works. This gives you the catalogue, the cart and the checkout as calls, and stays out of the rendering."
    },
    {
      title: "One catalogue, several stores",
      description: "A brand with regional shops, or an agency running stores for clients. Stores are scoped by organisation and can price the same product differently."
    },
    {
      title: "Selling a subscription and a thing",
      description: "Hardware with a plan, or a course with a membership. Orders and subscriptions are in one service, so the customer has one history rather than two accounts."
    },
    {
      title: "Taking payment inside your own product",
      description: "You are not building a shop, you are charging for what you already made. Use the checkout, the invoices and the meters, and ignore the rest."
    }
  ];

  return (
    <section className="py-16 bg-[var(--black)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="text-center mb-12">
          <h2 className="text-3xl font-bold">When to reach for it</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Four shapes that fit. If none of them is yours, a hosted shop is probably the easier answer.
          </p>
        </Box>
        
        <Box className="grid grid-cols-1 gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              title={useCase.title}
              description={useCase.description}
              index={index}
            />
          ))}
        </Box>
      </div>
    </section>
  );
};

export default UseCases;
