
import React from 'react'
import { Box } from '@hanzo/ui'

const HowItWorks = () => {
  return (
    <Box className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-6">
      <h2 className="text-xl font-medium mb-4">How It Works</h2>

      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Box className="p-4 bg-neutral-900/50 rounded-lg">
          <Box className="flex items-center mb-3">
            <Box className="h-8 w-8 rounded-full bg-primary/10 text-foreground flex items-center justify-center mr-3">
              1
            </Box>
            <h3 className="font-medium">Share Your Link</h3>
          </Box>
          <p className="text-sm text-muted-foreground">
            Share your unique referral link with friends and colleagues
          </p>
        </Box>

        <Box className="p-4 bg-neutral-900/50 rounded-lg">
          <Box className="flex items-center mb-3">
            <Box className="h-8 w-8 rounded-full bg-primary/10 text-foreground flex items-center justify-center mr-3">
              2
            </Box>
            <h3 className="font-medium">They Get Started</h3>
          </Box>
          {/* No credit is granted at signup — a new account starts at zero, on
              purpose. What the code actually buys them is the free tier. */}
          <p className="text-sm text-muted-foreground">
            They create a free account and start on the free models right away
          </p>
        </Box>

        <Box className="p-4 bg-neutral-900/50 rounded-lg">
          <Box className="flex items-center mb-3">
            <Box className="h-8 w-8 rounded-full bg-primary/10 text-foreground flex items-center justify-center mr-3">
              3
            </Box>
            <h3 className="font-medium">It Qualifies</h3>
          </Box>
          {/* Qualification is metered spend, not a paid plan, and it pays no
              credit. This promised $5 while /pricing promised $20; nothing
              grants either. What is owed is an affiliate commission. */}
          <p className="text-sm text-muted-foreground">
            A referral qualifies once they actually spend. Commission for qualified referrals is settled through the affiliate program
          </p>
        </Box>
      </Box>
    </Box>
  )
}

export default HowItWorks
