import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();

    if (!q.trim()) return;

    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7">
        <form onSubmit={submit} className="max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-2xl border border-dark-200 shadow-card focus-within:border-primary-300 focus-within:shadow-glow transition-all px-4 py-3">
            
            <Search
              size={20}
              className="text-dark-400 shrink-0"
            />

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="text"
              placeholder="Search here..."
              className="flex-1 bg-transparent outline-none py-1 px-3 text-sm sm:text-base text-dark-800 placeholder:text-dark-400 min-w-0"
            />

          </div>
        </form>
      </div>
    </section>
  );
}