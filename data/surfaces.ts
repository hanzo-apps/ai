// Native surfaces — the tools Hanzo AI embeds into directly.
// Distinct from lib/integrations.ts (OpenAI-compatible SDKs / "bring Hanzo into
// your code"). This is the inverse axis: "Hanzo is already in the apps you use".
//
// One source of truth per action: the install/connect link is derived from the
// surface's action, never repeated per row.

export type SurfaceAction = 'install' | 'connect' | 'download'

export type SurfaceCategory =
  | 'browser'
  | 'ide'
  | 'office'
  | 'design'
  | 'comms'
  | 'business'
  | 'developer'
  | 'desktop'
  | 'industry'

export interface Surface {
  category: SurfaceCategory
  name: string
  blurb: string
  icon: string
  action: SurfaceAction
}

// Where each action points. Downloadable extensions/plugins/add-ins ship from the
// extension repo's latest release; SaaS surfaces connect via the docs guide; the
// native app comes from the download page.
export const SURFACE_ACTIONS: Record<SurfaceAction, { label: string; href: string }> = {
  install: { label: 'Install', href: 'https://github.com/hanzoai/extension/releases/latest' },
  connect: { label: 'Connect', href: 'https://docs.hanzo.ai' },
  download: { label: 'Download', href: '/download' },
}

// Ordered category labels — the section renders categories in this order.
export const SURFACE_CATEGORIES: { key: SurfaceCategory; label: string }[] = [
  { key: 'browser', label: 'Browser' },
  { key: 'ide', label: 'IDEs' },
  { key: 'office', label: 'Docs & Office' },
  { key: 'design', label: 'Design' },
  { key: 'comms', label: 'Comms' },
  { key: 'business', label: 'Business & CRM' },
  { key: 'developer', label: 'Developer' },
  { key: 'desktop', label: 'Desktop & AI clients' },
  { key: 'industry', label: 'Industry' },
]

export const SURFACES: Surface[] = [
  // Browser
  { category: 'browser', name: 'Chrome', blurb: 'Ask, summarize, and automate any page from the toolbar.', icon: '🌐', action: 'install' },
  { category: 'browser', name: 'Edge', blurb: 'The Hanzo sidebar and page actions, native in Edge.', icon: '🌀', action: 'install' },
  { category: 'browser', name: 'Firefox', blurb: 'Chat, extract, and act on tabs without leaving Firefox.', icon: '🦊', action: 'install' },
  { category: 'browser', name: 'Safari', blurb: 'Hanzo assist and automation on macOS and iOS Safari.', icon: '🧭', action: 'install' },

  // IDEs
  { category: 'ide', name: 'VS Code', blurb: 'Agent, chat, and inline edits inside VS Code.', icon: '🆚', action: 'install' },
  { category: 'ide', name: 'Cursor', blurb: 'Bring Hanzo models and tools into Cursor.', icon: '⌨️', action: 'install' },
  { category: 'ide', name: 'Windsurf', blurb: 'Run Hanzo agents alongside the Windsurf editor.', icon: '🏄', action: 'install' },
  { category: 'ide', name: 'Antigravity', blurb: 'Hanzo agents and context inside Antigravity.', icon: '🛰️', action: 'install' },
  { category: 'ide', name: 'JetBrains', blurb: 'IntelliJ, PyCharm, GoLand, and the full JetBrains suite.', icon: '🧩', action: 'install' },

  // Docs & Office
  { category: 'office', name: 'Word · Excel · PowerPoint', blurb: 'Draft, analyze, and build slides across Microsoft 365.', icon: '📊', action: 'install' },
  { category: 'office', name: 'Outlook', blurb: 'Triage, draft, and summarize mail in Outlook.', icon: '📧', action: 'install' },
  { category: 'office', name: 'Google Workspace', blurb: 'Docs, Sheets, Slides, and Gmail with Hanzo built in.', icon: '🗂️', action: 'install' },
  { category: 'office', name: 'PDF', blurb: 'Read, summarize, and extract from any PDF.', icon: '📄', action: 'install' },

  // Design
  { category: 'design', name: 'Figma', blurb: 'Generate, edit, and annotate designs in Figma.', icon: '🎨', action: 'install' },
  { category: 'design', name: 'Sketch', blurb: 'Hanzo assist for Sketch documents on macOS.', icon: '✏️', action: 'install' },
  { category: 'design', name: 'Canva', blurb: 'Draft copy and lay out designs inside Canva.', icon: '🖼️', action: 'install' },

  // Comms
  { category: 'comms', name: 'Slack', blurb: 'Chat with Hanzo and run agents from any channel.', icon: '💬', action: 'connect' },
  { category: 'comms', name: 'Microsoft Teams', blurb: 'Summarize threads and act on messages in Teams.', icon: '👥', action: 'connect' },
  { category: 'comms', name: 'Zoom · Google Meet', blurb: 'Live notes, summaries, and actions in your meetings.', icon: '🎥', action: 'connect' },

  // Business & CRM
  { category: 'business', name: 'Salesforce', blurb: 'Draft, enrich, and summarize records in Salesforce.', icon: '☁️', action: 'connect' },
  { category: 'business', name: 'DocuSign', blurb: 'Draft and review agreements before you sign.', icon: '✍️', action: 'connect' },
  { category: 'business', name: 'Notion', blurb: 'Write, summarize, and query your Notion workspace.', icon: '📓', action: 'connect' },
  { category: 'business', name: 'HubSpot', blurb: 'Draft outreach and summarize deals in HubSpot.', icon: '🧲', action: 'connect' },
  { category: 'business', name: 'Shopify', blurb: 'Generate product copy and analyze your store.', icon: '🛍️', action: 'connect' },
  { category: 'business', name: 'Zendesk', blurb: 'Draft replies and summarize tickets in Zendesk.', icon: '🎫', action: 'connect' },

  // Developer
  { category: 'developer', name: 'GitHub', blurb: 'Review PRs, triage issues, and ship from GitHub.', icon: '🐙', action: 'connect' },
  { category: 'developer', name: 'GitLab', blurb: 'Reviews, pipelines, and issues with Hanzo in GitLab.', icon: '🦝', action: 'connect' },
  { category: 'developer', name: 'Jupyter', blurb: 'AI cells, explanations, and fixes in notebooks.', icon: '🪐', action: 'install' },
  { category: 'developer', name: 'Raycast', blurb: 'Hanzo commands and agents from the Raycast launcher.', icon: '🚀', action: 'install' },

  // Desktop & AI clients
  { category: 'desktop', name: 'Desktop app', blurb: 'The full Hanzo app for macOS, Windows, and Linux.', icon: '🖥️', action: 'download' },
  { category: 'desktop', name: 'Claude Desktop', blurb: 'Bring Hanzo tools and models into Claude Desktop.', icon: '🤖', action: 'connect' },

  // Industry
  { category: 'industry', name: 'Epic', blurb: 'Summarize charts and draft notes in Epic (healthcare).', icon: '🏥', action: 'connect' },
  { category: 'industry', name: 'Procore', blurb: 'Track RFIs, docs, and schedules in Procore (construction).', icon: '🏗️', action: 'connect' },
  { category: 'industry', name: 'QuickBooks', blurb: 'Categorize, reconcile, and report in QuickBooks (finance).', icon: '📒', action: 'connect' },
  { category: 'industry', name: 'Clio', blurb: 'Draft, review, and summarize matters in Clio (legal).', icon: '⚖️', action: 'connect' },
]
