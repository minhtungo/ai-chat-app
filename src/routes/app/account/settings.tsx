import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/account/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/settings"!</div>;
}
