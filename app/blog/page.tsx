import { Suspense } from 'react';
import { metadata } from './metadata';
import BlogContent from './BlogContent';

export { metadata };

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
} 