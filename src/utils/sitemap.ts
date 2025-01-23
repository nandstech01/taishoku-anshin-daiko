interface BlogPost {
  slug: string;
  published_at: string;
  updated_at?: string;
  seo_keywords?: string[];
}

interface BlogCategory {
  slug: string;
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemapXml = (
  baseUrl: string,
  posts: BlogPost[],
  categories: BlogCategory[]
): string => {
  const today = new Date().toISOString().split('T')[0];
  
  const tags = Array.from(new Set(
    posts.flatMap(post => post.seo_keywords || [])
  ));

  const entries: SitemapEntry[] = [
    // 固定ページ
    {
      loc: baseUrl,
      lastmod: today,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/blog/categories`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.8
    },
    // その他の固定ページ
    ...['about', 'privacy', 'terms', 'legal', 'faq'].map(page => ({
      loc: `${baseUrl}/${page}`,
      lastmod: today,
      changefreq: 'monthly' as const,
      priority: page === 'about' || page === 'faq' ? 0.8 : 0.5
    })),
    // ブログ記事
    ...posts.map(post => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.updated_at || post.published_at,
      changefreq: 'daily' as const,
      priority: 0.8
    })),
    // カテゴリーページ
    ...categories.map(category => ({
      loc: `${baseUrl}/blog/categories/${category.slug}`,
      lastmod: today,
      changefreq: 'daily' as const,
      priority: 0.7
    })),
    // タグページ
    ...tags.map(tag => {
      const relatedPosts = posts.filter(post => 
        post.seo_keywords?.includes(tag)
      );
      const lastmod = relatedPosts.reduce((latest, post) => {
        const postDate = post.updated_at || post.published_at;
        return postDate > latest ? postDate : latest;
      }, today);

      return {
        loc: `${baseUrl}/blog/tags/${encodeURIComponent(tag)}`,
        lastmod,
        changefreq: 'daily' as const,
        priority: 0.7
      };
    })
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}; 