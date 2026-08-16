export const transformPostData = (supabasePost) => {
  if (!supabasePost) return null;

  return {
    id: supabasePost.id,
    title: supabasePost.title,
    slug: supabasePost.slug,
    description: supabasePost.description || '',
    image: supabasePost.thumbnail_url || `https://picsum.photos/seed/${supabasePost.slug}/800/500`,
    category: supabasePost.categories?.name || '',
    categorySlug: supabasePost.categories?.slug || '',
    author: supabasePost.author || 'TechZone BD',
    views: supabasePost.views || 0,
    featured: supabasePost.featured || false,
    date: formatDate(supabasePost.created_at),
    content: supabasePost.content || [],
    tags: supabasePost.tags?.map(pt => pt.tags.name) || [],
    prompt: supabasePost.prompts?.[0]?.prompt_text || '',
  };
};

export const transformCategoryData = (supabaseCategory) => {
  if (!supabaseCategory) return null;

  return {
    name: supabaseCategory.name,
    slug: supabaseCategory.slug,
    count: supabaseCategory.count || 0,
    icon: supabaseCategory.icon || 'Folder',
    description: supabaseCategory.description || '',
  };
};

export const transformTagsData = (supabaseTags) => {
  if (!supabaseTags) return [];
  return supabaseTags.map(tag => tag.name);
};

function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString('en-US', options);
}

export const transformPostsArray = (supabasePosts) => {
  if (!supabasePosts) return [];
  return supabasePosts.map(transformPostData);
};

export const transformCategoriesArray = (supabaseCategories) => {
  if (!supabaseCategories) return [];
  return supabaseCategories.map(transformCategoryData);
};