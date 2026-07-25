'use client'

import React from "react";
import { motion } from "framer-motion";
import { backerLogos, infrastructureLogos } from "@/lib/constants/partner-logos";
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
            Backed by builders. Runs where you already run.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hanzo AI is a Techstars company. The platform deploys on the clouds and silicon you already trust.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-10"
        >
          <div>
            <p className="mb-5 text-xs uppercase tracking-widest text-muted-foreground">Backed by</p>
            <PartnerLogoRow logos={backerLogos} invert className="gap-x-10 gap-y-6" />
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-widest text-muted-foreground">Runs on</p>
            <PartnerLogoRow logos={infrastructureLogos} invert className="gap-x-10 gap-y-6" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
