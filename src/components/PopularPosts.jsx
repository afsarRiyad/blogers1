import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { getPopularPosts } from '../data/posts.js';

export default function PopularPosts({ limit = 5 }) {
  const posts = getPopularPosts(limit);

  return (
    <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-soft">
      <h3 className="text-sm font-extrabold text-dark-900 mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-primary-600" />
        জনপ্রিয় পোস্ট
      </h3>
      <ul className="space-y-3">
        {posts.map((post, i) => (
          <li key={post.id}>
            <Link
              to={`/post/${post.slug}`}
              className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-dark-50 transition-colors"
            >
              <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold ${
                i === 0
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-soft'
                  : i === 1
                  ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-soft'
                  : i === 2
                  ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-soft'
                  : 'bg-dark-100 text-dark-600'
              }`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-dark-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug mb-1.5">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-dark-500">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-dark-100 text-dark-600 font-medium">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
