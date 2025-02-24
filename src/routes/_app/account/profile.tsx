import { UpdateProfileForm } from '@/features/user/components/update-profile-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/account/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return <UpdateProfileForm />;
}
