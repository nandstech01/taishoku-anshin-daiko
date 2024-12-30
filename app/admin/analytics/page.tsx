'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/admin/Card';
import { Chart } from '@/components/admin/Chart';

interface PostAnalytics {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  status: 'published';
  published_at: string;
  created_at: string;
  updated_at: string;
  views: number;
  likes: number;
  comments: number;
}

export default function AnalyticsPage() {
  const [posts, setPosts] = useState<PostAnalytics[]>([]);

  useEffect(() => {
    // TODO: 実際のデータ取得処理に置き換える
    const mockPosts: PostAnalytics[] = [
      {
        id: '1',
        title: 'テスト記事1',
        slug: 'test-article-1',
        content: 'テスト記事1の本文',
        description: 'テスト記事1の説明',
        status: 'published',
        published_at: '2023-12-29',
        created_at: '2023-12-29',
        updated_at: '2023-12-29',
        views: 32,
        likes: 5,
        comments: 3,
      },
      {
        id: '2',
        title: 'テスト記事2',
        slug: 'test-article-2',
        content: 'テスト記事2の本文',
        description: 'テスト記事2の説明',
        status: 'published',
        published_at: '2023-12-28',
        created_at: '2023-12-28',
        updated_at: '2023-12-28',
        views: 45,
        likes: 8,
        comments: 6,
      },
      {
        id: '3',
        title: 'テスト記事3',
        slug: 'test-article-3',
        content: 'テスト記事3の本文',
        description: 'テスト記事3の説明',
        status: 'published',
        published_at: '2023-12-27',
        created_at: '2023-12-27',
        updated_at: '2023-12-27',
        views: 28,
        likes: 4,
        comments: 2,
      },
    ];

    setPosts(mockPosts);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">アナリティクス</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="総閲覧数" value={posts.reduce((sum, post) => sum + post.views, 0)} />
        <Card title="総いいね数" value={posts.reduce((sum, post) => sum + post.likes, 0)} />
        <Card title="総コメント数" value={posts.reduce((sum, post) => sum + post.comments, 0)} />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">閲覧数の推移</h2>
        <Chart
          data={posts.map(post => ({
            date: post.published_at,
            views: post.views
          }))}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">記事別の統計</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイトル
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  公開日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  閲覧数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  いいね数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  コメント数
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.published_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.likes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.comments}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 