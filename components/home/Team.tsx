'use client'

import { ArrowUpRight, Bot, History, ListChecks, Users } from 'lucide-react'
import { YStack } from '@hanzo/gui'
import { CardGrid, Cta, Section, type CardItem } from '@/components/marketing/page-kit'

/**
 * The company layer, on the front page.
 *
 * This section used to be the second half of `AgentRuntime` — one component
 * rendering two unrelated claims, in Tailwind classes the rest of the page has
 * moved off. It is the same claim, extracted, so each section is one component
 * and this one is built from the kit like everything around it.
 *
 * EVERY NOUN HERE IS A COLLECTION THAT EXISTS. `hanzoai/team`'s migrations
 * define `workspaces`, `projects`, `tasks`, `issues`, `channels`, `messages`,
 * `documents` and `members`, and those are the words used. The brief for this
 * section also offered "goals", "approvals" and "decisions"; none of the three
 * is a collection in that repo, so none of them is written here. A noun on a
 * landing page is a promise that a screen exists behind it.
 *
 * The card that carries the argument is the second one. "An agent is a member"
 * is not a metaphor — a bot IS a row in `members`, keyed by a deterministic
 * uuid v5 of its service-account id so a re-sync resolves to the same row
 * rather than a duplicate, and carrying the same `role` enum a person carries.
 * That is why the section can say agents work inside the company without
 * inventing a job title for one.
 *
 * NO AI EXECUTIVES. The product page renders sixteen named agent personas, and
 * a homepage that promoted them to officers would be claiming something about
 * org charts rather than about software. Work moving through shared records is
 * demonstrable; an "AI CFO" is not.
 *
 * Nothing here names a compliance framework. The product page's audit section
 * does, hedged; a hedge that travels to the apex stops reading as a hedge.
 */
const ITEMS: CardItem[] = [
  {
    icon: Users,
    title: 'One workspace',
    description:
      'Projects, tasks, issues, channels, messages and documents belong to a workspace. People and agents read and write the same records, so work never has to be copied out of a tool and into a chat to reach whoever does it next.',
  },
  {
    icon: Bot,
    title: 'An agent is a member',
    description:
      'A bot joins as an ordinary member with a role, resolved from a Hanzo IAM service account or the agent registry. It can hold a task, answer in a channel, and be given or refused access the same way a person is.',
  },
  {
    icon: ListChecks,
    title: 'Work carries a state',
    description:
      'A task moves through backlog, in progress, review and done, with a priority, an assignee and a reporter. What an agent did is a record you can sort and filter, not a message somebody has to read to find out.',
  },
  {
    icon: History,
    title: 'Authorship outlives the agent',
    description:
      'An agent taken off a workspace is deactivated rather than deleted, so every message and document it wrote keeps its author. The history still reads correctly a year later.',
  },
]

export default function Team() {
  return (
    <Section
      title="Where people and AI work together."
      lede="Agents work inside the company, not outside it in another chat window."
    >
      <CardGrid items={ITEMS} columns={2} />
      <YStack marginTop="$5">
        <Cta href="/team" icon={ArrowUpRight}>
          See Hanzo Team
        </Cta>
      </YStack>
    </Section>
  )
}
