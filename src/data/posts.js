// const img = (seed, w = 800, h = 500) =>
//   `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

// export const categories = [
//   { name: 'অ্যাপস', slug: 'apps', count: 128, icon: 'Smartphone', description: 'নতুন ও দরকারি অ্যাপসের APK ডাউনলোড করুন' },
//   { name: 'গেমস', slug: 'games', count: 86, icon: 'Gamepad2', description: 'প্রিমিয়াম ও মড গেমস ডাউনলোড করুন' },
//   { name: 'AI Tools', slug: 'ai-tools', count: 72, icon: 'Bot', description: 'AI টুলস ও প্রম্পট কালেকশন' },
//   { name: 'ভিডিও এডিটিং', slug: 'video-editing', count: 54, icon: 'Video', description: 'সেরা ভিডিও এডিটিং অ্যাপ ও টিপস' },
//   { name: 'ফটো এডিটিং', slug: 'photo-editing', count: 45, icon: 'Image', description: 'ফটো এডিটিং অ্যাপ ও AI টুলস' },
//   { name: 'প্রিমিয়াম অ্যাপ', slug: 'premium-apps', count: 63, icon: 'Crown', description: 'সব প্রিমিয়াম অ্যাপ এক জায়গায়' },
//   { name: 'টেকনোলজি', slug: 'technology', count: 112, icon: 'Zap', description: 'টেকনোলজি নিউজ ও টিপস' },
//   { name: 'ট্রেন্ডিং', slug: 'trending', count: 98, icon: 'TrendingUp', description: 'বর্তমান ট্রেন্ডিং কনটেন্ট' },
// ];

// export const tagsList = [
//   'APK', 'AI', 'ChatGPT', 'CapCut', 'TikTok', 'Prompt', 'Premium',
//   'Android', 'Video Editing', 'Photo Editing', 'Mod APK', 'Midjourney',
//   'Canva', 'Snapseed', 'VPN', 'Adobe', 'YouTube', 'Facebook',
// ];

// export const posts = [
//   {
//     id: 1,
//     title: 'CapCut Premium APK Download (সব ফিচার আনলকড) ২০২৬',
//     slug: 'capcut-premium-apk',
//     category: 'ভিডিও এডিটিং',
//     categorySlug: 'video-editing',
//     image: img('capcut-premium-video'),
//     description: 'CapCut Premium APK-এর সর্বশেষ ভার্সন ডাউনলোড করুন। এখানে সব প্রিমিয়াম ফিচার, কোনো ওয়াটারমার্ক ছাড়া, 4K export এবং VIP টেমপ্লেট সম্পূর্ণ ফ্রিতে পাচ্ছেন।',
//     date: '১৪ আগস্ট ২০২৬',
//     author: 'TechZone BD',
//     views: 15420,
//     featured: false,
//     content: [
//       { type: 'p', text: 'আজকের পোস্টে আমরা CapCut এর Premium APK নিয়ে আলোচনা করবো। আপনি যদি ভিডিও এডিটিং করেন তাহলে নিশ্চয়ই CapCut-এর নাম পরিচিত। এটি বিশ্বের সবচেয়ে জনপ্রিয় ভিডিও এডিটিং অ্যাপগুলোর একটি।' },
//       { type: 'h2', text: 'CapCut Premium-এর প্রধান ফিচারসমূহ' },
//       { type: 'list', items: ['সব প্রিমিয়াম টেমপ্লেট ফ্রি', 'কোনো ওয়াটারমার্ক নেই', '4K 60FPS এক্সপোর্ট সাপোর্ট', 'AI টুলস সম্পূর্ণ আনলকড', 'VIP সাউন্ড ট্র্যাক অ্যাক্সেস', 'কোনো অ্যাড নেই'] },
//       { type: 'h2', text: 'ডাউনলোড করার নিয়ম' },
//       { type: 'ordered', items: ['নিচের Download button-এ ক্লিক করুন।', 'কিছুক্ষণ অপেক্ষা করুন, ফাইলটি ডাউনলোড শুরু হবে।', 'ডাউনলোড শেষ হলে APK ফাইলটি ওপেন করুন।', 'Unkown Sources allow করে Install করুন।'] },
//       { type: 'warning', text: 'Premium APK ব্যবহার করার আগে নিজের দেশের আইন গুলো জেনে নিন। এটি শিক্ষামূলক উদ্দেশ্যে দেওয়া হয়েছে।' },
//       { type: 'download', label: 'CapCut Premium APK ডাউনলোড করুন', size: '92 MB', version: 'v12.1.0' },
//     ],
//   },
//   {
//     id: 2,
//     title: 'AI দিয়ে কয়েক মিনিটেই তৈরি করুন Viral Video — Sora-এর মতো',
//     slug: 'ai-viral-video-prompt',
//     category: 'AI Tools',
//     categorySlug: 'ai-tools',
//     image: img('ai-video-viral-cinematic'),
//     description: 'শুধু একটি Prompt দিয়ে ঘরে বসে তৈরি করুন কয়েক মিনিটের মধ্যে সিনেমাটিক, রিয়ালিস্টিক ভিডিও। আজকের পোস্টে Sora-সমান ফলাফল দেয় এমন কয়েকটি টুল শেয়ার করছি।',
//     date: '১৩ আগস্ট ২০২৬',
//     author: 'TechZone BD',
//     views: 28910,
//     featured: true,
//     content: [
//       { type: 'p', text: 'AI পিছিয়ে এমন দিন আর নেই যখন ভিডিও তৈরি করতে হয় প্রফেশনাল এডিটিং সফটওয়্যারের ওপর নির্ভর করে। আজকাল শুধু একটি ভালো Prompt দিলেই সিনেমাটিক, রিয়ালিস্টিক ভিডিও তৈরি করা সম্ভব।' },
//       { type: 'h2', text: 'সেরা AI ভিডিও জেনারেটর টুলস' },
//       { type: 'list', items: ['Runway Gen-3', 'Pika Labs 1.0', 'Kling AI', 'Luma Dream Machine', 'Sora (আনুষ্ঠানিকরা আসছে)'] },
//       { type: 'h2', text: 'ভাইরাল হওয়ার জন্য পারফেক্ট Prompt' },
//       { type: 'prompt', text: 'Cinematic wide shot of a young man walking on a neon-lit rainy street in Tokyo at night, reflections on wet pavement, moody lighting, shallow depth of field, shot on ARRI Alexa, 8K, dramatic atmosphere, slow motion, 24fps' },
//       { type: 'info', text: 'টিপস: Prompt-এর সাথে cinematic, shot on camera model, lighting style — এইগুলো যোগ করলেই ভিডিও অনেক premium দেখাবে।' },
//     ],
//   },
//   {
//     id: 3,
//     title: 'Shazam Premium APK — সীমাহীন সংগীত শনাক্তকরণ',
//     slug: 'shazam-premium-apk',
//     category: 'প্রিমিয়াম অ্যাপ',
//     categorySlug: 'premium-apps',
//     image: img('shazam-music-app'),
//     description: 'Shazam Premium APK ডাউনলোড করুন। কোনো অ্যাড নেই, অফলাইন মোড, Auto-play এবং সব প্রিমিয়াম ফিচার আনলকড।',
//     date: '১৩ আগস্ট ২০২৬',
//     author: 'Rafiqul Islam',
//     views: 9820,
//     featured: false,
//     content: [
//       { type: 'p', text: 'Shazam হলো বিশ্বের সবচেয়ে জনপ্রিয় সংগীত শনাক্তকরণ অ্যাপ। কোনো গান শুনে নাম জানা না থাকলে শুধু ৫ সেকেন্ড শোনালেই Shazam বলে দিবে গানের নাম, শিল্পী ও অ্যালবাম।' },
//       { type: 'download', label: 'Shazam Premium APK ডাউনলোড করুন', size: '48 MB', version: 'v14.12.0' },
//     ],
//   },
//   {
//     id: 4,
//     title: 'TikTok Viral Video তৈরি করার টপ ১০টি AI Prompt',
//     slug: 'tiktok-viral-video-prompt',
//     category: 'AI Tools',
//     categorySlug: 'ai-tools',
//     image: img('tiktok-viral-video-ai'),
//     description: 'TikTok-এ ভাইরাল হতে চান? আজকের পোস্টে ১০টি প্রোফেশনাল AI Prompt শেয়ার করেছি যা কপি করে স্টোরি ও রিলস তৈরি করতে পারবেন।',
//     date: '১২ আগস্ট ২০২৬',
//     author: 'Sumaiya Akter',
//     views: 41230,
//     featured: false,
//     content: [
//       { type: 'p', text: 'TikTok-এ ভাইরাল হওয়ার মূল রহস্য হলো আকর্ষণীয় কনটেন্ট। যখন AI ব্যবহার করে কোয়ালিটি কনটেন্ট বানাবেন তখনই engagement বাড়বে।' },
//       { type: 'h2', text: 'প্রম্পট নম্বর — ০১' },
//       { type: 'prompt', text: 'A 15-second vertical TikTok hook showing a surprising "before vs after" glow-up of a teenager, trending transition effect, upbeat audio sync, text overlay: "যারা মনে করে দামি প্রোডাক্ট দরকার?", bold captions, fast-paced cuts, high-energy' },
//     ],
//   },
//   {
//     id: 5,
//     title: 'ChatGPT Viral Photo Prompt — AI দিয়ে সুন্দর ছবি তৈরি',
//     slug: 'chatgpt-viral-photo-prompt',
//     category: 'AI Tools',
//     categorySlug: 'ai-tools',
//     image: img('ai-photo-prompt-midjourney'),
//     description: 'ChatGPT + Midjourney ব্যবহার করে ভাইরাল রিয়ালিস্টিক ফটো তৈরি করার কয়েকটি প্রফেশনাল Prompt আজকের পোস্টে।',
//     date: '১২ আগস্ট ২০২৬',
//     author: 'Arif Hossain',
//     views: 33890,
//     featured: false,
//     content: [
//       { type: 'p', text: 'সামাজিক মাধ্যমে AI দিয়ে তৈরি ছবি একদম ভাইরাল হয়ে যাচ্ছে। আজকের পোস্টে কয়েকটি প্রোফেশনাল Prompt শেয়ার করবো যা ব্যবহার করে আপনিও তৈরি করতে পারবেন।' },
//       { type: 'prompt', text: 'Ultra-realistic portrait of a 22-year-old Bengali girl with long wavy hair, wearing a traditional red-white saree, standing beside a lotus pond, soft golden hour sunlight, dreamy bokeh background, cinematic color grading, 85mm lens, f/1.8, photorealistic' },
//     ],
//   },
//   {
//     id: 6,
//     title: '২০২৬ সালের সেরা ১০টি Video Editing App (Android)',
//     slug: 'best-video-editing-apps-2026',
//     category: 'ভিডিও এডিটিং',
//     categorySlug: 'video-editing',
//     image: img('best-video-editing-apps'),
//     description: 'আজকের পোস্টে Android ফোনের জন্য টপ ১০টি সেরা ভিডিও এডিটিং অ্যাপ নিয়ে আলোচনা করেছি। প্রতিটির ফিচার, দাম এবং কার্যক্ষমতা বিস্তারিত।',
//     date: '১১ আগস্ট ২০২৬',
//     author: 'Jahid Hasan',
//     views: 21040,
//     featured: false,
//     content: [
//       { type: 'p', text: 'আজকাল প্রত্যেকেই বিভিন্ন কারণে ভিডিও এডিট করতে হয়। মোবাইল দিয়ে প্রফেশনাল মানের ভিডিও এডিট করতে পারলে এটাই সবচেয়ে সুবিধাজনক।' },
//       { type: 'h2', text: 'সেরা অ্যাপসের তালিকা' },
//       { type: 'list', items: ['CapCut — বেস্ট ফ্রি ও প্রিমিয়াম সাপোর্ট', 'VN Video Editor — প্রোফেশনাল লেভেল', 'Kinemaster — ক্লাসিক চয়েজ', 'Adobe Premiere Rush — Adobe ইকোসিস্টেম', 'Filmora Go — ইউজার ফ্রেন্ডলি'] },
//     ],
//   },
//   {
//     id: 7,
//     title: 'Spotify Premium APK — অ্যাড ফ্রি মিউজিক ২০২৬',
//     slug: 'spotify-premium-apk',
//     category: 'প্রিমিয়াম অ্যাপ',
//     categorySlug: 'premium-apps',
//     image: img('spotify-premium-music'),
//     description: 'Spotify Premium APK 2026 ডাউনলোড করুন। অ্যাড ফ্রি, অনলিমিটেড স্কিপ, অফলাইন ডাউনলোড এবং হাই-ফাই অডিও কোয়ালিটি।',
//     date: '১১ আগস্ট ২০২৬',
//     author: 'TechZone BD',
//     views: 17890,
//     featured: false,
//     content: [
//       { type: 'p', text: 'Spotify হলো বিশ্বের নম্বর এক মিউজিক স্ট্রিমিং প্ল্যাটফর্ম। প্রিমিয়াম সাবস্ক্রিপশনে পেয়ে যান নানা সুবিধা যা ফ্রি ভার্সনে নেই।' },
//       { type: 'download', label: 'Spotify Premium APK ডাউনলোড করুন', size: '67 MB', version: 'v8.9.98' },
//     ],
//   },
//   {
//     id: 8,
//     title: 'AI Girlfriend Video Prompt — ৫মিনিটে তৈরি করুন',
//     slug: 'ai-girlfriend-video-prompt',
//     category: 'AI Tools',
//     categorySlug: 'ai-tools',
//     image: img('ai-girlfriend-photo-video'),
//     description: 'AI দিয়ে রিয়ালিস্টিক গার্লফ্রেন্ড ভিডিও তৈরি করার জন্য পারফেক্ট Prompt কালেকশন। ১-২ মিনিটে কপি-পেস্ট করে ব্যবহার করুন।',
//     date: '১০ আগস্ট ২০২৬',
//     author: 'Rafiqul Islam',
//     views: 52120,
//     featured: false,
//     content: [
//       { type: 'p', text: 'সাম্প্রতিক সময়ে AI দিয়ে তৈরি ভার্চুয়াল গার্লফ্রেন্ড ভিডিও টিকটকে অনেক ভাইরাল হয়েছে। আজকের পোস্টে কিছু Prompt শেয়ার করছি।' },
//       { type: 'prompt', text: 'A 10-second vertical close-up video of a beautiful young woman with soft curly hair smiling shyly while looking at camera, cozy bedroom background, golden sunset light from window, gentle breeze, cinematic, lifelike skin texture, 4K, 60fps' },
//     ],
//   },
//   {
//     id: 9,
//     title: 'Adobe Lightroom Premium APK — ফটো এডিটিংর রাজা',
//     slug: 'lightroom-premium-apk',
//     category: 'ফটো এডিটিং',
//     categorySlug: 'photo-editing',
//     image: img('lightroom-photo-editing'),
//     description: 'Adobe Lightroom Premium APK ডাউনলোড করুন। প্রিমিয়াম প্রিসেট, হিলিং টুল, AI মাস্কিং এবং ক্লাউড স্টোরেজ সাপোর্ট।',
//     date: '১০ আগস্ট ২০২৬',
//     author: 'Sumaiya Akter',
//     views: 14320,
//     featured: false,
//     content: [
//       { type: 'p', text: 'মোবাইলে প্রফেশনাল ফটো এডিটিং এর জন্য Adobe Lightroom-এর বিকল্প খুঁজে পাওয়া কঠিন। RAW সাপোর্ট, ডিটেইলড কালার গ্রেডিং, প্রিসেট — সব আছে।' },
//       { type: 'download', label: 'Lightroom Premium APK ডাউনলোড করুন', size: '112 MB', version: 'v9.2.0' },
//     ],
//   },
//   {
//     id: 10,
//     title: 'BGMI Premium Config APK — Smooth 90FPS Hack',
//     slug: 'bgmi-premium-config',
//     category: 'গেমস',
//     categorySlug: 'games',
//     image: img('bgmi-gaming-mobile'),
//     description: 'BGMI-তে ল্যাগ ফ্রি 90FPS গেমপ্লে করতে চান? আজকের পোস্টে প্রিমিয়াম কনফিগ ফাইল শেয়ার করেছি যা কোনো ব্যান ঝুঁকি নেই।',
//     date: '০৯ আগস্ট ২০২৬',
//     author: 'Arif Hossain',
//     views: 38200,
//     featured: false,
//     content: [
//       { type: 'p', text: 'লো-এন্ড ফোনেও BGMI স্মুথলি চালানোর জন্য আজকের কনফিগটি ব্যবহার করতে পারেন। এটি শুধুমাত্র graphics settings optimize করে।' },
//       { type: 'info', text: 'সতর্কতা: কোনো অ্যান্টি-চিট বাইপাস বা হ্যাক ব্যবহার করবেন না, তা আপনার আইডি ব্যান করাতে পারে।' },
//       { type: 'download', label: 'BGMI Config Pack ডাউনলোড করুন', size: '18 MB', version: 'v3.1' },
//     ],
//   },
//   {
//     id: 11,
//     title: 'Canva Pro APK — সব প্রিমিয়াম টেমপ্লেট ফ্রিতে',
//     slug: 'canva-pro-apk',
//     category: 'প্রিমিয়াম অ্যাপ',
//     categorySlug: 'premium-apps',
//     image: img('canva-design-template'),
//     description: 'Canva Pro APK 2026 ডাউনলোড করুন। কয়েক লাখ প্রিমিয়াম টেমপ্লেট, স্টক ফটো, ভিডিও, আইকন — সব এক জায়গায়।',
//     date: '০৯ আগস্ট ২০২৬',
//     author: 'TechZone BD',
//     views: 26780,
//     featured: false,
//     content: [
//       { type: 'p', text: 'সোশ্যাল মিডিয়া পোস্ট, থাম্বনেইল, পোস্টার, প্রেজেন্টেশন — সবকিছু বানানোর জন্য Canva একেবারে ফার্স্ট চয়েজ।' },
//       { type: 'download', label: 'Canva Pro APK ডাউনলোড করুন', size: '78 MB', version: 'v2.290.0' },
//     ],
//   },
//   {
//     id: 12,
//     title: 'VPN Premium APK — সীমাহীন ইন্টারনেট ২০২৬',
//     slug: 'vpn-premium-apk',
//     category: 'অ্যাপস',
//     categorySlug: 'apps',
//     image: img('vpn-privacy-security'),
//     description: 'সেরা প্রিমিয়াম VPN APK কালেকশন। ব্লক করা সাইট আনলক, প্রাইভেসি প্রোটেকশন এবং দ্রুত সার্ভার।',
//     date: '০৮ আগস্ট ২০২৬',
//     author: 'Jahid Hasan',
//     views: 19870,
//     featured: false,
//     content: [
//       { type: 'p', text: 'আজকের পোস্টে কয়েকটি সেরা প্রিমিয়াম VPN APK শেয়ার করবো যা নিরাপদ ও ব্যবহারে সহজ।' },
//       { type: 'download', label: 'Premium VPN Bundle APK ডাউনলোড করুন', size: '140 MB', version: 'v2026.8' },
//     ],
//   },
// ];

// export const getPostBySlug = (slug) => posts.find(p => p.slug === slug);
// export const getPostsByCategory = (categorySlug) => posts.filter(p => p.categorySlug === categorySlug);
// export const searchPosts = (q) => {
//   const query = (q || '').toLowerCase();
//   return posts.filter(p =>
//     p.title.toLowerCase().includes(query) ||
//     p.description.toLowerCase().includes(query) ||
//     p.category.toLowerCase().includes(query) ||
//     p.tags?.some(t => t.toLowerCase().includes(query))
//   );
// };
// export const getRelatedPosts = (currentSlug, limit = 3) => {
//   const current = getPostBySlug(currentSlug);
//   if (!current) return posts.slice(0, limit);
//   const sameCat = posts.filter(p => p.categorySlug === current.categorySlug && p.slug !== currentSlug);
//   if (sameCat.length >= limit) return sameCat.slice(0, limit);
//   return [...sameCat, ...posts.filter(p => p.slug !== currentSlug && p.categorySlug !== current.categorySlug)].slice(0, limit);
// };
// export const getPopularPosts = (limit = 5) =>
//   [...posts].sort((a, b) => b.views - a.views).slice(0, limit);








// ============English===================

const img = (seed, w = 800, h = 500) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const categories = [
  {
    name: 'Apps',
    slug: 'apps',
    count: 128,
    icon: 'Smartphone',
    description: 'Download new and useful apps',
  },
  {
    name: 'Games',
    slug: 'games',
    count: 86,
    icon: 'Gamepad2',
    description: 'Download premium and mod games',
  },
  {
    name: 'AI Tools',
    slug: 'ai-tools',
    count: 72,
    icon: 'Bot',
    description: 'AI tools and prompt collections',
  },
  {
    name: 'Video Editing',
    slug: 'video-editing',
    count: 54,
    icon: 'Video',
    description: 'Best video editing apps and tips',
  },
  {
    name: 'Photo Editing',
    slug: 'photo-editing',
    count: 45,
    icon: 'Image',
    description: 'Photo editing apps and AI tools',
  },
  {
    name: 'Premium Apps',
    slug: 'premium-apps',
    count: 63,
    icon: 'Crown',
    description: 'All premium apps in one place',
  },
  {
    name: 'Technology',
    slug: 'technology',
    count: 112,
    icon: 'Zap',
    description: 'Technology news and useful tips',
  },
  {
    name: 'Trending',
    slug: 'trending',
    count: 98,
    icon: 'TrendingUp',
    description: 'Latest trending content',
  },
];

export const tagsList = [
  'APK',
  'AI',
  'ChatGPT',
  'CapCut',
  'TikTok',
  'Prompt',
  'Premium',
  'Android',
  'Video Editing',
  'Photo Editing',
  'Mod APK',
  'Midjourney',
  'Canva',
  'Snapseed',
  'VPN',
  'Adobe',
  'YouTube',
  'Facebook',
];

export const posts = [
  {
    id: 1,
    title: 'CapCut Premium APK Download — All Features Unlocked 2026',
    slug: 'capcut-premium-apk',
    category: 'Video Editing',
    categorySlug: 'video-editing',
    image: img('capcut-premium-video'),
    description:
      'Download the latest version of CapCut Premium APK with premium features, watermark-free editing, 4K export, and VIP templates.',
    date: 'August 14, 2026',
    author: 'TechZone BD',
    views: 15420,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'In today’s post, we are taking a closer look at CapCut Premium APK. If you create or edit videos, you have probably heard of CapCut. It is one of the most popular video editing applications available today.',
      },
      {
        type: 'h2',
        text: 'Key Features of CapCut Premium',
      },
      {
        type: 'list',
        items: [
          'Access to premium templates',
          'No watermark',
          '4K 60FPS export support',
          'Advanced AI tools',
          'Access to premium soundtracks',
          'Ad-free experience',
        ],
      },
      {
        type: 'h2',
        text: 'How to Download',
      },
      {
        type: 'ordered',
        items: [
          'Click the Download button below.',
          'Wait a few moments for the download to begin.',
          'Open the APK file after the download is complete.',
          'Enable installation from unknown sources and install the application.',
        ],
      },
      {
        type: 'warning',
        text: 'Before using any modified or premium APK, make sure you understand the laws and policies applicable in your country. This content is provided for educational purposes.',
      },
      {
        type: 'download',
        label: 'Download CapCut Premium APK',
        size: '92 MB',
        version: 'v12.1.0',
      },
    ],
  },

  {
    id: 2,
    title: 'Create Viral Videos with AI in Minutes — Sora-Style Results',
    slug: 'ai-viral-video-prompt',
    category: 'AI Tools',
    categorySlug: 'ai-tools',
    image: img('ai-video-viral-cinematic'),
    description:
      'Create cinematic and realistic videos from a single prompt. Discover several AI tools that can produce impressive Sora-style results.',
    date: 'August 13, 2026',
    author: 'TechZone BD',
    views: 28910,
    featured: true,
    content: [
      {
        type: 'p',
        text: 'AI has completely changed the way we create videos. You no longer need to rely entirely on professional editing software. With a well-written prompt, you can now generate cinematic and realistic videos within minutes.',
      },
      {
        type: 'h2',
        text: 'Best AI Video Generator Tools',
      },
      {
        type: 'list',
        items: [
          'Runway Gen-3',
          'Pika Labs 1.0',
          'Kling AI',
          'Luma Dream Machine',
          'Sora',
        ],
      },
      {
        type: 'h2',
        text: 'A Perfect Prompt for Viral Videos',
      },
      {
        type: 'prompt',
        text: 'Cinematic wide shot of a young man walking on a neon-lit rainy street in Tokyo at night, reflections on wet pavement, moody lighting, shallow depth of field, shot on ARRI Alexa, 8K, dramatic atmosphere, slow motion, 24fps',
      },
      {
        type: 'info',
        text: 'Tip: Adding terms such as cinematic, camera model, and lighting style to your prompt can make the generated video look significantly more professional.',
      },
    ],
  },

  {
    id: 3,
    title: 'Shazam Premium APK — Unlimited Music Recognition',
    slug: 'shazam-premium-apk',
    category: 'Premium Apps',
    categorySlug: 'premium-apps',
    image: img('shazam-music-app'),
    description:
      'Download Shazam Premium APK with an ad-free experience, offline mode, autoplay, and access to premium features.',
    date: 'August 13, 2026',
    author: 'Rafiqul Islam',
    views: 9820,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Shazam is one of the world’s most popular music recognition applications. If you hear a song but do not know its name, simply let Shazam listen for a few seconds and it can identify the song, artist, and album.',
      },
      {
        type: 'download',
        label: 'Download Shazam Premium APK',
        size: '48 MB',
        version: 'v14.12.0',
      },
    ],
  },

  {
    id: 4,
    title: 'Top 10 AI Prompts for Creating Viral TikTok Videos',
    slug: 'tiktok-viral-video-prompt',
    category: 'AI Tools',
    categorySlug: 'ai-tools',
    image: img('tiktok-viral-video-ai'),
    description:
      'Want to create viral TikTok content? Here are 10 professional AI prompts you can copy and use to create engaging stories and reels.',
    date: 'August 12, 2026',
    author: 'Sumaiya Akter',
    views: 41230,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'The key to creating viral TikTok content is making it engaging and visually appealing. Using AI to create high-quality content can help improve engagement and audience retention.',
      },
      {
        type: 'h2',
        text: 'Prompt #01',
      },
      {
        type: 'prompt',
        text: 'A 15-second vertical TikTok hook showing a surprising before-and-after glow-up of a teenager, trending transition effect, upbeat audio sync, text overlay: "Do you really need an expensive product?", bold captions, fast-paced cuts, high-energy',
      },
    ],
  },

  {
    id: 5,
    title: 'ChatGPT Viral Photo Prompts — Create Stunning AI Images',
    slug: 'chatgpt-viral-photo-prompt',
    category: 'AI Tools',
    categorySlug: 'ai-tools',
    image: img('ai-photo-prompt-midjourney'),
    description:
      'Discover professional prompts for creating viral and realistic photos using ChatGPT and Midjourney.',
    date: 'August 12, 2026',
    author: 'Arif Hossain',
    views: 33890,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'AI-generated images are becoming increasingly popular across social media. In this post, we are sharing several professional prompts that you can use to create realistic and visually impressive images.',
      },
      {
        type: 'prompt',
        text: 'Ultra-realistic portrait of a 22-year-old Bengali girl with long wavy hair, wearing a traditional red-white saree, standing beside a lotus pond, soft golden hour sunlight, dreamy bokeh background, cinematic color grading, 85mm lens, f/1.8, photorealistic',
      },
    ],
  },

  {
    id: 6,
    title: '10 Best Video Editing Apps for Android in 2026',
    slug: 'best-video-editing-apps-2026',
    category: 'Video Editing',
    categorySlug: 'video-editing',
    image: img('best-video-editing-apps'),
    description:
      'Explore the top 10 video editing apps for Android. Compare their features, pricing, performance, and overall editing experience.',
    date: 'August 11, 2026',
    author: 'Jahid Hasan',
    views: 21040,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Video editing has become an essential part of creating content. Being able to edit professional-quality videos directly from your smartphone makes the process faster and more convenient.',
      },
      {
        type: 'h2',
        text: 'Best Apps',
      },
      {
        type: 'list',
        items: [
          'CapCut — Best overall option',
          'VN Video Editor — Professional-level editing',
          'KineMaster — A classic choice',
          'Adobe Premiere Rush — Great for the Adobe ecosystem',
          'Filmora Go — Easy and user-friendly',
        ],
      },
    ],
  },

  {
    id: 7,
    title: 'Spotify Premium APK — Ad-Free Music Experience 2026',
    slug: 'spotify-premium-apk',
    category: 'Premium Apps',
    categorySlug: 'premium-apps',
    image: img('spotify-premium-music'),
    description:
      'Explore Spotify Premium APK features including an ad-free experience, unlimited skips, offline downloads, and high-quality audio.',
    date: 'August 11, 2026',
    author: 'TechZone BD',
    views: 17890,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Spotify is one of the world’s leading music streaming platforms. A premium subscription provides several additional features that are not available in the free version.',
      },
      {
        type: 'download',
        label: 'Download Spotify Premium APK',
        size: '67 MB',
        version: 'v8.9.98',
      },
    ],
  },

  {
    id: 8,
    title: 'AI Girlfriend Video Prompts — Create Videos in Minutes',
    slug: 'ai-girlfriend-video-prompt',
    category: 'AI Tools',
    categorySlug: 'ai-tools',
    image: img('ai-girlfriend-photo-video'),
    description:
      'Explore a collection of AI prompts for creating realistic virtual character videos. Copy and customize the prompts for your projects.',
    date: 'August 10, 2026',
    author: 'Rafiqul Islam',
    views: 52120,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'AI-generated virtual character videos have become increasingly popular across social media platforms. In this post, we are sharing a few creative prompts that you can experiment with.',
      },
      {
        type: 'prompt',
        text: 'A 10-second vertical close-up video of a beautiful young woman with soft curly hair smiling shyly while looking at camera, cozy bedroom background, golden sunset light from window, gentle breeze, cinematic, lifelike skin texture, 4K, 60fps',
      },
    ],
  },

  {
    id: 9,
    title: 'Adobe Lightroom Premium APK — The Ultimate Photo Editor',
    slug: 'lightroom-premium-apk',
    category: 'Photo Editing',
    categorySlug: 'photo-editing',
    image: img('lightroom-photo-editing'),
    description:
      'Explore Adobe Lightroom Premium features including premium presets, healing tools, AI masking, and cloud storage support.',
    date: 'August 10, 2026',
    author: 'Sumaiya Akter',
    views: 14320,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'For professional photo editing on mobile devices, Adobe Lightroom offers a powerful collection of tools. RAW support, detailed color grading, presets, and advanced editing controls make it a strong choice for creators.',
      },
      {
        type: 'download',
        label: 'Download Lightroom Premium APK',
        size: '112 MB',
        version: 'v9.2.0',
      },
    ],
  },

  {
    id: 10,
    title: 'BGMI Premium Config APK — Smooth 90FPS Gaming',
    slug: 'bgmi-premium-config',
    category: 'Games',
    categorySlug: 'games',
    image: img('bgmi-gaming-mobile'),
    description:
      'Looking for smoother BGMI gameplay? Explore optimized configuration settings designed to improve graphics performance and deliver a smoother gaming experience.',
    date: 'August 9, 2026',
    author: 'Arif Hossain',
    views: 38200,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'You can use optimized configuration settings to improve BGMI performance on supported devices. The goal is to optimize graphics and performance settings for a smoother experience.',
      },
      {
        type: 'info',
        text: 'Safety Tip: Do not use anti-cheat bypasses, unauthorized hacks, or modified game files. These can put your account at risk of suspension or a permanent ban.',
      },
      {
        type: 'download',
        label: 'Download BGMI Config Pack',
        size: '18 MB',
        version: 'v3.1',
      },
    ],
  },

  {
    id: 11,
    title: 'Canva Pro APK — Premium Templates and Creative Tools',
    slug: 'canva-pro-apk',
    category: 'Premium Apps',
    categorySlug: 'premium-apps',
    image: img('canva-design-template'),
    description:
      'Explore Canva Pro features including premium templates, stock photos, videos, graphics, and creative design resources.',
    date: 'August 9, 2026',
    author: 'TechZone BD',
    views: 26780,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Canva is a popular choice for creating social media posts, thumbnails, posters, presentations, and many other types of visual content. Its wide range of templates makes the design process simple and efficient.',
      },
      {
        type: 'download',
        label: 'Download Canva Pro APK',
        size: '78 MB',
        version: 'v2.290.0',
      },
    ],
  },

  {
    id: 12,
    title: 'Premium VPN APK — Privacy and Secure Browsing 2026',
    slug: 'vpn-premium-apk',
    category: 'Apps',
    categorySlug: 'apps',
    image: img('vpn-privacy-security'),
    description:
      'Explore a collection of premium VPN applications focused on privacy protection, secure browsing, reliable servers, and better online access.',
    date: 'August 8, 2026',
    author: 'Jahid Hasan',
    views: 19870,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'In today’s post, we are exploring several VPN applications that focus on privacy, security, and ease of use. Always choose a trusted VPN provider and review its privacy policy before using the service.',
      },
      {
        type: 'download',
        label: 'Download Premium VPN Bundle',
        size: '140 MB',
        version: 'v2026.8',
      },
    ],
  },
];

export const getPostBySlug = (slug) =>
  posts.find((p) => p.slug === slug);

export const getPostsByCategory = (categorySlug) =>
  posts.filter((p) => p.categorySlug === categorySlug);

export const searchPosts = (q) => {
  const query = (q || '').toLowerCase();

  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tags?.some((t) => t.toLowerCase().includes(query))
  );
};

export const getRelatedPosts = (currentSlug, limit = 3) => {
  const current = getPostBySlug(currentSlug);

  if (!current) return posts.slice(0, limit);

  const sameCat = posts.filter(
    (p) =>
      p.categorySlug === current.categorySlug &&
      p.slug !== currentSlug
  );

  if (sameCat.length >= limit) {
    return sameCat.slice(0, limit);
  }

  return [
    ...sameCat,
    ...posts.filter(
      (p) =>
        p.slug !== currentSlug &&
        p.categorySlug !== current.categorySlug
    ),
  ].slice(0, limit);
};

export const getPopularPosts = (limit = 5) =>
  [...posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);