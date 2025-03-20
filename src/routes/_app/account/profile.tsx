import { ChangePasswordForm } from '@/features/user/components/change-password-form';
import { UpdateProfileForm } from '@/features/user/components/update-profile-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/account/profile')({
  head: () => ({
    meta: [
      {
        title: 'Profile',
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <UpdateProfileForm />
      <ChangePasswordForm />
    </>
  );
}
