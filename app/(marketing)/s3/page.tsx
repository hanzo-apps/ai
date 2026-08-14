'use client'

import { ArrowRight } from "lucide-react"
import { ProductFooter } from "@/components/products/ProductFooter"

export default function S3Page() {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <main>
        <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`, filter: "blur(100px)" }} />
          </div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-foreground">
              Hanzo S3
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Object storage that runs as one binary wearing four hats: a master that tracks where everything is, volume servers holding the bytes, a filer for the namespace, and the HTTP gateway your code talks to. Buckets and objects, presigned links, multipart uploads, versioning and object lock, with server-side encryption whose keys are minted by Hanzo KMS rather than read out of a config file. Objects are erasure-coded across ten data shards and four parity shards, so four can be lost and the object still reads. Every call between the pieces speaks one binary protocol — there is no gRPC anywhere in the tree — which leaves one transport to secure and one to debug. And you never pay to read your own data back.
            </p>
          </div>
        </section>

        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Point an SDK at it</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/docs/services/s3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/s3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        <ProductFooter slug="s3" name="S3" />
      </main>
    </div>
  )
}
