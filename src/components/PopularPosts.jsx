import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { getPopularPosts } from '../data/postsSupabase.js';
import { useState, useEffect } from 'react';

export default function PopularPosts({ limit = 5 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPopularPosts() {
      try {
        const popularPosts = await getPopularPosts(limit);
        setPosts(popularPosts);
      } catch (error) {
        console.error('Error loading popular posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPopularPosts();
  }, [limit]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-soft">
        <h3 className="text-sm font-extrabold text-dark-900 mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary-600" />
          Popular Posts
        </h3>
        <div className="flex items-center justify-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-primary-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-soft overflow-hidden">
      <h3 className="text-sm font-extrabold text-dark-900 mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-primary-600" />
        Popular Posts
      </h3>

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
  );
}