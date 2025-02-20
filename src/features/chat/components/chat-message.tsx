import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessageProps extends React.ComponentProps<'div'> {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-4 py-3 text-sm',
        message.role === 'user' ? 'ml-auto bg-muted text-foreground' : 'bg-transparent'
      )}
    >
      {message.content}
    </div>
  );
}
