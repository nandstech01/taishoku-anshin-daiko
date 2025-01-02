'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import type { BlogPost } from '@/types/blog';
import { supabase } from '@/lib/supabase';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import './blog.css';
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            category:categories(name)
          `)
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
          throw error;
        }
        
        console.log('Fetched posts:', data);
        setPosts(data || []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
        <Footer />
      </>
    );
  }

  // 人気記事を取得（views数でソート）
  const popularPosts = [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 1)[0];

  // タグ一覧（カテゴリーから生成）
  const tags = Array.from(new Set(posts.map(post => post.category?.name).filter(Boolean)));

  // お知らせ記事を取得
  const newsArticles = posts.filter(post => post.category?.name === 'お知らせ').slice(0, 2);

  return (
    <>
      <Header />
      <div className="blog-container">
        <main>
          {/* PICKUP */}
          <section className="blog-pickup">
            <div className="blog-pickup-inner">
              <div className="blog-pickup-header">
                <h2 className="blog-pickup-title">PICKUP</h2>
                <p className="blog-pickup-description">注目の記事を厳選してお届け！</p>
                <div className="blog-pickup-catch">
                  <h3 className="text-xl font-bold mb-4">あんしん退職コラム</h3>
                  <p className="mb-2">退職に関する不安や悩みを解消する情報メディア</p>
                  <p className="mb-2">退職のノウハウから、キャリアプランまで</p>
                  <p>あなたの新しい一歩を、私たちがサポートします</p>
                </div>
              </div>
              {popularPosts && (
                <Link href={`/blog/${popularPosts.slug}`} className="block">
                  <div className="blog-pickup-card">
                    {popularPosts.thumbnail_url && (
                      <Image
                        src={popularPosts.thumbnail_url}
                        alt={popularPosts.title}
                        width={600}
                        height={300}
                        className="blog-pickup-image"
                      />
                    )}
                    <div className="blog-pickup-content">
                      <span className="blog-tag">
                        {popularPosts.category?.name}
                      </span>
                      <h3 className="blog-pickup-heading">{popularPosts.title}</h3>
                      <p className="blog-pickup-excerpt">
                        {popularPosts.meta_description || popularPosts.content.slice(0, 150)}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </section>

          {/* News Section */}
          <section className="blog-news">
            <h2 className="blog-news-title">ニュース・お知らせ</h2>
            <div className="blog-news-list">
              <div>2025.01.5　株式会社エヌアンドエスはAI副業支援プログラムを開始いたしました</div>
              <div>2025.01.3　あんしん退職コラムオープンしました</div>
              {newsArticles.map((article) => (
                <div key={article.slug}>
                  {new Date(article.published_at || article.created_at).toLocaleDateString('ja-JP')}　{article.title}
                </div>
              ))}
            </div>
          </section>

          {/* Latest Posts */}
          <section className="blog-latest">
            <h2 className="blog-latest-title">NEW POSTS</h2>
            <div className="blog-latest-list">
              {posts.slice(0, 5).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                  <article className="blog-latest-item">
                    <time className="blog-latest-date">
                      {new Date(post.published_at || post.created_at).toLocaleDateString('ja-JP')}
                    </time>
                    <div className="blog-latest-content-wrapper">
                      {post.thumbnail_url && (
                        <Image
                          src={post.thumbnail_url}
                          alt={post.title}
                          width={100}
                          height={50}
                          className="blog-latest-image"
                        />
                      )}
                      <div className="blog-latest-content">
                        <h3 className="blog-latest-heading">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <button className="blog-button">
              記事一覧を見る
            </button>
          </section>

          {/* Tags */}
          <section className="blog-tags">
            <h2 className="blog-tags-title">TAGS</h2>
            <div className="blog-tags-list">
              {tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Career Support */}
          <section className="blog-career">
            <h2 className="blog-career-title">キャリアサポートのお知らせ</h2>
            <Link href="https://nands.tech/" target="_blank" rel="noopener noreferrer" className="block">
              <div className="blog-career-card">
                <Image
                  src="/images/career-support.jpg"
                  alt="Career Support"
                  width={600}
                  height={300}
                  className="blog-career-image"
                />
                <div className="blog-career-content">
                  退職あんしん代行を運営する「株式会社エヌアンドエス」では、
                  AI時代に合わせた副業・リスキリング支援プログラムを開始しました。
                  退職後のキャリア形成を一緒に考えませんか？
                </div>
              </div>
            </Link>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
} 