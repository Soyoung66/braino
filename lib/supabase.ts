import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 키 없으면 앱이 안 터지고 데모 데이터로만 보이게
if (!url || !key) console.warn('.env.local에 supabase 키가 없어요 -> 데모 데이터로 보여요')

export const supabase = createClient(url || 'https://example.supabase.co', key || 'no-key')
export default supabase