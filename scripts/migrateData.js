// Data migration script to populate Supabase with existing posts data
// Run this after setting up your Supabase project

import { createClient } from '@supabase/supabase-js';
import { posts, categories, tagsList } from '../src/data/posts.js';

// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function migrateCategories() {
  console.log('Migrating categories...');
  
  for (const category of categories) {
    const { data, error } = await supabase
      .from('categories')
      .upsert({
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        description: category.description,
        count: category.count
      }, {
        onConflict: 'slug'
      });
    
    if (error) {
      console.error(`Error migrating category ${category.name}:`, error);
    } else {
      console.log(`✓ Migrated category: ${category.name}`);
    }
  }
}

async function migratePosts() {
  console.log('Migrating posts...');
  
  // First, get all categories to map names to IDs
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('id, slug');
  
  const categoryMap = {};
  categoriesData.forEach(cat => {
    categoryMap[cat.slug] = cat.id;
  });

  for (const post of posts) {
    const categoryId = categoryMap[post.categorySlug];
    
    const { data, error } = await supabase
      .from('posts')
      .upsert({
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content || [],
        thumbnail_url: post.image,
        category_id: categoryId,
        author: post.author,
        views: post.views,
        featured: post.featured,
        published: true
      }, {
        onConflict: 'slug'
      });
    
    if (error) {
      console.error(`Error migrating post ${post.title}:`, error);
    } else {
      console.log(`✓ Migrated post: ${post.title}`);
      
      // Handle prompts if they exist
      if (post.prompt) {
        const postId = data[0]?.id;
        if (postId) {
          await supabase
            .from('prompts')
            .upsert({
              post_id: postId,
              prompt_text: post.prompt,
              label: 'AI Prompt'
            }, {
              onConflict: 'post_id'
            });
        }
      }
    }
  }
}

async function migrateTags() {
  console.log('Migrating tags...');
  
  for (const tagName of tagsList) {
    const { data, error } = await supabase
      .from('tags')
      .upsert({
        name: tagName
      }, {
        onConflict: 'name'
      });
    
    if (error) {
      console.error(`Error migrating tag ${tagName}:`, error);
    } else {
      console.log(`✓ Migrated tag: ${tagName}`);
    }
  }
}

async function runMigration() {
  console.log('Starting data migration...');
  console.log('Make sure to update SUPABASE_URL and SUPABASE_ANON_KEY in this file!');
  
  try {
    await migrateCategories();
    await migratePosts();
    await migrateTags();
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

runMigration();