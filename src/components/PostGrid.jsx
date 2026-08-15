import { Link } from 'react-router-dom';
import { Calendar, Eye, ArrowRight } from 'lucide-react';

export default function PostGrid({ posts = [] }) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="group grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)] gap-5 lg:gap-7 p-3 sm:p-4 lg:p-5 rounded-2xl bg-white border border-dark-100 hover:border-primary-200 hover:shadow-card transition-all duration-300"
        >
          {/* Image */}
          <Link
            to={`/post/${post.slug}`}
            className="relative block w-full aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl bg-dark-100"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {post.category && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] sm:text-xs font-bold text-primary-700 shadow-sm">
                {post.category}
              </span>
            )}
          </Link>

          {/* Content */}
          <div className="flex flex-col justify-center min-w-0 py-1 sm:py-2 lg:py-3">
            <Link to={`/post/${post.slug}`}>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-dark-900 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
                {post.title}
              </h2>
            </Link>

            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-dark-600 leading-relaxed line-clamp-3">
              {post.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs sm:text-sm text-dark-500">
              {post.author && (
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-[10px] font-bold">
                    {post.author.charAt(0)}
                  </span>
                  {post.author}
                </span>
              )}

              {post.date && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {post.date}
                </span>
              )}

              {post.views !== undefined && (
                <span className="inline-flex items-center gap-1.5">
                  <Eye size={14} />
                  {post.views?.toLocaleString()} Views
                </span>
              )}
            </div>

            {/* Read More Button */}
            <div className="mt-4 sm:mt-5">
              <Link
                to={`/post/${post.slug}`}
                className="group/button inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-sm font-bold shadow-glow hover:-translate-y-0.5 transition-all duration-200"
              >
                Read More
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover/button:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}