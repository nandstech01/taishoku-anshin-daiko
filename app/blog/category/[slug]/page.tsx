import { Metadata } from 'next';
import { createClient } from '@/lib/supabase';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import Breadcrumbs, { Breadcrumb } from '@/components/common/Breadcrumbs';
import CategoryPosts from './CategoryPosts';
import RelatedCategories from './RelatedCategories';
import Script from 'next/script';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface Category {
  id: number;
  name: string;
  description: string | null;
  slug: string;
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        エラーが発生しました
      </h2>
      <p className="text-gray-600 mb-6">
        {error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
      >
        再試行
      </button>
    </div>
  );
}

interface Props {
  params: {
    slug: string;
  };
}

// メタデータを動的に生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  const { data: category } = await supabase
    .from('categories')
    .select('name, description')
    .eq('slug', params.slug)
    .single<Pick<Category, 'name' | 'description'>>();

  if (!category) {
    return {
      title: 'カテゴリが見つかりません',
      description: 'お探しのカテゴリページは存在しません。',
    };
  }

  const title = `${category.name}の記事一覧 | 退職代行なら退職安心代行`;
  const description = category.description || `${category.name}に関する記事の一覧です。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://taishoku-anshin-daiko.com/blog/category/${params.slug}`,
      siteName: '退職代行なら退職安心代行',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  console.log('CategoryPage rendering with slug:', params.slug);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryPosts slug={params.slug} />
    </div>
  );
} 