'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Search, Filter, Ruler, Database, Minimize2, Server } from "lucide-react";
import { Box } from '@hanzo/ui'

const features = [
  {
    icon: Search,
    title: "High-Performance Search",
    description:
      "HNSW-based approximate nearest neighbor search delivers sub-10ms queries across billions of vectors with tunable accuracy-speed tradeoffs.",
  },
  {
    icon: Filter,
    title: "Flexible Filtering",
    description:
      "Combine vector similarity with payload-based metadata filters in a single query. Filter by any field without sacrificing search speed.",
  },
  {
    icon: Ruler,
    title: "Multiple Distance Metrics",
    description:
      "Choose cosine similarity, dot product, or Euclidean distance per collection. Match the metric to your embedding model for optimal results.",
  },
  {
    icon: Database,
    title: "Payload Storage",
    description:
      "Attach arbitrary JSON metadata to every vector. Store, filter, and retrieve rich context alongside your embeddings.",
  },
  {
    icon: Minimize2,
    title: "Quantization",
    description:
      "Scalar, product, and binary quantization reduce memory usage by up to 32x while maintaining search quality. Fit more vectors per node.",
  },
  {
    icon: Server,
    title: "Horizontal Scaling",
    description:
      "Shard collections across nodes with automatic replication. Scale reads and writes independently as your data grows.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <Box className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for production AI workloads
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Semantic search, RAG, and recommendations --
            all backed by a battle-tested vector engine.
          </p>
        </motion.div>

        <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-neutral-500 transition-colors"
            >
              <Box className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-primary/5">
                <feature.icon className="h-6 w-6 text-foreground/70" />
              </Box>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default Features;
