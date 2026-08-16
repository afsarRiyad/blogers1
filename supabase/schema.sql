-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50),
  description TEXT,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tags table
CREATE TABLE tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Posts table
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content JSONB DEFAULT '[]'::jsonb,
  thumbnail_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author VARCHAR(100),
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  CONSTRAINT valid_content CHECK (jsonb_typeof(content) = 'array')
);

-- Post tags junction table
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  PRIMARY KEY (post_id, tag_id)
);

-- Prompts table
CREATE TABLE prompts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  prompt_text TEXT NOT NULL,
  label VARCHAR(100) DEFAULT 'Prompt',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_featured ON posts(featured) WHERE featured = TRUE;
CREATE INDEX idx_posts_published ON posts(published) WHERE published = TRUE;
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_views ON posts(views DESC);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_name ON tags(name);
CREATE INDEX idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);
CREATE INDEX idx_prompts_post_id ON prompts(post_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update category count
CREATE OR REPLACE FUNCTION update_category_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE categories SET count = count + 1 WHERE id = NEW.category_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.category_id != NEW.category_id THEN
      UPDATE categories SET count = count - 1 WHERE id = OLD.category_id;
      UPDATE categories SET count = count + 1 WHERE id = NEW.category_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE categories SET count = count - 1 WHERE id = OLD.category_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update category count when posts change
CREATE TRIGGER update_post_category_count
  AFTER INSERT OR UPDATE OR DELETE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_category_count();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public read access for categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public read access for tags" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Public read access for posts" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public read access for post_tags" ON post_tags
  FOR SELECT USING (true);

CREATE POLICY "Public read access for prompts" ON prompts
  FOR SELECT USING (true);

-- RLS Policies for admin write access

CREATE POLICY "Admin write access for categories" ON categories
  FOR ALL USING (true);

CREATE POLICY "Admin write access for tags" ON tags
  FOR ALL USING (true);

CREATE POLICY "Admin write access for posts" ON posts
  FOR ALL USING (true);

CREATE POLICY "Admin write access for post_tags" ON post_tags
  FOR ALL USING (true);

CREATE POLICY "Admin write access for prompts" ON prompts
  FOR ALL USING (true);

-- Insert initial categories
INSERT INTO categories (name, slug, icon, description, count) VALUES
  ('Apps', 'apps', 'Smartphone', 'Download new and useful apps', 0),
  ('Games', 'games', 'Gamepad2', 'Download premium and mod games', 0),
  ('AI Tools', 'ai-tools', 'Bot', 'AI tools and prompt collections', 0),
  ('Video Editing', 'video-editing', 'Video', 'Best video editing apps and tips', 0),
  ('Photo Editing', 'photo-editing', 'Image', 'Photo editing apps and AI tools', 0),
  ('Premium Apps', 'premium-apps', 'Crown', 'All premium apps in one place', 0),
  ('Technology', 'technology', 'Zap', 'Technology news and useful tips', 0),
  ('Trending', 'trending', 'TrendingUp', 'Latest trending content', 0);

-- Insert initial tags
INSERT INTO tags (name) VALUES
  ('APK'), ('AI'), ('ChatGPT'), ('CapCut'), ('TikTok'), ('Prompt'),
  ('Premium'), ('Android'), ('Video Editing'), ('Photo Editing'), ('Mod APK'),
  ('Midjourney'), ('Canva'), ('Snapseed'), ('VPN'), ('Adobe'), ('YouTube'), ('Facebook');