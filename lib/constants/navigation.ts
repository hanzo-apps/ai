/**
 * The Solutions menu.
 *
 * This file used to carry the whole site nav, built from a hand-typed product
 * taxonomy. Which products exist has one owner now — the commerce catalog, read
 * at build time by scripts/sync-catalog.mjs into lib/data/catalog.json — and the
 * live header and footer render from that (components/home/shell.tsx). The
 * product, footer and main-nav groups here answered the same questions from a
 * stale second copy and nothing imported them; only Solutions is still rendered,
 * by /solutions/capabilities and /solutions/industries.
 */

export type NavLink = string | { name: string; href: string; description?: string };

export type NavGroup = {
  title: string;
  description?: string;
  href: string;
  items: NavLink[];
};

export const solutions: NavGroup[] = [
  {
    title: "Use Cases",
    href: "/solutions",
    items: [
      { name: "RAG Applications", href: "/solutions/rag", description: "Build retrieval-augmented generation apps" },
      { name: "AI Agents", href: "/solutions/agents", description: "Deploy autonomous AI agents" },
      { name: "Real-time AI", href: "/solutions/realtime", description: "Stream AI responses in real-time" },
      { name: "Fine-tuning", href: "/solutions/fine-tuning", description: "Train custom models on your data" },
      { name: "Computer Vision", href: "/solutions/vision", description: "Process images and video" },
      { name: "Voice & Audio", href: "/solutions/audio", description: "Speech recognition and synthesis" }
    ]
  },
  {
    title: "Stacks",
    href: "/solutions/stacks",
    items: [
      { name: "SaaS Starter", href: "/solutions/stacks/saas", description: "Launch your SaaS in days" },
      { name: "Analytics Stack", href: "/solutions/stacks/analytics", description: "Self-hosted analytics platform" },
      { name: "E-commerce Stack", href: "/solutions/stacks/ecommerce", description: "AI-powered storefront" },
      { name: "Developer Portal", href: "/solutions/stacks/devportal", description: "API documentation and SDKs" }
    ]
  },
  {
    title: "Industries",
    href: "/solutions/industries",
    items: [
      { name: "Healthcare", href: "/solutions/industries/healthcare", description: "Healthcare-ready AI" },
      { name: "Finance", href: "/solutions/industries/finance", description: "Enterprise-grade security" },
      { name: "Retail", href: "/solutions/industries/retail", description: "Personalization and recommendations" },
      { name: "Enterprise", href: "/solutions/industries/enterprise", description: "Private cloud deployment" }
    ]
  }
];

