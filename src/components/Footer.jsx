import { Link } from 'react-router-dom';
import {
  Send,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 bg-white border-t border-dark-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Logo & About */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

                <span className="absolute -top-1 -right-1 text-[8px] font-extrabold bg-dark-900 text-white px-1 py-0.5 rounded-md">
                  BD
                </span>
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight text-dark-900">
                  Tech<span className="text-primary-600">Zone</span>
                </span>

                <span className="text-[10px] text-dark-500 font-medium mt-1">
                  Technology · APK · AI
                </span>
              </div>
            </Link>

            <p className="text-sm text-dark-600 leading-relaxed max-w-md">
              TechZone BD is a modern technology platform featuring APK,
              AI tools, apps, software, and useful technology resources.
            </p>

            {/* Social Icons */}
         
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-extrabold text-dark-900 mb-5">
              Contact Information
            </h3>

            <div className="space-y-4">

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-dark-400 mb-0.5">
                    Address
                  </p>

                  <p className="text-sm font-medium text-dark-700 leading-relaxed">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              {/* Email */}
              <a
                href="mailto:info@techzonebd.com"
                className="flex items-start gap-3 group"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-dark-400 mb-0.5">
                    Email
                  </p>

                  <p className="text-sm font-medium text-dark-700 group-hover:text-primary-600 transition-colors">
                    info@techzonebd.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+8801XXXXXXXXX"
                className="flex items-start gap-3 group"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-dark-400 mb-0.5">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-dark-700 group-hover:text-primary-600 transition-colors">
                    +880 1XXXXXXXXX
                  </p>
                </div>
              </a>

            </div>
          </div>

          {/* Quick Contact */}
          <div>
            <h3 className="text-sm font-extrabold text-dark-900 mb-5">
              Get In Touch
            </h3>

            <p className="text-sm text-dark-600 leading-relaxed mb-5">
              Have a question, suggestion, or business inquiry?
              Feel free to contact us anytime.
            </p>

            <a
              href="mailto:info@techzonebd.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-bold text-sm shadow-glow hover:-translate-y-0.5 transition-all"
            >
              <Mail size={16} />
              Contact Us
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-12 pt-5 sm:pt-6 border-t border-dark-100 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-xs text-dark-500 text-center sm:text-left">
            © 2026 TechZone BD. All rights reserved.
          </p>

          <p className="text-xs text-dark-400">
            Made with ♥ in Bangladesh
          </p>

        </div>
      </div>
    </footer>
  );
}