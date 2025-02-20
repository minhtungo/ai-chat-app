import { useUser } from '@/api/user/get-user';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useUser();

  return <div>Hello user: {JSON.stringify(user)}</div>;
}
