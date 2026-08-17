-- Push Form Settings Table
CREATE TABLE IF NOT EXISTS push_form_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  heading TEXT,
  subheading TEXT,
  buttons JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE push_form_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public push form settings are viewable by everyone"
  ON push_form_settings FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update push form settings"
  ON push_form_settings FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert push form settings"
  ON push_form_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete push form settings"
  ON push_form_settings FOR DELETE
  TO authenticated
  USING (true);