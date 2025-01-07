import type { Bookmark } from '@/types/blog';

export const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: '1',
    title: '退職代行サービスの選び方',
    description: '退職代行サービスを選ぶ際のポイントや注意点について解説します。',
    thumbnail_url: '/images/article-1.jpg',
    created_at: '2023-12-01',
    url: '/blog/how-to-choose-service'
  },
  {
    id: '2',
    title: 'メンタルヘルスケアの重要性',
    description: '職場でのメンタルヘルスケアの重要性と対策について解説します。',
    thumbnail_url: '/images/article-2.jpg',
    created_at: '2023-12-02',
    url: '/blog/mental-health-care'
  },
  {
    id: '3',
    title: '労働法の基礎知識',
    description: '知っておくべき労働法の基礎知識について解説します。',
    thumbnail_url: '/images/article-3.jpg',
    created_at: '2023-12-03',
    url: '/blog/labor-law-basics'
  }
]; 