import { Send, ArrowRight, Sparkles } from 'lucide-react';

export default function TelegramCTA() {
  return (
    <a
      href="https://t.me/techzonebd"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-[#229ED9] via-[#1a8fc7] to-[#0b7eb6] p-4 sm:p-5 sm:p-6 text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-28 sm:w-32 h-28 sm:h-32 bg-white/10 rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
            <Send size={18} className="sm:w-[22px] sm:h-[22px] rotate-[-20deg]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles size={11} className="sm:w-3 sm:h-3 text-amber-300" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/80">Exclusive</span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold leading-tight">Telegram Channel</h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-3.5 sm:mb-4 line-clamp-3">
          নতুন APK, Premium App এবং AI Prompt সবার আগে পেতে আমাদের Telegram Channel-এ Join করুন।
        </p>

        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white text-[#229ED9] font-extrabold text-xs sm:text-sm shadow-lg group-hover:shadow-xl transition-all w-auto">
          Join Telegram
          <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </a>
  );
}
