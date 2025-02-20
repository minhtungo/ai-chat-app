import ChatHistory from '@/features/chat/components/chat-history';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatHistory />;
}
