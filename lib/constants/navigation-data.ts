import {
  AppWindow,
  Bot,
  Brain,
  Cloud,
  Code,
  FileText,
  MessageSquare,
  PlayCircle,
  Plug,
  Rocket,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserCheck,
  Users,
} from 'lucide-react';

import { cloudCategories } from '@/lib/data/cloud-primitives';

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string; size?: number | string }>;
  github?: string;
  docs?: string;
  /** Console quick-launch deep link (mega-menu primary click). */
  console?: string;
  /** Short menu descriptor shown under the leaf title. */
  desc?: string;
  featured?: boolean;
};

export type NavSection = {
  title: string;
  /** Optional column subtitle — used by the products mega-menu for the GCP-equivalent line. */
  subtitle?: string;
  items: NavItem[];
};

const ORG = 'https://github.com/hanzoai';
const DOCS = 'https://docs.hanzo.ai';

// Products mega-menu — derived from the single cloud-primitive taxonomy
// (lib/data/cloud-primitives.ts) so the nav, the generated overview pages, and
// the route table can never drift apart. Ten categories, two rows of five.
export const productsNav: NavSection[] = cloudCategories.map((category) => ({
  title: category.title,
  subtitle: category.gcp,
  items: category.items.map((item) => ({
    title: item.title,
    href: item.href,
    icon: item.icon,
    github: item.github,
    docs: item.docs,
    console: item.console,
    desc: item.desc,
  })),
}));

export const featuredProducts: NavItem[] = [
  { title: "Hanzo Dev", href: "/dev", icon: Terminal, description: "AI engineer that ships PRs from a sentence", github: `${ORG}/dev`, docs: `${DOCS}/dev`, featured: true },
  { title: "Bot", href: "/bot", icon: Bot, description: "Multi-agent simulation framework", github: `${ORG}/bot`, docs: `${DOCS}/bot`, featured: true },
  { title: "Playground", href: "/playground", icon: PlayCircle, description: "Hands-on sandbox for every Hanzo product", github: ORG, docs: `${DOCS}/playground`, featured: true },
  { title: "Agents", href: "/agents", icon: Sparkles, description: "Agentic harness — SDK + runtime + tools", github: `${ORG}/agent`, docs: `${DOCS}/agent`, featured: true },
  { title: "MCP", href: "/mcp", icon: Plug, description: "Model Context Protocol — open-source DX layer", github: `${ORG}/mcp`, docs: `${DOCS}/mcp`, featured: true },
  { title: "Zen Models", href: "/zen", icon: Brain, description: "Open-weight frontier models", github: ORG, docs: `${DOCS}/zen`, featured: true },
  { title: "Studio", href: "/studio", icon: AppWindow, description: "Visual AI engine — node-graph workflows (studio.hanzo.ai)", github: `${ORG}/studio`, docs: `${DOCS}/studio`, featured: true },
  { title: "Cloud", href: "/cloud", icon: Cloud, description: "AI Cloud infrastructure", github: `${ORG}/cloud`, docs: `${DOCS}/cloud`, featured: true },
  { title: "IAM", href: "/iam", icon: UserCheck, description: "Identity & access (hanzo.id)", github: `${ORG}/iam`, docs: `${DOCS}/iam`, featured: true },
];

export const resourcesNav: NavSection[] = [
  {
    title: "Documentation",
    items: [
      { title: "Docs", href: "/docs", description: "Product documentation", icon: FileText },
      { title: "API Reference", href: "/docs/api", description: "REST API documentation", icon: Code },
      { title: "CLI", href: "/docs/cli", description: "Command line reference", icon: Terminal },
      { title: "SDK", href: "/docs/sdk", description: "Client libraries", icon: Code },
    ],
  },
  {
    title: "Community",
    items: [
      { title: "GitHub", href: ORG, description: "Open source", icon: Code },
      { title: "Discord", href: "https://discord.gg/hanzo", description: "Chat with the community", icon: MessageSquare },
      { title: "Blog", href: "/blog", description: "Latest news", icon: FileText },
      { title: "Press", href: "/press", description: "Press kit", icon: ScrollText },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about", description: "Our story", icon: Users },
      { title: "Team", href: "/team", description: "Meet the team", icon: Users },
      { title: "Leadership", href: "/leadership", description: "Leadership", icon: Users },
      { title: "Brand", href: "/brand", description: "Brand assets", icon: AppWindow },
      { title: "Careers", href: "/careers", description: "Open positions", icon: Rocket },
      { title: "Security", href: "/security", description: "Security practices", icon: ShieldCheck },
      { title: "Open Source", href: "/open-source", description: "Open source program", icon: Code },
    ],
  },
];

export type MainNavItem = {
  title: string;
  href?: string;
  sections?: NavSection[];
};

export const mainNav: MainNavItem[] = [
  { title: "Products", sections: productsNav },
  { title: "Resources", sections: resourcesNav },
  { title: "Pricing", href: "/pricing" },
  { title: "Enterprise", href: "/enterprise" },
];

export const utilityNav = {
  search: { title: "Search", href: "/search", icon: Search },
  chat: { title: "Chat with AI", href: "/chat", icon: MessageSquare },
};
