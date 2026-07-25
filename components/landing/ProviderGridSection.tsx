'use client'

import React from "react";
import { motion } from "framer-motion";
import { providerCatalog } from "@hanzo/usage";

// Every provider the usage plane can track and Hanzo Cloud can route — names and
// icon ids come from the @hanzo/usage catalog (one source of truth); the SVGs are
// mirrored under public/providers/. Google's models are shown as "Gemini"; the
// redundant GCP-platform tile is dropped so the open-source-AI-cloud positioning
// carries no Google Cloud brand.
const PROVIDERS = providerCatalog.filter((p) => p.id !== "hanzo" && p.id !== "vertexai");

// Where a tile goes: the account-connect surface of the usage plane — the SAME
// hub the "Connect your accounts" CTA (UsagePlaneSection, just above) points at.
// The `?provider=<id>` is derived from the catalog id (no parallel list, no 56
// hardcoded URLs): it lands on the real Accounts tab today (never a 404) and
// pre-selects the provider once the console reads the hint. Forward-compatible.
const CONNECT_HUB = "https://console.hanzo.ai/ai-accounts/accounts";
const connectUrl = (id: string) => `${CONNECT_HUB}?provider=${encodeURIComponent(id)}`;

// The catalog carries no `icon` for a few entries (OpenAI, Azure OpenAI, …). We
// ship a monochrome mark for the flagship (OpenAI) under public/providers and fall
// back to a uniform monogram for the rest — one consistent tile either way.
const LOCAL_ICONS = new Set(["openai"]);
const iconId = (p: { id: string; icon?: string }): string | null =>
  p.icon || LOCAL_ICONS.has(p.id) ? p.id : null;

// One card for every provider. The logo is rendered as a CSS mask filled with the
// current text color, so ANY source SVG — colored (Codebuff green), near-black
// (OpenCode), white, or `currentColor` — normalizes to ONE monochrome silhouette
// that follows the theme (white on dark, dark on light). Hover brightens the mark,
// label, and border: the affordance that says "clickable" beyond the pointer +
// focus ring. The whole tile is a real link (keyboard-focusable, aria-labelled).
function ProviderTile({ p }: { p: { id: string; name: string; icon?: string } }) {
  const icon = iconId(p);
  return (
    <a
      href={connectUrl(p.id)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Connect ${p.name}`}
      title={p.name}
      className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border bg-secondary/40 transition-all duration-200 hover:bg-secondary hover:border-foreground/25 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {icon ? (
        <span
          aria-hidden
          className="w-6 h-6 bg-current text-foreground/70 transition-colors duration-200 group-hover:text-foreground"
          style={{
            WebkitMaskImage: `url(/providers/${icon}.svg)`,
            maskImage: `url(/providers/${icon}.svg)`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      ) : (
        <span className="w-6 h-6 rounded-md bg-foreground/10 text-[11px] font-semibold text-foreground/70 flex items-center justify-center transition-colors duration-200 group-hover:text-foreground">
          {p.name.slice(0, 1)}
        </span>
      )}
      <span className="text-[11px] text-muted-foreground text-center leading-tight transition-colors duration-200 group-hover:text-foreground">
        {p.name}
      </span>
    </a>
  );
}

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
            Connect Claude, Gemini, Grok, Groq, DeepSeek, Bedrock — {PROVIDERS.length}+ AI
            providers in all. Hanzo is the login and usage manager in front of every one:
            see limits, credits, and spend in one plane, then let the native router serve
            the most optimal model for each request.
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
            <ProviderTile key={p.id} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProviderGridSection;
