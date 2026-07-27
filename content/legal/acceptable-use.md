---
title: Acceptable Use Policy
slug: acceptable-use
kind: policy
status: draft
version: "2026-07-22"
updated: "2026-07-22"
summary: The conduct rules for all Hanzo Services — what you may not do, high-risk-use guardrails, and enforcement — incorporated into the Terms of Service.
incorporates: []
order: 3
---

This Acceptable Use Policy (the "Policy") governs your use of the Hanzo Services and is incorporated into the [Terms of Service](/legal/terms). Capitalized terms not defined here have the meaning given in the Terms. This Policy applies to every user, organization, application, agent, and API integration that reaches the Services, including any model, provider, tool, or workflow reached through Enso.

We may update this Policy as products, threats, and law evolve. Where a change materially expands your obligations, we will give reasonable notice as described in the Terms.

## 1. Principle

Use the Services lawfully, safely, and in a way that does not harm others, the Services, or their reputation. The prohibitions below are illustrative, not exhaustive; conduct that is plainly abusive, deceptive, or dangerous is prohibited even if not listed. Where a use is high-risk rather than prohibited, Section 4 states the conditions that apply.

## 2. Prohibited uses

You may not use the Services to:

### 2.1 Break the law or violate rights

- Violate any applicable law, regulation, sanctions, or export control, or facilitate another's violation.
- Infringe or misappropriate intellectual property, trade secrets, publicity, privacy, or contractual rights.
- Process personal data without a lawful basis, required notice, or consent, or in breach of a data-processing agreement.

### 2.2 Endanger people

- Create, obtain, or refine instructions that materially increase the ability to cause mass casualties, including chemical, biological, radiological, or nuclear weapons, or high-yield explosives.
- Provide operational guidance for attacks on critical infrastructure or for evading law-enforcement detection of violent crime.
- Promote self-harm or suicide, or generate content intended to bully, harass, threaten, or intimidate a specific person.
- Sexualize minors in any way, or generate, solicit, or distribute child sexual abuse material. We report apparent CSAM to the National Center for Missing & Exploited Children as required by law.

### 2.3 Deceive and manipulate

- Impersonate a person or organization, or misrepresent AI-generated content as human-authored where that misrepresentation causes harm or is unlawful.
- Generate synthetic audio, video, images, or text ("deepfakes") of a real person without the permission the law requires, or use them to defraud, defame, or interfere with elections.
- Run disinformation, coordinated inauthentic behavior, spam, phishing, scams, or fraudulent schemes.
- Remove, obscure, or defeat provenance, watermarking, or AI-disclosure signals that the Services attach or that law requires you to preserve.

### 2.4 Attack systems

- Probe, scan, or breach the security or integrity of any system or network without authorization.
- Distribute malware, ransomware, or other malicious code, or develop them other than for legitimate, authorized security research.
- Circumvent rate limits, access controls, usage metering, region or provider restrictions, or model safety mitigations, including prompt-injection or jailbreak techniques used to elicit prohibited outputs.
- Use automated means to scrape, resell, or redistribute the Services or their outputs in violation of the Terms.

### 2.5 Abuse the model and routing layer

- Extract, reconstruct, or reverse-engineer model weights, system prompts, routing policies, or the Enso selector, except to the limited extent an applicable open-source license or mandatory law permits.
- Use Outputs to train, fine-tune, or distill a competing model or router, except as an applicable license expressly permits.
- Manipulate a model, endpoint, or benchmark specifically because an evaluation is occurring, or submit results as Hanzo-executed when they are not (see the [Research API Supplemental Terms](/legal/research-api)).

## 3. Agents, tools, and connectors

Agents and connectors can take consequential Actions in your systems and others'. When you enable them you must use least privilege, keep credentials scoped and current, maintain backups, and supervise high-impact Actions. You are responsible for every Action an agent takes under your authorization as if you took it yourself. Do not deploy an agent to act against a third-party system without that system's authorization.

## 4. High-risk uses requiring safeguards

Some uses are permitted only with additional safeguards and, where stated, a separate written agreement. If you use the Services to materially influence decisions in these domains, you must keep a qualified human in the loop, disclose AI involvement where law requires, test for bias and error, and provide notice, appeal, and record-keeping as applicable law requires:

- employment, housing, credit, insurance, education, or essential government benefits;
- healthcare, medical devices, or clinical decision support;
- legal, financial, or other regulated professional advice;
- safety-critical control of physical systems; and
- law-enforcement, biometric identification, or surveillance uses.

Fully automated decisions that produce legal or similarly significant effects on a person require the separate written agreement described in the Terms. High-risk deployment that lacks these safeguards is a breach of this Policy.

## 5. Content, provenance, and disclosure

Where you distribute AI-generated or AI-modified media, disclose it as the law requires and preserve any machine-readable provenance the Services provide. You are responsible for reviewing Outputs before you rely on or publish them; AI systems can produce inaccurate, biased, or infringing content.

## 6. Reporting and enforcement

Report abuse, security issues, or policy violations to **abuse@hanzo.ai** (or **security@hanzo.ai** for vulnerabilities). We investigate credible reports.

We may remove content, throttle, suspend, or terminate access, and preserve or disclose records to the extent the Terms and applicable law permit, when we reasonably determine this Policy is violated or to prevent imminent harm, legal exposure, or risk to the Services. Where practicable we give notice and an opportunity to appeal; we may act immediately when delay would cause material harm. Enforcement decisions are described further in the [Terms of Service](/legal/terms).

## 7. Contact

- Abuse reports: abuse@hanzo.ai
- Security reports: security@hanzo.ai
- Legal notices: legal@hanzo.ai

**Publication gate:** Confirm the abuse and security mailboxes are monitored, align the prohibited-use list with the final model-provider and dataset-license obligations, and obtain counsel review before this Policy becomes effective.
