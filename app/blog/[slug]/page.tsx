import { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import { parseMarkdown } from '@/utils/markdown';
import TableOfContents from '@/components/TableOfContents';
import RelatedPosts from '@/components/RelatedPosts';
import { PageViewTracker } from '@/components/blog/PageViewTracker';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Database, Post, Category } from '@/lib/supabase/database.types';
import { MessageCircle, Mail, Phone, Clock, Shield } from 'lucide-react';
import Footer from '@/components/common/Footer';
import { generateArticleSchema } from '@/schemas/article';
import { generateBreadcrumbSchema } from '@/schemas/breadcrumb';
import { AuthorInfo } from '@/components/blog/AuthorInfo';
import Breadcrumb from '@/components/blog/Breadcrumb';
import { RelatedTags } from '@/components/blog/RelatedTags';
import HeadingProcessor from '@/components/HeadingProcessor';
import ReviewSection from '@/components/blog/ReviewSection';
import BlogContentProcessor from '@/components/blog/BlogContent';
import { getPostWithCategory, getRelatedPosts } from '@/utils/blog-helpers';
import DiagnosisSection from '@/components/blog/DiagnosisSection';

// キャッシュを無効化
export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface Tag {
  name: string;
  slug: string;
}

// タグの正規化と変換（SEOに配慮）
const processTags = (tags: string[] | null): Tag[] => {
  if (!tags) return [];
  return tags.map(tag => ({
    name: tag,
    // URLに適した形式に変換しつつ、SEOに配慮したスラグを生成
    slug: encodeURIComponent(
      tag.toLowerCase()
         .trim()
         .replace(/\s+/g, '-')
         .replace(/　/g, '-')
    )
  }));
};

// SEOキーワードの処理
const processSeoKeywords = (keywords: string[] | null): Tag[] => {
  if (!keywords) return [];
  return keywords.map(keyword => ({
    name: keyword,
    slug: encodeURIComponent(keyword)
  }));
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://taishoku-anshin-daiko.com';
  const { post: postWithCategory, error } = await getPostWithCategory(params.slug);

  if (error || !postWithCategory) {
    return {
      title: 'ページが見つかりません | 退職あんしん代行',
      description: 'お探しのページは見つかりませんでした。',
      robots: {
        index: false,
        follow: true,
        nocache: true,
      }
    };
  }

  // Generate breadcrumb items for structured data
  const breadcrumbItemsForSchema = [
    { name: 'ホーム', url: '/' },
    { name: 'ブログ', url: '/blog' },
    ...(postWithCategory.category ? [
      { 
        name: postWithCategory.category.name, 
        url: `/blog/category/${postWithCategory.category.slug}` 
      }
    ] : []),
    { name: postWithCategory.title, url: `/blog/${postWithCategory.slug}` }
  ];

  // Generate structured data
  const structuredData = [
    generateArticleSchema(postWithCategory, baseUrl),
    generateBreadcrumbSchema(breadcrumbItemsForSchema, baseUrl)
  ];

  return {
    title: `${postWithCategory.title} | 退職あんしん代行`,
    description: postWithCategory.description || `${postWithCategory.title}に関する詳しい情報をご紹介します。`,
    keywords: [
      ...(postWithCategory.seo_keywords || []),
      ...(postWithCategory.tags || []),
      '退職代行',
      '退職相談',
      postWithCategory.category?.name
    ].filter(Boolean).join(', '),
    alternates: {
      canonical: `${baseUrl}/blog/${postWithCategory.slug}`,
      languages: {
        'ja-JP': `${baseUrl}/blog/${postWithCategory.slug}`,
      },
    },
    openGraph: {
      title: postWithCategory.title,
      description: postWithCategory.description || `${postWithCategory.title}に関する詳しい情報をご紹介します。`,
      url: `${baseUrl}/blog/${postWithCategory.slug}`,
      siteName: '退職あんしん代行',
      locale: 'ja_JP',
      type: 'article',
      images: postWithCategory.thumbnail_url ? [{
        url: postWithCategory.thumbnail_url,
        width: 1200,
        height: 630,
        alt: postWithCategory.title,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: postWithCategory.title,
      description: postWithCategory.description || `${postWithCategory.title}に関する詳しい情報をご紹介します。`,
      images: postWithCategory.thumbnail_url ? [postWithCategory.thumbnail_url] : undefined,
      site: '@taishoku_anshin',
      creator: '@taishoku_anshin',
    },
    other: {
      'application/ld+json': structuredData.map(item => JSON.stringify(item)).join('\n')
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { post: postWithCategory, error } = await getPostWithCategory(params.slug);

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

  if (!postWithCategory) {
    return notFound();
  }

  try {
    const { html, headings } = await parseMarkdown(postWithCategory.content || '');
    const tags = processTags(postWithCategory.tags);
    const seoKeywords = processSeoKeywords(postWithCategory.seo_keywords);
    const { posts: relatedPosts } = postWithCategory.category_slug
      ? await getRelatedPosts(postWithCategory.category_slug, postWithCategory.id)
      : { posts: [] };

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taishoku-anshin-daiko.com';
    const shareUrl = `${baseUrl}/blog/${postWithCategory.slug}`;
    const shareText = `${postWithCategory.title}\n\n`;

    // Generate breadcrumb items for UI
    const breadcrumbItems = [
      { label: 'ホーム', href: '/' },
      { label: 'ブログ', href: '/blog' },
      ...(postWithCategory.category ? [
        { 
          label: postWithCategory.category.name, 
          href: `/blog/category/${postWithCategory.category.slug}` 
        }
      ] : []),
      { label: postWithCategory.title, href: `/blog/${postWithCategory.slug}` }
    ];

    return (
      <>
        <div className="blog-container">
          <HeadingProcessor />
          <div className="blog-content">
            <article className="blog-post-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <Breadcrumb items={breadcrumbItems} />
              <PageViewTracker slug={params.slug} page_type="blog_post" />
              <header className="mb-8">
                {postWithCategory.category && (
                  <Link href={`/blog/category/${postWithCategory.category.slug}`} className="blog-category blog-post-category mb-4">
                    {postWithCategory.category.name}
                  </Link>
                )}
                <h1 className="text-4xl font-bold mb-4">{postWithCategory.title}</h1>
                <div className="blog-meta">
                  <div className="blog-date">
                    {new Date(postWithCategory.created_at).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  {tags?.length > 0 && (
                    <div className="blog-tags-section">
                      <div className="blog-tags">
                        {tags.map((tag: Tag) => (
                          <Link
                            key={tag.slug}
                            href={`/blog/tags/${encodeURIComponent(tag.name)}`}
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
                {postWithCategory.thumbnail_url && (
                  <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden">
                    <Image
                      src={postWithCategory.thumbnail_url}
                      alt={postWithCategory.title}
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

              {/* 診断セクション */}
              <DiagnosisSection />

              {/* レビューセクション */}
              <ReviewSection />

              {/* リード文 */}
              {postWithCategory.description && (
                <div className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {postWithCategory.description}
                </div>
              )}

              {/* 本文 */}
              <div className="prose mx-auto">
                <BlogContentProcessor content={html} />
              </div>

              {/* 著者情報 */}
              <AuthorInfo author={{
                name: '退職あんしん代行編集部',
                avatar: '/images/editorial/editorial-team.png'
              }} />

              {/* 関連記事 */}
              <RelatedPosts relatedPosts={relatedPosts || []} />

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
                  {/* 電話相談 */}
                  <a href="tel:0120558551" className="blog-contact-card text-center">
                    <Phone className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      お電話でのご相談
                    </h4>
                    <p className="blog-contact-value">0120-558-551</p>
                  </a>

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

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="blog-contact-card flex items-center gap-3">
                    <Clock className="w-6 h-6 text-orange-500" />
                    <p className="text-gray-900 font-medium">365日受付</p>
                  </div>
                  <div className="blog-contact-card flex items-center gap-3">
                    <Shield className="w-6 h-6 text-orange-500" />
                    <p className="text-gray-900 font-medium">相談無料</p>
                  </div>
                </div>
              </section>
            </article>
          </div>
          <Footer />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-red-500">
          <h1 className="text-2xl font-bold mb-4">記事の読み込みに失敗しました</h1>
          <p>申し訳ありませんが、記事の読み込み中にエラーが発生しました。</p>
        </div>
      </div>
    );
  }
} 