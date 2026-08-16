'use client'


import React from "react";
import { motion } from "@/components/motion";
import { PartnerLogoRow } from "@/components/shared";
import { infrastructureLogos } from "@/lib/constants/partner-logos";
import { Box } from '@hanzo/ui'

const HanzoCodeCompanies = () => {

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--black)]/60">
      <Box className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-xl text-muted-foreground">Ships to the clouds your team already uses</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <PartnerLogoRow logos={infrastructureLogos} invert className="opacity-70" />
        </motion.div>
      </Box>
    </section>
  );
};

export default HanzoCodeCompanies;
