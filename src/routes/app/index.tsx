import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  component: AppComponent,
});

function AppComponent() {
  return <div></div>;
}
