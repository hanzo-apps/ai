'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Activity, Users, Zap, Cpu, Server, Network } from "lucide-react";
import { Box } from '@hanzo/ui'

const Scaling = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-white/10">
      <Box className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-4">
            What happens as it grows
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            The parts that scale, and the parts that are simply not in the way
          </p>
        </motion.div>

        <Box className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-white/20 to-transparent rounded-xl border border-border p-6"
          >
            <Activity className="h-8 w-8 text-foreground mb-4" />
            <h3 className="text-xl font-semibold text-[var(--white)] mb-2">A change costs its audience</h3>
            <p className="text-foreground/80">
              A record is written once and handed to the subscribers already
              attached to it. The work is the number of people watching, not the
              size of the collection they are watching.
            </p>

            <Box className="mt-6 pt-6 border-t border-neutral-800">
              <Box className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Cost of a write</span>
                <span className="text-[var(--white)] font-medium">Per subscriber</span>
              </Box>
              <Box className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <Box className="bg-primary h-full rounded-full" style={{ width: "100%" }}></Box>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-white/20 to-transparent rounded-xl border border-border p-6"
          >
            <Users className="h-8 w-8 text-foreground mb-4" />
            <h3 className="text-xl font-semibold text-[var(--white)] mb-2">A stream is a response</h3>
            <p className="text-foreground/80">
              Not a process, not a socket server beside the API — an HTTP
              response left open. They are cheap to hold, and one that goes away
              releases what it held without anything needing to be told.
            </p>

            <Box className="mt-6 pt-6 border-t border-neutral-800">
              <Box className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Per subscriber</span>
                <span className="text-[var(--white)] font-medium">One open response</span>
              </Box>
              <Box className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <Box className="bg-primary h-full rounded-full" style={{ width: "95%" }}></Box>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-white/20 to-transparent rounded-xl border border-border p-6"
          >
            <Network className="h-8 w-8 text-foreground mb-4" />
            <h3 className="text-xl font-semibold text-[var(--white)] mb-2">Isolated by tenant</h3>
            <p className="text-foreground/80">
              Every org's subscribers sit on that org's own broker, over that
              org's own data. Adding a tenant adds a broker rather than widening
              a shared one, so nobody's growth is anybody else's problem.
            </p>

            <Box className="mt-6 pt-6 border-t border-neutral-800">
              <Box className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Blast radius</span>
                <span className="text-[var(--white)] font-medium">One tenant</span>
              </Box>
              <Box className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <Box className="bg-primary h-full rounded-full" style={{ width: "90%" }}></Box>
              </Box>
            </Box>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Box className="bg-[var(--black)]/40 rounded-lg border border-neutral-800 p-4 flex items-center">
            <Zap className="h-8 w-8 text-foreground mr-4" />
            <div>
              <h4 className="text-[var(--white)] font-medium">No polling</h4>
              <p className="text-muted-foreground text-sm">The client asks once, not every second</p>
            </div>
          </Box>

          <Box className="bg-[var(--black)]/40 rounded-lg border border-neutral-800 p-4 flex items-center">
            <Cpu className="h-8 w-8 text-foreground mr-4" />
            <div>
              <h4 className="text-[var(--white)] font-medium">Reconnects itself</h4>
              <p className="text-muted-foreground text-sm">A dropped stream reopens with a fresh grant</p>
            </div>
          </Box>

          <Box className="bg-[var(--black)]/40 rounded-lg border border-neutral-800 p-4 flex items-center">
            <Server className="h-8 w-8 text-foreground mr-4" />
            <div>
              <h4 className="text-[var(--white)] font-medium">Nothing extra to run</h4>
              <p className="text-muted-foreground text-sm">The same binary that serves the API serves the stream</p>
            </div>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default Scaling;
