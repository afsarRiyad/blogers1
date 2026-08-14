import { useParams, Link } from 'react-router-dom';
import { FolderOpen, ChevronRight, Home } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb.jsx';
import PostGrid from '../components/PostGrid.jsx';
import Sidebar from '../components/Sidebar.jsx';
import TelegramCTA from '../components/TelegramCTA.jsx';
import CategorySection from '../components/CategorySection.jsx';
import { categories, getPostsByCategory, posts } from '../data/posts.js';

const colorMap = {
  apps: 'from-sky-400 to-blue-600',
  games: 'from-violet-400 to-purple-600',
  'ai-tools': 'from-cyan-400 to-teal-600',
  'video-editing': 'from-rose-400 to-pink-600',
  'photo-editing': 'from-amber-400 to-orange-600',
  'premium-apps': 'from-indigo-400 to-blue-700',
  technology: 'from-emerald-400 to-teal-700',
  trending: 'from-rose-500 to-orange-500',
};

export default function Category() {
  const { slug } = useParams();
  const catInfo = categories.find((c) => c.slug === slug);
  const categoryPosts = getPostsByCategory(slug);
  const allPosts = categoryPosts.length ? categoryPosts : posts.slice(0, 8);
  const name = catInfo?.name || (slug ? slug.replace(/-/g, ' ') : 'Category');
  const color = colorMap[slug] || 'from-primary-400 to-primary-700';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-7 md:py-8 lg:py-10">
      <div className="mb-4 sm:mb-5 md:mb-7">
        <Breadcrumb items={[{ label: name }]} />
      </div>

      <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${color} p-4 sm:p-6 lg:p-10 mb-5 sm:mb-6 md:mb-8 lg:mb-9 shadow-card`}>
        <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-56 h-56 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 sm:-bottom-24 sm:-left-24 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 text-white">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center shadow-soft shrink-0">
            <FolderOpen size={22} className="sm:size-6 lg:size-7" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider text-white/80 mb-0.5 sm:mb-1">Category</p>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-1 sm:mb-1.5">
              {name}
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white/85 leading-relaxed max-w-2xl">
              {catInfo?.description || `${name} ক্যাটাগরির সমস্ত পোস্ট এক জায়গায়।`}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold">{(catInfo?.count || allPosts.length)}</p>
              <p className="text-[10px] sm:text-xs text-white/80 font-bold uppercase">পোস্ট</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-5 sm:gap-6 lg:gap-8">
        <div className="min-w-0 space-y-7 sm:space-y-8 lg:space-y-10 order-1">
          {allPosts.length ? (
            <section>
              <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-dark-900">
                  {name} — সমস্ত পোস্ট
                </h2>
                <span className="text-[11px] sm:text-xs font-bold text-dark-500 px-2.5 sm:px-3 py-1 rounded-full bg-dark-100 whitespace-nowrap">
                  {allPosts.length} টি পোস্ট
                </span>
              </div>
              <PostGrid posts={allPosts} columns={2} />
            </section>
          ) : (
            <div className="bg-white rounded-2xl border border-dark-100 p-6 sm:p-8 lg:p-10 text-center shadow-soft">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-dark-100 flex items-center justify-center mx-auto mb-4 text-dark-400">
                <FolderOpen size={28} />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-dark-900 mb-2">এখনও কোনো পোস্ট নেই</h3>
              <p className="text-sm text-dark-600 mb-5">এই ক্যাটাগরিতে খুব দ্রুত নতুন পোস্ট আসছে।</p>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-sm hover:-translate-y-0.5 transition-all shadow-glow w-full sm:w-auto justify-center"
              >
                <Home size={15} />
                হোমে ফিরুন
              </Link>
            </div>
          )}

          <CategorySection />
          <div className="lg:hidden">
            <TelegramCTA />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start lg:h-fit">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
