'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { XStack, YStack, Text } from '@hanzo/gui'
import { Avatar, AvatarFallback, AvatarImage, Button, Input, Textarea } from '@hanzo/ui'
import { Mail } from 'lucide-react'
import { toast } from 'sonner'
import { Field, Form } from '@/components/account/form'
import { useAccount } from '@/contexts/AccountContext'

/**
 * The reader's own profile.
 *
 * The avatar, the buttons and the fields each stated their size in utility
 * classes, and `@hanzo/ui` 8 is gui underneath — it reads props, not classes —
 * so a 96px avatar rendered at the component's default 32 and a row of buttons
 * stacked. Sizes and spacing are gui props here for that reason.
 */
export default function Account() {
  const { user, updateUserProfile } = useAccount()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (!user) return
    setFullName(user.name || '')
    setEmail(user.email || '')
    setBio(user.bio || '')
    setLocation(user.location || '')
    setWebsite(user.website || '')
    setPhone(user.phone || '')
  }, [user])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserProfile({ name: fullName, email, bio, location, website, phone })
    toast.success('Profile updated')
  }

  // The layout has already asked whether anyone is signed in.
  if (!user) return null

  return (
    <YStack gap="$9">
      <Text render="h1" fontSize="$8" fontWeight="500" color="$foreground">
        Profile
      </Text>

      <YStack gap="$5" $sm={{ flexDirection: 'row', alignItems: 'center', gap: '$7' }}>
        <Avatar size={96}>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            <Text fontSize={34} color="$color11">
              {user.name.charAt(0)}
            </Text>
          </AvatarFallback>
        </Avatar>

        <YStack gap="$3">
          <Text render="h2" fontSize="$7" fontWeight="500" color="$foreground">
            {user.name}
          </Text>
          <XStack alignItems="center" gap="$2">
            <Mail size={16} color="var(--muted-foreground)" />
            <Text fontSize="$3" color="$mutedForeground">
              {user.email}
            </Text>
          </XStack>
          <XStack gap="$3" flexWrap="wrap">
            <Button variant="outline" size="sm">
              Upload new picture
            </Button>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </XStack>
        </YStack>
      </YStack>

      <YStack gap="$6" paddingTop="$8" borderTopWidth={1} borderColor="$border">
        <Text render="h2" fontSize="$6" fontWeight="500" color="$foreground">
          Personal information
        </Text>

        <Form onSubmit={submit}>
          <Field id="fullName" label="Full name">
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </Field>

          <Field id="email" label="Email address">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field id="bio" label="Bio">
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
            />
          </Field>

          <XStack gap="$6" flexWrap="wrap">
            <Field id="location" label="Location" grow>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
              />
            </Field>
            <Field id="phone" label="Phone number" grow>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </Field>
          </XStack>

          <Field id="website" label="Website">
            <Input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
            />
          </Field>

          <XStack gap="$3" flexWrap="wrap" paddingTop="$2">
            <Button type="submit">Update profile</Button>
            <Link href="/user-profile" style={{ textDecoration: 'none' }}>
              <Button type="button" variant="outline">
                View public profile
              </Button>
            </Link>
          </XStack>
        </Form>
      </YStack>
    </YStack>
  )
}
