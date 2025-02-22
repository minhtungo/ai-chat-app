import { appRoutes } from '@/config/routes';
import { Navigate, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  component: AppComponent,
  beforeLoad: async ({ context }) => {
    throw redirect({ to: appRoutes.app.chat.path });
  },
});

function AppComponent() {
  return <Navigate to={appRoutes.app.chat.path} />;
}
