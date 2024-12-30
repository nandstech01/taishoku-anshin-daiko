-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Allow public access to read images
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow anyone to upload images
CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');

-- Allow anyone to update their uploaded images
CREATE POLICY "Anyone can update their images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images');

-- Allow anyone to delete their uploaded images
CREATE POLICY "Anyone can delete their images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images'); 