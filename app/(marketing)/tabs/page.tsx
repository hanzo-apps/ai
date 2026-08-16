'use client'

import {
  ArrowUpRight,
  Github,
  Link2,
  Rows3,
  Smartphone,
  SquareTerminal,
  TerminalSquare,
  Unplug,
} from 'lucide-react'
import { YStack } from '@hanzo/gui'
import {
  CardGrid,
  Cta,
  Page,
  PageHero,
  Prose,
  Section,
  type CardItem,
} from '@/components/marketing/page-kit'

/**
 * Hanzo Tabs, on hanzo.ai.
 *
 * EVERY CLAIM ON THIS PAGE IS THE PRODUCT'S OWN. The headline, the lede and the
 * six facts below are `hanzoai/tabs` — its README and the marketing page it
 * serves at tabs.hanzo.ai — rather than copy written fresh for this site. Two
 * pages describing one product is how a product comes to be described two ways;
 * keeping the words identical is what makes the second page a route rather than
 * a second opinion.
 *
 * The mechanism section is the part worth having here at all. Tabs is unusual in
 * a way that reads as a gap if it is not explained — it has NO BACKEND, and a
 * reader who does not know that `hanzo link` publishes the terminal from the
 * machine will read "no server" as something missing rather than as the design.
 *
 * NO NUMBER HERE IS THIS SITE'S. The scrollback figure is the product page's
 * own. The README's "39 tests" is deliberately absent: the repo actually has 70,
 * so the README undercounts its own work, and a count that is wrong at the
 * source is not one to republish. Sub-90ms belongs to `hanzoai/runtime` and is
 * not a fact about Tabs.
 *
 * Fork-of-a-sandbox, which `hanzoai/runtime` marks "Coming soon", appears
 * nowhere on this page.
 */
const MECHANISM: CardItem[] = [
  {
    icon: Unplug,
    title: 'There is no backend',
    description:
      'Not a small one — none. Running hanzo link on a machine publishes a terminal over a zero-trust tunnel, already authenticated and already gated, and the browser frames it directly. A server here would be a third party to a conversation that has two.',
  },
  {
    icon: Link2,
    title: 'A shell is a URL',
    description:
      'One link serves as many independent tmux sessions as you ask for, so a build runs in one pane while you work in another. There is no spawn endpoint because none is needed — asking for a name attaches to that session or creates it.',
  },
  {
    icon: Rows3,
    title: 'The layout is a tree',
    description:
      'A list of rectangles is the shape that looks easier and then cannot answer the only question that matters: close a pane, and who gets the space? With a tree the space belongs to the sibling, so closing replaces the split with that sibling and nothing else moves.',
  },
]

const FACTS: CardItem[] = [
  {
    icon: SquareTerminal,
    title: 'Your terminal, not a viewer',
    description:
      'A real xterm.js terminal with 10k lines of scrollback, true colour and a cursor that blinks. Type in it, page through it, resize it.',
  },
  {
    icon: TerminalSquare,
    title: 'Closing a pane loses nothing',
    description:
      'Every shell is a tmux session that keeps running when the browser goes away. Reopen it by name and the scrollback is exactly where you left it.',
  },
  {
    icon: Smartphone,
    title: 'Works on a phone',
    description:
      'A phone pages; it does not tile. Splits become swipeable pages instead of unreadable slivers, and a key row gives you Esc, Ctrl, Tab and arrows — the keys a soft keyboard does not have.',
  },
  {
    icon: Github,
    title: 'Open source, MIT',
    description:
      'The layout engine, the terminal client and the site. Fork it, host it, or run it against your own machines.',
  },
]

export default function TabsPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Hanzo Tabs"
        icon={TerminalSquare}
        title="Keep tabs on your agents."
        lede="Your coding agents work in shells on real machines. Tabs puts every one of those shells in front of you — split, tiled, and reachable from anywhere you can open a browser."
      >
        <Cta href="https://tabs.hanzo.ai" icon={ArrowUpRight}>
          Open Tabs
        </Cta>
      </PageHero>

      <Section title="Link a machine, and it appears here">
        <Prose>
          <p>
            Run <strong>hanzo link</strong> on a laptop, a workstation, a GPU box — anything with a
            shell. The machine keeps the connection, and nothing is exposed to the network it sits
            on. Open Tabs and the shells are there.
          </p>
        </Prose>
      </Section>

      <Section title="Why it is shaped this way">
        <CardGrid items={MECHANISM} columns={1} />
      </Section>

      <Section title="What you get">
        <CardGrid items={FACTS} columns={2} />
        <YStack marginTop="$5">
          <Cta href="https://github.com/hanzoai/tabs" icon={Github}>
            Read the source
          </Cta>
        </YStack>
      </Section>
    </Page>
  )
}
