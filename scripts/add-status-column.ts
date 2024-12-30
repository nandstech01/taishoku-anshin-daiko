import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function addStatusColumn() {
  const { data, error } = await supabase
    .rpc('exec', {
      query: 'ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS status text DEFAULT \'draft\';'
    })

  if (error) {
    console.error('Error adding status column:', error)
    return
  }

  console.log('Status column added successfully')
}

addStatusColumn() 