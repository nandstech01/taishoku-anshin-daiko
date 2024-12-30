import { supabase } from '@/lib/supabase';

export async function uploadImage(file: File): Promise<string> {
  try {
    // ファイル名をユニークにする
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    // 画像をリサイズ
    const resizedImage = await resizeImage(file, 1200, 600);

    // Supabaseストレージにアップロード
    const { error: uploadError } = await supabase.storage
      .from('blog')
      .upload(filePath, resizedImage);

    if (uploadError) {
      throw uploadError;
    }

    // 公開URLを取得
    const { data } = supabase.storage
      .from('blog')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

async function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // アスペクト比を維持しながらリサイズ
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to blob'));
          }
        },
        'image/jpeg',
        0.9
      );
    };
    img.onerror = () => reject(new Error('Failed to load image'));
  });
} 