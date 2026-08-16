import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const TABLES = {
  POSTS: 'posts',
  CATEGORIES: 'categories',
  TAGS: 'tags',
  POST_TAGS: 'post_tags',
  PROMPTS: 'prompts',
  COLOR_SETTINGS: 'color_settings',
};