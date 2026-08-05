/**
 * Organization invitations, on the real IAM surface.
 *
 * The contract, source-verified end to end:
 *  - create   POST /v1/iam/invitations           (schema iam.invitations.Input)
 *  - list     GET  /v1/iam/invitations
 *  - withdraw POST /v1/iam/invitations/delete
 *  - redeem   https://hanzo.id/signup?invite=<CODE> — Signup.tsx reads
 *             `sp.get('invite')` and the auth client sends it as
 *             `invitationCode`; the server model (iam pkg/schema/invitation.go)
 *             gates on State "Active", counts UsedCount against Quota, and an
 *             Email pin constrains who may redeem.
 *
 * A refusal states its reason. 401 is the credential, 403 is permission —
 * neither is "try again", so neither ever says it.
 */

const API_URL = process.env.NEXT_PUBLIC_HANZO_API_URL || 'https://api.hanzo.ai';
const ID_URL = process.env.NEXT_PUBLIC_HANZO_ID_URL || 'https://hanzo.id';

export interface Invitation {
  owner: string;
  name: string;
  displayName: string;
  code: string;
  quota: number;
  usedCount: number;
  email?: string;
  state: string;
  createdTime?: string;
}

export class InviteRefusal extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

function bearer(): string {
  const t = typeof window !== 'undefined' ? localStorage.getItem('hanzo_access_token') : null;
  if (!t) throw new InviteRefusal(401, 'Sign in to manage invitations');
  return t;
}

async function call(path: string, init?: RequestInit): Promise<unknown> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearer()}`,
      ...init?.headers,
    },
  });
  if (res.status === 401) throw new InviteRefusal(401, 'Your session expired — sign in again');
  if (res.status === 403) throw new InviteRefusal(403, 'Your role cannot manage invitations in this organization');
  if (!res.ok) {
    let detail = '';
    try {
      const body = (await res.json()) as { msg?: string; error?: string; message?: string };
      detail = body.msg || body.error || body.message || '';
    } catch {
      // an HTML error page proves nothing worth toasting
    }
    throw new InviteRefusal(res.status, detail || `Invitation service answered ${res.status}`);
  }
  return res.json();
}

/** A short code a person can read aloud: 10 chars, no 0/O/1/I ambiguity. */
function mintCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

/** The link a new member redeems. */
export function inviteLink(code: string): string {
  return `${ID_URL}/signup?invite=${encodeURIComponent(code)}`;
}

/**
 * Issues one single-use invitation, optionally pinned to an email, and
 * returns it. The caller owns telling the person — the link is
 * `inviteLink(invitation.code)`.
 */
export async function createInvitation(org: string, email?: string): Promise<Invitation> {
  const code = mintCode();
  const invitation = {
    owner: org,
    name: `inv-${code.toLowerCase()}`,
    displayName: email ? `Invitation for ${email}` : 'Invitation',
    code,
    quota: 1,
    usedCount: 0,
    email: email || '',
    state: 'Active',
  };
  await call('/v1/iam/invitations', { method: 'POST', body: JSON.stringify(invitation) });
  return invitation as Invitation;
}

/** The organization's invitations, newest first, redeemed ones included. */
export async function listInvitations(): Promise<Invitation[]> {
  const body = (await call('/v1/iam/invitations')) as { data?: Invitation[] } | Invitation[];
  const rows = Array.isArray(body) ? body : body.data || [];
  return rows.filter((r) => r && r.code);
}

/** Withdraws an invitation so its code stops redeeming. */
export async function withdrawInvitation(inv: Pick<Invitation, 'owner' | 'name'>): Promise<void> {
  await call('/v1/iam/invitations/delete', {
    method: 'POST',
    body: JSON.stringify({ owner: inv.owner, name: inv.name }),
  });
}
