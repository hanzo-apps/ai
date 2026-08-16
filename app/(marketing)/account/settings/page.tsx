'use client'

import React from 'react'
import { XStack, YStack, Text } from '@hanzo/gui'
import { Button, Checkbox, Input, Label } from '@hanzo/ui'
import { toast } from 'sonner'
import { Field, Form } from '@/components/account/form'
import { useAccount } from '@/contexts/AccountContext'

const NOTICES = [
  { id: 'marketing', label: 'Marketing updates' },
  { id: 'security', label: 'Security alerts' },
]

export default function AccountSettings() {
  const { user } = useAccount()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Settings updated')
  }

  return (
    <YStack gap="$9">
      <Text render="h1" fontSize="$8" fontWeight="500" color="$foreground">
        Settings
      </Text>

      <Form onSubmit={submit}>
        <Field id="email" label="Email address">
          <Input id="email" type="email" value={user?.email || ''} disabled />
        </Field>

        <YStack gap="$3">
          <Text fontSize="$3" fontWeight="500" color="$foreground">
            Email notifications
          </Text>
          {NOTICES.map((n) => (
            <XStack key={n.id} alignItems="center" gap="$3">
              <Checkbox id={n.id} defaultChecked />
              <Label htmlFor={n.id}>{n.label}</Label>
            </XStack>
          ))}
        </YStack>

        <XStack paddingTop="$2">
          <Button type="submit">Save changes</Button>
        </XStack>
      </Form>
    </YStack>
  )
}
