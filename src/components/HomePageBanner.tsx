'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase';
import { Post, Category } from '@/src/lib/supabase/database.types';
import { PostgrestResponse } from '@supabase/supabase-js';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: string;
  views: number;
  thumbnail_url: string | null;
  meta_description: string | null;
  category_name: string | null;
  created_at: string;
}

interface RawPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: string;
  views: number;
  thumbnail_url: string | null;
  description: string | null;
  created_at: string;
  category_slug: string | null;
}

export default function HomePageBanner() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const supabase = createClient();
      
      try {
        // 最新の記事を3件取得
        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            content,
            slug,
            status,
            views,
            thumbnail_url,
            description,
            created_at,
            category_slug
          `)
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(3) as PostgrestResponse<RawPost>;

        if (postsError) {
          console.error('Error fetching posts:', postsError);
          return;
        }

        if (!posts || posts.length === 0) return;

        // カテゴリー情報を別途取得
        const { data: categories, error: categoriesError } = await supabase
          .from('categories')
          .select('*');

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError);
          return;
        }

        const formattedPosts = posts.map(post => {
          const category = categories?.find(cat => cat.slug === post.category_slug);
          return {
            id: post.id,
            title: post.title,
            content: post.content,
            slug: post.slug,
            status: post.status,
            views: post.views,
            thumbnail_url: post.thumbnail_url,
            meta_description: post.description,
            category_name: category?.name as string | null,
            created_at: post.created_at
          };
        });

        setLatestPosts(formattedPosts);
      } catch (error) {
        console.error('Failed to fetch latest posts:', error);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="hidden md:block">
      <motion.section 
        className="home-pickup home-pickup-top"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="home-pickup-inner">
          <div className="home-pickup-decorations">
            <motion.span 
              className="decoration-text decoration-career"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              CAREER
            </motion.span>
            <motion.span 
              className="decoration-text decoration-support"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              転職支援
            </motion.span>
            <motion.span 
              className="decoration-text decoration-career-jp"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              キャリア
            </motion.span>
            <motion.span 
              className="decoration-text decoration-success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              SUCCESS
            </motion.span>
            <motion.span 
              className="decoration-text decoration-retire"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              退職
            </motion.span>
          </div>
          <motion.div 
            className="blog-pickup-header"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="home-pickup-catch space-y-6">
              <div className="space-y-2">
                <p className="text-4xl font-bold tracking-tight">退職は手軽に</p>
                <p className="text-3xl font-bold tracking-tight">できる時代</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xl font-medium leading-relaxed">でも、あなたの今までの努力を</p>
                <p className="text-xl font-medium leading-relaxed">無駄にしない為に</p>
                <p className="text-2xl font-bold tracking-tight mt-2">より良い未来へ</p>
              </div>

              <div className="bg-white/95 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-2xl font-bold text-gray-900 tracking-tight">退職代行</p>
                <div className="mt-2">
                  <p className="text-4xl font-extrabold text-[#FF6B2B] tracking-tighter">
                    2,980<span className="text-2xl ml-1 font-bold">円</span>
                  </p>
                  <p className="text-sm font-bold text-[#FF6B2B] mt-1 tracking-wider">業界最安値</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base text-white/90 font-medium tracking-wide">
                  弁護士・社会保険労務士監修
                </p>
                
                <Link 
                  href="/line" 
                  className="inline-block bg-[#06C755] text-white font-bold py-4 px-10 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-lg tracking-wide"
                >
                  LINEで無料相談
                </Link>
              </div>
            </div>
          </motion.div>
          <div className="home-pickup-articles">
            {latestPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.4 + (index * 0.2),
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="home-pickup-article"
              >
                <Link href={`/blog/${post.slug}`} className="block home-pickup-card">
                  {post.thumbnail_url ? (
                    <Image
                      src={post.thumbnail_url}
                      alt={post.title}
                      width={600}
                      height={300}
                      className="home-pickup-image"
                    />
                  ) : (
                    <div className="home-pickup-image-placeholder" />
                  )}
                  <div className="home-pickup-content">
                    {post.category_name && (
                      <span className="blog-category">{post.category_name}</span>
                    )}
                    <h3 className="home-pickup-heading">{post.title}</h3>
                    <p className="home-pickup-excerpt">
                      {post.meta_description || post.content.slice(0, 150)}
                    </p>
                    <time className="text-sm text-gray-500 mt-2 block">
                      {new Date(post.created_at).toLocaleDateString('ja-JP')}
                    </time>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="home-news"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="home-news-title">News</h2>
        <div className="home-news-list">
          <div><span className="home-news-label">お知らせ</span>株式会社エヌアンドエスはAI副業支援プログラムを開始いたしました</div>
          <div><span className="home-news-label">お知らせ</span>あんしん退職コラムオープンしました</div>
        </div>
      </motion.section>
    </div>
  );
} 