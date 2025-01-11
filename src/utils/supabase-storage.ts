import { supabase } from '@/lib/supabase/supabase';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('blog')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error details:', uploadError);
      throw new Error(`画像のアップロードに失敗しました: ${uploadError.message}`);
    }

    if (!data) {
      throw new Error('アップロードデータが見つかりません');
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    if (error instanceof Error) {
      throw new Error(`画像のアップロードに失敗しました: ${error.message}`);
    }
    throw new Error('画像のアップロードに失敗しました');
  }
};

export const deleteImage = async (url: string): Promise<void> => {
  try {
    const path = url.split('/').pop();
    if (!path) throw new Error('Invalid image URL');

    const { error } = await supabase.storage
      .from('blog')
      .remove([path]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}; 