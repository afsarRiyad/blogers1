import Hero from '../components/Hero.jsx';
import FeaturedPost from '../components/FeaturedPost.jsx';
import PostGrid from '../components/PostGrid.jsx';
import Sidebar from '../components/Sidebar.jsx';
import CategorySection from '../components/CategorySection.jsx';
import TelegramCTA from '../components/TelegramCTA.jsx';
import { posts } from '../data/posts.js';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const featured = posts.find((p) => p.featured) || posts[0];
  const latest = posts.filter((p) => p.id !== featured.id).slice(0, 6);

  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-5 sm:gap-6 lg:gap-8">
          <div className="min-w-0 space-y-7 sm:space-y-10 order-1">
            <FeaturedPost post={featured} />

            <CategorySection />

            <section>
              <div className="flex items-end justify-between gap-3 mb-4 sm:mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] sm:text-xs font-bold mb-2 sm:mb-2.5">
                    <Clock size={11} className="sm:w-[13px] sm:h-[13px]" />
                    সর্বশেষ আপডেট
                  </div>
                  <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-dark-900 flex items-center gap-2">
                    <Sparkles size={18} className="sm:w-5.5 sm:h-5.5 text-primary-600 shrink-0" />
                    সর্বশেষ পোস্ট
                  </h2>
                </div>
                <Link
                  to="/category/trending"
                  className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-primary-800 transition-colors shrink-0"
                >
                  আরও দেখুন
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <PostGrid posts={latest} columns={2} />
              <div className="mt-5 sm:mt-8 flex sm:hidden justify-center">
                <Link
                  to="/category/trending"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-white border border-primary-200 text-primary-700 font-bold text-sm hover:bg-primary-50 transition-colors w-full"
                >
                  আরও দেখুন
                  <ArrowRight size={15} />
                </Link>
              </div>
            </section>

            <div className="lg:hidden order-last">
              <TelegramCTA />
            </div>
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start lg:h-fit order-2">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
