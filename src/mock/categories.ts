import type { Category } from '@/types/blog';

export const BLOG_CATEGORIES: Category[] = [
  {
    id: '1',
    slug: 'resignation',
    name: '退職全般',
    description: '退職に関する一般的な情報'
  },
  {
    id: '2',
    slug: 'labor-law',
    name: '労働法規',
    description: '労働法に関する情報'
  },
  {
    id: '3',
    slug: 'mental-health',
    name: 'メンタルヘルス',
    description: '職場でのメンタルヘルスに関する情報'
  },
  {
    id: '4',
    slug: 'career-change',
    name: '転職',
    description: '転職に関する情報'
  },
  {
    id: '5',
    slug: 'workplace-issues',
    name: '職場の問題',
    description: '職場での問題に関する情報'
  }
]; 