import { Link, Navigate, useParams } from 'react-router-dom';
import { Calendar, Eye, Share2, Download, Tag } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb.jsx';
import ArticleContent from '../components/ArticleContent.jsx';
import RelatedPosts from '../components/RelatedPosts.jsx';
import Comments from '../components/Comments.jsx';
import Sidebar from '../components/Sidebar.jsx';
import TelegramCTA from '../components/TelegramCTA.jsx';
import Tags from '../components/Tags.jsx';
import { getPostBySlug } from '../data/posts.js';

export default function PostDetails() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
      <div className="mb-4 sm:mb-7">
        <Breadcrumb
          items={[
            { label: post.category, to: `/category/${post.categorySlug}` },
            { label: post.title },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-5 sm:gap-6 lg:gap-8">
        <article className="min-w-0 order-1">
          <header className="mb-5 sm:mb-8">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <Link
                to={`/category/${post.categorySlug}`}
                className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-[11px] sm:text-xs font-bold text-primary-700 hover:bg-primary-100 transition-colors"
              >
                {post.category}
              </Link>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold tracking-tight text-dark-900 leading-[1.25] mb-4 sm:mb-5 text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-6 gap-y-2.5 text-xs sm:text-sm text-dark-500 pb-4 sm:pb-6 border-b border-dark-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[11px] sm:text-xs font-extrabold shadow-soft shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-dark-800 text-xs sm:text-sm leading-tight">{post.author}</p>
                  <p className="text-[10px] sm:text-[11px] text-dark-400">লেখক</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} className="sm:w-3.5 sm:h-3.5 text-primary-600 shrink-0" />
                <span className="font-medium">{post.date}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye size={13} className="sm:w-3.5 sm:h-3.5 text-primary-600 shrink-0" />
                <span className="font-medium tabular-nums">{post.views?.toLocaleString()} views</span>
              </span>
              <span className="inline-flex items-center gap-1.5 ml-auto text-primary-700 cursor-pointer hover:text-primary-800 font-bold px-2.5 py-1.5 rounded-lg hover:bg-primary-50 transition-colors shrink-0">
                <Share2 size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-xs sm:text-sm">শেয়ার করুন</span>
              </span>
            </div>
          </header>

          <div className="mb-5 sm:mb-8 rounded-2xl overflow-hidden border border-dark-100 shadow-card">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full h-auto object-cover aspect-[16/9]"
            />
          </div>

          <div className="bg-white rounded-2xl border border-dark-100 p-4 sm:p-6 lg:p-8 shadow-soft">
            <ArticleContent blocks={post.content || []} />

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-dark-100">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Tag size={14} className="sm:w-[15px] sm:h-[15px] text-primary-600 shrink-0" />
                <span className="text-xs sm:text-sm font-extrabold text-dark-900">ট্যাগসমূহ</span>
              </div>
              <Tags tags={['APK', 'Premium', post.categorySlug, 'Android', '2026']} />
            </div>

            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-primary-50 via-white to-primary-50 border border-primary-100">
              <p className="text-xs sm:text-sm font-semibold text-dark-700 text-center sm:text-left">
                পোস্টটি ভালো লেগেছলে বন্ধুদের সাথে শেয়ার করুন 💙
              </p>
              <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-2.5">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r shadow-soft hover:-translate-y-0.5 transition-all text-[11px] sm:text-xs font-bold from-primary-500 to-primary-700 text-white w-full sm:w-auto"
                >
                  <Download size={13} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Save</span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r shadow-soft hover:-translate-y-0.5 transition-all text-[11px] sm:text-xs font-bold from-dark-700 to-dark-900 text-white w-full sm:w-auto"
                >
                  <Share2 size={13} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </div>

          <RelatedPosts currentSlug={slug} />

          <Comments />

          <div className="mt-6 lg:hidden order-last">
            <TelegramCTA />
          </div>
        </article>

        <div className="lg:sticky lg:top-20 lg:self-start lg:h-fit order-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
