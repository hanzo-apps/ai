'use client'

import { Faq } from '@/components/ui/faq'
import { SECTION, HOLD, HEAD } from './style'

/**
 * The questions someone actually stops to ask before installing.
 *
 * Six, down from seven, and the three that went were the ones the page already
 * answers: what platforms it runs on (the list above it), how to get started
 * (download, open) and what the VS Code extension does (the row that installs
 * it). A question whose answer is one screen up is a page arguing with itself.
 */
const QUESTIONS = [
  {
    question: 'Do I need a paid plan?',
    answer:
      'No. The desktop app is free to use, and a large part of the model catalog is callable at no cost. A Hanzo subscription raises the limits and unlocks the paid models; you can start without one and add it later from your account.',
  },
  {
    question: 'How is the desktop app different from the browser?',
    answer:
      'The browser extension works inside the page you are looking at. The desktop app works everywhere else — it can hear the meeting you are in, read the window you are pointing at, take a keystroke from any app, and put its answer back where you were typing.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Transcription and screen capture are processed on your device wherever the hardware allows, so the audio and the pixels do not leave it. What is sent to a model is sent under our data policy, and nothing is used to train anything.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'Partly. Capture, transcription and your local history keep working with no connection. Anything that needs a model needs the network, unless you are running a local model through Hanzo Dev.',
  },
  {
    question: 'Can I connect my own tools?',
    answer:
      'Yes — over Model Context Protocol. Anything that speaks MCP can be added, alongside the built-in connections to GitHub, Notion, Linear, Slack and Calendar.',
  },
  {
    question: 'Is there a Linux build?',
    answer:
      'Yes, for x86_64 and arm64, in the list above. Every build and its checksum is published on the releases page.',
  },
]

const FAQ = () => (
  <section className={SECTION}>
    <div className={HOLD}>
      <h2 className={HEAD}>Questions</h2>
      <div className="mt-8">
        <Faq items={QUESTIONS} />
      </div>
    </div>
  </section>
)

export default FAQ
