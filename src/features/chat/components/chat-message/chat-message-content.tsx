import type { ChatMessage } from '@/types/chat';
import { cn } from '@/utils/cn';

export function ChatMessageContent({ message }: { message: ChatMessage }) {
  if (message.content.trim() === '') return null;

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
        {message.content}
      </div>
    </div>
  );
}
