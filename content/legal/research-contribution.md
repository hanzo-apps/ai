---
title: AI Research and Data Contribution Terms
slug: research-contribution
kind: supplemental
status: draft
version: "2026-07-22"
updated: "2026-07-22"
summary: The opt-in terms that govern whether and how your data may be used for Hanzo AI research and training — the four data-use states, affirmative election, withdrawal, and the Verified Commons.
order: 5
---

These AI Research and Data Contribution Terms (the "Research Terms") govern any optional use of your data for Hanzo research and model development. They supplement the [Terms of Service](/legal/terms) and [Privacy Policy](/legal/privacy) and apply **only** when you or your authorized organization administrator affirmatively elects a research state below. **Research participation is never required to receive the Services.** Declining leaves your data in the Service Only state and does not degrade paid functionality.

## 1. The four data-use states

Your data sits in exactly one state per scope. Only the last two authorize any research use; both require an affirmative election.

1. **Service Only** *(default, every account, every region).* Data is used only to provide, route, secure, support, meter, and lawfully operate the Services. It is **not** used to train, fine-tune, evaluate, or optimize any generalized Hanzo model, router, selector, or dataset. These Research Terms do not govern Service Only data — the Terms and Privacy Policy do.
2. **Private Improvement.** You permit specified data to be used to evaluate and improve the Services **for your own account or organization only** — never the shared base model or router — unless your election expressly includes training.
3. **Research and Training.** You affirmatively permit specified, sanitized data to be used to train, fine-tune, evaluate, or optimize reusable Hanzo systems, including the shared Enso Scout, Critic, Controller, Conductor, Genome, capability models, verifiers, and safety systems.
4. **Public Commons.** You separately choose an identified artifact for public release under a stated dataset license. Private research permission alone **never** authorizes public release (see Section 6).

## 2. Affirmative election — never by default, never retroactive

Entering Private Improvement, Research and Training, or Public Commons requires a deliberate, unbundled choice:

- The setting is **off by default** and is presented separately from acceptance of the Terms. Research boxes are never pre-checked, and consent is never bundled into another agreement or acquired through a dark pattern.
- We record the electing identity, the exact data categories and scope, whether the scope is future-only or an identified historical date range, the policy and consent-text version, the timestamp, jurisdiction, and surface.
- We will **not** retroactively convert previously collected Service Only data into training data by changing a policy. A materially broader research purpose requires a fresh affirmative election where law or this document requires one. Quietly acquiring training rights through a policy update is the deceptive conduct the U.S. Federal Trade Commission has warned against, and we do not do it.
- **Safety review is not a training override.** Material reviewed to investigate abuse, fraud, safety, or security may be retained and used for that specific purpose in any state, but it is never promoted into a training state without the separate election here.

## 3. What research may use

Depending on the state and scope you elect, research may use your Inputs, Outputs from one or more candidate models, reasoning or tool traces, feedback and correctness labels, benchmark provenance, routing features, embeddings, activation-derived features, and cost, token, and latency measurements. You may elect a narrower tier where offered — for example **outcomes-only** (scores and labels, no content) versus **sanitized-content** — and the narrower tier binds.

## 4. Sanitization and de-identification

Before any elected data enters a training corpus it passes through one governed pipeline at ingestion: a consent gate, removal of personally identifiable information, redaction and filtering of residual sensitive content, a de-identification check, and a provenance stamp recording the consent state, sanitization version, and retention deadline. The pipeline is **fail-closed** — data that cannot be confidently de-identified is dropped, not admitted. "De-identified" is a verified property, not a label; we periodically re-test the corpus for residual identifying signal. Removing or hashing an account identifier alone does not make data anonymous.

## 5. Retention, withdrawal, and deletion

- **Train-eligible data** you elect into Research and Training is retained for the research purpose after sanitization. You may set a shorter window; a per-tenant maximum applies.
- **Opted-out data** (Service Only) is kept only for the operational window stated in the [Privacy Policy](/legal/privacy) retention schedule — for support, abuse prevention, and billing — then deleted. It is never trained on.
- **Withdrawal is prospective and honored.** You may withdraw a research election at any time in settings or via privacy@hanzo.ai. We stop placing the affected data into new training runs and delete or quarantine eligible source records under our provenance and deletion procedures. Withdrawal does not invalidate processing lawfully completed before it.
- **Effect on a trained model.** Because a trained model holds distributed learned parameters, not a copy of source records, removing your contribution from a completed model may require source deletion, suppression from future training, machine unlearning where effective, output filtering, retirement, or retraining. We evaluate valid legal requests on their merits rather than treating a completed model as automatically anonymous or categorically exempt. The plain boundary: we delete the **data** and use no **future** training on it; we do not represent that an already-trained model is retroactively untrained.

## 6. Verified Commons — a separate, per-artifact choice

Publishing to the Hanzo Verified Commons, Hugging Face, or any public repository is a distinct action beyond a private research election. The contribution flow identifies the exact material, the destination repository, the attribution choice, and the dataset license, and explains — before you confirm — that public release may be copied and redistributed by third parties and can be difficult or impossible to fully retract. Sensitive, biometric, or health data can never be contributed to the Commons by inheriting general research consent; it requires its own counsel-approved study and permission.

## 7. Organization controls and provider routing

Where an organization administers accounts, the administrator may enable or prohibit end-user research contribution for the organization. Where user and organization settings differ, the **strictest** applicable policy governs. Calls that Enso routes to model or infrastructure providers inherit the strictest applicable state, and providers are bound by contract not to train on data absent the corresponding right (see the [DPA](/legal/dpa) and [Subprocessor Register](/legal/subprocessors)).

## 8. Incentives, rights, and legal basis

Any credits or incentives offered for participation are clearly disclosed and are not a condition of receiving the core Services. You grant Hanzo the limited, revocable (prospectively) license necessary to use contributed data for the state you elected; Hanzo owns the models, features, and aggregate analyses it develops, subject to rights you or third parties retain in underlying content. Where the GDPR or similar law applies, the lawful basis for research contribution is your consent (or a separate written research agreement), documented and withdrawable, and special-category data requires an additional lawful condition.

## 9. Benchmark and contamination firewall

Public benchmark items and close paraphrases are prevented from entering training unless a research protocol expressly permits it, and items trained on are never presented as held-out evaluation evidence. Synthetic and real tasks are root-split before variants are generated to prevent evaluation leakage. Benchmark records are governed by the [Terms](/legal/terms) Benchmark Arena section and the [Research API Supplemental Terms](/legal/research-api).

## 10. Contact

- Research and contributions: research@hanzo.ai
- Privacy and withdrawal: privacy@hanzo.ai

**Publication gate:** Do not present these Research Terms as effective until the consent ledger, training-data firewall, withdrawal pipeline, deletion lineage, and de-identification testing are live and counsel has approved the consent UI and copy. Until then, keep any research election disabled or clearly labeled as a preview. See the [implementation checklist](/legal) for the engineering gates.
