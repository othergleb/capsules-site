// Supabase database types
// These will be auto-generated once you run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID
// For now, manually defined to match the intended schema

export type MemberStatus =
  | 'registered'    // signed up, no companion yet
  | 'paired'        // companion confirmed
  | 'allocated'     // selected in ballot, awaiting purchase
  | 'purchased'     // completed checkout
  | 'waitlisted'    // not selected, on waitlist
  | 'lapsed'        // allocated but 48hr window expired

export interface Member {
  id: string                      // UUID
  member_number: number           // Auto-incremented, e.g. 42
  email: string
  status: MemberStatus
  companion_id: string | null     // FK → members.id
  invite_code: string             // Unique invite link token
  invited_by: string | null       // FK → members.id (who sent the invite)
  allocated_at: string | null     // ISO timestamp
  purchased_at: string | null
  shopify_order_id: string | null
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      members: {
        Row: Member
        Insert: Omit<Member, 'id' | 'member_number' | 'created_at'>
        Update: Partial<Member>
      }
    }
  }
}
