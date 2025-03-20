import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/session/')({
  head: () => ({
    meta: [
      {
        title: 'Session',
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/session/"!</div>;
}
