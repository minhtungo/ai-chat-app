import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/account/files/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/files/"!</div>;
}
