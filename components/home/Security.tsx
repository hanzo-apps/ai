'use client'

import { ArrowRight } from 'lucide-react'
import { YStack, Text } from '@hanzo/gui'
import { Cta, Section } from '@/components/marketing/page-kit'

/**
 * Security, on the front page.
 *
 * An agentic company runs work that no person watched start. The governing
 * question is not "is the platform secure" but "whose authority did that action
 * run under" — so this leads with identity and ends with the record.
 *
 * IT STOPS AT THE PROPERTY AND HANDS OFF. Eight mechanism cards used to stand
 * here, spelling PKCE and S256, the verifier allowlist, HKDF-SHA256 and
 * AES-256-GCM key derivation, per-org database files, the gVisor default and the
 * capability drop, header stripping at the edge, and the reserved audit rows.
 * All of it is true and none of it is a landing page: a general buyer reading
 * cipher suites is reading a different genre than the sentence before it. The
 * mechanisms live on /security and /trust, in those pages' words, and /trust is
 * held to what it says by `e2e/gates/trust-copy.spec.ts` against the rendered
 * DOM.
 *
 * WHERE THEY WERE READ, so a future editor can find the source rather than
 * re-derive it: key derivation and envelope sealing in luxfi/kms
 * `pkg/store/crypto.go` (which is where hanzoai/kms's server logic lives);
 * isolation defaults, the refusal to substitute a weaker runtime, the org
 * allowlist on plain runc and the capability drop in hanzoai/runtime
 * `apps/runner/pkg/docker/isolation.go` and `container_configs.go`.
 *
 * THREE THINGS THE SOURCE REFUSES, and this page therefore does not say:
 * isolation is per SANDBOX and not per run (a sandbox is long-lived and many
 * executions share one, whatever `runtime/LLM.md` says); there is no egress
 * policy at all — `getContainerNetworkingConfig` returns nil when unconfigured,
 * which is the Docker bridge and full outbound, so never claim network
 * isolation; and no latency number, because "sub-90ms" is runtime's README with
 * no committed benchmark behind it.
 *
 * NO FRAMEWORK IS NAMED, deliberately. `ci/bin/certclaims` fails any line naming
 * one beside a certificate word or a hedge, and the failure it exists to catch
 * is real: four framework names once rendered on /security with green checkmarks
 * while the qualifiers that made them honest sat in a field the markup never
 * printed. That question has exactly one home, /trust — linked from the site
 * nav, not restated here. Two pages answering it is how the qualifier got lost
 * the first time.
 */
export default function Security() {
  return (
    <Section
      title="Autonomous within boundaries. Accountable everywhere."
      lede="Every person, agent and workload has an identity."
    >
      <YStack gap="$4" maxWidth={672}>
        <Text render="p" fontSize="$3" color="$mutedForeground">
          Every tool has a permission. Every secret has a policy. Every execution has a boundary.
          Every consequential action can require approval. Every change leaves an audit record.
        </Text>
        <Text render="p" fontSize="$3" color="$mutedForeground">
          Identity, authorization, secrets, isolation, networking and audit are built
          into Hanzo OS.
        </Text>
        <Cta href="/security" icon={ArrowRight}>
          Read the security architecture
        </Cta>
      </YStack>
    </Section>
  )
}
