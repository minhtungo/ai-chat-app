import { ChatMessage } from '@/features/chat/components/chat-message';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/utils/cn';

type ChatHistoryProps = React.ComponentProps<'div'> & {
  messages: ChatMessageType[];
};

export function ChatHistory({
  messages,
  className,
  ...props
}: ChatHistoryProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-auto px-4 pb-8',
        className,
      )}
      ref={(el) => {
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      }}
      {...props}
    >
      {messages.length > 0 &&
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLatest={message.id === messages[messages.length - 1].id}
          />
        ))}
    </div>
  );
}
