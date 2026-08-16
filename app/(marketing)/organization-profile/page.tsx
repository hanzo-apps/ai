'use client'


import React from 'react';
import { useAccount } from '@/contexts/AccountContext';
import { Button } from "@hanzo/ui";
import { Building, Users, Calendar, Globe, Edit, Shield } from 'lucide-react';

import AccountLayout from '@/components/account/AccountLayout';
import { useRouter } from "next/navigation";
import { Box } from '@hanzo/ui'

const OrganizationProfile = () => {
  const { currentOrganization } = useAccount();
  const router = useRouter();

  if (!currentOrganization) {
    return <div>No organization selected.</div>;
  }

  // This would come from a real organization profile model
  const orgProfile = {
    description: "Leading AI and development solutions provider.",
    founded: "2018",
    location: "San Francisco, CA",
    website: "https://hanzo.industries",
    teamSize: "43 members",
    plans: "Pro Plan ($20/month)",
    security: "Enterprise Security, GDPR Ready"
  };

  // Mock team members data
  const teamMembers = [
    { id: '1', name: 'Team Owner', role: 'Owner' },
    { id: '2', name: 'Team Admin', role: 'Admin' },
    { id: '3', name: 'Team Member', role: 'Member' },
    { id: '4', name: 'Team Member', role: 'Member' },
  ];

  return (
    <AccountLayout>
      <div className="space-y-8">
        {/* Organization Header */}
        <Box className="flex flex-col md:flex-row gap-8 items-start">
          <Box className="h-32 w-32 bg-neutral-900/30 rounded-xl flex items-center justify-center">
            <Building className="h-16 w-16 text-muted-foreground" />
          </Box>
          
          <Box className="flex-1">
            <Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{currentOrganization.name}</h1>
                <p className="text-muted-foreground mt-1">{orgProfile.description}</p>
                
                <Box className="flex flex-wrap gap-4 mt-4">
                  <Box className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Founded {orgProfile.founded}
                  </Box>
                  <Box className="flex items-center text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2" />
                    {orgProfile.location}
                  </Box>
                  <Box className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {orgProfile.teamSize}
                  </Box>
                  <Box className="flex items-center text-muted-foreground">
                    <Shield className="h-4 w-4 mr-2" />
                    {orgProfile.security}
                  </Box>
                </Box>
              </div>
              
              <Button 
                onClick={() => router.push('/account/organization')} 
                variant="outline" 
                className="flex items-center bg-[var(--black)] hover:bg-neutral-900/30 border-neutral-800/30"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Organization
              </Button>
            </Box>
          </Box>
        </Box>
        
        {/* Organization Stats */}
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Box className="bg-[var(--black)] border-0 rounded-lg p-6">
            <h3 className="font-medium text-muted-foreground mb-2">Current Plan</h3>
            <Box className="text-2xl font-bold">Pro Plan</Box>
            <Box className="text-sm text-muted-foreground mt-1">$16/month, billed annually</Box>
          </Box>
          
          <Box className="bg-[var(--black)] border-0 rounded-lg p-6">
            <h3 className="font-medium text-muted-foreground mb-2">Team Members</h3>
            <Box className="text-2xl font-bold">{teamMembers.length}</Box>
            <Box className="text-sm text-muted-foreground mt-1">
              {teamMembers.filter(m => m.role === 'Owner' || m.role === 'Admin').length} admins, 
              {teamMembers.filter(m => m.role === 'Member').length} members
            </Box>
          </Box>
          
          <Box className="bg-[var(--black)] border-0 rounded-lg p-6">
            <h3 className="font-medium text-muted-foreground mb-2">Your Role</h3>
            <Box className="text-2xl font-bold">{currentOrganization.role}</Box>
            <Box className="text-sm text-muted-foreground mt-1">
              {currentOrganization.role === 'owner' 
                ? 'Full access to all settings' 
                : currentOrganization.role === 'admin' 
                  ? 'Can invite members and modify settings'
                  : 'Standard access to resources'}
            </Box>
          </Box>
        </Box>
        
        {/* Team Members */}
        <Box className="bg-[var(--black)] border-0 rounded-lg p-6">
          <Box className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Team Members</h2>
            <Button 
              onClick={() => router.push('/account/organization')} 
              size="sm"
              className="bg-neutral-900 hover:bg-neutral-800 border-0"
            >
              View All
            </Button>
          </Box>
          
          <Box className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.slice(0, 3).map(member => (
              <Box key={member.id} className="flex items-center p-3 bg-neutral-900/20 rounded-lg">
                <Box className="h-10 w-10 bg-neutral-900/50 rounded-full mr-3 flex items-center justify-center text-sm font-medium">
                  {member.name.charAt(0)}
                </Box>
                <div>
                  <Box className="font-medium">{member.name}</Box>
                  <Box className="text-xs text-muted-foreground">{member.role}</Box>
                </div>
              </Box>
            ))}
          </Box>
        </Box>
      </div>
    </AccountLayout>
  );
};

export default OrganizationProfile;
