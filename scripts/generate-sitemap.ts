import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { generateSitemapXml } from '../src/utils/sitemap';

// 環境変数の読み込み
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;  // ANON_KEYを使用
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://taishoku-anshin-daiko.com';

async function generateSitemap() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 記事データの取得
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('slug, published_at, updated_at, seo_keywords')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (postsError) {
    console.error('Error fetching posts:', postsError);
    process.exit(1);
  }

  // カテゴリーデータの取得
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('slug')
    .order('name');

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
    process.exit(1);
  }

  // サイトマップの生成
  const sitemap = generateSitemapXml(baseUrl, posts, categories);

  // サイトマップの保存
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);

  console.log('Sitemap generated successfully at:', sitemapPath);
}

generateSitemap().catch(console.error); 