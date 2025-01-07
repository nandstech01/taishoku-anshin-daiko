import { Suspense } from 'react';
import { metadata } from './metadata';
import CategoriesList from './CategoriesList';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import './categories.css';

export { metadata };

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageViewTracker />
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          カテゴリ一覧
        </h1>
        
        <div className="mb-6 text-gray-600">
          <p>
            退職に関する様々な情報をカテゴリ別に整理しています。
            気になるカテゴリから、あなたに必要な情報を見つけてください。
          </p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        }>
          <CategoriesList />
        </Suspense>
      </div>
    </div>
  );
} 