import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import Logo from '../images/logo.jpg'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-dark-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-14 sm:h-16 items-center justify-between">

          {/* Logo - Center */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="TechZone BD Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl logo-gradient flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
             <img src={Logo} alt="logo" className='object-cover h-full' />

              <span className="absolute -top-1 -right-1 text-[8px] sm:text-[9px] font-extrabold bg-dark-900 text-white px-1 py-0.5 rounded-md leading-none">
                27
              </span>
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-dark-900 whitespace-nowrap">
                <span className="text-primary-600">Google</span>
              </span>

            </div>
          </Link>

          {/* Telegram - Right Side */}
          <a
            href="https://t.me/techzonebd"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#229ED9]/10 hover:bg-[#229ED9]/15 text-[#229ED9] font-semibold text-sm border border-[#229ED9]/20 transition-all hover:-translate-y-0.5 hover:shadow-md"
            aria-label="Telegram"
          >
            <Send size={15} className="rotate-[-20deg]" />
            <span className="hidden sm:inline">Telegram</span>
          </a>

        </div>
      </div>
    </header>
  );
}