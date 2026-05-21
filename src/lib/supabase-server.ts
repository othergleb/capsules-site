// Server-side Supabase client — uses the service role key so it bypasses RLS.
// Only ever import this in API routes or Server Components, never in client components.

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables. Check .env.local')
  }

  return createSupabaseClient<Database>(url, key, {
    auth: { persistSession: false },
  })
}
