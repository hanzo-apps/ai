'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Search, Sparkles, GitMerge, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Full text",
    description:
      "Typo tolerance, facets and filters. A user who types Kubernets still finds the page, and a user who wants only last quarter's docs can say so.",
  },
  {
    icon: Sparkles,
    title: "Vector",
    description:
      "Bring your own embedding model — ours or anyone's — and search by meaning. Useful exactly when the user does not know the word your document uses.",
  },
  {
    icon: GitMerge,
    title: "Hybrid",
    description:
      "Reciprocal Rank Fusion merges the two lists by rank rather than by score, so a keyword hit and a semantic hit compete fairly without a threshold you have to tune.",
  },
  {
    icon: MessageSquare,
    title: "RAG chat",
    description:
      "The retrieved passages go to a model and come back as an answer with links to what it read. Streamed, so the first sentence arrives before the last one is written.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Four ways to ask, one index
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The same documents answer all four. Choose per query, not
            per deployment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-neutral-500 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-primary/5">
                <feature.icon className="h-6 w-6 text-foreground/70" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
