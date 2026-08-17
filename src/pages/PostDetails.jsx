import { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  Calendar,
  Eye,
  Tag,
} from 'lucide-react';

import Breadcrumb from '../components/Breadcrumb.jsx';

import RelatedPosts from '../components/RelatedPosts.jsx';
import Comments from '../components/Comments.jsx';
import Sidebar from '../components/Sidebar.jsx';
import TelegramCTA from '../components/TelegramCTA.jsx';
import PushFormDashboard from '../components/PushFormDashboard.jsx';

import { getPostBySlug, incrementPostViews } from '../data/postsSupabase.js';
import { useColors } from '../context/ColorContext.jsx';

export default function PostDetails() {
  const { slug } = useParams();
  const { colors } = useColors();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pushFormSettings, setPushFormSettings] = useState({
    heading: '',
    subheading: '',
    buttons: []
  });

  useEffect(() => {
    async function loadPost() {
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);

        if (postData?.id) {
          await incrementPostViews(postData.id);
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  useEffect(() => {
    async function loadPushFormSettings() {
      try {
        // Use post-specific push form settings directly
        setPushFormSettings({
          heading: post?.push_form_heading || '',
          subheading: post?.push_form_subheading || '',
          buttons: post?.push_form_buttons || []
        });
      } catch (error) {
        console.error('Error loading push form settings:', error);
      }
    }
    loadPushFormSettings();
  }, [post]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-dark-600">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/" replace />;
  }

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
          ========================== */}
          <div className="mb-5 sm:mb-8 rounded-2xl overflow-hidden border border-dark-100 shadow-card bg-dark-50">
            <div className="relative group overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-auto object-cover aspect-[16/9] transition-transform duration-700 ease-out group-hover:scale-105 animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* =========================
              ARTICLE CONTENT
          ========================== */}
          <div className="bg-white rounded-2xl border border-dark-100 p-4 sm:p-6 lg:p-8 shadow-soft">

            {/* Description Section */}
            {post.description && (
              <section className="mb-6 sm:mb-8">
                <div className="mb-4 sm:mb-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] sm:text-xs font-bold text-primary-700 uppercase tracking-wider">
                    Description
                  </span>
                  <h2 className="mt-2.5 text-xl sm:text-2xl lg:text-3xl font-extrabold text-dark-900">
                    About This Post
                  </h2>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-dark-200 bg-dark-50">
                  <div className="p-5 sm:p-7 lg:p-8">
                    <div
                      className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-dark-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Push Form Dashboard */}
            <PushFormDashboard
              heading={post?.push_form_heading || pushFormSettings.heading}
              subheading={post?.push_form_subheading || pushFormSettings.subheading}
              buttons={post?.push_form_buttons || pushFormSettings.buttons}
            />

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

          </div>

          {/* Related Posts */}
          <RelatedPosts currentSlug={slug} />

          {/* Comments */}
          <Comments />

          {/* Mobile Telegram */}
          
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