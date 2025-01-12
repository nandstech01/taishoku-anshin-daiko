import { Suspense } from 'react';
import { metadata } from './metadata';
import BlogContent from './BlogContent';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export { metadata };

export default function BlogPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BlogContent />
    </Suspense>
  );
} 