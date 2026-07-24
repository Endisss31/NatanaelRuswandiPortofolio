import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if credentials are valid/provided before creating the client
export const isSupabaseConfigured =
  supabaseUrl &&
  supabaseUrl !== 'https://vfiukpcoerdahpnydahk.supabase.co' &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'sb_publishable_oEUXApGED0omYJMdB3O9tA_No3h-gY_';

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
