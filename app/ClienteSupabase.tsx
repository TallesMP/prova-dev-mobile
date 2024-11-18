import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'SuaURL'
const supabaseKey = 'SuaChave'
export const supabase = createClient(supabaseUrl, supabaseKey);
