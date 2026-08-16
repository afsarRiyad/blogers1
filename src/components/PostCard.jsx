import { Link } from 'react-router-dom';
import { Calendar, Eye, ArrowRight } from 'lucide-react';

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return text.trim();
};

export default function PostCard({ post, variant = 'default' }) {
  if (!post) return null;

  if (variant === 'compact') {
    return (
      <Link
        to={`/post/${post.slug}`}
        className="group flex flex-col gap-3 p-4 rounded-2xl bg-white border border-dark-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
      >
        <div className="relative shrink-0 w-full aspect-[16/10] rounded-xl overflow-hidden bg-dark-100">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 animate-fade-in"
          />
          {post.category && (
            <span className="absolute top-2 left-2 px-2 py-1 rounded-full tag-gradient text-white text-[10px] font-bold shadow-glow">
              {post.category}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-dark-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug mb-2">
            {post.title}
          </h4>

          {post.description && (
            <p className="text-xs text-dark-600 leading-relaxed line-clamp-2 mb-2">
              {stripHtml(post.description)}
            </p>
          )}

          <div className="flex items-center justify-between gap-2 text-xs text-dark-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} />
              <span>{post.date}</span>
            </div>
            {post.views !== undefined && (
              <div className="flex items-center gap-1.5">
                <Eye size={12} />
                <span>{post.views.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="group grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)] gap-5 lg:gap-7 p-3 sm:p-4 lg:p-5 rounded-2xl bg-white border border-dark-100 hover:border-primary-200 hover:shadow-card transition-all duration-300">
      
      {/* Post Image */}
      <Link
        to={`/post/${post.slug}`}
        className="relative block w-full aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl bg-dark-100"
      >
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 animate-fade-in"
        />

        {post.category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full tag-gradient text-white text-[10px] sm:text-xs font-bold shadow-glow">
            {post.category}
          </span>
        )}
      </Link>

      {/* Post Content */}
      <div className="flex flex-col justify-center min-w-0 py-1 sm:py-2 lg:py-3">

        {/* Title */}
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-dark-900 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-dark-600 leading-relaxed line-clamp-2">
          {stripHtml(post.description)}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs sm:text-sm text-dark-500">

          {post.author && (
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-[10px] font-bold">
                {post.author.charAt(0)}
              </span>

              <span>{post.author}</span>
            </span>
          )}

          {post.date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{post.date}</span>
            </span>
          )}

          {post.views !== undefined && (
            <span className="inline-flex items-center gap-1.5">
              <Eye size={14} />
              <span>{post.views.toLocaleString()} Views</span>
            </span>
          )}
        </div>

        {/* Read More */}
        <div className="mt-4 sm:mt-5">
          <Link
            to={`/post/${post.slug}`}
            className="group/button inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-primary-gradient text-white text-sm font-bold shadow-glow hover:-translate-y-0.5 transition-all duration-200"
          >
            Read More

            <ArrowRight
              size={15}
              className="group-hover/button:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}