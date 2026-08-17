'use client'
import { useEffect } from 'react'
import { Box } from '@hanzo/ui'

export default function Redirect({ to }: { to: string }) {
  useEffect(() => {
    if (to.startsWith('http')) {
      window.location.href = to
    } else {
      window.location.replace(to)
    }
  }, [to])
  return (
    <Box className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-white/50 text-sm">Redirecting...</p>
    </Box>
  )
}
