'use client'

import {
  Users,
  MessageSquare,
  FolderKanban,
  BookOpen,
  ListChecks,
  FileText,
  Video,
  UserPlus,
  Briefcase,
  Bot,
  Cloud,
  Rocket,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'
// The sections only Team has. They were written for this page and then stopped
// being rendered when the product pages were unified on the shared kit — the
// kit had nowhere to put them, so unifying the page meant dropping them. They
// are handed to it as children now, which is the missing half of that move.
//
// AgentGallery earns its place twice: it is the page's most product-specific
// section, and it is the ONLY thing that links the sixteen agent profiles under
// /team. Without it those pages are live and reachable from nothing.
import AgentGallery from '@/components/team/AgentGallery'
import HumanAIIntegration from '@/components/team/HumanAIIntegration'
import WorkspaceIntegration from '@/components/team/WorkspaceIntegration'
import AuditFeatures from '@/components/team/AuditFeatures'
import EnterpriseReadiness from '@/components/team/EnterpriseReadiness'

// This page is the front door of hanzo.team itself, as well as /team here, so
// "open the app" cannot be a link to the bare host — on hanzo.team that is a
// link to the page you are already reading.
//
// It names the workspace's sign-in directly. The apex serves this page to a
// signed-out reader and the workspace to a signed-in one, and /login is the
// door in both cases: a signed-in reader is carried straight through it.
//
// It used to name tracker.hanzo.ai, which was right when that board was the
// only app behind this page. It is not anymore — that host is Hanzo Todo, a
// different product, and Hanzo Team is the workspace served here.
const APP = 'https://hanzo.team/login'
// The Team product manual, not the platform-wide docs — this page is about one
// product and docs.hanzo.team is that product's own book.
const DOCS = 'https://docs.hanzo.team'
const GITHUB = 'https://github.com/hanzoai'

export default function TeamLanding() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Team · Shared workspace"
        badgeIcon={Users}
        title="One workspace for people and AI"
        lede="Channels, projects and tasks, documents, and people — everything your team shares, in one workspace instead of a dozen disconnected tabs. Hanzo Team unifies messaging, an issue tracker, docs, HR, recruiting, and CRM, and treats AI as a coworker: agents join the same channels, pick up the same issues, and draft alongside the people they work with."
        ctas={[
          { label: 'Open Team', href: APP, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (AGPL-3.0). Self-host the full platform, or use the managed workspace.' }}
        what={{
          eyebrow: 'What is Hanzo Team',
          title: 'Everything your team shares, in one place',
          sub: 'Messaging, planning, docs, and the people who do the work usually live in separate tools that never share context. Team puts them on one platform — so a conversation, the issue it spawns, the doc it produces, and everyone involved stay connected.',
          pillars: [
            {
              icon: MessageSquare,
              title: 'Channels',
              body: 'Team messaging in organized channels with threads, mentions, and direct messages — and one inbox that ties every notification back to the work it came from.',
            },
            {
              icon: FolderKanban,
              title: 'Projects & tasks',
              body: 'A real issue tracker — projects, milestones, sub-issues, and boards — so plans, priorities, and progress live next to the conversation driving them.',
            },
            {
              icon: BookOpen,
              title: 'Knowledge & people',
              body: 'Documents and a shared drive for what the team knows, plus directories for who does the work — contacts, HR, recruiting, and CRM, all in the same workspace.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'One platform, every surface your team needs',
          items: [
            { icon: ListChecks, title: 'Issue tracker', body: 'Projects, milestones, and sub-issues across list, kanban, and board views — plan sprints and track delivery without a second tool.' },
            { icon: FileText, title: 'Documents & wiki', body: 'Collaborative documents and a team knowledge base, linkable from any issue or channel so context is never lost.' },
            { icon: Video, title: 'Virtual office', body: 'Huddles, screen-share, and a virtual office for face-to-face without leaving the workspace or booking a separate meeting app.' },
            { icon: UserPlus, title: 'HR & recruiting', body: 'A team directory, departments, and time-off, plus an applicant tracker for hiring — the people side of the org, built in.' },
            { icon: Briefcase, title: 'CRM', body: 'Leads, customers, and pipelines that sit beside the projects delivering on them, so sales and execution share one source of truth.' },
            { icon: Bot, title: 'AI coworkers', body: 'Add AI agents to channels and issues as first-class members — they read the same context, reply in threads, and pick up assigned work.' },
          ],
        }}
        finalCta={{
          icon: Users,
          title: 'Get your team working in one place',
          sub: 'Open the managed workspace, or self-host the open-source platform anywhere you like.',
          buttons: [
            { label: 'Open Team', href: APP, icon: Rocket },
            { label: 'Read the docs', href: DOCS },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      >
        {/* Who works in the workspace — the coworkers first, then the people
            who lead them, then how the two actually share the work. */}
        <AgentGallery />
        <HumanAIIntegration />
        {/* What the workspace looks like, then what makes it safe to put a
            company inside it. */}
        <WorkspaceIntegration />
        <AuditFeatures />
        <EnterpriseReadiness />
      </ProductLanding>
      <ProductFooter slug="team" name="Team" />
    </>
  )
}
