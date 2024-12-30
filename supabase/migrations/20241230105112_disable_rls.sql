-- Drop existing policies
DROP POLICY IF EXISTS "Allow all operations" ON posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON posts;
DROP POLICY IF EXISTS "Enable update for post owners" ON posts;

-- Disable RLS
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
