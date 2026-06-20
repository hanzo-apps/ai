'use client'


import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { useIam, useOrganizations } from '@hanzo/iam/react';
import type { User as IamUser, Organization as IamOrg } from '@hanzo/iam';

export interface OrganizationMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Organization {
  id: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  avatar?: string;
  plan?: string;
  memberCount?: number;
  members?: OrganizationMember[];
  description?: string;
  website?: string;
  location?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinedDate?: string;
  website?: string;
  phone?: string;
}

interface AccountContextType {
  user: User | null;
  setUser: (user: User) => void;
  organizations: Organization[];
  currentOrganization: Organization | null;
  isLoading: boolean;
  switchOrganization: (orgId: string) => void;
  updateUserProfile: (userData: Partial<User>) => void;
  updateOrganization: (orgData: Partial<Organization>) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

function mapUser(u: IamUser): User {
  return {
    id: u.id ?? u.name,
    name: u.displayName || u.name,
    email: u.email ?? '',
    avatar: u.avatar,
    phone: u.phone,
    joinedDate: u.createdTime,
  };
}

function mapOrg(o: IamOrg): Organization {
  return {
    id: o.name,
    name: o.displayName || o.name,
    role: o.isPersonal ? 'owner' : 'member',
    avatar: o.logo,
    website: o.websiteUrl,
    members: [],
  };
}

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: iamUser, isLoading: authLoading } = useIam();
  const { organizations: iamOrgs, currentOrgId, switchOrg, isLoading: orgsLoading } = useOrganizations();

  const [userOverrides, setUserOverrides] = useState<Partial<User>>({});
  const [orgOverrides, setOrgOverrides] = useState<Record<string, Partial<Organization>>>({});

  useEffect(() => {
    setUserOverrides({});
    setOrgOverrides({});
  }, [iamUser?.id, iamUser?.name]);

  const user = useMemo<User | null>(() => {
    if (!iamUser) return null;
    return { ...mapUser(iamUser), ...userOverrides };
  }, [iamUser, userOverrides]);

  const organizations = useMemo<Organization[]>(
    () => iamOrgs.map((o) => {
      const base = mapOrg(o);
      return { ...base, ...orgOverrides[base.id] };
    }),
    [iamOrgs, orgOverrides]
  );

  const currentOrganization = useMemo<Organization | null>(
    () => organizations.find((o) => o.id === currentOrgId) ?? organizations[0] ?? null,
    [organizations, currentOrgId]
  );

  const setUser = (next: User) => setUserOverrides(next);

  const updateUserProfile = (userData: Partial<User>) =>
    setUserOverrides((prev) => ({ ...prev, ...userData }));

  const updateOrganization = (orgData: Partial<Organization>) => {
    if (!currentOrganization) return;
    setOrgOverrides((prev) => ({
      ...prev,
      [currentOrganization.id]: { ...prev[currentOrganization.id], ...orgData },
    }));
  };

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
        organizations,
        currentOrganization,
        isLoading: authLoading || orgsLoading,
        switchOrganization: switchOrg,
        updateUserProfile,
        updateOrganization,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
