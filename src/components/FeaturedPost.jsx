import { Link } from 'react-router-dom';
import { Calendar, Eye, ArrowRight, Sparkles } from 'lucide-react';
import pic from '../images/images.jpg';

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return text.trim();
};

export default function FeaturedPost({ post }) {
  if (!post) return null;

  return (
    <article className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-primary-50/30 to-white border border-primary-100 shadow-card">
      <div className="absolute -top-20 -right-20 w-72 h-72 sm:w-80 sm:h-80 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 lg:w-96 lg:h-96 bg-primary-300/20 rounded-full blur-3xl" />

      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0">
        <Link
          to={`/post/${post.slug}`}
          className="lg:col-span-3 block relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden group"
        >
          <img
            src={pic}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-fade-in"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 via-dark-900/20 to-transparent lg:bg-gradient-to-t lg:from-dark-900/70 lg:via-dark-900/10 lg:to-transparent" />

          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full tag-gradient text-white text-[10px] sm:text-xs font-extrabold shadow-glow">
              <Sparkles size={11} className="sm:w-3 sm:h-3" />
              Featured Post
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 lg:hidden">
            <span className="inline-block px-2 py-0.5 rounded-md tag-gradient text-white text-[10px] sm:text-[11px] font-bold shadow-glow mb-1.5">
              {post.category}
            </span>
          </div>
        </Link>

        <div className="lg:col-span-2 flex flex-col justify-center p-4 sm:p-6 lg:p-8 xl:p-10">
          <div className="hidden lg:block mb-3 lg:mb-4">
            <Link
              to={`/category/${post.categorySlug}`}
              className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full tag-gradient text-white text-[11px] sm:text-xs font-bold shadow-glow transition-colors"
            >
              {post.category}
            </Link>
          </div>

          <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-dark-900 leading-snug mb-2 sm:mb-3 hover:text-primary-700 transition-colors line-clamp-3">
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-dark-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3 lg:line-clamp-4">
            {stripHtml(post.description)}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 text-[11px] sm:text-sm text-dark-500">
            <span className="inline-flex items-center gap-1.5">
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[9px] sm:text-xs font-bold">
                {post.author.charAt(0)}
              </div>

              <span className="font-semibold text-dark-700 truncate max-w-[110px] sm:max-w-none">
                {post.author}
              </span>
            </span>

            <span className="inline-flex items-center gap-1">
              <Calendar size={13} className="sm:w-3.5 sm:h-3.5" />
              {post.date}
            </span>

            <span className="inline-flex items-center gap-1">
              <Eye size={13} className="sm:w-3.5 sm:h-3.5" />
              <span className="tabular-nums">
                {post.views?.toLocaleString()}
              </span>
            </span>
          </div>

          <Link
            to={`/post/${post.slug}`}
            className="group inline-flex items-center justify-center gap-2 self-start px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r-from-primary text-white font-bold text-xs sm:text-sm transition-all shadow-glow hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
          >
            Read More
            <ArrowRight
              size={15}
              className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}