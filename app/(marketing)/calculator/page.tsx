"use client"

import { useMemo, useState } from 'react'
import { MODELS_PHRASE } from '@/lib/data/model-count'

// True Savings — an operating-cost model, not a TAM calculator. Every number on
// this page is derived from a visible, editable control; nothing is hardcoded
// into the headline. Two axes are kept deliberately separate: COVERAGE (how much
// of a category Hanzo replaces, which carries weight) and EVIDENCE (how well we
// can prove it, which carries none). Collapsing them would let an attestation
// read as a verification, which is the one thing this page must never do.

const FTE = 220_000 // fully loaded engineer, used for both glue reclaimed and Hanzo ops
const REF_E = 100 // reference deployment the analyst priced against
const REF_D = 30

type Cov = 'full' | 'partial' | 'experimental' | 'roadmap'
type Ev = 'verified' | 'gap' | 'internal' | 'attested' | 'repo'

const WEIGHT: Record<Cov, number> = { full: 1, partial: 0.5, experimental: 0.25, roadmap: 0 }
const COV_LABEL: Record<Cov, string> = {
  full: 'full',
  partial: 'partial 50%',
  experimental: 'experimental 25%',
  roadmap: 'roadmap 0%',
}
const EV_LABEL: Record<Ev, string> = {
  verified: 'verified',
  gap: 'verified gap',
  internal: 'internal production',
  attested: 'management-attested',
  repo: 'repository-verified',
}
const COV_CYCLE: Cov[] = ['full', 'partial', 'experimental', 'roadmap']

// Billing basis, so the model still means something away from the reference
// deployment: per-seat rows scale on employees, per-engineer rows on engineers,
// platform-fee rows not at all. At E=100/30% every factor is 1.0, which is what
// reproduces the analyst's $613k software total exactly.
type Basis = 's' | 'e' | 'f'

type Row = {
  name: string
  replaces: string
  hanzo: string
  k: number // analyst default, $k/yr at the reference deployment
  basis: Basis
  cov: Cov
  ev: Ev
}

const ROWS: Row[] = [
  { name: 'SSO & workforce identity', replaces: 'Okta / Auth0', hanzo: 'iam · zero-trust · authz', k: 10, basis: 's', cov: 'full', ev: 'internal' },
  { name: 'Customer identity (product)', replaces: 'Auth0 B2C', hanzo: 'iam (multi-tenant, per-org CEK)', k: 14, basis: 'f', cov: 'full', ev: 'internal' },
  { name: 'Secrets & KMS', replaces: 'Vault Cloud', hanzo: 'kms', k: 11, basis: 'e', cov: 'full', ev: 'internal' },
  { name: 'Observability', replaces: 'Datadog / New Relic', hanzo: 'o11y · metrics', k: 54, basis: 'e', cov: 'full', ev: 'internal' },
  { name: 'Error tracking', replaces: 'Sentry', hanzo: 'o11y (errortracking)', k: 9, basis: 'e', cov: 'full', ev: 'internal' },
  { name: 'Feature flags', replaces: 'LaunchDarkly', hanzo: 'flags', k: 7, basis: 'e', cov: 'full', ev: 'repo' },
  { name: 'Product analytics', replaces: 'Amplitude / Mixpanel', hanzo: 'analytics', k: 15, basis: 'f', cov: 'full', ev: 'internal' },
  { name: 'Event routing / CDP', replaces: 'Segment', hanzo: 'destinations · tracker', k: 22, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'Git hosting', replaces: 'GitHub Enterprise', hanzo: 'git (git.hanzo.ai)', k: 8, basis: 'e', cov: 'full', ev: 'internal' },
  { name: 'CI/CD', replaces: 'CircleCI / Actions', hanzo: 'hanzoai/ci · arc runners', k: 18, basis: 'e', cov: 'full', ev: 'internal' },
  { name: 'Container registry', replaces: 'ECR / Docker Hub', hanzo: 'registry (registry.hanzo.ai)', k: 4, basis: 'e', cov: 'full', ev: 'internal' },
  { name: 'PaaS / app hosting', replaces: 'Vercel / Heroku', hanzo: 'paas · deploy · functions', k: 13, basis: 'e', cov: 'full', ev: 'internal' },
  { name: 'App backend / BaaS', replaces: 'Supabase / Firebase', hanzo: 'base · docdb · orm', k: 15, basis: 'f', cov: 'full', ev: 'internal' },
  { name: 'Queues & streaming', replaces: 'Confluent / SQS', hanzo: 'pubsub (NATS) · kafka', k: 10, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'AI gateway & routing', replaces: 'Portkey / OpenRouter', hanzo: 'ai · zen · gateway', k: 12, basis: 'f', cov: 'full', ev: 'internal' },
  { name: 'Workflow automation', replaces: 'Zapier', hanzo: 'automations · connectorruntime · cron', k: 12, basis: 's', cov: 'full', ev: 'repo' },
  { name: 'Billing & metering', replaces: 'Chargebee / Metronome', hanzo: 'billing · usage · entitlements · pricing', k: 18, basis: 'f', cov: 'full', ev: 'internal' },
  { name: 'Commerce', replaces: 'Shopify Plus', hanzo: 'commerce · marketplace', k: 24, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'E-signature', replaces: 'DocuSign', hanzo: 'sign', k: 2, basis: 's', cov: 'full', ev: 'repo' },
  { name: 'Cap table', replaces: 'Carta', hanzo: 'captable', k: 5, basis: 'f', cov: 'full', ev: 'internal' },
  { name: 'Data rooms', replaces: 'DocSend / iDeals', hanzo: 'dataroom', k: 6, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'Referrals & affiliates', replaces: 'PartnerStack', hanzo: 'affiliates · referrals · link', k: 9, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'Experiments & evals', replaces: 'Statsig / Optimizely', hanzo: 'experiments · evals', k: 12, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'Zero-trust access', replaces: 'Tailscale / CF Access', hanzo: 'zero-trust · ingress', k: 7, basis: 's', cov: 'full', ev: 'internal' },
  { name: 'Search', replaces: 'Algolia / Elastic', hanzo: 'index · websearch', k: 12, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'Vector store', replaces: 'Pinecone', hanzo: 'knowledge', k: 8, basis: 'f', cov: 'partial', ev: 'gap' },
  { name: 'Compliance automation', replaces: 'Vanta / Drata', hanzo: 'compliance · audit · sbom · security', k: 18, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'CRM', replaces: 'Salesforce / HubSpot', hanzo: 'crm · company', k: 27, basis: 's', cov: 'full', ev: 'internal' },
  { name: 'Marketing automation', replaces: 'HubSpot Marketing', hanzo: 'marketing · campaign', k: 10, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'Projects & tasks', replaces: 'Linear / Asana', hanzo: 'projects · tasks', k: 14, basis: 's', cov: 'full', ev: 'internal' },
  { name: 'Knowledge & docs', replaces: 'Notion / Confluence', hanzo: 'knowledge · guide', k: 12, basis: 's', cov: 'full', ev: 'internal' },
  { name: 'Support & messaging', replaces: 'Intercom / Zendesk', hanzo: 'help · ask · channels · bots', k: 11, basis: 's', cov: 'full', ev: 'internal' },
  { name: 'Notifications & email', replaces: 'SendGrid / Customer.io', hanzo: 'notify', k: 7, basis: 'f', cov: 'full', ev: 'internal' },
  { name: 'Incident & status', replaces: 'PagerDuty / Statuspage', hanzo: 'o11y (incident · status)', k: 11, basis: 'e', cov: 'full', ev: 'internal' },
  { name: 'Finance ops & ledger', replaces: 'NetSuite add-ons', hanzo: 'books · treasury · ledger-fi', k: 6, basis: 'f', cov: 'full', ev: 'internal' },
  { name: 'Design & creative', replaces: 'Figma / Canva', hanzo: 'studio (studio.hanzo.ai)', k: 16, basis: 's', cov: 'full', ev: 'repo' },
  { name: 'Video, calls & calendar', replaces: 'Zoom / Calendly', hanzo: 'team (calls · calendar)', k: 18, basis: 's', cov: 'full', ev: 'internal' },
  { name: 'Office suite & drive', replaces: 'Google Workspace', hanzo: 'office · drive', k: 14, basis: 's', cov: 'full', ev: 'internal' },
  { name: 'HR & payroll', replaces: 'Gusto / Rippling', hanzo: 'hr · payroll', k: 48, basis: 's', cov: 'full', ev: 'internal' },
  { name: 'Payment orchestration', replaces: 'PSP markup over interchange+', hanzo: 'psp · x402 · wallets', k: 12, basis: 'f', cov: 'full', ev: 'repo' },
  { name: 'ERP / CMS / business apps', replaces: 'NetSuite / WordPress', hanzo: 'erp · base', k: 20, basis: 'f', cov: 'full', ev: 'internal' },
  { name: 'LLM inference & routing', replaces: 'OpenAI / Anthropic API', hanzo: 'enso (routing) · zen (self-hosted)', k: 36, basis: 'e', cov: 'full', ev: 'attested' },
]

const AI_ROW = ROWS.length - 1

// One chip per vendor that shows up on a real bill — several per category. A
// category counts while any of its vendors is selected; the counter counts
// vendors, not categories. 107 chips, which is the same 107 dependencies the
// reference deployment consolidated.
const VENDORS: [string, number][] = [
  ['Okta', 0], ['Auth0', 0], ['JumpCloud', 0], ['Clerk', 1], ['Firebase Auth', 1], ['Vault', 2], ['AWS KMS', 2],
  ['Doppler', 2], ['Datadog', 3], ['New Relic', 3], ['Grafana Cloud', 3], ['Splunk', 3], ['Sentry', 4], ['Rollbar', 4],
  ['LaunchDarkly', 5], ['Split', 5], ['Amplitude', 6], ['Mixpanel', 6], ['Heap', 6], ['Segment', 7], ['RudderStack', 7],
  ['GitHub', 8], ['GitLab', 8], ['Bitbucket', 8], ['CircleCI', 9], ['Buildkite', 9], ['Docker Hub', 10], ['JFrog', 10],
  ['Vercel', 11], ['Netlify', 11], ['Heroku', 11], ['Fly.io', 11], ['Supabase', 12], ['Firebase', 12], ['Confluent', 13],
  ['Redpanda', 13], ['Portkey', 14], ['OpenRouter', 14], ['Zapier', 15], ['Make', 15], ['n8n cloud', 15],
  ['Chargebee', 16], ['Metronome', 16], ['Stripe Billing', 16], ['Shopify', 17], ['BigCommerce', 17], ['DocuSign', 18],
  ['Dropbox Sign', 18], ['Carta', 19], ['Pulley', 19], ['DocSend', 20], ['iDeals', 20], ['PartnerStack', 21],
  ['Rewardful', 21], ['Statsig', 22], ['Optimizely', 22], ['Tailscale', 23], ['CF Access', 23], ['Algolia', 24],
  ['Elastic Cloud', 24], ['Pinecone', 25], ['Weaviate', 25], ['Vanta', 26], ['Drata', 26], ['Salesforce', 27],
  ['HubSpot CRM', 27], ['Pipedrive', 27], ['HubSpot Marketing', 28], ['Mailchimp', 28], ['Klaviyo', 28], ['Linear', 29],
  ['Asana', 29], ['Jira', 29], ['Monday', 29], ['Notion', 30], ['Confluence', 30], ['Zendesk', 31], ['Intercom', 31],
  ['Front', 31], ['SendGrid', 32], ['Twilio', 32], ['Customer.io', 32], ['PagerDuty', 33], ['Statuspage', 33],
  ['Opsgenie', 33], ['QuickBooks', 34], ['Bill.com', 34], ['Figma', 35], ['Canva', 35], ['Adobe CC', 35], ['Zoom', 36],
  ['Calendly', 36], ['Loom', 36], ['Google Workspace', 37], ['Microsoft 365', 37], ['Dropbox', 37], ['Gusto', 38],
  ['Rippling', 38], ['Deel', 38], ['Stripe', 39], ['Braintree', 39], ['NetSuite', 40], ['WordPress VIP', 40],
  ['Contentful', 40], ['OpenAI API', 41], ['Anthropic API', 41], ['Azure OpenAI', 41],
]

const SEAMS = [
  'auth bridges', 'webhooks', 'data sync', 'billing reconciliation', 'entitlements', 'audit exports',
  'pipelines', 'vendor o11y', 'incident routing', 'schema transforms', 'secret rotation', 'API migrations',
  'identity lifecycle', 'model fallbacks', 'security reviews',
]

const SECOND_ORDER = [
  'SSO price premiums', 'per-vendor security reviews', 'DPAs', 'procurement cycles', 'duplicate observability',
  'license reclamation', 'credential sprawl', 'integration attack surface', 'onboarding speed', 'unified policy',
  'common metering', 'model portability', 'lock-in exposure', 'air-gapped deployment', 'incident response speed',
  'fewer failure domains',
]

const money = (n: number) => {
  const a = Math.abs(n)
  const sign = n < 0 ? '−' : ''
  if (a >= 1e6) return `${sign}$${(a / 1e6).toFixed(3).replace(/\.?0+$/, '')}M`
  return `${sign}$${Math.round(a / 1e3).toLocaleString('en-US')}k`
}
const dollars = (n: number) =>
  `${n < 0 ? '−' : ''}$${Math.round(Math.abs(n)).toLocaleString('en-US')}`

export default function CalculatorPage() {
  const [E, setE] = useState(100)
  const [Dp, setDp] = useState(30)
  const [cloud, setCloud] = useState(15) // $k / month
  const [infraPct, setInfraPct] = useState(60)
  const [glueFte, setGlueFte] = useState(1.5)
  const [opsFte, setOpsFte] = useState(0.5)

  // The three deductions. Default 0 means "not included until entered" — the
  // fully-adjusted tier stays explicitly incomplete rather than quietly equal
  // to the run rate.
  const [retained, setRetained] = useState(0)
  const [fee, setFee] = useState(0)
  const [migration, setMigration] = useState(0)
  const [migYears, setMigYears] = useState(3)

  const [cov, setCov] = useState<Cov[]>(() => ROWS.map((r) => r.cov))
  const [price, setPrice] = useState<Record<number, number>>({}) // user overrides, $k
  const [von, setVon] = useState<boolean[]>(() => VENDORS.map(() => true))

  // AI sub-calculator — off by default so the headline stays the analyst's
  // figure until the user prices their own bill.
  const [aiOpen, setAiOpen] = useState(false)
  const [aiOn, setAiOn] = useState(false)
  const [ai, setAi] = useState({
    spend: 10, // $k / month
    routable: 60, // % of addressable spend that can move to a cheaper model
    selfHost: 50, // % of routed spend that can run on Zen
    ensoSave: 55, // % saved by routing alone
    zenCost: 12, // Zen cost as % of frontier price
    frontier: 25, // % that must stay frontier — pass-through, never counted
    overhead: 10, // eval + fallback overhead against gross saving
    gpuUtil: 70, // % GPU utilization
    batch: 40, // % of self-hosted work that is batch
  })

  const D = Math.round((E * Dp) / 100)

  const aiSaving = useMemo(() => {
    const annual = ai.spend * 1000 * 12
    const passthrough = annual * (ai.frontier / 100)
    const addressable = annual - passthrough
    const routed = addressable * (ai.routable / 100)
    const hosted = routed * (ai.selfHost / 100)
    const routedOnly = routed - hosted
    // Low utilization raises effective self-hosted unit cost; batch work lowers it.
    const zenRatio = (ai.zenCost / 100) * (70 / Math.max(ai.gpuUtil, 1)) * (1 - 0.25 * (ai.batch / 100))
    const gross = hosted * Math.max(1 - zenRatio, 0) + routedOnly * (ai.ensoSave / 100)
    return Math.max(gross * (1 - ai.overhead / 100), 0)
  }, [ai])

  const on = useMemo(
    () => ROWS.map((_, i) => VENDORS.some(([, c], k) => c === i && von[k])),
    [von],
  )

  const value = useMemo(
    () =>
      ROWS.map((r, i) => {
        if (price[i] !== undefined) return price[i] * 1000
        if (i === AI_ROW && aiOn) return aiSaving
        const factor = r.basis === 's' ? E / REF_E : r.basis === 'e' ? D / REF_D : 1
        return r.k * 1000 * factor
      }),
    [price, aiOn, aiSaving, E, D],
  )

  const software = useMemo(
    () => value.reduce((sum, v, i) => (on[i] ? sum + v * WEIGHT[cov[i]] : sum), 0),
    [value, on, cov],
  )

  const infra = cloud * 1000 * 12 * (infraPct / 100)
  const glue = glueFte * FTE
  const ops = opsFte * FTE
  const gross = software + infra + glue
  const runRate = gross - ops
  const amortized = migration > 0 ? migration / Math.max(migYears, 1) : 0
  const adjusted = runRate - retained - fee - amortized
  const hasDeductions = retained > 0 || fee > 0 || migration > 0
  const vendorCount = von.filter(Boolean).length

  const cycleCov = (i: number) =>
    setCov((c) => {
      const next = [...c]
      next[i] = COV_CYCLE[(COV_CYCLE.indexOf(c[i]) + 1) % COV_CYCLE.length]
      return next
    })

  const toggleRow = (i: number, checked: boolean) =>
    setVon((v) => v.map((s, k) => (VENDORS[k][1] === i ? checked : s)))

  const setAllVendors = (v: boolean) => setVon(VENDORS.map(() => v))

  const reset = () => {
    setCov(ROWS.map((r) => r.cov))
    setPrice({})
    setVon(VENDORS.map(() => true))
    setAiOn(false)
  }

  const num = (v: number, set: (n: number) => void, step = 1000) => (
    <input
      type="number"
      className="ts-in"
      min={0}
      step={step}
      value={v || ''}
      placeholder="0"
      onChange={(e) => set(Math.max(Number(e.target.value) || 0, 0))}
    />
  )

  return (
    <div className="ts">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ts-wrap">
        <header>
          <h1>Hanzo True Savings</h1>
          <p className="ts-lead">Price the assembly tax.</p>
          <p className="ts-banner">
            100+ capabilities · {MODELS_PHRASE} · one identity plane · one API · one operating platform.
          </p>
          <p className="ts-sub">
            This is not a TAM calculator. It models operating expenses a company can eliminate, reduce,
            or reclaim. Every assumption is visible and editable.
          </p>
        </header>

        <section className="ts-card ts-accent">
          <h2>Reference deployment — Hanzo runs on Hanzo</h2>
          <p className="ts-note">
            Fully off GCP · Hanzo-managed infrastructure · AI, cloud, identity, observability, deploy,
            storage and business-ops native · operates its ATS, broker-dealer and transfer-agent stack
            natively · eligible AI routed through Enso and self-hosted Zen ·{' '}
            <b>107 vendor and managed-service dependencies consolidated into one plane</b> · ~90% lower
            compute and eligible-inference costs in selected workloads.
          </p>
          <p className="ts-label">Founder-attested; measured evidence pack in progress.</p>
        </section>

        <section>
          <h2>Your deployment</h2>
          <div className="ts-ctl">
            <div className="ts-card">
              <label htmlFor="ts-e">Employees <output>{E}</output></label>
              <input id="ts-e" type="range" min={10} max={2000} step={10} value={E}
                onChange={(e) => setE(+e.target.value)} />
            </div>
            <div className="ts-card">
              <label htmlFor="ts-d">Engineers <output>{Dp}% ({D})</output></label>
              <input id="ts-d" type="range" min={10} max={60} step={5} value={Dp}
                onChange={(e) => setDp(+e.target.value)} />
            </div>
            <div className="ts-card">
              <label htmlFor="ts-c">Cloud bill / month <output>${cloud}k</output></label>
              <input id="ts-c" type="range" min={0} max={250} step={5} value={cloud}
                onChange={(e) => setCloud(+e.target.value)} />
            </div>
            <div className="ts-card">
              <label htmlFor="ts-g">Integration-glue FTEs <output>{glueFte}</output></label>
              <input id="ts-g" type="range" min={0} max={20} step={0.5} value={glueFte}
                onChange={(e) => setGlueFte(+e.target.value)} />
            </div>
            <div className="ts-card">
              <label htmlFor="ts-o">Platform-ops FTEs (running Hanzo) <output>{opsFte}</output></label>
              <input id="ts-o" type="range" min={0} max={6} step={0.5} value={opsFte}
                onChange={(e) => setOpsFte(+e.target.value)} />
            </div>
            <div className="ts-card">
              <label htmlFor="ts-i">Infrastructure delta <output>{infraPct}%</output></label>
              <input id="ts-i" type="range" min={0} max={90} step={5} value={infraPct}
                onChange={(e) => setInfraPct(+e.target.value)} />
            </div>
          </div>
        </section>

        <section>
          <h2>Deductions — not included until entered</h2>
          <div className="ts-ctl">
            <div className="ts-card">
              <label htmlFor="ts-r">Retained vendor spending ($/yr)</label>
              {num(retained, setRetained)}
            </div>
            <div className="ts-card">
              <label htmlFor="ts-f">Hanzo managed / support fee ($/yr)</label>
              {num(fee, setFee)}
            </div>
            <div className="ts-card">
              <label htmlFor="ts-m">One-time migration cost ($)</label>
              {num(migration, setMigration)}
            </div>
            <div className="ts-card">
              <label htmlFor="ts-y">Amortized over <output>{migYears} yr</output></label>
              <input id="ts-y" type="range" min={1} max={5} step={1} value={migYears}
                onChange={(e) => setMigYears(+e.target.value)} />
            </div>
          </div>
        </section>

        <section>
          <h2>Results</h2>
          <div className="ts-tiers">
            <div className="ts-tier">
              <span className="ts-l">1 · Gross addressable savings</span>
              <span className="ts-big">{money(gross)}</span>
              <small>Software + infrastructure + glue, before any deduction.</small>
            </div>
            <div className="ts-tier ts-head">
              <span className="ts-l">2 · Annual run-rate savings</span>
              <span className="ts-big">{money(runRate)}</span>
              <small>Gross − Hanzo operating labor. This is the headline.</small>
            </div>
            <div className="ts-tier">
              <span className="ts-l">3 · Fully adjusted annual savings</span>
              {hasDeductions
                ? <span className="ts-big">{money(adjusted)}</span>
                : <span className="ts-pending">Customer input required</span>}
              <small>Run-rate − retained vendors − Hanzo fees − amortized migration.</small>
            </div>
            <div className="ts-tier">
              <span className="ts-l">4 · Three-year economic value</span>
              <span className="ts-big">{money(adjusted * 3)}</span>
              <small>Fully adjusted × 3, with migration amortized across the horizon.</small>
            </div>
          </div>

          <div className="ts-parts">
            <div className="ts-p"><small>Software replaced (selected rows)</small><span className="ts-num">{money(software)}</span></div>
            <div className="ts-p"><small>Infrastructure delta</small><span className="ts-num">{money(infra)}</span></div>
            <div className="ts-p"><small>Glue engineering reclaimed</small><span className="ts-num">{money(glue)}</span></div>
            <div className="ts-p ts-neg"><small>Cost of operating Hanzo</small><span className="ts-num">−{money(ops)}</span></div>
            <div className="ts-p"><small>Per employee / yr (run-rate)</small><span className="ts-num">{dollars(runRate / Math.max(E, 1))}</span></div>
            <div className="ts-p"><small>≈ senior engineers funded</small><span className="ts-num">{(runRate / FTE).toFixed(1)}</span></div>
            <div className="ts-p"><small>Vendors collapsed</small><span className="ts-num">{vendorCount} → 1</span></div>
          </div>

          <p className="ts-formula">
            <code>gross = software + infra + glue</code> ·{' '}
            <code>run-rate = gross − ops</code> ·{' '}
            <code>adjusted = run-rate − retained − fees − migration ÷ years</code>
          </p>
          <p className="ts-warn">
            Do not present {money(runRate)} as fully net until the final three deductions are entered.
          </p>

          <p className="ts-trust">
            Hanzo True Savings is an interactive operating-cost model, not a quote, guarantee, audit, or
            promise of results. Default prices are editable estimates based on representative technology
            stacks. Actual savings depend on existing contracts, usage, architecture, migration
            requirements, retained vendors, staffing, workload eligibility, and Hanzo deployment
            choices. Hanzo&rsquo;s internal case-study figures are management-attested unless explicitly
            marked independently verified.
          </p>
        </section>

        <section>
          <h2>Click everything you pay for</h2>
          <p className="ts-note">
            Every vendor maps to a line in the table. Tap the ones on your bill — the totals and the{' '}
            <b>vendors → 1</b> counter follow.{' '}
            <button type="button" className="ts-v" onClick={() => setAllVendors(true)}>select all</button>{' '}
            <button type="button" className="ts-v" onClick={() => setAllVendors(false)}>clear</button>
          </p>
          <div className="ts-wall">
            {VENDORS.map(([name], k) => (
              <button key={name + k} type="button" className="ts-v" aria-pressed={von[k]}
                onClick={() => setVon((v) => v.map((s, j) => (j === k ? !s : s)))}>
                {name}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2>Category by category</h2>
          <p className="ts-note">
            Two axes, kept separate. <b>Coverage</b> carries weight and is clickable — full 100%,
            partial 50%, experimental 25%, roadmap 0%. <b>Evidence</b> carries no weight. A service can
            have full coverage while still management-attested. Separating the axes prevents an
            attestation from being presented as verification.
          </p>
          <p className="ts-note">
            Prices are the analyst defaults at the reference deployment (100 employees, 30% engineers)
            and are editable — type over any of them. Untouched rows scale on their billing basis:
            per-seat with employees, per-engineer with engineers, platform fees not at all.{' '}
            <button type="button" className="ts-v" onClick={reset}>Reset to analyst defaults</button>
          </p>
          <div className="ts-scroll">
            <table>
              <thead>
                <tr>
                  <th aria-label="Include" /><th>Category</th><th>Replaces (typical)</th>
                  <th>Hanzo services</th><th>Coverage</th><th>Evidence</th><th className="ts-r">$k / yr</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.name} className={on[i] ? undefined : 'ts-off'}>
                    <td>
                      <input type="checkbox" checked={on[i]} aria-label={`Include ${r.name}`}
                        onChange={(e) => toggleRow(i, e.target.checked)} />
                    </td>
                    <td>
                      {r.name}
                      {i === AI_ROW && (
                        <>
                          {' '}
                          <button type="button" className="ts-more" aria-expanded={aiOpen}
                            onClick={() => setAiOpen((o) => !o)}>
                            {aiOpen ? 'hide' : 'sub-calculator'}
                          </button>
                        </>
                      )}
                    </td>
                    <td>{r.replaces}</td>
                    <td className="ts-svc">{r.hanzo}</td>
                    <td>
                      <button type="button" className={`ts-chip ts-c-${cov[i]}`}
                        title="Click to regrade coverage" onClick={() => cycleCov(i)}>
                        {COV_LABEL[cov[i]]}
                      </button>
                    </td>
                    <td><span className={`ts-chip ts-e-${r.ev}`}>{EV_LABEL[r.ev]}</span></td>
                    <td className="ts-r">
                      <input type="number" className="ts-in ts-price" min={0}
                        aria-label={`Annual estimate for ${r.name} in thousands`}
                        value={Math.round(value[i] / 1000)}
                        onChange={(e) => setPrice((p) => ({ ...p, [i]: Math.max(Number(e.target.value) || 0, 0) }))} />
                      {WEIGHT[cov[i]] < 1 && <span className="ts-x">×{WEIGHT[cov[i]]}</span>}
                    </td>
                  </tr>
                ))}
                {aiOpen && (
                  <tr>
                    <td colSpan={7} className="ts-panel">
                      <h3>AI sub-calculator</h3>
                      <p className="ts-note">
                        Hanzo&rsquo;s current deployment reports reductions approaching 90% for selected
                        workloads routed to lower-cost or self-hosted models. Enter your own eligible
                        workload percentage rather than applying 90% to the entire AI bill. {MODELS_PHRASE},
                        but model count is not the economic claim — the control plane is.
                      </p>
                      <div className="ts-ctl">
                        {([
                          ['spend', 'AI spend / month ($k)', 0, 500, 1],
                          ['frontier', 'Must stay frontier (%)', 0, 100, 5],
                          ['routable', 'Routable to cheaper models (%)', 0, 100, 5],
                          ['selfHost', 'Of routed, self-hostable (%)', 0, 100, 5],
                          ['ensoSave', 'Enso routing saving (%)', 0, 90, 5],
                          ['zenCost', 'Zen cost vs frontier (%)', 1, 100, 1],
                          ['gpuUtil', 'GPU utilization (%)', 10, 100, 5],
                          ['batch', 'Batch vs interactive mix (%)', 0, 100, 5],
                          ['overhead', 'Eval / fallback overhead (%)', 0, 50, 5],
                        ] as const).map(([key, label, min, max, step]) => (
                          <div className="ts-card" key={key}>
                            <label htmlFor={`ts-ai-${key}`}>{label} <output>{ai[key]}</output></label>
                            <input id={`ts-ai-${key}`} type="range" min={min} max={max} step={step}
                              value={ai[key]}
                              onChange={(e) => setAi((a) => ({ ...a, [key]: +e.target.value }))} />
                          </div>
                        ))}
                      </div>
                      <p className="ts-note">
                        Computed eligible saving <b className="ts-num">{money(aiSaving)}</b> / yr against
                        an analyst default of <b className="ts-num">{money(ROWS[AI_ROW].k * 1000)}</b>.
                        Frontier pass-through is never counted as a saving.{' '}
                        <button type="button" className="ts-v" aria-pressed={aiOn} onClick={() => setAiOn((v) => !v)}>
                          {aiOn ? 'using computed figure' : 'use computed figure'}
                        </button>
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6}>Weighted total — replaced software</td>
                  <td className="ts-r ts-num">{money(software)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section>
          <h2>Infrastructure delta</h2>
          <p className="ts-note">
            The {infraPct}% delta above is a simplified default and a{' '}
            <b>user-controlled assumption, not a universal benchmark</b>. The egress anchor is real —
            DigitalOcean at $0.01/GiB against an AWS example at $0.09/GB — but it supports an egress
            comparison; it does not prove {infraPct}% for every workload. A full model would price
            provider, compute, GPU, database, storage, egress, observability, support, existing
            commitments, target Hanzo cost and migration overlap separately.
          </p>
        </section>

        <section>
          <h2>Glue engineering</h2>
          <p className="ts-note">
            The seams a vendor stack requires someone to own: {SEAMS.join(', ')}. The default of 1.5 FTE
            at ${(FTE / 1000).toFixed(0)}k fully loaded is conservative for a 30+ vendor estate, and
            0.5 FTE of platform operations is subtracted on the other side.
          </p>
          <p className="ts-label">
            Do not say Hanzo eliminates engineering. Hanzo redirects it from vendor seams to product.
          </p>
        </section>

        <section>
          <h2>Not just the bill — the build</h2>
          <p className="ts-note">
            Everything above prices what you stop <b>paying</b>. It ignores what you would have to{' '}
            <b>build</b> to own this surface yourself. Public anchors: Auth0 acquired for ~$6.5B ·
            Datadog ~$1.55B of 2025 R&amp;D · Zapier 800+ people and 9,000+ integrations. These are not
            additive valuations; they show each category is a substantial engineering domain. A
            replacement-cost study of the full repository estate is <b>under analysis</b> — no number
            will appear here until that report lands.
          </p>
        </section>

        <section>
          <h2>Exclusions — what this model never counts</h2>
          <p className="ts-note">
            Card interchange and network fees (the payment row counts PSP markup only) · frontier model
            pass-through, unless the workload is routed, distilled or self-hosted · deep vertical
            software (clinical, CAD, EDA, airline operations, industrial control, scientific
            instruments, jurisdiction-specific record systems) · migration coexistence, where both
            stacks run at once · retained vendors, since every row is independently deselectable.
          </p>
        </section>

        <section>
          <h2>Market context</h2>
          <p className="ts-note">
            Okta 2026: 98 applications on average, 259 at companies with 2,000+ employees, 72 below
            that. Zylo 2026 SaaS Management Index: a median of $9,455 of SaaS spend per employee, with
            36% of licenses unused. The ${Math.round(613)}k software default at the reference deployment
            works out to $6,130 per employee — below Zylo&rsquo;s enterprise-skewed median, so the model
            is conservative relative to the benchmark. None of this implies all SaaS spend is
            recoverable.
          </p>
        </section>

        <section>
          <h2>Second-order benefits — real, unpriced</h2>
          <p className="ts-note">{SECOND_ORDER.join(' · ')}.</p>
          <p className="ts-label">
            Material, but outside the headline until a defensible measurement exists.
          </p>
        </section>

        <section className="ts-card ts-accent">
          <h2>Replace the stack, not the capability.</h2>
          <p className="ts-note">
            100+ capabilities · {MODELS_PHRASE} · one identity · one API · one platform · self-host or
            managed.
          </p>
          <p className="ts-lead">Select your current stack and price the assembly tax.</p>
        </section>
      </div>
    </div>
  )
}

// Scoped under .ts so the page keeps its own token system without leaking bare
// element selectors into LandingNav / LandingFooter. Dark is bound to the site's
// next-themes class rather than prefers-color-scheme, so the site theme toggle
// drives it — one mechanism, not two.
const CSS = `
.ts{
  --bg:#f2f4f7; --panel:#fff; --ink:#141a21; --dim:#5d6b7a; --line:#d3dae2;
  --save:#1f7a6b; --cost:#b8402f; --soft:#e3efec; --amber:#8a6414; --grey:#6b7a8a;
  --mono:var(--font-geist-mono,ui-monospace,"SF Mono",Menlo,Consolas,monospace);
  background:var(--bg); color:var(--ink); line-height:1.5;
}
html.dark .ts{
  --bg:#0d1117; --panel:#151c24; --ink:#e4ebf2; --dim:#8a9aab; --line:#25303c;
  --save:#3fbfa8; --cost:#e5705c; --soft:#14231f; --amber:#d3a63f; --grey:#8a9aab;
}
.ts .ts-wrap{max-width:72rem;margin:0 auto;padding:2.5rem 1.25rem 5rem;display:flex;flex-direction:column;gap:2rem}
.ts h1{font-size:clamp(2rem,5vw,2.75rem);letter-spacing:-.03em;line-height:1.05;font-weight:600}
.ts h2{font-size:1.05rem;letter-spacing:-.01em;margin-bottom:.5rem;font-weight:600}
.ts h3{font-size:.95rem;margin-bottom:.4rem;font-weight:600}
.ts .ts-lead{font-size:1.15rem;color:var(--save);margin-top:.4rem}
.ts .ts-banner{font-size:.95rem;margin-top:.6rem;font-weight:500}
.ts .ts-sub{color:var(--dim);font-size:.95rem;max-width:62ch;margin-top:.5rem}
.ts .ts-note{font-size:.88rem;color:var(--dim);max-width:76ch}
.ts .ts-note b{color:var(--ink)}
.ts .ts-label{font-size:.72rem;letter-spacing:.09em;text-transform:uppercase;color:var(--amber);margin-top:.5rem}
.ts .ts-num{font-family:var(--mono);font-variant-numeric:tabular-nums}
.ts code{font-family:var(--mono);font-size:.82em;color:var(--ink)}

.ts .ts-card{background:var(--panel);border:1px solid var(--line);padding:.8rem 1rem;display:flex;flex-direction:column;gap:.4rem}
.ts .ts-accent{border-left:3px solid var(--save)}
.ts .ts-ctl{display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:.9rem}
.ts .ts-card label{font-size:.7rem;letter-spacing:.09em;text-transform:uppercase;color:var(--dim);display:flex;justify-content:space-between;gap:.5rem}
.ts .ts-card label output{font-family:var(--mono);color:var(--ink);text-transform:none;letter-spacing:0}
.ts input[type=range]{width:100%;accent-color:var(--save)}
.ts .ts-in{font:inherit;font-family:var(--mono);font-size:.85rem;width:100%;padding:.3rem .45rem;
  background:var(--bg);border:1px solid var(--line);color:var(--ink)}
.ts .ts-price{width:5.5rem;text-align:right}
.ts input:focus-visible,.ts button:focus-visible{outline:2px solid var(--save);outline-offset:2px}

.ts .ts-tiers{display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:.9rem}
.ts .ts-tier{background:var(--panel);border:1px solid var(--line);padding:1rem 1.1rem;display:flex;flex-direction:column;gap:.3rem}
.ts .ts-tier.ts-head{background:var(--soft);border-color:var(--save)}
.ts .ts-tier small{color:var(--dim);font-size:.76rem}
.ts .ts-l{font-size:.7rem;letter-spacing:.09em;text-transform:uppercase;color:var(--dim)}
.ts .ts-big{font-family:var(--mono);font-variant-numeric:tabular-nums;font-size:clamp(1.7rem,4vw,2.4rem);
  letter-spacing:-.04em;color:var(--save);line-height:1.05}
.ts .ts-pending{font-size:1rem;color:var(--amber);padding:.5rem 0;line-height:1.2}

.ts .ts-parts{display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));gap:.75rem;margin-top:.9rem}
.ts .ts-p{background:var(--panel);border:1px solid var(--line);border-top:3px solid var(--save);padding:.7rem .9rem}
.ts .ts-p.ts-neg{border-top-color:var(--cost)}
.ts .ts-p small{color:var(--dim);font-size:.72rem;display:block;margin-bottom:.2rem}
.ts .ts-p .ts-num{font-size:1.15rem}
.ts .ts-formula{font-size:.8rem;color:var(--dim);margin-top:.9rem;display:flex;flex-wrap:wrap;gap:.4rem}
.ts .ts-warn{font-size:.85rem;color:var(--amber);margin-top:.5rem}
.ts .ts-trust{font-size:.8rem;color:var(--dim);max-width:80ch;margin-top:1rem;
  border-left:2px solid var(--line);padding-left:.9rem}

.ts .ts-wall{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.7rem}
.ts .ts-v{font:inherit;font-size:.78rem;padding:.28rem .55rem;border:1px solid var(--line);
  background:var(--panel);color:var(--ink);cursor:pointer}
.ts .ts-v[aria-pressed=true]{border-color:var(--save);color:var(--save);background:var(--soft)}
.ts .ts-more{font:inherit;font-size:.68rem;letter-spacing:.05em;text-transform:uppercase;
  background:none;border:none;color:var(--save);cursor:pointer;padding:0 .2rem;text-decoration:underline}

.ts .ts-scroll{overflow-x:auto;background:var(--panel);border:1px solid var(--line);margin-top:.8rem}
.ts table{width:100%;border-collapse:collapse;font-size:.85rem}
.ts th,.ts td{text-align:left;padding:.45rem .7rem;border-bottom:1px solid var(--line);white-space:nowrap}
.ts th{position:sticky;top:0;background:var(--panel);font-size:.65rem;letter-spacing:.09em;
  text-transform:uppercase;color:var(--dim);z-index:1}
.ts tbody tr:last-child td{border-bottom:none}
.ts td.ts-r,.ts th.ts-r{text-align:right}
.ts .ts-svc{font-family:var(--mono);font-size:.76rem;color:var(--dim)}
.ts tr.ts-off td{opacity:.42}
.ts tfoot td{font-weight:700;border-top:2px solid var(--ink)}
.ts .ts-x{font-family:var(--mono);font-size:.72rem;color:var(--amber);margin-left:.3rem}
.ts .ts-panel{white-space:normal;background:var(--bg);padding:1rem}
.ts .ts-panel .ts-ctl{margin:.7rem 0}

.ts .ts-chip{font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;padding:.12rem .45rem;
  border:1px solid;background:none;font-family:inherit;white-space:nowrap}
.ts button.ts-chip{cursor:pointer}
.ts .ts-c-full{color:var(--save);border-color:var(--save)}
.ts .ts-c-partial{color:var(--amber);border-color:var(--amber)}
.ts .ts-c-experimental{color:var(--cost);border-color:var(--cost)}
.ts .ts-c-roadmap{color:var(--grey);border-color:var(--grey)}
.ts .ts-e-verified{color:var(--save);border-color:var(--save)}
.ts .ts-e-gap{color:var(--cost);border-color:var(--cost)}
.ts .ts-e-internal,.ts .ts-e-repo{color:var(--grey);border-color:var(--grey)}
.ts .ts-e-attested{color:var(--amber);border-color:var(--amber)}
`
