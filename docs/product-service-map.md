# Product ↔ Service ↔ Plan map

One coherent mapping so the products menu, the `/v1/<svc>` API surface, and the
billing/plan/usage plane are **one thing**. For every product in the mega-menu:
its marketing route → its canonical `/v1/<svc>` endpoint(s) → how it is metered
and gated (plan/usage).

- **Menu source of truth:** `lib/data/cloud-primitives.ts` (drives
  `lib/constants/navigation-data.ts` → the products mega-menu → the
  `/products/<slug>` category pages). Ten categories, ~60 leaves.
- **Service source of truth:** `~/work/hanzo/cloud/subsystems/subsystems.go`
  (the blank-imported set of subsystems mounted into the one `cloud` binary —
  the real, shipped `/v1/*` surface).
- **Plan/usage plane** (the meter for every product), all in `~/work/hanzo/cloud`:
  - `clients/pricing` → `/v1/pricing/*` — the `@hanzo/pricing` catalog
    (per-model token prices). The meter for AI inference.
  - `clients/plan` → `/v1/plans/*` — the `@hanzo/plans` catalog (tiers:
    **free · pro · enterprise**, each granting a set of entitlement features).
  - `clients/entitlements` → `/v1/orgs/:org/entitlements` — per-org product
    enablement, keyed by the `@hanzo/products` catalog slug (`= commerce
    productID`). A product may be **enabled** only if the org's plan **entitles**
    it (commerce gate; super-admin comps bypass).
  - `clients/billing` → `/v1/billing/{usage,balance}` and `clients/usage` →
    `/v1/usage/summary` — the org-scoped ledger + unified footprint every
    metered unit settles into (commerce ledger, Hanzo-L1 anchored).

**Meter legend** (the "Plan / meter" column): the billable dimension for the
product. Every dimension records into `/v1/billing` + `/v1/usage/summary`, is
priced by `/v1/pricing` (AI) or the plan tier, and is gated by the org's
`entitlement` id.

---

## AI — `/products/ai`

| Product | Route | Canonical `/v1` | Plan / meter |
|---|---|---|---|
| Models | `/models` | `/v1/models`, `/v1/chat/completions` (`hanzoai/ai`, order 150) | per-token (`/v1/pricing` catalog) · entitlement `models` |
| Agents | `/agents` | `/v1/agents/*` (`clients/agents`, 127) | per-run + underlying tokens · entitlement `agents` |
| Inference | `/engine` | `/v1/chat/completions`, `/v1/embeddings` (`hanzoai/ai`, 150) | per-token · entitlement `engine` |
| Fine-tuning | `/cloud/fine-tuning` | `/v1/ml/*`, `/v1/train/*` (`clients/ml`, 130) | per-GPU-hour (training) · entitlement `ml` |
| Embeddings | `/cloud/embeddings` | `/v1/embeddings` (`hanzoai/ai`, 150) | per-token · entitlement `embeddings` |
| Evals | `/cloud/evals` | `/v1/evals/*` (`clients/eval`, 145) | per-eval-run · entitlement `evals` |

## Compute — `/products/compute`

| Product | Route | Canonical `/v1` | Plan / meter |
|---|---|---|---|
| GPUs | `/cloud/gpus` | `/v1/gpus/*`, `/v1/clusters/*` (`clients/visor`, 133) | per-GPU-second · entitlement `gpus` |
| Machines | `/machines` | `/v1/machines/*` (`clients/visor`, 133) | per-instance-hour · entitlement `machines` |
| Containers | `/cloud/containers` | `/v1/platform/*` (`clients/platform`, 124) | per-container GB-s · entitlement `platform` |
| Functions | `/functions` | `/v1/functions/*` (`clients/functions`, 128) | per-invocation + GB-s · entitlement `functions` |
| Edge | `/edge` | `/v1/ingress/*` (`clients/ingress`, 42) | per-request · entitlement `edge` |
| Jobs | `/cloud/jobs` | `/v1/tasks/*` (`clients/tasks`, 147) | per-job-run · entitlement `tasks` |

## Data — `/products/data`

| Product | Route | Canonical `/v1` | Plan / meter |
|---|---|---|---|
| Vector | `/vector` | `/v1/vector` (`clients/provisioning`, 120 + `clients/product`, 145) | per-GB + per-query · entitlement `vector` |
| SQL | `/sql` | `/v1/sql` (`clients/provisioning`, 120) | per-GB + per-hour · entitlement `sql` |
| KV | `/kv` | `/v1/kv` (`clients/provisioning`, 120) | per-GB + per-op · entitlement `kv` |
| Object Storage | `/storage` | `/v1/s3/*` (`clients/storage` 118 + `clients/provisioning` 120) | per-GB stored + egress · entitlement `storage` |
| Datastore | `/datastore` | `/v1/datastore` (`clients/provisioning`, 120) | per-GB + per-query · entitlement `datastore` |
| DocDB | `/docdb` | `/v1/docdb` (`clients/provisioning`, 120) | per-GB + per-op · entitlement `docdb` |

## Network — `/products/network`

| Product | Route | Canonical `/v1` | Plan / meter |
|---|---|---|---|
| Gateway | `/gateway` | edge tier (`gateway`, routes → cloud) | per-request · entitlement `gateway` |
| VPC | `/network` | `/v1/vpcs/*` (`clients/do`, 123) · `/v1/networks/*` (`clients/zt`, 134) | per-VPC + per-GB · entitlement `network` |
| DNS | `/dns` | `/v1/networks/*` (`clients/zt` private DNS) | per-zone + per-query · entitlement `dns` |
| CDN | `/cloud/cdn` | edge tier (`ingress`/`gateway`) — no dedicated `/v1` | per-GB egress · entitlement `cdn` |
| Load Balancer | `/ingress` | `/v1/load-balancers/*` (`clients/do`, 123) | per-LB-hour · entitlement `ingress` |
| Service Mesh | `/cloud/service-mesh` | `/v1/mesh/services`, `/v1/edge/nodes` (`clients/zt`, 134) | per-workload · entitlement `mesh` |

## Security — `/products/security`

| Product | Route | Canonical `/v1` | Plan / meter |
|---|---|---|---|
| IAM | `/iam` | `/v1/iam/*`, `/.well-known/*` (`clients/iam`, 50) | per-MAU / seat · entitlement `iam` |
| Authz | `/authz` | `/v1/authz/*` (`hanzoai/authz`, 70) | per-check · entitlement `authz` |
| KMS | `/kms` | `/v1/kms/*` (`clients/kmssvc`, 10) | per-key + per-op · entitlement `kms` |
| HSM | `/hsm` | `/v1/wallets/*` (MPC/treasury signer, `clients/wallets`, 127) | per-key + per-sign · entitlement `hsm` |
| Secrets | `/cloud/secrets` | `/v1/kms/*` (`clients/kmssvc`, 10) | per-secret + per-op · entitlement `secrets` |
| Audit | `/cloud/audit` | `/v1/audit` (`clients/auditlog`, 144) | per-event retained · entitlement `audit` |

## Dev — `/products/dev`

| Product | Route | Canonical `/v1` | Plan / meter |
|---|---|---|---|
| CLI | `/cli` | *client* — calls `/v1/*` | free (SDK) · no meter |
| SDKs | `/cloud/sdks` | *client libraries* — call `/v1/*` | free (SDK) · no meter |
| API | `/cloud/api` | the whole `/v1/*` surface (meta) | per-call · billed by target service |
| Playground | `/playground` | `/v1/chat/completions` (`hanzoai/ai`, 150) | per-token · entitlement `engine` |
| IDE | `/code` | `/v1/chat`, `/v1/exec`, `/v1/files` (`clients/exec`, 140) | per-token + per-exec-min · entitlement `code` |
| Desktop | `/desktop` | *client app* — calls `/v1/*` | free (client) · no meter |

## Platform — `/products/platform`

| Product | Route | Canonical `/v1` | Plan / meter |
|---|---|---|---|
| Projects | `/platform` | `/v1/projects/*` (125) · `/v1/platform/*` (124) | per-project / seat · entitlement `platform` |
| Environments | `/cloud/environments` | `/v1/platform/*` (`clients/platform`, 124) | per-env · entitlement `platform` |
| Builds | `/cloud/builds` | `/v1/paas/*` (`clients/paas`, 128) + arcd | per-build-minute · entitlement `builds` |
| Registry | `/registry` | `registry.hanzo.ai` (own deployment, S3-backed) | per-GB stored · entitlement `registry` |
| Releases | `/cloud/releases` | `/v1/paas/*` (`clients/paas`, 128) | per-deploy · entitlement `releases` |
| Pipelines | `/cloud/pipelines` | `/v1/automations/*` (`clients/automations`, 148) | per-run · entitlement `pipelines` |

## Observe — `/products/observe`

| Product | Route | Canonical `/v1` | Plan / meter |
|---|---|---|---|
| Logs | `/cloud/logs` | `/v1/o11y/logs` (`clients/o11y`, 69) | per-GB ingested · entitlement `logs` |
| Metrics | `/metrics` | `/v1/o11y/metrics` (`clients/o11y`, 69) | per-series · entitlement `metrics` |
| Traces | `/telemetry` | `/v1/o11y/*` OTLP ingest (`clients/o11y`, 72) | per-span · entitlement `traces` |
| Dashboards | `/dashboards` | `/v1/analytics/*` (`clients/analytics`, 132) | per-seat · entitlement `dashboards` |
| Alerts | `/sentry` | `/v1/o11y/status` (`clients/o11y`, 69) | per-monitor · entitlement `alerts` |
| Cost | `/cloud/cost` | `/v1/billing/{usage,balance}` (121) · `/v1/usage/summary` (131) | the meter itself (no add-on) |

## Web3 — `/products/web3` → **Lux Network (lux.cloud)**

White-label separation: these are **Lux Network** surfaces. The menu, the
category page, and every leaf carry the **Lux** brand and hand off to
**lux.cloud** — never the Hanzo mark. On the Hanzo cloud side the chain-data
reads are exposed by `clients/graph` + `clients/wallets`, but the customer entry
point is lux.cloud; settlement is metered into the same commerce ledger.

| Product | Link | Lux surface | Hanzo-side `/v1` (chain-data reads) |
|---|---|---|---|
| Settlement | `lux.cloud` | on-chain settlement | `/v1/finance/*` (`clients/treasury`, 146) anchor |
| Chains | `lux.cloud/services` | Chain Launch (L1/L2 rollups) | — |
| Wallets | `lux.cloud/services` | MPC custody | `/v1/wallets/*` (`clients/wallets`, 127) |
| Tokens | `lux.cloud/services` | tokenization | — |
| Indexer | `lux.cloud/services` | explorer + chain data | `/v1/indexers` (`clients/graph`, 135) |
| Oracles | `lux.cloud/services` | price + data feeds | `/v1/oracles` (`clients/graph`, 135) |

## Apps — `/products/apps`

| Product | Route | Canonical `/v1` | Plan / meter |
|---|---|---|---|
| Chat | `/chat` | `/v1/chat/completions` (`hanzoai/ai`, 150) | per-token · entitlement `chat` |
| Bot | `/bot` | `/v1/bot/*` (`clients/bot`, 143) | per-seat + tokens · entitlement `bot` |
| Search | `/search` | `/v1/search` (`clients/provisioning`) · `/v1/websearch/*` (141) | per-query · entitlement `search` |
| Crawl | `/crawl` | `/v1/websearch/*` (SearXNG+Firecrawl, `clients/websearch`, 141) | per-page crawled · entitlement `crawl` |
| Studio | `/studio` | `/v1/chat`, image models (`hanzoai/ai`, 150) | per-token / per-image · entitlement `studio` |
| Console | `/console` | `/v1/console/{keys,onboard}` (`clients/console`, 122) | free (control plane) · no meter |

---

## Reconciliation

### A. Menu leaves with **no dedicated `/v1` service** (expected — clients, edge, meta)

These are correct as-is: they are client tools, edge components, or meta
surfaces that consume other services' `/v1`, not standalone billable services.

- **CLI** (`/cli`), **SDKs** (`/cloud/sdks`), **Desktop** (`/desktop`) — client
  libraries/apps; they call `/v1/*`, they don't mount it.
- **API** (`/cloud/api`) — names the whole `/v1/*` surface (meta).
- **CDN** (`/cloud/cdn`), **Edge** (`/edge`), **Gateway** (`/gateway`) — the edge
  tier (`gateway`/`ingress`), which routes *to* the cloud binary.
- **Environments / Builds / Releases / Pipelines** (`/cloud/*`) — facets of
  `platform`/`paas`/`automations`, not separate mounts.
- **Registry** (`/registry`) — its own S3-backed deployment (`registry.hanzo.ai`),
  outside the fused `cloud` binary by design.

No menu leaf points at a service that does not exist.

### B. Shipped `/v1/<svc>` with **no products-menu entry** (candidate products / by-design internal)

Real, mounted subsystems that the 10-category products nav does **not** surface.
Split by intent:

**Candidate products** (shipped service, arguably belongs in the menu):

- `/v1/git/*` (`clients/git`) — S3-backed Git hosting → **Dev** or **Platform**.
- `/v1/kb/*` (`clients/knowledge`) — knowledge base + AI memory → **Data**/**Apps**.
- `/v1/tasks/*` (`clients/tasks`) — durable workflow engine → **Compute** (Jobs
  already maps here) / an **Async** lane.
- `/v1/automations/*` (`clients/automations`) — connector automations → **Platform**
  (Pipelines maps here) / **Async**.
- `/v1/prompts/*` (`clients/prompts`) + `/v1/templates/*` (`clients/templates`) —
  prompt/starter library → **Dev**/**AI**.
- `/v1/security/*` (`clients/security`) — code secrets scanner → **Security**.
- `/v1/integrations/*` (`clients/integrations`) — OAuth connectors → **Platform**.
- `/v1/analytics/*` (`clients/analytics`) — product/LLM analytics → **Observe**
  (currently only Dashboards maps here).
- `/v1/crm/*` (`clients/crm`), `/v1/tracker/*` (`clients/tracker`),
  `/v1/team/*` (`clients/team`), `/v1/framework/*` + `cms`/`erp`/`help` —
  business apps (CRM / issues / workspace / DocType + CMS/ERP/Helpdesk). Present
  in the legacy `lib/data/product-taxonomy.ts` (CX/Apps) but **not** in the
  canonical cloud-primitives nav. → an **Apps**/**Business** lane if productized.
- `/v1/finance/*` (`clients/treasury`) — finance.hanzo.ai ledger (its own surface).
- `/v1/world/*` (`clients/world`), `/v1/notify/*` (`clients/notify`) — data/OTP
  planes; internal today.

**By-design internal / non-product** (correctly absent from the products menu):

- `/v1/billing`, `/v1/usage`, `/v1/plans`, `/v1/pricing`, `/v1/orgs/:org/entitlements`,
  `/v1/settings/:product` — the **plan/usage plane itself** (the meter, not a product).
- `/v1/admin/*` (`clients/admin`) — god-mode admin console (admin.hanzo.ai).
- `/v1/affiliates`, `/v1/authors`, `/v1/referrals` — account-level growth loops
  (surfaced in the dashboard, not the products catalog).
- `/v1/console/*` — the console control plane (mapped above under Apps → Console).
- `hanzoai/base` (60), `hanzoai/vfs` (20), `hanzoai/metrics` (40),
  `hanzoai/licensing` (110), `clients/pubsub` (5), `clients/kafka` (6),
  `clients/plugin` (900), `clients/exec` (140) — foundational infra the products
  are built on (Base/VFS/PubSub/Kafka), surfaced indirectly (e.g. Base powers
  the Apps lane; PubSub/Kafka power streaming).

### C. Web3 → lux.cloud (white-label)

The six Web3 leaves were retargeted off the Hanzo-hosted `/blockchain/*` overview
pages to **lux.cloud** under the **Lux** brand. The Hanzo-side chain-data reads
(`/v1/indexers`, `/v1/oracles`, `/v1/wallets`, `/v1/finance`) remain in the cloud
binary as the settlement/anchor plane, but the customer-facing product is Lux.
The legacy Hanzo `/blockchain/settlement` and `/blockchain/attestations` overview
pages still resolve (they read the same primitives via `getPrimitive`) and are
slated for removal once lux.cloud fully owns the surface.

---

*Single-sourced from `lib/data/cloud-primitives.ts` and
`~/work/hanzo/cloud/subsystems/subsystems.go`. Update this map whenever a leaf or
a subsystem is added on either side.*
