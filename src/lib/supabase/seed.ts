import { mockPosts } from '../../mock/posts';
import { supabase } from './supabase';

export const seedDatabase = async () => {
  try {
    for (const post of mockPosts) {
      const { error } = await supabase
        .from('posts')
        .insert([post]);

      if (error) {
        console.error('Error seeding database:', error);
      }
    }
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}; 