import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/60 via-transparent to-transparent" />
      <div className="absolute -top-24 -left-24 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-primary-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute -top-12 right-0 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-primary-300/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] sm:text-xs font-bold mb-3 sm:mb-5 shadow-soft">
            <Sparkles size={11} className="sm:w-[13px] sm:h-[13px] text-primary-600" />
            <span>২০২৬ এর সবচেয়ে নির্ভরযোগ্য টেক ব্লগ</span>
          </div>

          <h1 className="text-balance text-xl sm:text-2xl lg:text-5xl font-extrabold tracking-tight text-dark-900 mb-2.5 sm:mb-4 leading-[1.25]">
            সেরা{' '}
            <span className="relative inline-block text-primary-600">
              APK
              <svg viewBox="0 0 200 8" className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-2" preserveAspectRatio="none">
                <path d="M0,4 Q50,0 100,4 T200,4" stroke="url(#hgrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="hgrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            , <span className="text-dark-900">AI Tools</span> ও{' '}
            <span className="text-dark-900">Premium Apps</span>
          </h1>

          <p className="text-dark-600 text-xs sm:text-base lg:text-lg mb-5 sm:mb-8 leading-relaxed max-w-2xl mx-auto line-clamp-3 sm:line-clamp-4">
            প্রতিদিন নতুন নতুন অ্যাপ, AI টুলস, ভিডিও এডিটিং অ্যাপ এবং প্রয়োজনীয়
            টেকনোলজি টিপস এক জায়গায়।
          </p>

          <form onSubmit={submit} className="relative max-w-xl mx-auto mb-5 sm:mb-6">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl border border-dark-200 shadow-card p-1.5 focus-within:border-primary-300 focus-within:shadow-glow transition-all gap-1.5 sm:gap-0">
              <div className="flex items-center pl-3 pt-1 sm:pt-0 text-dark-400">
                <Search size={18} />
              </div>
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                type="text"
                placeholder="আপনি কী খুঁজছেন? (CapCut, AI Prompt...)"
                className="flex-1 bg-transparent outline-none py-2 px-2 sm:px-2 text-xs sm:text-base text-dark-800 placeholder:text-dark-400 min-w-0"
              />
              <button
                type="submit"
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl sm:rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-bold text-xs sm:text-sm transition-all shadow-glow hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>সার্চ করুন</span>
                <ArrowRight size={14} className="sm:w-4 sm:h-4 hidden sm:inline" />
              </button>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 max-w-2xl mx-auto">
            {[
              { icon: Zap, label: 'দ্রুত ডাউনলোড' },
              { icon: ShieldCheck, label: 'নিরাপদ APK' },
              { icon: Sparkles, label: 'AI প্রম্পট' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2.5 rounded-xl bg-white/60 backdrop-blur border border-dark-100 shadow-soft">
                <Icon size={13} className="sm:w-[15px] sm:h-[15px] text-primary-600 shrink-0" />
                <span className="text-[10px] sm:text-sm font-semibold text-dark-700 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
