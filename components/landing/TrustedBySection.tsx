'use client'

import React from "react";
import { motion } from "framer-motion";
import { partnerLogos } from "@/lib/constants/partner-logos";
import { PartnerLogoRow } from "@/components/shared";

const TrustedBySection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-3">
            Backed by builders. Used by teams shipping AI.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hanzo is backed by leading technology partners and used across AI, commerce, media, infrastructure, and developer tooling.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <PartnerLogoRow
            logos={partnerLogos}
            invert
            className="gap-x-10 gap-y-6"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
