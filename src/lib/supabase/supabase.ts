import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// シングルトンインスタンスを保持
let supabaseInstance: SupabaseClient<Database> | null = null;

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true
      }
    });
  }
  return supabaseInstance;
})();

// サーバーコンポーネント用のクライアント作成関数
export const createClient = (): SupabaseClient<Database> => {
  return supabase;
}; 