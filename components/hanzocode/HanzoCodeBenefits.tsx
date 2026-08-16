'use client'


import React from "react";
import { motion } from "@/components/motion";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const HanzoCodeBenefits = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--black)]">
      <Box className="max-w-7xl mx-auto">
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">A fork of VS Code</h2>
            <p className="text-xl text-foreground/80 mb-6">
              Not a plugin bolted on and not a new editor to learn. Your extensions, your keybindings, your settings and your terminal all come with you, because it is the editor you already use with the agent built into it.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">It reads the repo, not the file</h2>
            <p className="text-xl text-foreground/80 mb-6">
              The agent opens the files it needs, runs the commands it needs to check itself, and shows you the diff before anything lands. What it knows about your project comes from reading it, not from what happened to be on screen.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Say it in words</h2>
            <p className="text-xl text-foreground/80 mb-6">
              Describe the change and let it work across files. When it finishes, you review a diff — the same review you would have done if a colleague had written it.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Open source, in open beta</h2>
            <p className="text-xl text-foreground/80 mb-6">
              The whole editor is in the open. It is early, we say so, and the issues are public — which is the only honest way to hand somebody the thing they write code in all day.
            </p>

            <a href="#features" className="text-foreground hover:text-foreground/70 font-medium">
              What it does
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden"
          >
            <Box className="h-96 bg-neutral-900 flex items-center justify-center p-8">
              <div className="space-y-4 text-left w-full">
                <Box className="border-l-4 border-white pl-4 py-2">
                  <h3 className="font-semibold text-[var(--white)]">What comes with you</h3>
                  <p className="text-foreground/80">Extensions from the marketplace you already install from, unchanged.</p>
                </Box>

                <Box className="border-l-4 border-border pl-4 py-2">
                  <p className="text-foreground/80">Your keybindings, your settings file, your themes, your workspace layout.</p>
                </Box>

                <Box className="border-l-4 border-border pl-4 py-2">
                  <p className="text-foreground/80">The integrated terminal, the debugger, and the source control panel you know.</p>
                </Box>
              </div>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </section>
  );
};

export default HanzoCodeBenefits;
