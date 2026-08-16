import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, MapPin, Phone, Send, CheckCircle,
  MessageSquare, HelpCircle, Clock, ChevronRight, Home, Send as TelegramIcon
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-7 md:py-8 lg:py-10">
      <div className="mb-4 sm:mb-5 md:mb-7">
        <Breadcrumb items={[{ label: 'Contact us' }]} />
      </div>

      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-5 sm:p-8 lg:p-12 xl:p-14 mb-6 sm:mb-8 md:mb-9 lg:mb-10 shadow-card text-white">
        <div className="absolute -top-20 -right-20 sm:-top-24 sm:-right-24 w-72 h-72 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 sm:-bottom-24 sm:-left-24 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-primary-400/10 rounded-full blur-3xl" />
        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 border border-white/15 text-primary-100 text-[11px] sm:text-xs font-bold mb-4 sm:mb-5">
            <MessageSquare size={12} className="sm:size-[13px]" />
            যোগাযোগ
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-3 sm:mb-4 text-balance">
            আমাদের সাথে কথা বলুন
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed">
            কোনো প্রশ্ন থাকলে, সাজেশন বা সহযোগিতা দিতে চাইলে নিচের ফর্মটি পূরণ করুন।
            আমরা ২৪ ঘণ্টার মধ্যে উত্তর দিচ্ছি।
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-5 sm:gap-6 lg:gap-8">
        <div className="min-w-0 space-y-7 sm:space-y-8 lg:space-y-10 order-1">
          <section className="bg-white rounded-2xl border border-dark-100 p-5 sm:p-6 lg:p-8 shadow-soft">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 sm:py-14 text-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 animate-pulse">
                  <CheckCircle size={34} className="sm:size-[42px]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-dark-900">ধন্যবাদ! 🎉</h3>
                <p className="text-sm text-dark-600 max-w-md leading-relaxed">
                  আপনার বার্তা সফলভাবে পাঠানো হয়েছে। খুব শীঘ্রই আমাদের টিম আপনার সাথে যোগাযোগ করবে।
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-sm hover:-translate-y-0.5 transition-all shadow-glow w-full sm:w-auto justify-center"
                >
                  <Home size={15} />
                  হোমে ফিরুন
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-dark-900 mb-2">
                  বার্তা পাঠান
                </h2>
                <p className="text-sm text-dark-600 mb-5 sm:mb-6 leading-relaxed">
                  নিচের ফর্মটি পূরণ করে আপনার মতামত, প্রশ্ন বা সহযোগিতার আবেদন পাঠান।
                </p>
                <form onSubmit={submit} className="space-y-3.5 sm:space-y-4 lg:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-dark-700 mb-1.5">আপনার নাম *</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        type="text"
                        placeholder="যেমন: রফিকুল ইসলাম"
                        className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-dark-50 hover:bg-white border border-dark-200 focus:border-primary-300 focus:shadow-glow outline-none transition-all text-sm text-dark-800 placeholder:text-dark-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dark-700 mb-1.5">ইমেইল ঠিকানা *</label>
                      <input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-dark-50 hover:bg-white border border-dark-200 focus:border-primary-300 focus:shadow-glow outline-none transition-all text-sm text-dark-800 placeholder:text-dark-400"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark-700 mb-1.5">বিষয়</label>
                    <input
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      type="text"
                      placeholder="আপনার বার্তার বিষয়..."
                      className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-dark-50 hover:bg-white border border-dark-200 focus:border-primary-300 focus:shadow-glow outline-none transition-all text-sm text-dark-800 placeholder:text-dark-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark-700 mb-1.5">আপনার বার্তা *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      placeholder="এখানে আপনার পুরো বার্তাটি লিখুন..."
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-dark-50 hover:bg-white border border-dark-200 focus:border-primary-300 focus:shadow-glow outline-none transition-all text-sm text-dark-800 placeholder:text-dark-400 resize-none scrollbar-thin"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-bold text-sm transition-all shadow-glow hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
                  >
                    <Send size={16} />
                    বার্তা পাঠান
                  </button>
                </form>
              </>
            )}
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: Mail, label: 'ইমেইল', value: 'contact@techzonebd.com', color: 'from-sky-400 to-blue-600' },
              { icon: MapPin, label: 'অবস্থান', value: 'ঢাকা, বাংলাদেশ', color: 'from-rose-400 to-pink-600' },
              { icon: Clock, label: 'সময়', value: 'প্রতিদিন সকাল ৯টা - রাত ১০টা', color: 'from-violet-400 to-purple-600' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-dark-100 p-4 sm:p-5 hover:shadow-card hover:border-primary-200 transition-all"
              >
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-3 shadow-soft`}>
                  <Icon size={18} className="sm:size-5" />
                </div>
                <p className="text-[11px] sm:text-xs font-bold uppercase text-dark-500 mb-0.5">{label}</p>
                <p className="text-sm font-extrabold text-dark-900 leading-relaxed break-words">{value}</p>
              </div>
            ))}
          </section>

          <section className="bg-white rounded-2xl border border-dark-100 p-5 sm:p-6 lg:p-8 shadow-soft">
            <div className="flex items-start gap-3 mb-4 sm:mb-5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                <HelpCircle size={18} className="sm:size-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-dark-900">FAQ — সচরাচর জিজ্ঞাসা</h2>
                <p className="text-xs sm:text-sm text-dark-600 mt-0.5">সাধারণত যে প্রশ্নগুলো আসে:</p>
              </div>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                ['APK ফাইলগুলো কি নিরাপদ?', 'হ্যাঁ, আমরা প্রতিটি APK ফাইল নিজের ডিভাইসে টেস্ট করে তারপর আপলোড করি।'],
                ['Premium APK ব্যবহার করলে কি সমস্যা হতে পারে?', 'এগুলো শিক্ষামূলক উদ্দেশ্যে দেওয়া হয়েছে। ব্যবহার করার আগে নিজের দেশের আইন সম্পর্কে জানুন।'],
                ['কিভাবে পোস্টে লিখতে পারি?', 'আমাদের Guest Writer-এর সুযোগ আছে। যোগাযোগ করুন।'],
                ['কখন রিপ্লাই পাবো?', 'সাধারণত ১২-২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হয়।'],
              ].map(([q, a]) => (
                <details
                  key={q}
                  className="group rounded-xl border border-dark-100 bg-dark-50/50 hover:bg-white hover:border-primary-200 transition-all open:bg-white open:border-primary-200 open:shadow-soft"
                >
                  <summary className="cursor-pointer list-none px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-4">
                    <span className="text-sm sm:text-base font-extrabold text-dark-900 leading-snug">{q}</span>
                    <ChevronRight size={15} className="sm:size-4 text-dark-400 group-open:rotate-90 transition-transform shrink-0" />
                  </summary>
                  <p className="px-3.5 sm:px-5 pb-3.5 sm:pb-4 text-xs sm:text-sm text-dark-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start lg:h-fit space-y-4 sm:space-y-5 order-2">
          <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-soft">
            <h3 className="text-sm font-extrabold text-dark-900 mb-4">সোশ্যাল মিডিয়া</h3>
            <div className="space-y-3">
              {[
                { icon: TelegramIcon, name: 'Telegram', desc: 'Instant update পান', href: 'https://t.me/techzonebd', color: 'bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9] hover:text-white border-[#229ED9]/20' },
                { icon: Mail, name: 'Email', desc: 'contact@techzonebd.com', href: '#', color: 'bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white border-primary-200' },
                { icon: Phone, name: 'Hotline', desc: 'সকাল ৯টা - রাত ১০টা', href: '#', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border-emerald-200' },
              ].map(({ icon: Icon, name, desc, href, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${color}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur group-hover:bg-white/20 flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-sm">{name}</p>
                    <p className="text-xs opacity-85 truncate">{desc}</p>
                  </div>
                  <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
