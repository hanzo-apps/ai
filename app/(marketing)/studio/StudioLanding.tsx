'use client'

import {
  Workflow,
  Images,
  Cpu,
  Zap,
  FileJson,
  BrainCircuit,
  Sparkles,
  Puzzle,
  Server,
  Cloud,
  Rocket,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const STUDIO = 'https://studio.hanzo.ai'
const DOCS = 'https://docs.hanzo.ai/docs/services/studio'
const GITHUB = 'https://github.com/hanzoai/studio'

export default function StudioLanding() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Studio · Visual AI engine"
        badgeIcon={Workflow}
        title="Build AI pipelines on a canvas"
        lede="The visual AI engine for generative media. Wire models, prompts, and tools into a node graph, then generate images, video, audio, and 3D — no code. Prototype on your own machine and scale the same workflow onto cloud GPUs."
        ctas={[
          { label: 'Open Studio', href: STUDIO, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (GPL-3.0), built on ComfyUI. Run it on your own GPU, or use the managed studio on Hanzo Cloud.' }}
        what={{
          eyebrow: 'What is Hanzo Studio',
          title: 'A node graph for generative AI',
          sub: 'The steps you would otherwise script by hand — loading models, prompting, sampling, and post-processing — become nodes you wire together on a canvas and run live.',
          pillars: [
            {
              icon: Workflow,
              title: 'Visual node editor',
              body: 'Drag, drop, and connect nodes into a flowchart. Compose models, prompts, and tools into advanced pipelines on an infinite canvas — no code, no glue.',
            },
            {
              icon: Images,
              title: 'Every modality',
              body: 'One canvas for image, video, audio, and 3D — SDXL, Flux, Qwen Image, Wan, Hunyuan Video, Stable Audio, and Hunyuan3D, plus editing and upscaling.',
            },
            {
              icon: Cpu,
              title: 'Prototype to production',
              body: 'Run on your own GPU or CPU, fully offline, then route heavy prompts to distributed cloud workers that queue and scale automatically.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'From canvas to production',
          items: [
            { icon: Zap, title: 'Live iteration', body: 'Only the nodes you change re-run, with latent previews as images render — fast, tight feedback on every tweak.' },
            { icon: FileJson, title: 'Portable workflows', body: 'Save and load workflows as JSON, or drop in a generated PNG, WebP, or FLAC to restore the exact graph and seed that made it.' },
            { icon: BrainCircuit, title: 'Hanzo Engine nodes', body: 'First-class nodes call Hanzo Engine for chat, vision, image, speech, and transcription — mix language models and diffusion in one graph.' },
            { icon: Sparkles, title: 'Studio Copilot', body: 'A sidebar assistant that edits the graph in plain language — add nodes, connect them, set prompts, and queue a run.' },
            { icon: Puzzle, title: 'ComfyUI-compatible', body: 'Every custom node, model, and workflow from the ComfyUI ecosystem runs unmodified — pinned and reproducible.' },
            { icon: Server, title: 'Multi-tenant cloud', body: 'On studio.hanzo.ai, sign in with Hanzo IAM, bring your own GPU, and share a durable, per-org render queue with metered billing.' },
          ],
        }}
        finalCta={{
          icon: Workflow,
          title: 'Open the canvas',
          sub: 'Launch Hanzo Studio in your browser, or run the open-source engine on your own hardware.',
          buttons: [
            { label: 'Open Studio', href: STUDIO, icon: Rocket },
            { label: 'Read the docs', href: DOCS },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      />
      <ProductFooter slug="studio" name="Studio" />
    </>
  )
}
