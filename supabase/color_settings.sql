-- Color Settings Table
CREATE TABLE IF NOT EXISTS color_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE color_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public color settings are viewable by everyone"
  ON color_settings FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update color settings"
  ON color_settings FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert color settings"
  ON color_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default color settings
INSERT INTO color_settings (key, value, description) VALUES
  ('primary_color', '#0ea5e9', 'Main primary color for buttons, links, and accents'),
  ('primary_dark', '#0369a1', 'Darker shade of primary color for hover states'),
  ('primary_light', '#0ea5e9', 'Lighter shade of primary color for backgrounds'),
  ('secondary_color', '#6366f1', 'Secondary accent color'),
  ('background_primary', '#f8fafc', 'Main background color'),
  ('background_secondary', '#ffffff', 'Secondary background color (cards, containers)'),
  ('text_primary', '#111827', 'Primary text color (headings, important text)'),
  ('text_secondary', '#475569', 'Secondary text color (body text, descriptions)'),
  ('text_muted', '#64748b', 'Muted text color (meta information, labels)'),
  ('border_color', '#e2e8f0', 'Border color for inputs, cards, dividers'),
  ('success_color', '#22c55e', 'Success state color'),
  ('warning_color', '#f59e0b', 'Warning state color'),
  ('error_color', '#ef4444', 'Error state color'),
  ('button_gradient_start', '#0ea5e9', 'Button gradient start color'),
  ('button_gradient_end', '#0369a1', 'Button gradient end color'),
  ('logo_color', '#0ea5e9', 'Logo and branding color'),
  ('tag_color', '#0ea5e9', 'Category and tag colors')
ON CONFLICT (key) DO NOTHING;
