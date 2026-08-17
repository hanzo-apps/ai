
import React from 'react'
import { Gift } from 'lucide-react'
import { Box } from '@hanzo/ui'

const ReferralHeader = () => {
  return (
    <Box className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white/20 to-neutral-900/30 p-8 rounded-xl border border-border">
      <Box className="flex items-center gap-6">
        <Box className="h-16 w-16 rounded-full bg-primary/10 border border-white/30 flex items-center justify-center flex-shrink-0">
          <Gift className="h-8 w-8 text-foreground" />
        </Box>
        <Box className="text-center">
          <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
          {/* What the referrer earns. It used to promise the person they refer
              a credit on signup, and nothing grants one: account creation lands
              on a zero balance by design. A page cannot offer money the biller
              will not pay. */}
          <p className="text-lg text-foreground/80">
            Earn credit for every developer you refer
          </p>
        </Box>
      </Box>
    </Box>
  )
}

export default ReferralHeader
