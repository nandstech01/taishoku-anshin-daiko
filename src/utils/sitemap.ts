import { Post, Category } from '@/types/blog';
import { normalizeTag, normalizeCategory, normalizePath } from './url';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

/**
 * 現在の日付を取得する（YYYY-MM-DD形式）
 */
function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
  const today = getCurrentDate();

  // 固定ページの追加
  const staticPages = [
    { path: '', priority: 1.0 },
    { path: 'blog', priority: 0.9 },
    { path: 'blog/categories', priority: 0.8 },
    { path: 'about', priority: 0.8 },
    { path: 'privacy', priority: 0.5 },
    { path: 'terms', priority: 0.5 },
    { path: 'legal', priority: 0.5 },
    { path: 'faq', priority: 0.8 },
  ];

  // 固定ページのURL生成
  staticPages.forEach(({ path, priority }) => {
    urls.push({
      loc: `${baseUrl}/${path}`.replace(/\/$/, ''),
      lastmod: today,
      changefreq: path === '' ? 'daily' : 'monthly',
      priority,
    });
  });

  // ブログ記事のURL生成
  posts.forEach((post) => {
    if (post.status === 'published') {
      const lastmod = post.updated_at || post.published_at || post.created_at;
      urls.push({
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod: lastmod ? new Date(lastmod).toISOString().split('T')[0] : today,
        changefreq: 'daily',
        priority: 0.8,
      });

      // 記事に関連するタグのURL生成
      if (post.seo_keywords) {
        post.seo_keywords.forEach((tag) => {
          const normalizedTag = normalizeTag(tag);
          urls.push({
            loc: `${baseUrl}/blog/tags/${encodeURIComponent(normalizedTag)}`,
            lastmod: today,
            changefreq: 'daily',
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
      lastmod: today,
      changefreq: 'daily',
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