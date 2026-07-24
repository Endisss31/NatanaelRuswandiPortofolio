import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL || ''
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const realUrl = 'https://vfiukpcoerdahpnydahk.supabase.co'
const realKey = 'sb_publishable_oEUXApGED0omYJMdB3O9tA_No3h-gY_'

const supabaseUrl = (rawUrl && rawUrl !== 'https://your-project-id.supabase.co') ? rawUrl : realUrl
const supabaseAnonKey = (rawKey && rawKey !== 'your-supabase-anon-key') ? rawKey : realKey

export const isSupabaseConfigured = true

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

