---
title: Legal and Data-Governance Implementation Checklist
slug: implementation-checklist
kind: internal
status: internal
version: "2026-07-22"
updated: "2026-07-22"
summary: INTERNAL — the engineering/legal checklist that makes the published commitments true. Never published as a public /legal page.
publish: false
---

# Hanzo Legal and Data-Governance Implementation Checklist

**Purpose:** make the published Terms and Privacy commitments true in the product, gateway, benchmark registry, research data plane, and provider contracts.

## A. Decisions counsel and leadership must confirm

- [ ] Confirm legal entity, registered address, notice address, and jurisdictions of operation.
- [ ] Confirm whether one entity or an EU affiliate is controller for EEA users.
- [ ] Appoint an EU Article 27 representative or document why not required.
- [ ] Appoint a DPO or document the GDPR Article 37 analysis.
- [ ] Confirm governing law, venue, consumer dispute posture, and whether arbitration is desired.
- [ ] Confirm consumer minimum age of 18 and block unsupported minor accounts.
- [ ] Approve exact retention schedule against production capabilities.
- [ ] Confirm no sale or cross-context behavioral advertising; remove or disclose any conflicting SDKs.
- [ ] Determine whether Hanzo will certify under the EU–U.S. Data Privacy Framework. Do not claim certification until active.
- [ ] Obtain privacy/product counsel review for GDPR, CCPA/CPRA, state privacy laws, COPPA, BIPA, My Health My Data, AI Act, consumer subscriptions, and sectoral use.

## B. Consent and policy engine

Create a server-enforced data-use field—not merely a UI preference:

```text
service_only
private_improvement
research_training
public_commons
```

Public contribution should be a distinct record rather than an escalation that silently changes the original copy.

For each permission event, record:

- [ ] user ID and organization ID;
- [ ] administrator authority where applicable;
- [ ] purpose and exact data categories;
- [ ] future-only versus identified historical date range;
- [ ] policy, consent text, and UI version/hash;
- [ ] timestamp, jurisdiction, language, and collection surface;
- [ ] retention period;
- [ ] provider and public-license disclosures;
- [ ] withdrawal timestamp and effect; and
- [ ] dataset/model lineage and deletion status.

Required behavior:

- [ ] all research and public boxes unchecked by default;
- [ ] no preselected consent, dark patterns, or acceptance bundled into Terms;
- [ ] declining research does not degrade core paid functionality;
- [ ] any incentive or credits for participation are clearly disclosed and not coercive;
- [ ] organization admins can prohibit end-user contribution;
- [ ] provider calls inherit the strictest applicable organization/user policy;
- [ ] public contribution uses a second confirmation naming material, repository, attribution, and license;
- [ ] sensitive/biometric/health research can never inherit general research consent; and
- [ ] policy changes cannot retroactively rewrite consent.

## C. Training-data firewall and lineage

- [ ] Make `service_only` records technically ineligible for generalized training exports.
- [ ] Use allowlisted exports rather than an opt-out deletion pass after ingestion.
- [ ] Root-split synthetic and real tasks before variants to prevent evaluation leakage.
- [ ] Attach source, license, consent, benchmark-contamination, personal-data, and sensitivity metadata to every root.
- [ ] Maintain immutable lineage from source → variants → attempts → candidate sets → training shard → checkpoint/model.
- [ ] Quarantine records with unknown rights or consent.
- [ ] Prevent public benchmark roots and close paraphrases from training unless the research protocol expressly permits them; never evaluate on trained-on items as held-out evidence.
- [ ] Maintain deletion tombstones so withdrawn data is not re-ingested from caches or backups.
- [ ] Define completed-model remedies: source deletion, suppress future training, machine unlearning where effective, filter, retire, or retrain.
- [ ] Test canary records proving nonconsented data cannot enter training.

## D. Benchmark Arena and provenance

- [ ] Implement a Benchmark Rights Registry for every dataset and provider.
- [ ] Record benchmark license, attribution, redistribution, derivative, and commercial-use terms.
- [ ] Record each provider’s right-to-benchmark, Output-retention, comparative-publication, and branding restrictions.
- [ ] Default a run to private when rights are unresolved.
- [ ] Separate underlying copyrighted prompt/reference content from Hanzo-owned measurements and compilation.
- [ ] Store model/provider/version/date, endpoint, prompt template, sample settings, seed, raw Output where permitted, normalized answer, verifier, fault, token, cost, latency, cache, and provenance.
- [ ] Mark provider-reported and Hanzo-executed results as different protocols.
- [ ] Preserve correction/supersession history rather than silently rewriting results.
- [ ] Record number of draws and distinguish single-draw observed oracle, reproducible oracle, and budgeted sampling oracle.
- [ ] Exclude API faults from model-quality claims or disclose treatment consistently.
- [ ] Allow providers to submit replication evidence without giving them veto over good-faith unfavorable results.
- [ ] Ensure cache-before-spend only reuses attempts when prompt, model version, parameters, and protocol are equivalent.

## D2. `/v1/research` evidence registry

- [ ] Use stable project/run/artifact identifiers and idempotency keys.
- [ ] Make evidence append-only or version-preserved; corrections create a superseding record.
- [ ] Preserve the distinction among original, corrected, superseded, retracted, and canonical/latest records.
- [ ] Hash run manifests and artifacts; record repository revision, environment, hardware, model, dataset, and policy versions.
- [ ] Separate run metadata from large/raw artifacts so each can follow the correct retention and access policy.
- [ ] Default every uploaded run and artifact to organization-private.
- [ ] Require an explicit visibility grant for public board, paper, leaderboard, or Verified Commons display.
- [ ] Apply secrets, personal-data, license, and consent scanning before cloud upload and again before publication.
- [ ] Do not call the system “never lost” until durable upload, retry, reconciliation, backup, restoration, and disaster-recovery tests pass.
- [ ] Do not call ordinary mutable SQLite rows “immutable”; use append-only history, integrity hashes, and restricted mutation paths.
- [ ] Track local-only, upload-pending, cloud-confirmed, replicated, and recovery-tested states independently.
- [ ] Retain failed and negative results and preserve their status rather than selecting only favorable evidence.

## E. Enso routing and Genome disclosures

- [ ] Log the Enso policy/version and eligible arm set for each request.
- [ ] Log whether Scout, Critic, Controller, Conductor, verifier, or Genome-derived preset participated.
- [ ] Enforce organization provider allow/deny lists before routing.
- [ ] Ensure all possible arms are listed as subprocessors, including providers behind OpenRouter.
- [ ] Record whether multiple providers received a request.
- [ ] Keep raw content out of general observability events.
- [ ] Distinguish quality-max, balanced, fast, and customer-created MAP-Elites presets.
- [ ] Disclose that GA/MAP-Elites optimizes pool/workflow/policy configuration, not neural weights.
- [ ] Train Scout/Critic only from consent-eligible records.
- [ ] Validate held-out recovery-minus-damage at matched cost before making performance claims.

## F. Provider and subprocessor contracts

For DigitalOcean, OpenRouter, and every underlying model provider:

- [ ] legal entity and processing location;
- [ ] DPA and SCC/transfer mechanism;
- [ ] no training on Customer Content;
- [ ] retention and zero-data-retention mode;
- [ ] confidentiality and security obligations;
- [ ] breach-notification timing;
- [ ] deletion/return and assistance;
- [ ] subprocessor disclosure;
- [ ] right to run benchmarks and retain outputs;
- [ ] right to publish comparative results and faults;
- [ ] restrictions on reasoning traces, prompts, model names, and logos; and
- [ ] confirmation that router intermediaries bind underlying providers equivalently.

Publish the populated Subprocessor Register and create subscription-based change notices.

## G. Privacy rights and deletion

- [ ] Launch a privacy request portal covering access, correction, deletion, portability, objection, restriction, consent withdrawal, opt-outs, and appeals.
- [ ] Support authorized agents without requiring unnecessary identity data.
- [ ] Respond within jurisdictional deadlines and preserve case records.
- [ ] Implement deletion across primary stores, vector stores, AttemptStore, caches, object storage, logs, training shards, and subprocessors.
- [ ] Age deleted records out of backups within the promised period.
- [ ] Separate account deletion, conversation deletion, research withdrawal, and public-contribution takedown so each has the stated effect.
- [ ] Honor Global Privacy Control where required.
- [ ] Implement California rights to know/delete/correct/limit/opt out and state-law appeals.

## H. GDPR and international transfers

- [ ] Record of Processing Activities covering controller and processor roles.
- [ ] DPIA for AI research, large-scale monitoring, sensitive data, multimodal/biometric services, and any high-impact uses.
- [ ] Legitimate Interest Assessment for each processing purpose relying on legitimate interests.
- [ ] SCCs and UK Addendum with subprocessors where required.
- [ ] Transfer Impact Assessments and supplementary measures.
- [ ] Article 13/14 notices for direct and third-party/public-source training data.
- [ ] Procedure for objections, deletion, and access relating to training data and model outputs.
- [ ] Do not describe hashed or pseudonymous data as anonymous without a defensible re-identification/extraction assessment.

## I. U.S. compliance

- [ ] California Notice at Collection available at or before collection.
- [ ] CCPA contracts with every service provider/contractor.
- [ ] CPPA risk assessments beginning with covered processing from January 1, 2026.
- [ ] Assess CPPA ADMT duties before January 1, 2027 for any significant-decision use.
- [ ] Cybersecurity audit applicability and deadline analysis.
- [ ] State sensitive-data opt-in consent and data-protection assessments.
- [ ] COPPA/age gate; no general service use under 18 under the current policy.
- [ ] BIPA written notice/consent and public destruction schedule before face/voice templates.
- [ ] Washington and similar consumer-health notice and consent before covered health-data use.
- [ ] Easy online subscription cancellation and legally required renewal disclosures.
- [ ] FTC review of every privacy, security, training, benchmark, cost, and accuracy claim.

## J. AI transparency and training-data disclosures

- [ ] California Civil Code §3111/AB 2013 training-data page before releasing or substantially modifying a covered generative AI service.
- [ ] Identify datasets, sources/owners, purposes, data types, time periods, whether personal data or copyrighted material is included, cleaning, licensing, synthetic data, and user-data use as required.
- [ ] EU AI Act GPAI applicability analysis for every Hanzo-trained model.
- [ ] Publish the mandatory EU training-content summary where Hanzo is a GPAI provider.
- [ ] Copyright and text/data-mining opt-out compliance policy.
- [ ] Explicitly inform users when interacting with AI.
- [ ] Implement machine-readable marking/detection support and deepfake/public-interest text disclosures required from August 2, 2026.
- [ ] Preserve model cards, system cards, evaluation protocols, known limitations, and version history.

## K. Sensitive and sectoral features

- [ ] Block PHI unless the customer and covered Services have a BAA.
- [ ] Block PCI cardholder data from prompts; tokenize through the payment processor.
- [ ] Separate K–12 terms/DPA before minors or student records.
- [ ] Written face/voice/likeness consent before cloning, dubbing, avatars, or biometric processing.
- [ ] Liveness/identity vendor and retention disclosure.
- [ ] Prohibit public contribution of sensitive data unless a counsel-approved study permits it.
- [ ] High-impact employment, credit, insurance, housing, education, health, legal, and government uses require a separate product review and agreement.

## L. Security and operations

- [ ] Verify encryption, tenant isolation, RBAC, MFA, secrets rotation, logs, vulnerability management, backups, incident response, and secure deletion against the DPA promises.
- [ ] Create a personal-data incident playbook with GDPR 72-hour and customer-notification decision paths.
- [ ] Prevent raw prompts/outputs from entering logs, traces, crash tools, tickets, and analytics by default.
- [ ] Redact secrets and personal data before human review or annotation where feasible.
- [ ] Restrict research corpus access and log every export.
- [ ] Annual policy-to-code audit and quarterly subprocessor/provider review.

## M. Publication gates

Do not publish the drafts as effective until:

- [ ] all placeholders are resolved;
- [ ] legal and privacy mailboxes work and are monitored;
- [ ] DMCA agent is designated;
- [ ] privacy portal, consent settings, Cookie Settings, and GPC handling work;
- [ ] retention and deletion jobs pass end-to-end tests;
- [ ] subprocessor and cookie registers are populated;
- [ ] Terms links resolve;
- [ ] versioned acceptance and consent receipts are stored;
- [ ] current users receive material-change notice;
- [ ] historical data is not newly trained on without a valid prior permission or fresh opt-in; and
- [ ] qualified privacy/product counsel approves the final text and launch posture.
- [ ] research-board copy accurately distinguishes current shipped guarantees from planned uploader, OLAP, replication, and recovery work.

