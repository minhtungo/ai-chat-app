import { appRoutes } from '@/config/routes';
import { Navigate, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/account/')({
  component: AccountIndexComponent,
});

function AccountIndexComponent() {
  return <Navigate to={appRoutes.account.profile.path} />;
}
