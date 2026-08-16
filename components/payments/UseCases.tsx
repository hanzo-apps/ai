'use client'


import React from "react";
import { motion } from "@/components/motion";
import { ShoppingCart, Repeat, LayoutGrid, CreditCard } from "lucide-react";

const useCases = [
  {
    icon: <ShoppingCart className="h-6 w-6 text-foreground" />,
    title: "Selling in several countries",
    points: ['Local methods', 'Currency routing', 'One checkout', 'Rules per country'],
    description: "You sell in more than one country and each one wants a different payment method. Add the connector, write the rule, leave the checkout alone."
  },
  {
    icon: <Repeat className="h-6 w-6 text-foreground" />,
    title: "Recovering declines",
    points: ['Retry on a second processor', 'Decline reasons', 'Renewal recovery', 'Rules per code'],
    description: "Renewals fail for reasons that have nothing to do with the customer. Retrying through a second processor turns some of those failures back into payments."
  },
  {
    icon: <LayoutGrid className="h-6 w-6 text-foreground" />,
    title: "Leaving a processor",
    points: ['Move a percentage first', 'No checkout rewrite', 'The same API', 'Roll back at once'],
    description: "The reason nobody switches is the rewrite. When the integration is here, moving is a routing change, and you can move a percentage first."
  },
  {
    icon: <CreditCard className="h-6 w-6 text-foreground" />,
    title: "Comparing two of them",
    points: ['Approval rates side by side', 'Split by percentage', 'One traffic, two routes', 'Cost per authorization'],
    description: "Run both and read the approval rates side by side. The argument about which processor is better becomes a measurement."
  }
];

const UseCases = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--black)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">When a switch earns its place</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            One processor and one country does not need one. These four do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-6"
            >
              <div className="bg-neutral-800/50 p-3 rounded-full w-fit mb-4">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground mb-4">{useCase.description}</p>
              
              <div className="mt-6 pt-6 border-t border-neutral-800">
                <h4 className="text-lg font-medium mb-3">Key Features</h4>
                <div className="grid grid-cols-2 gap-3">
                  {useCase.points.map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm text-muted-foreground">
                        {useCase.points[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 bg-gradient-to-r from-neutral-900/50 to-white/10 border border-neutral-800 rounded-lg text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Start Quickly, Scale Instantly</h3>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-6">
            No-code solutions available, with setup completed in minutes. Scalable from startup to enterprise-level with consistent reliability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-md transition duration-200 text-primary-foreground">
              Get Started
            </button>
            <button className="px-6 py-3 bg-transparent border border-neutral-600 hover:border-neutral-400 rounded-md transition duration-200">
              View Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
