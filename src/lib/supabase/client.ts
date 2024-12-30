import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '../../types/supabase';

export { createBrowserClient };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

// 認証関連のヘルパー関数
export const auth = {
  // サインアップ
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  // サインイン
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // サインアウト
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // 現在のセッション
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // ユーザー情報の取得
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },
};

// 投稿関連のヘルパー関数
export const posts = {
  // 投稿の作成
  create: async (data: {
    title: string;
    content: string;
    excerpt?: string;
    slug: string;
    published?: boolean;
  }) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      return { error: new Error('User not authenticated') };
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert([
        {
          ...data,
          author_id: userData.user.id,
        },
      ])
      .select()
      .single();

    return { data: post, error };
  },

  // 投稿の取得（単一）
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  },

  // 投稿の更新
  update: async (id: string, data: {
    title?: string;
    content?: string;
    excerpt?: string;
    slug?: string;
    published?: boolean;
  }) => {
    const { data: post, error } = await supabase
      .from('posts')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    return { data: post, error };
  },

  // 投稿の削除
  delete: async (id: string) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    return { error };
  },

  // 全投稿の取得
  getAll: async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error };
  },
}; 