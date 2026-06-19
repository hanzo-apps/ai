'use client'

import { IamProvider } from '@hanzo/iam/react'
import { iamConfig } from '@/lib/hanzo/iam'

/**
 * Mounts the Hanzo IAM (hanzo.id) auth context at the root so
 * every client component can `useIam()`. Static-export safe — the config
 * supplies an explicit storage shim for the server prerender.
 */
export default function IamClientProvider({ children }: { children: React.ReactNode }) {
  return <IamProvider config={iamConfig}>{children}</IamProvider>
}
