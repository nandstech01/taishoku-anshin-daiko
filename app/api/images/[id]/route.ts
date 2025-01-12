import { createClient } from '@/lib/supabase/supabase';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('post_images')
      .select('image_url, alt_text')
      .eq('id', params.id)
      .single();

    if (error || !data) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // リダイレクトで実際の画像URLを返す
    return NextResponse.redirect(data.image_url);
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 