import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/supabase';
import { parseMarkdown } from '@/utils/markdown';
import TableOfContents from '@/components/TableOfContents';
import RelatedPosts from '@/components/RelatedPosts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  description?: string;
  thumbnail_url?: string;
  category_slug?: string;
  status: string;
  views: number;
  slug: string;
  tags?: string[];
  seo_keywords?: string[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Tag {
  name: string;
  slug: string;
}

interface PostTagResponse {
  tag_id: number;
  tags: Tag;
}

interface TagResponse {
  tag_slug: string;
  tags: {
    name: string;
    slug: string;
  }[];
}

// キャッシュを無効化
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: post, error: metaError } = await supabase
    .from('posts')
    .select('title, description')
    .eq('slug', params.slug)
    .single();

  console.log('Metadata fetch:', { slug: params.slug, post, error: metaError });

  if (!post || metaError) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  console.log('Rendering BlogPostPage with slug:', params.slug);
  
  const supabase = createClient();
  
  // 現在の記事を取得
  const postResponse = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  const { data: post, error } = postResponse as { data: Post | null; error: any };

  // タグを取得
  const [categoryResponse, tagsResponse] = await Promise.all([
    supabase
      .from('categories')
      .select('*'),
    Promise.resolve({ 
      data: post?.seo_keywords?.map((keyword: string) => ({ 
        name: keyword, 
        slug: keyword.toLowerCase().replace(/\s+/g, '-')
      })) || [], 
      error: null 
    })
  ]);

  console.log('Debug - Post Data:', {
    post,
    post_id: post?.id,
    has_post: !!post,
    tags: post?.seo_keywords
  });

  console.log('Debug - Tags Query:', {
    seo_keywords: post?.seo_keywords,
    response: tagsResponse,
    error: tagsResponse.error ?? null
  });

  const categories = (categoryResponse.data || []) as Category[];
  const category = categories.find(cat => cat.slug === post?.category_slug);
  
  let tags: Tag[] = [];
  try {
    const rawTagsData = tagsResponse.data || [];
    console.log('Debug - Tag Processing:', {
      rawTagsDataLength: rawTagsData.length,
      firstTagRaw: rawTagsData[0],
      tagsData: rawTagsData,
      seoKeywords: post?.seo_keywords
    });

    tags = rawTagsData;
  } catch (error) {
    console.error('Error processing tags:', error);
    console.error('Error details:', {
      error,
      stack: error instanceof Error ? error.stack : undefined
    });
  }

  console.log('Post fetch:', { post, error });

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
    console.log('Post not found');
    return notFound();
  }

  // 関連記事データを取得
  const [popularPostsResponse, recentPostsResponse, columnPostsResponse] = await Promise.all([
    // 人気記事（views数の多い順）
    supabase
      .from('posts')
      .select('*')
      .neq('id', post.id)
      .eq('status', 'published')
      .order('views', { ascending: false })
      .limit(3),
    
    // 新着記事（作成日時の新しい順）
    supabase
      .from('posts')
      .select('*')
      .neq('id', post.id)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(3),
    
    // コラム記事（カテゴリがコラムのもの）
    supabase
      .from('posts')
      .select('*')
      .neq('id', post.id)
      .eq('status', 'published')
      .eq('category_slug', 'column')
      .order('created_at', { ascending: false })
      .limit(3)
  ]);

  try {
    const { html, headings } = await parseMarkdown(post.content || '');
    console.log('Markdown parsed:', { 
      headingsCount: headings.length,
      headings: JSON.stringify(headings, null, 2),
      content: post.content
    });

    const shareUrl = `https://taishoku-anshin.com/blog/${post.slug}`;
    const shareText = `${post.title}\n\n`;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              {tags.length > 0 && (
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
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: html }} 
          />

          {/* 下部シェアボタン */}
          <div className="blog-share-buttons border-t border-b border-gray-200 py-8 justify-center">
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

          {/* 関連記事セクション */}
          <RelatedPosts
            popularPosts={popularPostsResponse.data || []}
            recentPosts={recentPostsResponse.data || []}
            columnPosts={columnPostsResponse.data || []}
            currentPostId={post.id.toString()}
          />
        </article>
      </div>
    );
  } catch (parseError) {
    console.error('Error parsing markdown:', parseError);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-red-500">
          <h1 className="text-2xl font-bold mb-4">コンテンツの読み込みに失敗しました</h1>
          <p>申し訳ありませんが、記事の内容の読み込み中にエラーが発生しました。</p>
        </div>
      </div>
    );
  }
} 