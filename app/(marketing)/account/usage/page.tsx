'use client'

import React, { useState } from 'react'
import { XStack, YStack, Text } from '@hanzo/gui'
import UsageOverview from '@/components/usage/UsageOverview'
import ProjectUsage from '@/components/usage/ProjectUsage'
import ResourceBreakdown from '@/components/usage/ResourceBreakdown'
import DateRangePicker from '@/components/usage/DateRangePicker'

export default function Usage() {
  const [dateRange, setDateRange] = useState({ start: 'Mar 7', end: 'Mar 8' })

  return (
    <YStack gap="$9">
      <XStack alignItems="center" justifyContent="space-between" gap="$4" flexWrap="wrap">
        <Text render="h1" fontSize="$8" fontWeight="500" color="$foreground">
          Usage
        </Text>
        <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
      </XStack>

      <UsageOverview
        dateRange={dateRange}
        currentUsage="$0.04"
        discounts="$0.00"
        creditsUsed="$0.00"
        estimatedCost="$0.07"
        creditsAvailable="5.00"
        creditsRequired="0.00"
      />

      <YStack gap="$5">
        <Text render="h2" fontSize="$6" fontWeight="500" color="$foreground">
          Usage by project
        </Text>
        <ProjectUsage />
      </YStack>

      <YStack gap="$5">
        <Text render="h2" fontSize="$6" fontWeight="500" color="$foreground">
          Resource breakdown
        </Text>
        <ResourceBreakdown />
      </YStack>
    </YStack>
  )
}
