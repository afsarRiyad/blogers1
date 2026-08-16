import { Link } from 'react-router-dom';
import { Lightbulb, Eye } from 'lucide-react';
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
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <Lightbulb size={15} className="sm:w-[18px] sm:h-[18px]" />
          </div>
          <div>
            <h3 className="text-base sm:text-xl font-extrabold tracking-tight text-dark-900">
              Related Posts
            </h3>
            <p className="text-[11px] sm:text-xs text-dark-500 mt-0.5 hidden sm:block">You might also like these posts</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-primary-500 border-t-transparent"></div>
        </div>
      </section>
    );
  }

  if (!posts.length) return null;

  return (
    <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-dark-100">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shrink-0">
          <Lightbulb size={15} className="sm:w-[18px] sm:h-[18px]" />
        </div>
        <div>
          <h3 className="text-base sm:text-xl font-extrabold tracking-tight text-dark-900">
            Related Posts
          </h3>
          <p className="text-[11px] sm:text-xs text-dark-500 mt-0.5 hidden sm:block">You might also like these posts</p>
        </div>
      </div>

      {/* Mobile: Horizontal list like Popular Posts */}
      <div className="sm:hidden bg-white rounded-2xl border border-dark-100 p-5 shadow-soft overflow-hidden">
        <ul className="space-y-3">
          {posts.map((post, i) => (
            <li key={post.id}>
              <Link
                to={`/post/${post.slug}`}
                className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-dark-50 transition-colors"
              >
                {/* Post Image */}
                <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-dark-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Ranking Number */}
                  <span className="absolute top-1 left-1 w-5 h-5 rounded-md bg-dark-900/80 text-white flex items-center justify-center text-[9px] font-extrabold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-dark-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug mb-1.5">
                    {post.title}
                  </h4>

                  <div className="flex items-center gap-2 text-[11px] text-dark-500">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-dark-100 text-dark-600 font-medium">
                      {post.category}
                    </span>

                    <span className="truncate">
                      {post.views?.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((p) => (
          <div key={p.id} className="group">
            <Link
              to={`/post/${p.slug}`}
              className="group flex flex-col gap-3 p-4 rounded-2xl bg-white border border-dark-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative shrink-0 w-full aspect-[16/10] rounded-xl overflow-hidden bg-dark-100">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {p.category && (
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-full tag-gradient text-white text-[10px] font-bold shadow-glow">
                    {p.category}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-dark-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug mb-2">
                  {p.title}
                </h4>

                <div className="flex items-center gap-2 text-[11px] text-dark-500">
                  <span className="truncate">
                    {p.views?.toLocaleString()} views
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
