import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/account/billing')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/profile/billing"!</div>;
}
