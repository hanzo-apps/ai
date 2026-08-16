'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Globe, FileText, Database } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Fetch",
    description:
      "One guarded HTTP request. The dialer refuses private and link-local addresses on every hop, so a URL that redirects somewhere it should not reach is stopped there rather than after the fact.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Extract",
    description:
      "The document is reduced to the subtree a reader would call the content, plus the title, description and canonical URL the page claims for itself. If the HTML alone is not enough, this is where a headless browser gets involved.",
  },
  {
    number: "03",
    icon: Database,
    title: "Render",
    description:
      "That subtree becomes Markdown with its structure intact — headings, lists, code and links, with relative URLs resolved against the page. It is the format a model reads best and a person can still diff.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each step is its own file and can be tested without the other two.
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-6 bg-secondary/50 border border-border rounded-xl p-6"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center">
                <step.icon className="h-6 w-6 text-foreground/70" />
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground mb-1">
                  Step {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integrations note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Two ways to call it
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Over HTTP at /v1/crawl when your code is doing the asking, or over MCP when a model is.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Static Sites", "SPAs", "Documentation", "E-Commerce", "Forums", "REST API"].map(
              (name) => (
                <span
                  key={name}
                  className="px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm text-foreground/70"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
