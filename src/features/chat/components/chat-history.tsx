import { Spinner } from '@/components/ui/spinner';
import { ChatMessage } from '@/features/chat/components/chat-message';
import { useInfiniteChatHistory } from '@/features/chat/hooks/use-infinite-chat-history';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/utils/cn';

type ChatHistoryProps = React.ComponentProps<'div'> & {
  messages: ChatMessageType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
};

export function ChatHistory({
  messages,
  className,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  ...props
}: ChatHistoryProps) {
  const { topRef, chatContainerRef } = useInfiniteChatHistory({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    messages,
  });

  return (
    <>
      <div
        ref={chatContainerRef}
        className={cn(
          'flex min-h-0 flex-1 flex-col overflow-auto px-4 pt-2 pb-8',
          className,
        )}
        {...props}
      >
        {isFetchingNextPage && (
          <div className='flex w-full items-center justify-center'>
            <Spinner className='size-5' />
          </div>
        )}
        <div className='h-1' ref={topRef} />
        {messages.length > 0 &&
          messages.map((message, index) => (
            <ChatMessage
              key={`${message.id}-${message.createdAt}`}
              message={message}
              isLatest={index === messages.length - 1}
            />
          ))}
      </div>
    </>
  );
}
