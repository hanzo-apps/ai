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
  Label,
  Textarea,
} from "@hanzo/ui";
import { DataTable, StatusTag } from "@hanzo/ui/product";
import { XStack, YStack, Text } from "@hanzo/gui";
import { Building, User, UserPlus, MoreVertical, Upload, MapPin, Globe, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedSection, { AnimatedHeading } from "@/components/ui/animated-section";
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
    return <div>No organization selected.</div>;
  }

  return (
    <AnimatedSection>
      <div className="space-y-8">
        <AnimatedHeading>
          <h2 className="text-2xl font-bold mb-6">Organization Settings</h2>
        </AnimatedHeading>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="h-24 w-24 bg-neutral-900/30 rounded-xl flex items-center justify-center">
            <Building className="h-12 w-12 text-muted-foreground" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">{currentOrganization.name}</h2>
            <div className="text-muted-foreground">
              {currentOrganization.role === 'owner' ? 'You are the owner of this organization' : 
                `You are a ${currentOrganization.role} in this organization`}
            </div>
            
            <div className="mt-4 space-x-4">
              <Button variant="outline" size="sm" className="bg-[var(--black)] border-neutral-800/30 hover:bg-neutral-900/30 space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Logo</span>
              </Button>
              <Link href="/organization-profile">
                <Button variant="outline" size="sm" className="bg-[var(--black)] border-neutral-800/30 hover:bg-neutral-900/30">
                  View Public Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800/10 pt-6">
          <h3 className="text-xl font-medium mb-4">Organization Details</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="bg-neutral-900/20 border-neutral-800/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orgDescription">Description</Label>
              <Textarea
                id="orgDescription"
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
                className="bg-neutral-900/20 border-neutral-800/30 min-h-24"
                placeholder="Tell us about your organization"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orgWebsite">Website</Label>
              <Input
                id="orgWebsite"
                value={orgWebsite}
                onChange={(e) => setOrgWebsite(e.target.value)}
                className="bg-neutral-900/20 border-neutral-800/30"
                placeholder="https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orgLocation">Location</Label>
              <Input
                id="orgLocation"
                value={orgLocation}
                onChange={(e) => setOrgLocation(e.target.value)}
                className="bg-neutral-900/20 border-neutral-800/30"
                placeholder="City, Country"
              />
            </div>
            
            <Button type="submit" className="bg-neutral-900 hover:bg-neutral-800 border-none">
              Update Organization
            </Button>
          </form>
        </div>

        <div className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Team Members</h3>
            
            <Button onClick={() => setInviteOpen((v) => !v)} className="space-x-2 bg-neutral-900 hover:bg-neutral-800 border-none">
              <UserPlus className="h-4 w-4" />
              <span>Invite member</span>
            </Button>
          </div>

          {inviteOpen && (
            <div className="flex items-center gap-3 mb-4">
              <Input
                type="email"
                value={inviteEmail}
                onChangeText={(t: string) => setInviteEmail(t)}
                placeholder="Email to pin the invite to (optional)"
                aria-label="Invite email"
                className="max-w-sm"
              />
              <Button
                onClick={handleCreateInvitation}
                disabled={inviteBusy}
                className="bg-neutral-900 hover:bg-neutral-800 border-none"
              >
                {inviteBusy ? 'Creating…' : 'Create invite link'}
              </Button>
            </div>
          )}

          {pending.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-neutral-400 mb-2">Pending invitations</h4>
              <div className="space-y-2">
                {pending.map((inv) => (
                  <div key={`${inv.owner}/${inv.name}`} className="flex items-center justify-between rounded-lg border border-neutral-800 px-4 py-2">
                    <div className="min-w-0">
                      <div className="text-sm truncate">{inv.email || 'Anyone with the link'}</div>
                      <div className="text-xs text-neutral-500 font-mono truncate">{inviteLink(inv.code)}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          await navigator.clipboard.writeText(inviteLink(inv.code)).catch(() => {});
                          toast.success('Invite link copied');
                        }}
                      >
                        Copy link
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleWithdraw(inv)}>
                        Withdraw
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DataTable
            columns={[
              {
                key: 'user',
                header: 'User',
                render: (member: TeamMember) => (
                  <XStack alignItems="center" gap="$3">
                    <Avatar className="h-8 w-8">
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
                        <MoreVertical className="h-4 w-4" />
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
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Organization;
