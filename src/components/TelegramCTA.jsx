import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTelegramPlane,
  FaWhatsapp,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/',
    icon: FaFacebookF,
    className: 'bg-[#1877F2] hover:bg-[#0d65d9]',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/',
    icon: FaInstagram,
    className: 'bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/',
    icon: FaYoutube,
    className: 'bg-[#FF0000] hover:bg-[#d90000]',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/',
    icon: FaTiktok,
    className: 'bg-black hover:bg-dark-900',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/techzonebd',
    icon: FaTelegramPlane,
    className: 'bg-[#229ED9] hover:bg-[#168dcc]',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/',
    icon: FaWhatsapp,
    className: 'bg-[#25D366] hover:bg-[#1fbd59]',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/',
    icon: FaTwitter,
    className: 'bg-black hover:bg-dark-900',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: FaLinkedinIn,
    className: 'bg-[#0A66C2] hover:bg-[#0959a8]',
  },
];

export default function TelegramCTA() {
  return (
    <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-soft overflow-hidden">
      <div className="mb-4">
        <h3 className="text-base text-[18px] font-extrabold text-dark-900">
          Follow Us
        </h3>

        <p className="text-xs text-dark-500 mt-1">
          Stay connected with us on social media
        </p>
      </div>

      <div className="grid grid-cols-4  gap-3">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={social.name}
              className={`${social.className} w-10 aspect-square rounded-xl flex items-center justify-center text-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
            >
              <Icon size={20} />
            </a>
          );
        })}
      </div>
    </div>
  );
}