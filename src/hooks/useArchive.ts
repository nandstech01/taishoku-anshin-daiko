import { useState, useEffect } from 'react';
import type { BlogPost } from '@/types/blog';

interface ArchivedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  timestamp: number;
  tags: string[];
}

const ARCHIVE_KEY = 'blog_archived_posts';

export function useArchive() {
  const [archivedPosts, setArchivedPosts] = useState<ArchivedPost[]>([]);

  useEffect(() => {
    loadArchivedPosts();
  }, []);

  const loadArchivedPosts = () => {
    try {
      const archiveJson = localStorage.getItem(ARCHIVE_KEY);
      const archived = archiveJson ? JSON.parse(archiveJson) : {};
      setArchivedPosts(Object.values(archived));
    } catch (error) {
      console.error('Failed to load archived posts:', error);
      setArchivedPosts([]);
    }
  };

  const addToArchive = (post: BlogPost) => {
    try {
      const archiveJson = localStorage.getItem(ARCHIVE_KEY);
      const archived = archiveJson ? JSON.parse(archiveJson) : {};

      archived[post.slug] = {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        category: post.category?.name || '',
        timestamp: Date.now(),
        tags: post.tags || [],
      };

      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archived));
      loadArchivedPosts();
      return true;
    } catch (error) {
      console.error('Failed to add post to archive:', error);
      return false;
    }
  };

  const removeFromArchive = (postSlug: string) => {
    try {
      const archiveJson = localStorage.getItem(ARCHIVE_KEY);
      const archived = archiveJson ? JSON.parse(archiveJson) : {};

      delete archived[postSlug];

      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archived));
      loadArchivedPosts();
      return true;
    } catch (error) {
      console.error('Failed to remove post from archive:', error);
      return false;
    }
  };

  const removeMultipleFromArchive = (postSlugs: string[]) => {
    try {
      const archiveJson = localStorage.getItem(ARCHIVE_KEY);
      const archived = archiveJson ? JSON.parse(archiveJson) : {};

      postSlugs.forEach(slug => {
        delete archived[slug];
      });

      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archived));
      loadArchivedPosts();
      return true;
    } catch (error) {
      console.error('Failed to remove posts from archive:', error);
      return false;
    }
  };

  const isArchived = (postSlug: string) => {
    try {
      const archiveJson = localStorage.getItem(ARCHIVE_KEY);
      const archived = archiveJson ? JSON.parse(archiveJson) : {};
      return !!archived[postSlug];
    } catch (error) {
      console.error('Failed to check if post is archived:', error);
      return false;
    }
  };

  const clearArchive = () => {
    try {
      localStorage.setItem(ARCHIVE_KEY, JSON.stringify({}));
      loadArchivedPosts();
      return true;
    } catch (error) {
      console.error('Failed to clear archive:', error);
      return false;
    }
  };

  return {
    archivedPosts,
    addToArchive,
    removeFromArchive,
    removeMultipleFromArchive,
    isArchived,
    clearArchive,
  };
} 