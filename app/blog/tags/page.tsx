import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/supabase';
import Breadcrumb from '@/components/blog/Breadcrumb';
import Link from 'next/link';
import { normalizeTag } from '@/utils/url';

export const metadata: Metadata = {
  title: '退職代行に関するタグ一覧 | 退職代行案内',
  description: '退職代行に関する記事のタグ一覧です。気になるタグをクリックして、関連する記事をご覧ください。',
  openGraph: {
    title: '退職代行に関するタグ一覧 | 退職代行案内',
    description: '退職代行に関する記事のタグ一覧です。気になるタグをクリックして、関連する記事をご覧ください。',
  },
};

export default async function TagsPage() {
  const supabase = createClient();

  try {
    // 公開済みの記事を全て取得
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('seo_keywords')
      .eq('status', 'published');

    if (postsError) {
      console.error('Error fetching posts:', postsError);
      throw new Error('記事の取得中にエラーが発生しました');
    }

    // 全記事からタグを抽出し、出現回数をカウント
    const tagCount = new Map<string, number>();
    posts.forEach(post => {
      if (post.seo_keywords) {
        post.seo_keywords.forEach((tag: string) => {
          const normalizedTag = normalizeTag(tag);
          tagCount.set(normalizedTag, (tagCount.get(normalizedTag) || 0) + 1);
        });
      }
    });

    // タグを出現回数でソート
    const sortedTags = Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));

    return (
      <div className="tags-page">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'ブログ', href: '/blog' },
            { label: 'タグ一覧' },
          ]}
        />
        
        <h1 className="text-2xl font-bold mb-6">
          <span className="block text-xl mb-1">退職代行に関する</span>
          <span className="block text-3xl">タグ一覧</span>
        </h1>

        <p className="text-gray-600 mb-8">
          記事に関連するタグの一覧です。気になるタグをクリックすると、関連する記事一覧をご覧いただけます。
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedTags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/blog/tags/${encodeURIComponent(tag)}`}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-lg mb-1">{tag}</div>
              <div className="text-sm text-gray-500">{count}件の記事</div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← ブログトップへ戻る
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in TagsPage:', error);
    return (
      <div className="error-page">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'ブログ', href: '/blog' },
            { label: 'タグ一覧' },
          ]}
        />
        <h1 className="text-2xl font-bold mb-4">タグ一覧</h1>
        <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
          申し訳ありませんが、タグ一覧の読み込み中にエラーが発生しました。
        </div>
        <div className="mt-4">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← ブログトップへ戻る
          </Link>
        </div>
      </div>
    );
  }
} 