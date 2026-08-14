import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Send, ChevronRight } from 'lucide-react';

const navItems = [
  { label: 'হোম', to: '/' },
  { label: 'অ্যাপস', to: '/category/apps' },
  { label: 'গেমস', to: '/category/games' },
  { label: 'AI Tools', to: '/category/ai-tools' },
  { label: 'ভিডিও', to: '/category/video-editing' },
  { label: 'ট্রেন্ডিং', to: '/category/trending' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery('');
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-dark-100 shadow-soft'
          : 'bg-white/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="TechZone BD Home">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="absolute -top-1 -right-1 text-[8px] sm:text-[9px] font-extrabold bg-dark-900 text-white px-1 py-0.5 rounded-md leading-none">
                BD
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-dark-900 whitespace-nowrap">
                Tech<span className="text-primary-600">Zone</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-dark-500 font-medium hidden sm:block">Technology · APK · AI</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-dark-700 hover:text-primary-700 hover:bg-dark-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            <form
              onSubmit={handleSearch}
              className={`hidden md:flex items-center transition-all duration-300 ${
                searchOpen ? 'w-52 lg:w-64 opacity-100' : 'w-10 opacity-100'
              }`}
            >
              <div
                className={`flex items-center bg-dark-50 hover:bg-white border transition-all duration-200 rounded-full ${
                  searchOpen
                    ? 'w-full border-primary-200 shadow-glow'
                    : 'w-10 h-10 justify-center border-dark-100 hover:border-primary-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSearchOpen(s => !s)}
                  className="shrink-0 w-10 h-10 flex items-center justify-center text-dark-600 hover:text-primary-600 transition-colors"
                  aria-label="Search toggle"
                >
                  <Search size={18} />
                </button>
                {searchOpen && (
                  <input
                    autoFocus
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    type="text"
                    placeholder="সার্চ করুন..."
                    className="flex-1 bg-transparent outline-none text-sm text-dark-800 placeholder:text-dark-400 pr-3 py-2 min-w-0"
                  />
                )}
              </div>
            </form>

            <a
              href="https://t.me/techzonebd"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#229ED9]/10 hover:bg-[#229ED9]/15 text-[#229ED9] font-semibold text-sm border border-[#229ED9]/20 transition-all hover:-translate-y-0.5 hover:shadow-md shrink-0"
              aria-label="Telegram"
            >
              <Send size={15} className="rotate-[-20deg]" />
              <span className="hidden md:inline">Telegram</span>
            </a>

            <button
              aria-label="Mobile search"
              onClick={() => {
                const input = document.getElementById('mobile-search-input');
                if (input) input.focus();
              }}
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-dark-50 hover:bg-dark-100 text-dark-700 transition-colors shrink-0"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-dark-50 hover:bg-dark-100 text-dark-700 transition-colors shrink-0"
              aria-label="Menu"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search (always visible on small screens) */}
      <form onSubmit={handleSearch} className="md:hidden px-3 sm:px-4 pb-3 pt-1">
        <div className="flex items-center gap-2 bg-white border border-dark-200 rounded-full px-3 py-2 shadow-soft">
          <Search size={15} className="text-dark-500 shrink-0" />
          <input
            id="mobile-search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            type="text"
            placeholder="আপনি কী খুঁজছেন?"
            className="flex-1 bg-transparent outline-none text-sm text-dark-800 placeholder:text-dark-400 min-w-0"
          />
        </div>
      </form>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
          open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-dark-900/40 backdrop-blur-sm ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[320px] sm:max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 border-b border-dark-100 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-sm sm:text-base font-extrabold text-dark-900 whitespace-nowrap">
                Tech<span className="text-primary-600">Zone</span> BD
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-lg bg-dark-50 hover:bg-dark-100 text-dark-700 flex items-center justify-center shrink-0"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-3 sm:px-4 py-3 border-b border-dark-100">
            <form onSubmit={handleSearch}>
              <div className="flex items-center gap-2 bg-dark-50 border border-dark-200 focus-within:border-primary-300 focus-within:shadow-glow rounded-full px-3 py-2 transition-all">
                <Search size={15} className="text-dark-500 shrink-0" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  type="text"
                  placeholder="সার্চ করুন..."
                  className="flex-1 bg-transparent outline-none text-sm text-dark-800 placeholder:text-dark-400 min-w-0"
                />
              </div>
            </form>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 scrollbar-thin min-h-0">
            {navItems.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-soft'
                      : 'text-dark-700 hover:bg-dark-50'
                  }`
                }
                style={{ animation: open ? `slideIn .2s ease ${i * 30}ms both` : 'none' }}
              >
                <span>{item.label}</span>
                <ChevronRight size={15} className="text-dark-400 shrink-0" />
              </NavLink>
            ))}
          </nav>

          <div className="p-3 sm:p-4 border-t border-dark-100 space-y-2.5 shrink-0 safe-bottom">
            <a
              href="https://t.me/techzonebd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl bg-[#229ED9] text-white font-bold hover:bg-[#1a8fc7] transition-colors text-sm"
            >
              <Send size={17} />
              Join Telegram
            </a>
            <p className="text-center text-[11px] sm:text-xs text-dark-400">© 2026 TechZone BD</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </header>
  );
}
