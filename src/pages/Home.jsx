import Hero from '../components/Hero.jsx';
import FeaturedPost from '../components/FeaturedPost.jsx';
import PostGrid from '../components/PostGrid.jsx';
import Sidebar from '../components/Sidebar.jsx';

import TelegramCTA from '../components/TelegramCTA.jsx';
import { getPosts, getFeaturedPost, getTotalPostCount } from '../data/postsSupabase.js';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const POSTS_PER_PAGE = 10;
  const observerTarget = useRef(null);

  const loadPosts = async (currentOffset = 0, reset = false) => {
    try {
      const data = await getPosts(currentOffset, POSTS_PER_PAGE);
      
      if (reset) {
        setPosts(data);
      } else {
        setPosts(prev => [...prev, ...data]);
      }
      
      setHasMore(data.length === POSTS_PER_PAGE);
      return data;
    } catch (error) {
      console.error('Error loading posts:', error);
      return [];
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [postsData, featuredPost, count] = await Promise.all([
          loadPosts(0, true),
          getFeaturedPost(),
          getTotalPostCount()
        ]);
        setFeatured(featuredPost);
        setTotalPosts(count);
        setOffset(postsData.length);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const newPosts = await loadPosts(offset, false);
    setOffset(prev => prev + newPosts.length);
    setLoadingMore(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loadingMore, offset]);

  const latest = featured 
    ? posts.filter((p) => p.id !== featured.id)
    : posts;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-dark-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-5 sm:gap-6 lg:gap-8">
          <div className="min-w-0 space-y-7 sm:space-y-10 order-1">
            {featured && <FeaturedPost post={featured} />}
            <section>
              <div className="flex items-end justify-between gap-3 mb-4 sm:mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] sm:text-xs font-bold mb-2 sm:mb-2.5">
                    <Clock size={11} className="sm:w-[13px] sm:h-[13px]" />
                    Latest Updates
                  </div>
                  <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-dark-900 flex items-center gap-2">
                    <Sparkles size={18} className="sm:w-5.5 sm:h-5.5 text-primary-600 shrink-0" />
                    See More
                  </h2>
                </div>
                <Link
                  to="/category/trending"
                  className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-primary-800 transition-colors shrink-0"
                >
                  See More
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <PostGrid posts={latest} columns={2} />
              
              {hasMore && (
                <div ref={observerTarget} className="flex items-center justify-center py-8">
                  {loadingMore ? (
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-primary-500 border-t-transparent"></div>
                  ) : (
                    <p className="text-sm text-dark-500">Scroll to load more...</p>
                  )}
                </div>
              )}
            </section>
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start lg:h-fit order-2">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
