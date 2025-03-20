import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPasswordForm />;
}
