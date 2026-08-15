import { PLATFORMS, ALL_BUILDS } from './installs'
import { Row } from './Row'
import { SECTION, HOLD, HEAD, LEAD, MORE } from './style'

/**
 * The desktop app, every platform, once.
 *
 * This is the page's ONLY download moment. There were two: the fold, and a
 * closing banner that repeated the same three buttons plus four extension
 * pills — so a reader who scrolled the whole page arrived back at the action
 * they had already been offered, and the page ended by asking again rather than
 * by finishing.
 */
const Platforms = () => (
  <section id="platforms" className={SECTION}>
    <div className={HOLD}>
      <h2 className={HEAD}>Desktop</h2>
      <p className={LEAD}>Native on every platform, with the whole system as context.</p>

      <div className="mt-8">
        {PLATFORMS.map((p) => (
          <Row key={p.name} name={p.name} href={p.href} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a className={MORE} href={ALL_BUILDS} target="_blank" rel="noopener noreferrer">
          All builds and checksums →
        </a>
        <a className={MORE} href="/enterprise">
          Enterprise deployment →
        </a>
      </div>
    </div>
  </section>
)

export default Platforms
