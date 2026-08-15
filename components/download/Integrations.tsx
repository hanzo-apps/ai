import { SECTION, HOLD, HEAD, LEAD, ROW } from './style'

/**
 * The tools Hanzo reaches, as rows.
 *
 * Six bordered cards with an icon block each became six lines. Nothing here
 * needs a frame: it is a list of names and what each one is for, and a card per
 * name spent three times the height saying the same thing.
 */
const TOOLS = [
  { name: 'GitHub', line: 'Issues, reviews and releases' },
  { name: 'Notion', line: 'Notes and tasks, both ways' },
  { name: 'Google Calendar', line: 'Meetings, and what came out of them' },
  { name: 'Linear', line: 'File an issue from any context' },
  { name: 'Slack', line: 'Summarize a channel, post the result' },
  { name: 'MCP', line: 'Bring your own tools over Model Context Protocol' },
]

const Integrations = () => (
  <section className={SECTION}>
    <div className={HOLD}>
      <h2 className={HEAD}>Connect your own tools</h2>
      <p className={LEAD}>Your data stays where it lives; Hanzo reads it where it is.</p>

      <div className="mt-8 grid gap-x-10 sm:grid-cols-2">
        {TOOLS.map((t) => (
          // The line WRAPS rather than truncating — half of these read
          // "Meetings, and what came out of t…" at the width this grid actually
          // gets, which is a row that costs its own height and says nothing —
          // and it sits UNDER the name on a phone, where two columns leave both
          // of them about twelve characters wide.
          <div key={t.name} className={`${ROW} flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-4`}>
            <span className="shrink-0 text-sm text-white">{t.name}</span>
            <span className="text-sm text-neutral-500 sm:text-right">{t.line}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Integrations
