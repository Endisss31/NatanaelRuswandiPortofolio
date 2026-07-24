import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vfiukpcoerdahpnydahk.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_oEUXApGED0omYJMdB3O9tA_No3h-gY_'

// Check if credentials are valid/provided before creating the client
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your-supabase-anon-key'
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

