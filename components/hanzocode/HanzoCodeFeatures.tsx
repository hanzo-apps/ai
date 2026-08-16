'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Code, Zap, MessageSquare, Globe, Bot, FileCode, Infinity, Network } from "lucide-react";
import { Box } from '@hanzo/ui'

const FeatureCard = ({ title, description, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8 h-full"
    >
      <Box className="flex flex-col h-full">
        <Box className="mb-6">
          {icon}
          <h3 className="text-2xl font-semibold mt-4 mb-2">{title}</h3>
          <p className="text-foreground/80 mb-4">{description}</p>
        </Box>
      </Box>
    </motion.div>
  );
};

const HanzoCodeFeatures = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950" id="features">
      <Box className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">What the agent can do here</h2>
          <p className="text-xl text-foreground/80">
            The same agent the terminal runs, with the editor around it
          </p>
        </motion.div>
        
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            title="It opens the files"
            description="The agent reads what it needs from the repo rather than waiting for you to paste it into a chat"
            icon={<Code className="h-10 w-10 text-foreground" />}
          />
          
          <FeatureCard 
            title="Several at once"
            description="Big jobs split across agents, each working in its own git worktree so they never edit the same file"
            icon={<Zap className="h-10 w-10 text-foreground" />}
          />
          
          <FeatureCard 
            title="Think harder when it matters"
            description="Set the effort per task and trade speed for depth only on the work that needs it"
            icon={<MessageSquare className="h-10 w-10 text-foreground" />}
          />
          
          <FeatureCard 
            title="Nothing hidden"
            description="You see the model, the whole prompt and the context window on every request — no silent swaps, no quiet compression"
            icon={<Globe className="h-10 w-10 text-foreground" />}
          />
          
          <FeatureCard 
            title="It reviews its own work"
            description="A watcher checks every change in a separate worktree and offers fixes you can apply — and never blocks the session"
            icon={<Bot className="h-10 w-10 text-foreground" />}
          />
          
          <FeatureCard 
            title="Commands run in a sandbox"
            description="Opening a repo means running its scripts, so it runs them in a sandbox every time. Drop it for one run and it is never saved"
            icon={<FileCode className="h-10 w-10 text-foreground" />}
          />
          
          <FeatureCard 
            title="Your tools, when you ask"
            description="Add MCP tools for files, databases or APIs. The repo's own tools stay off until you turn them on"
            icon={<Infinity className="h-10 w-10 text-foreground" />}
          />
          
          <FeatureCard 
            title="Any model, one login"
            description="Enso is ours. The same sign-in reaches every other model on the gateway, and the bill lands in one place"
            icon={<Network className="h-10 w-10 text-foreground" />}
          />
        </Box>
      </Box>
    </section>
  );
};

export default HanzoCodeFeatures;
