import type { Metadata } from 'next'
import DevLanding from '@/components/dev/DevLanding'

export const metadata: Metadata = {
  title: 'Hanzo Dev — a coding agent in your terminal',
  description:
    'Hanzo Dev works on the files you already have, in the repo you are already in. Tell it what you want and it writes the code and runs it. Commands run in a sandbox. Open source, Apache-2.0.',
  openGraph: {
    title: 'Hanzo Dev — a coding agent in your terminal',
    description:
      'Tell it what you want. It opens the files, makes the change, runs the tests, and shows you the diff. Commands run in a sandbox.',
    url: 'https://hanzo.sh',
    siteName: 'Hanzo Dev',
    type: 'website',
  },
}

export default function DevPage() {
  return <DevLanding />
}
