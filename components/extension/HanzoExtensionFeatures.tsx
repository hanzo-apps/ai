'use client'


import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Lock, Globe, Lightbulb, Share2, FileText, Command } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 h-full"
    >
      <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-primary/20">
        <Icon className="h-6 w-6 text-foreground" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </motion.div>
  );
};

const HanzoExtensionFeatures = () => {
  const features = [
    {
      icon: Sparkles,
      title: "It uses your session",
      description: "The agent drives the browser you are already signed into, so a page behind a login is a page it can read. Nothing has to be scraped from the outside."
    },
    {
      icon: Zap,
      title: "No port to open",
      description: "The extension talks to the local Hanzo daemon through a native messaging host over a Unix socket. There is no WebSocket, no localhost port, and nothing else on the machine can dial in."
    },
    {
      icon: Lock,
      title: "Connected means registered",
      description: "It only reports itself connected once the daemon lists it as a provider. An open pipe to a wedged process is the failure this replaced, and it is checked on every tick."
    },
    {
      icon: Globe,
      title: "Three browsers, one behaviour",
      description: "Chrome, Firefox and Safari builds come out of the same source. The evaluate rule is shared, so the same snippet from a caller behaves identically in all three."
    },
    {
      icon: Lightbulb,
      title: "Tabs are addressable",
      description: "Each browser registers separately, so listing tabs asks the browser that is active — and naming a tab id from another browser's list is how you reach the other one."
    },
    {
      icon: Share2,
      title: "The rest of your tools, too",
      description: "The same repo carries connectors for the software your work already lives in — documents, tickets, design files, mail, calendars — so an agent reaches them the same way it reaches a tab."
    },
    {
      icon: FileText,
      title: "Read a page as text",
      description: "It hands back page content, console messages and network requests, which is what makes it useful for checking your own site rather than just browsing someone else's."
    },
    {
      icon: Command,
      title: "Installs from a file",
      description: "Load it unpacked in Chrome or as a temporary add-on in Firefox while you are working on it. The build produces all three targets in one command."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--black)]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            The extension registers as a provider on the local fabric. Whatever can reach the fabric can then reach a tab.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HanzoExtensionFeatures;
