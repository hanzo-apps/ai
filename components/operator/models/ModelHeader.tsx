'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Box } from '@hanzo/ui'
const ModelHeader = () => {
  return (
    <Box className="text-center max-w-3xl mx-auto mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-6">
          Where the model comes from
        </h2>
        <p className="text-xl text-foreground/80">
          One environment variable decides. The container, the desktop and
          the tools are identical in all four cases
        </p>
      </motion.div>
    </Box>
  );
};

export default ModelHeader;
