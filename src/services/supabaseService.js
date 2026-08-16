import { supabase, TABLES } from '../lib/supabase.js';

const isSupabaseConfigured = () => supabase !== null;

const isValidUUID = (str) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

export const colorSettingsService = {
  async getAll() {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning default colors');
      return this.getDefaultColors();
    }

    const { data, error } = await supabase
      .from(TABLES.COLOR_SETTINGS)
      .select('*');

    if (error) {
      console.error('Error fetching color settings:', error);
      return this.getDefaultColors();
    }

    if (!data || data.length === 0) {
      console.log('No color settings found, using defaults');
      return this.getDefaultColors();
    }

    // Convert to key-value object
    const colors = {};
    data.forEach(setting => {
      colors[setting.key] = setting.value;
    });

    console.log('Loaded colors from database:', colors);
    return colors;
  },

  async update(key, value) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from(TABLES.COLOR_SETTINGS)
      .upsert({ key, value })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateMultiple(colors) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const updates = Object.entries(colors).map(([key, value]) =>
      supabase.from(TABLES.COLOR_SETTINGS).upsert({ key, value })
    );

    const results = await Promise.all(updates);
    return results;
  },

  getDefaultColors() {
    return {
      primary_color: '#0ea5e9',
      primary_dark: '#0369a1',
      primary_light: '#0ea5e9',
      secondary_color: '#6366f1',
      background_primary: '#f8fafc',
      background_secondary: '#ffffff',
      text_primary: '#111827',
      text_secondary: '#475569',
      text_muted: '#64748b',
      border_color: '#e2e8f0',
      success_color: '#22c55e',
      warning_color: '#f59e0b',
      error_color: '#ef4444',
      button_gradient_start: '#0ea5e9',
      button_gradient_end: '#0369a1',
      button_text_color: '#ffffff',
      logo_color: '#0ea5e9',
      tag_color: '#0ea5e9'
    };
  }
};

export const postsService = {
  async getAll(offset = 0, limit = 15) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        categories:category_id (*),
        tags:post_tags (tags (*)),
        prompts:prompts (*)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async getTotalCount() {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning 0');
      return 0;
    }

    const { count, error } = await supabase
      .from(TABLES.POSTS)
      .select('*', { count: 'exact', head: true })
      .eq('published', true);

    if (error) throw error;
    return count || 0;
  },

  async getBySlug(slug) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning null');
      return null;
    }

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        categories:category_id (*),
        tags:post_tags (tags (*)),
        prompts:prompts (*)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data;
  },

  async getById(id) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning null');
      return null;
    }

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        categories:category_id (*),
        tags:post_tags (tags (*)),
        prompts:prompts (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByCategory(categorySlug, offset = 0, limit = 15) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        categories:category_id (*),
        tags:post_tags (tags (*)),
        prompts:prompts (*)
      `)
      .eq('published', true)
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async getCategoryCount(categorySlug) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning 0');
      return 0;
    }

    const { count, error } = await supabase
      .from(TABLES.POSTS)
      .select('*', { count: 'exact', head: true })
      .eq('published', true)
      .eq('categories.slug', categorySlug);

    if (error) throw error;
    return count || 0;
  },

  async getFeatured() {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning null');
      return null;
    }

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        categories:category_id (*),
        tags:post_tags (tags (*)),
        prompts:prompts (*)
      `)
      .eq('featured', true)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  },

  async getPopular(limit = 5) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        categories:category_id (*),
        tags:post_tags (tags (*)),
        prompts:prompts (*)
      `)
      .eq('published', true)
      .order('views', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async search(query) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        categories:category_id (*),
        tags:post_tags (tags (*)),
        prompts:prompts (*)
      `)
      .eq('published', true)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getRelated(currentSlug, limit = 3) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty array');
      return [];
    }

    const currentPost = await this.getBySlug(currentSlug);
    
    if (!currentPost) return [];

    let relatedPosts = [];
    
    if (currentPost.category_id) {
      const { data: sameCategoryPosts, error: categoryError } = await supabase
        .from(TABLES.POSTS)
        .select(`
          *,
          categories:category_id (*),
          tags:post_tags (tags (*)),
          prompts:prompts (*)
        `)
        .eq('published', true)
        .eq('category_id', currentPost.category_id)
        .neq('id', currentPost.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (!categoryError && sameCategoryPosts) {
        relatedPosts = sameCategoryPosts;
      }
    }

    if (relatedPosts.length < limit) {
      const needed = limit - relatedPosts.length;
      const existingIds = relatedPosts.map(p => p.id);
      existingIds.push(currentPost.id);

      const { data: recentPosts, error: recentError } = await supabase
        .from(TABLES.POSTS)
        .select(`
          *,
          categories:category_id (*),
          tags:post_tags (tags (*)),
          prompts:prompts (*)
        `)
        .eq('published', true)
        .not('id', `in.(${existingIds.join(',')})`)
        .order('created_at', { ascending: false })
        .limit(needed);

      if (!recentError && recentPosts) {
        relatedPosts = [...relatedPosts, ...recentPosts];
      }
    }

    return relatedPosts.slice(0, limit);
  },

  async incrementViews(postId) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, skipping view increment');
      return null;
    }

    const { data: currentPost } = await supabase
      .from(TABLES.POSTS)
      .select('views')
      .eq('id', postId)
      .single();

    const newViews = (currentPost?.views || 0) + 1;

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .update({ views: newViews })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async create(postData) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    let finalData = { ...postData };
    if (postData.category_id && !isValidUUID(postData.category_id)) {
      console.log('Category ID is not a UUID, trying to find by name:', postData.category_id);
      const { data: categoryData } = await supabase
        .from(TABLES.CATEGORIES)
        .select('id')
        .or(`name.eq.${postData.category_id},slug.eq.${postData.category_id}`)
        .single();
      
      if (categoryData) {
        finalData.category_id = categoryData.id;
        console.log('Found category ID:', categoryData.id);
      } else {
        delete finalData.category_id;
        console.log('Category not found, removing category_id');
      }
    }

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .insert(finalData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(postId, postData) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .update(postData)
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(postId) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from(TABLES.POSTS)
      .delete()
      .eq('id', postId);

    if (error) throw error;
  },

  async uploadThumbnail(file, postId) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const fileName = `${postId}-${timestamp}.${fileExt}`;
    const filePath = fileName;

    console.log('Uploading file:', { fileName, filePath, fileSize: file.size });

    const { data, error } = await supabase.storage
      .from('thumbnails')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    console.log('Upload successful:', data);

    const { data: { publicUrl } } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(filePath);

    console.log('Public URL:', publicUrl);

    return publicUrl;
  }
};

export const categoriesService = {
  async getAll() {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async getBySlug(slug) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning null');
      return null;
    }

    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  async create(categoryData) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .insert(categoryData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(categoryId, categoryData) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .update(categoryData)
      .eq('id', categoryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(categoryId) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from(TABLES.CATEGORIES)
      .delete()
      .eq('id', categoryId);

    if (error) throw error;
  }
};

export const tagsService = {
  async getAll() {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from(TABLES.TAGS)
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async create(tagData) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from(TABLES.TAGS)
      .insert(tagData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(tagId) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from(TABLES.TAGS)
      .delete()
      .eq('id', tagId);

    if (error) throw error;
  }
};

export const promptsService = {
  async getByPostId(postId) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning null');
      return null;
    }

    const { data, error } = await supabase
      .from(TABLES.PROMPTS)
      .select('*')
      .eq('post_id', postId)
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }
    return data;
  },

  async create(promptData) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from(TABLES.PROMPTS)
      .insert(promptData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(promptId, promptData) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from(TABLES.PROMPTS)
      .update(promptData)
      .eq('id', promptId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(promptId) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from(TABLES.PROMPTS)
      .delete()
      .eq('id', promptId);

    if (error) throw error;
  },

  async deleteByPostId(postId) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from(TABLES.PROMPTS)
      .delete()
      .eq('post_id', postId);

    if (error) throw error;
  }
};