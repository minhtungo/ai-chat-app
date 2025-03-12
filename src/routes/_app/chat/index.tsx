import { ChatHistoryLoadingScreen } from '@/components/loading/chat-history-loading-screen';
import { ChatCanvas } from '@/features/chat/components/chat-canvas';
import { ChatHistory } from '@/features/chat/components/chat-history';
import { NewChatScreen } from '@/features/chat/components/new-chat-screen';
import { useChatStoreMessages } from '@/store/chat-store';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat/')({
  component: ChatRouteComponent,
  pendingComponent: () => <ChatHistoryLoadingScreen />,
});

function ChatRouteComponent() {
  const messages = useChatStoreMessages();

  if (messages.length > 0) {
    return (
      <>
        <ChatHistory messages={messages} className='px-4' />
        <ChatCanvas messages={messages} />
      </>
    );
  }

  return (
    <>
      <NewChatScreen />
    </>
  );
}
