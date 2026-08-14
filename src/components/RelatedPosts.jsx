import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import PostCard from './PostCard.jsx';
import { getRelatedPosts } from '../data/posts.js';

export default function RelatedPosts({ currentSlug, limit = 3 }) {
  const posts = getRelatedPosts(currentSlug, limit);
  if (!posts.length) return null;

  return (
    <section className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-dark-100">
      <div className="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 shrink-0">
          <Lightbulb size={15} className="sm:w-[18px] sm:h-[18px]" />
        </div>
        <div>
          <h3 className="text-base sm:text-xl font-extrabold tracking-tight text-dark-900">
            আপনার জন্য আরও পোস্ট
          </h3>
          <p className="text-[11px] sm:text-xs text-dark-500 mt-0.5 hidden sm:block">এই পোস্টগুলোও আপনার পছন্দ হতে পারে</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}
