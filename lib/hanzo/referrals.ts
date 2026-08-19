/**
 * Hanzo Referral API Client
 *
 * Connects to the Commerce backend at api.hanzo.ai/v1
 * All endpoints require Bearer token auth from hanzo.id OAuth2.
 */

const API_BASE = process.env.NEXT_PUBLIC_HANZO_API_URL || 'https://api.hanzo.ai'

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('hanzo_access_token')
}

async function apiFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = getAccessToken()
  if (!token) throw new Error('Not authenticated')

  const res = await fetch(`${API_BASE}/v1${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...opts.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || body.error || `API error ${res.status}`)
  }

  return res.json()
}

// --- Types ---

export interface Referrer {
  id: string
  code: string
  userId: string
  affiliateId?: string
  programId?: string
  firstReferredAt?: string
  blacklisted: boolean
  duplicate: boolean
  createdAt?: string
}

export interface Referral {
  id: string
  type: 'new-order' | 'new-user'
  userId: string
  orderId?: string
  referrer: {
    id: string
    userId: string
    affiliateId?: string
  }
  fee?: {
    currency: string
    amount: number // cents
  }
  blacklisted: boolean
  duplicate: boolean
  revoked: boolean
  createdAt?: string
}

export interface ReferralStats {
  totalInvited: number
  signedUp: number
  pending: number
}

export interface ReferralRecord {
  id: string
  email: string
  name: string
  status: 'completed' | 'pending' | 'revoked'
  date: string
}

// --- Referrer (referral links) ---

export async function getUserReferrers(userId: string): Promise<Referrer[]> {
  return apiFetch<Referrer[]>(`/user/${userId}/referrers`)
}

export async function createReferrer(code?: string, programId?: string): Promise<Referrer> {
  return apiFetch<Referrer>('/referrer', {
    method: 'POST',
    body: JSON.stringify({ code, programId }),
  })
}

// --- Referrals (conversions) ---

export async function getUserReferrals(userId: string): Promise<Referral[]> {
  return apiFetch<Referral[]>(`/user/${userId}/referrals`)
}

// --- Stats (computed from referrers + referrals) ---

export async function getReferralStats(userId: string): Promise<ReferralStats> {
  const [referrers, referrals] = await Promise.all([
    getUserReferrers(userId),
    getUserReferrals(userId),
  ])

  const completed = referrals.filter(r => !r.revoked && !r.blacklisted)
  const pending = referrals.filter(r => r.revoked === false && !r.fee)

  return {
    totalInvited: referrers.length,
    signedUp: completed.length,
    pending: pending.length,
  }
}

// --- History (referrals as display records) ---

export async function getReferralHistory(userId: string): Promise<ReferralRecord[]> {
  const referrals = await getUserReferrals(userId)

  return referrals.map((r) => ({
    id: r.id,
    email: '', // filled by backend join on userId
    name: '',
    status: r.revoked ? 'revoked' : r.fee ? 'completed' : 'pending',
    date: r.createdAt ?? '',
  }))
}

// --- Email invites ---

export async function sendReferralInvites(
  emails: string[],
  referralCode: string,
): Promise<{ sent: number; failed: string[] }> {
  return apiFetch('/referrer/invite', {
    method: 'POST',
    body: JSON.stringify({ emails, referralCode }),
  })
}

// --- Generate referral code ---

export function generateReferralCode(userId: string): string {
  // Deterministic short code from user ID
  const hash = userId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase()
  return `HNZ${hash}`
}
