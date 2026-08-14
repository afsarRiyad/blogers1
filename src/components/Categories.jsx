import { Link } from 'react-router-dom';
import { ChevronRight, FolderOpen } from 'lucide-react';
import { categories } from '../data/posts.js';

export default function Categories() {
  const displayCats = categories.slice(0, 7);

  return (
    <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-soft">
      <h3 className="text-sm font-extrabold text-dark-900 mb-4 flex items-center gap-2">
        <FolderOpen size={16} className="text-primary-600" />
        ক্যাটাগরি
      </h3>
      <ul className="space-y-1.5">
        {displayCats.map((cat) => (
          <li key={cat.slug}>
            <Link
              to={`/category/${cat.slug}`}
              className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-primary-50 transition-colors"
            >
              <span className="flex items-center gap-2.5 text-sm font-semibold text-dark-700 group-hover:text-primary-700 transition-colors">
                <ChevronRight size={14} className="text-dark-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                {cat.name}
              </span>
              <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-full bg-dark-100 group-hover:bg-primary-100 group-hover:text-primary-700 text-[11px] font-bold text-dark-500 transition-all">
                {cat.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
