import { Spinner } from '@/components/ui/spinner';
import { useChatHistory } from '@/features/chat/api/chat-history';
import { ChatMessage } from '@/features/chat/components/chat-message';
import { useInfiniteChatHistory } from '@/features/chat/hooks/use-infinite-chat-history';
import { useChatStoreMessages } from '@/store/chat-store';
import { cn } from '@/utils/cn';
import { useParams } from '@tanstack/react-router';

type ChatHistoryProps = React.ComponentProps<'div'> & {};

export function ChatHistory({ className, ...props }: ChatHistoryProps) {
  const { id } = useParams({
    from: '/_app/chat/$id',
  });

  const {
    data: chatHistory,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useChatHistory(id);

  const newMessages = useChatStoreMessages();

  const allMessages = [
    ...(chatHistory?.pages.flatMap((page) => page.messages) ?? []),
    ...newMessages,
  ];

  const { topRef, chatContainerRef } = useInfiniteChatHistory({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    messages: allMessages,
  });

  return (
    <div
      ref={chatContainerRef}
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-auto px-4 pt-2 pb-8 lg:px-6',
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
      {allMessages.length > 0 &&
        allMessages.map((message, index) => (
          <ChatMessage
            key={`${message.id}-${message.createdAt}`}
            message={message}
            isLatest={index === allMessages.length - 1}
          />
        ))}
    </div>
  );
}
