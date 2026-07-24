import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export async function saveProfile(data: Record<string, unknown>) {
  if (!supabase) return null
  const { data: result, error } = await supabase
    .from('profiles')
    .upsert(data, { onConflict: 'username' })
    .select()
    .single()
  if (error) {
    console.error('Supabase save error:', error)
    return null
  }
  return result
}

export async function getTopProfiles(limit = 20) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('overall_score', { ascending: false })
    .limit(limit)
  if (error) {
    console.error('Supabase fetch error:', error)
    return []
  }
  return data || []
}
