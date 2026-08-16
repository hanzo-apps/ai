'use client'

import React from 'react'
import { YStack, Text } from '@hanzo/gui'
import InvoicesList from '@/components/invoices/InvoicesList'
import InvoicesSummary from '@/components/invoices/InvoicesSummary'

export default function Invoices() {
  return (
    <YStack gap="$9">
      <Text render="h1" fontSize="$8" fontWeight="500" color="$foreground">
        Invoices
      </Text>
      <InvoicesSummary />
      <InvoicesList />
    </YStack>
  )
}
