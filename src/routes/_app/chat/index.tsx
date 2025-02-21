import { NewChat } from '@/features/chat/components/new-chat';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat/')({
  component: ChatRouteComponent,
});

function ChatRouteComponent() {
  return <NewChat />;
}
