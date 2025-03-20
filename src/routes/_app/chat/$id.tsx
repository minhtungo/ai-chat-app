import { ChatHistoryLoadingScreen } from '@/components/loading/chat-history-loading-screen';
import { CanvasScreen } from '@/features/canvas/components/canvas-screen';
import {
  getChatHistory,
  getChatHistoryQueryOptions,
} from '@/features/chat/api/chat-history';
import { ChatHistory } from '@/features/chat/components/chat-history';
import { createFileRoute } from '@tanstack/react-router';

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
  head: ({ params }) => ({
    meta: [
      {
        title: `Chat ${params.id}`,
      },
    ],
  }),
  pendingComponent: () => <ChatHistoryLoadingScreen />,
});

function ChatRouteComponent() {
  return (
    <>
      <ChatHistory />
      <CanvasScreen />
    </>
  );
}
