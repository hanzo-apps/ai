import type { Metadata } from 'next'
import TeamLanding from '@/components/team/TeamLanding'

export const metadata: Metadata = {
  title: 'Hanzo Team — one workspace for people and AI coworkers',
  description:
    'Channels, projects, tasks, docs, and people in one shared workspace — with AI agents working as coworkers alongside your team. Open source (EPL-2.0), self-hostable, or managed at hanzo.team.',
  openGraph: {
    title: 'Hanzo Team — one workspace for people and AI coworkers',
    description:
      'Messaging, an issue tracker, docs, HR, recruiting, and CRM in one workspace — with AI coworkers alongside your team. Self-host the open-source platform or use the managed workspace.',
    url: 'https://hanzo.team',
    siteName: 'Hanzo Team',
    type: 'website',
  },
}

export default function TeamPage() {
  return <TeamLanding />
}
