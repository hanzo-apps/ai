'use client'

import React from "react";
import { motion } from "@/components/motion";
import { ArrowRight, Target, BarChart3, Zap, Users } from "lucide-react";
import { Button } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const SenseiMethod = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <Box className="max-w-7xl mx-auto">
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-white/30 text-foreground text-sm font-medium mb-4">
              Principles in Practice
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Sensei Method
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              The Zen of Hanzo is what we believe. The Sensei Method is what an engagement looks like —
              Sensei Group sits with your team and works the problem alongside them.
            </p>

            <div className="space-y-6 mb-8">
              <Box className="flex items-start">
                <Box className="p-2 bg-primary/10 rounded-lg mr-4">
                  <Target className="h-6 w-6 text-foreground" />
                </Box>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Identify First-Principle Goals</h3>
                  <p className="text-muted-foreground">Drill down to the fundamental objectives that drive real value.</p>
                </div>
              </Box>

              <Box className="flex items-start">
                <Box className="p-2 bg-primary/10 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-foreground" />
                </Box>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Rapid Prototyping</h3>
                  <p className="text-muted-foreground">Build quickly, test assumptions, and iterate with purpose.</p>
                </div>
              </Box>

              <Box className="flex items-start">
                <Box className="p-2 bg-primary/10 rounded-lg mr-4">
                  <BarChart3 className="h-6 w-6 text-foreground" />
                </Box>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Data-Driven Decisions</h3>
                  <p className="text-muted-foreground">Measure impact, analyze patterns, and let insights guide strategy.</p>
                </div>
              </Box>

              <Box className="flex items-start">
                <Box className="p-2 bg-primary/10 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-foreground" />
                </Box>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Sensei Mentorship</h3>
                  <p className="text-muted-foreground">Work directly with expert "senseis" to implement and refine your approach.</p>
                </div>
              </Box>
            </div>

            <Button
              className="rounded-full"

            >
              <a href="https://sensei.group" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Visit Sensei Group
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Box className="bg-gradient-to-br from-white/20 to-transparent rounded-2xl p-1">
              <Box className="bg-card backdrop-blur-sm rounded-xl overflow-hidden border border-border">
                <Box className="w-full h-56 rounded-t-xl bg-gradient-to-br from-white/25 via-background/40 to-white/10 border-b border-border flex items-center justify-center">
                  <Box className="text-center">
                    <Box className="text-xs uppercase tracking-widest text-muted-foreground">Sensei Method</Box>
                    <Box className="text-xl font-semibold text-[var(--white)] mt-2">Strategy → Execution</Box>
                  </Box>
                </Box>
                <Box className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">The Impact of Sensei</h3>
                  <p className="text-muted-foreground mb-6">
                    Through the Sensei Method and Sensei Group, we've helped clients generate over $1 billion in
                    revenue and take more than a hundred products to market.
                  </p>
                  <Box className="flex flex-wrap gap-4">
                    <Box className="bg-primary/10 px-4 py-2 rounded-lg">
                      <span className="text-2xl font-bold text-foreground">$1B+</span>
                      <p className="text-sm text-muted-foreground">Client Revenue</p>
                    </Box>
                    <Box className="bg-primary/10 px-4 py-2 rounded-lg">
                      <span className="text-2xl font-bold text-foreground">100+</span>
                      <p className="text-sm text-muted-foreground">Product Launches</p>
                    </Box>
                    <Box className="bg-primary/10 px-4 py-2 rounded-lg">
                      <span className="text-2xl font-bold text-foreground">10+</span>
                      <p className="text-sm text-muted-foreground">Years Experience</p>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </section>
  );
};

export default SenseiMethod;
