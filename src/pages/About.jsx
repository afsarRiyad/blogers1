import { Link } from 'react-router-dom';
import { Info, Users, Shield, Target, Heart, Zap, ChevronRight, Home } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb.jsx';

const stats = [
  { num: '১২০০+', label: 'মোট পোস্ট', icon: Zap },
  { num: '৫০০K+', label: 'মাসিক রিডার', icon: Users },
  { num: '৭', label: 'ক্যাটাগরি', icon: Target },
  { num: '১০০%', label: 'নিরাপদ কনটেন্ট', icon: Shield },
];

const team = [
  { name: 'Rafiqul Islam', role: 'Founder & Editor', initial: 'R', color: 'from-primary-400 to-primary-700' },
  { name: 'Sumaiya Akter', role: 'Content Writer', initial: 'S', color: 'from-rose-400 to-pink-600' },
  { name: 'Arif Hossain', role: 'Tech Reviewer', initial: 'A', color: 'from-violet-400 to-purple-600' },
  { name: 'Jahid Hasan', role: 'App Tester', initial: 'J', color: 'from-amber-400 to-orange-600' },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-7 md:py-8 lg:py-10">
      <div className="mb-4 sm:mb-5 md:mb-7">
        <Breadcrumb items={[{ label: 'আমাদের সম্পর্কে' }]} />
      </div>

      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 p-5 sm:p-8 lg:p-12 xl:p-14 mb-6 sm:mb-8 md:mb-9 lg:mb-10 shadow-card text-white">
        <div className="absolute -top-20 -right-20 sm:-top-24 sm:-right-24 w-72 h-72 sm:w-96 sm:h-96 bg-primary-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 sm:-bottom-24 sm:-left-24 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-primary-400/10 rounded-full blur-3xl" />
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-7 lg:gap-8 items-center">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 border border-white/15 text-primary-200 text-[11px] sm:text-xs font-bold mb-4 sm:mb-5">
              <Info size={12} className="sm:size-[13px]" />
              আমাদের সম্পর্কে
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4 sm:mb-5 text-balance">
              TechZone BD —<br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary-300 to-cyan-300 bg-clip-text text-transparent">
                বাংলাদেশের নির্ভরযোগ্য টেক ব্লগ
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed mb-6 sm:mb-7 max-w-2xl">
              ২০২৬ সাল থেকে আমরা বাংলা ভাষায় সঠিক, নির্ভরযোগ্য এবং দরকারি টেকনোলজি কনটেন্ট সরবরাহ করছি।
              APK download, AI Tools, Video Editing tips, Premium Apps — সবকিছু এক জায়গায়।
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white text-dark-900 font-extrabold text-sm hover:-translate-y-0.5 transition-all shadow-lg w-full sm:w-auto justify-center"
              >
                <Home size={15} className="sm:size-4" />
                হোমে যান
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/10 border border-white/15 text-white font-extrabold text-sm hover:bg-white/15 transition-all w-full sm:w-auto justify-center"
              >
                যোগাযোগ করুন
                <ChevronRight size={15} className="sm:size-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
            {stats.map(({ num, label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl sm:rounded-2xl bg-white/8 border border-white/10 backdrop-blur p-3 sm:p-4 lg:p-5 hover:bg-white/12 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary-500/20 border border-primary-400/20 text-primary-300 flex items-center justify-center mb-2.5 sm:mb-3">
                  <Icon size={18} className="sm:size-5" />
                </div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">{num}</p>
                <p className="text-[11px] sm:text-xs lg:text-sm text-white/75 font-semibold mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-5 sm:gap-6 lg:gap-8">
        <div className="min-w-0 space-y-7 sm:space-y-8 lg:space-y-10 order-1">
          <section className="bg-white rounded-2xl border border-dark-100 p-5 sm:p-6 lg:p-8 shadow-soft">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-dark-900 mb-3 sm:mb-4">
              আমাদের লক্ষ্য ও উদ্দেশ্য
            </h2>
            <div className="space-y-3.5 sm:space-y-4 text-dark-700 leading-7 sm:leading-8 text-[14px] sm:text-[15px] text-justify">
              <p>
                TechZone BD-এর প্রধান লক্ষ্য হলো বাংলাভাষী মানুষদের কাছে সঠিক, সত্যিকারের এবং কাজে লাগে এমন
                টেকনোলজি তথ্য পৌঁছে দেওয়া। বর্তমান সময়ে অনেক অলোকিত ও ভুল তথ্য বিভিন্ন ওয়েবসাইটে ছড়িয়ে পড়েছে,
                যা থেকে সাধারণ মানুষকে বাঁচানোই আমাদের প্রথম অগ্রাধিকার।
              </p>
              <p>
                আমরা প্রতিটি APK ফাইল নিজেদের মোবাইলে টেস্ট করে তারপর রিভিউ প্রকাশ করি। AI Prompt গুলো
                প্রথমে ব্যবহার করে দেখি, তারপর কাজ করলে শুধুমাত্র শেয়ার করি। যাতে করে আমাদের রিডাররা
                কোনো সমস্যার সম্মুখীন না হন।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                {[
                  { icon: Shield, title: 'নিরাপদ APK', desc: 'প্রতিটি অ্যাপ পরীক্ষা করে আপলোড করা হয়।' },
                  { icon: Heart, title: 'বাংলা কনটেন্ট', desc: 'সহজ, স্পষ্ট ও পঠনীয় বাংলায় লেখা হয়।' },
                  { icon: Zap, title: 'দ্রুত আপডেট', desc: 'প্রতিদিন নতুন পোস্ট আপলোড করা হয়।' },
                  { icon: Target, title: 'সঠিক তথ্য', desc: 'যাচাই-বাছাই করে তথ্য প্রকাশ করা হয়।' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3 p-3.5 sm:p-4 rounded-xl bg-dark-50 hover:bg-primary-50 border border-dark-100 hover:border-primary-200 transition-colors">
                    <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
                      <Icon size={17} className="sm:size-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-dark-900 mb-0.5">{title}</h4>
                      <p className="text-xs sm:text-sm text-dark-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-dark-900 mb-4 sm:mb-5">
              আমাদের টিম
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {team.map((m) => (
                <div
                  key={m.name}
                  className="bg-white rounded-2xl border border-dark-100 p-4 sm:p-5 text-center hover:shadow-card hover:border-primary-200 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center mx-auto mb-3 text-white text-lg sm:text-xl font-extrabold shadow-soft`}>
                    {m.initial}
                  </div>
                  <h4 className="font-extrabold text-dark-900 text-sm mb-0.5 truncate">{m.name}</h4>
                  <p className="text-[11px] sm:text-xs text-dark-500 font-medium">{m.role}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start lg:h-fit">
          <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-soft">
            <h3 className="text-sm font-extrabold text-dark-900 mb-4">দ্রুত তথ্য</h3>
            <ul className="space-y-3 text-sm">
              {[
                ['Established', 'জানুয়ারি ২০২৬'],
                ['Language', 'বাংলা (Bengali)'],
                ['Category', 'Tech · APK · AI'],
                ['Country', 'বাংলাদেশ 🇧🇩'],
                ['Editorial Team', '৪ জন'],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between pb-3 border-b border-dark-100 last:border-0 last:pb-0">
                  <span className="text-dark-500 text-xs font-bold uppercase">{k}</span>
                  <span className="font-bold text-dark-800 text-right">{v}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-5 flex items-center justify-center gap-1.5 w-full py-3 rounded-xl btn-primary-gradient text-white font-bold text-sm hover:-translate-y-0.5 transition-all shadow-glow"
            >
              যোগাযোগ করুন
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
