import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/quiz/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/quiz/"!</div>;
}
