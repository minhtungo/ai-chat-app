import { appRoutes } from '@/config/routes';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/reset-password')({
  component: RouteComponent,
  validateSearch: z.object({
    token: z.union([z.string(), z.number()]).transform((val) => String(val)),
  }),
  beforeLoad: async ({ search }) => {
    const { token } = search;

    if (!token) {
      throw redirect({ to: appRoutes.auth.signIn.path });
    }
  },
});

function RouteComponent() {
  return <ResetPasswordForm />;
}
