import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search, Home, FolderOpen, ChevronRight } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb.jsx';
import PostGrid from '../components/PostGrid.jsx';
import Sidebar from '../components/Sidebar.jsx';
import TelegramCTA from '../components/TelegramCTA.jsx';
import PopularPosts from '../components/PopularPosts.jsx';
import { searchPosts } from '../data/postsSupabase.js';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      try {
        const searchResults = await searchPosts(q);
        setResults(searchResults);
      } catch (error) {
        console.error('Error searching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, [q]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-7 md:py-8 lg:py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-dark-600">Searching...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-7 md:py-8 lg:py-10">
      <div className="mb-4 sm:mb-5 md:mb-7">
        <Breadcrumb items={[{ label: `Search results: "${q}"` }]} />
      </div>

      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-4 sm:p-6 lg:p-10 mb-5 sm:mb-6 md:mb-8 lg:mb-9 shadow-card">
        <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-56 h-56 sm:w-80 sm:h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 sm:-bottom-24 sm:-left-24 w-64 h-64 sm:w-96 sm:h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 text-white">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center text-primary-300 shrink-0">
            <Search size={22} className="sm:size-6 lg:size-7" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider text-primary-300 mb-0.5 sm:mb-1">Search Results</p>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-1 sm:mb-1.5 break-words">
              <span className="break-all">"{q}"</span> — All matched results
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed max-w-2xl">
              মোট <span className="font-extrabold text-primary-300">{results.length} টি</span> পোস্ট আপনার সার্চ শব্দের সাথে মেলেছে।
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-5 sm:gap-6 lg:gap-8">
        <div className="min-w-0 space-y-7 sm:space-y-8 lg:space-y-10 order-1">
          {results.length ? (
            <section>
              <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-dark-900">
                  All Results
                </h2>
                <span className="text-[11px] sm:text-xs font-bold text-dark-500 px-2.5 sm:px-3 py-1 rounded-full bg-dark-100 whitespace-nowrap">
                  {results.length} টি
                </span>
              </div>
              <PostGrid posts={results} columns={2} />
            </section>
          ) : (
            <div className="bg-white rounded-2xl border border-dark-100 p-6 sm:p-8 lg:p-12 text-center shadow-soft">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-50 border border-dark-100 flex items-center justify-center mx-auto mb-5 text-dark-400">
                <Search size={30} className="sm:size-9" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-dark-900 mb-2">
                No Results Found 😔
              </h3>
              <p className="text-sm text-dark-600 mb-6 max-w-md mx-auto leading-relaxed">
                "<span className="font-bold text-dark-800 break-all">{q}</span>" -এর জন্য কোনো ফলাফল পাওয়া যায়নি। অন্য কিছু সার্চ করে দেখুন অথবা হোম পেজে যান।
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-sm hover:-translate-y-0.5 transition-all shadow-glow w-full sm:w-auto justify-center"
                >
                  <Home size={15} />
                  Go to Home
                </Link>
              </div>
              <div className="mt-8 sm:mt-10 text-left max-w-lg mx-auto">
                <PopularPosts limit={4} />
              </div>
            </div>
          )}

          <div className="lg:hidden">
            <TelegramCTA />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start lg:h-fit order-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
