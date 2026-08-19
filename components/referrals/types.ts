
// A referral carries a referee and a status, and no amount: the surface that
// serves it stores none and reports none. Neither shape holds a money field,
// so no view built on them can imply one.
export interface ReferralStats {
  totalInvited: number
  signedUp: number
  pending: number
}

export interface ReferralRecord {
  id: string | number
  name: string
  email: string
  status: string
  date: string
}
