
export interface ReferralStats {
  totalInvited: number
  signedUp: number
  creditsEarned: number
  pending: number
}

export interface ReferralRecord {
  id: string | number
  name: string
  email: string
  status: string
  date: string
  credits: number
}
