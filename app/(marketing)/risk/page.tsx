'use client'

import {
  Activity,
  Boxes,
  Building2,
  Code2,
  CreditCard,
  Gauge,
  Github,
  Landmark,
  Layers,
  ListChecks,
  Network,
  Plug,
  Receipt,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Timer,
  UserPlus,
  Users,
} from 'lucide-react'
import { Page, PageHero, Section, CardGrid, Prose, type CardItem } from '@/components/marketing/page-kit'

/**
 * Two words, defined once, carried by every card on the page.
 *
 * The compliance face is serving from api.hanzo.ai today; the decide plane is
 * being built. A product page that blurs the two is a promise somebody in
 * support has to keep, so the status rides in the card's `meta` slot and every
 * capability below states which of the two it is.
 */
const NOW = 'Available now'
const SOON = 'Coming soon'

/* The compliance face — live at api.hanzo.ai/v1/aml, behind Hanzo identity. */
const COMPLIANCE: CardItem[] = [
  {
    icon: Activity,
    title: 'Transaction monitoring',
    meta: NOW,
    description:
      'Transactions are scored against the rule library as they arrive. An alert carries the rule that fired and the primary text that rule comes from, so the reason travels with the alert.',
  },
  {
    icon: ScrollText,
    title: 'Rules you can read',
    meta: NOW,
    description:
      'Twenty typology rules ship as a starting library, each citing the standard it implements. A rule you write can be replayed over your own history before you turn it on, so you see what it would have caught rather than guessing.',
  },
  {
    icon: ListChecks,
    title: 'Cases',
    meta: NOW,
    description:
      'An alert becomes a case with a timeline. Closing one requires a rationale, and the record keeps it — a resolution nobody can account for is not a resolution.',
  },
  {
    icon: ShieldCheck,
    title: 'Sanctions screening',
    meta: NOW,
    description:
      'OFAC, UK OFSI, EU and UN designations, parsed from each authority’s own published export rather than a reseller’s copy of it. The freshness of every list is on the record.',
  },
  {
    icon: Network,
    title: 'Relationships',
    meta: NOW,
    description:
      'Look back across the relationships around a subject rather than one transaction at a time, which is where structuring across several accounts becomes visible.',
  },
  {
    icon: Timer,
    title: 'Retention',
    meta: NOW,
    description:
      'Records are kept five years from the end of the business relationship, and the clock is part of the record rather than a property of the storage it happens to sit in.',
  },
]

/* The lifecycle — the decide plane, stage by stage. */
const LIFECYCLE: CardItem[] = [
  {
    icon: UserPlus,
    title: 'Signup and onboarding',
    meta: SOON,
    description:
      'Multi-account abuse, free-trial abuse, account sharing and account fraud, judged when the account is created. The device and pairing signals exist for exactly one question: are several nominally unrelated customers acting as one?',
  },
  {
    icon: CreditCard,
    title: 'Payment',
    meta: SOON,
    description:
      'Card testing, transaction fraud and bot-driven payment abuse, scored at authorization time. The hot path reads velocity counters held in memory, not the warehouse, so a payment decision does not fail when analytics does.',
  },
  {
    icon: Receipt,
    title: 'Ongoing and post-purchase',
    meta: SOON,
    description:
      'Pay-as-you-go abuse, negative balances and payout fraud, plus the disputes that arrive weeks later. A resolved dispute is a label, and the label goes back into the model that made the call.',
  },
]

/* What the plane decides on. Fraud is a use of it, not the whole of it. */
const SUBJECTS: CardItem[] = [
  {
    icon: Users,
    title: 'Accounts',
    meta: SOON,
    description:
      'Score any account on the platform, at signup and continuously afterwards. Covers multi-account abuse, free-trial abuse, account sharing, account takeover and account fraud. A merchant on your platform is an account too, so onboarding and ongoing monitoring run off the same score.',
  },
  {
    icon: CreditCard,
    title: 'Transactions',
    meta: SOON,
    description:
      'Score a transaction at authorization and return an action, a score and the reasons behind it. Covers card testing, transaction fraud and payment abuse across whatever methods and processors you already use.',
  },
  {
    icon: Gauge,
    title: 'Abuse',
    meta: SOON,
    description:
      'Score the usage plane, not only the money: pay-as-you-go abuse, credential stuffing, scraping, quota abuse and spam. This is the plane that defends an AI product, where the loss is inference spend rather than a chargeback.',
  },
  {
    icon: Landmark,
    title: 'Disputes',
    meta: SOON,
    description:
      'Assemble what a dispute response needs — the decision, the rules that fired, the values behind it and the identity of the model that produced it — out of a tamper-evident record. Hanzo does not process payments and has no dispute-network integration; the evidence is yours to submit.',
  },
]

/* Controls the tenant writes. Sanctions are deliberately not among them. */
const CONTROLS: CardItem[] = [
  {
    icon: ScrollText,
    title: 'Custom rules',
    meta: SOON,
    description:
      'Write rules over your own fields in the same vocabulary the shipped library uses, and replay them over your own history before you turn them on.',
  },
  {
    icon: ListChecks,
    title: 'Lists',
    meta: SOON,
    description:
      'Allow and deny lists over addresses, emails, accounts, card ranges, networks and devices, referenced directly from a rule. Your lists are yours; a designation from a sanctions authority is not editable by a tenant, and the two never merge.',
  },
  {
    icon: Boxes,
    title: 'Suppression',
    meta: SOON,
    description:
      'Suppress an activation you have already judged. A suppressed hit is recorded as suppressed rather than dropped, because silence must never read back as a clean result.',
  },
]

/* Deployment. Both modes fall out of risk never touching the money. */
const DEPLOYMENT: CardItem[] = [
  {
    icon: Plug,
    title: 'Keep the processor you have',
    meta: SOON,
    description:
      'Risk takes signals and returns a decision. It never touches a processor, so nothing about your payment stack has to move and there is no migration to schedule.',
  },
  {
    icon: Code2,
    title: 'Pure API',
    meta: SOON,
    description:
      'One call from your own system: send what you know, get back an action, a score and the reasons. A signup, a payment, a session and an agent are the same call — the stage is a field, not a different endpoint.',
  },
]

/* Four tiers. Structure only — nothing here is priced yet. */
const PLANS: CardItem[] = [
  {
    title: 'Lite',
    meta: SOON,
    description: 'The smallest useful shape: screening on one stage, the shipped rules, and the record behind every decision.',
  },
  {
    title: 'Standard',
    meta: SOON,
    description: 'The full lifecycle — signup, payment and post-purchase — with rules and lists of your own.',
  },
  {
    title: 'Plus',
    meta: SOON,
    description: 'A model trained on your own event surface, with the search over model shape that finds which one to use.',
  },
  {
    title: 'Pro',
    meta: SOON,
    description: 'Platform and marketplace controls, the compliance face alongside the decide plane, and the retention that goes with it.',
  },
]

export default function RiskPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Risk"
        icon={ShieldAlert}
        title="One risk plane for accounts, payments and agents"
        lede="Hanzo Risk scores an entity — an account, a transaction, a session, an agent — and returns a decision you can explain, from a model trained on your organization's own data rather than a pooled model of somebody else's traffic. The compliance half is live today; the decide plane is being built."
      />

      <Section title="Where this is today">
        <Prose>
          <p>
            Hanzo Risk is two faces over one engine, and they are not at the same stage. The{' '}
            <strong>compliance face is live</strong> at <strong>api.hanzo.ai/v1/aml</strong>, behind your Hanzo identity:
            monitoring, alerts, cases, rules, sanctions screening, relationship lookback and five-year retention. The
            engine underneath it is open source.
          </p>
          <p>
            The <strong>decide plane</strong> — <strong>/v1/risk</strong>, everything else on this page — and the shared
            model plane behind both are being built. Every capability below says which of the two it is.
          </p>
        </Prose>
      </Section>

      <Section
        title="Available now: the compliance face"
        lede="Anti-money-laundering monitoring is a different job from stopping fraud, and it is the half that is live. It is one face of the same engine, not a separate product."
      >
        <CardGrid items={COMPLIANCE} columns={3} />
      </Section>

      <Section
        title="The customer lifecycle"
        lede="Loss does not arrive at one moment, so the plane does not watch one moment. Same call, same record, same model at each stage — the stage is a field."
      >
        <CardGrid items={LIFECYCLE} columns={3} />
      </Section>

      <Section
        title="What it decides on"
        lede="Fraud is a use of a scoring plane, not a product that sits beside one. The same call judges an account, a transaction, a session or an agent."
      >
        <CardGrid items={SUBJECTS} columns={2} />
      </Section>

      <Section title="Your data, your model">
        <Prose>
          <p>
            Most fraud products score you against a pooled model built from other people&rsquo;s traffic. Hanzo already
            holds yours. Analytics, product events and errors arrive through one door — <strong>POST /v1/event</strong>{' '}
            — and land in your own warehouse next to your model usage. Those doors are live today. Reading that surface
            as features and training on it is what is coming: your users, your products, your normal.
          </p>
          <p>
            The boundary is hard, and it is enforced in the code rather than asserted in a policy. A feature read cannot
            be written without a tenant. The organization comes from your verified identity, never from a field a caller
            can set. Anything shared across organizations is an <strong>aggregate</strong> — published quantiles, with no
            organization, no subject and no identifier in the row — and a bucket too few organizations contributed to is
            not published at all. The model is per organization down to its geometry, so two organizations do not merely
            keep separate counters; they have separate models.
          </p>
          <p>
            Every score is attributable. Move one input back to its neutral value, score again, and the drop is that
            input&rsquo;s contribution — no second model is asked to explain the first. And a statistical judgement can
            put something in front of a person; it cannot decline it on its own. That ceiling is in the engine, because
            a refusal nobody can explain is not one you can defend to a customer or a supervisor.
          </p>
        </Prose>
      </Section>

      <Section title="Agents are not bots">
        <Prose>
          <p>
            A user-agent string cannot tell you whether traffic is a scraper or a customer&rsquo;s agent doing work it
            was asked to do. We do not read one.
          </p>
          <p>
            Hanzo runs agents. An agent transacting here has a registration in your organization, a credential of a known
            class, a live session and metered usage — four facts about our own platform rather than four guesses about a
            client. Traffic carrying them is an agent and gets the agent policy. Traffic that declares nothing and
            authenticates as nobody is in the anonymous lane and is bounded like one.
          </p>
          <p>
            Treating a customer&rsquo;s agent as a bad bot is a lost sale. Treating a bad bot as an agent is a loss. The
            difference has to be computed, and computing it needs facts only the platform the agent runs on has.
          </p>
        </Prose>
      </Section>

      <Section title="Rules, lists and suppression">
        <CardGrid items={CONTROLS} columns={3} />
      </Section>

      <Section title="Platforms and marketplaces" lede="Coming soon.">
        <Prose>
          <p>
            If you run a platform, your risk is your sellers as much as your buyers. Risk <em>declares</em> a control
            against a subject — hold a payout, set a reserve, restrict a merchant, block a suspect transaction — and the
            money plane reads it. Risk never moves money itself.
          </p>
          <p>
            That separation is deliberate. The thing that decides and the thing that pays should not be the same thing,
            and a control that is a written record rather than a side effect is one you can still account for a year
            later.
          </p>
        </Prose>
      </Section>

      <Section
        title="How it connects"
        lede="Risk ingests signals and returns a decision. Everything about how you take money stays where it is."
      >
        <CardGrid items={DEPLOYMENT} columns={2} />
      </Section>

      <Section
        title="Plans"
        lede="Four tiers, each a subscription with screens included and metered beyond that on the Hanzo bill you already have. A screen is one decision about one transaction, account or customer. Nothing here is priced yet."
      >
        <CardGrid items={PLANS} columns={2} />
      </Section>

      <Section title="What this is not">
        <Prose>
          <p>
            Hanzo does not process payments — your processor does, and <a href="/commerce">Hanzo Commerce</a> owns the
            money plane. There is no dispute-network integration today: Risk assembles the evidence, you submit it. No
            figure on this page is a customer result, because the decide plane has not carried customer traffic yet.
            When it has, the numbers here will be ours and measured.
          </p>
          <p>
            Anti-money-laundering compliance and fraud prevention are related jobs, not one job. <strong>/v1/aml</strong>{' '}
            is the compliance face, <strong>/v1/risk</strong> is the decide plane, and one engine serves both. Nearby:{' '}
            <a href="/idv">identity verification</a> for proving who somebody is, <a href="/guard">Guard</a> for what a
            model is allowed to say, and <a href="/analytics">Analytics</a> for the event plane the model reads.
          </p>
        </Prose>
      </Section>

      <Section title="Next">
        <CardGrid
          columns={3}
          items={[
            {
              icon: Building2,
              title: 'Talk to us',
              description: 'Tell us which stage is costing you, and help shape what the tiers include.',
              href: '/contact-sales',
            },
            {
              icon: Layers,
              title: 'The API',
              description: 'One base URL and one key for every Hanzo capability, including this one.',
              href: '/api',
            },
            {
              icon: Github,
              title: 'The engine, open source',
              description: 'The monitoring engine underneath the compliance face. Read it, run it, check the citations.',
              href: 'https://github.com/luxfi/aml',
            },
          ]}
        />
      </Section>
    </Page>
  )
}
