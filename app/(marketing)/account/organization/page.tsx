'use client'

import Link from 'next/link'

import React, { useState, useEffect } from 'react';

type TeamMember = { id: string; name: string; email: string; role: string; avatar?: string }
import { useAccount } from '@/contexts/AccountContext';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Textarea,
} from "@hanzo/ui";
import { DataTable, StatusTag } from "@hanzo/ui/product";
import { XStack, YStack, Text } from "@hanzo/gui";
import { Building, UserPlus, MoreVertical, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Field, Form } from '@/components/account/form';
import {
  createInvitation,
  inviteLink,
  listInvitations,
  withdrawInvitation,
  type Invitation,
} from '@/lib/hanzo/team';


const Organization = () => {
  const { currentOrganization, updateOrganization } = useAccount();
  const [orgName, setOrgName] = useState('');
  const [orgDescription, setOrgDescription] = useState('');
  const [orgWebsite, setOrgWebsite] = useState('');
  const [orgLocation, setOrgLocation] = useState('');
  
  useEffect(() => {
    if (currentOrganization) {
      setOrgName(currentOrganization.name || '');
      setOrgDescription(currentOrganization.description || '');
      setOrgWebsite(currentOrganization.website || '');
      setOrgLocation(currentOrganization.location || '');
    }
  }, [currentOrganization]);
  
  // Team members from real organization context
  const teamMembers = currentOrganization?.members || [];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateOrganization({
      name: orgName,
      description: orgDescription,
      website: orgWebsite,
      location: orgLocation
    });
    
    toast.success('Organization settings updated');
  };
  
  // The real invitation flow, on the real IAM surface (lib/hanzo/team.ts).
  // The toast only ever states what actually happened: a created invitation
  // with its link on the clipboard, or the refusal's own reason.
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteBusy, setInviteBusy] = useState(false);
  const [pending, setPending] = useState<Invitation[]>([]);

  const refreshInvitations = React.useCallback(async () => {
    try {
      const rows = await listInvitations();
      setPending(rows.filter((r) => r.state === 'Active' && r.usedCount < r.quota));
    } catch {
      // The list is additive UI — a refusal here is not worth a toast on load.
    }
  }, []);

  useEffect(() => {
    refreshInvitations();
  }, [refreshInvitations]);

  const handleCreateInvitation = async () => {
    if (!currentOrganization) return;
    setInviteBusy(true);
    try {
      const inv = await createInvitation(currentOrganization.id, inviteEmail.trim() || undefined);
      const link = inviteLink(inv.code);
      await navigator.clipboard.writeText(link).catch(() => {});
      toast.success(
        inv.email
          ? `Invitation for ${inv.email} created — link copied`
          : 'Invitation created — link copied',
      );
      setInviteEmail('');
      setInviteOpen(false);
      refreshInvitations();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Invitation service refused');
    } finally {
      setInviteBusy(false);
    }
  };

  const handleWithdraw = async (inv: Invitation) => {
    try {
      await withdrawInvitation(inv);
      toast.success('Invitation withdrawn — its code no longer redeems');
      refreshInvitations();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Invitation service refused');
    }
  };

  if (!currentOrganization) {
    return (
      <YStack gap="$3">
        <Text render="h1" fontSize="$8" fontWeight="500" color="$foreground">
          Organization
        </Text>
        <Text fontSize="$4" color="$mutedForeground">
          No organization selected.
        </Text>
      </YStack>
    );
  }

  return (
    <YStack gap="$9">
      <Text render="h1" fontSize="$8" fontWeight="500" color="$foreground">
        Organization
      </Text>

      <YStack gap="$5" $sm={{ flexDirection: 'row', alignItems: 'center', gap: '$7' }}>
        <YStack width={96} height={96} alignItems="center" justifyContent="center" borderRadius="$4" backgroundColor="$color3">
          <Building size={40} color="var(--muted-foreground)" />
        </YStack>

        <YStack gap="$3">
          <Text render="h2" fontSize="$7" fontWeight="500" color="$foreground">
            {currentOrganization.name}
          </Text>
          <Text fontSize="$3" color="$mutedForeground">
            {currentOrganization.role === 'owner'
              ? 'You are the owner of this organization'
              : `You are a ${currentOrganization.role} in this organization`}
          </Text>

          <XStack gap="$3" flexWrap="wrap">
            <Button variant="outline" size="sm" gap="$2">
              <Upload size={16} />
              <span>Upload logo</span>
            </Button>
            <Link href="/organization-profile" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="sm">
                View public profile
              </Button>
            </Link>
          </XStack>
        </YStack>
      </YStack>

      <YStack gap="$6" paddingTop="$8" borderTopWidth={1} borderColor="$border">
        <Text render="h2" fontSize="$6" fontWeight="500" color="$foreground">
          Organization details
        </Text>

        <Form onSubmit={handleSubmit}>
          <Field id="orgName" label="Organization name">
            <Input id="orgName" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
          </Field>

          <Field id="orgDescription" label="Description">
            <Textarea
              id="orgDescription"
              value={orgDescription}
              onChange={(e) => setOrgDescription(e.target.value)}
              placeholder="Tell us about your organization"
            />
          </Field>

          <XStack gap="$6" flexWrap="wrap">
            <Field id="orgWebsite" label="Website" grow>
              <Input
                id="orgWebsite"
                value={orgWebsite}
                onChange={(e) => setOrgWebsite(e.target.value)}
                placeholder="https://example.com"
              />
            </Field>
            <Field id="orgLocation" label="Location" grow>
              <Input
                id="orgLocation"
                value={orgLocation}
                onChange={(e) => setOrgLocation(e.target.value)}
                placeholder="City, Country"
              />
            </Field>
          </XStack>

          <XStack paddingTop="$2">
            <Button type="submit">Update organization</Button>
          </XStack>
        </Form>
      </YStack>

      <YStack gap="$5" paddingTop="$8" borderTopWidth={1} borderColor="$border">
          <XStack alignItems="center" justifyContent="space-between" gap="$4" flexWrap="wrap">
            <Text render="h2" fontSize="$6" fontWeight="500" color="$foreground">
              Team members
            </Text>

            <Button onPress={() => setInviteOpen((v) => !v)} gap="$2">
              <UserPlus size={16} />
              <span>Invite member</span>
            </Button>
          </XStack>

          {inviteOpen && (
            <XStack alignItems="center" gap="$3" flexWrap="wrap">
              <Input
                type="email"
                value={inviteEmail}
                onChangeText={(t: string) => setInviteEmail(t)}
                placeholder="Email to pin the invite to (optional)"
                aria-label="Invite email"
                flexGrow={1}
                flexBasis={220}
                maxWidth={384}
              />
              <Button onPress={handleCreateInvitation} disabled={inviteBusy}>
                {inviteBusy ? 'Creating…' : 'Create invite link'}
              </Button>
            </XStack>
          )}

          {pending.length > 0 && (
            <YStack gap="$2">
              <Text fontSize="$2" fontWeight="500" color="$mutedForeground">
                Pending invitations
              </Text>
              {pending.map((inv) => (
                <XStack
                  key={`${inv.owner}/${inv.name}`}
                  alignItems="center"
                  justifyContent="space-between"
                  gap="$3"
                  borderRadius="$3"
                  borderWidth={1}
                  borderColor="$border"
                  paddingHorizontal="$4"
                  paddingVertical="$2"
                >
                  <YStack minWidth={0} flexShrink={1}>
                    <Text fontSize="$3" color="$foreground" numberOfLines={1}>
                      {inv.email || 'Anyone with the link'}
                    </Text>
                    <Text fontSize="$2" fontFamily="$mono" color="$mutedForeground" numberOfLines={1}>
                      {inviteLink(inv.code)}
                    </Text>
                  </YStack>
                  <XStack alignItems="center" gap="$2" flexShrink={0}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onPress={async () => {
                        await navigator.clipboard.writeText(inviteLink(inv.code)).catch(() => {})
                        toast.success('Invite link copied')
                      }}
                    >
                      Copy link
                    </Button>
                    <Button variant="ghost" size="sm" onPress={() => handleWithdraw(inv)}>
                      Withdraw
                    </Button>
                  </XStack>
                </XStack>
              ))}
            </YStack>
          )}

          <DataTable
            columns={[
              {
                key: 'user',
                header: 'User',
                render: (member: TeamMember) => (
                  <XStack alignItems="center" gap="$3">
                    <Avatar>
                      {member.avatar ? <AvatarImage src={member.avatar} /> : null}
                      <AvatarFallback>
                        {member.name.split(" ").map((part: string) => part[0]).slice(0, 2).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <YStack>
                      <Text fontWeight="500" color="$foreground">{member.name}</Text>
                      <Text fontSize="$3" color="$mutedForeground">{member.email}</Text>
                    </YStack>
                  </XStack>
                ),
              },
              {
                key: 'role',
                header: 'Role',
                render: (member: TeamMember) => <StatusTag status={member.role} />,
              },
              {
                key: 'actions',
                header: 'Actions',
                align: 'right' as const,
                render: () => (
                  <DropdownMenu placement="bottom-end">
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" aria-label="Member actions">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem>Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ),
              },
            ]}
            rows={teamMembers as TeamMember[]}
            rowKey={(m: TeamMember) => m.id}
            empty="No team members yet. Invite someone to get started."
          />
      </YStack>
    </YStack>
  );
};

export default Organization;
