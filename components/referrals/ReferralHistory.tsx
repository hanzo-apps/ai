'use client'

import React from 'react'
import { YStack, Text } from '@hanzo/gui'
import { DataTable, StatusTag } from '@hanzo/ui/product'
import type { ReferralRecord } from '@/components/referrals/types'

interface ReferralHistoryProps {
  referralHistory: ReferralRecord[]
}

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'date', header: 'Date' },
  {
    key: 'status',
    header: 'Status',
    render: (r: ReferralRecord) => <StatusTag status={r.status} />,
  },
]

const ReferralHistory = ({ referralHistory }: ReferralHistoryProps) => (
  <YStack
    gap="$4"
    padding="$5"
    borderWidth={1}
    borderColor="$border"
    borderRadius="$5"
    backgroundColor="$card"
  >
    <Text fontSize="$7" fontWeight="500" color="$foreground">
      Referral History
    </Text>
    <DataTable
      columns={columns}
      rows={referralHistory}
      rowKey={(r) => String(r.id)}
      empty="No referrals yet."
    />
  </YStack>
)

export default ReferralHistory
