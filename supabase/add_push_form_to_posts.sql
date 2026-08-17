-- Add push form columns to posts table
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS push_form_heading TEXT,
ADD COLUMN IF NOT EXISTS push_form_subheading TEXT,
ADD COLUMN IF NOT EXISTS push_form_buttons JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS push_form_prompt_text TEXT;