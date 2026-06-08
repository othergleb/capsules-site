// Supabase database types

export type MemberStatus =
  | 'registered'   // signed up
  | 'purchased'    // completed checkout

export interface Member {
  id:               string
  member_number:    number           // auto-incremented
  email:            string
  name:             string | null
  invite_code:      string           // unique token for referral link
  companion_id:     string | null    // FK → members.id (set once companion registers)
  invited_by_id:    string | null    // FK → members.id (who invited them)
  tier:             number           // 1 = early access, 2 = standard waitlist
  source:           string | null
  status:           MemberStatus
  klaviyo_id:       string | null
  is_admin:         boolean
  purchased_at:     string | null
  shopify_order_id: string | null
  created_at:       string
}

export type Database = {
  public: {
    Tables: {
      members: {
        Row:    Member
        Insert: Omit<Member, 'id' | 'member_number' | 'invite_code' | 'created_at'>
        Update: Partial<Member>
      }
    }
  }
}
