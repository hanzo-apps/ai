import {
  Activity,
  AlertTriangle,
  AppWindow,
  BarChart3,
  Blocks,
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
  Landmark,
  Laptop,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  LineChart,
  Lock,
  MessageSquare,
  MonitorSmartphone,
  Network,
  PieChart,
  PlayCircle,
  Plug,
  Radio,
  Rocket,
  Route,
  ScrollText,
  Search,
  Server,
  Settings,
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
  docs?: string;
  featured?: boolean;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

const ORG = 'https://github.com/hanzoai';
const DOCS = 'https://docs.hanzo.ai';

export const productsNav: NavSection[] = [
  {
    title: "AI & Agents",
    items: [
      { title: "Zen Models", href: "/zen", icon: Brain, github: ORG, docs: `${DOCS}/zen`, featured: true },
      { title: "Agents", href: "/agents", icon: Bot, github: `${ORG}/agent`, docs: `${DOCS}/agent`, featured: true },
      { title: "AI Studio", href: "/ai-studio", icon: Sparkles, github: ORG, docs: `${DOCS}/ai`, featured: true },
      { title: "MCP", href: "/mcp", icon: Plug, github: `${ORG}/mcp`, docs: `${DOCS}/mcp` },
      { title: "ZAP", href: "/zap", icon: Zap, github: `${ORG}/zap`, docs: `${DOCS}/zap` },
      { title: "LLM Gateway", href: "/llm", icon: Network, github: ORG, docs: `${DOCS}/llm` },
      { title: "Engine", href: "/engine", icon: Cpu, github: `${ORG}/engine`, docs: `${DOCS}/engine` },
      { title: "Jin", href: "/jin", icon: Sparkles, github: `${ORG}/jin`, docs: `${DOCS}/jin` },
      { title: "Guard", href: "/guard", icon: Shield, github: `${ORG}/guard`, docs: `${DOCS}/guard` },
      { title: "Skills", href: "/skills", icon: Plug, github: `${ORG}/skills`, docs: `${DOCS}/skills` },
    ],
  },
  {
    title: "Developer",
    items: [
      { title: "Dev", href: "/dev", icon: Terminal, github: `${ORG}/dev`, docs: `${DOCS}/dev`, featured: true },
      { title: "Code", href: "/code", icon: Code, github: `${ORG}/code`, docs: `${DOCS}/code` },
      { title: "CLI", href: "/cli", icon: Terminal, github: `${ORG}/cli`, docs: `${DOCS}/cli` },
      { title: "Desktop", href: "/desktop", icon: MonitorSmartphone, github: `${ORG}/desktop`, docs: `${DOCS}/desktop` },
      { title: "GUI", href: "/gui", icon: Layers, github: `${ORG}/gui`, docs: `${DOCS}/gui` },
      { title: "UI", href: "/ui", icon: Blocks, github: `${ORG}/ui`, docs: `${DOCS}/ui` },
      { title: "Extension", href: "/extension", icon: AppWindow, github: `${ORG}/extension`, docs: `${DOCS}/extension` },
      { title: "Operative", href: "/operative", icon: Workflow, github: `${ORG}/operative`, docs: `${DOCS}/operative` },
    ],
  },
  {
    title: "Apps",
    items: [
      { title: "Chat", href: "/chat", icon: MessageSquare, github: `${ORG}/chat`, docs: `${DOCS}/chat`, featured: true },
      { title: "Bot", href: "/bot", icon: Bot, github: `${ORG}/bot`, docs: `${DOCS}/bot` },
      { title: "App", href: "/app", icon: AppWindow, github: `${ORG}/app`, docs: `${DOCS}/app` },
      { title: "Search", href: "/search", icon: Search, github: `${ORG}/search`, docs: `${DOCS}/search`, featured: true },
      { title: "Crawl", href: "/crawl", icon: Globe, github: ORG, docs: `${DOCS}/crawl` },
      { title: "Base", href: "/base", icon: Database, github: `${ORG}/base`, docs: `${DOCS}/base` },
      { title: "Commerce", href: "/commerce", icon: ShoppingCart, github: `${ORG}/commerce`, docs: `${DOCS}/commerce` },
      { title: "Payments", href: "/payments", icon: CreditCard, github: `${ORG}/payments`, docs: `${DOCS}/payments` },
      { title: "Captable", href: "/captable", icon: PieChart, github: `${ORG}/captable`, docs: `${DOCS}/captable` },
      { title: "Dataroom", href: "/dataroom", icon: FileText, github: `${ORG}/dataroom`, docs: `${DOCS}/dataroom` },
      { title: "Sign", href: "/sign", icon: ShieldCheck, github: `${ORG}/sign`, docs: `${DOCS}/sign` },
      { title: "Billing", href: "/billing", icon: CreditCard, github: `${ORG}/billing`, docs: `${DOCS}/billing` },
      { title: "Ledger", href: "/ledger", icon: ScrollText, github: `${ORG}/ledger`, docs: `${DOCS}/ledger` },
      { title: "Treasury", href: "/treasury", icon: Landmark, github: `${ORG}/treasury`, docs: `${DOCS}/treasury` },
      { title: "Studio", href: "/studio", icon: Sparkles, github: `${ORG}/studio`, docs: `${DOCS}/studio` },
      { title: "Computer", href: "/computer", icon: Laptop, github: `${ORG}/computer`, docs: `${DOCS}/computer` },
      { title: "Enso", href: "/enso", icon: Globe, github: `${ORG}/enso`, docs: `${DOCS}/enso` },
      { title: "Gallery", href: "/gallery", icon: LayoutGrid, github: `${ORG}/gallery`, docs: `${DOCS}/gallery` },
      { title: "World", href: "/world", icon: Globe, github: `${ORG}/world`, docs: `${DOCS}/world` },
    ],
  },
  {
    title: "Compute",
    items: [
      { title: "Cloud", href: "/cloud", icon: Cloud, github: `${ORG}/cloud`, docs: `${DOCS}/cloud`, featured: true },
      { title: "Functions", href: "/functions", icon: Zap, github: `${ORG}/functions`, docs: `${DOCS}/functions` },
      { title: "Machines", href: "/machines", icon: Server, github: ORG, docs: `${DOCS}/machines` },
      { title: "Edge", href: "/edge", icon: Globe, github: `${ORG}/edge`, docs: `${DOCS}/edge` },
      { title: "Realtime", href: "/realtime", icon: Radio, github: ORG, docs: `${DOCS}/realtime` },
      { title: "Node", href: "/node", icon: Server, github: `${ORG}/node`, docs: `${DOCS}/node` },
      { title: "Network", href: "/network", icon: Network, github: ORG, docs: `${DOCS}/network` },
      { title: "Tunnel", href: "/tunnel", icon: Route, github: `${ORG}/tunnel`, docs: `${DOCS}/tunnel` },
      { title: "Registry", href: "/registry", icon: Container, github: `${ORG}/registry`, docs: `${DOCS}/registry` },
    ],
  },
  {
    title: "Data",
    items: [
      { title: "Vector", href: "/vector", icon: Sparkles, github: `${ORG}/vector`, docs: `${DOCS}/vector`, featured: true },
      { title: "SQL", href: "/sql", icon: Database, github: `${ORG}/sql`, docs: `${DOCS}/sql` },
      { title: "KV", href: "/kv", icon: Key, github: `${ORG}/kv`, docs: `${DOCS}/kv` },
      { title: "Datastore", href: "/datastore", icon: Database, github: `${ORG}/datastore`, docs: `${DOCS}/datastore` },
      { title: "Storage", href: "/storage", icon: HardDrive, github: `${ORG}/storage`, docs: `${DOCS}/storage` },
      { title: "DocDB", href: "/docdb", icon: FileText, github: `${ORG}/docdb`, docs: `${DOCS}/docdb` },
      { title: "Database", href: "/database", icon: Database, github: `${ORG}/database`, docs: `${DOCS}/database` },
    ],
  },
  {
    title: "Async",
    items: [
      { title: "Flow", href: "/flow", icon: Workflow, github: `${ORG}/flow`, docs: `${DOCS}/flow` },
      { title: "Auto", href: "/auto", icon: PlayCircle, github: ORG, docs: `${DOCS}/auto` },
      { title: "Tasks", href: "/tasks", icon: ScrollText, github: `${ORG}/tasks`, docs: `${DOCS}/tasks` },
      { title: "Pubsub", href: "/pubsub", icon: Radio, github: `${ORG}/pubsub`, docs: `${DOCS}/pubsub` },
      { title: "MQ", href: "/mq", icon: Network, github: `${ORG}/mq`, docs: `${DOCS}/mq` },
      { title: "Stream", href: "/stream", icon: Activity, github: `${ORG}/stream`, docs: `${DOCS}/stream` },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "IAM", href: "/iam", icon: UserCheck, github: `${ORG}/iam`, docs: `${DOCS}/iam`, featured: true },
      { title: "KMS", href: "/kms", icon: KeyRound, github: `${ORG}/kms`, docs: `${DOCS}/kms` },
      { title: "HSM", href: "/hsm", icon: KeyRound, github: `${ORG}/hsm`, docs: `${DOCS}/hsm` },
      { title: "IDV", href: "/idv", icon: UserCheck, github: `${ORG}/idv`, docs: `${DOCS}/idv` },
      { title: "Authz", href: "/authz", icon: Shield, github: `${ORG}/authz`, docs: `${DOCS}/authz` },
      { title: "Platform", href: "/platform", icon: Building2, github: `${ORG}/platform`, docs: `${DOCS}/platform` },
      { title: "DNS", href: "/dns", icon: Globe, github: `${ORG}/dns`, docs: `${DOCS}/dns` },
      { title: "Console", href: "/console", icon: LayoutDashboard, github: `${ORG}/console`, docs: `${DOCS}/console` },
      { title: "Gateway", href: "/gateway", icon: Network, github: `${ORG}/gateway`, docs: `${DOCS}/gateway` },
      { title: "Ingress", href: "/ingress", icon: Route, github: `${ORG}/ingress`, docs: `${DOCS}/ingress` },
      { title: "Operator", href: "/operator", icon: Settings, github: `${ORG}/operator`, docs: `${DOCS}/operator` },
      { title: "Visor", href: "/visor", icon: Server, github: `${ORG}/visor`, docs: `${DOCS}/visor` },
    ],
  },
  {
    title: "Observability",
    items: [
      { title: "Insights", href: "/insights", icon: BarChart3, github: `${ORG}/insights`, docs: `${DOCS}/insights`, featured: true },
      { title: "Analytics", href: "/analytics", icon: BarChart3, github: `${ORG}/analytics`, docs: `${DOCS}/analytics` },
      { title: "Status", href: "/status", icon: Activity, github: `${ORG}/status`, docs: `${DOCS}/status` },
      { title: "Dashboards", href: "/dashboards", icon: PieChart, github: `${ORG}/dashboards`, docs: `${DOCS}/dashboards` },
      { title: "Telemetry", href: "/telemetry", icon: Activity, github: `${ORG}/telemetry`, docs: `${DOCS}/telemetry` },
      { title: "Metrics", href: "/metrics", icon: BarChart3, github: `${ORG}/metrics`, docs: `${DOCS}/metrics` },
      { title: "Sentry", href: "/sentry", icon: AlertTriangle, github: `${ORG}/sentry`, docs: `${DOCS}/sentry` },
      { title: "O11y", href: "/o11y", icon: LineChart, github: `${ORG}/o11y`, docs: `${DOCS}/o11y` },
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
  { title: "Hanzo Dev", href: "/dev", icon: Terminal, description: "Multi-agent coding workspace", github: `${ORG}/dev`, docs: `${DOCS}/dev`, featured: true },
  { title: "Zen Models", href: "/zen", icon: Brain, description: "100+ LLMs via unified API", github: ORG, docs: `${DOCS}/zen`, featured: true },
  { title: "Agents", href: "/agents", icon: Bot, description: "Multi-agent SDK", github: `${ORG}/agent`, docs: `${DOCS}/agent`, featured: true },
  { title: "Search", href: "/search", icon: Search, description: "Hybrid search + RAG chat", github: `${ORG}/search`, docs: `${DOCS}/search`, featured: true },
  { title: "Crawl", href: "/crawl", icon: Globe, description: "AI-ready web crawler", github: ORG, docs: `${DOCS}/crawl`, featured: true },
  { title: "Vector", href: "/vector", icon: Sparkles, description: "High-performance vector DB", github: `${ORG}/vector`, docs: `${DOCS}/vector`, featured: true },
  { title: "Cloud", href: "/cloud", icon: Cloud, description: "AI Cloud infrastructure", github: `${ORG}/cloud`, docs: `${DOCS}/cloud`, featured: true },
  { title: "IAM", href: "/iam", icon: UserCheck, description: "Identity & access management", github: `${ORG}/iam`, docs: `${DOCS}/iam`, featured: true },
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
