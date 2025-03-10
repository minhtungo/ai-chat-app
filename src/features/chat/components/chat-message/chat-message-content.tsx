import type { ChatMessage } from '@/types/chat';
import { cn } from '@/utils/cn';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export function ChatMessageContent({
  message,
  isStreaming,
}: {
  message: ChatMessage;
  isStreaming?: boolean;
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
      <div className='prose prose-sm text-base leading-6 break-words whitespace-pre-wrap'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {message.content}
        </ReactMarkdown>
        {isStreaming && (
          <span className='bg-foreground ml-1 inline-block h-4 w-1 animate-pulse' />
        )}
      </div>
    </div>
  );
}
