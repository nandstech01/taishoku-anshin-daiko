import { supabase } from '@/lib/supabase/supabase';
import { optimizeImage } from '@/utils/image-optimizer';
import { uploadImage } from '@/utils/supabase-storage';
import { processBatch } from '@/utils/batch-processor';

export interface ImageUploadResult {
  id: string;
  url: string;
  alt_text: string;
  caption: string;
  display_order: number;
}

export interface ImageProcessOptions {
  postId: string;
  onProgress?: (fileName: string, progress: number) => void;
  onError?: (error: Error, fileName: string) => void;
}

export async function processImages(
  files: File[],
  options: ImageProcessOptions
): Promise<ImageUploadResult[]> {
  const { postId, onProgress, onError } = options;

  const processor = async (file: File) => {
    try {
      // 進捗状態の更新（開始）
      onProgress?.(file.name, 0);

      // 画像の最適化
      const optimized = await optimizeImage(file);
      onProgress?.(file.name, 25);

      // 最適化された画像をアップロード
      const url = await uploadImage(optimized.file);
      onProgress?.(file.name, 75);

      // データベースに登録
      const { data, error } = await supabase
        .from('post_images')
        .insert({
          post_id: postId,
          image_url: url,
          storage_path: url.split('/').pop(),
          alt_text: file.name,
          caption: '',
          display_order: 0,
          mime_type: 'image/jpeg',
          width: optimized.dimensions.width,
          height: optimized.dimensions.height,
          file_size: optimized.file.size
        })
        .select()
        .single();

      if (error) {
        console.error('Database error details:', error);
        throw new Error(`データベースへの登録に失敗しました: ${error.message}`);
      }
      if (!data) throw new Error('データベースからの応答がありません');

      // 進捗状態の更新（完了）
      onProgress?.(file.name, 100);

      return data as ImageUploadResult;
    } catch (error) {
      console.error(`Error processing image ${file.name}:`, error);
      const errorMessage = error instanceof Error ? error.message : '画像の処理に失敗しました';
      onError?.(new Error(errorMessage), file.name);
      throw error;
    }
  };

  return processBatch(files, processor, {
    batchSize: 3,
    onError: (error, file) => {
      const errorMessage = error instanceof Error ? error.message : '画像の処理に失敗しました';
      onError?.(new Error(errorMessage), (file as File).name);
    }
  });
}

export async function updateImageOrder(images: { id: string; display_order: number }[]) {
  const { error } = await supabase
    .from('post_images')
    .upsert(
      images.map(({ id, display_order }) => ({
        id,
        display_order,
        updated_at: new Date().toISOString()
      }))
    );

  if (error) throw error;
}

export async function deleteImage(imageId: string) {
  const { error } = await supabase
    .from('post_images')
    .delete()
    .eq('id', imageId);

  if (error) throw error;
}

export async function updateImageMetadata(
  imageId: string,
  metadata: { alt_text?: string; caption?: string }
) {
  const { error } = await supabase
    .from('post_images')
    .update({
      ...metadata,
      updated_at: new Date().toISOString()
    })
    .eq('id', imageId);

  if (error) throw error;
} 