import type { Metadata } from 'next'
import RiskClient from './risk-client'

/**
 * The copy on this page is unapproved, so the page is not published: `/risk` is
 * in `lib/publish`'s UNAPPROVED list, which keeps it out of sitemap.xml and
 * puts a `noindex` on the page. It is deliberately NOT disallowed in robots.txt
 * — a crawler forbidden to fetch the page never reads the `noindex`, and the
 * `noindex` is the only one of the three controls that removes a page somebody
 * already linked to.
 *
 * Nothing about that is stated here, and that is the point. The status is not
 * this page's to assert, and the tag is not this page's to write: `lib/publish`
 * decides and `scripts/noindex.mjs` writes it into the export. A page that
 * carried its own tag would be a page that could forget it.
 */
export const metadata: Metadata = {
  title: 'Hanzo Risk',
  description:
    'One risk plane for accounts, payments and agents. The compliance face is live; the decide plane is being built.',
}

export default function RiskPage() {
  return <RiskClient />
}
