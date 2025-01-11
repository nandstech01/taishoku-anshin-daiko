import { createClient } from '@/lib/supabase/supabase';
import { processImage } from '@/utils/image';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const thumbnail = formData.get('thumbnail') as File;

    const supabase = createClient();

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