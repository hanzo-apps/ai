---
title: Data Processing Addendum
slug: dpa
kind: agreement
status: draft
version: "2026-07-22"
updated: "2026-07-22"
summary: Processor terms, SCCs, subprocessor governance, and security measures for business customers whose data Hanzo processes on their behalf.
order: 4
---

This Data Processing Addendum (“DPA”) forms part of the agreement between Hanzo AI, Inc. (“Hanzo”) and the customer accepting or signing it (“Customer”) for Services through which Hanzo processes Personal Data on Customer’s behalf.

## 1. Definitions

“Applicable Data Protection Law” means privacy and data-protection law applicable to the processing, including the GDPR, UK GDPR, Swiss data-protection law, and applicable U.S. state comprehensive privacy laws.

“Customer Personal Data” means Personal Data contained in Customer Content and processed by Hanzo on Customer’s behalf.

“Controller,” “Processor,” “Data Subject,” “Personal Data,” “Process,” and “Supervisory Authority” have the meanings in Applicable Data Protection Law. “Subprocessor” means a processor engaged by Hanzo to process Customer Personal Data.

## 2. Roles and instructions

Customer is the Controller or Processor of Customer Personal Data, and Hanzo is its Processor or Subprocessor. Customer instructs Hanzo to process Customer Personal Data to provide, secure, support, and improve the contracted Services in a manner that does not use Customer Content for generalized model training; comply with documented Customer configurations and requests; prevent fraud and abuse; and comply with law.

Hanzo will process Customer Personal Data only on documented instructions unless law requires otherwise. If law permits, Hanzo will notify Customer before legally required processing. Hanzo will promptly inform Customer if, in Hanzo’s opinion, an instruction violates Applicable Data Protection Law.

**No generalized training by default.** Hanzo will not use Customer Personal Data to train, fine-tune, reinforce, distill, or evaluate generalized Hanzo models, routers, selectors, or public datasets unless Customer gives a separate documented instruction through an authorized administrator or written agreement. Operational telemetry that excludes Customer Content may be used to operate and improve the Services.

## 3. Customer obligations

Customer will:

- provide lawful instructions and an appropriate legal basis;
- give required notices and honor Data Subject rights;
- configure provider, retention, region, and access controls appropriate to its use;
- avoid unsupported regulated data unless covered by a specialized agreement;
- ensure users and integrations have appropriate permissions; and
- determine whether its use requires a DPIA, risk assessment, consultation, or high-risk AI compliance.

## 4. Confidentiality and personnel

Hanzo will ensure that personnel authorized to process Customer Personal Data are bound by confidentiality obligations, receive relevant privacy and security training, and access data only as necessary for assigned duties.

## 5. Security

Hanzo will maintain appropriate technical and organizational measures proportionate to the risk, including the measures in Annex II. Hanzo may update measures without materially reducing overall protection.

## 6. Subprocessors

Customer generally authorizes Hanzo to use the subprocessors listed at `/legal/subprocessors`. Hanzo will impose data-protection obligations substantially equivalent to those applicable to Hanzo and remains responsible for Subprocessor performance to the extent required by law.

Hanzo will provide at least 15 days’ advance notice of a new Subprocessor that may process Customer Personal Data, except where an urgent security or availability need makes advance notice impracticable. Customer may reasonably object on documented data-protection grounds. The parties will work in good faith on an alternative; if none is commercially reasonable, Customer may terminate the affected Service without penalty.

For routed inference, model providers eligible under Customer’s plan or configuration are Subprocessors. Hanzo will not silently route Customer Content through an unlisted provider.

## 7. Data Subject requests

Taking into account the nature of processing, Hanzo will provide reasonable assistance for Customer to respond to access, correction, deletion, restriction, portability, objection, opt-out, and other valid requests. If Hanzo receives a request relating to Customer Personal Data, it will direct the requester to Customer unless legally prohibited or Customer has authorized Hanzo to respond.

## 8. Security incidents

Hanzo will notify Customer without undue delay after confirming a breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to Customer Personal Data (“Personal Data Breach”). The notice will include available information reasonably required for Customer’s legal obligations, and Hanzo will provide updates as the investigation progresses.

Notification is not an admission of fault. Unsuccessful attempts, scans, blocked attacks, and incidents that do not compromise Customer Personal Data are not Personal Data Breaches under this DPA.

## 9. Assistance and compliance information

Hanzo will reasonably assist Customer with security, breach notifications, DPIAs, regulatory consultations, and information needed to demonstrate compliance, considering the nature of processing and information available to Hanzo.

Once annually, Customer may request Hanzo’s then-current independent audit reports, certifications, security documentation, and responses to a reasonable questionnaire. If these are insufficient for a legally required audit, the parties may arrange a narrowly scoped audit under confidentiality, during normal business hours, without access to other customers’ data, and at Customer’s expense unless the audit identifies a material Hanzo breach.

## 10. Return and deletion

Upon termination or Customer’s valid instruction, Hanzo will return or delete Customer Personal Data within the applicable product and backup cycle, unless law requires retention. During backup aging, data will remain protected and unavailable for ordinary use. Hanzo may retain records necessary for billing, security, legal claims, and proof of deletion as permitted by law.

Research Data validly contributed under a separate election is governed by the Research Terms for that contributed copy. Revoking service access does not automatically revoke a separate research election, but Customer may withdraw it as provided there.

## 11. International transfers

Where Customer Personal Data subject to the EEA GDPR is transferred to Hanzo in a country without an applicable adequacy decision, the European Commission Standard Contractual Clauses adopted by Decision 2021/914 are incorporated:

- Module Two applies when Customer is a Controller and Hanzo is a Processor.
- Module Three applies when Customer is a Processor and Hanzo is a Subprocessor.
- Clause 7 docking is included.
- Option 2 general authorization applies under Clause 9, with the notice period in Section 6.
- The optional language in Clause 11 is not included.
- The governing law and courts are those of Ireland unless the Customer’s EEA establishment requires another eligible Member State.

For UK restricted transfers, the UK International Data Transfer Addendum to the EU SCCs is incorporated. For Switzerland, references are adapted to the Swiss Federal Act on Data Protection as required.

Hanzo will make available information reasonably necessary for a transfer-impact assessment and maintain appropriate supplementary measures. Hanzo will rely on the EU–U.S. Data Privacy Framework only while actively certified for the relevant data.

## 12. U.S. state service-provider terms

For Customer Personal Data governed by the CCPA, Hanzo is a service provider or contractor. Hanzo will not sell or share Customer Personal Data; retain, use, or disclose it outside the business purposes specified in the agreement; or combine it with personal information received from another person except as legally permitted. Hanzo certifies that it understands and will comply with these restrictions. Customer may take reasonable steps to verify and require remediation of unauthorized use.

Hanzo will provide comparable processor commitments required by other applicable U.S. state laws, including duties of confidentiality, security, deletion or return, audit support, and flow-down to subprocessors.

## 13. Specialized data

This DPA is not a Business Associate Agreement. Customer may not submit PHI subject to HIPAA unless Hanzo has signed a BAA covering the applicable Services. Separate written terms are also required for student records, payment-card storage, government classified or controlled data, criminal-justice information, and biometric identification.

## 14. Conflict and liability

If this DPA conflicts with the main agreement on Personal Data processing, this DPA controls. Liability under this DPA is subject to the liability provisions of the main agreement unless prohibited by Applicable Data Protection Law.

## Annex I — Processing details

**Subject matter:** AI inference, routing, hosting, agents, tools, storage, benchmarks, `/v1/research` run ingestion and registry, support, security, and related contracted Services.

**Duration:** the service term plus the deletion and backup period.

**Nature and purpose:** receiving Inputs; routing to approved models and providers; generating Outputs; executing Customer-directed tools and Actions; storing content when enabled; ingesting, normalizing, deduplicating, versioning, and displaying authorized Research Run Records; metering; securing; supporting; and deleting or returning data.

**Data Subjects:** Customer users, personnel, customers, contractors, end users, and other people whose data Customer submits.

**Data categories:** identifiers, contact and account data, device and log data, Customer Content, communications, professional information, and other categories Customer chooses to submit. Sensitive data is supported only where expressly agreed.

**Frequency:** continuous or as initiated by Customer.

**Retention:** as configured by Customer, stated in the order form, or listed in the Privacy Policy; API default proposed at no more than 30 days for raw request/response content unless otherwise configured.

## Annex II — Technical and organizational measures

- documented security and privacy governance;
- role-based least-privilege access and periodic access review;
- multi-factor authentication for privileged access;
- encryption in transit and at rest where appropriate;
- managed secrets and key rotation;
- logical tenant separation;
- logging, monitoring, alerting, and incident response;
- vulnerability scanning, patching, dependency review, and penetration testing proportionate to risk;
- secure development, change control, code review, and production access controls;
- backup, recovery, availability, and tested restoration procedures;
- subprocessor diligence and contractual flow-down;
- personnel confidentiality and training;
- data minimization, configurable retention, deletion jobs, and backup aging;
- provenance and consent controls preventing unauthorized research ingestion;
- provider allowlists and routing-policy enforcement for Customer restrictions; and
- periodic risk assessment and review of control effectiveness.

## Annex III — Subprocessors

The production DPA must link to a populated Subprocessor Register listing, for each provider: legal entity, service, data categories, processing purpose, countries or regions, transfer mechanism, retention/training posture, and effective date.
