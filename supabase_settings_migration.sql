-- Create a table for site-wide settings
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert the default year setting if it doesn't exist
INSERT INTO site_settings (key, value, description)
VALUES ('current_year', '2023', 'The current year displayed on the website for default project dates and other year-based displays.')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT USING (true);

-- Allow authenticated users (admins) to update settings
CREATE POLICY "Allow admin update access" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT SELECT ON site_settings TO anon, authenticated;
GRANT UPDATE ON site_settings TO authenticated;
