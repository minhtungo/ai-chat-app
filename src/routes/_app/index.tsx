import { appRoutes } from '@/config/routes';
import { Navigate, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: AppComponent,
});

function AppComponent() {
  return <Navigate to={appRoutes.app.chat.path} />;
}
