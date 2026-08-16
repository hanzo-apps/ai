'use client'


import React from "react";
import { motion } from "@/components/motion";
import { FileText, Search, Code, ShoppingCart } from "lucide-react";
import { Box } from '@hanzo/ui'

const UseCaseCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8"
    >
      <Icon className="h-10 w-10 text-foreground mb-4" />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </motion.div>
  );
};

const HanzoExtensionUseCases = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950">
      <Box className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">What you would use it for</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Mostly the work that only exists inside a browser window
          </p>
        </motion.div>
        
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UseCaseCard 
            icon={FileText}
            title="Check the change you just made"
            description="An agent that edited a page can open it, look at what rendered, and read the console — instead of telling you it thinks the fix worked."
          />

          <UseCaseCard
            icon={Search}
            title="Behind a login"
            description="An internal dashboard, a vendor console, an admin panel. It runs in the session you already have, so there is no service account to provision for a one-off task."
          />

          <UseCaseCard
            icon={Code}
            title="Debug the request, not the guess"
            description="Network requests and console messages come back as data. When a page misbehaves, the agent can read what the browser saw."
          />

          <UseCaseCard
            icon={ShoppingCart}
            title="The long boring form"
            description="Multi-step flows that exist only in a UI and have no API behind them. It fills them in and tells you where it got stuck."
          />
        </Box>
      </Box>
    </section>
  );
};

export default HanzoExtensionUseCases;
