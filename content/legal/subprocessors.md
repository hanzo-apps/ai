---
title: Subprocessor Register
slug: subprocessors
kind: register
status: draft
version: "2026-07-22"
updated: "2026-07-22"
summary: The providers Hanzo engages to process data on behalf of customers — infrastructure, inference gateways, and the model providers reached through them — with data categories, regions, transfer mechanism, and training posture.
order: 8
---

This Register lists the subprocessors Hanzo AI, Inc. engages to process Customer Personal Data in providing the Services, as required by the [Data Processing Addendum](/legal/dpa) and referenced by the [Privacy Policy](/legal/privacy). It is maintained as a living document; material additions are notified as described in DPA Section 6.

> **Draft status.** The rows below are a template populated from Hanzo's current architecture. Each entry's legal entity, processing region, transfer mechanism, retention mode, and training posture must be confirmed against the executed provider DPA before this Register is published as effective. Placeholders marked `[confirm]` are not yet verified commitments.

## How Enso routing affects subprocessors

Enso may send a single request — or, in quality modes, transformed copies of it — to one or more approved model providers. **Every model provider eligible under your plan or configuration is a subprocessor**, including providers reached indirectly through an inference gateway. Organization administrators may restrict eligible providers, regions, and retention modes; Hanzo does not silently route Customer Content through an unlisted provider. Where a gateway (e.g., OpenRouter) sits between Hanzo and a model provider, Hanzo requires the gateway to bind downstream providers to substantially equivalent obligations, and the downstream providers are listed below as sub-subprocessors.

## Infrastructure and platform subprocessors

| Subprocessor | Service | Data categories | Region(s) | Transfer mechanism | Training on Customer Content | Effective |
|---|---|---|---|---|---|---|
| DigitalOcean, LLC | Cloud compute, managed databases, object storage, networking | Account, Customer Content at rest/in transit, logs, telemetry | US `[confirm]` | SCCs / DPF `[confirm]` | No | `[confirm]` |
| `[Object storage / CDN provider]` | Static asset and artifact delivery | Public assets, artifact blobs | `[confirm]` | `[confirm]` | No | `[confirm]` |
| `[Email / transactional messaging]` | Service and security notices | Contact data, message metadata | `[confirm]` | `[confirm]` | No | `[confirm]` |
| `[Payment processor]` | Billing and card processing | Billing and transaction data (card data held by processor, not Hanzo) | `[confirm]` | `[confirm]` | No | `[confirm]` |
| `[Error / observability provider]` | Crash, error, and performance monitoring | Telemetry, redacted logs (raw content excluded by default) | `[confirm]` | `[confirm]` | No | `[confirm]` |

## Inference gateway subprocessors

| Subprocessor | Service | Data categories | Region(s) | Transfer mechanism | Training on Customer Content | Effective |
|---|---|---|---|---|---|---|
| OpenRouter, Inc. | Inference gateway routing to third-party model providers | Prompt/Input content, generated Output, routing and usage metadata | US `[confirm]` | SCCs `[confirm]` | No `[confirm — verify ZDR / no-train mode]` | `[confirm]` |

## Model provider sub-subprocessors (reached via gateway or directly)

Eligibility depends on your plan and configuration. A provider processes Customer Content only when a request is routed to it. Each must be confirmed under a no-training / zero-data-retention posture before the row is effective.

| Sub-subprocessor | Reached via | Data categories | Training on Customer Content | Effective |
|---|---|---|---|---|
| `[Model provider A]` | OpenRouter / direct | Input, Output, request metadata | No `[confirm ZDR]` | `[confirm]` |
| `[Model provider B]` | OpenRouter / direct | Input, Output, request metadata | No `[confirm ZDR]` | `[confirm]` |
| `[Additional eligible providers]` | OpenRouter / direct | Input, Output, request metadata | No `[confirm ZDR]` | `[confirm]` |

## Hanzo-operated processing

Inference served on Hanzo's own infrastructure (hosted open-source and Hanzo models via hanzo-engine) is processed by Hanzo as processor under the DPA, not by a third-party subprocessor. Enso routing, the benchmark registry, and the `/v1/research` plane are Hanzo-operated.

## Change notices

To receive advance notice of new subprocessors, subscribe at `[SUBPROCESSOR CHANGE-NOTICE MECHANISM — REQUIRED BEFORE PUBLICATION]`. Customers may object to a new subprocessor on documented data-protection grounds as described in the [DPA](/legal/dpa).

**Publication gate:** Populate every `[confirm]` from executed DPAs, verify each provider's zero-data-retention / no-training mode and transfer mechanism, stand up the change-notice subscription, and obtain counsel review before this Register is published as effective.
