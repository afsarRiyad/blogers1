import PromptBox from './PromptBox.jsx';

export default function ArticleContent({ blocks = [] }) {
  return (
    <div className="article-body">

      {blocks.map((block, index) => {
        const key = block._k || `block-${index}`;

        // Normal paragraph
        if (block.type === 'p') {
          return (
            <p
              key={key}
              className="mb-7 text-[15px] sm:text-base leading-8 text-dark-700"
            >
              {block.text}
            </p>
          );
        }

        // AI Prompt
        if (block.type === 'prompt') {
          return (
            <PromptBox
              key={key}
              text={block.text}
              label={block.label || 'AI Prompt'}
            />
          );
        }

        // Everything else will be hidden
        return null;
      })}

    </div>
  );
}