import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let browserInstance: SupabaseClient<Database> | null = null;

const createInstance = () => {
  const options: SupabaseClientOptions<'public'> = {
    auth: {
      persistSession: typeof window !== 'undefined',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      detectSessionInUrl: false,
      autoRefreshToken: typeof window !== 'undefined',
      storageKey: 'taishoku-anshin-daiko-auth',
      flowType: 'pkce'
    }
  };

  return createSupabaseClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    options
  );
};

// シングルトンインスタンスを取得する関数
export const getSupabaseClient = () => {
  if (typeof window === 'undefined') {
    // サーバーサイドでは新しいインスタンスを作成
    return createInstance();
  }

  if (!browserInstance) {
    browserInstance = createInstance();
  }

  return browserInstance;
};

// 後方互換性のため維持（既存コードのため）
export const createClient = () => getSupabaseClient();

// メインのエクスポート - シングルトンインスタンス
export const supabase = getSupabaseClient();

// 型エクスポート（型安全性のため）
export type SupabaseClientType = SupabaseClient<Database>; 