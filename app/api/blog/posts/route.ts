import { processImage } from '@/utils/image';
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createServerClient();
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const thumbnail = formData.get('thumbnail') as File;

    // 画像の処理
    let thumbnailUrls: string[] = [];
    if (thumbnail) {
      const buffer = Buffer.from(await thumbnail.arrayBuffer());
      thumbnailUrls = await processImage(buffer, thumbnail.name);
    }

    // 記事の保存
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        thumbnail_url: thumbnailUrls[0], // 16:9の画像をメインとして使用
        thumbnail_variants: thumbnailUrls // 全てのバリアントを保存
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const supabase = createServerClient();
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // ... rest of the code ...
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
} 