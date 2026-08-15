'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Database, Globe, MessageCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Database,
    title: "Index your content",
    description:
      "Push documents at build time or over the REST API. Text fields become searchable as they land; embeddings go to the vector store beside them. Adding a vector field later does not force a text reindex.",
  },
  {
    number: "02",
    icon: Globe,
    title: "Query it from anywhere",
    description:
      "A React hook for search-as-you-type, the REST API for everything else, and an MCP tool so an agent can search the same index a user searches. One index, three callers.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Let people ask instead",
    description:
      "Turn on RAG chat and a question gets an answer built from the passages that were retrieved, each one linked. If the index has nothing, the answer says so rather than inventing one.",
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
            Content in, ranked results out, and a model over the top if you want one.
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
            Works with any docs framework
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Native support for Hanzo Docs, Fumadocs, Nextra, and Docusaurus.
            REST API for everything else.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Hanzo Docs", "Fumadocs", "Nextra", "Docusaurus", "REST API"].map(
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
