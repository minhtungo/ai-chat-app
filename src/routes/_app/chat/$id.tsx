import { env } from '@/config/env';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <div></div>;
}
