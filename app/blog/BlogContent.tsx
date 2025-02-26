'use client';

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import { supabase } from '@/lib/supabase/supabase';
import Footer from '@/components/common/Footer';
import './blog.css';
import Link from 'next/link';
import { PageViewTracker } from '@/components/blog/PageViewTracker';
import { PostgrestResponse } from '@supabase/supabase-js';
import { Phone, MessageCircle, Mail, Clock, Shield } from 'lucide-react';
import dynamic from 'next/dynamic';

// 診断セクションを動的インポート
const DiagnosisSection = dynamic(() => import('@/components/blog/DiagnosisSection'), { ssr: false });

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: string;
  views: number;
  tags?: string[];
  likes: number;
  published_at?: string;
  created_at: string;
  updated_at?: string;
  thumbnail_url?: string;
  meta_description?: string;
  seo_keywords?: string[];
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

interface RawPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: string;
  views: number | null;
  tags: string[] | null;
  likes: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  thumbnail_url: string | null;
  meta_description: string | null;
  seo_keywords: string[] | null;
  category_slug: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

const BlogStructuredData = ({ posts }: { posts: BlogPost[] }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "あんしん退職コラム",
    "description": "退職に関する不安や悩みを解消する情報メディア。退職のノウハウから、キャリアプランまで、あなたの新しい一歩をサポートします。",
    "url": "https://taishoku-anshin-daiko.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "NANDS 退職あんしん代行",
      "logo": {
        "@type": "ImageObject",
        "url": "https://taishoku-anshin-daiko.com/images/logo.svg"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.meta_description,
      "datePublished": post.published_at || post.created_at,
      "dateModified": post.updated_at || post.created_at,
      "url": `https://taishoku-anshin-daiko.com/blog/${post.slug}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://taishoku-anshin-daiko.com/blog/${post.slug}`
      },
      "image": post.thumbnail_url || "https://taishoku-anshin-daiko.com/images/ogp.jpg",
      "keywords": Array.isArray(post.seo_keywords) ? post.seo_keywords.join(",") : "",
      "author": {
        "@type": "Organization",
        "name": "NANDS 退職あんしん代行"
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

const BlogContent = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          supabase
            .from('posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(1),
          supabase
            .from('categories')
            .select('*')
            .order('id', { ascending: true }),
        ]);

        if (postsResponse.error) throw postsResponse.error;
        if (categoriesResponse.error) throw categoriesResponse.error;

        setPosts(postsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return null;

  // 人気記事を取得（views数でソート）
  const popularPosts = [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 1)[0];

  // タグ一覧を取得（全記事のタグを結合して重複を除去）
  const allTags = Array.from(
    new Map(
      posts.flatMap(post => 
        (post.seo_keywords || []).map(keyword => [
          keyword, // キーとして使用
          {
            name: keyword,
            slug: encodeURIComponent(keyword)
          }
        ])
      )
    ).values()
  ).filter(Boolean);

  // お知らせ記事を取得
  const newsArticles = posts.filter(post => post.category?.name === 'お知らせ').slice(0, 2);

  // ピックアップ記事の取得部分
  const pickupPosts = posts.slice(0, 12);

  return (
    <>
      <PageViewTracker page_type="blog_top" />
      <BlogStructuredData posts={posts} />
      
      <div className="blog-container">
        <div className="blog-content-wrapper">
          <div className="blog-marquee-container">
            <div className="blog-marquee-content">
              退職に関する不安や悩みを解消する情報メディア!!退職のノウハウから、キャリアプランまであなたの新しい一歩を、私たちがサポートします!!
            </div>
          </div>

          {/* Pickup Section as Banner */}
          <section className="blog-pickup">
            <div className="blog-pickup-inner">
              <div className="blog-pickup-header">
                <h2 className="blog-pickup-title">PICKUP</h2>
                <p className="blog-pickup-description">注目の記事をピックアップ</p>
              </div>
              <div className="blog-pickup-content">
                {posts.length > 0 && (
                  <Link href={`/blog/${posts[0].slug}/`} className="blog-pickup-card">
                    {posts[0].thumbnail_url && (
                      <div className="relative aspect-w-16 aspect-h-9">
                        <Image
                          src={posts[0].thumbnail_url}
                          alt={posts[0].title}
                          width={360}
                          height={240}
                          className="blog-pickup-image"
                          priority={true}
                          loading="eager"
                          quality={75}
                          sizes="360px"
                          style={{
                            objectFit: 'cover',
                            willChange: 'auto'
                          }}
                        />
                      </div>
                    )}
                    <div className="blog-pickup-content">
                      {posts[0].category && (
                        <span className="blog-category">{posts[0].category.name}</span>
                      )}
                      <h3 className="blog-pickup-heading">{posts[0].title}</h3>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </section>

          <main className="blog-main">
            {/* News Section */}
            <section className="blog-news">
              <h2 className="blog-news-title">News</h2>
              <div className="blog-news-list">
                <div><span className="blog-news-label">お知らせ</span>株式会社エヌアンドエスはAI副業支援プログラムを開始いたしました</div>
                <div><span className="blog-news-label">お知らせ</span>あんしん退職コラムオープンしました</div>
                {newsArticles.map((article) => (
                  <div key={article.slug}>
                    {new Date(article.published_at || article.created_at).toLocaleDateString('ja-JP')}　{article.title}
                  </div>
                ))}
              </div>
            </section>

            {/* Latest Posts */}
            <section className="blog-latest mt-12">
              <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
                NEW POSTS
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(0, 6).map((post, index) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                    <article className="blog-pickup-card hover-effect-card">
                      {post.thumbnail_url && (
                        <Image
                          src={post.thumbnail_url}
                          alt={post.title}
                          width={360}
                          height={202}
                          className="blog-pickup-image"
                          priority={index === 0}
                          sizes="360px"
                          quality={75}
                          loading={index === 0 ? "eager" : "lazy"}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                      )}
                      <div className="blog-pickup-content">
                        {post.category && (
                          <span className="blog-category">{post.category.name}</span>
                        )}
                        <h3 className="blog-pickup-heading">{post.title}</h3>
                        <time className="text-sm text-gray-500 mt-2 block">
                          {new Date(post.published_at || post.created_at).toLocaleDateString('ja-JP')}
                        </time>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            {/* 診断セクション */}
            <section className="mt-16">
              <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
                退職AI適性診断
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
              </h2>
              <DiagnosisSection />
            </section>

            {/* Categories Section */}
            <section className="blog-categories mt-16">
              <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
                CATEGORIES
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/blog/category/${category.slug}`}
                    className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>

            {/* Tags Section */}
            <section className="mt-16 mb-24">
              <h2 className="text-xl font-bold text-center mb-8 relative pb-3">
                TAGS
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></span>
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {allTags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/blog/tags/${tag.slug}`}
                    className="blog-tag inline-block px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* Career Support */}
            <section className="blog-career mt-24">
              <h2 className="blog-career-title">キャリアサポートのお知らせ</h2>
              <Link href="https://nands.tech/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="blog-career-card hover-effect-card">
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

            {/* Contact Section */}
            <section className="blog-contact mt-24 mb-24">
              <h2 className="blog-tags-title">ご相談はこちら</h2>
              <div className="blog-contact-grid">
                {/* 電話相談 */}
                <a href="tel:0120558551" className="blog-contact-card text-center hover-effect-card">
                  <Phone className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    お電話でのご相談
                  </h4>
                  <p className="blog-contact-value">0120-558-551</p>
                </a>

                {/* LINE相談 */}
                <div className="blog-contact-card text-center hover-effect-card">
                  <MessageCircle className="w-12 h-12 text-[#06C755] mx-auto mb-2" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    公式LINEでお気軽に相談
                  </h4>
                  <p className="text-gray-600 mb-4">
                    LINEなら、いつでも気軽にご相談いただけます
                  </p>
                  <a
                    href="https://lin.ee/h1kk42r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#06C755] hover:bg-[#05b34c] text-white text-lg font-bold py-4 px-6 rounded-lg text-center transition-colors"
                  >
                    LINEで相談する
                  </a>
                </div>

                {/* メール相談 */}
                <a href="mailto:contact@taishoku-anshin-daiko.com" className="blog-contact-card text-center hover-effect-card">
                  <Mail className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    メールでのご相談
                  </h4>
                  <p className="text-lg text-gray-600">24時間受付中</p>
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="blog-contact-card flex items-center gap-3">
                  <Clock className="w-6 h-6 text-orange-500" />
                  <p className="text-gray-900 font-medium">365日受付</p>
                </div>
                <div className="blog-contact-card flex items-center gap-3">
                  <Shield className="w-6 h-6 text-orange-500" />
                  <p className="text-gray-900 font-medium">相談無料</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BlogContent;