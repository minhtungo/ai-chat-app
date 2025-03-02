import { ChatCanvas } from '@/features/chat/components/chat-canvas';
import { ChatHistory } from '@/features/chat/components/chat-history';
import { NewChatScreen } from '@/features/chat/components/new-chat-screen';
import { useChat } from '@/store/chat-store';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat/')({
  component: ChatRouteComponent,
});

function ChatRouteComponent() {
  const { messages } = useChat();

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
