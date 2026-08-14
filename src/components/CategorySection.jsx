import { Link } from 'react-router-dom';
import { Smartphone, Gamepad2, Bot, Video, Image, Crown, ArrowRight, Flame } from 'lucide-react';

const iconMap = {
  Smartphone,
  Gamepad2,
  Bot,
  Video,
  Image,
  Crown,
};

const catData = [
  { name: 'অ্যাপস', slug: 'apps', icon: 'Smartphone', description: 'নতুন ও দরকারি অ্যাপস', count: 128, color: 'from-sky-400 to-blue-600' },
  { name: 'গেমস', slug: 'games', icon: 'Gamepad2', description: 'প্রিমিয়াম ও মড গেমস', count: 86, color: 'from-violet-400 to-purple-600' },
  { name: 'AI Tools', slug: 'ai-tools', icon: 'Bot', description: 'AI টুলস ও প্রম্পট', count: 72, color: 'from-cyan-400 to-teal-600' },
  { name: 'ভিডিও এডিটিং', slug: 'video-editing', icon: 'Video', description: 'ভিডিও এডিটিং অ্যাপ', count: 54, color: 'from-rose-400 to-pink-600' },
  { name: 'ফটো এডিটিং', slug: 'photo-editing', icon: 'Image', description: 'ফটো এডিটিং টুলস', count: 45, color: 'from-amber-400 to-orange-600' },
  { name: 'প্রিমিয়াম অ্যাপ', slug: 'premium-apps', icon: 'Crown', description: 'সব প্রিমিয়াম অ্যাপ', count: 63, color: 'from-indigo-400 to-blue-700' },
];

export default function CategorySection() {
  return (
    <section className="relative">
      <div className="flex items-end justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] sm:text-xs font-bold mb-2 sm:mb-2.5">
            <Flame size={11} className="sm:w-3.5 sm:h-3.5" />
            সবচেয়ে বেশি পঠিত
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-dark-900">
            জনপ্রিয় ক্যাটাগরি
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-4">
        {catData.map((cat) => {
          const Icon = iconMap[cat.icon] || Smartphone;
          return (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 lg:p-5 rounded-2xl bg-white border border-dark-100 hover:border-primary-200 hover:shadow-card transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden min-w-0"
            >
              <div className={`absolute inset-x-0 top-0 h-0.5 sm:h-1 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="min-w-0 w-full flex flex-col items-center">
                <h3 className="text-sm sm:text-base font-extrabold text-dark-900 mb-0.5 sm:mb-1 group-hover:text-primary-700 transition-colors line-clamp-1 whitespace-normal break-words w-full">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-dark-500 mb-1.5 sm:mb-2 line-clamp-1 whitespace-normal break-words w-full">
                  {cat.description}
                </p>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-dark-50 group-hover:bg-primary-50 text-[10px] sm:text-xs font-bold text-dark-600 group-hover:text-primary-700 transition-all whitespace-nowrap shrink-0">
                  {cat.count} পোস্ট
                  <ArrowRight size={10} className="sm:w-2.5 sm:h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
