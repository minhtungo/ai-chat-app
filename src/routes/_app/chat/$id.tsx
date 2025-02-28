import { ChatHistoryLoadingScreen } from '@/components/loading/chat-history-loading-screen';
import {
  getChatHistory,
  getChatHistoryQueryOptions,
  useChatHistory,
} from '@/features/chat/api/chat-history';
import { ChatCanvas } from '@/features/chat/components/chat-canvas';
import { ChatHistory } from '@/features/chat/components/chat-history';
import { NewChatScreen } from '@/features/chat/components/new-chat-screen';
import { useChat, useChatMessageActions } from '@/store/chat-store';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_app/chat/$id')({
  component: RouteComponent,
  loader: ({ context, params }) => {
    context.queryClient.ensureInfiniteQueryData({
      queryKey: getChatHistoryQueryOptions(params.id).queryKey,
      initialPageParam: 0,
      queryFn: ({ pageParam }) =>
        getChatHistory({ offset: pageParam, chatId: params.id }),
    });
  },
  pendingComponent: () => <ChatHistoryLoadingScreen />,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { clearMessages } = useChatMessageActions();
  const { messages } = useChat();

  useEffect(() => {
    clearMessages();
  }, [id]);

  const { data: chatHistory } = useChatHistory(id);

  const allMessages = [
    ...(chatHistory?.pages.flatMap((page) => page.messages) ?? []),
    ...messages,
  ];

  if (allMessages.length === 0) {
    return <NewChatScreen />;
  }

  return (
    <>
      <ChatHistory messages={allMessages} className='px-4' />
      <ChatCanvas messages={allMessages} />
    </>
  );
}
