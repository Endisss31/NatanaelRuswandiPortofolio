import { createClient } from '@supabase/supabase-js'

const realUrl = 'https://vfiukpcoerdahpnydahk.supabase.co'
const realKey = 'sb_publishable_oEUXApGED0omYJMdB3O9tA_No3h-gY_'

const isValidUrl = (str) => {
  if (!str || typeof str !== 'string') return false
  try {
    const u = new URL(str)
    return (u.protocol === 'http:' || u.protocol === 'https:') && !str.includes('your-project-id')
  } catch (e) {
    return false
  }
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabaseUrl = isValidUrl(rawUrl) ? rawUrl : realUrl
const supabaseAnonKey = (rawKey && typeof rawKey === 'string' && rawKey.length > 10 && !rawKey.includes('your-supabase-anon-key')) ? rawKey : realKey

let client = null
try {
  client = createClient(supabaseUrl, supabaseAnonKey)
} catch (e) {
  console.warn("Primary Supabase client init notice, using default cloud fallback:", e)
  try {
    client = createClient(realUrl, realKey)
  } catch (e2) {
    console.error("Fallback Supabase client init error:", e2)
  }
}

export const isSupabaseConfigured = Boolean(client)
export const supabase = client

