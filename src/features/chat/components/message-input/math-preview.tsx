// src/features/chat/components/chat-input/math-preview.tsx
import katex from 'katex';
import { useMemo } from 'react';

interface MathPreviewProps {
  content: string;
}

export function MathPreview({ content }: MathPreviewProps) {
  const renderedMath = useMemo(() => {
    // Find all math expressions in the content (between $ or $$ delimiters)
    const mathRegex = /(\$\$[\s\S]+?\$\$|\$[\s\S]+?\$)/g;
    let lastIndex = 0;
    const parts = [];
    let match;

    // Split the content into math and non-math parts
    while ((match = mathRegex.exec(content)) !== null) {
      // Add text before the math expression
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index),
        });
      }

      // Add the math expression
      const mathExpression = match[0];
      const isDisplay = mathExpression.startsWith('$$');
      const formula = isDisplay
        ? mathExpression.slice(2, -2)
        : mathExpression.slice(1, -1);

      parts.push({
        type: 'math',
        content: formula,
        isDisplay,
      });

      lastIndex = match.index + mathExpression.length;
    }

    // Add any remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex),
      });
    }

    // Render each part
    return parts.map((part, index) => {
      if (part.type === 'text') {
        return <span key={index}>{part.content}</span>;
      } else {
        try {
          const html = katex.renderToString(part.content, {
            displayMode: part.isDisplay,
            throwOnError: false,
          });
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
              className='inline-block'
            />
          );
        } catch (error) {
          return <span key={index}>${part.content}$</span>;
        }
      }
    });
  }, [content]);

  return <div className='math-preview px-2 py-1 text-sm'>{renderedMath}</div>;
}
