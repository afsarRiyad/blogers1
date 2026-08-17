import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function PushFormDashboard({
  heading = '',
  subheading = '',
  buttons = []
}) {
  const [copiedStates, setCopiedStates] = useState({});

  const handleCopy = async (text, buttonId) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [buttonId]: true }));

      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [buttonId]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleLinkClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  if (!heading && buttons.length === 0) {
    return null;
  }

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-dark-200 bg-white shadow-soft px-5 sm:px-6 py-6">

      {/* Heading */}
      {heading && (
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-dark-900 mb-2 text-center">
          {heading}
        </h2>
      )}

      {/* Subheading */}
      {subheading && (
        <p className="text-sm sm:text-base text-dark-600 mb-6 text-center">
          {subheading}
        </p>
      )}

      {/* Buttons */}
      {buttons.length > 0 && (
        <div className="flex flex-col gap-3">
          {buttons.map((button, index) => {
            const buttonId = `button-${index}`;
            const isCopied = copiedStates[buttonId];

            if (button.type === 'link') {
              return (
                <button
                  key={buttonId}
                  onClick={() => handleLinkClick(button.url)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  style={{
                    background: button.backgroundColor || 'var(--button-gradient-start)',
                    color: button.textColor || 'var(--button-text-color)'
                  }}
                >
                  <span className="text-lg">{button.emoji || '🔗'}</span>
                  {button.text}
                </button>
              );
            } else if (button.type === 'copy') {
              return (
                <button
                  key={buttonId}
                  onClick={() => handleCopy(button.copyText || button.text, buttonId)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  style={{
                    background: button.backgroundColor || 'var(--button-gradient-start)',
                    color: button.textColor || 'var(--button-text-color)'
                  }}
                >
                  {isCopied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      {button.text || 'Copy'}
                    </>
                  )}
                </button>
              );
            }
            return null;
          })}
        </div>
      )}

    </div>
  );
}