import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center flex-nowrap gap-0.5 text-xs sm:text-sm text-dark-500 overflow-x-auto hide-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0 pb-0.5"
    >
      <Link
        to="/"
        className="inline-flex shrink-0 items-center gap-1 px-2 py-1 rounded-lg hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors whitespace-nowrap"
      >
        <Home size={12} className="sm:w-3.5 sm:h-3.5" />
        হোম
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-0.5">
          <ChevronRight size={11} className="sm:w-3 sm:h-3 text-dark-300 shrink-0" />
          {item.to ? (
            <Link
              to={item.to}
              className={`px-2 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                i === items.length - 1
                  ? 'text-dark-900 font-bold'
                  : 'hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span className="px-2 py-1 rounded-lg font-bold text-dark-900 line-clamp-1 max-w-[200px] sm:max-w-[280px]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
