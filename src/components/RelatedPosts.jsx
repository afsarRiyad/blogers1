import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import PostCard from './PostCard.jsx';
import { getRelatedPosts } from '../data/postsSupabase.js';
import { useState, useEffect } from 'react';

export default function RelatedPosts({ currentSlug, limit = 3 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRelatedPosts() {
      try {
        const relatedPosts = await getRelatedPosts(currentSlug, limit);
        setPosts(relatedPosts);
      } catch (error) {
        console.error('Error loading related posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadRelatedPosts();
  }, [currentSlug, limit]);

  if (loading) {
    return (
      <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-dark-100">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <Lightbulb size={18} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight text-dark-900">
              Related Posts
            </h3>
            <p className="text-xs sm:text-sm text-dark-500 mt-1">You might also like these posts</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-primary-500 border-t-transparent"></div>
        </div>
      </section>
    );
  }

  if (!posts.length) return null;

  return (
    <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-dark-100">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shrink-0">
          <Lightbulb size={18} className="sm:w-6 sm:h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight text-dark-900">
            Related Posts
          </h3>
          <p className="text-xs sm:text-sm text-dark-500 mt-1">You might also like these posts</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} variant="compact" />
        ))}
      </div>
    </section>
  );
}
