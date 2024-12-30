import { Comment } from '@/types/blog';

export const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    postSlug: 'how-to-resign',
    content: 'とても参考になりました！',
    authorId: '101',
    author: {
      id: '101',
      name: '佐藤一郎',
      email: 'sato.ichiro@example.com'
    },
    created_at: '2023-12-02T10:00:00Z',
    updated_at: '2023-12-02T10:00:00Z',
    isReported: false
  },
  {
    id: '2',
    postSlug: 'how-to-resign',
    content: '具体的な例があってわかりやすいです。',
    authorId: '102',
    author: {
      id: '102',
      name: '田中美咲',
      email: 'tanaka.misaki@example.com'
    },
    created_at: '2023-12-03T15:30:00Z',
    updated_at: '2023-12-03T15:30:00Z',
    isReported: false
  },
  {
    id: '3',
    postSlug: 'mental-health-at-work',
    content: '保険の説明がとてもわかりやすかったです。',
    authorId: '103',
    author: {
      id: '103',
      name: '高橋健一',
      email: 'takahashi.kenichi@example.com'
    },
    created_at: '2023-12-06T09:15:00Z',
    updated_at: '2023-12-06T09:15:00Z',
    isReported: true
  },
  {
    id: '4',
    postSlug: 'labor-law-basics',
    content: '実践的なアドバイスありがとうございます。',
    authorId: '104',
    author: {
      id: '104',
      name: '渡辺真理',
      email: 'watanabe.mari@example.com'
    },
    created_at: '2023-12-11T14:20:00Z',
    updated_at: '2023-12-11T14:20:00Z',
    isReported: false
  },
  {
    id: '5',
    postSlug: 'labor-law-basics',
    content: '計算例があってとても助かりました。',
    authorId: '105',
    author: {
      id: '105',
      name: '小林和子',
      email: 'kobayashi.kazuko@example.com'
    },
    created_at: '2023-12-16T11:45:00Z',
    updated_at: '2023-12-16T11:45:00Z',
    isReported: false
  }
]; 