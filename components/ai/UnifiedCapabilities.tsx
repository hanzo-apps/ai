'use client'


import React from "react";
import { motion } from "@/components/motion";
import { 
  Code, Brain, Database, Bot, Search, FileText, Workflow, 
  BarChart3, Lock, MessageSquare, Layers, Zap
} from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import { Box } from '@hanzo/ui'

const capabilities = [
  {
    icon: Brain,
    title: "Models",
    description: "The Zen family and frontier models from elsewhere, all reached by name at the same endpoint"
  },
  {
    icon: Database,
    title: "Vectors",
    description: "Embedding storage and indexing, so retrieval sits next to your data instead of in a service beside it"
  },
  {
    icon: FileText,
    title: "Documents",
    description: "Upload a PDF or a folder of text, get it chunked and indexed, and ask questions across all of it"
  },
  {
    icon: Search,
    title: "Search",
    description: "Keyword and meaning in one query, merged by rank, so an exact product code and a vague description both land"
  },
  {
    icon: Bot,
    title: "Agents",
    description: "A model, instructions, and tools it may call — one agent, or several behind a router that picks"
  },
  {
    icon: Code,
    title: "Code models",
    description: "zen5-coder reads a million tokens of context, which is most repositories, so it answers about the code as it is"
  },
  {
    icon: Workflow,
    title: "Workflows",
    description: "Steps that branch, run in parallel, or loop — for work whose order matters and that a prompt cannot express"
  },
  {
    icon: BarChart3,
    title: "Cost and latency",
    description: "Per call, per key, per model. Where the money went, and which request was slow"
  },
  {
    icon: Lock,
    title: "Keys and secrets",
    description: "Sign in through Hanzo IAM, keep credentials in Hanzo KMS, and scope every key to what it is allowed to reach"
  },
  {
    icon: MessageSquare,
    title: "Chat",
    description: "A chat surface you can open, embed, or self-host — with threads, streaming, and tools already attached"
  },
  {
    icon: Layers,
    title: "Prompts",
    description: "Keep versions, run them against cases, and see which one you actually shipped"
  },
  {
    icon: Zap,
    title: "Where it runs",
    description: "Our regions, your cluster, or your laptop. Open weights mean the third option is real"
  }
];

const UnifiedCapabilities = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <Box className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/10"></Box>
      
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Box className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ChromeText as="h2" className="text-3xl md:text-4xl font-bold mb-6">
              One API, one key
            </ChromeText>
            <p className="text-xl text-foreground/80">
              These are separate products elsewhere, each with its own account,
              its own key and its own bill. Here they are one endpoint that
              already knows who you are
            </p>
          </motion.div>
        </Box>
        
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gradient-to-br from-white/10 to-white/10 border border-border rounded-xl p-6"
            >
              <capability.icon className="h-8 w-8 text-foreground mb-4" />
              <h3 className="text-xl font-bold text-[var(--white)] mb-2">{capability.title}</h3>
              <p className="text-foreground/80">{capability.description}</p>
            </motion.div>
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default UnifiedCapabilities;
