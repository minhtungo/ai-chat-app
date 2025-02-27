import { UpdatePreferencesForm } from '@/features/user/components/update-preferences-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/account/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return <UpdatePreferencesForm />;
}
