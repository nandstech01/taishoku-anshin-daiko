-- Add description column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS description TEXT; 