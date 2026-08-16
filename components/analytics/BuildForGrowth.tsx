'use client'


import React from "react";
import { motion } from "@/components/motion";
import { TrendingUp, Users, CreditCard, ArrowRight } from "lucide-react";

const BuildForGrowth = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-900/20 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">From a visit to a number</h2>
          <p className="text-xl text-foreground/80">
            A pageview is not worth much on its own. It gets interesting once it is joined to
            the step someone stopped at, the campaign that sent them and the money that followed.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <TrendingUp className="h-8 w-8 text-foreground" />,
              title: "Where they stop",
              description: "Build the funnel from steps you already track and read the drop between them. The step with the cliff is the one worth a week of work.",
              metrics: "Funnels and goals"
            },
            {
              icon: <Users className="h-8 w-8 text-foreground/70" />,
              title: "Whether they return",
              description: "Retention by the week someone arrived. Growth that comes only from new visitors looks identical to growth that lasts, until you look at this.",
              metrics: "Retention and journeys"
            },
            {
              icon: <CreditCard className="h-8 w-8 text-foreground/70" />,
              title: "What it was worth",
              description: "Send the order value with the event and revenue shows up beside the traffic that produced it, split by channel and campaign.",
              metrics: "Revenue and attribution"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/30 rounded-xl p-8 border border-neutral-800"
            >
              <div className="mb-5">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground mb-5">{item.description}</p>
              <div className="text-sm font-medium px-3 py-1 bg-neutral-800 rounded-full inline-block text-foreground/70">
                {item.metrics}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a href="#learn-more" className="inline-flex items-center text-foreground hover:text-foreground/70 transition-colors">
            See what a report looks like <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BuildForGrowth;
