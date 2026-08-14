import { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function PromptBox({ text, label = 'AI Prompt' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-dark-200 overflow-hidden bg-white shadow-soft">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-primary-300" />
          <span className="text-xs sm:text-sm font-bold tracking-wide">{label}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
            copied
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
              : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
          }`}
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied ✓
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy Prompt
            </>
          )}
        </button>
      </div>
      <div className="p-4 sm:p-5 bg-gradient-to-br from-dark-50 to-white">
        <pre className="whitespace-pre-wrap break-words font-mono text-xs sm:text-sm leading-relaxed text-dark-800 scrollbar-thin overflow-x-auto max-h-80">
{text}
        </pre>
      </div>
    </div>
  );
}
