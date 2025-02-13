import { supabase } from '@/lib/supabase/supabase';
import type { BlogPost, Category } from '@/types/blog';

export async function getPostWithCategory(slug: string) {
  try {
    const [postResult, categoryResult] = await Promise.all([
      supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          slug,
          status,
          views,
          tags,
          likes,
          published_at,
          created_at,
          updated_at,
          thumbnail_url,
          meta_description,
          seo_keywords,
          category_slug,
          description
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single(),
      
      // カテゴリー情報は投稿データ取得後に取得
      supabase
        .from('categories')
        .select('*')
    ]);

    if (postResult.error) {
      throw postResult.error;
    }

    const post = postResult.data;
    if (!post) {
      return { post: null, category: null, error: null };
    }

    // 投稿に関連するカテゴリーのみをフィルタリング
    const category = categoryResult.data?.find(cat => cat.slug === post.category_slug);

    const postWithCategory: BlogPost = {
      ...post,
      category: category as Category | null,
      description: post.description || null,
      seo_keywords: post.seo_keywords || [],
      tags: post.tags || [],
      category_id: category?.id || null,
      thumbnail_variants: null
    };

    return {
      post: postWithCategory,
      category: category,
      error: null
    };
  } catch (error) {
    console.error('Error fetching post with category:', error);
    return {
      post: null,
      category: null,
      error
    };
  }
}

export async function getRelatedPosts(categorySlug: string, currentPostId: string) {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        slug,
        status,
        views,
        tags,
        likes,
        published_at,
        created_at,
        updated_at,
        thumbnail_url,
        description,
        category_slug,
        seo_keywords
      `)
      .eq('category_slug', categorySlug)
      .eq('status', 'published')
      .neq('id', currentPostId)
      .order('published_at', { ascending: false })
      .limit(3);

    if (error) {
      throw error;
    }

    // カテゴリー情報を取得
    const { data: categories } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', categorySlug);

    const category = categories?.[0] || null;

    // 投稿データを整形
    const formattedPosts: BlogPost[] = (posts || []).map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      slug: post.slug,
      status: post.status,
      views: post.views || 0,
      likes: post.likes || 0,
      published_at: post.published_at,
      created_at: post.created_at,
      updated_at: post.updated_at,
      thumbnail_url: post.thumbnail_url,
      description: post.description || null,
      category_slug: post.category_slug,
      tags: post.tags || [],
      seo_keywords: post.seo_keywords || [],
      category: category ? {
        id: category.id,
        name: category.name,
        slug: category.slug
      } : null,
      thumbnail_variants: null,
      category_id: category?.id || null
    }));

    return {
      posts: formattedPosts,
      error: null
    };
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return {
      posts: [],
      error
    };
  }
} 