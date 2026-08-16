'use client'

import React from "react";
import { motion } from "@/components/motion";
import ChromeText from "@/components/ui/chrome-text";
import { Box } from '@hanzo/ui'

interface EfficiencyCardProps {
  title: string;
  mainText: string;
  subText: string;
  initialY: number;
  delay: number;
}

const EfficiencyCard = ({ title, mainText, subText, initialY, delay }: EfficiencyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-neutral-900/30 rounded-xl p-8 border border-neutral-800 flex flex-col items-center text-center"
    >
      <ChromeText as="h3" className="text-2xl font-bold mb-4">
        {title}
      </ChromeText>
      <p className="text-foreground/80 mb-4">
        {mainText}
      </p>
      <p className="text-muted-foreground">
        {subText}
      </p>
    </motion.div>
  );
};

const EfficiencySection = () => {
  const efficiencyItems = [
    {
      title: "Read only what the query names",
      mainText: "A row store reads the whole row to answer a question about two of its fields. A column store reads the two.",
      subText: "Fewer bytes off the disk, fewer bytes to decompress, and more of the working set fits in memory.",
      initialY: 30,
      delay: 0
    },
    {
      title: "One instruction, many values",
      mainText: "Values from a single column sit next to each other in memory in the same representation, so a sum or a filter runs across a block of them with vector instructions instead of once per row.",
      subText: "That layout is also what keeps the CPU cache full rather than chasing pointers.",
      initialY: 30,
      delay: 0.2
    },
    {
      title: "Sorted, so a range is contiguous",
      mainText: "Rows are written in the order of the table's sorting key and grouped into parts by partition, so a query bounded by time reads a run of adjacent blocks instead of seeking around the disk.",
      subText: "Marks inside each part let the scan jump straight to the block that could hold the answer.",
      initialY: 30,
      delay: 0.3
    },
    {
      title: "Compression chosen per column",
      mainText: "A rising timestamp compresses as deltas. A repeated label compresses as a dictionary. A general-purpose compressor runs over whatever is left.",
      subText: "Less data on disk is also less data on the wire once the query is spread across nodes.",
      initialY: 30,
      delay: 0.4
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-neutral-900/50">
      <Box className="max-w-6xl mx-auto">
        <Box className="text-center mb-16">
          <ChromeText as="h2" className="text-3xl md:text-5xl font-bold mb-6">
            Where the speed comes from
          </ChromeText>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Nothing exotic. Read less, decompress less, and touch memory in the order the CPU wants it.
          </p>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {efficiencyItems.map((item, index) => (
            <EfficiencyCard
              key={index}
              title={item.title}
              mainText={item.mainText}
              subText={item.subText}
              initialY={item.initialY}
              delay={item.delay}
            />
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default EfficiencySection;
