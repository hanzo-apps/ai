import type { Metadata } from 'next'

import AgentGallery from '@/components/team/AgentGallery'
import AuditFeatures from '@/components/team/AuditFeatures'
import CallToAction from '@/components/team/CallToAction'
import EnterpriseReadiness from '@/components/team/EnterpriseReadiness'
import HumanAIIntegration from '@/components/team/HumanAIIntegration'
import TeamHero from '@/components/team/TeamHero'
import WorkspaceIntegration from '@/components/team/WorkspaceIntegration'

export const metadata: Metadata = {
  title: 'Hanzo Team — one workspace for people and AI coworkers',
  description:
    'Channels, projects, tasks, docs, and people in one shared workspace — with AI agents working as coworkers alongside your team. Open source (AGPL-3.0), self-hostable, or managed at hanzo.team.',
  openGraph: {
    title: 'Hanzo Team — one workspace for people and AI coworkers',
    description:
      'Messaging, an issue tracker, docs, HR, recruiting, and CRM in one workspace — with AI coworkers alongside your team. Self-host the open-source platform or use the managed workspace.',
    url: 'https://hanzo.team',
    siteName: 'Hanzo Team',
    type: 'website',
  },
}

// The composed page, not the shared ProductLanding shell.
//
// These sections were written for this product and then orphaned when every
// product page was unified onto one template. The template is right for a page
// that has a paragraph to say; this product has screens to show — the workspace
// cards, the agent gallery — and a list of headings cannot show them.
//
// HumanLeadership is deliberately not among them. It rendered leadership
// portraits, which belong to a company page rather than a product one, and it
// was deleted upstream rather than orphaned.
export default function TeamPage() {
  return (
    <main>
      <TeamHero/>
      <AgentGallery/>
      <HumanAIIntegration/>
      <WorkspaceIntegration/>
      <AuditFeatures/>
      <EnterpriseReadiness/>
      <CallToAction/>
    </main>
  )
}
