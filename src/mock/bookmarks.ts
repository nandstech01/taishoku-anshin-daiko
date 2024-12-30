import { Bookmark } from '@/types/blog';
import { mockPosts } from './posts';

export const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: '1',
    userId: 'guest',
    postId: '1',
    post: mockPosts[0],
    created: '2023-12-25T10:00:00Z'
  },
  {
    id: '2',
    userId: 'guest',
    postId: '3',
    post: mockPosts[2],
    created: '2023-12-26T15:30:00Z'
  },
  {
    id: '3',
    userId: 'guest',
    postId: '5',
    post: mockPosts[4],
    created: '2023-12-27T09:15:00Z'
  }
]; 