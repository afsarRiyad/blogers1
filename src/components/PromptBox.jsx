import { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function PromptBox({
  text,
  label = 'AI Prompt',
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-dark-200 bg-white shadow-soft">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 bg-[#111827] px-4 sm:px-5 py-3.5">

        <div className="flex items-center gap-2">
          <Sparkles
            size={17}
            className="text-cyan-300"
          />

          <span className="text-sm font-extrabold text-white">
            {label}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-white/20"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy Prompt
            </>
          )}
        </button>

      </div>

      {/* Prompt Content */}
      <div className="bg-white px-5 sm:px-6 py-5">
        <p className="whitespace-pre-line font-mono text-[13px] sm:text-sm leading-7 text-[#17315f]">
          {text}
        </p>
      </div>

    </div>
  );
}