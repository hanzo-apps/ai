'use client'

import React from "react";
import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Story</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card backdrop-blur-sm border border-border rounded-lg p-8 mb-10"
        >
          <p className="text-muted-foreground md:text-lg leading-relaxed mb-6">
            Hanzo AI, Inc. began as Crowdstart, a crowd-powered marketing platform built under Verus Media.
            Zach Kelling founded it in the mid-2010s with David Tai as co-founder. It took the Hanzo name in
            2016 and joined the first Techstars Kansas City cohort the following year.
          </p>

          <p className="text-muted-foreground md:text-lg leading-relaxed mb-6">
            The work kept moving down the stack. Marketing tools led to the data behind them, then to
            blockchain and tokenized crowdfunding, and then to the developer tools we needed ourselves —
            Hanzo Dev, the coding agent, and Hanzo Base, the backend it writes against. Both are open source.
          </p>

          <p className="text-muted-foreground md:text-lg leading-relaxed">
            Today Hanzo builds the AI cloud: Enso, our frontier model; the open-weight Zen family, co-designed
            with the Zoo Labs Foundation; and the services an application actually needs — databases, identity,
            secrets, storage, search. Most of it is open source, and the same code that runs our cloud runs on
            your own hardware. Enso is the exception, and it stays on Hanzo Cloud.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
