import type { ChatMessage } from '@/features/chat/types';
import { cn } from '@/utils/cn';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export function ChatMessageContent({
  message,
  isStreaming,
}: {
  message: ChatMessage;
  isStreaming: boolean;
}) {
  if (message.content.trim() === '' && !isStreaming) return null;

  return (
    <div
      className={cn(
        'max-w-fit',
        message.role === 'user'
          ? 'bg-muted ml-auto rounded-lg px-3 py-2 md:px-4 md:py-3'
          : 'bg-transparent',
      )}
    >
      <div className='prose-xl inline-block text-base leading-6 break-words whitespace-normal'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[
            [rehypeHighlight, { ignoreMissing: true, subset: false }],
            rehypeKatex,
          ]}
          components={{
            code({ node, className, children, ...props }) {
              return (
                <code
                  className={cn('break-words whitespace-pre-wrap', className)}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            pre({ node, children, ...props }) {
              return (
                <pre
                  className='max-w-full overflow-x-auto whitespace-pre-wrap'
                  {...props}
                >
                  {children}
                </pre>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
      {isStreaming && message.role === 'assistant' && (
        <span className='bg-foreground inline-block h-3 w-1 animate-pulse' />
      )}
    </div>
  );
}
