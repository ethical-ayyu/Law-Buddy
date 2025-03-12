-- Enable Row Level Security
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_notes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for guest users)
DROP POLICY IF EXISTS "Public access to cases" ON cases;
CREATE POLICY "Public access to cases"
ON cases FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access to case_events" ON case_events;
CREATE POLICY "Public access to case_events"
ON case_events FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access to case_notes" ON case_notes;
CREATE POLICY "Public access to case_notes"
ON case_notes FOR SELECT
USING (true);

-- Create policies for authenticated users to insert/update/delete
DROP POLICY IF EXISTS "Authenticated users can insert cases" ON cases;
CREATE POLICY "Authenticated users can insert cases"
ON cases FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update cases" ON cases;
CREATE POLICY "Authenticated users can update cases"
ON cases FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete cases" ON cases;
CREATE POLICY "Authenticated users can delete cases"
ON cases FOR DELETE
TO authenticated
USING (true);

-- Similar policies for case_events
DROP POLICY IF EXISTS "Authenticated users can insert case_events" ON case_events;
CREATE POLICY "Authenticated users can insert case_events"
ON case_events FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update case_events" ON case_events;
CREATE POLICY "Authenticated users can update case_events"
ON case_events FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete case_events" ON case_events;
CREATE POLICY "Authenticated users can delete case_events"
ON case_events FOR DELETE
TO authenticated
USING (true);

-- Similar policies for case_notes
DROP POLICY IF EXISTS "Authenticated users can insert case_notes" ON case_notes;
CREATE POLICY "Authenticated users can insert case_notes"
ON case_notes FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update case_notes" ON case_notes;
CREATE POLICY "Authenticated users can update case_notes"
ON case_notes FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete case_notes" ON case_notes;
CREATE POLICY "Authenticated users can delete case_notes"
ON case_notes FOR DELETE
TO authenticated
USING (true);