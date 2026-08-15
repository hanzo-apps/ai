'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Check, Code2, PanelLeft, Plug, Settings, Shield } from "lucide-react";

const HanzoCodeCompatibility = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">One agent, four places to run it</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            The editor is one way in. The session behind it is the same wherever you start it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl p-8 border border-neutral-700"
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">Where you can start a session</h3>

            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-foreground/70 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[var(--white)]">Hanzo Code:</span>
                  <span className="text-foreground/80 ml-2">the editor itself, with the agent already in it</span>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-foreground/70 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[var(--white)]">VS Code:</span>
                  <span className="text-foreground/80 ml-2">an extension, when you would rather keep your own build</span>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-foreground/70 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[var(--white)]">JetBrains:</span>
                  <span className="text-foreground/80 ml-2">a plugin, for the IDEs that were never VS Code</span>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-foreground/70 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[var(--white)]">Terminal:</span>
                  <span className="text-foreground/80 ml-2">type hanzo in any repo and get the same session</span>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-foreground/70 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[var(--white)]">CI:</span>
                  <span className="text-foreground/80 ml-2">hand it the task up front and it runs headless</span>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-neutral-900/80 rounded-lg p-6 border border-neutral-800">
                <PanelLeft className="h-10 w-10 text-foreground mb-4" />
                <h4 className="text-lg font-semibold mb-2">Your extensions</h4>
                <p className="text-foreground/80 text-sm">The extension API is unchanged, so what you install today keeps working</p>
              </div>
              
              <div className="bg-neutral-900/80 rounded-lg p-6 border border-neutral-800">
                <Code2 className="h-10 w-10 text-foreground mb-4" />
                <h4 className="text-lg font-semibold mb-2">Your settings</h4>
                <p className="text-foreground/80 text-sm">Keybindings, themes and the settings file carry over as they are</p>
              </div>
              
              <div className="bg-neutral-900/80 rounded-lg p-6 border border-neutral-800">
                <Plug className="h-10 w-10 text-foreground mb-4" />
                <h4 className="text-lg font-semibold mb-2">Your tools</h4>
                <p className="text-foreground/80 text-sm">Add MCP tools the agent can call — files, databases, APIs, or your own</p>
              </div>
              
              <div className="bg-neutral-900/80 rounded-lg p-6 border border-neutral-800">
                <Shield className="h-10 w-10 text-foreground mb-4" />
                <h4 className="text-lg font-semibold mb-2">Your source</h4>
                <p className="text-foreground/80 text-sm">The whole editor is open source, so what it does to your repo is readable</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HanzoCodeCompatibility;
