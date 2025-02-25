import { ChangePasswordForm } from '@/features/user/components/change-password-form';
import { UpdateProfileForm } from '@/features/user/components/update-profile-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/account/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='space-y-6'>
      <UpdateProfileForm />
      <ChangePasswordForm />
    </div>
  );
}
