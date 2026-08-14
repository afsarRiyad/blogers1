import { Link } from 'react-router-dom';

export default function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/search?q=${encodeURIComponent(tag)}`}
          className="inline-flex items-center px-3 py-1.5 rounded-full bg-dark-50 hover:bg-primary-50 border border-dark-100 hover:border-primary-200 text-xs font-semibold text-dark-700 hover:text-primary-700 transition-all hover:-translate-y-0.5"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
