'use client'

import React from "react";
import { motion } from "@/components/motion";
import {
  Layers,
  Gauge,
  Network,
  Shield,
  Cpu,
  GitMerge,
  Blocks,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "One tool server, not one per agent",
    description:
      "Running an MCP server beside every agent duplicates the process, the schema and the idle memory as many times as you have agents. Put the servers behind one endpoint and the agents share them.",
  },
  {
    icon: Gauge,
    title: "The work you removed cannot be slow",
    description:
      "Fewer processes to schedule and no text to turn into objects on either side of a call. That is where the time goes at scale, and the way to get it back is not to do it.",
  },
  {
    icon: Network,
    title: "It carries the protocol you already use",
    description:
      "MCP, A2A and ACP layer on ZAP without changing what your code says. ZAP is underneath them, not instead of them.",
  },
  {
    icon: Blocks,
    title: "The message is already the object",
    description:
      "Structs, lists, text and bytes are laid out on the wire in the shape a reader wants them, eight-byte aligned. Reading a field is a pointer and an offset into the buffer that arrived.",
  },
  {
    icon: Cpu,
    title: "Nothing to collect afterwards",
    description:
      "A reader that walks the buffer in place allocates nothing per message, so there is no garbage to collect and no pause to tune away later.",
  },
  {
    icon: GitMerge,
    title: "Existing MCP servers, wrapped",
    description:
      "Point the daemon at the MCP servers you already run — over stdio, over HTTP, over a Unix socket — and it presents their tools as one federated schema. Agents connect once and see everything.",
  },
  {
    icon: Shield,
    title: "Keys arrive instead of being fetched",
    description:
      "ZAP carries its own key distribution: a service subscribes once and receives the snapshot, then rotations and revocations as they happen. Nothing polls a JWKS endpoint, and a revoked key stops working when it is revoked rather than when a cache expires.",
  },
  {
    icon: Workflow,
    title: "Three implementations, one wire",
    description:
      "Go, Rust and TypeScript, held wire-compatible against a single schema file. The schema is the contract, and an incompatible change bumps its identifier rather than hoping nobody notices.",
  },
];

const ZapFeatures = () => {
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
            Why bother
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            JSON over HTTP is fine until a hundred agents are calling the same tools. Then the cost is the
            copies, and the fix is to stop making them.
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
              className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-border transition-colors"
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

export default ZapFeatures;
