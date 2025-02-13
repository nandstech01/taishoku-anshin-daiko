import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let supabaseInstance: SupabaseClient<Database> | null = null;

// シングルトンパターンを強化
export const createClient = () => {
  if (typeof window === 'undefined') {
    // サーバーサイドの場合は新しいインスタンスを作成
    return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false
      }
    });
  }

  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: 'taishoku-anshin-daiko-auth-token',
        storage: window.localStorage
      }
    });
  }
  return supabaseInstance;
};

// サーバーコンポーネント用のクライアント
export const supabase = createClient(); 