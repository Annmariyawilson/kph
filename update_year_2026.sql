-- Update the current_year setting to 2026
UPDATE site_settings
SET value = '2026',
    updated_at = NOW()
WHERE key = 'current_year';

-- In case the row doesn't exist (if the previous migration wasn't run), insert it
INSERT INTO site_settings (key, value, description)
VALUES ('current_year', '2026', 'The current year displayed on the website for default project dates.')
ON CONFLICT (key) DO UPDATE
SET value = '2026',
    updated_at = NOW();
