import { ArrowRight } from "lucide-react"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  ZapHero,
  ZapFeatures,
  ZapCodeExample,
  ZapArchitecture,
  ZapCTA,
} from "@/components/zap"

export const metadata = {
  title: "Hanzo ZAP — the Zero-copy Application Protocol",
  description:
    "A binary RPC protocol whose readers walk the wire format in place, with no parse step and no allocation. Wire-compatible implementations in Go, Rust and TypeScript. MCP, A2A and ACP ride on it unchanged.",
}

export default function ZapPage() {
  return (
    <>
      <ZapHero />
      <ZapFeatures />
      <ZapCodeExample />
      <ZapArchitecture />
      <ZapCTA />
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Read the protocol</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/zap" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="zap" name="ZAP" />
</div>
      </section>
    </>
  )
}
