-- Add status column to posts table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'posts' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE public.posts ADD COLUMN status text DEFAULT 'draft';
    END IF;
END $$;
