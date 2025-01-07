import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/supabase';
import { parseMarkdown } from '@/utils/markdown';
import TableOfContents from '@/components/TableOfContents';
import RelatedPosts from '@/components/RelatedPosts';
import { PageViewTracker } from '@/components/blog/PageViewTracker';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Database } from '@/lib/supabase/database.types';
import { MessageCircle, Mail } from 'lucide-react';
import Footer from '@/components/common/Footer';
import { generateArticleSchema } from '@/schemas/article';
import { generateBreadcrumbSchema } from '@/schemas/breadcrumb';

type Post = Database['public']['Tables']['posts']['Row'] & {
  description?: string;
  thumbnail_url?: string;
  category_slug?: string;
  status: string;
  views: number;
  tags?: string[];
  seo_keywords?: string[];
  category?: Category;
};

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Tag {
  name: string;
  slug: string;
}

// キャッシュを無効化
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: post, error: metaError } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', params.slug)
    .single();

  if (!post || metaError) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  // Generate breadcrumb items
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: 'ブログ', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ];

  // Generate structured data
  const structuredData = [
    generateArticleSchema(post, baseUrl),
    generateBreadcrumbSchema(breadcrumbItems, baseUrl)
  ];

  return {
    title: post.title || 'Blog Post',
    description: post.description || '',
    keywords: post.seo_keywords?.join(', ') || '',
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description || '',
      url: `${baseUrl}/blog/${post.slug}`,
      type: 'article',
      images: post.thumbnail_url ? [{ url: post.thumbnail_url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || '',
      images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
    },
    other: {
      'script:ld+json': structuredData.map(data => JSON.stringify(data))
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  const postResponse = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', params.slug)
    .single();

  const { data: post, error } = postResponse;

  if (error) {
    console.error('Error fetching post:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-red-500">
          <h1 className="text-2xl font-bold mb-4">記事の読み込みに失敗しました</h1>
          <p>申し訳ありませんが、記事の読み込み中にエラーが発生しました。</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  const [categoryResponse, tagsResponse] = await Promise.all([
    supabase
      .from('categories')
      .select('*'),
    Promise.resolve({ 
      data: post.seo_keywords?.map((keyword: string) => ({ 
        name: keyword, 
        slug: keyword.toLowerCase().replace(/\s+/g, '-')
      })) || [], 
      error: null 
    })
  ]);

  const categories = (categoryResponse.data || []) as Category[];
  const category = categories.find(cat => cat.slug === post.category_slug);
  const tags = tagsResponse.data as Tag[];

  // 同じカテゴリの関連記事を取得
  const { data: relatedPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('category_slug', post.category_slug)
    .neq('slug', post.slug)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(3);

  try {
    const { html, headings } = await parseMarkdown(post.content || '');
    const shareUrl = `https://taishoku-anshin.com/blog/${post.slug}`;
    const shareText = `${post.title}\n\n`;

    return (
      <div className="blog-container">
        <div className="blog-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <PageViewTracker slug={params.slug} page_type="blog_post" />
            <article>
              <header className="mb-8">
                {category && (
                  <Link href={`/blog/category/${category.slug}`} className="blog-category mb-4">
                    {category.name}
                  </Link>
                )}
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="blog-meta">
                  <div className="blog-date">
                    {new Date(post.created_at).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  {tags?.length > 0 && (
                    <div className="blog-tags-section">
                      <div className="blog-tags">
                        {tags.map((tag) => (
                          <Link
                            key={tag.slug}
                            href={`/blog/tag/${tag.slug}`}
                            className="blog-tag"
                            aria-label={`${tag.name}のタグが付いた記事一覧を見る`}
                          >
                            {tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {post.thumbnail_url && (
                  <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden">
                    <Image
                      src={post.thumbnail_url}
                      alt={post.title}
                      width={1200}
                      height={675}
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
              </header>

              {/* 上部シェアボタン */}
              <div className="blog-share-buttons">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-button twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X でシェア
                </a>
                <a
                  href={`https://line.me/R/msg/text/?${encodeURIComponent(shareText + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-button line"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.84 14.52C16.51 15.03 15.94 15.59 15.35 15.95C14.49 16.47 13.5 16.85 12.45 16.85C11.88 16.85 11.33 16.77 10.8 16.61C9.78 16.3 8.81 15.79 7.94 15.12C6.54 14.06 5.5 12.66 4.95 11.06C4.67 10.25 4.51 9.4 4.51 8.54C4.51 7.02 5.16 5.64 6.28 4.63C7.4 3.62 8.92 3 10.57 3H13.43C15.08 3 16.6 3.62 17.72 4.63C18.84 5.64 19.49 7.02 19.49 8.54C19.49 9.4 19.33 10.25 19.05 11.06C18.5 12.66 17.46 14.06 16.84 14.52Z"/>
                    <path d="M16.42 11.38C16.42 11.15 16.23 10.97 16 10.97H14.97L15.17 9.93C15.21 9.71 15.05 9.5 14.83 9.46C14.61 9.42 14.4 9.58 14.36 9.8L14.12 11.02H12.54L12.74 9.98C12.78 9.76 12.62 9.55 12.4 9.51C12.18 9.47 11.97 9.63 11.93 9.85L11.69 11.07H10.58C10.35 11.07 10.17 11.25 10.17 11.48C10.17 11.71 10.35 11.89 10.58 11.89H11.57L11.33 13.03H10.22C9.99 13.03 9.81 13.21 9.81 13.44C9.81 13.67 9.99 13.85 10.22 13.85H11.21L11.01 14.89C10.97 15.11 11.13 15.32 11.35 15.36C11.37 15.36 11.39 15.37 11.42 15.37C11.61 15.37 11.78 15.23 11.82 15.04L12.06 13.82H13.64L13.44 14.86C13.4 15.08 13.56 15.29 13.78 15.33C13.8 15.33 13.82 15.34 13.85 15.34C14.04 15.34 14.21 15.2 14.25 15.01L14.49 13.79H15.52C15.75 13.79 15.93 13.61 15.93 13.38C15.93 13.15 15.75 12.97 15.52 12.97H14.61L14.85 11.83H15.88C16.11 11.83 16.29 11.65 16.29 11.42L16.42 11.38ZM13.76 11.83L13.52 12.97H11.94L12.18 11.83H13.76Z"/>
                  </svg>
                  LINE でシェア
                </a>
              </div>

              {/* 目次 */}
              <TableOfContents items={headings} />

              {/* リード文 */}
              {post.description && (
                <div className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {post.description}
                </div>
              )}

              {/* 本文 */}
              <div className="blog-content prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>

              {/* 関連記事 */}
              <RelatedPosts relatedPosts={relatedPosts || []} />

              {/* Categories Section */}
              <section className="blog-categories mt-12 mb-24">
                <h2 className="blog-tags-title">CATEGORIES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/blog/category/${category.slug}`}
                      className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Tags Section */}
              <section className="blog-tags-section mt-24 mb-24">
                <h2 className="blog-tags-title">TAGS</h2>
                <div className="blog-tags max-w-4xl mx-auto px-4">
                  {tags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/blog/tag/${tag.slug}`}
                      className="blog-tag"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Career Support */}
              <section className="blog-career mt-24">
                <h2 className="blog-career-title">キャリアサポートのお知らせ</h2>
                <Link href="https://nands.tech/" target="_blank" rel="noopener noreferrer" className="block">
                  <div className="blog-career-card">
                    <Image
                      src="/images/career-support.jpg"
                      alt="Career Support"
                      width={600}
                      height={300}
                      className="blog-career-image"
                    />
                    <div className="blog-career-content">
                      退職あんしん代行を運営する「株式会社エヌアンドエス」では、
                      AI時代に合わせた副業・リスキリング支援プログラムを開始しました。
                      退職後のキャリア形成を一緒に考えませんか？
                    </div>
                  </div>
                </Link>
              </section>

              {/* Contact Section */}
              <section className="blog-contact mt-24 mb-24">
                <h2 className="blog-tags-title">ご相談はこちら</h2>
                <div className="blog-contact-grid">
                  {/* LINE相談 */}
                  <div className="blog-contact-card text-center">
                    <MessageCircle className="w-12 h-12 text-[#06C755] mx-auto mb-2" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      公式LINEでお気軽に相談
                    </h4>
                    <p className="text-gray-600 mb-4">
                      LINEなら、いつでも気軽にご相談いただけます
                    </p>
                    <a
                      href="https://lin.ee/h1kk42r"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#06C755] hover:bg-[#05b34c] text-white text-lg font-bold py-4 px-6 rounded-lg text-center transition-colors"
                    >
                      LINEで相談する
                    </a>
                  </div>

                  {/* メール相談 */}
                  <a href="mailto:contact@taishoku-anshin-daiko.com" className="blog-contact-card text-center">
                    <Mail className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      メールでのご相談
                    </h4>
                    <p className="text-lg text-gray-600">24時間受付中</p>
                  </a>
                </div>
              </section>
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error rendering post:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-red-500">
          <h1 className="text-2xl font-bold mb-4">記事の表示に失敗しました</h1>
          <p>申し訳ありませんが、記事の表示中にエラーが発生しました。</p>
        </div>
      </div>
    );
  }
} 