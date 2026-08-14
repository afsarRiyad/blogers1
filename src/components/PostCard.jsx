import { Link } from 'react-router-dom';
import { Calendar, Eye, ChevronRight } from 'lucide-react';
import pen from '../images/images.jpg'

export default function PostCard({ post, variant = 'default' }) {
  if (variant === 'compact') {
    return (
      <Link
        to={`/post/${post.slug}`}
        className="group flex gap-3 p-3 rounded-xl bg-white border border-dark-100 hover:border-primary-200 hover:shadow-soft transition-all duration-200"
      >
        <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-dark-100">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h4 className="text-sm font-bold text-dark-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h4>
          <div className="flex items-center gap-3 mt-2 text-xs text-dark-500">
            <span className="inline-flex items-center gap-1">
              <Calendar size={11} />
              {post.date}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="group bg-white rounded-2xl border border-dark-100 overflow-hidden hover:border-primary-200 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5">
      <div className="relative aspect-[16/10] overflow-hidden bg-dark-100">
        <Link to={`/post/${post.slug}`} className="block absolute inset-0">
          <img
            src={pen}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 left-3 z-10">
          <Link
            to={`/category/${post.categorySlug}`}
            className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-bold text-primary-700 border border-primary-100 shadow-soft hover:bg-primary-50 transition-colors"
          >
            {post.category}
          </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-extrabold text-dark-900 leading-snug mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-dark-600 leading-relaxed mb-4 line-clamp-3">
          {post.description}
        </p>

        <div className="flex items-center justify-between gap-2.5 sm:gap-3 pt-3 border-t border-dark-100 flex-wrap">
          <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-dark-500 flex-wrap min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                {post.author.charAt(0)}
              </div>
              <span className="font-medium truncate max-w-[70px] sm:max-w-[90px]">{post.author}</span>
            </span>
            <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
              <Calendar size={12} className="shrink-0" />
              <span>{post.date}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
              <Eye size={12} className="shrink-0" />
              <span>{post.views?.toLocaleString()}</span>
            </span>
          </div>
          <Link
            to={`/post/${post.slug}`}
            className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-primary-700 hover:text-primary-800 transition-colors whitespace-nowrap"
          >
            বিস্তারিত
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}
