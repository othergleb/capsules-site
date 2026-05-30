// Supabase database types

export type MemberStatus =
  | 'registered'          // signed up, no companion yet
  | 'paired'              // companion confirmed
  | 'allocated'           // ballot winner — purchase window open
  | 'lapsed'              // winner window expired without purchase
  | 'purchased'           // completed checkout
  | 'not_selected'        // didn't win ballot, hasn't opted into waitlist
  | 'waitlisted'          // actively opted into waitlist after not winning
  | 'waitlist_allocated'  // waitlist member given a purchase window
  | 'waitlist_lapsed'     // waitlist window expired without purchase

export interface Member {
  id:               string
  member_number:    number           // auto-incremented
  email:            string
  name:             string | null
  invite_code:      string           // unique token for referral link
  companion_email:  string | null    // email they invited
  companion_id:     string | null    // FK → members.id (set once companion registers)
  invited_by_id:    string | null    // FK → members.id (who invited them)
  status:           MemberStatus
  klaviyo_id:       string | null
  is_admin:         boolean
  allocated_at:     string | null
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
