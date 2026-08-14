import { Link } from 'react-router-dom';
import { Send, Facebook, Youtube, ChevronRight, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 bg-white border-t border-dark-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8 lg:gap-10">
          <div className="space-y-3.5 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow shrink-0">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="absolute -top-1 -right-1 text-[8px] sm:text-[9px] font-extrabold bg-dark-900 text-white px-1 py-0.5 rounded-md leading-none">
                  BD
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-dark-900">
                  Tech<span className="text-primary-600">Zone</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-dark-500 font-medium">Technology · APK · AI</span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-dark-600 leading-relaxed max-w-sm">
              প্রযুক্তি, APK, AI Tools এবং প্রয়োজনীয় টেকনোলজি সম্পর্কিত তথ্যের নির্ভরযোগ্য প্ল্যাটফর্ম। প্রতিদিন নতুন পোস্ট, দ্রুত ডাউনলোড ও সঠিক তথ্য।
            </p>
            <div className="flex items-center gap-2 pt-1">
              {[
                { key: 'tg', icon: Send, href: 'https://t.me/techzonebd', color: 'bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9] hover:text-white' },
                { key: 'fb', icon: Facebook, href: '#', color: 'bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white' },
                { key: 'yt', icon: Youtube, href: '#', color: 'bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white' },
                { key: 'mail', icon: Mail, href: '#', color: 'bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white' },
              ].map(({ key, icon: Icon, href, color }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border border-transparent transition-all duration-200 ${color}`}
                  aria-label={key}
                >
                  <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 mb-3 sm:mb-4 tracking-tight">দ্রুত লিংক</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: 'হোম', to: '/' },
                { label: 'আমাদের সম্পর্কে', to: '/about' },
                { label: 'যোগাযোগ করুন', to: '/contact' },
                { label: 'প্রাইভেসি পলিসি', to: '#' },
                { label: 'ডিসক্লেইমার', to: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-dark-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 mb-3 sm:mb-4 tracking-tight">ক্যাটাগরি</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: 'অ্যাপস', slug: 'apps' },
                { label: 'গেমস', slug: 'games' },
                { label: 'AI Tools', slug: 'ai-tools' },
                { label: 'ভিডিও এডিটিং', slug: 'video-editing' },
                { label: 'ফটো এডিটিং', slug: 'photo-editing' },
                { label: 'প্রিমিয়াম অ্যাপ', slug: 'premium-apps' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={`/category/${item.slug}`}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-dark-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 mb-3 sm:mb-4 tracking-tight">নিউজলেটার</h3>
            <p className="text-xs sm:text-sm text-dark-600 leading-relaxed mb-3.5 sm:mb-4">
              প্রতিদিনের নতুন পোস্ট, Premium APK ও AI Prompt সবার আগে পেতে সাবস্ক্রাইব করুন।
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white rounded-xl border border-dark-200 p-1.5 focus-within:border-primary-300 focus-within:shadow-glow transition-all">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল..."
                  className="flex-1 bg-transparent outline-none px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-dark-800 placeholder:text-dark-400 min-w-0"
                />
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center justify-center gap-1 px-3.5 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-bold text-[11px] sm:text-xs transition-all shadow-glow hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  সাবস্ক্রাইব
                </button>
              </div>
            </form>
            <div className="pt-2">
              <a
                href="https://t.me/techzonebd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/15 text-[#229ED9] font-semibold text-xs sm:text-sm border border-[#229ED9]/20 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <Send size={14} className="sm:w-4 sm:h-4 rotate-[-20deg]" />
                Join Telegram Channel
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-5 sm:pt-6 border-t border-dark-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] sm:text-xs text-dark-500 font-medium text-center sm:text-left leading-relaxed">
            © ২০২৬ TechZone BD — সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-end">
            <span className="text-[11px] text-dark-400">Made with ♥ in Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
