import { createClient } from '@supabase/supabase-js';
import { mockPosts } from '../../mock/posts.js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedPosts() {
  try {
    // Get admin user
    const { data: adminUser, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('name', 'Administrator')
      .single();

    if (userError || !adminUser) {
      throw new Error('Admin user not found');
    }

    // Get all categories
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('id, name');

    if (categoryError || !categories) {
      throw new Error('Categories not found');
    }

    // Prepare posts data
    const postsData = mockPosts.map(post => {
      // Find matching category
      const category = categories.find(c => c.name === post.category.name);
      if (!category) {
        console.warn(`Category not found for post: ${post.title}`);
      }

      return {
        title: post.title,
        content: post.content,
        slug: post.slug,
        excerpt: post.excerpt,
        published_at: post.published,
        category_id: category?.id || null,
        author_id: adminUser.id,
        tags: [],
        views: post.views,
        likes: post.likes,
        share_count: post.shareCount
      };
    });

    // Insert posts
    const { data: insertedPosts, error: insertError } = await supabase
      .from('posts')
      .insert(postsData)
      .select();

    if (insertError) {
      throw insertError;
    }

    console.log(`Successfully inserted ${insertedPosts.length} posts`);

  } catch (error) {
    console.error('Error seeding posts:', error);
  }
}

// Run the seed
seedPosts().catch(console.error); 