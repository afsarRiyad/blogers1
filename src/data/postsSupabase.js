import { postsService, categoriesService, tagsService } from '../services/supabaseService.js';
import { supabase } from '../lib/supabase.js';
import { 
  transformPostsArray, 
  transformCategoriesArray, 
  transformTagsData,
  transformPostData,
  transformCategoryData
} from '../utils/dataTransformers.js';
import { posts as staticPosts, categories as staticCategories, tagsList as staticTags } from './posts.js';

const isSupabaseConfigured = () => supabase !== null;

let cachedPosts = null;
let cachedCategories = null;
let cachedTags = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000;

const isCacheValid = () => {
  return cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION);
};

export const clearCache = () => {
  cachedPosts = null;
  cachedCategories = null;
  cachedTags = null;
  cacheTimestamp = null;
};

export const getPosts = async (offset = 0, limit = 15) => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    return staticPosts.slice(offset, offset + limit);
  }

  try {
    const data = await postsService.getAll(offset, limit);
    return transformPostsArray(data);
  } catch (error) {
    console.error('Error fetching posts from Supabase, falling back to static data:', error);
    return staticPosts.slice(offset, offset + limit);
  }
};

export const getTotalPostCount = async () => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    return staticPosts.length;
  }

  try {
    return await postsService.getTotalCount();
  } catch (error) {
    console.error('Error fetching total post count from Supabase, falling back to static data:', error);
    return staticPosts.length;
  }
};

export const getPostBySlug = async (slug) => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    return staticPosts.find(p => p.slug === slug) || null;
  }

  try {
    const data = await postsService.getBySlug(slug);
    return transformPostData(data);
  } catch (error) {
    console.error('Error fetching post by slug from Supabase, falling back to static data:', error);
    return staticPosts.find(p => p.slug === slug) || null;
  }
};

export const getPostsByCategory = async (categorySlug, offset = 0, limit = 15) => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    const filtered = staticPosts.filter(p => p.categorySlug === categorySlug);
    return filtered.slice(offset, offset + limit);
  }

  try {
    const data = await postsService.getByCategory(categorySlug, offset, limit);
    return transformPostsArray(data);
  } catch (error) {
    console.error('Error fetching posts by category from Supabase, falling back to static data:', error);
    const filtered = staticPosts.filter(p => p.categorySlug === categorySlug);
    return filtered.slice(offset, offset + limit);
  }
};

export const getCategoryPostCount = async (categorySlug) => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    return staticPosts.filter(p => p.categorySlug === categorySlug).length;
  }

  try {
    return await postsService.getCategoryCount(categorySlug);
  } catch (error) {
    console.error('Error fetching category post count from Supabase, falling back to static data:', error);
    return staticPosts.filter(p => p.categorySlug === categorySlug).length;
  }
};

export const getFeaturedPost = async () => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    return staticPosts.find(p => p.featured) || staticPosts[0] || null;
  }

  try {
    const data = await postsService.getFeatured();
    return transformPostData(data);
  } catch (error) {
    console.error('Error fetching featured post from Supabase, falling back to static data:', error);
    return staticPosts.find(p => p.featured) || staticPosts[0] || null;
  }
};

export const getPopularPosts = async (limit = 5) => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    return [...staticPosts].sort((a, b) => b.views - a.views).slice(0, limit);
  }

  try {
    const data = await postsService.getPopular(limit);
    return transformPostsArray(data);
  } catch (error) {
    console.error('Error fetching popular posts from Supabase, falling back to static data:', error);
    return [...staticPosts].sort((a, b) => b.views - a.views).slice(0, limit);
  }
};

export const searchPosts = async (query) => {
  if (!query || query.trim() === '') {
    return await getPosts();
  }

  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    const q = query.toLowerCase();
    return staticPosts.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  try {
    const data = await postsService.search(query);
    return transformPostsArray(data);
  } catch (error) {
    console.error('Error searching posts from Supabase, falling back to static data:', error);
    const q = query.toLowerCase();
    return staticPosts.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
};

export const getRelatedPosts = async (currentSlug, limit = 3) => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    const current = staticPosts.find(p => p.slug === currentSlug);
    if (!current) return staticPosts.slice(0, limit);

    const sameCategory = staticPosts.filter(p => p.categorySlug === current.categorySlug && p.slug !== currentSlug);
    
    let relatedPosts = [...sameCategory];
    if (relatedPosts.length < limit) {
      const otherPosts = staticPosts.filter(p => p.slug !== current.slug && p.categorySlug !== current.categorySlug);
      relatedPosts = [...relatedPosts, ...otherPosts].slice(0, limit);
    }
    
    return relatedPosts.slice(0, limit);
  }

  try {
    const data = await postsService.getRelated(currentSlug, limit);
    return transformPostsArray(data);
  } catch (error) {
    console.error('Error fetching related posts from Supabase, falling back to static data:', error);
    const current = staticPosts.find(p => p.slug === currentSlug);
    if (!current) return staticPosts.slice(0, limit);

    const sameCategory = staticPosts.filter(p => p.categorySlug === current.categorySlug && p.slug !== currentSlug);
    
    let relatedPosts = [...sameCategory];
    if (relatedPosts.length < limit) {
      const otherPosts = staticPosts.filter(p => p.slug !== current.slug && p.categorySlug !== current.categorySlug);
      relatedPosts = [...relatedPosts, ...otherPosts].slice(0, limit);
    }
    
    return relatedPosts.slice(0, limit);
  }
};

export const getCategories = async () => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    return staticCategories;
  }

  if (cachedCategories && isCacheValid()) {
    return cachedCategories;
  }

  try {
    const data = await categoriesService.getAll();
    cachedCategories = transformCategoriesArray(data);
    cacheTimestamp = Date.now();
    return cachedCategories;
  } catch (error) {
    console.error('Error fetching categories from Supabase, falling back to static data:', error);
    return staticCategories;
  }
};

export const getCategoryBySlug = async (slug) => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    return staticCategories.find(c => c.slug === slug) || null;
  }

  try {
    const data = await categoriesService.getBySlug(slug);
    return transformCategoryData(data);
  } catch (error) {
    console.error('Error fetching category by slug from Supabase, falling back to static data:', error);
    return staticCategories.find(c => c.slug === slug) || null;
  }
};

export const getTags = async () => {
  if (!isSupabaseConfigured()) {
    console.log('Using static data (Supabase not configured)');
    return staticTags;
  }

  if (cachedTags && isCacheValid()) {
    return cachedTags;
  }

  try {
    const data = await tagsService.getAll();
    cachedTags = transformTagsData(data);
    cacheTimestamp = Date.now();
    return cachedTags;
  } catch (error) {
    console.error('Error fetching tags from Supabase, falling back to static data:', error);
    return staticTags;
  }
};

export const incrementPostViews = async (postId) => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, skipping view increment');
    return;
  }

  try {
    await postsService.incrementViews(postId);
  } catch (error) {
    console.error('Error incrementing post views:', error);
  }
};

export const posts = [];
export const categories = [];
export const tagsList = [];

let initializationPromise = null;

export const initializeData = async () => {
  if (!initializationPromise) {
    initializationPromise = Promise.all([
      getPosts().then(data => { posts.length = 0; posts.push(...data); }),
      getCategories().then(data => { categories.length = 0; categories.push(...data); }),
      getTags().then(data => { tagsList.length = 0; tagsList.push(...data); }),
    ]);
  }
  return initializationPromise;
};

initializeData().catch(console.error);