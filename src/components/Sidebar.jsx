import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import PopularPosts from './PopularPosts.jsx';
import Categories from './Categories.jsx';
import Tags from './Tags.jsx';
import TelegramCTA from './TelegramCTA.jsx';
import { tagsList } from '../data/posts.js';

export default function Sidebar() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setQ('');
  };

  return (
    <aside className="space-y-5 lg:space-y-6 sticky top-24 self-start">
      <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-soft">
        <h3 className="text-sm font-extrabold text-dark-900 mb-4 flex items-center gap-2">
          <Search size={16} className="text-primary-600" />
          পোস্ট খুঁজুন
        </h3>
        <form onSubmit={submit}>
          <div className="relative flex items-center bg-dark-50 hover:bg-white border border-dark-200 rounded-xl focus-within:border-primary-300 focus-within:shadow-glow transition-all">
            <div className="pl-3 text-dark-400">
              <Search size={16} />
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="text"
              placeholder="সার্চ করুন..."
              className="flex-1 bg-transparent outline-none py-2.5 px-2 text-sm text-dark-800 placeholder:text-dark-400"
            />
            <button
              type="submit"
              className="shrink-0 mr-1.5 px-3.5 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs transition-colors"
            >
              খুঁজুন
            </button>
          </div>
        </form>
      </div>

      <TelegramCTA />

      <PopularPosts />

      <Categories />

      <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-soft">
        <h3 className="text-sm font-extrabold text-dark-900 mb-4">ট্যাগ</h3>
        <Tags tags={tagsList} />
      </div>
    </aside>
  );
}
