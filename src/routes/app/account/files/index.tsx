import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/account/files/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/files/"!</div>;
}
