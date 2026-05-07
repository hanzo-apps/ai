import {
  Activity,
  AppWindow,
  BarChart3,
  Bot,
  Brain,
  Building2,
  Cloud,
  Code,
  Coins,
  Container,
  Cpu,
  CreditCard,
  Database,
  FileText,
  Globe,
  HardDrive,
  Key,
  KeyRound,
  Laptop,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  MessageSquare,
  Network,
  PieChart,
  PlayCircle,
  Plug,
  Radio,
  Rocket,
  ScrollText,
  Search,
  Server,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Terminal,
  UserCheck,
  Users,
  Wallet,
  Workflow,
  Zap,
} from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<any>;
  github?: string;
  featured?: boolean;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

const ORG = 'https://github.com/hanzoai';

export const productsNav: NavSection[] = [
  {
    title: "AI & Agents",
    items: [
      { title: "Zen Models", href: "/zen", icon: Brain, github: `${ORG}/zen`, featured: true },
      { title: "Agents", href: "/agents", icon: Bot, github: `${ORG}/agent`, featured: true },
      { title: "AI Studio", href: "/ai-studio", icon: Sparkles, github: `${ORG}/ai`, featured: true },
      { title: "MCP", href: "/mcp", icon: Plug, github: `${ORG}/mcp` },
      { title: "ZAP", href: "/zap", icon: Zap, github: `${ORG}/zap` },
      { title: "LLM Gateway", href: "/llm", icon: Network, github: `${ORG}/llm` },
    ],
  },
  {
    title: "Developer",
    items: [
      { title: "Dev", href: "/dev", icon: Terminal, github: `${ORG}/dev`, featured: true },
      { title: "Code", href: "/code", icon: Code, github: `${ORG}/code` },
      { title: "Extension", href: "/extension", icon: AppWindow, github: `${ORG}/extension` },
      { title: "Operative", href: "/operative", icon: Workflow, github: `${ORG}/operative` },
    ],
  },
  {
    title: "Apps",
    items: [
      { title: "Chat", href: "/chat", icon: MessageSquare, github: `${ORG}/chat`, featured: true },
      { title: "Search", href: "/search", icon: Search, github: `${ORG}/search`, featured: true },
      { title: "Crawl", href: "/crawl", icon: Globe, github: `${ORG}/crawl` },
      { title: "Base", href: "/base", icon: Database, github: `${ORG}/base` },
      { title: "Commerce", href: "/commerce", icon: ShoppingCart, github: `${ORG}/commerce` },
      { title: "Captable", href: "/captable", icon: PieChart, github: `${ORG}/captable` },
      { title: "Dataroom", href: "/dataroom", icon: FileText, github: `${ORG}/dataroom` },
      { title: "Sign", href: "/sign", icon: ShieldCheck, github: `${ORG}/sign` },
    ],
  },
  {
    title: "Compute",
    items: [
      { title: "Cloud", href: "/cloud", icon: Cloud, github: `${ORG}/cloud`, featured: true },
      { title: "Functions", href: "/functions", icon: Zap, github: `${ORG}/functions` },
      { title: "Machines", href: "/machines", icon: Server, github: `${ORG}/machines` },
      { title: "Edge", href: "/edge", icon: Globe, github: `${ORG}/edge` },
      { title: "Realtime", href: "/realtime", icon: Radio, github: `${ORG}/realtime` },
    ],
  },
  {
    title: "Data",
    items: [
      { title: "Vector", href: "/vector", icon: Sparkles, github: `${ORG}/vector`, featured: true },
      { title: "SQL", href: "/sql", icon: Database, github: `${ORG}/sql` },
      { title: "KV", href: "/kv", icon: Key, github: `${ORG}/kv` },
      { title: "Datastore", href: "/datastore", icon: Database, github: `${ORG}/datastore` },
      { title: "Storage", href: "/storage", icon: HardDrive, github: `${ORG}/storage` },
      { title: "S3", href: "/s3", icon: HardDrive, github: `${ORG}/s3` },
    ],
  },
  {
    title: "Async",
    items: [
      { title: "Flow", href: "/flow", icon: Workflow, github: `${ORG}/flow` },
      { title: "Auto", href: "/auto", icon: PlayCircle, github: `${ORG}/auto` },
      { title: "Tasks", href: "/tasks", icon: ScrollText, github: `${ORG}/tasks` },
      { title: "Pubsub", href: "/pubsub", icon: Radio, github: `${ORG}/pubsub` },
      { title: "MQ", href: "/mq", icon: Network, github: `${ORG}/mq` },
      { title: "Stream", href: "/stream", icon: Activity, github: `${ORG}/stream` },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "IAM", href: "/iam", icon: UserCheck, github: `${ORG}/iam`, featured: true },
      { title: "KMS", href: "/kms", icon: KeyRound, github: `${ORG}/kms` },
      { title: "Platform", href: "/platform", icon: Building2, github: `${ORG}/platform` },
      { title: "DNS", href: "/dns", icon: Globe, github: `${ORG}/dns` },
      { title: "Identity", href: "/identity", icon: UserCheck, github: `${ORG}/iam` },
      { title: "Console", href: "/console", icon: LayoutDashboard, github: `${ORG}/console` },
    ],
  },
  {
    title: "Observability",
    items: [
      { title: "Insights", href: "/insights", icon: BarChart3, github: `${ORG}/insights`, featured: true },
      { title: "Analytics", href: "/analytics", icon: BarChart3, github: `${ORG}/analytics` },
      { title: "Status", href: "/status", icon: Activity, github: `${ORG}/status` },
      { title: "Dashboards", href: "/dashboards", icon: PieChart, github: `${ORG}/dashboards` },
    ],
  },
  {
    title: "Web3",
    items: [
      { title: "Chains", href: "/blockchain/chains", icon: Server, featured: true },
      { title: "Exchange", href: "/blockchain/exchange", icon: Rocket },
      { title: "Wallets", href: "/blockchain/wallets", icon: Wallet },
      { title: "Indexer", href: "/blockchain/indexer", icon: Search },
      { title: "NFT", href: "/blockchain/nft", icon: LayoutGrid },
      { title: "Tokens", href: "/blockchain/tokens", icon: Coins },
      { title: "Pay", href: "/blockchain/pay", icon: CreditCard },
      { title: "Bridge", href: "/blockchain/bridge", icon: Network },
    ],
  },
];

export const featuredProducts: NavItem[] = [
  { title: "Hanzo Dev", href: "/dev", icon: Terminal, description: "Multi-agent coding workspace", github: `${ORG}/dev`, featured: true },
  { title: "Zen Models", href: "/zen", icon: Brain, description: "100+ LLMs via unified API", github: `${ORG}/zen`, featured: true },
  { title: "Agents", href: "/agents", icon: Bot, description: "Multi-agent SDK", github: `${ORG}/agent`, featured: true },
  { title: "Search", href: "/search", icon: Search, description: "Hybrid search + RAG chat", github: `${ORG}/search`, featured: true },
  { title: "Crawl", href: "/crawl", icon: Globe, description: "AI-ready web crawler", github: `${ORG}/crawl`, featured: true },
  { title: "Vector", href: "/vector", icon: Sparkles, description: "High-performance vector DB", github: `${ORG}/vector`, featured: true },
  { title: "Cloud", href: "/cloud", icon: Cloud, description: "AI Cloud infrastructure", github: `${ORG}/cloud`, featured: true },
  { title: "IAM", href: "/iam", icon: UserCheck, description: "Identity & access management", github: `${ORG}/iam`, featured: true },
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

export const footerNav: NavSection[] = [
  {
    title: "Products",
    items: [
      { title: "Hanzo Dev", href: "/dev" },
      { title: "Zen Models", href: "/zen" },
      { title: "Agents", href: "/agents" },
      { title: "Chat", href: "/chat" },
      { title: "Search", href: "/search" },
      { title: "Crawl", href: "/crawl" },
      { title: "Vector", href: "/vector" },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "Cloud", href: "/cloud" },
      { title: "IAM", href: "/iam" },
      { title: "KMS", href: "/kms" },
      { title: "Platform", href: "/platform" },
      { title: "Console", href: "/console" },
      { title: "Insights", href: "/insights" },
    ],
  },
  {
    title: "Web3",
    items: [
      { title: "Chains", href: "/blockchain/chains" },
      { title: "Exchange", href: "/blockchain/exchange" },
      { title: "Wallets", href: "/blockchain/wallets" },
      { title: "Pay", href: "/blockchain/pay" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Documentation", href: "/docs" },
      { title: "API", href: "/docs/api" },
      { title: "GitHub", href: ORG },
      { title: "Discord", href: "https://discord.gg/hanzo" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Team", href: "/team" },
      { title: "Careers", href: "/careers" },
      { title: "Security", href: "/security" },
      { title: "Press", href: "/press" },
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
    ],
  },
];

export const utilityNav = {
  search: { title: "Search", href: "/search", icon: Search },
  chat: { title: "Chat with AI", href: "/chat", icon: MessageSquare },
};
