'use client'

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Blocks, ArrowRight, BookOpen, Download } from "lucide-react";
import {
  SURFACES,
  SURFACE_CATEGORIES,
  SURFACE_ACTIONS,
  type Surface,
} from "@/data/surfaces";

// Internal routes use next/link; external links get target/rel. One helper, one rule.
function SurfaceLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function SurfaceCard({ surface, index }: { surface: Surface; index: number }) {
  const { label, href } = SURFACE_ACTIONS[surface.action];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.04 }}
    >
      <SurfaceLink
        href={href}
        className="group flex h-full flex-col p-5 rounded-xl border border-border/60 bg-secondary/30 hover:bg-secondary/60 hover:border-border transition-all"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl leading-none" aria-hidden="true">
            {surface.icon}
          </span>
          <span className="font-semibold text-foreground">{surface.name}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{surface.blurb}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/70 group-hover:text-brand transition-colors">
          {label}
          <ArrowRight className="w-3 h-3" />
        </span>
      </SurfaceLink>
    </motion.div>
  );
}

const NativeSurfacesSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 border mb-6 border-white/20 text-white/80">
            <Blocks className="w-4 h-4" />
            Native everywhere
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Hanzo AI, native in every tool you use.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            One API key, one identity. Sign in once with{" "}
            <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">@hanzo/iam</code> and the same
            models, tools, and memory follow you across your browser, editor, docs, and apps — all routed through
            the <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">@hanzo/ai</code> gateway.
          </p>
        </motion.div>

        {/* Categorized grid */}
        {SURFACE_CATEGORIES.map((category) => {
          const items = SURFACES.filter((s) => s.category === category.key);
          if (items.length === 0) return null;
          return (
            <div key={category.key} className="mb-10">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                {category.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {items.map((surface, i) => (
                  <SurfaceCard key={surface.name} surface={surface} index={i} />
                ))}
              </div>
            </div>
          );
        })}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://docs.hanzo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Read the install guide
          </a>
          <Link
            href="/download"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm border border-white/25 bg-transparent hover:bg-white/10 hover:border-white/50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download the apps
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NativeSurfacesSection;
