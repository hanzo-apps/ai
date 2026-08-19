
import React from 'react';
import { Mail, User, Clock } from 'lucide-react';
import { ReferralStats } from './types';
import { Box } from '@hanzo/ui'

interface ReferralStatsProps {
  referralStats: ReferralStats;
}

// There is no earnings tile, because this surface reports no earnings. A
// referral row carries a referee and a status and no amount at all, so the
// dollar figure here could only ever render $0 under a label promising more.
const ReferralStatsComponent = ({ referralStats }: ReferralStatsProps) => {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Box className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-6">
        <Box className="flex items-center gap-4">
          <Box className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center">
            <Mail className="h-6 w-6 text-muted-foreground" />
          </Box>
          <div>
            <Box className="text-sm text-muted-foreground">Total Invited</Box>
            <Box className="text-2xl font-bold">{referralStats.totalInvited}</Box>
          </div>
        </Box>
      </Box>
      
      <Box className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-6">
        <Box className="flex items-center gap-4">
          <Box className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center">
            <User className="h-6 w-6 text-muted-foreground" />
          </Box>
          <div>
            <Box className="text-sm text-muted-foreground">Signed Up</Box>
            <Box className="text-2xl font-bold">{referralStats.signedUp}</Box>
          </div>
        </Box>
      </Box>
      
      <Box className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-6">
        <Box className="flex items-center gap-4">
          <Box className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center">
            <Clock className="h-6 w-6 text-muted-foreground" />
          </Box>
          <div>
            <Box className="text-sm text-muted-foreground">Pending</Box>
            <Box className="text-2xl font-bold">{referralStats.pending}</Box>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default ReferralStatsComponent;
