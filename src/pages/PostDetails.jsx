import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  Calendar,
  Eye,
  Share2,
  Download,
  Copy,
  Check,
  Tag,
} from 'lucide-react';

import Breadcrumb from '../components/Breadcrumb.jsx';
import ArticleContent from '../components/ArticleContent.jsx';
import RelatedPosts from '../components/RelatedPosts.jsx';
import Comments from '../components/Comments.jsx';
import Sidebar from '../components/Sidebar.jsx';
import TelegramCTA from '../components/TelegramCTA.jsx';

import { getPostBySlug } from '../data/posts.js';

export default function PostDetails() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  const [copied, setCopied] = useState(false);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  // Supports prompt from posts.js
  const prompt = post.prompt || '';

  const copyPrompt = async () => {
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.description || post.title,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied!');
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">

      {/* Breadcrumb */}
     
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-5 sm:gap-6 lg:gap-8">

        {/* =========================
            MAIN ARTICLE
        ========================== */}
        <article className="min-w-0 order-1">

          {/* Article Header */}
          <header className="mb-5 sm:mb-8">

          

            <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold tracking-tight text-dark-900 leading-[1.25] mb-4 sm:mb-5 text-balance">
              {post.title}
            </h1>

           
          </header>

          {/* =========================
              FEATURE IMAGE
              Nothing is placed over image
          ========================== */}
          <div className="mb-5 sm:mb-8 rounded-2xl overflow-hidden border border-dark-100 shadow-card bg-dark-50">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full h-auto object-cover aspect-[16/9]"
            />
          </div>

          {/* =========================
              ARTICLE CONTENT
          ========================== */}
          <div className="bg-white rounded-2xl border border-dark-100 p-4 sm:p-6 lg:p-8 shadow-soft">

            <ArticleContent
              blocks={post.content || []}
            />

            {/* =========================
                AI PROMPT
            ========================== */}
            {prompt && (
              <section className="mt-8 sm:mt-10 pt-7 sm:pt-9 border-t border-dark-100">

                <div className="mb-4 sm:mb-5">

                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] sm:text-xs font-bold text-primary-700 uppercase tracking-wider">
                    AI Prompt
                  </span>

                  <h2 className="mt-2.5 text-xl sm:text-2xl lg:text-3xl font-extrabold text-dark-900">
                    Ready-to-Use Prompt
                  </h2>

                  <p className="mt-1.5 text-xs sm:text-sm text-dark-500">
                    Copy the prompt below and use it with your preferred AI tool.
                  </p>

                </div>

                <div className="relative overflow-hidden rounded-2xl border border-dark-200 bg-dark-50">

                  {/* Prompt Header */}
                  <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-dark-200 bg-white">

                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />

                      <span className="text-xs sm:text-sm font-bold text-dark-700 truncate">
                        AI Generation Prompt
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={copyPrompt}
                      className={`shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        copied
                          ? 'bg-green-500 text-white'
                          : 'bg-dark-900 hover:bg-dark-800 text-white'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check size={15} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={15} />
                          Copy Prompt
                        </>
                      )}
                    </button>

                  </div>

                  {/* Prompt Content */}
                  <div className="p-5 sm:p-7 lg:p-8">
                    <p className="text-sm sm:text-base lg:text-[17px] text-dark-700 leading-8 whitespace-pre-line">
                      {prompt}
                    </p>
                  </div>

                </div>

              </section>
            )}

            {/* =========================
                TAGS
            ========================== */}
            {post.tags?.length > 0 && (
              <div className="mt-7 sm:mt-9 pt-5 sm:pt-6 border-t border-dark-100">

                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Tag
                    size={14}
                    className="sm:w-[15px] sm:h-[15px] text-primary-600 shrink-0"
                  />

                  <span className="text-xs sm:text-sm font-extrabold text-dark-900">
                    Tags
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-dark-50 border border-dark-100 text-xs font-semibold text-dark-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>
            )}

            {/* =========================
                SHARE / SAVE
            ========================== */}
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-primary-50 via-white to-primary-50 border border-primary-100">

              <p className="text-xs sm:text-sm font-semibold text-dark-700 text-center sm:text-left">
                Enjoyed this post? Share it with your friends.
              </p>

              <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-2.5">

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-soft hover:-translate-y-0.5 transition-all text-[11px] sm:text-xs font-bold w-full sm:w-auto"
                >
                  <Download
                    size={13}
                    className="sm:w-3.5 sm:h-3.5"
                  />

                  <span className="hidden sm:inline">
                    Save
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-dark-700 to-dark-900 text-white shadow-soft hover:-translate-y-0.5 transition-all text-[11px] sm:text-xs font-bold w-full sm:w-auto"
                >
                  <Share2
                    size={13}
                    className="sm:w-3.5 sm:h-3.5"
                  />

                  <span className="hidden sm:inline">
                    Share
                  </span>
                </button>

              </div>
            </div>

          </div>

          {/* Related Posts */}
          <RelatedPosts currentSlug={slug} />

          {/* Comments */}
          <Comments />

          {/* Mobile Telegram */}
          <div className="mt-6 lg:hidden order-last">
            <TelegramCTA />
          </div>

        </article>

        {/* =========================
            SIDEBAR - KEPT
        ========================== */}
        <div className="lg:sticky lg:top-20 lg:self-start lg:h-fit order-2">
          <Sidebar />
        </div>

      </div>
    </div>
  );
}