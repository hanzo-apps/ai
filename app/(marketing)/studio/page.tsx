import type { Metadata } from 'next'
import StudioLanding from './StudioLanding'

export const metadata: Metadata = {
  title: 'Hanzo Studio — the visual AI engine for generative media',
  description:
    'Hanzo Studio is a visual AI engine for generative media. Wire models, prompts, and tools into a node graph and generate images, video, audio, and 3D — no code. Open source (GPL-3.0, built on ComfyUI); run it on your own GPU or use the managed studio on Hanzo Cloud.',
  openGraph: {
    title: 'Hanzo Studio — the visual AI engine for generative media',
    description:
      'Build generative-media pipelines on a node graph — image, video, audio, and 3D, no code. Self-host the open-source engine or run the managed studio on Hanzo Cloud.',
    url: 'https://studio.hanzo.ai',
    siteName: 'Hanzo Studio',
    type: 'website',
  },
}

export default function StudioPage() {
  return <StudioLanding />
}
