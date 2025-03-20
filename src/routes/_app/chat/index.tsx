import { ChatHistoryLoadingScreen } from '@/components/loading/chat-history-loading-screen';
import { NewChatScreen } from '@/features/chat/components/new-chat-screen';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat/')({
  head: () => ({
    meta: [
      {
        title: 'Chat',
      },
    ],
  }),
  component: ChatRouteComponent,
  pendingComponent: () => <ChatHistoryLoadingScreen />,
});

function ChatRouteComponent() {
  return <NewChatScreen />;
}
