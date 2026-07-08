'use client'

import React from "react";
import { motion } from "framer-motion";
import { providerCatalog } from "@hanzo/usage";

// Every provider the usage plane can track and Hanzo Cloud can route —
// names and icon paths come from the @hanzo/usage catalog (one source of
// truth); the SVGs are mirrored under public/providers/.
const PROVIDERS = providerCatalog.filter((p) => p.id !== "hanzo");

const ProviderGridSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Every provider. One cloud.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {PROVIDERS.length}+ AI providers tracked, connected, and routable through
            Hanzo — with limits, credits, and spend in one plane.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2"
        >
          {PROVIDERS.map((p) => (
            <div
              key={p.id}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors"
              title={p.name}
            >
              {p.icon ? (
                <img
                  src={`/providers/${p.id}.svg`}
                  alt=""
                  aria-hidden
                  className="w-6 h-6 opacity-80"
                />
              ) : (
                <span className="w-6 h-6 rounded-md bg-neutral-800 text-[11px] font-semibold text-neutral-300 flex items-center justify-center">
                  {p.name.slice(0, 1)}
                </span>
              )}
              <span className="text-[11px] text-neutral-400 text-center leading-tight">
                {p.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProviderGridSection;
