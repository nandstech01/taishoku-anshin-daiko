'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Post = {
  id: string;
  title: string;
  slug: string;
  thumbnail_url: string;
  views: number;
  created_at: string;
  category_slug: string;
};

type Props = {
  popularPosts: Post[];
  recentPosts: Post[];
  columnPosts: Post[];
  currentPostId?: string;
};

export default function RelatedPosts({ popularPosts, recentPosts, columnPosts, currentPostId }: Props) {
  const router = useRouter();

  const PostList = ({ posts, title, viewMoreLink }: { posts: Post[], title: string, viewMoreLink: string }) => (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link 
          href={viewMoreLink}
          className="text-orange-600 hover:text-orange-700 text-sm font-medium"
        >
          もっと見る →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <Link 
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={post.thumbnail_url || '/images/default-thumbnail.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-600 line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('ja-JP')}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-16">
      {/* シェアボタン（記事下部） */}
      <div className="flex items-center justify-center space-x-4 mb-16 border-t border-b border-gray-200 py-8">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X でシェア
        </a>
        <a
          href={`https://line.me/R/msg/text/?${encodeURIComponent(document.title + '\n' + window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-[#06C755] bg-white hover:bg-gray-50"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.84 14.52C16.51 15.03 15.94 15.59 15.35 15.95C14.49 16.47 13.5 16.85 12.45 16.85C11.88 16.85 11.33 16.77 10.8 16.61C9.78 16.3 8.81 15.79 7.94 15.12C6.54 14.06 5.5 12.66 4.95 11.06C4.67 10.25 4.51 9.4 4.51 8.54C4.51 7.02 5.16 5.64 6.28 4.63C7.4 3.62 8.92 3 10.57 3H13.43C15.08 3 16.6 3.62 17.72 4.63C18.84 5.64 19.49 7.02 19.49 8.54C19.49 9.4 19.33 10.25 19.05 11.06C18.5 12.66 17.46 14.06 16.84 14.52Z"/>
            <path d="M16.42 11.38C16.42 11.15 16.23 10.97 16 10.97H14.97L15.17 9.93C15.21 9.71 15.05 9.5 14.83 9.46C14.61 9.42 14.4 9.58 14.36 9.8L14.12 11.02H12.54L12.74 9.98C12.78 9.76 12.62 9.55 12.4 9.51C12.18 9.47 11.97 9.63 11.93 9.85L11.69 11.07H10.58C10.35 11.07 10.17 11.25 10.17 11.48C10.17 11.71 10.35 11.89 10.58 11.89H11.57L11.33 13.03H10.22C9.99 13.03 9.81 13.21 9.81 13.44C9.81 13.67 9.99 13.85 10.22 13.85H11.21L11.01 14.89C10.97 15.11 11.13 15.32 11.35 15.36C11.37 15.36 11.39 15.37 11.42 15.37C11.61 15.37 11.78 15.23 11.82 15.04L12.06 13.82H13.64L13.44 14.86C13.4 15.08 13.56 15.29 13.78 15.33C13.8 15.33 13.82 15.34 13.85 15.34C14.04 15.34 14.21 15.2 14.25 15.01L14.49 13.79H15.52C15.75 13.79 15.93 13.61 15.93 13.38C15.93 13.15 15.75 12.97 15.52 12.97H14.61L14.85 11.83H15.88C16.11 11.83 16.29 11.65 16.29 11.42L16.42 11.38ZM13.76 11.83L13.52 12.97H11.94L12.18 11.83H13.76Z"/>
          </svg>
          LINE でシェア
        </a>
      </div>

      {/* 人気の記事 */}
      <PostList
        posts={popularPosts}
        title="人気の記事"
        viewMoreLink="/blog/popular"
      />

      {/* 新着記事 */}
      <PostList
        posts={recentPosts}
        title="新着記事"
        viewMoreLink="/blog/recent"
      />

      {/* コラム一覧 */}
      <PostList
        posts={columnPosts}
        title="コラム一覧"
        viewMoreLink="/blog/columns"
      />
    </div>
  );
} 