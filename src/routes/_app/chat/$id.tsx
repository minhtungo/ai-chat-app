import { ChatHistoryLoadingScreen } from '@/components/loading/chat-history-loading-screen';
import {
  getChatHistory,
  getChatHistoryQueryOptions,
  useChatHistory,
} from '@/features/chat/api/chat-history';
import { ChatCanvas } from '@/features/chat/components/chat-canvas';
import { ChatHistory } from '@/features/chat/components/chat-history';
import { NewChatScreen } from '@/features/chat/components/new-chat-screen';
import { useChatStoreClearMessages } from '@/store/chat-store';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_app/chat/$id')({
  component: ChatRouteComponent,
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

function ChatRouteComponent() {
  const { id } = Route.useParams();
  const clearMessages = useChatStoreClearMessages();

  useEffect(() => {
    clearMessages();
  }, [id]);

  const { data: chatHistory } = useChatHistory(id);

  if (chatHistory?.pages.flatMap((page) => page.messages).length === 0) {
    return <NewChatScreen />;
  }

  return (
    <>
      <ChatHistory />
      <ChatCanvas />
    </>
  );
}
