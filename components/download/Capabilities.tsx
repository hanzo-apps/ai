import { Mic, Command, Crop, TextCursorInput, Layers, Code } from 'lucide-react'
import { SECTION, HOLD, HEAD, LEAD } from './style'

/**
 * What the app can do, in six lines.
 *
 * This is five sections folded into one. Transcription, voice, screen capture,
 * text selection and customization each held a full-width row with a headline,
 * two bullets and a tall empty box labelled "Voice input preview" — four grey
 * rectangles down the page, each waiting on footage that does not exist. A claim
 * does not need a picture to be read, and an empty frame beside it says the
 * product is unfinished.
 */
const CAPABILITIES = [
  { icon: Mic, name: 'Transcription', line: 'Meetings and calls, captured and summarized on device.' },
  { icon: Command, name: 'Voice', line: 'Hold a key in any app and talk instead of typing.' },
  { icon: Crop, name: 'Screen', line: 'Capture any region of the screen and ask about it.' },
  { icon: TextCursorInput, name: 'Selection', line: 'Select text anywhere to summarize, translate or explain.' },
  { icon: Layers, name: 'Context', line: 'Answers grounded in the files and windows in front of you.' },
  { icon: Code, name: 'Code', line: 'Generate and edit code in place, wherever you are typing.' },
]

const Capabilities = () => (
  <section className={SECTION}>
    <div className={HOLD}>
      <h2 className={HEAD}>What it does</h2>
      <p className={LEAD}>System-wide, and private by default — the local work stays local.</p>

      <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
        {CAPABILITIES.map(({ icon: Icon, name, line }) => (
          <div key={name} className="flex gap-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
            <div>
              <div className="text-sm text-white">{name}</div>
              <p className="mt-1 text-sm leading-relaxed text-neutral-400">{line}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Capabilities
