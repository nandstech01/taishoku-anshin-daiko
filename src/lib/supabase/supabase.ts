'use client';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// シングルトンインスタンスの作成
export const supabase = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'supabase-auth'
  }
});

export type SupabaseClientType = SupabaseClient<Database>; 