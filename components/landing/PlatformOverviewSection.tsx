'use client'

import React from "react";
import { motion } from "framer-motion";
import { cloudCategories } from "@/lib/data/cloud-primitives";

// Category overview cards — derived from the ONE cloud-primitive taxonomy
// (lib/data/cloud-primitives.ts), the same source the mega-menu and the
// generated overview pages read, so the categories here cannot drift from the
// ones we sell. One capability = one name = one /v1/<name>.
//
// `href` is the category id the `/products/[categoryId]` route generates from,
// so a card cannot point at a page that does not exist. Without it these cards
// were the only place the taxonomy surfaced near the top of the site AND a dead
// end — the categories were visible and unreachable.
const CATEGORY_CARDS = cloudCategories.map((c) => ({
  icon: c.icon,
  title: c.title,
  desc: c.tagline,
  href: `/products/${c.id}`,
}));

const PlatformOverviewSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Every capability. One API.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Everything the cloud does is one route — <code className="font-mono text-foreground/90 text-[0.95em]">api.hanzo.ai/v1/&lt;capability&gt;</code>. Breadth without the overwhelm.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORY_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-6 rounded-xl border border-border bg-secondary/50 hover:bg-secondary hover:border-border/80 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverviewSection;
