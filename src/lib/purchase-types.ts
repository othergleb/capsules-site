// Types for the purchase token system.
// Kept separate from types.ts to avoid merge conflicts during concurrent editing.

export type PurchaseTokenType = 'winner' | 'waitlist'

export interface PurchaseToken {
  id:               string
  member_id:        string
  token:            string           // UUID — goes in the email link /purchase/{token}
  type:             PurchaseTokenType
  capsule_id:       string           // e.g. 'capsule-01'
  expires_at:       string           // ISO timestamp
  accessed_at:      string | null    // first time the link was visited
  used_at:          string | null    // set when Shopify order webhook fires
  shopify_order_id: string | null
  created_at:       string
}

// Returned by the token lookup in the purchase page
export type PurchaseTokenState = 'valid' | 'used' | 'expired' | 'not_found'

// Shape of a draw winner entry (used by the admin draw page + confirm API)
export interface DrawWinner {
  member_id:    string
  email:        string
  type:         'pair_primary' | 'pair_secondary' | 'single'
  companion_id: string | null   // companion's member_id if applicable
  token?:       string          // populated after tokens are generated
  purchase_url?: string         // populated after tokens are generated
}
