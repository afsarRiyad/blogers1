import { Download, AlertTriangle, Info, FileText, ListOrdered } from 'lucide-react';
import PromptBox from './PromptBox.jsx';

const renderers = {
  p: (b) => (
    <p key={b._k} className="my-4 text-dark-700 leading-8 text-[15px] sm:text-base text-justify">
      {b.text}
    </p>
  ),
  h2: (b) => (
    <h2 key={b._k} className="mt-8 mb-4 text-xl sm:text-2xl font-extrabold tracking-tight text-dark-900">
      {b.text}
    </h2>
  ),
  h3: (b) => (
    <h3 key={b._k} className="mt-6 mb-3 text-lg font-extrabold tracking-tight text-dark-900">
      {b.text}
    </h3>
  ),
  list: (b) => (
    <ul key={b._k} className="my-5 space-y-2.5 pl-1">
      {b.items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-dark-700 text-[15px] leading-7">
          <span className="shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-500" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  ),
  ordered: (b) => (
    <ol key={b._k} className="my-5 space-y-2.5 pl-1">
      {b.items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-dark-700 text-[15px] leading-7">
          <span className="shrink-0 w-6 h-6 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-extrabold mt-0.5">
            {i + 1}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  ),
  prompt: (b, i) => <PromptBox key={b._k || `p-${i}`} text={b.text} label={b.label || 'AI Prompt'} />,
  warning: (b) => (
    <div key={b._k} className="my-6 flex gap-3 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
        <AlertTriangle size={18} />
      </div>
      <div className="flex-1">
        <h5 className="font-extrabold text-amber-800 text-sm mb-1">সতর্কতা</h5>
        <p className="text-sm text-amber-700 leading-relaxed">{b.text}</p>
      </div>
    </div>
  ),
  info: (b) => (
    <div key={b._k} className="my-6 flex gap-3 p-4 sm:p-5 rounded-2xl bg-primary-50 border border-primary-200">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
        <Info size={18} />
      </div>
      <div className="flex-1">
        <h5 className="font-extrabold text-primary-800 text-sm mb-1">টিপস / তথ্য</h5>
        <p className="text-sm text-primary-700 leading-relaxed">{b.text}</p>
      </div>
    </div>
  ),
  download: (b) => (
    <div key={b._k} className="my-8 rounded-2xl border border-primary-200 overflow-hidden bg-gradient-to-br from-primary-50/60 via-white to-primary-50/60 shadow-soft">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="flex items-center gap-2.5">
          <FileText size={18} />
          <span className="font-extrabold text-sm">ফাইল ডাউনলোড</span>
        </div>
        {(b.version || b.size) && (
          <div className="flex items-center gap-2 text-[11px]">
            {b.version && <span className="px-2 py-0.5 rounded-md bg-white/15 font-bold">{b.version}</span>}
            {b.size && <span className="px-2 py-0.5 rounded-md bg-white/15 font-bold">{b.size}</span>}
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-lg sm:text-xl font-extrabold text-dark-900 mb-1">{b.label}</h4>
          <p className="text-sm text-dark-600">সীমিত সময়ের জন্য — দ্রুত ডাউনলোড করুন</p>
        </div>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-extrabold shadow-glow hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
        >
          <Download size={18} className="group-hover:animate-bounce" />
          ডাউনলোড করুন
        </a>
      </div>
    </div>
  ),
};

export default function ArticleContent({ blocks = [] }) {
  return (
    <div className="article-body">
      {blocks.map((b, i) => {
        const block = { ...b, _k: b._k || `b-${i}` };
        const Renderer = renderers[b.type];
        return Renderer ? Renderer(block, i) : null;
      })}
    </div>
  );
}
