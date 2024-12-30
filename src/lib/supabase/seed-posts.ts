import { mockPosts } from '../../mock/posts';
import { supabase } from './supabase';

export const seedPosts = async () => {
  try {
    for (const post of mockPosts) {
      const { error } = await supabase
        .from('posts')
        .insert([post]);

      if (error) {
        console.error('Error seeding post:', error);
      }
    }
    console.log('Posts seeded successfully');
  } catch (error) {
    console.error('Error seeding posts:', error);
  }
}; 