import { Post, Category } from '@/types/blog';
import { normalizeTag, normalizeCategory, normalizePath } from './url';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

/**
 * 日時をISO 8601形式に変換する（YYYY-MM-DDThh:mm:ssZ）
 */
function formatDateTime(date: Date): string {
  return date.toISOString();
}

/**
 * 更新頻度を計算する
 * @param lastModified 最終更新日時
 */
function calculateChangeFreq(lastModified: string): string {
  const now = new Date();
  const modDate = new Date(lastModified);
  const diffDays = Math.floor((now.getTime() - modDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 7) return 'daily';
  if (diffDays < 30) return 'weekly';
  if (diffDays < 90) return 'monthly';
  return 'yearly';
}

/**
 * サイトマップXMLを生成する
 */
export function generateSitemapXml(
  baseUrl: string,
  posts: Post[],
  categories: Category[]
): string {
  const urls: SitemapUrl[] = [];
  const now = new Date();

  // 固定ページの追加
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'daily' },
    { path: 'blog', priority: 0.9, changefreq: 'daily' },
    { path: 'blog/categories', priority: 0.8, changefreq: 'weekly' },
    { path: 'about', priority: 0.8, changefreq: 'monthly' },
    { path: 'privacy', priority: 0.5, changefreq: 'monthly' },
    { path: 'terms', priority: 0.5, changefreq: 'monthly' },
    { path: 'legal', priority: 0.5, changefreq: 'monthly' },
    { path: 'faq', priority: 0.8, changefreq: 'weekly' },
  ];

  // 固定ページのURL生成
  staticPages.forEach(({ path, priority, changefreq }) => {
    urls.push({
      loc: `${baseUrl}/${path}`.replace(/\/$/, ''),
      lastmod: formatDateTime(now),
      changefreq,
      priority,
    });
  });

  // ブログ記事のURL生成
  posts.forEach((post) => {
    if (post.status === 'published') {
      const lastmod = post.updated_at || post.published_at || post.created_at;
      const modDate = lastmod ? new Date(lastmod) : now;
      
      urls.push({
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod: formatDateTime(modDate),
        changefreq: calculateChangeFreq(modDate.toISOString()),
        priority: 0.8,
      });

      // 記事に関連するタグのURL生成
      if (post.seo_keywords) {
        post.seo_keywords.forEach((tag) => {
          const normalizedTag = normalizeTag(tag);
          urls.push({
            loc: `${baseUrl}/blog/tags/${encodeURIComponent(normalizedTag)}`,
            lastmod: formatDateTime(modDate),
            changefreq: 'weekly',
            priority: 0.7,
          });
        });
      }
    }
  });

  // カテゴリーページのURL生成
  categories.forEach((category) => {
    const normalizedCategory = normalizeCategory(category.slug);
    urls.push({
      loc: `${baseUrl}/blog/category/${normalizedCategory}`,
      lastmod: formatDateTime(now),
      changefreq: 'weekly',
      priority: 0.7,
    });
  });

  // 重複URLの削除（正規化後のURLで比較）
  const uniqueUrls = Array.from(
    new Map(urls.map(url => [normalizePath(url.loc), url])).values()
  );

  // XMLの生成
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${uniqueUrls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`
    )
    .join('')}
</urlset>`;

  return xml;
} 