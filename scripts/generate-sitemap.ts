import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { generateSitemapXml } from '../src/utils/sitemap';

// 環境変数の読み込み
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// 末尾のスラッシュを確実に削除したURLを使用
const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://taishoku-anshin-daiko.com').replace(/\/$/, '');

async function generateSitemap() {
  try {
    console.log('サイトマップの生成を開始します...');
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 記事データの取得
    console.log('ブログ記事データを取得中...');
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (postsError) {
      throw new Error(`記事データの取得中にエラーが発生しました: ${postsError.message}`);
    }

    // カテゴリーデータの取得
    console.log('カテゴリーデータを取得中...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (categoriesError) {
      throw new Error(`カテゴリーデータの取得中にエラーが発生しました: ${categoriesError.message}`);
    }

    if (!posts || !categories) {
      throw new Error('データの取得に失敗しました');
    }

    console.log(`取得完了: ${posts.length}件の記事, ${categories.length}件のカテゴリー`);

    // サイトマップの生成
    console.log('サイトマップXMLを生成中...');
    const sitemap = generateSitemapXml(baseUrl, posts, categories);

    // サイトマップの保存
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    console.log('サイトマップを生成しました:', sitemapPath);
    
    // robots.txtの更新
    const robotsTxtPath = path.join(process.cwd(), 'public', 'robots.txt');
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# 正規URLを指定
Sitemap: ${baseUrl}/sitemap.xml

# クロールレート制御
Crawl-delay: 1
`;

    fs.writeFileSync(robotsTxtPath, robotsTxt);
    console.log('robots.txtを更新しました:', robotsTxtPath);
  } catch (error) {
    console.error('サイトマップ生成中にエラーが発生しました:', error);
    process.exit(1);
  }
}

// サイトマップの生成を実行
generateSitemap(); 