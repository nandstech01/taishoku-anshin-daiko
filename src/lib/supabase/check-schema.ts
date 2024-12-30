import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '../../types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing environment variables');
}

const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  try {
    // 主要なテーブルを直接確認
    const tables = ['posts', 'categories', 'profiles', 'comments', 'likes', 'bookmarks'];

    for (const tableName of tables) {
      console.log(`\n=== Checking table: ${tableName} ===`);

      // テーブルの存在確認とサンプルデータの取得
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        console.error(`Error with table ${tableName}:`, error.message);
        continue;
      }

      if (data && data.length > 0) {
        console.log('Table exists with structure:', Object.keys(data[0]));
        console.log('Sample data:', data[0]);
      } else {
        console.log(`Table ${tableName} exists but is empty`);
      }

      // レコード数の取得
      const { count, error: countError } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.error(`Error counting records in ${tableName}:`, countError.message);
      } else {
        console.log(`Total records in ${tableName}: ${count}`);
      }
    }

  } catch (error) {
    console.error('Error checking schema:', error);
  }
}

// スクリプトの実行
checkSchema().catch(console.error); 