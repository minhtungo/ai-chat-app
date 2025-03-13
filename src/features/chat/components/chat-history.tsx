import { Spinner } from '@/components/ui/spinner';
import { ChatMessage } from '@/features/chat/components/chat-message';
import { useChatScroll } from '@/features/chat/hooks/use-chat-scroll';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/utils/cn';

type ChatHistoryProps = React.ComponentProps<'div'> & {
  messages: ChatMessageType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage?: boolean;
};

export function ChatHistory({
  messages,
  className,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  ...props
}: ChatHistoryProps) {
  const { containerRef, sentinelRef, showSentinel, handleScroll } =
    useChatScroll({
      messages,
      hasNextPage,
      fetchNextPage,
    });

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-auto px-4 pt-2 pb-8',
        className,
      )}
      onScroll={handleScroll}
      {...props}
    >
      {showSentinel && (
        <div
          ref={sentinelRef}
          className='flex w-full items-center justify-center'
        >
          {isFetchingNextPage && <Spinner className='size-5' />}
        </div>
      )}
      {messages.length > 0 &&
        messages.map((message, index) => (
          <ChatMessage
            key={`${message.id}-${message.createdAt}`}
            message={message}
            isLatest={index === messages.length - 1}
          />
        ))}
    </div>
  );
}
