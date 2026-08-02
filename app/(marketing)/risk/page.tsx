import type { Metadata } from 'next'
import { robots } from '@/lib/publish'
import RiskClient from './risk-client'

/**
 * The copy on this page is unapproved, so the page is not published: `/risk` is
 * in `lib/publish`'s UNAPPROVED list, which keeps it out of sitemap.xml and puts
 * the `noindex` below on the page itself. It is deliberately NOT disallowed in
 * robots.txt — a crawler forbidden to fetch the page never reads the `noindex`,
 * and the `noindex` is the only one of the three controls that removes a page
 * somebody already linked to.
 *
 * The status is not asserted here — it is looked up. A page cannot approve
 * itself, and removing the route from that one list is the whole of the
 * approval.
 */
export const metadata: Metadata = {
  title: 'Hanzo Risk',
  description:
    'One risk plane for accounts, payments and agents. The compliance face is live; the decide plane is being built.',
  robots: robots('/risk'),
}

export default function RiskPage() {
  return <RiskClient />
}
