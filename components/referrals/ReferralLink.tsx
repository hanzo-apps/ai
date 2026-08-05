'use client'

import React, { useState } from 'react'
import { Share2, Mail } from 'lucide-react'
import { Button } from '@hanzo/ui'
import { Input } from '@hanzo/ui'
import { Label } from '@hanzo/ui'
import { CopyButton } from '@hanzo/ui/product'
import { toast } from 'sonner'
import { useAnalytics } from '@hanzo/event/react'
import { EVENTS } from '@hanzo/event'
import { sendReferralInvites } from '@/lib/hanzo/referrals'

interface ReferralLinkProps {
  referralLink: string
  referralCode: string
}

const ReferralLink = ({ referralLink, referralCode }: ReferralLinkProps) => {
  const [emailInput, setEmailInput] = useState('')
  const [sending, setSending] = useState(false)
  const analytics = useAnalytics()

  // "Share Link" is the deliberate share, so it is the one that reports
  // WAITLIST_SHARED. The copy control inside the field is a convenience and
  // reports itself, through CopyButton's own instrumentation.
  const handleShare = () => {
    navigator.clipboard.writeText(referralLink)
    analytics.capture(EVENTS.WAITLIST_SHARED, { method: 'link', refCode: referralCode })
    toast.success('Referral link copied to clipboard!')
  }

  const handleSendInvites = async (e: React.FormEvent) => {
    e.preventDefault()
    const emails = emailInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    if (emails.length === 0) {
      toast.error('Please enter at least one email address')
      return
    }

    try {
      setSending(true)
      const result = await sendReferralInvites(emails, referralCode)
      analytics.capture(EVENTS.WAITLIST_SHARED, {
        method: 'email',
        count: result.sent,
        refCode: referralCode,
      })
      toast.success(`Invitations sent to ${result.sent} contact${result.sent !== 1 ? 's' : ''}!`)
      if (result.failed?.length) {
        toast.error(`Failed to send to: ${result.failed.join(', ')}`)
      }
      setEmailInput('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send invites')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-6">
      <h2 className="text-xl font-medium mb-4">Your Referral Link</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            value={referralLink}
            readOnly
            className="pr-12 bg-neutral-900 border-neutral-700"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <CopyButton value={referralLink} label="Copy referral link" id="referral-link" />
          </div>
        </div>
        <Button className="flex items-center gap-2" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          Share Link
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-neutral-800">
        <h3 className="text-lg font-medium mb-4">Send Invites via Email</h3>
        <form onSubmit={handleSendInvites} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="emails" className="sr-only">
              Email Addresses
            </Label>
            <Input
              id="emails"
              placeholder="Enter email addresses, separated by commas"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-neutral-900 border-neutral-700"
              disabled={sending}
            />
          </div>
          <Button type="submit" className="flex items-center gap-2" disabled={sending}>
            <Mail className="h-4 w-4" />
            {sending ? 'Sending...' : 'Send Invites'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ReferralLink
