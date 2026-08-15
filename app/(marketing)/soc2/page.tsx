'use client'
import Redirect from '@/app/(marketing)/_redirect'
// People type this. It forwards to /trust, which opens by saying we hold no SOC 2
// report — so the question the URL asks is answered by the page it lands on. A
// short page of its own would be a second copy of that position, and two copies
// of a claim this load-bearing is one drift away from a lie.
export default function Page() { return <Redirect to="/trust" /> }
