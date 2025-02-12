import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/_auth/signup')({
  component: SignUpComponent,
});

function SignUpComponent() {
  return <SignUpForm />;
}
