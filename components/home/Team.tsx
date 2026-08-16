'use client'

import { ArrowUpRight } from 'lucide-react'
import { YStack, Text } from '@hanzo/gui'
import { Cta, Section } from '@/components/marketing/page-kit'

/**
 * The company layer, on the front page.
 *
 * THE SHARED SCOPE IS THE PROJECT. This section used to say work "belongs to a
 * workspace", and a workspace is not a resource, a switcher, a URL scope or an
 * API object anywhere in the platform — so the one noun carrying the claim was
 * the one noun a reader cannot go and find. A project is what people, agents and
 * deployable resources share, and it is the same project in Team, in the console
 * and over the API. Do not put the other word back.
 *
 * NO AI EXECUTIVES. /team renders sixteen named agent personas, and a homepage
 * that promoted them to officers would be claiming something about org charts
 * rather than about software. Work moving through shared records is
 * demonstrable; an "AI CFO" is not.
 *
 * Nothing here names a compliance framework. /team's audit section does, hedged,
 * and a hedge that travels to the apex stops reading as a hedge.
 *
 * MOVED TO /team RATHER THAN DELETED — each one true, each one a paragraph a
 * landing page cannot afford: the task state enum (backlog, in progress, review,
 * done, with priority, assignee and reporter); what happens to authorship when
 * an agent is deactivated rather than deleted; how a bot's membership resolves
 * from a Hanzo IAM service account or the agent registry; and the deterministic
 * uuid v5 that keeps a re-synced bot on one row instead of two. They are the
 * evidence for the second line here, and the second line is what the page needs.
 */
export default function Team() {
  return (
    <Section
      title="Where people and AI work together."
      lede="Hanzo Team gives people and AI coworkers the same projects, conversations, knowledge, tasks, permissions and approvals."
    >
      <YStack gap="$4" maxWidth={672}>
        <Text render="p" fontSize="$3" color="$mutedForeground">
          Agents aren’t assistants outside the organization. They’re members of it — with work to
          own, context to use, permissions to respect, and history that stays attributable.
        </Text>
        <Text render="p" fontSize="$3" color="$mutedForeground">
          One project context — projects, tasks, channels, messages, knowledge, agents, deployments,
          data and integrations share it.
        </Text>
        <Text render="p" fontSize="$5" fontWeight="500" color="$foreground">
          People and agents. Same team.
        </Text>
        <Cta href="/team" icon={ArrowUpRight}>
          See Hanzo Team
        </Cta>
      </YStack>
    </Section>
  )
}
