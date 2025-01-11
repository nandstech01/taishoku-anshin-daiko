-- categoriesテーブルにslugカラムを追加
ALTER TABLE categories ADD COLUMN slug text;
ALTER TABLE categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);
ALTER TABLE categories ALTER COLUMN slug SET NOT NULL;

-- postsテーブルにcategory_slugの外部キー制約を追加
ALTER TABLE posts
  ADD CONSTRAINT fk_posts_categories
  FOREIGN KEY (category_slug)
  REFERENCES categories(slug)
  ON DELETE SET NULL; 