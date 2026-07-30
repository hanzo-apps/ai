'use client'

import React, { useState } from 'react'
import { XStack, YStack, Text, Button } from '@hanzo/gui'
import { Calendar, Download, Filter } from '@hanzogui/lucide-icons-2'
import { DataTable, StatusTag } from '@hanzo/ui/product'

interface Invoice {
  id: string
  date: string
  dueDate: string
  amount: string
  status: 'Paid' | 'Due' | 'Overdue' | 'Processing'
}

// Mock data for invoices
const invoices: Invoice[] = [
  { id: 'INV-20230301', date: 'Mar 1, 2023', dueDate: 'Mar 15, 2023', amount: '$20.00', status: 'Paid' },
  { id: 'INV-20230401', date: 'Apr 1, 2023', dueDate: 'Apr 15, 2023', amount: '$20.00', status: 'Paid' },
  { id: 'INV-20230501', date: 'May 1, 2023', dueDate: 'May 15, 2023', amount: '$25.00', status: 'Paid' },
]

const columns = [
  { key: 'id', header: 'Invoice', mono: true },
  { key: 'date', header: 'Date' },
  { key: 'dueDate', header: 'Due Date' },
  { key: 'amount', header: 'Amount', align: 'right' as const, mono: true },
  { key: 'status', header: 'Status', render: (r: Invoice) => <StatusTag status={r.status} /> },
  {
    key: 'actions',
    header: 'Actions',
    align: 'right' as const,
    render: () => (
      <Button size="$2" chromeless icon={<Download size={16} />} minHeight={44}>
        Download
      </Button>
    ),
  },
]

const InvoicesList = () => {
  const [filter] = useState('all')
  const rows = invoices.filter((i) => filter === 'all' || i.status.toLowerCase() === filter)

  return (
    <YStack
      borderWidth={1}
      borderColor="$border"
      borderRadius="$4"
      backgroundColor="$card"
      overflow="hidden"
    >
      <XStack
        padding="$6"
        borderBottomWidth={1}
        borderColor="$border"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap="$4"
      >
        <XStack alignItems="center" gap="$3">
          <Calendar size={20} color="var(--muted-foreground)" />
          <YStack gap="$1">
            <Text fontSize="$7" fontWeight="500" color="$foreground">
              Invoice History
            </Text>
            <Text fontSize="$3" color="$mutedForeground">
              View and download past invoices
            </Text>
          </YStack>
        </XStack>
        <XStack alignItems="center" gap="$2">
          <Button size="$3" minHeight={44} icon={<Filter size={16} />}>
            Filter
          </Button>
          <Button size="$3" minHeight={44} theme="active" icon={<Download size={16} />}>
            Export All
          </Button>
        </XStack>
      </XStack>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        empty="Once you start using our services, your invoices will appear here."
      />
    </YStack>
  )
}

export default InvoicesList
