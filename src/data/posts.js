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
        type: 'h2',
        text: 'A Perfect Prompt for Viral Videos',
      },
      {
        type: 'prompt',
        text: 'Cinematic wide shot of a young man walking on a neon-lit rainy street in Tokyo at night, reflections on wet pavement, moody lighting, shallow depth of field, shot on ARRI Alexa, 8K, dramatic atmosphere, slow motion, 24fps',
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



export const getPostBySlug = (slug) => {
  return posts.find((p) => p.slug === slug);
};

export const getPostsByCategory = (categorySlug) => {
  return posts.filter((p) => p.categorySlug === categorySlug);
};

export const searchPosts = (q) => {
  const query = (q || '').toLowerCase().trim();

  if (!query) return posts;

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

  if (!current) {
    return posts.slice(0, limit);
  }

  const sameCategory = posts.filter(
    (p) =>
      p.categorySlug === current.categorySlug &&
      p.slug !== currentSlug
  );

  const otherPosts = posts.filter(
    (p) =>
      p.slug !== currentSlug &&
      p.categorySlug !== current.categorySlug
  );

  return [...sameCategory, ...otherPosts].slice(0, limit);
};

export const getPopularPosts = (limit = 5) => {
  return [...posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};