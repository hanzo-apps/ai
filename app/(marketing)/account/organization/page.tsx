'use client'

import Link from 'next/link'

import React, { useState, useEffect } from 'react';

type TeamMember = { id: string; name: string; email: string; role: string; avatar?: string }
import { useAccount } from '@/contexts/AccountContext';
import { Button } from "@/components/ui/button";
import { Input } from "@hanzo/ui";
import { Label } from "@hanzo/ui";
import { Textarea } from "@hanzo/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@hanzo/ui";
import { DataTable, StatusTag } from "@hanzo/ui/product";
import { XStack, YStack, Text } from "@hanzo/gui";
import { Building, User, UserPlus, MoreVertical, Upload, MapPin, Globe, Link as LinkIcon } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hanzo/ui";
import { toast } from 'sonner';
import AnimatedSection, { AnimatedHeading } from "@/components/ui/animated-section";


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
  
  const handleInviteMember = () => {
    // In a real app, this would open a modal for invitation
    toast.success('Invitation link created and copied to clipboard');
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
            
            <Button onClick={handleInviteMember} className="space-x-2 bg-neutral-900 hover:bg-neutral-800 border-none">
              <UserPlus className="h-4 w-4" />
              <span>Invite Member</span>
            </Button>
          </div>
          
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" aria-label="Member actions">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
