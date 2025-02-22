import { ChatHistory } from '@/features/chat/components/chat-history';
import { NewChat } from '@/features/chat/components/new-chat';
import { useChat } from '@/store/chat';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat/')({
  component: ChatRouteComponent,
});

function ChatRouteComponent() {
  const { messages } = useChat();

  if (messages.length > 0) {
    return <ChatHistory messages={messages} />;
  }

  return <NewChat />;
}
