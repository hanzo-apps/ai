'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Box } from '@hanzo/ui'
const ZapArchitecture = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <Box className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it is put together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Many agents on one side, many tool servers on the other, one address in the middle.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-background/50 border border-border rounded-xl p-8 font-mono text-sm overflow-x-auto"
        >
          <pre className="text-foreground/80">
{`┌─────────────────────────────────────────────────────────────────┐
│                        Agent Swarm                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │ Agent 1 │  │ Agent 2 │  │ Agent 3 │  │ Agent N │    ...      │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘             │
│       │            │            │            │                   │
│       └────────────┴─────┬──────┴────────────┘                   │
│                          │                                       │
│                          ▼                                       │
│              ┌───────────────────────┐                           │
│              │      `}<span className="text-foreground/70">ZAP Gateway</span>{`       │                           │
│              │   zap://localhost:9999│                           │
│              │                       │                           │
│              │  • Schema Federation  │                           │
│              │  • Request Routing    │                           │
│              │  • Capability Control │                           │
│              └───────────┬───────────┘                           │
│                          │                                       │
│       ┌──────────────────┼──────────────────┐                    │
│       │                  │                  │                    │
│       ▼                  ▼                  ▼                    │
│  ┌─────────┐       ┌─────────┐       ┌─────────┐                │
│  │`}<span className="text-foreground/70">MCP Srv</span>{` │       │`}<span className="text-foreground/70">ZAP Srv</span>{` │       │`}<span className="text-foreground/70">MCP Srv</span>{` │                │
│  │ GitHub  │       │ Native  │       │ Slack   │    ...         │
│  └─────────┘       └─────────┘       └─────────┘                │
└─────────────────────────────────────────────────────────────────┘`}
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mt-8"
        >
          <Box className="text-center">
            <Box className="text-3xl font-bold text-foreground/70 mb-2">N:1</Box>
            <Box className="text-muted-foreground">Every agent, one address</Box>
          </Box>
          <Box className="text-center">
            <Box className="text-3xl font-bold text-foreground/70 mb-2">1:M</Box>
            <Box className="text-muted-foreground">One schema over every backend</Box>
          </Box>
          <Box className="text-center">
            <Box className="text-3xl font-bold text-foreground/70 mb-2">0</Box>
            <Box className="text-muted-foreground">Copies of the same tool server</Box>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default ZapArchitecture;
