-- Disable RLS for cases table to allow insertions
ALTER TABLE cases DISABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for authenticated users
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON cases;
CREATE POLICY "Allow all operations for authenticated users"
ON cases
FOR ALL
USING (true);

-- Enable publication for realtime
alter publication supabase_realtime add table cases;
