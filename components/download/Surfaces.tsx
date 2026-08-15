import { SURFACES } from './installs'
import { Row } from './Row'
import { SECTION, HOLD, HEAD, LEAD } from './style'

/**
 * The other places Hanzo installs: the browser, and the editor.
 *
 * Two groups of plain rows. This was four tiles — VS Code, JetBrains, Browser,
 * Desktop — each carrying a checklist of every editor or browser in its family
 * behind a button with no href, so the section drew fourteen names, offered no
 * install, and went ragged because the four lists were four different lengths.
 * A row is one name and one action, and stays even at any count.
 */
const Surfaces = () => (
  <section className={SECTION}>
    <div className={HOLD}>
      <h2 className={HEAD}>Where Hanzo works</h2>
      <p className={LEAD}>The same assistant, in the window you already have open.</p>

      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        {SURFACES.map((group) => (
          <div key={group.label}>
            <div className="text-xs font-medium tracking-wide text-neutral-500">{group.label}</div>
            <div className="mt-2">
              {group.items.map((item) => (
                <Row key={item.name} name={item.name} href={item.href} verb="Install" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Surfaces
